
const Incomes = () => ({
  getAllIncomes(req, res) {
    res.status(200).json({ message: 'Working controller '});
  },

  getMonthlyIncomes(req, res) {
    res.status(200).json({ message: 'Working controller2 '});
  },

  create(req, res) {
    res.status(200).json({ message: 'Working controller3 '});
  },

  update(req, res) {
    res.status(200).json({ message: 'Working controller4 '});
  },

  delete(req, res) {
    res.status(200).json({ message: 'Working controller5 '});
  }

});

module.exports = Incomes;
