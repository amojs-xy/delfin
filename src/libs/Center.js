import Store from './Store';
import { forEachKeyValue } from '../utils';

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

  $set (storeKey, rawStore) {
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