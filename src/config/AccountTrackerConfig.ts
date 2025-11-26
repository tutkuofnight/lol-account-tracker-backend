import { Config } from '@asenajs/asena/server';
import { ConfigService, CorsMiddleware, type Context } from '@asenajs/hono-adapter';

@Config()
export class ServerConfig extends ConfigService {
  middlewares = [CorsMiddleware];
}
export class AccountTrackerConfig extends ConfigService {
  public onError(error: Error, context: Context): Response | Promise<Response> {
    console.log('ERROR:', error.stack);

    return context.send({ error: error.message }, 500);
  }
}
