
const uuid = require('uuid/v4');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('categories').del().then(() => {
      // Inserts seed entries
      return knex('categories').insert([
        { id: uuid(), categoryName: 'FOOD'},
        { id: uuid(), categoryName: 'INCOME'},
        { id: uuid(), categoryName: 'EXPENSES'},
        { id: uuid(), categoryName: 'ENTERTAINMENT'},
        { id: uuid(), categoryName: 'HEALTH'},
        { id: uuid(), categoryName: 'TRANSPORTATION'},
        { id: uuid(), categoryName: 'STUDY'},
      ]);
    });
};
