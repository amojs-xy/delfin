import Center from './libs/Center';
import Store from './libs/Store';

import {
  createInjections
} from './creators';

import { 
  isEmptyObject 
} from './utils';

export function createDelfin (rawCenter) {
  if (rawCenter && !isEmptyObject(rawCenter)) {
    return new Center(rawCenter);
  }

  return null;
}

export function createStore (rawStore) {
  if (rawStore && !isEmptyObject(rawStore)) {
    return () => {
      return new Store(rawStore);
    }
  }
  
  return null;
}

export function useCenter (stores) {
  return createInjections(stores);
}