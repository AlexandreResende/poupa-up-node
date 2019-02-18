
const express = require('express');
const router = express.Router();

const adapter = require('./interfaces/web/adatper');
const container = require('./infrastructure/container');

router.get('/incomes/get-incomes', adapter('getIncomesCommand'));
router.post('/incomes/create', container.resolve('createIncomesCommand').execute);
router.put('/incomes/update', container.resolve('updateIncomeCommand').execute);
router.delete('/incomes/delete', container.resolve('deleteIncomeCommand').execute);

router.get('/expenses/get-all-expenses', container.resolve('getExpensesCommand').execute);
router.post('/expenses/create', container.resolve('createExpenseCommand').execute);
router.put('/expenses/update', container.resolve('updateExpenseCommand').execute);
router.delete('/expenses/delete', container.resolve('deleteExpenseCommand').execute);


module.exports = router;
