
const ExpensesEntity = require('../../domain/entities/expenses-entity');

module.exports = function CreateIncomesCommand({ expensesRepository }) {
  this.expensesRepository = expensesRepository;

  return {
    execute: async ({ body }) => {
      const expenseEntity = new ExpensesEntity(body);
      const createExpenseResult = await this.expensesRepository.create(expenseEntity);

      return createExpenseResult;
    }
  }
};
