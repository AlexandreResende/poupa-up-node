
const {
  createContainer,
  asClass,
  asValue,
  asFunction,
  InjectionMode,
} = require('awilix');

const router = require('../routes');

const { knexInstance } = require('./config/objection-setup');

const CreateIncomesCommand = require('../application/commands/create-income-command');
const GetIncomesCommand = require('../application/commands/get-incomes-command');
const UpdateIncomeCommand = require('../application/commands/update-income-command');

const Incomes = require('./repository/incomes-repository');

const container = createContainer({
  injectionMode: InjectionMode.PROXY,
});

container.register({
  router: asValue(router),
});

// repositories
container.register({
  incomesRepository: asClass(Incomes),
});

// application layer
container.register({
  createIncomesCommand: asFunction(CreateIncomesCommand),
  getIncomesCommand: asFunction(GetIncomesCommand),
  updateIncomeCommand: asFunction(UpdateIncomeCommand),
});

//other
container.register({
  knexInstance: asValue(knexInstance)
});

module.exports = container;
