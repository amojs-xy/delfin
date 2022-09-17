import Store from './Store';
import { forEachKeyValue, isObject } from '../utils';

export default class Center {
  constructor (rawCenter) {
    this._rawCenter = rawCenter;
    this._createStore();
  }

  $setStore (...args) {
    if (args.length < 2) {
      throw new Error('$setStore needs 2 arguments. [ storeKey, rawStore ]');
    }

    if (!isObject(args[1])) {
      throw new Error('The second argument must be the type of Object.');
    }

    const [ storeKey, rawStore ] = args;

    this[storeKey] = new Store(rawStore);
    this[storeKey].parent = this;
    return this[storeKey];
  }

  install (app) {
    this._createProviders(app);
  }

  _createStore () {
    forEachKeyValue(this._rawCenter, (storeKey, storeValue) => {
      this[storeKey] = new Store(storeValue);
      this[storeKey].parent = this;
    })
  }

  _createProviders (app) {
    app.provide('center', this);

    forEachKeyValue(this, (storeKey, storeValue) => {
      app.provide(storeKey, storeValue);
    })
  }
}