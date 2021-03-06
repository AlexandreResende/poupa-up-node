
const {
  createContainer,
  asClass,
  asValue,
  asFunction,
  InjectionMode,
} = require('awilix');

const router = require('../routes');

const { knexInstance } = require('./config/objection-setup');

// commands
const CreateExpenseCommand = require('../application/commands/create-expense-command');
const CreateIncomesCommand = require('../application/commands/create-income-command');
const GetExpensesCommand = require('../application/commands/get-expenses-command');
const GetIncomesCommand = require('../application/commands/get-incomes-command');
const HealthcheckCommand = require('../application/commands/healthcheck-command');
const UpdateExpenseCommand = require('../application/commands/update-expense-command');
const UpdateIncomeCommand = require('../application/commands/update-income-command');
const DeleteExpenseCommand = require('../application/commands/delete-expense-command');
const DeleteIncomeCommand = require('../application/commands/delete-income-command');

// middlewares
const CreateIncomeMiddleware = require('@root/interfaces/web/resources/create-income-middleware');

const Expenses = require('./repository/expenses-repository');
const Incomes = require('./repository/incomes-repository');

const container = createContainer({
  injectionMode: InjectionMode.PROXY,
});

container.register({
  router: asValue(router),
});

// repositories
container.register({
  expensesRepository: asClass(Expenses),
  incomesRepository: asClass(Incomes),
});

// application layer
container.register({
  createExpenseCommand: asFunction(CreateExpenseCommand),
  createIncomesCommand: asFunction(CreateIncomesCommand),
  deleteExpenseCommand: asFunction(DeleteExpenseCommand),
  deleteIncomeCommand: asFunction(DeleteIncomeCommand),
  getExpensesCommand: asFunction(GetExpensesCommand),
  getIncomesCommand: asFunction(GetIncomesCommand),
  healthcheckCommand: asFunction(HealthcheckCommand),
  updateExpenseCommand: asFunction(UpdateExpenseCommand),
  updateIncomeCommand: asFunction(UpdateIncomeCommand),
});

// middlewares
container.register({
  createIncomeMiddleware: asFunction(CreateIncomeMiddleware),
});

//other
container.register({
  knexInstance: asValue(knexInstance)
});

module.exports = container;
