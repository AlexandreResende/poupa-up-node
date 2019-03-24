
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
  describe('Delete expense route', () => {

    beforeEach(prepareEnvironment);

    afterEach(tearDownEnvironment);

    it('should delete an existing expense', async () => {
      // given
      const expenseId = faker.random.uuid();
      const deleteEndpoint = '/expenses/delete';
      const expense = generateDefaultExpense({ id: expenseId });

      await knexInstance('expenses').insert(expense);

      const deletedExpense = { id: expenseId };
      const expectedResult = { result: 1 };

      // when
      const response = await request(app)
        .delete(deleteEndpoint)
        .send(deletedExpense);

      // then
      expect(response.status).to.be.equal(200);
      expect(response).to.be.json;
      return expect(response.body).to.be.like(expectedResult);
    });

    it('should throw an error when an empty body is passed', async () => {
      // given
      const updateEndpoint = '/expenses/delete';
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