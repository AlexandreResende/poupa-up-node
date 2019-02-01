
const IncomesModel = require('../model/incomes');

module.exports = class Incomes {
  constructor({ knexInstance }) {
    this.model = IncomesModel.bindKnex(knexInstance);
  }

  async getAllIncomes() {
    const result = await this.model.query().where({});

    return result;
  }

  async getMonthlyIncomes(month, year) {
    const result = await this.model.query().where({
      month,
      year,
    });
  }

  async create(IncomesData) {
    const result = await this.model.query().insertAndFetch(IncomesData);

    return result;
  }

  async update({ id, ...rest}) {
    const result = await this.model.query().updateAndFetchById(id, rest);

    return result;
  }

  async delete(id) {
    const result = await this.model.query().deleteById(id);

    return result;
  }
}