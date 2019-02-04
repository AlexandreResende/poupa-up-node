
const uuid = require('uuid/v4');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('categories').del().then(() => {
      // Inserts seed entries
      return knex('categories').insert([
        { id: uuid(), name: 'FOOD'},
        { id: uuid(), name: 'INCOME'},
        { id: uuid(), name: 'EXPENSES'},
        { id: uuid(), name: 'ENTERTAINMENT'},
        { id: uuid(), name: 'HEALTH'},
        { id: uuid(), name: 'TRANSPORTATION'},
        { id: uuid(), name: 'STUDY'},
      ]);
    });
};
