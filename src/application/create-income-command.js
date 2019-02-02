
module.exports = function CreateIncomesCommand({ incomesRepository }) {
  this.incomesRepository = incomesRepository;

  return {
    execute: async ({ body }, res) => {
      const createIncomesResult = await this.incomesRepository.create(body);
      
      res.status(200).send({ message: 'working' });
    }
  }
};
