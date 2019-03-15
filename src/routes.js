
const express = require('express');
const router = express.Router();

const adapter = require('./interfaces/web/adapter');

const createIncomeMiddleware = require('@root/interfaces/web/resources/create-income-middleware');

router.get('/healthcheck', adapter('healthcheckCommand'));

router.get('/incomes/get-incomes', adapter('getIncomesCommand'));
router.post('/incomes/create', createIncomeMiddleware, adapter('createIncomesCommand'));
router.put('/incomes/update', adapter('updateIncomeCommand'));
router.delete('/incomes/delete', adapter('deleteIncomeCommand'));

router.get('/expenses/get-expenses', adapter('getExpensesCommand'));
router.post('/expenses/create', adapter('createExpenseCommand'));
router.put('/expenses/update', adapter('updateExpenseCommand'));
router.delete('/expenses/delete', adapter('deleteExpenseCommand'));


module.exports = router;
