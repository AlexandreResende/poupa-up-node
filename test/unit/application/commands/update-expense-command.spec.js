
const UpdateExpenseCommand = require('@root/application/commands/update-expense-command');

const sinon = require('sinon');
const uuid = require('uuid/v4');

const { expect } = require('chai');

describe('UpdateExpenseCommand', () => {
  it('should return an updated income', async () => {
    // given
    const expenseId = uuid();
    const newExpense = {
      id: expenseId,
      value: 500,
      description: 'A test expense',
      category: 'FOOD',
      month: '05',
      year: '2019',
    };
    const updatedData = {
      id: expenseId,
      value: 500,
    };
    const stubs = {
      expensesRepository: {
        update: sinon.stub().resolves(newExpense),
      }
    };
    const command = new UpdateExpenseCommand(stubs);

    // when
    const result = await command.execute({ body: updatedData });

    expect(result).to.be.deep.equal(newExpense);
  });

  it('should return a rejected promised when nothing is passed', async () => {
    // given
    const command = new UpdateExpenseCommand({});

    // when
    const result = command.execute({ });

    // then
    return expect(result).to.be.rejected;
  });
});