import * as cdk from "aws-cdk-lib"
import { Construct } from "constructs"
import * as route53 from "aws-cdk-lib/aws-route53"

import * as dotenv from "dotenv"
dotenv.config()

export class LegacyStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const hosteZoneId = process.env.HOST_ZONE_ID ?? ""
    const domain = process.env.DOMAIN ?? ""
    const legacySubDomain = process.env.LEGACY_SUB_DOMAIN ?? ""
    const legacyServerIp = process.env.LEGACY_SERVER_IP ?? ""

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
    // 旧サーバー向け Route53 Aレコード
    // =============================================
    new route53.ARecord(this, "LegacySubDomain", {
      zone: hostedZone,
      recordName: legacySubDomain,
      ttl: cdk.Duration.minutes(5),
      target: route53.RecordTarget.fromIpAddresses(legacyServerIp),
    })
  }
}
