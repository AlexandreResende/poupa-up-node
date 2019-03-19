
const { expect, request } = require('@test/assertion');
const app = require('@app/app.js');

describe.only('Integration Test', () => {
  describe('Update expense route', () => {
    it('should update an existing expense', async () => {
      // given
      const createEndpoint = '/expenses/create';
      const updateEndpoint = '/expenses/update';
      const expense = {
        category: 'FOOD',
        description: 'Padaria',
        month: '05',
        value: '300.00',
        year: '2019',
      };

      const { body: { result: { id } } } = await request(app).post(createEndpoint).send(expense);

      const updatedExpense = { value: '500.00', id };
      const expectedResult = { result: { ...expense, value: updatedExpense.value, id } };

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