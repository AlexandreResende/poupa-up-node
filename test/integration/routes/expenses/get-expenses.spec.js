
const { expect, request } = require('@test/assertion');
const app = require('@app/app.js');

describe('Integration Test', () => {
  describe('Get expenses route', () => {
    it('should get all expenses', async () => {
      // given
      const createEndpoint = '/expenses/create';
      const getExpensesEndpoint = '/expenses/get-expenses';
      const expense = {
        category: 'FOOD',
        description: 'Padaria',
        month: '05',
        value: '300.00',
        year: '2019',
      };
      const expectedLength = 3;

      await request(app).post(createEndpoint).send(expense);
      await request(app).post(createEndpoint).send({ ...expense, month: '06' });
      await request(app).post(createEndpoint).send({ ...expense, month: '07' });

      // when
      const response = await request(app)
        .get(getExpensesEndpoint);

      // then
      expect(response.status).to.be.equal(200);
      expect(response).to.be.json;
      expect(response.body.result.length).to.be.like(expectedLength);
    });

    it('should return specific expenses of a determined month and year', async () => {
      // given
      const createEndpoint = '/expenses/create';
      const getExpensesEndpoint = '/expenses/get-expenses?month=11&year=2019';
      const expense = {
        category: 'FOOD',
        description: 'Padaria',
        month: '05',
        value: '300.00',
        year: '2019',
      };
      const expectedLength = 1;

      await request(app).post(createEndpoint).send(expense);
      await request(app).post(createEndpoint).send({ ...expense, month: '06' });
      await request(app).post(createEndpoint).send({ ...expense, month: '11' });

      // when
      const response = await request(app)
        .get(getExpensesEndpoint);

      // then
      expect(response.status).to.be.equal(200);
      expect(response).to.be.json;
      expect(response.body.result.length).to.be.like(expectedLength);
    });
  });
});