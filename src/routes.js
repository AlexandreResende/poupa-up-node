
const express = require('express');
const router = express.Router();

const container = require('./infrastructure/container');

/* router.get('/', (req, res) => {
  res.status(200).json({ message: 'Working' });
}); */

router.get('/', container.resolve('Incomes').getAllIncomes);

module.exports = router;
