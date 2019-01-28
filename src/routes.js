
const express = require('express');
const router = express.Router();

/* router.get('/', ({ getAllIncomes }) => {
  console.log(getAllIncomes)
  console.log('inside route');
  getAllIncomes;
}); */

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Working' });
});

module.exports = router;
