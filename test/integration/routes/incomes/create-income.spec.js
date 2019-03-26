
const { expect, request } = require('@test/assertion');
const app = require('@app/app.js');

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
  describe('Create income route', () => {

    beforeEach(prepareEnvironment);

    afterEach(tearDownEnvironment);

    it('should create a income', async () => {
      // given
      const income = generateDefaultIncome();
      const endpoint = '/incomes/create';
      const expectedResult = { result: income };

      // when
      const response = await request(app)
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
      const response = await request(app)
        .post(endpoint)
        .send(income);

      // then
      expect(response.status).to.be.equal(400);
      expect(response).to.be.json;
      expect(response).to.throw;
    });
  });
});