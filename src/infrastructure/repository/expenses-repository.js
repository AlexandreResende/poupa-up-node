module.exports = class Expenses {
  constructor({ knexInstance }) {
    this.model = ExpensesModel.bindKnex(knexInstance);
  }

  getAllIncomes() {}

  getMonthlyIncomes() {}

  create() {}

  update() {}

  delete() {}
}