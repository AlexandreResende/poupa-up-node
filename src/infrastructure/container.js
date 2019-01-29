
const {
  createContainer,
  asValue,
  asFunction,
  InjectionMode,
} = require('awilix');

const router = require('../routes');

const Incomes = require('../application/Incomes');
const Expenses = require('../application/Expenses');

const container = createContainer({
  injectionMode: InjectionMode.PROXY,
});

container.register({
  router: asValue(router),
});

// application layer
container.register({
  Incomes: asFunction(Incomes),
  Expenses: asFunction(Expenses),
});

module.exports = container;
