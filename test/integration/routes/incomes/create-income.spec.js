
const { expect, request } = require('@test/assertion');

const faker = require('faker');
const knex = require('knex');

const TestDatabase = require('@root/infrastructure/config/database');
const { objectionSettings } = require('@root/infrastructure/config/objection-setup');

let knexInstance;
let testDb;

async function prepareEnvironment() {
  process.env.DATABASE_NAME = `poupaup_test_${faker.random.uuid()}`.replace(/-/g, '');

  delete require.cache['/project/src/routes.js'];
  delete require.cache['/project/src/interfaces/web/adapter.js'];
  delete require.cache['/project/src/infrastructure/container.js'];
  delete require.cache['/project/src/infrastructure/config/objection-setup.js'];
  delete require.cache['/project/src/infrastructure/config/knexfile.js'];

  testDb = new TestDatabase();
  testDb.databaseName = process.env.DATABASE_NAME;
  await testDb.setup();

  objectionSettings.connection.database = testDb.databaseName;

  console.log('objection settings');
  console.log(objectionSettings);

  knexInstance = knex(objectionSettings);
}

async function tearDownEnvironment() {
  await knexInstance.destroy();
  await testDb.teardown();
}

describe('Integration Test', () => {
  describe('Create income route', () => {

    beforeEach(prepareEnvironment);

    // afterEach(tearDownEnvironment);

    it.only('should create a income', async () => {
      // given
      const income = {
        category: 'FOOD',
        description: 'Padaria',
        month: '05',
        value: '300.00',
        year: '2019',
      };
      const endpoint = '/incomes/create';
      const expectedResult = { result: income };

      // await knexInstance('incomes').insert({ ...income, id: faker.random.uuid() });

      // when
      const response = await request()
        .post(endpoint)
        .send(income);

      // then
      expect(response.status).to.be.equal(200);
      expect(response).to.be.json;
      expect(response.body).to.be.like(expectedResult);
    });

    it('should return a validation error when expected data is not passed', async () => {
      // given
      const income = {};
      const endpoint = '/incomes/create';

      // when
      const response = await request()
        .post(endpoint)
        .send(income);

      // then
      expect(response.status).to.be.equal(400);
      expect(response).to.be.json;
      expect(response).to.throw;
    });
  });
});