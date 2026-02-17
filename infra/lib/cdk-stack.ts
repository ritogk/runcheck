import * as cdk from "aws-cdk-lib"
import { Construct } from "constructs"
import * as s3 from "aws-cdk-lib/aws-s3"
import * as route53 from "aws-cdk-lib/aws-route53"
import * as route53Targets from "aws-cdk-lib/aws-route53-targets"
import * as cloudfront from "aws-cdk-lib/aws-cloudfront"
import * as cloudfrontOrigins from "aws-cdk-lib/aws-cloudfront-origins"
import * as lambda from "aws-cdk-lib/aws-lambda"
import * as lambdaNodejs from "aws-cdk-lib/aws-lambda-nodejs"
import * as apigatewayv2 from "aws-cdk-lib/aws-apigatewayv2"
import * as apigatewayv2Integrations from "aws-cdk-lib/aws-apigatewayv2-integrations"
import * as dynamodb from "aws-cdk-lib/aws-dynamodb"
import * as acm from "aws-cdk-lib/aws-certificatemanager"
import * as s3deploy from "aws-cdk-lib/aws-s3-deployment"
import * as path from "path"

export interface RunCheckStackProps extends cdk.StackProps {
  envName: "dev" | "prod"
}

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: RunCheckStackProps) {
    super(scope, id, props)

    const { envName } = props
    const prefix = envName === "prod" ? "runcheck" : `runcheck-${envName}`

    const hosteZoneId = process.env.HOST_ZONE_ID ?? ""
    const subDomain = process.env.SUB_DOMAIN ?? ""
    const domain = process.env.DOMAIN ?? ""
    const tableName = `RunCheck-${envName}`

    // =============================================
    // Route53 ホストゾーン
    // =============================================
    const hostedZone = route53.HostedZone.fromHostedZoneAttributes(
      this,
      "GetHostZone",
      {
        hostedZoneId: hosteZoneId,
        zoneName: domain,
      }
    )

    // =============================================
    // DynamoDB テーブル (シングルテーブル)
    // =============================================
    const table = new dynamodb.Table(this, "RunCheckTable", {
      tableName,
      partitionKey: { name: "userId", type: dynamodb.AttributeType.STRING },
      sortKey: { name: "kind", type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    })
    table.addGlobalSecondaryIndex({
      indexName: "EmailIndex",
      partitionKey: { name: "email", type: dynamodb.AttributeType.STRING },
      projectionType: dynamodb.ProjectionType.ALL,
    })
    table.addGlobalSecondaryIndex({
      indexName: "KindIndex",
      partitionKey: { name: "kind", type: dynamodb.AttributeType.STRING },
      projectionType: dynamodb.ProjectionType.ALL,
    })

    // =============================================
    // Lambda 関数 (NestJS バックエンド - esbuild バンドル)
    // =============================================
    const backendFunction = new lambdaNodejs.NodejsFunction(
      this,
      "BackendFunction",
      {
        functionName: `${prefix}-backend`,
        runtime: lambda.Runtime.NODEJS_24_X,
        entry: path.join(__dirname, "../../backend/dist/lambda.js"),
        handler: "handler",
        bundling: {
          minify: true,
          sourceMap: true,
          target: "node24",
          externalModules: [
            "@aws-sdk/*",
            "@nestjs/microservices",
            "@nestjs/websockets",
            "class-transformer/storage",
          ],
        },
        memorySize: 512,
        timeout: cdk.Duration.seconds(30),
        environment: {
          NODE_ENV: "production",
          DYNAMODB_TABLE_NAME: table.tableName,
          JWT_SECRET: process.env.JWT_SECRET ?? "change-me-in-production",
          YOUTUBE_CLIENT_ID: process.env.YOUTUBE_CLIENT_ID ?? "",
          YOUTUBE_CLIENT_SECRET: process.env.YOUTUBE_CLIENT_SECRET ?? "",
          YOUTUBE_REDIRECT_URL: process.env.YOUTUBE_REDIRECT_URL ?? "",
        },
      }
    )

    // Lambda に DynamoDB アクセス権限を付与
    table.grantReadWriteData(backendFunction)

    // =============================================
    // API Gateway (HTTP API)
    // =============================================
    const httpApi = new apigatewayv2.HttpApi(this, "BackendApi", {
      apiName: `${prefix}-api`,
      description: "RunCheck Backend API",
    })

    const lambdaIntegration =
      new apigatewayv2Integrations.HttpLambdaIntegration(
        "LambdaIntegration",
        backendFunction
      )

    httpApi.addRoutes({
      path: "/{proxy+}",
      methods: [apigatewayv2.HttpMethod.ANY],
      integration: lambdaIntegration,
    })

    // =============================================
    // S3 バケット (フロントエンド静的ファイル)
    // =============================================
    const frontendBucket = new s3.Bucket(this, "FrontendBucket", {
      bucketName: `${prefix}-frontend-${this.account}`,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    })

    // =============================================
    // ACM 証明書 (CloudFront用 - us-east-1 に自動作成)
    // =============================================
    const certificate = new acm.DnsValidatedCertificate(
      this,
      "SiteCertificate",
      {
        domainName: subDomain,
        hostedZone: hostedZone,
        region: "us-east-1",
      }
    )

    // =============================================
    // CloudFront ディストリビューション
    // =============================================
    const apiGatewayOrigin = new cloudfrontOrigins.HttpOrigin(
      `${httpApi.apiId}.execute-api.${this.region}.amazonaws.com`,
      {
        protocolPolicy: cloudfront.OriginProtocolPolicy.HTTPS_ONLY,
      }
    )

    const distribution = new cloudfront.Distribution(
      this,
      "Distribution",
      {
        defaultBehavior: {
          origin: new cloudfrontOrigins.S3Origin(frontendBucket),
          viewerProtocolPolicy:
            cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
        },
        additionalBehaviors: {
          "/api/*": {
            origin: apiGatewayOrigin,
            viewerProtocolPolicy:
              cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
            cachePolicy: cloudfront.CachePolicy.CACHING_DISABLED,
            originRequestPolicy:
              cloudfront.OriginRequestPolicy
                .ALL_VIEWER_EXCEPT_HOST_HEADER,
            allowedMethods: cloudfront.AllowedMethods.ALLOW_ALL,
          },
        },
        domainNames: [subDomain],
        certificate,
        defaultRootObject: "index.html",
        errorResponses: [
          {
            httpStatus: 403,
            responseHttpStatus: 200,
            responsePagePath: "/index.html",
            ttl: cdk.Duration.minutes(5),
          },
          {
            httpStatus: 404,
            responseHttpStatus: 200,
            responsePagePath: "/index.html",
            ttl: cdk.Duration.minutes(5),
          },
        ],
      }
    )

    // =============================================
    // フロントエンド S3 デプロイ
    // =============================================
    new s3deploy.BucketDeployment(this, "DeployFrontend", {
      sources: [
        s3deploy.Source.asset(
          path.join(__dirname, "../../frontend/dist")
        ),
      ],
      destinationBucket: frontendBucket,
      distribution,
      distributionPaths: ["/*"],
    })

    // =============================================
    // Route53 レコード更新
    // =============================================
    // CloudFront向けのAliasレコード
    new route53.ARecord(this, "SubDomain", {
      zone: hostedZone,
      recordName: subDomain,
      target: route53.RecordTarget.fromAlias(
        new route53Targets.CloudFrontTarget(distribution)
      ),
    })

    // =============================================
    // Outputs
    // =============================================
    new cdk.CfnOutput(this, "CloudFrontUrl", {
      value: `https://${distribution.distributionDomainName}`,
      description: "CloudFront Distribution URL",
    })

    new cdk.CfnOutput(this, "ApiGatewayUrl", {
      value: httpApi.apiEndpoint,
      description: "API Gateway Endpoint",
    })

    new cdk.CfnOutput(this, "FrontendBucketName", {
      value: frontendBucket.bucketName,
      description: "Frontend S3 Bucket Name",
    })
  }
}
