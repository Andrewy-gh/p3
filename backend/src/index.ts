import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { basicsRoute } from './routes/basics';
import { naiveAgentsRoute } from './routes/naive-agents';

const app = new Hono();
app.use(logger()).onError((err, c) => {
  console.error(err);
  return c.json(err, 500);
});

export const apiRoutes = app
  .basePath('/api')
  .route('/basics', basicsRoute)
  .route('/naive-agents', naiveAgentsRoute);

Bun.serve({
  port: 3000,
  fetch: app.fetch,
  idleTimeout: 60,
});
