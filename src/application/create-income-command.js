
const IncomesEntity = require('../domain/entities/incomes-entity');

module.exports = function CreateIncomesCommand({ incomesRepository }) {
  this.incomesRepository = incomesRepository;

  return {
    execute: async ({ body }, res) => {
      try {
        const incomeEntity = new IncomesEntity(body);
        const createIncomeResult = await this.incomesRepository.create(incomeEntity);

        res.status(200).send({
          result: createIncomeResult,
        });
      } catch (error) {
        throw new Error(error);
      }
    }
  }
};
