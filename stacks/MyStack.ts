import { StackContext, Api, EventBus, NextjsSite } from 'sst/constructs';

export function API({ stack }: StackContext) {
  const site = new NextjsSite(stack, 'GS_SITE', {
    path: 'front'
  });

  const api = new Api(stack, 'GS_API', {
    defaults: {
      function: {
        // bind: [bus],
      }
    },
    routes: {
      'GET /': 'back/functions/src/lambda.handler',
      'GET /todo': 'back/functions/src/todo.list',
      'POST /todo': 'back/functions/src/todo.create'
    }
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
    SiteEndpoint: site.url
  });
}
