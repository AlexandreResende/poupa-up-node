
const container = require('../../infrastructure/container');

module.exports = function adapter(dependencyName) {
  return async (request, response, next) => {
    try {
      const dependency = container.resolve(dependencyName);
      const result = await dependency.execute(request);

      response.status(200).json({ result });
    } catch (error) {
      response.status(500).json({
        error,
      });
    }
  };
};

