
const Joi = require('joi');

const { Model } = require('objection');

const schema = Joi.object().keys({
  value: Joi.number(),
	description: Joi.string().max(255),
	category: Joi.string().max(20),
	month: Joi.string().max(2),
  year: Joi.string().max(4),
  createdAt: Joi.date(),
  updatedAt: Joi.date().allow(null),
});

class ExpensesEntity extends Model {
  constructor(data) {
    super();
    const { value, error } = Joi.validate(data, schema, { abortEarly: true, stripUnknown: true });

    if (error) throw TypeError(error);

    Object.assign(this, data);
  }

  static get schema() {
    return schema;
  }
}

module.exports = ExpensesEntity;
