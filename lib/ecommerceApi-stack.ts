import * as lambda from "aws-cdk-lib/aws-lambda"
import * as lambdaNodeJS from "aws-cdk-lib/aws-lambda-nodejs"
import * as cdk from "aws-cdk-lib"
import { Construct } from "constructs"
import { 
  AccessLogFormat, 
  LambdaIntegration, 
  LogGroupLogDestination, 
  RestApi, 
  StageOptions 
} from "aws-cdk-lib/aws-apigateway"
import { ILogGroup, LogGroup } from "aws-cdk-lib/aws-logs"

interface EcommerceApiStackProps extends cdk.StackProps {
  productsFetchHandler: lambdaNodeJS.NodejsFunction
}

// const deployOptions = (logGroup: ILogGroup): StageOptions => {
//   return {
//     accessLogDestination: new LogGroupLogDestination(logGroup),
//     accessLogFormat: AccessLogFormat.jsonWithStandardFields({
//       httpMethod: true,
//       ip: true,
//       protocol: true,
//       requestTime: true,
//       resourcePath: true,
//       responseLength: true,
//       status: true,
//       caller: true,
//       user: true
//     })
//   }
// }

export class EcommerceApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: EcommerceApiStackProps) {
    super(scope, id, props)

    //const logGroup = new LogGroup(this, "EcommerceApiLogs")

    const api = new RestApi(this, "EcommerceApi", {
      restApiName: "EcommerceApi",
      //deployOptions: deployOptions(logGroup)
    })

    const productsFetchIntegration = new LambdaIntegration(
      props.productsFetchHandler
    )

  // "/" -> root, barra já existe dentro de root
    const productsResource = api.root.addResource("products")
    productsResource.addMethod("GET", productsFetchIntegration)
  }
}
