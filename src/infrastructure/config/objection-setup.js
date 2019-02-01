
const knex = require('knex');
const { knexSnakeCaseMappers } = require('objection');

const { postProcessResponse, wrapIdentifier } = knexSnakeCaseMappers();

const database = require('./knex-configuration');

const objectionSettings = {
  ...database,
  postProcessResponse,
  wrapIdentifier,
};

const knexInstance = knex(objectionSettings);

module.exports = {
  knexInstance,
  objectionSettings,
};
