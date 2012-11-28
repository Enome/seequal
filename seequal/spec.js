var seequal = require('./');

describe('Seequal', function () {

  it('Calls: many, one and success. Doesn\'t call: empty and error. Result: non-empty array', function () {

    var query = function (callback) {
      callback(null, [ 'one', 'two' ]);
    };

    var result = seequal(query);

    result.success(function (response) {
      response.should.eql([ 'one', 'two' ]);
    });

    result.error(function (response) {
      throw new Error('Error: Shouldnt be called');
    });

    result.many(function (response) {
      response.should.eql([ 'one', 'two' ]);
    });

    result.one(function (response) {
      response.should.eql('one');
    });

    result.empty(function () {
      throw new Error('Empty: Shouldnt be called');
    });

  });


  it('Calls: empty and success. Doesn\'t call: many, one and error. Result: empty array', function () {

    var query = function (callback) {
      callback(null, []);
    };

    var result = seequal(query);

    result.success(function (response) {
      response.should.eql([]);
    });

    result.error(function (response) {
      throw new Error('Error: Shouldnt be called');
    });

    result.many(function (response) {
      throw new Error('Many: Shouldnt be called');
    });

    result.one(function (response) {
      throw new Error('One: Shouldnt be called');
    });

    result.empty(function () {
      true.should.be.true;
    });

  });

  it('Calls: error. Doesn\'t call: many, one, empty and succes. Result: error', function () {

    var query = function (callback) {
      callback({ message: 'something went wrong' });
    };

    var result = seequal(query);

    result.success(function (response) {
      throw new Error('Success: Shouldnt be called');
    });

    result.error(function (response) {
      response.should.eql({ message: 'something went wrong' });
    });

    result.many(function (response) {
      throw new Error('Many: Shouldnt be called');
    });

    result.one(function (response) {
      throw new Error('One: Shouldnt be called');
    });

    result.empty(function () {
      true.should.be.true;
    });

  });

  it('Calls: success. Doesn\'t call: many, one, empty and error. Result: object', function () {

    var query = function (callback) {
      callback(null, { user: 'james' });
    };

    var result = seequal(query);

    result.success(function (response) {
      response.should.eql({ user: 'james' });
    });

    result.error(function (response) {
      throw new Error('Error: Shouldnt be called');
    });

    result.many(function (response) {
      throw new Error('Many: Shouldnt be called');
    });

    result.one(function (response) {
      throw new Error('One: Shouldnt be called');
    });

    result.empty(function () {
      throw new Error('Empty: Shouldnt be called');
    });

  });

});
