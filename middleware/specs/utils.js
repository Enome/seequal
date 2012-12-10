var utils = require('../utils');

describe('Seequal Utils', function () {

  describe('find', function () {

    var req, res;

    beforeEach(function () {

      req = {
        params: { name: 'james' },
        query: { age: 15, size: 23 },
        body: { owner: 'jim' },
        session: { id: 'abc' },
      };

      res = {
        locals: {
          data: 'something',
          length: 12.00,
        }
      };

    });

    it('finds the name param value', function () {
      utils.find(['params.name'], req, res).should.eql(['james']);
    });

    it('finds the age query value', function () {
      utils.find(['query.age'], req, res).should.eql([15]);
    });

    it('finds the size query value', function () {
      utils.find(['query.size'], req, res).should.eql([23]);
    });

    it('finds the owner body value', function () {
      utils.find(['body.owner'], req, res).should.eql(['jim']);
    });

    it('finds the session id value', function () {
      utils.find(['session.id'], req, res).should.eql(['abc']);
    });

    it('finds the data locals value', function () {
      utils.find(['locals.data'], req, res).should.eql(['something']);
    });

    it('finds the length locals value', function () {
      utils.find(['locals.length'], req, res).should.eql([12.00]);
    });

    it('finds the length locals value and both query values', function () {
      utils.find(['query.age', 'query.size', 'locals.length'], req, res).should.eql([15, 23, 12.00]);
    });

    it('throws a property not found error', function () {
      (function () {
        utils.find(['query.car', 'query.size'], req, res);
      }).should.throw('Property not found: query.car');
    });

  });

  describe('args', function () {

    it('return query and values', function () {

      var q = function () {};
      var result = utils.args([q, 'locals.test']);

      result.should.eql({
        local: undefined,
        query: q,
        values: [ 'locals.test' ],
      });

    });

    it('return local, query and values', function () {

      var q = function () {};
      var result = utils.args(['something', q, 'locals.test']);

      result.should.eql({
        local: 'something',
        query: q,
        values: [ 'locals.test' ],
      });

    });

  });

});
