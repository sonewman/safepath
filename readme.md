# Simple safe json path

## Usage
```javascript
import safepath from 'safepath';
// or
const safepath = require('safepath');
```

### safepath(object, path, defaultValue?);

```javascript
import safepath from 'safepath';
import assert from 'assert';

const obj = { a: { b: { c: 3 } } };
let value = safepath(obj, 'a.b.c');

assert(value === 3);

value = safepath(obj, 'a[\'b\'].c');

// also works with numbers in arrays
const arr = [[[[3]]]];

value = safepath(arr, '[0][0][0][0]');

assert(value === 3);

// or
value = safepath(obj, '0.0.0.0');

assert(value === 3);

// a default can be provided if an object key is not available:
value = safepath(obj, 'a.b[0].a', 'abc')

assert(value === 'abc');

// if no default value is supplied `null` will be returned
value = safepath(obj, 'a.b.0.a');

assert(value === null);
```

## Licence
MIT
