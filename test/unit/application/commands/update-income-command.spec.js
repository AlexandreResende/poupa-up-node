
const UpdateIncomesCommand = require('@root/application/commands/update-income-command');

const sinon = require('sinon');
const uuid = require('uuid/v4');

const { expect } = require('@test/assertion');

describe('UpdateIncomeCommand', () => {
  it('should return an updated income', async () => {
    // given
    const incomeId = uuid();
    const newIncome = {
      id: incomeId,
      value: 500,
      description: 'A test expense',
      category: 'FOOD',
      month: '05',
      year: '2019',
    };
    const updatedData = {
      id: incomeId,
      value: 500,
    };
    const stubs = {
      incomesRepository: {
        update: sinon.stub().resolves({ result: newIncome }),
      }
    };
    const expectedResult = { result: newIncome };
    const command = new UpdateIncomesCommand(stubs);

    // when
    const result = await command.execute({ body: updatedData });

    expect(result).to.be.deep.equal(expectedResult);
  });

  it('should return a rejected promised when nothing is passed', async () => {
    // given
    const command = new UpdateIncomesCommand({});

    // when
    const result = command.execute({ });

    // then
    return expect(result).to.be.rejected;
  });
});