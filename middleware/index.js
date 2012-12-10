var utils = require('./utils');
var seequal = require('seequal');

var middleware = {

  execute: function () {

    var args = utils.args(Array.prototype.slice.call(arguments));

    return function (req, res, next) {

      var values = utils.find(args.values, req, res);

      values.unshift(args.query);

      var result = seequal.apply(null, values);

      result.success(function (response) {
        res.locals[args.local || 'result'] = response;
        next();
      });

      result.error(function (error) {
        next(error);
      });

    };

  },

  many: function (query) {

    var args = utils.args(Array.prototype.slice.call(arguments));

    return function (req, res, next) {

      var values = utils.find(args.values, req, res);

      values.unshift(args.query);

      var result = seequal.apply(null, values);

      result.many(function (response) {
        res.locals[args.local || 'many'] = response;
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

    var args = utils.args(Array.prototype.slice.call(arguments));

    return function (req, res, next) {

      var values = utils.find(args.values, req, res);

      values.unshift(args.query);

      var result = seequal.apply(null, values);

      result.one(function (response) {
        res.locals[args.local || 'one'] = response;
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
