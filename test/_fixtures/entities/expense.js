const faker = require('faker');

const generateDefaultExpense = (fields) => {
  return {
    value: faker.random.number({ max: 1000, min: 1 }),
    description: faker.random.words(),
    category: 'FOOD',
    month: '01',
    year: '2019',
    createdAt:  new Date(),
    updatedAt: null,
  };
};

module.exports = generateDefaultExpense;
