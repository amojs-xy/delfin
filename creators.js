import { computed, inject } from 'vue';
import { isPromise } from './utils';

export function createConstant (store) {
  store._forEachConstant(key => {
    Object.defineProperty(store, key, {
      enumerable: true,
      get: () => store._constant[key]
    })
  })
}

export function createState (store) {
  store._forEachState(key => {
    Object.defineProperty(store, key, {
      enumerable: true,
      get: () => store._state.data[key],
      set (newValue) {
        store._state.data[key] = newValue;
      }
    })
  })
}

export function createActions (store) {
  store._forEachAction((actionKey, actionFn) => {
    store[actionKey] = (payload) => {
      const fn = actionFn.apply(store, [store, payload]);

      if (isPromise(fn)) {
        return Promise.resolve(fn);
      }

      return fn;
    }
  })
}

export function createGetters (store) {
  store._forEachGetters((getterKey, getterFn) => {
    const getterComputed = computed(() => getterFn.apply(store, [store.state]));
    Object.defineProperty(store, getterKey, {
      get: () => getterComputed.value
    })
  })
}

export function createInjections (stores) {
  if (!stores || stores.length === 0) {
    return inject('center');
  }

  if (stores.length === 1) {
    return inject(stores[0]);
  }

  if (typeof stores === 'string') {
    return inject(stores);
  }

  const injections = {};

  stores.forEach(storeKey => {
    injections[storeKey] = inject(storeKey);
  });

  return injections;
}