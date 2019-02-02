
const {
  createContainer,
  asClass,
  asValue,
  asFunction,
  InjectionMode,
} = require('awilix');

const router = require('../routes');

const { knexInstance } = require('./config/objection-setup');

const CreateIncomesCommand = require('../application/create-income-command');
const Expenses = require('../application/Expenses');

const Incomes = require('./repository/incomes-repository');
const ExpensesRepository = require('./repository/expenses-repository');

const container = createContainer({
  injectionMode: InjectionMode.PROXY,
});

container.register({
  router: asValue(router),
});

// repositories
container.register({
  incomesRepository: asClass(Incomes),
  expensesRepository: asClass(ExpensesRepository),
});

// application layer
container.register({
  createIncomesCommand: asFunction(CreateIncomesCommand),
});

//other
container.register({
  knexInstance: asValue(knexInstance)
});

module.exports = container;
