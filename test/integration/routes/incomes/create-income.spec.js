
const { expect, request } = require('@test/assertion');
const app = require('@app/app.js');

describe('Integration Test', () => {
  describe('Create income route', () => {
    it('should create a person', async () => {
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
      const expectedResult = { error: 'ValidationError: child "value" fails because ["value" is required]' };

      // when
      const response = await request(app)
        .post(endpoint)
        .send(income);

      // then
      expect(response.status).to.be.equal(500);
      expect(response).to.be.json;
      expect(response.error.text).to.be.like(JSON.stringify(expectedResult));
    });
  });
});