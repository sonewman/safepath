module.exports = safePath;
safePath.default = safePath;

const trim = /^\[['"]?|['"]?\]$/g;
const splitPath = /\[['"]?|\.|['"]?\]\[["']?|['"]?\]\.?/;

function transformPathType(path) {
  if (Array.isArray(path)) {
    return path;
  }

  if ('number' === typeof path) {
    return path;
  }

  if ('string' !== typeof path) {
    throw new Error('path must be a string, number or Array');
  }

  const keys = path.replace(trim, '').split(splitPath);
  return keys.length === 1 ? keys[0] : keys;
}

function safePath(obj, path, defaultValue) {
  switch (arguments.length) {
    case 0:
      /* falls through */
    case 1: return obj;

    case 2:
      defaultValue = null;
  }

  if (!obj || 'object' !== typeof obj) {
    return defaultValue;
  }

  const keys = transformPathType(path);

  // fast case
  if ('string' === typeof keys || 'number' === keys) {
    return obj[keys];
  }

  var val = obj;
  for (var i = 0; i < keys.length; ++i) {
    var key = keys[i];
    if (key in val) {
      val = val[key];
    } else {
      return defaultValue;
    }
  }

  return val;
}
