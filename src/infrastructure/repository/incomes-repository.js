
const _ = require('lodash');

const IncomesModel = require('../model/incomes');

module.exports = class Incomes {
  constructor({ knexInstance }) {
    this.model = IncomesModel.bindKnex(knexInstance);
  }

  async getIncomes(whereData) {
    const whereClauseInput = _.omitBy(whereData, _.isUndefined);

    const result = await this.model.query().where(whereClauseInput);

    return result;
  }

  async create(incomeData) {
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