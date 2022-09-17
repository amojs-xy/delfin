import { 
  reactive 
} from 'vue';

import { 
  forEachKeyValue, 
  isObject 
} from '../utils';

import {
  createConstant,
  createState,
  createGetters,
  createActions,
  defineConstant,
  defineState,
  defineGetter,
  defineAction
} from '../creators';

import { 
  deepClone 
} from '../utils';

export default class Store {
  constructor (rawStore) {
    const { constant, state, getters, actions } = rawStore;
    
    state && (this._state = reactive({ data: state }));
    constant && (this._constant = constant);
    getters && (this._getters = getters);
    actions && (this._actions = actions);
    
    this._initialize();
  }

  get $parent () {
    return Store._parent;
  }

  $setConstant (...args) {
    if (!args || args.length < 2) {
      throw new Error('$setConstant needs 2 arguments. [ prop, state or value ]');
    }

    const [ prop, state ] = args;

    Store.setValue(prop, state, this._constant, () => {
      defineConstant(this, prop);
    });
  }

  $setState (...args) {
    if (!args || args.length < 2) {
      throw new Error('$setState needs 2 arguments. [ prop, state or value ]');
    }

    const [ prop, state ] = args;

    Store.setValue(prop, state, this._state.data, () => {
      defineState(this, prop);
    });
  }

  $setGetter (getterKey, getterFn) {
    if (!this._getters[getterKey]) {
      this._getters[getterKey] = getterFn;
      defineGetter(this, getterKey, getterFn);
    }
  }

  $setAction (actionKey, actionFn) {
    if (!this._actions[actionKey]) {
      this._actions[actionKey] = actionFn;
      defineAction(this, actionKey, actionFn);
    }
  }

  _initialize () {
    this._state && createState(this);
    this._constant && createConstant(this);
    this._getters && createGetters(this);
    this._actions && createActions(this);
  }
  
  static setValue (prop, state, data, callback) {
    if (data.hasOwnProperty(prop)) {
      if (isObject(state)) {
        data[prop] = {
          ...deepClone(data[prop]),
          ...state
        }
      } else {
        data[prop] = state;
      }
    } else {
      data[prop] = state;
      callback(this, prop);
    }
  }

  _forEachConstant (callback) {
    forEachKeyValue(this._constant, callback);
  }

  _forEachState (callback) {
    forEachKeyValue(this._state.data, callback);
  }

  _forEachGetters (callback) {
    forEachKeyValue(this._getters, callback);
  }

  _forEachAction (callback) {
    forEachKeyValue(this._actions, callback);
  }
}