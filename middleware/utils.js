var _ = require('underscore');
var dotnotation = require('dotnotation');

var utils = {

  find: function (properties, req, res) {

    var result = [];

    _.each(properties, function (prop) {

      var r = dotnotation(req, prop) || dotnotation(res, prop);

      if (typeof r !== 'undefined') {
        result.push(r);
      } else {
        throw new Error('Property not found: ' + prop);
      }

    });

    return result;

  },

  args: function (args) {

    var local;

    if (typeof args[0] === 'string') {
      local = args.shift();
    }

    return {
      local: local,
      query: args.shift(),
      values: args
    };

  },

};

module.exports = utils;
