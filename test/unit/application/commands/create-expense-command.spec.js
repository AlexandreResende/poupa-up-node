
const CreateExpenseCommand = require('../../../../src/application/commands/create-expense-command');

const sinon = require('sinon');

const { expect } = require('chai');
const { response } = require('stream');

describe('CreateExpenseCommand', () => {
  it('should return a new expense', async () => {
    // given
    const newExpense = {
      value: 300,
      description: 'A test expense',
      category: 'FOOD',
      month: '05',
      year: '2019',
    };
    const stubs = {
      expensesRepository: {
        create: sinon.stub().resolves(newExpense),
      }
    };
    const command = new CreateExpenseCommand(stubs);

    // when
    const result = await command.execute({ body: newExpense }, response);

    expect(result).to.be.like(newExpense);
  });
});