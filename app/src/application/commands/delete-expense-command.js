
module.exports = function DeleteExpenseCommand({ expensesRepository }) {
  this.expensesRepository = expensesRepository;

  return {
    execute: async ({ body }) => {
      const deleteExpenseResult = await this.expensesRepository.delete(body);

      return deleteExpenseResult;
    }
  }
};
