
const { Model } = require('objection');

module.exports = class Incomes extends Model {
  static get tableName() {
    return 'incomes';
  }

  $beforeInsert() {
    this.createdAt = new Date();
  }

  $beforeUpdate() {
    this.lastUpdatedAt = new Date();
  }

  static get relationMappings() {}
}