import Store from './Store';

import { 
  forEachKeyValue, 
  isObject 
} from '../utils';

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

    return Center.createStore(this, storeKey, rawStore);
  }

  install (app) {
    this._createProviders(app);
  }

  static createStore (center, storeKey, storeValue) {
    center[storeKey] = new Store(storeValue);
    center[storeKey].constructor._parent = center;
    return center[storeKey];
  }

  _defineStore () {
    forEachKeyValue(this._rawCenter, (storeKey, storeValue) => {
      Center.createStore(this, storeKey, storeValue);
    })
  }

  _createProviders (app) {
    app.provide('center', this);
    app.config.globalProperties.$center = this;

    forEachKeyValue(this, (storeKey, storeValue) => {
      app.provide(storeKey, storeValue);
      app.config.globalProperties['$' + storeKey] = storeValue;
    })
  }
}