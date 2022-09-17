export function forEachKeyValue (obj, callback) {
  Object.keys(obj).forEach(key => callback(key, obj[key]));
}

export function isPromise (value) {
  return value && typeof value.then === 'function';
}

export function isObject (value) {
  return value && Object.prototype.toString.call(value) === '[object Object]';
}

export function isEmptyObject (value) {
  return value && Object.keys(value).length === 0;
}

export function deepClone (origin, hashMap = new WeakMap()) {
  if (origin == undefined || typeof origin !== 'object') {
    return origin;
  }

  if (origin instanceof Date) {
    return new Date(origin);
  }

  if (origin instanceof RegExp) {
    return new RegExp(origin);
  }

  const hashKey = hashMap.get(origin);

  if (hashKey) {
    return hashKey;
  }

  const target = new origin.constructor();
  hashMap.set(origin, target);
  for (let k in origin) {
    if (origin.hasOwnProperty(k)) {
      target[k] = deepClone(origin[k], hashMap);
    }
  }

  return target;
}