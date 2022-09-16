import Store from './Store';
import { forEachKeyValue, isObject } from '../utils';

export default class Center {
  constructor (rawCenter) {
    this._rawCenter = rawCenter;
    this.createStore();
  }

  createStore () {
    forEachKeyValue(this._rawCenter, (storeKey, storeValue) => {
      this[storeKey] = new Store(storeValue);
    })
  }

  $set (...args) {
    if (args.length < 2) {
      throw new Error('$set needs 2 arguments. [ storeKey, rawStore ]');
    }

    if (!isObject(args[0])) {
      throw new Error('The second argument must be the type of Object.');
    }

    const [ storeKey, rawStore ] = args;

    this[storeKey] = new Store(rawStore);
    return this[storeKey];
  }

  install (app) {
    this.createProviders(app);
  }

  createProviders (app) {
    app.provide('center', this);

    forEachKeyValue(this, (storeKey, storeValue) => {
      app.provide(storeKey, storeValue);
    })
  }
}