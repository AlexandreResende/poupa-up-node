
const ExpensesEntity = require('../../domain/entities/expenses-entity');

module.exports = function GetExpensesCommand({ expensesRepository }) {
  this.expensesRepository = expensesRepository;

  return {
    execute: async ({ query }, res) => {
      try {
        const { month, year } = query;
        const createExpenseResult = await this.expensesRepository.getExpenses({ month, year });

        res.status(200).send({
          result: createExpenseResult,
        });
      } catch (error) {
        throw new Error(error);
      }
    }
  }
};
