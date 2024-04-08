import { ApiHandler } from 'sst/node/api';

export const handler = ApiHandler(async (_evt) => {
  return {
    statusCode: 200,
    body: `Hello world. Use the /process endpoint to process matrix.`
  };
});
