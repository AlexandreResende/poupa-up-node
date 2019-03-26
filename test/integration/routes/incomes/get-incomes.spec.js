
const { expect, request } = require('@test/assertion');
const app = require('@app/app.js');

const faker = require('faker');

const knex = require('knex');

const { objectionSettings } = require('@root/infrastructure/config/objection-setup');
const generateDefaultIncome = require('@test/_fixtures/entities/income');

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
  describe('Get incomes route', () => {

    beforeEach(prepareEnvironment);

    afterEach(tearDownEnvironment);

    it('should get all incomes', async () => {
      // given
      const getIncomesEndpoint = '/incomes/get-incomes';
      const income = generateDefaultIncome();
      const expectedLength = 3;

      await knexInstance('incomes').insert({ id: faker.random.uuid(), ...income });
      await knexInstance('incomes').insert({ id: faker.random.uuid(), ...income });
      await knexInstance('incomes').insert({ id: faker.random.uuid(), ...income });

      // when
      const response = await request(app)
        .get(getIncomesEndpoint);

      // then
      expect(response.status).to.be.equal(200);
      expect(response).to.be.json;
      expect(response.body.result.length).to.be.like(expectedLength);
    });

    it('should return specific incomes of a determined month and year', async () => {
      // given
      const getIncomesEndpoint = '/incomes/get-incomes?month=11&year=2019';
      const income = generateDefaultIncome();
      const expectedLength = 1;

      await knexInstance('incomes').insert({ id: faker.random.uuid(), ...income });
      await knexInstance('incomes').insert({ id: faker.random.uuid(), ...income, month: '06' });
      await knexInstance('incomes').insert({ id: faker.random.uuid(), ...income, month: '11' });

      // when
      const response = await request(app)
        .get(getIncomesEndpoint);

      // then
      expect(response.status).to.be.equal(200);
      expect(response).to.be.json;
      expect(response.body.result.length).to.be.like(expectedLength);
    });
  });
});