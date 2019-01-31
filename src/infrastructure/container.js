
const {
  createContainer,
  asClass,
  asValue,
  asFunction,
  InjectionMode,
} = require('awilix');

const router = require('../routes');

const Incomes = require('../application/Incomes');
const Expenses = require('../application/Expenses');

const IncomesRepository = require('../domain/repository/incomes-repository');
const ExpensesRepository = require('../domain/repository/expenses-repository');

const container = createContainer({
  injectionMode: InjectionMode.PROXY,
});

container.register({
  router: asValue(router),
});

container.register({
  incomesRepository: asClass(IncomesRepository),
  expensesRepository: asClass(ExpensesRepository),
});

// application layer
container.register({
  Incomes: asFunction(Incomes),
  Expenses: asFunction(Expenses),
});

module.exports = container;
