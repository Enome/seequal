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

  }

};

module.exports = utils;
