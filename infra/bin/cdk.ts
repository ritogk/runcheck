#!/usr/bin/env node
import "source-map-support/register"
import * as cdk from "aws-cdk-lib"
import * as dotenv from "dotenv"
import { CdkStack } from "../lib/cdk-stack"

const app = new cdk.App()

const envName = app.node.tryGetContext("env") as "dev" | "prod" | undefined
if (!envName || !["dev", "prod"].includes(envName)) {
  throw new Error(
    'Environment must be specified: -c env=dev or -c env=prod'
  )
}

dotenv.config({ path: `.env.${envName}` })

new CdkStack(app, `RunCheck${envName.charAt(0).toUpperCase() + envName.slice(1)}Stack`, {
  envName,
})
