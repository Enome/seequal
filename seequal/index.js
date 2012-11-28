var EventEmitter = require('events').EventEmitter;

var seequal = function () {

  var args = Array.prototype.slice.apply(arguments);
  var query = args[0];
  var passingArgs = args.slice(1);
  var ee = new EventEmitter();

  process.nextTick(function () {

    passingArgs.push(function (err, result) {

      if (err) {
        ee.emit('error', err);
      } else {

        ee.emit('success', result);

        if (Array.isArray(result)) {
          
          if (result.length !== 0) {
            ee.emit('many', result);
            ee.emit('one', result[0]);
          } else {
            ee.emit('empty');
          }

        }

      }

    });

    query.apply(null, passingArgs);

  });

  return {

    success: ee.on.bind(ee, 'success'),
    error: ee.on.bind(ee, 'error'),

    many: ee.on.bind(ee, 'many'),
    one: ee.on.bind(ee, 'one'),
    empty: ee.on.bind(ee, 'empty'),

  };

};

module.exports = seequal;
