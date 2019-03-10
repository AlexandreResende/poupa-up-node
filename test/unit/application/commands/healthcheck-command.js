
const Healthcheck = require('@root/application/commands/healthcheck-command');

const sinon = require('sinon');

const { expect } = require('@test/assertion');

describe('HealthcheckCommand', () => {
  it('should return an object with a status key with ok value', async () => {
    // given
    const expectedResult = { status: 'ok' };
    const command = new Healthcheck();

    // when
    const result = await command.execute();

    expect(result).to.be.deep.equal(expectedResult);
  });
});