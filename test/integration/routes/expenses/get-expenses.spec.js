
const { expect, request } = require('@test/assertion');
const app = require('@app/app.js');

const faker = require('faker');

const knex = require('knex');

const { objectionSettings } = require('@root/infrastructure/config/objection-setup');

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
      const expense = {
        category: 'FOOD',
        description: 'Padaria',
        month: '05',
        value: '300.00',
        year: '2019',
      };
      const expectedLength = 3;

      await knexInstance('expenses').insert({ id: faker.random.uuid(), ...expense });
      await knexInstance('expenses').insert({ id: faker.random.uuid(), ...expense, month: '06' });
      await knexInstance('expenses').insert({ id: faker.random.uuid(), ...expense, month: '07' });

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
      const createEndpoint = '/expenses/create';
      const getExpensesEndpoint = '/expenses/get-expenses?month=11&year=2019';
      const expense = {
        category: 'FOOD',
        description: 'Padaria',
        month: '05',
        value: '300.00',
        year: '2019',
      };
      const expectedLength = 1;

      await knexInstance('expenses').insert({ id: faker.random.uuid(), ...expense });
      await knexInstance('expenses').insert({ id: faker.random.uuid(), ...expense, month: '06' });
      await knexInstance('expenses').insert({ id: faker.random.uuid(), ...expense, month: '11' });

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