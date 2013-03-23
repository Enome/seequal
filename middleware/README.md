# Seequal Middleware

For more info checkout seequal.

```js
var middleware = require('seequal-middleware');
middleware.execute('optional local name', query, 'params.id'); // sets locals.result
middleware.many'optional local name', (query, 'query.user'); // sets locals.many
middleware.one'optional local name', (query, 'body.size'); // sets locals.one
```
