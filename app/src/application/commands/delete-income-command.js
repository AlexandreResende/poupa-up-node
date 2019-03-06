
module.exports = function DeleteIncomeCommand({ incomesRepository }) {
  this.incomesRepository = incomesRepository;

  return {
    execute: async ({ body }) => {
      const deleteIncomeResult = await this.incomesRepository.delete(body);

      return deleteIncomeResult;
    }
  }
};
