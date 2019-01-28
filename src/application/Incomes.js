
const Incomes = () => ({
  getAllIncomes(req, res) {
    console.log('Inside application layer');
    res.status(200).json({ message: 'Working controller '});
  },
});

module.exports = Incomes;
