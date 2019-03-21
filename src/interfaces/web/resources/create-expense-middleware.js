
const Joi = require('joi');

const schema = Joi.object().keys({
  value: Joi.number().required(),
	description: Joi.string().max(255).optional(),
	category: Joi.string().max(20).required(),
	month: Joi.string().max(2).required(),
  year: Joi.string().max(4).required(),
});

module.exports = function createExpenseMiddleware(req, res, next) {
  const { body } = req;
  const { error, value } = Joi.validate(body, schema, { abortEarly: true, stripUnknown: true });

  if (error) {
    return res.status(400).json({
      error: `Missing parameters for expense creation`,
    });
  }

  next();
};