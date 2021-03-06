
const CreateExpenseCommand = require('@root/application/commands/create-expense-command');

const sinon = require('sinon');

const { expect } = require('@test/assertion');

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
        create: sinon.stub().resolves({ result: newExpense }),
      }
    };
    const expectedResult = { result: newExpense };
    const command = new CreateExpenseCommand(stubs);

    // when
    const result = await command.execute({ body: newExpense });

    expect(result).to.be.deep.equal(expectedResult);
  });

  it('should return a rejected promised when nothing is passed', async () => {
    // given
    const command = new CreateExpenseCommand({});

    // when
    const result = command.execute({ });

    // then
    return expect(result).to.be.rejected;
  });
});