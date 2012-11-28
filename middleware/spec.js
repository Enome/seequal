var middleware = require('./');
var utils = require('./utils');
var recorder = require('express-recorder');

describe('Seequal Middleware', function () {

  describe('Execute', function () {

    it('set locals.result to the result of the query', function (done) {

      var query = function (name, age, callback) {
        callback(null, { name: name, age: age });
      };

      var handler = middleware.execute(query, 'query.name', 'locals.age');

      var state = {
        query: { name: 'james' },
        locals: { age: 50 },
      };

      recorder(handler, state, function (result) {

        result.eql({
          locals: { result: { name: 'james', age: 50 }, age: 50 },
          next: true
        });

        done();

      });
      
    });

    it('sets next to the error of the query', function (done) {

      var query = function (callback) {
        callback({ error: 'some error' });
      };

      var handler = middleware.execute(query);

      recorder(handler, function (result) {
        result.eql({ next: { error: 'some error' } });
        done();
      });

    });

  });

  describe('Many', function () {

    it('set the local many to the result of the query', function (done) {

      var query = function (id, size, callback) {
        callback(null, [id, size]);
      };

      var handler = middleware.many(query, 'query.id', 'params.size');

      var state = {
        query: { id: 55 },
        params: { size: 999 }
      };

      recorder(handler, state, function (result) {
        result.eql({
          locals : {many: [55, 999]},
          next: true,
        });
        done();
      });

    });

    it('set the local many to an empty array', function (done) {

      var query = function (callback) {
        callback(null, []);
      };

      var handler = middleware.many(query);

      recorder(handler, function (result) {
        result.eql({
          locals: { many: [] },
          next: true,
        });
        done();
      });

    });

    it('sets next to the error of the query', function (done) {

      var query = function (callback) {
        callback({ error: 'some error' });
      };

      var handler = middleware.many(query);

      recorder(handler, function (result) {
        result.eql({ next: { error: 'some error' } });
        done();
      });

    });

  });

  describe('One', function () {

    it('set the local one to the result of the query', function (done) {

      var query = function (id, size, callback) {
        callback(null, [id, size]);
      };

      var handler = middleware.one(query, 'query.id', 'params.size');

      var state = {
        query: { id: 55 },
        params: { size: 999 }
      };

      recorder(handler, state, function (result) {
        result.eql({
          locals : { one: 55 },
          next: true,
        });
        done();
      });

    });

    it('calls a 404 when the result is an empty array', function (done) {

      var query = function (callback) {
        callback(null, []);
      };

      var handler = middleware.one(query);

      recorder(handler, function (result) {
        result.eql({
          next: { type: 'http', error: 404 },
        });
        done();
      });

    });

    it('sets next to the error of the query', function (done) {

      var query = function (callback) {
        callback({ error: 'some error' });
      };

      var handler = middleware.one(query);

      recorder(handler, function (result) {
        result.eql({ next: { error: 'some error' } });
        done();
      });

    });

  });

});

describe('Seequal Utils', function () {

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

  describe('find', function () {

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

});
