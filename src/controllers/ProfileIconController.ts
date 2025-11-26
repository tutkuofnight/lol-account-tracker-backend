import { Controller } from '@asenajs/asena/server';
import { Get } from '@asenajs/asena/web';
import { StaticServeMiddleware } from '../middlewares/ProfileIconMiddleware';

@Controller({ path: '/static' })
export class StaticController {
  @Get({ path: '/*', staticServe: StaticServeMiddleware })
  public static() {}
}
