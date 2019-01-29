
const express = require('express');
const router = express.Router();

const container = require('./infrastructure/container');

/* router.get('/', (req, res) => {
  res.status(200).json({ message: 'Working' });
}); */

router.get('/incomes/get-all-incomes', container.resolve('Incomes').getAllIncomes);
router.get('/incomes/get-monthly-incomes', container.resolve('Incomes').getMonthlyIncomes);
router.post('/incomes/create', container.resolve('Incomes').create);
router.put('/incomes/update', container.resolve('Incomes').update);
router.delete('/incomes/delete', container.resolve('Incomes').delete);

/* router.get('/expenses/get-all-expenses', container.resolve('Expenses').getAllExpenses);
router.get('/expenses/get-monthly-expenses', container.resolve('Expenses').getMonthlyExpenses);
router.post('expensess/create', container.resolve('Expenses').create);
router.put('/expenses/update', container.resolve('Expenses').update);
router.delete('/expenses/delete', container.resolve('Expenses').delete); */

module.exports = router;
