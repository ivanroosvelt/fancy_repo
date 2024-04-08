import { APIGatewayProxyEventV2 } from 'aws-lambda';
import { z } from 'zod';

export const requestGenerator = (body: any): Partial<APIGatewayProxyEventV2> => ({
  body: JSON.stringify(body)
});

export const HandlerResponse = z.object({
  body: z.string(),
  statusCode: z.number(),
  headers: z.object({}),
  cookies: z.array(z.string())
});
