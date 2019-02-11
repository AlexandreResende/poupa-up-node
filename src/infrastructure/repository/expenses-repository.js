
const ExpensesModel = require('../model/expenses');

module.exports = class Expenses {
  constructor({ knexInstance }) {
    this.model = ExpensesModel.bindKnex(knexInstance);
  }

  async getAllExpenses() {
    const result = await this.model.query().where({});

    return result;
  }

  async getMonthlyExpenses(month, year) {
    const result = await this.model.query().where({
      month,
      year,
    });
  }

  async create(expensesData) {
    const result = await this.model.query().insertAndFetch(expensesData);

    return result;
  }

  async update({ id, ...rest}) {
    const result = await this.model
      .query()
      .updateAndFetchById(id, rest);

    return result;
  }

  async delete(id) {
    const result = await this.model.query().deleteById(id);

    return result;
  }
}