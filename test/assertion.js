
const chaiAsPromised = require('chai-as-promised');
const chaiHttp = require('chai-http');
const chaiLike = require('chai-like');
const chai = require('chai');

chai.use(chaiAsPromised);
chai.usu(chaiHttp);
chai.use(chaiLike);

module.exports.expect = chai.expect;
