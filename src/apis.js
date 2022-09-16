import Center from './libs/Center';
import {
  createInjections
} from './creators';
import Store from './libs/Store';

export function createApplet (rawCenter) {
  return new Center(rawCenter);
}

export function useCenter (stores) {
  return createInjections(stores);
}

export function createStore (rawStore) {
  return () => {
    return new Store(rawStore);
  }
}