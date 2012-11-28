# Seequal Middleware

For more info checkout seequal.

```js
var middleware = require('seequal-middleware');
middleware.execute(query, 'params.id'); // sets locals.result
middleware.many(query, 'query.user'); // sets locals.many
middleware.one(query, 'body.size'); // sets locals.one
```
