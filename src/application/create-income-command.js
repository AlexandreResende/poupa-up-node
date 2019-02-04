
const IncomesEntity = require('../domain/entities/incomes-entity');

module.exports = function CreateIncomesCommand({ incomesRepository }) {
  this.incomesRepository = incomesRepository;

  return {
    execute: async ({ body }, res) => {
      try {
        const incomeEntity = new IncomesEntity(body);
      // console.log(incomeEntity);
      const createIncomesResult = await this.incomesRepository.create(body);

      res.status(200).send({ message: 'working' });
      } catch (error) {
        throw new Error(error);
      }
    }
  }
};
