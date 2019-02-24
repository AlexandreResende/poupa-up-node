
const ExpensesEntity = require('../../domain/entities/expenses-entity');

module.exports = function UpdateExpenseCommand({ expensesRepository }) {
  this.expensesRepository = expensesRepository;

  return {
    execute: async ({ body }) => {
      const expenseEntity = new ExpensesEntity(body);
      const createExpenseResult = await this.expensesRepository.update(expenseEntity);

      return createExpenseResult;
  }
  }
};
