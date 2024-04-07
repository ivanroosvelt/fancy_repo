import { StackContext, Api, EventBus, NextjsSite } from 'sst/constructs';

export function API({ stack }: StackContext) {
  const site = new NextjsSite(stack, 'KEYBOARY_SITE', {
    path: 'front'
  });

  const api = new Api(stack, 'GOODSQUARE_API', {
    routes: {
      'GET /process': 'back/functions/src/lambda.handler',
      'POST /process': 'back/functions/src/process.handler',
      $default: 'back/functions/src/lambda.handler',
    }
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
    SiteEndpoint: site.url
  });
}
