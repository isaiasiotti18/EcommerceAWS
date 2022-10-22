import { 
  APIGatewayProxyEvent, 
  APIGatewayProxyResult, 
Context } from "aws-lambda";

export async function handler(
  event: APIGatewayProxyEvent, 
  context: Context
): Promise<APIGatewayProxyResult> {

  const { awsRequestId, functionName } = context
  
  const { resource, httpMethod, requestContext } = event

  const { requestId } = requestContext

  console.log(`
    API Gateway RequestId: ${requestId} - Lambda RequestId: ${awsRequestId}
  `)

  if (resource === "/products") {
    if (httpMethod === "GET") {
      console.log('GET')

      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "GET Products - OK"
        })
      }
    }
  }

  return {
    statusCode: 400,
    body: JSON.stringify({
      message: "Bad request exception."
    })
  }
}