
const knex = require('knex');
const { knexSnakeCaseMappers } = require('objection');

const { postProcessResponse, wrapIdentifier } = knexSnakeCaseMappers();

const database = require('./knexfile');

const env = (process.env.NODE_ENV !== 'test')
  ? process.env.NODE_ENV || 'development'
  : 'development';

const objectionSettings = {
  ...database[env],
  postProcessResponse,
  wrapIdentifier,
};

const knexInstance = knex(objectionSettings);

module.exports = {
  knexInstance,
  objectionSettings,
};
