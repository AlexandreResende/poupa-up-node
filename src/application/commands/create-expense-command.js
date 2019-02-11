
const ExpensesEntity = require('../../domain/entities/expenses-entity');

module.exports = function CreateIncomesCommand({ expensesRepository }) {
  this.expensesRepository = expensesRepository;

  return {
    execute: async ({ body }, res) => {
      try {
        const expenseEntity = new ExpensesEntity(body);
        const createExpenseResult = await this.expensesRepository.create(expenseEntity);

        res.status(200).send({
          result: createExpenseResult,
        });
      } catch (error) {
        throw new Error(error);
      }
    }
  }
};
