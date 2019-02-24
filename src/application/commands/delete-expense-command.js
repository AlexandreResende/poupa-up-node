
const ExpensesEntity = require('../../domain/entities/expenses-entity');

module.exports = function DeleteExpenseCommand({ expensesRepository }) {
  this.expensesRepository = expensesRepository;

  return {
    execute: async ({ body }, res) => {
      const deleteExpenseResult = await this.expensesRepository.delete(body);

      res.status(200).send({
        result: deleteExpenseResult,
      });
    }
  }
};
