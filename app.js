
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');

const routes = require('./app/src/routes');

const port = process.env.PORT || 7777;
const app = express();

app
  .use(helmet())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(cors())
  .use(routes)
  .listen(port, () => {
    console.log(`The server is running on port ${port}`);
  });

module.exports = app;
