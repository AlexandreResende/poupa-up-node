
const Joi = require('joi');

const { Model } = require('objection');

const schema = Joi.object().keys({
  value: Joi.number().required(),
	description: Joi.string().max(255).optional(),
	category: Joi.string().max(20).required(),
	month: Joi.string().max(2).required(),
  year: Joi.string().max(4).required(),
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
