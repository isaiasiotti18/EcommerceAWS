#!/usr/bin/env node

import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ProductsAppStack } from '../lib/productsApp-stack';
import { EcommerceApiStack } from '../lib/ecommerceApi-stack';
require('dotenv').config()

const app = new cdk.App();

const env: cdk.Environment = {
  account: process.env.AWS_ACCOUNT_ID,
  region: process.env.AWS_REGION
}

const tags = {
  cost: "ECommerce",
  team: "Iotti_SoftHouse",
}

const productsAppStack = new ProductsAppStack(app, "ProductsApp", {
  tags,
  env
})

const eCommerceApiStack = new EcommerceApiStack(app, "ECommerceApi", {
  productsFetchHandler: productsAppStack.productsFetchHandler,
  tags,
  env
})
eCommerceApiStack.addDependency(productsAppStack)