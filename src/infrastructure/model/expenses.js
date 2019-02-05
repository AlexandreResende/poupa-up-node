
const uuid = require('uuid/v4');

const { Model } = require('objection');

module.exports = class Expenses extends Model {
  static get tableName() {
    return 'expenses';
  }

  $beforeInsert() {
    this.id = uuid();
    this.createdAt = new Date();
  }

  $beforeUpdate() {
    this.lastUpdatedAt = new Date();
  }

  static get relationMappings() {
    return {
      categoryInfo: {
        relation: Model.HasOneRelation,
        modelClass: require('./categories'),
        join: {
          to: 'incomes.category',
          from: 'categories.name',
        }
      }
    }  
  }
}
