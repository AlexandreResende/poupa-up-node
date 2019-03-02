
const DeleteIncomeCommand = require('@root/application/commands/delete-income-command');

const sinon = require('sinon');
const uuid = require('uuid/v4');

const { expect } = require('../../../assertion');

describe('DeleteIncomeCommand', () => {
  it('should return an updated income', async () => {
    // given
    const incomeId = uuid();
    const deleteIncomeReturn = {
      ok: 1,
    };
    const updatedData = {
      id: incomeId,
    };
    const stubs = {
      incomesRepository: {
        delete: sinon.stub().resolves(deleteIncomeReturn),
      }
    };
    const expectedResult = { ok: 1 };
    const command = new DeleteIncomeCommand(stubs);

    // when
    const result = await command.execute({ body: updatedData });

    // then
    expect(result).to.be.deep.equal(expectedResult);
  });

  it('should return a rejected promised when nothing is passed', async () => {
    // given
    const command = new DeleteIncomeCommand({});

    // when
    const result = command.execute({ });

    // then
    return expect(result).to.be.rejected;
  });
});