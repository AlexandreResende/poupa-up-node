
const {
  createContainer,
  asClass,
  asValue,
  asFunction,
  InjectionMode,
} = require('awilix');

const router = require('../routes');

const { knexInstance } = require('./config/objection-setup');

const CreateExpenseCommand = require('../application/commands/create-expense-command');
const CreateIncomesCommand = require('../application/commands/create-income-command');
const GetIncomesCommand = require('../application/commands/get-incomes-command');
const UpdateIncomeCommand = require('../application/commands/update-income-command');
const DeleteIncomeCommand = require('../application/commands/delete-income-command');

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
  deleteIncomeCommand: asFunction(DeleteIncomeCommand),
  getIncomesCommand: asFunction(GetIncomesCommand),
  updateIncomeCommand: asFunction(UpdateIncomeCommand),
});

//other
container.register({
  knexInstance: asValue(knexInstance)
});

module.exports = container;
