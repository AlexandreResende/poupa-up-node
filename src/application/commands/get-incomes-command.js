
const IncomesEntity = require('../../domain/entities/incomes-entity');

module.exports = function GetIncomesCommand({ incomesRepository }) {
  this.incomesRepository = incomesRepository;

  return {
    execute: async ({ query }, res) => {
      const {month, year} = query;
      const getIncomesResult = await this.incomesRepository.getIncomes({ month, year });

      console.log(getIncomesResult);

      return getIncomesResult;
    }
  }
};
