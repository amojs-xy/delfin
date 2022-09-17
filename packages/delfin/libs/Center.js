import Store from './Store';
import { forEachKeyValue, isObject } from '../utils';

export default class Center {
  constructor (rawCenter) {
    this._rawCenter = rawCenter;
    this._defineStore();
  }

  $setStore (...args) {
    if (args.length < 2) {
      throw new Error('$setStore needs 2 arguments. [ storeKey, rawStore ]');
    }

    if (!isObject(args[1])) {
      throw new Error('The second argument must be the type `Object`.');
    }

    const [ storeKey, rawStore ] = args;

    return this._createStore(storeKey, rawStore);
  }

  install (app) {
    this._createProviders(app);
  }

  _defineStore () {
    forEachKeyValue(this._rawCenter, (storeKey, storeValue) => {
      this._createStore(storeKey, storeValue);
    })
  }

  _createStore (storeKey, storeValue) {
    this[storeKey] = new Store(storeValue);
    this[storeKey].constructor._parent = this;
    return this[storeKey];
  }

  _createProviders (app) {
    app.provide('center', this);

    forEachKeyValue(this, (storeKey, storeValue) => {
      app.provide(storeKey, storeValue);
    })
  }
}