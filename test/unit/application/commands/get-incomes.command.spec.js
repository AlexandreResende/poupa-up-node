
const GetIncomesCommand = require('../../../../src/application/commands/get-incomes-command');

const sinon = require('sinon');

const { expect } = require('chai');

describe('GetIncomesCommand', () => {
  it('should return all incomes from the database', async () => {
    // given
    const newIncome = {
      value: 300,
      description: 'A test expense',
      category: 'FOOD',
      month: '05',
      year: '2019',
    };
    const anotherIncome = {
      value: 300,
      description: 'A test expense',
      category: 'FOOD',
      month: '05',
      year: '2019',
    };
    const query = {};
    const stubs = {
      incomesRepository: {
        getIncomes: sinon.stub().resolves([newIncome, anotherIncome]),
      }
    };
    const expectedResult = [newIncome, anotherIncome];
    const command = new GetIncomesCommand(stubs);

    // when
    const result = await command.execute({ query });

    expect(result).to.be.deep.equal(expectedResult);
  });

  it('should return all incomes from an specific month and year', async () => {
    // given
    const month = '05';
    const year = '2019';
    const newIncome = {
      value: 300,
      description: 'A test expense',
      category: 'FOOD',
      month: '05',
      year: '2019',
    };
    const query = { month, year };
    const stubs = {
      incomesRepository: {
        getIncomes: sinon.stub().resolves([newIncome]),
      }
    };
    const expectedResult = [newIncome];
    const command = new GetIncomesCommand(stubs);

    // when
    const result = await command.execute({ query });

    expect(result).to.be.deep.equal(expectedResult);
  });

  it.only('should return a rejected promised when nothing is passed', async () => {
    // given
    const command = new GetIncomesCommand({});

    // when
    const result = command.execute({ });

    // then
    return expect(result).to.be.rejected;
  });
});