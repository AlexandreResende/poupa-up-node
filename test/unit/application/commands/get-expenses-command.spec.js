
const GetExpensesCommand = require('@root/application/commands/get-expenses-command');

const sinon = require('sinon');

const { expect } = require('@test/assertion');

describe('GetExpensesCommand', () => {
  it('should return all expenses from the database', async () => {
    // given
    const newExpense = {
      value: 300,
      description: 'A test expense',
      category: 'FOOD',
      month: '05',
      year: '2019',
    };
    const anotherExpense = {
      value: 300,
      description: 'A test expense',
      category: 'FOOD',
      month: '05',
      year: '2019',
    };
    const query = {};
    const stubs = {
      expensesRepository: {
        getExpenses: sinon.stub().resolves({ result: [newExpense, anotherExpense] }),
      }
    };
    const expectedResult = { result: [newExpense, anotherExpense] };
    const command = new GetExpensesCommand(stubs);

    // when
    const result = await command.execute({ query });

    expect(result).to.be.deep.equal(expectedResult);
  });

  it('should return all expenses from an specific month and year', async () => {
    // given
    const month = '05';
    const year = '2019';
    const newExpense = {
      value: 300,
      description: 'A test expense',
      category: 'FOOD',
      month: '05',
      year: '2019',
    };
    const query = { month, year };
    const stubs = {
      expensesRepository: {
        getExpenses: sinon.stub().resolves({ result: [newExpense] }),
      }
    };
    const expectedResult = { result: [newExpense] };
    const command = new GetExpensesCommand(stubs);

    // when
    const result = await command.execute({ query });

    expect(result).to.be.deep.equal(expectedResult);
  });

  it('should return a rejected promised when nothing is passed', async () => {
    // given
    const command = new GetExpensesCommand({});

    // when
    const result = command.execute({ });

    // then
    return expect(result).to.be.rejected;
  });
});