
const Incomes = () => ({
  getAllIncomes(req, res) {
    res.status(200).json({ message: 'Working controller '});
  },
});

module.exports = Incomes;
