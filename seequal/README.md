# Seequal

```js
var seequal = require('seequal');

var query = function (name, age, callback) {
  
  // name === 'james'
  // age === 15

  callback( /*error*/, /*result*/ );

};

var result = seequal(query, 'james', 15);

result.success(function (response) {
  // called when there is no error;
  // response === any object
});

result.error(function (response) {
  // called when there is an error;
  // response === error
});

result.many(function (response) {
  // called when response is non-empty array
  // response === array
});

result.one(function (response) {
  // called when response is non-empty array
  // response === first child of array
});

result.one(function () {
  // called when response is empty array
});

```
