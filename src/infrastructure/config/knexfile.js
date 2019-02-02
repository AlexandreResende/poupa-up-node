
module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DATABASE_URL || 'localhost',
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
