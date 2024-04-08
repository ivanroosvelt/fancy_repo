import { StackContext, Api, EventBus, NextjsSite } from 'sst/constructs';

export function API({ stack }: StackContext) {
  const site = new NextjsSite(stack, 'KEYBOARY_SITE', {
    path: 'front'
  });

  const api = new Api(stack, 'GOODSQUARE_API', {
    routes: {
      'GET /process': 'back/src/lambda.handler',
      'POST /process': 'back/src/process.handler',
      $default: 'back/src/lambda.handler',
    }
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
    SiteEndpoint: site.url
  });
}
