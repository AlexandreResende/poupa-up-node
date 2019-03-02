
const DeleteExpenseCommand = require('@root/application/commands/delete-expense-command');

const sinon = require('sinon');
const uuid = require('uuid/v4');

const { expect } = require('../../../assertion');

describe('DeleteExpenseCommand', () => {
  it('should return an object with key ok and value 1', async () => {
    // given
    const incomeId = uuid();
    const deleteExpenseReturn = {
      ok: 1,
    };
    const updatedData = {
      id: incomeId,
    };
    const stubs = {
      expensesRepository: {
        delete: sinon.stub().resolves(deleteExpenseReturn),
      }
    };
    const expectedResult = { ok: 1 };
    const command = new DeleteExpenseCommand(stubs);

    // when
    const result = await command.execute({ body: updatedData });

    // then
    expect(result).to.be.deep.equal(expectedResult);
  });

  it('should return a rejected promised when nothing is passed', async () => {
    // given
    const command = new DeleteExpenseCommand({});

    // when
    const result = command.execute({ });

    // then
    return expect(result).to.be.rejected;
  });
});