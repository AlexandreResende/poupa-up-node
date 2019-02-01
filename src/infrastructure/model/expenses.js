
const { Model } = require('objection');

module.exports = class Expenses extends Model {
  static get tableName() {
    return 'expenses';
  }

  $beforeInsert() {
    this.createdAt = new Date();
  }

  $beforeUpdate() {
    this.lastUpdatedAt = new Date();
  }

  static get relationMappings() {}
}