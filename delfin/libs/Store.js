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
    const { 
      constant, 
      state, 
      getters, 
      actions 
    } = rawStore;
    
    state && (this._state = reactive({ data: state }));
    state && (this._rawState = deepClone(state));
    constant && (this._constant = constant);
    getters && (this._getters = getters);
    actions && (this._actions = actions);
    this._rawStore = deepClone(rawStore);

    this._initialize();
  }

  _initialize () {
    this._state && createState(this);
    this._constant && createConstant(this);
    this._getters && createGetters(this);
    this._actions && createActions(this);
  }

  get $parent () {
    return Store._parent;
  }

  $setConstant (...args) {
    if (!args || args.length < 2) {
      throw new Error('$setConstant needs 2 arguments. [ prop, state or value ]');
    }

    const [ prop, state ] = args;

    Store.setValue(this, prop, state, this._constant, () => {
      defineConstant(this, prop);
    });
  }

  $setState (...args) {
    if (!args || args.length < 2) {
      throw new Error('$setState needs 2 arguments. [ prop, state or value ]');
    }

    const [ prop, state ] = args;

    Store.setValue(this, prop, state, this._state.data, () => {
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

  $resetStore () {
    this._constant && Store.removeConstant(this);
    this._state && Store.removeState(this);
    this._getters &&  Store.removeGetter(this);
    this._actions && Store.removeAction(this);
  }

  $resetState () {
    this._state.data = deepClone(this._rawState);
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

  static setValue (store, prop, state, data, callback) {
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
      store._rawState[prop] = deepClone(state);
      callback();
    }
  }

  static removeState (store) {
    const state = store._state.data;
    const rawState = store._rawState;
    const originState = store._rawStore.state;

    forEachKeyValue(state, key => {
      if (originState[key] === undefined) {
        delete state[key];
        delete store[key];
      }
    });

    forEachKeyValue(rawState, key => {
      if (originState[key] === undefined) {
        delete rawState[key];
      }
    })

    store._state.data = deepClone(rawState);
  }

  static removeConstant (store) {
    const constant = store._constant;
    const rawConstant = store._rawStore.constant;

    forEachKeyValue(constant, key => {
      if (!rawConstant[key]) {
        delete constant[key];
        delete store[key];
      }
    })
  }

  static removeGetter (store) {
    const getters = store._getters;
    const rawGetters = store._rawStore.getters;

    forEachKeyValue(getters, key => {
      if (!rawGetters[key]) {
        delete getters[key];
        delete store[key];
      }
    })
  }

  static removeAction (store) {
    const actions = store._actions;
    const rawActions = store._rawStore.actions;

    forEachKeyValue(actions, key => {
      if (!rawActions[key]) {
        delete actions[key];
        delete store[key];
      }
    })
  }
}