
const { expect, request } = require('@test/assertion');
const app = require('@app/app.js');

describe.only('Integration Test', () => {
  describe('Get incomes route', () => {
    it('should delete an existing income', async () => {
      // given
      const createEndpoint = '/incomes/create';
      const getIncomesEndpoint = '/incomes/get-incomes';
      const income = {
        category: 'FOOD',
        description: 'Padaria',
        month: '05',
        value: '300.00',
        year: '2019',
      };
      const expectedLength = 3;

      await request(app).post(createEndpoint).send(income);
      await request(app).post(createEndpoint).send({ ...income, month: '06' });
      await request(app).post(createEndpoint).send({ ...income, month: '07' });

      // when
      const response = await request(app)
        .get(getIncomesEndpoint);

      // then
      expect(response.status).to.be.equal(200);
      expect(response).to.be.json;
      expect(response.body.result.length).to.be.like(expectedLength);
    });

    it('should return specific incomes of a determined month and year', async () => {
      // given
      const createEndpoint = '/incomes/create';
      const getIncomesEndpoint = '/incomes/get-incomes?month=11&year=2019';
      const income = {
        category: 'FOOD',
        description: 'Padaria',
        month: '05',
        value: '300.00',
        year: '2019',
      };
      const expectedLength = 1;

      await request(app).post(createEndpoint).send(income);
      await request(app).post(createEndpoint).send({ ...income, month: '06' });
      await request(app).post(createEndpoint).send({ ...income, month: '11' });

      // when
      const response = await request(app)
        .get(getIncomesEndpoint);

      // then
      expect(response.status).to.be.equal(200);
      expect(response).to.be.json;
      expect(response.body.result.length).to.be.like(expectedLength);
    });
  });
});