
module.exports = {
  test: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'postgrestest',
      password: 'postgrestest',
      database: 'poupauptest',
    },
    debug: false,
    migrations: {
      directory: './src/infrastructure/migrations'
    },
    seeds: {
      directory: './src/infrastructure/seeds'
    }
  },
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
  },
  production: {
    client: process.env.DB_CLIENT || 'pg',
    connection: process.env.DATABASE_URL,
    debug: false,
    migrations: {
      directory: '../migrations'
    },
    seeds: {
      directory: '../seeds'
    }
  },
  staging: {
    client: process.env.DB_CLIENT || 'pg',
    connection: process.env.DATABASE_URL,
    debug: false,
    migrations: {
      directory: '../migrations'
    },
    seeds: {
      directory: '../seeds'
    }
  }
};
