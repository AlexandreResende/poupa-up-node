
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

describe.only('Integration Test', () => {
  describe('Update income route', () => {

    beforeEach(prepareEnvironment);

    afterEach(tearDownEnvironment);

    it('should update an existing income', async () => {
      // given
      const incomeId = faker.random.uuid();
      const updateEndpoint = '/incomes/update';
      const income = generateDefaultIncome({ id: incomeId });

      await knexInstance('incomes').insert(income);

      const updatedIncome = { value: '500.00', id: incomeId };
      const expectedResult = { result: { ...income, value: updatedIncome.value, id: incomeId } };

      // when
      const response = await request(app)
        .put(updateEndpoint)
        .send(updatedIncome);

      // then
      expectedResult.result.createdAt = response.body.result.createdAt;
      expectedResult.result.lastUpdatedAt = response.body.result.lastUpdatedAt;
      expect(response.status).to.be.equal(200);
      expect(response).to.be.json;
      expect(response.body).to.be.like(expectedResult);
    });

    it('should throw an error when an empty body is passed', async () => {
      // given
      const updateEndpoint = '/incomes/update';
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