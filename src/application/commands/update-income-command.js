
const IncomesEntity = require('../../domain/entities/incomes-entity');

module.exports = function UpdateIncomeCommand({ incomesRepository }) {
  this.incomesRepository = incomesRepository;

  return {
    execute: async ({ body }, res) => {
      try {
        const incomeEntity = new IncomesEntity(body);
        const updateIncomeResult = await this.incomesRepository.update(incomeEntity);

        res.status(200).send({
          result: updateIncomeResult,
        });
      } catch (error) {
        throw new Error(error);
      }
    }
  }
};
