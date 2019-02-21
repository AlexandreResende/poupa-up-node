
const DeleteIncomesCommand = require('../../../../src/application/commands/delete-income-command');

const sinon = require('sinon');
const uuid = require('uuid/v4');

const { expect } = require('chai');

describe('UpdateIncomeCommand', () => {
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
    const command = new DeleteIncomesCommand(stubs);

    // when
    const result = await command.execute({ body: updatedData });

    expect(result).to.be.deep.equal(expectedResult);
  });
});