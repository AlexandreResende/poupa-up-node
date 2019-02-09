
module.exports = function DeleteIncomeCommand({ incomesRepository }) {
  this.incomesRepository = incomesRepository;

  return {
    execute: async ({ body }, res) => {
      try {
        const deleteIncomeResult = await this.incomesRepository.delete(body);

        res.status(200).send({
          result: deleteIncomeResult,
        });
      } catch (error) {
        throw new Error(error);
      }
    }
  }
};
