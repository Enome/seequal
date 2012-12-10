var middleware = require('../');
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

    it('can take a custom locals object', function (done) {

      var query = function (name, age, callback) {
        callback(null, { name: name, age: age });
      };

      var handler = middleware.execute('person', query, 'query.name', 'locals.age');

      var state = {
        query: { name: 'james' },
        locals: { age: 50 },
      };

      recorder(handler, state, function (result) {

        result.eql({
          locals: { person: { name: 'james', age: 50 }, age: 50 },
          next: true
        });

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

    it('can take a custom local', function (done) {

      var query = function (id, size, callback) {
        callback(null, [id, size]);
      };

      var handler = middleware.many('objects', query, 'query.id', 'params.size');

      var state = {
        query: { id: 55 },
        params: { size: 999 }
      };

      recorder(handler, state, function (result) {
        result.eql({
          locals : {objects: [55, 999]},
          next: true,
        });
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

    it('can take a custom local', function (done) {

      var query = function (id, size, callback) {
        callback(null, [id, size]);
      };

      var handler = middleware.one('object', query, 'query.id', 'params.size');

      var state = {
        query: { id: 55 },
        params: { size: 999 },
      };

      recorder(handler, state, function (result) {
        result.eql({
          locals : { object: 55 },
          next: true,
        });
        done();
      });

    });

  });

});
