import { 
  computed, 
  inject 
} from 'vue';

import { 
  isPromise 
} from './utils';

export function createConstant (store) {
  store._forEachConstant(key => {
    defineConstant(store, key);
  })
}

export function createState (store) {
  store._forEachState(key => {
    defineState(store, key);
  });
}

export function createGetters (store) {
  store._forEachGetters((getterKey, getterFn) => {
    defineGetter(store, getterKey, getterFn);
  })
}

export function createActions (store) {
  store._forEachAction((actionKey, actionFn) => {
    defineAction(store, actionKey, actionFn);
  })
}

export function defineConstant (store, key) {
  Object.defineProperty(store, key, {
    enumerable: true,
    configurable: true,
    get: () => store._constant[key]
  })
}

export function defineState (store, key) {
  Object.defineProperty(store, key, {
    enumerable: true,
    configurable: true,
    get: () => store._state.data[key],
    set (newValue) {
      store._state.data[key] = newValue;
    }
  })
}

export function defineGetter (store, getterKey, getterFn) {
  const getterComputed = computed(() => getterFn.apply(store, [store]));
  Object.defineProperty(store, getterKey, {
    enumerable: true,
    configurable: true,
    get: () => getterComputed.value
  })
}

export function defineAction (store, actionKey, actionFn) {
  store[actionKey] = (payload) => {
    const fn = actionFn.apply(store, [store, payload]);

    if (!isPromise(fn)) {
      return Promise.resolve(fn);
    }

    return fn;
  }
}