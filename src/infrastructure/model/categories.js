
const { Model } = require('objection');

module.exports = class Categories extends Model {
  static get tableName() {
    return 'categories';
  }

  $beforeInsert() {
    this.createdAt = new Date();
  }

  $beforeUpdate() {
    this.lastUpdatedAt = new Date();
  }
}