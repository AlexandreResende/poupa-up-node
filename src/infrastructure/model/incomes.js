
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

  static get relationMappings() {
    return {
      category: {
        relation: Model.HasOneRelation,
        modelClass: require('./categories'),
        join: {
          to: 'incomes.categoryId',
          from: 'categories.id',
        }
      }
    }  
  }
}