import { APIGatewayProxyEventV2 } from 'aws-lambda';
import { z } from 'zod';

export const requestGenerator = (
  matrix: any
): Partial<APIGatewayProxyEventV2> => ({
  queryStringParameters: {
    matrix: JSON.stringify(matrix)
  }
});

export const HandlerResponse = z.object({
  body: z.string(),
  statusCode: z.number(),
  headers: z.object({}),
  cookies: z.array(z.string())
});
