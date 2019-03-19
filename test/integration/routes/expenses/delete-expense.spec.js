
const { expect, request } = require('@test/assertion');
const app = require('@app/app.js');

describe('Integration Test', () => {
  describe('Delete expense route', () => {
    it('should delete an existing expense', async () => {
      // given
      const createEndpoint = '/expenses/create';
      const deleteEndpoint = '/expenses/delete';
      const expense = {
        category: 'FOOD',
        description: 'Padaria',
        month: '05',
        value: '300.00',
        year: '2019',
      };

      const { body: { result: { id } } } = await request(app).post(createEndpoint).send(expense);

      const deletedExpense = { id };
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