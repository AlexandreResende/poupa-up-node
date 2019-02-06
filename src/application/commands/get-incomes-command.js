
const IncomesEntity = require('../../domain/entities/incomes-entity');

module.exports = function GetIncomesCommand({ incomesRepository }) {
  this.incomesRepository = incomesRepository;

  return {
    execute: async ({ query }, res) => {
      try {
        const {month, year} = query;
        const getIncomesResult = await this.incomesRepository.getIncomes({ month, year });

        res.status(200).send({
          result: getIncomesResult,
        });
      } catch (error) {
        throw new Error(error);
      }
    }
  }
};
