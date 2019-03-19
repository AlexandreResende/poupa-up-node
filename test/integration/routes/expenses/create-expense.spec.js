
const { expect, request } = require('@test/assertion');
const app = require('@app/app.js');

describe('Integration Test', () => {
  describe('Create expense route', () => {
    it('should create a expense', async () => {
      // given
      const expense = {
        category: 'FOOD',
        description: 'Padaria',
        month: '05',
        value: '300.00',
        year: '2019',
      };
      const endpoint = '/incomes/create';
      const expectedResult = { result: expense };

      // when
      const response = await request(app)
        .post(endpoint)
        .send(expense);

      // then
      expect(response.status).to.be.equal(200);
      expect(response).to.be.json;
      expect(response.body).to.be.like(expectedResult);
    });

    it('should return a validation error when expected data is not passed', async () => {
      // given
      const income = {};
      const endpoint = '/expenses/create';

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