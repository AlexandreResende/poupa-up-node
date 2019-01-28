
const {
  createContainer,
  asValue,
  asFunction,
  InjectionMode,
} = require('awilix');

const router = require('../routes');

const Incomes = require('../application/Incomes');

const container = createContainer({
  injectionMode: InjectionMode.PROXY,
});

container.register({
  router: asValue(router),
});

// application layer
container.register({
  Incomes: asFunction(Incomes),
});

module.exports = container;
