const knexBuilder = require('knex');
const uuid = require('uuid/v4');
const { knexSnakeCaseMappers } = require('objection');

// can set it manually while I dont have a .env or docker-compose file
// const { dbHost, dbPassword, dbPort, dbUser } = require('@root/infrastructure/config/');

const { postProcessResponse, wrapIdentifier } = knexSnakeCaseMappers();

module.exports = class Database {
  constructor() {
    this.databaseName = `poupaup${uuid()}`.replace(/-/g, '');
  }

  async setup() {
    this.knex = knexBuilder(this.knexConfig(this.databaseName));
    this.knexDatabaseCreator = knexBuilder(this.knexConfig('postgres'));

    console.log('creating databse');
    await this.knexDatabaseCreator.raw(`CREATE DATABASE ${this.databaseName}`);
    console.log('database created');
    await this.knex.migrate.latest();
    await this.knex.seed.run();
  }

  async cleanUpAllTestDatabases() {
    let knex;

    try {
      knex = knexBuilder(this.knexConfig('postgres'));
      const queryResult = await knex
        .raw('SELECT datname FROM pg_database WHERE datistemplate = false');

      const testDatabases = queryResult
        .rows
        .filter(row => row.datname.startsWith('poupaup_test_'))
        .map(row => row.datname);

      // eslint-disable-next-line no-console
      console.log('Dropping databases %j', testDatabases);

      await Promise.all(testDatabases.map(database => knex.raw(`DROP DATABASE ${database}`)));
    } finally {
      if (knex) knex.destroy();
    }
  }

  async teardown() {
    if (this.knex) {
      await this.knex.destroy();
    }

    if (this.knexDatabaseCreator) {
      await this.knexDatabaseCreator.raw(`
        SELECT pg_terminate_backend(pg_stat_activity.pid)
        FROM pg_stat_activity
        WHERE pg_stat_activity.datname = '${this.databaseName}' AND pid <> pg_backend_pid();
      `);

      await this.knexDatabaseCreator.raw(`DROP DATABASE IF EXISTS ${this.databaseName}`);
      await this.knexDatabaseCreator.destroy();
    }
  }

  knexConfig(databaseName) {
    return {
      client: 'pg',
      connection: {
        database: databaseName,
        host: 'localhost',
        password: 'postgrestest',
        port: 5432,
        user: 'postgrestest',
      },
      debug: false,
      migrations: {
        directory: 'src/infrastructure/migrations',
        disableTransactions: true,
      },
      pool: { max: 1, min: 0 },
      postProcessResponse,
      seeds: {
        directory: 'src/infrastructure/seeds',
      },
      wrapIdentifier,
    };
  }
};
