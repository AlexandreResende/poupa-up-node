
const express = require('express');
const router = express.Router();

const container = require('./infrastructure/container');

// router.get('/incomes/get-all-incomes', container.resolve('Incomes').getAllIncomes);
router.get('/incomes/get-incomes', container.resolve('getIncomesCommand').execute);
router.post('/incomes/create', container.resolve('createIncomesCommand').execute);
// router.put('/incomes/update', container.resolve('Incomes').update);
// router.delete('/incomes/delete', container.resolve('Incomes').delete);

/* router.get('/expenses/get-all-expenses', container.resolve('Expenses').getAllExpenses);
router.get('/expenses/get-monthly-expenses', container.resolve('Expenses').getMonthlyExpenses);
router.post('/expenses/create', container.resolve('Expenses').create);
router.put('/expenses/update', container.resolve('Expenses').update);
router.delete('/expenses/delete', container.resolve('Expenses').delete); */

module.exports = router;
