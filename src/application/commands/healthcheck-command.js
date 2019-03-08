
module.exports = function HealthcheckCommand() {
  return {
    execute: async () => {
      return {
        status: 'ok',
      };
    }
  }
};
