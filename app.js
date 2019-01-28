
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const routes = require('./src/routes');

/* const container = require('./src/infrastructure/container');
const router = container.resolve('router'); */

const port = process.env.PORT || 7777;
const app = express();

app
  .use(helmet())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(routes)
  .listen(port, () => {
    console.log(`The server is running on port ${port}`);
  });

module.exports = app;
