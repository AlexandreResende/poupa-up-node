
const IncomesEntity = require('@root/domain/entities/incomes-entity');

module.exports = function GetIncomesCommand({ incomesRepository }) {
  this.incomesRepository = incomesRepository;

  return {
    execute: async ({ query }) => {
      const {month, year} = query;
      const getIncomesResult = await this.incomesRepository.getIncomes({ month, year });

      return getIncomesResult;
    }
  }
};
