import Center from './libs/Center';
import {
  createInjections
} from './creators';

export function createApplet (rawCenter) {
  return new Center(rawCenter);
}

export function useCenter (stores) {
  return createInjections(stores);
}