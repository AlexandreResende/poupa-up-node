const faker = require('faker');

const generateDefaultIncome = (fields) => {
  return {
    value: faker.random.number({ max: 1000, min: 1 }).toFixed(2).toString(),
    description: faker.random.words(),
    category: 'FOOD',
    month: '01',
    year: '2019',
    lastUpdatedAt: null,
    ...fields,
  };
};

module.exports = generateDefaultIncome;
