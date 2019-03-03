
const ExpensesEntity = require('@root/domain/entities/expenses-entity');

module.exports = function GetExpensesCommand({ expensesRepository }) {
  this.expensesRepository = expensesRepository;

  return {
    execute: async ({ query }) => {
      console.log('-'.repeat(20), query);
      const { month, year } = query;
      const createExpenseResult = await this.expensesRepository.getExpenses({ month, year });

      return createExpenseResult;
    }
  }
};
