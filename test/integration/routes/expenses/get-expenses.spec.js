
const { expect, request } = require('@test/assertion');
const app = require('@app/app.js');

const faker = require('faker');

const knex = require('knex');

const { objectionSettings } = require('@root/infrastructure/config/objection-setup');
const generateDefaultExpense = require('@test/_fixtures/entities/expense');

let knexInstance;

async function prepareEnvironment() {
  knexInstance = knex(objectionSettings);
  await knexInstance.migrate.latest();
  await knexInstance.seed.run();
}

async function tearDownEnvironment() {
  await knexInstance.migrate.rollback();
}

describe('Integration Test', () => {
  describe('Get expenses route', () => {

    beforeEach(prepareEnvironment);

    afterEach(tearDownEnvironment);

    it('should get all expenses', async () => {
      // given
      const getExpensesEndpoint = '/expenses/get-expenses';
      const expectedLength = 3;

      await knexInstance('expenses').insert(generateDefaultExpense({ id: faker.random.uuid() }));
      await knexInstance('expenses').insert(generateDefaultExpense({ id: faker.random.uuid() }));
      await knexInstance('expenses').insert(generateDefaultExpense({ id: faker.random.uuid() }));

      // when
      const response = await request(app)
        .get(getExpensesEndpoint);

      // then
      expect(response.status).to.be.equal(200);
      expect(response).to.be.json;
      expect(response.body.result.length).to.be.like(expectedLength);
    });

    it('should return specific expenses of a determined month and year', async () => {
      // given
      const getExpensesEndpoint = '/expenses/get-expenses?month=11&year=2019';
      const expectedLength = 1;

      await knexInstance('expenses').insert(generateDefaultExpense({ id: faker.random.uuid(), month: '09' }));
      await knexInstance('expenses').insert(generateDefaultExpense({ id: faker.random.uuid(), month: '10' }));
      await knexInstance('expenses').insert(generateDefaultExpense({ id: faker.random.uuid(), month: '11' }));

      // when
      const response = await request(app)
        .get(getExpensesEndpoint);

      // then
      expect(response.status).to.be.equal(200);
      expect(response).to.be.json;
      expect(response.body.result.length).to.be.like(expectedLength);
    });
  });
});