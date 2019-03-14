
const chaiAsPromised = require('chai-as-promised');
const chaiHttp = require('chai-http');
const chaiLike = require('chai-like');
const chai = require('chai');

chai.use(chaiAsPromised);
chai.use(chaiHttp);
chai.use(chaiLike);

module.exports.expect = chai.expect;
module.exports.request = (app) => {
  return chai.request(app);
};
