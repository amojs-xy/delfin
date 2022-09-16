export function forEachKeyValue (obj, callback) {
  Object.keys(obj).forEach(key => callback(key, obj[key]));
}

export function isPromise (value) {
  return value && typeof value.then === 'function';
}

export function isObject (value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}