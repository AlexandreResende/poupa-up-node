
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

  async create(incomeData) {
    console.log(IncomesModel);
    console.log(this.model);
    console.log('incomedata', incomeData);
    const result = await this.model.query().insertAndFetch(incomeData);

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