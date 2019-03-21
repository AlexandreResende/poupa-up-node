
const { expect, request } = require('@test/assertion');

const faker = require('faker');

const app = require('@app/app.js');

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
  describe('Delete income route', () => {

    beforeEach(prepareEnvironment);

    afterEach(tearDownEnvironment);

    it('should delete an existing income', async () => {
      // given
      const deleteEndpoint = '/incomes/delete';
      const incomeId = faker.random.uuid();
      const income = {
        category: 'FOOD',
        description: 'Padaria',
        month: '05',
        value: '300.00',
        year: '2019',
      };

      await knexInstance('incomes').insert({ id: incomeId, ...income });

      const deletedIncome = { id: incomeId };
      const expectedResult = { result: 1 };

      // when
      const response = await request(app)
        .delete(deleteEndpoint)
        .send(deletedIncome);

      // then
      expect(response.status).to.be.equal(200);
      expect(response).to.be.json;
      return expect(response.body).to.be.like(expectedResult);
    });

    it('should throw an error when an empty body is passed', async () => {
      // given
      const updateEndpoint = '/incomes/delete';
      const requestBody = {};

      // when
      const response = await request(app)
        .delete(updateEndpoint)
        .send(requestBody);

      // then
      expect(response.status).to.be.equal(500);
      return expect(response).to.throw;
    });
  });
});