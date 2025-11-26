import { StaticServe } from '@asenajs/asena/server';
import { StaticServeService, type Context } from '@asenajs/hono-adapter';
import path from 'path';

@StaticServe({ root: path.join(process.cwd(), 'public') })
export class StaticServeMiddleware extends StaticServeService {
  public rewriteRequestPath(reqPath: string): string {
    // Remove /static prefix from path
    return reqPath.replace(/^\/static\/|^\/static/, '');
  }

  public onFound(filePath: string, _c: Context): void {
    console.log(`File served: ${filePath}`);
  }

  public onNotFound(reqPath: string, c: Context): void {
    console.log(`File not found: ${reqPath}`);
  }
}
