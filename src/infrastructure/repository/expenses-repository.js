
const ExpensesModel = require('../model/expenses');

module.exports = class Expenses {
  constructor({ knexInstance }) {
    this.model = ExpensesModel.bindKnex(knexInstance);
  }

  async getExpenses(whereData) {
    const inputWithoutUndefinedValues = _.omitBy(whereData, _.isUndefined);

    const result = await this.model
      .query()
      .where(inputWithoutUndefinedValues);

    return result;
  }
  
  async create(expensesData) {
    const result = await this.model
      .query()
      .insertAndFetch(expensesData);

    return result;
  }

  async update({ id, ...rest}) {
    const result = await this.model
      .query()
      .updateAndFetchById(id, rest);

    return result;
  }

  async delete({ id }) {
    const result = await this.model
      .query()
      .deleteById(id);

    return result;
  }
}