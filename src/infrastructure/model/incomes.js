
const { Model } = require('objection');

module.exports = class Incomes extends Model {
  static get tableName() {
    return 'incomes';
  }

  static get idColumn() {
    return 'id';
  }

  $beforeInsert() {
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