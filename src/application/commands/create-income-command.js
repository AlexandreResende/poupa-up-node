
const IncomesEntity = require('../../domain/entities/incomes-entity');

module.exports = function CreateIncomesCommand({ incomesRepository }) {
  this.incomesRepository = incomesRepository;

  return {
    execute: async ({ body }) => {
      const incomeEntity = new IncomesEntity(body);
      const createIncomeResult = await this.incomesRepository.create(incomeEntity);

      return createIncomeResult;
    }
  }
};
