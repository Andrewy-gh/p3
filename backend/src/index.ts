import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { basicsRoute } from './routes/basics';

const app = new Hono();
app.use(logger()).onError((err, c) => {
  console.error(err);
  return c.json(err, 500);
});

export const apiRoutes = app.basePath('/api').route('/basics', basicsRoute);

export default {
  port: 3000,
  fetch: app.fetch
};
