const desc = require('macchiato');
const safepath = require('./');

desc('safepath')
.it('should return key from object with dot notation', function (t) {
  const obj = { a: { b: { c: 3 } } };
  t.equals(safepath(obj, 'a.b.c'), 3);
  t.end();
})
.it('should return key from object with square brace notation', function (t) {
  const obj = { a: { b: { c: 3 } } };
  t.equals(safepath(obj, 'a["b"]["c"]'), 3);
  t.equals(safepath(obj, 'a[\'b\'][\'c\']'), 3);
  t.end();
})
.it('should return key from object with mixed notation', function (t) {
  const obj = { a: { b: { c: 3 } } };
  t.equals(safepath(obj, 'a.b["c"]'), 3);
  t.equals(safepath(obj, 'a[\'b\'].c'), 3);
  t.end();
})
.it('should allow numbers', function (t) {
  const obj = [[[3]]];
  t.equals(safepath(obj, '[0][0][0]'), 3);
  t.equals(safepath(obj, '0.0.0'), 3);
  t.equals(safepath(obj, '0[0].0'), 3);
  t.equals(safepath(obj, '0[0][0]'), 3);
  t.equals(safepath(obj, '[0].0.0'), 3);
  t.end();
})
.it('should allow letters and numbers', function (t) {
  const obj = { a: { b: [{a: 1}] } };
  t.equals(safepath(obj, 'a.b[0].a'), 1);
  t.equals(safepath(obj, 'a.b.0.a'), 1);
  t.end();
})
.it('should use defaulValue supplied and key not found in object', function (t) {
  const obj = { a: { b: { c: 3 } } };
  t.equals(safepath(obj, 'a.b[0].a', 'abc'), 'abc');
  t.equals(safepath(obj, 'a.b.0.a', false), false);
  t.end();
})
.it('should return null if no defaulValue and key not found in object', function (t) {
  const obj = { a: { b: { c: 3 } } };
  t.equals(safepath(obj, 'a.b[0].a'), null);
  t.equals(safepath(obj, 'a.b.0.a'), null);
  t.end();
});
