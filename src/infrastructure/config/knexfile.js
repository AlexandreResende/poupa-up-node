
module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'postgrestest',
      password: 'postgrestest',
      database: 'poupaup',
    },
    debug: false,
    migrations: {
      directory: '../migrations'
    },
    seeds: {
      directory: '../seeds'
    }
  }
};
