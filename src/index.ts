import { AsenaServerFactory } from '@asenajs/asena';
import { createHonoAdapter } from '@asenajs/hono-adapter';
import { logger } from './logger/logger';

const [honoAdapter, asenaLogger] = createHonoAdapter(logger);

const server = await AsenaServerFactory.create({
  adapter: honoAdapter,
  logger: asenaLogger,
  port: 3000,
});

await server.start();
