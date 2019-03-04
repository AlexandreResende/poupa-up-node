
const CreateIncomesCommand = require('@root/application/commands/create-income-command');

const sinon = require('sinon');

const { expect } = require('chai');

describe('CreateIncomeCommand', () => {
  it('should return a new income', async () => {
    // given
    const newIncome = {
      value: 300,
      description: 'A test expense',
      category: 'FOOD',
      month: '05',
      year: '2019',
    };
    const stubs = {
      incomesRepository: {
        create: sinon.stub().resolves({ result: newIncome }),
      }
    };
    const expectedResult = { result: newIncome };
    const command = new CreateIncomesCommand(stubs);

    // when
    const result = await command.execute({ body: newIncome });

    expect(result).to.be.deep.equal(expectedResult);
  });

  it('should return a rejected promised when nothing is passed', async () => {
    // given
    const command = new CreateIncomesCommand({});

    // when
    const result = command.execute({ });

    // then
    return expect(result).to.be.rejected;
  });
});