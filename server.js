const Koa = require('koa');
const bodyParser = require('koa-bodyparser')();
const compress = require('koa-compress')();
const cors = require('@koa/cors')(/* Add your cors option */);
const helmet = require('koa-helmet')(/* Add your security option */);
const Router = require('koa-router');

const server = new Koa();
const router = new Router();

const errorHandler = require('./middleware/error.middleware');
const loadRoutes = require('./routes');

/**
 * Pass to our server instance middleware
 */
server
  .use(errorHandler)
  .use(helmet)
  .use(compress)
  .use(cors)
  .use(bodyParser)
  .use(router.routes())
  .use(router.allowedMethods());

/**
 * Load API route
 */
loadRoutes(router);

module.exports = server;
