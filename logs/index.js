'use strict';

require('dotenv').config();
const cors = require('kcors');
const mongoose = require('mongoose');
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const loadRoutes = require('./routes');
const app = new Koa();
const router = new Router();
const port = process.env.LOGS_PORT || 3003;

console.log(port);

mongoose
  .connect(
    'mongodb+srv://user:user_password@sample-db.igj8t.mongodb.net/?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  )
  .then(result => {
    console.log('successfully connected to the database');
    app.listen(port, () => {
      console.log(`logs service running at http://localhost:${port}`);
    });
  })
  .catch(err => console.log(err));

app
  .use(cors())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

loadRoutes(router);
