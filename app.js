
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const port = process.env.PORT || 7777;
const app = express();

app
  .use(helmet())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .listen(port, () => {
    console.log(`The server is running on port ${port}`);
  });

