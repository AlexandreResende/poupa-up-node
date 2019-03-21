
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
  describe('Update expense route', () => {

    beforeEach(prepareEnvironment);

    afterEach(tearDownEnvironment);

    it('should update an existing expense', async () => {
      // given
      const expenseId = faker.random.uuid();
      const updateEndpoint = '/expenses/update';
      const expense = {
        category: 'FOOD',
        description: 'Padaria',
        month: '05',
        value: '300.00',
        year: '2019',
      };

      await knexInstance('expenses').insert({ id: expenseId, ...expense });

      const updatedExpense = { value: '500.00', id: expenseId };
      const expectedResult = { result: { ...expense, value: updatedExpense.value, id: expenseId } };

      // when
      const response = await request(app)
        .put(updateEndpoint)
        .send(updatedExpense);

      // then
      expect(response.status).to.be.equal(200);
      expect(response).to.be.json;
      expect(response.body).to.be.like(expectedResult);
    });

    it('should throw an error when an empty body is passed', async () => {
      // given
      const updateEndpoint = '/expenses/update';
      const requestBody = {};

      // when
      const response = await request(app)
        .put(updateEndpoint)
        .send(requestBody);

      // then
      expect(response.status).to.be.equal(500);
      expect(response).to.throw;
    });
  });
});