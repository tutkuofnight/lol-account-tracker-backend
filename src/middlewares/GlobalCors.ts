import { Middleware } from '@asenajs/asena/server';
import { CorsMiddleware } from '@asenajs/hono-adapter';

@Middleware()
export class GlobalCors extends CorsMiddleware {
  constructor() {
    super({
      origin: '*',
    });
  }
}