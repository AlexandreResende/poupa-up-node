
const IncomesEntity = require('../../domain/entities/incomes-entity');

module.exports = function UpdateIncomeCommand({ incomesRepository }) {
  this.incomesRepository = incomesRepository;

  return {
    execute: async ({ body }) => {
      const incomeEntity = new IncomesEntity(body);
      const updateIncomeResult = await this.incomesRepository.update(incomeEntity);

      return updateIncomeResult;
    }
  }
};
