import { Config } from '@asenajs/asena/server';
import { type Context, ConfigService } from '@asenajs/hono-adapter';
import { GlobalCors } from '../middlewares/GlobalCors';

@Config()
export class ServerConfig extends ConfigService {

  public globalMiddlewares() {
    return [GlobalCors];
  }

  public onError(error: Error, context: Context): Response | Promise<Response> {
    console.log('ERROR:', error.stack);

    return context.send({ error: error.message }, 500);
  }
}