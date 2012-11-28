var utils = require('./utils');
var seequal = require('seequal');

var middleware = {

  execute: function (query) {

    var args = Array.prototype.slice.call(arguments, 1);

    return function (req, res, next) {

      var values = utils.find(args, req, res);

      values.unshift(query);

      var result = seequal.apply(null, values);

      result.success(function (response) {
        res.locals.result = response;
        next();
      });

      result.error(function (error) {
        next(error);
      });

    };

  },

  many: function (query) {

    var args = Array.prototype.slice.call(arguments, 1);

    return function (req, res, next) {

      var values = utils.find(args, req, res);

      values.unshift(query);

      var result = seequal.apply(null, values);

      result.many(function (response) {
        res.locals.many = response;
        next();
      });

      result.empty(function () {
        res.locals.many = [];
        next();
      });

      result.error(function (error) {
        next(error);
      });

    };

  },

  one: function (query) {

    var args = Array.prototype.slice.call(arguments, 1);

    return function (req, res, next) {

      var values = utils.find(args, req, res);

      values.unshift(query);

      var result = seequal.apply(null, values);

      result.one(function (response) {
        res.locals.one = response;
        next();
      });

      result.empty(function () {
        next({ type: 'http', error: 404 });
      });

      result.error(function (error) {
        next(error);
      });

    };

  },

};

module.exports = middleware;
