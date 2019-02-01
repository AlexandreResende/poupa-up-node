
const {
  createContainer,
  asClass,
  asValue,
  asFunction,
  InjectionMode,
} = require('awilix');

const router = require('../routes');

const { knexInstance } = require('./config/objection-setup');
const { Model } = require('objection');

const Incomes = require('../application/Incomes');
const Expenses = require('../application/Expenses');

const IncomesRepository = require('./repository/incomes-repository');
const ExpensesRepository = require('./repository/expenses-repository');

const container = createContainer({
  injectionMode: InjectionMode.PROXY,
});

container.register({
  router: asValue(router),
});

// repositories
container.register({
  incomesRepository: asClass(IncomesRepository),
  expensesRepository: asClass(ExpensesRepository),
});

// application layer
container.register({
  Incomes: asFunction(Incomes),
  Expenses: asFunction(Expenses),
});

//other
container.register({
  knexInstance: asValue(knexInstance)
});

module.exports = container;
