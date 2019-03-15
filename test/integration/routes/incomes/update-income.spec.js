
const { expect, request } = require('@test/assertion');
const app = require('@app/app.js');

describe('Integration Test', () => {
  describe('Update income route', () => {
    it('should update an existing income', async () => {
      // given
      const createEndpoint = '/incomes/create';
      const updateEndpoint = '/incomes/update';
      const income = {
        category: 'FOOD',
        description: 'Padaria',
        month: '05',
        value: '300.00',
        year: '2019',
      };

      const { body: { result: { id } } } = await request(app).post(createEndpoint).send(income);

      const updatedIncome = { value: '500.00', id };
      const expectedResult = { result: { ...income, value: updatedIncome.value, id } };

      // when
      const response = await request(app)
        .put(updateEndpoint)
        .send(updatedIncome);

      // then
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