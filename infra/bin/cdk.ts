#!/usr/bin/env node
import "source-map-support/register"
import * as cdk from "aws-cdk-lib"
import { CdkStack } from "../lib/cdk-stack"
import { LegacyStack } from "../lib/legacy-stack"

const app = new cdk.App()

new CdkStack(app, "RunCheckStack", {})

new LegacyStack(app, "RunCheckLegacyStack", {})
