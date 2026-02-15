import * as cdk from "aws-cdk-lib"
import { Construct } from "constructs"
import * as s3 from "aws-cdk-lib/aws-s3"
import * as iam from "aws-cdk-lib/aws-iam"
import * as route53 from "aws-cdk-lib/aws-route53"
import * as route53Targets from "aws-cdk-lib/aws-route53-targets"
import * as cloudfront from "aws-cdk-lib/aws-cloudfront"
import * as cloudfrontOrigins from "aws-cdk-lib/aws-cloudfront-origins"
import * as lambda from "aws-cdk-lib/aws-lambda"
import * as apigatewayv2 from "aws-cdk-lib/aws-apigatewayv2"
import * as apigatewayv2Integrations from "aws-cdk-lib/aws-apigatewayv2-integrations"
import * as dynamodb from "aws-cdk-lib/aws-dynamodb"
import * as acm from "aws-cdk-lib/aws-certificatemanager"
import * as s3deploy from "aws-cdk-lib/aws-s3-deployment"
import * as path from "path"

import * as dotenv from "dotenv"
dotenv.config()

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const hosteZoneId = process.env.HOST_ZONE_ID ?? ""
    const subDomain = process.env.SUB_DOMAIN ?? ""
    const domain = process.env.DOMAIN ?? ""

    // =============================================
    // 既存リソース: DBバックアップ用S3バケット + IAMユーザー
    // =============================================
    const backupBucket = new s3.Bucket(this, "MyFirstBucket", {
      bucketName: "runcheck-db-backup",
      lifecycleRules: [
        {
          expiration: cdk.Duration.days(91),
        },
      ],
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    })

    const backupUser = new iam.User(this, "IAMUser", {
      userName: "runcheck-user",
    })
    const s3Policy = new iam.PolicyStatement({
      actions: ["s3:PutObject"],
      resources: [backupBucket.bucketArn + "/*"],
    })
    backupUser.addToPolicy(s3Policy)

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
      tableName: "RunCheck",
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
    // Lambda 関数 (NestJS バックエンド)
    // =============================================
    const backendFunction = new lambda.Function(this, "BackendFunction", {
      functionName: "runcheck-backend",
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: "dist/lambda.handler",
      code: lambda.Code.fromAsset(
        path.join(__dirname, "../../../backend_new"),
        {
          exclude: ["/src", "/test", "/scripts", ".env", ".env.base", "node_modules/.cache", "node_modules/.bin"],
        }
      ),
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
    })

    // Lambda に DynamoDB アクセス権限を付与
    table.grantReadWriteData(backendFunction)

    // =============================================
    // API Gateway (HTTP API)
    // =============================================
    const httpApi = new apigatewayv2.HttpApi(this, "BackendApi", {
      apiName: "runcheck-api",
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
      bucketName: `runcheck-frontend-${this.account}`,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    })

    // =============================================
    // ACM 証明書 (CloudFront用 - us-east-1)
    // =============================================
    // Note: CloudFront用証明書はus-east-1に作成する必要がある
    // クロスリージョン参照を避けるため、事前に作成した証明書のARNを環境変数で渡す
    // または、同一リージョン(us-east-1)にスタックをデプロイする場合はここで作成可能
    const certificateArn = process.env.CERTIFICATE_ARN ?? ""

    // =============================================
    // CloudFront ディストリビューション
    // =============================================
    const apiGatewayOrigin = new cloudfrontOrigins.HttpOrigin(
      `${httpApi.apiId}.execute-api.${this.region}.amazonaws.com`,
      {
        protocolPolicy: cloudfront.OriginProtocolPolicy.HTTPS_ONLY,
      }
    )

    const distributionProps: cloudfront.DistributionProps = {
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

    // 証明書が指定されている場合はカスタムドメインを設定
    if (certificateArn) {
      const certificate = acm.Certificate.fromCertificateArn(
        this,
        "Certificate",
        certificateArn
      )
      Object.assign(distributionProps, {
        domainNames: [subDomain],
        certificate,
      })
    }

    const distribution = new cloudfront.Distribution(
      this,
      "Distribution",
      distributionProps
    )

    // =============================================
    // フロントエンド S3 デプロイ
    // =============================================
    new s3deploy.BucketDeployment(this, "DeployFrontend", {
      sources: [
        s3deploy.Source.asset(
          path.join(__dirname, "../../../frontend_new/dist")
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
