import { reactive } from 'vue';
import { forEachKeyValue, isObject } from '../utils';
import {
  createConstant,
  createState,
  createActions,
  createGetters,
  defineProperty,
  defineAction,
  defineGetter
} from '../creators';
import { deepClone } from '../utils';

export default class Store {
  constructor (rawStore) {
    const { constant, state, getters, actions } = rawStore;
    
    state && (this._state = reactive({ data: state }));
    constant && (this._constant = constant);
    getters && (this._getters = getters);
    actions && (this._actions = actions);
    
    this._initialize();
  }

  _initialize () {
    this._state && createState(this);
    this._constant && createConstant(this);
    this._getters && createGetters(this);
    this._actions && createActions(this);
  }

  $setState (...args) {
    if (!args || args.length < 2) {
      throw new Error('$set needs 2 arguments. [ prop, state or value ]');
    }

    const [ prop, state ] = args;

    if (this._state.data.hasOwnProperty(prop)) {
      if (isObject(state)) {
        this._state.data[prop] = {
          ...deepClone(this._state.data[prop]),
          ...state
        }
      } else {
        this._state.data[prop] = state;
      }
    } else {
      this._state.data[prop] = state;
      defineProperty(this, prop);
    }
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

  _forEachAction (callback) {
    forEachKeyValue(this._actions, callback);
  }

  _forEachGetters (callback) {
    forEachKeyValue(this._getters, callback);
  }

  _forEachState (callback) {
    forEachKeyValue(this._state.data, callback);
  }

  _forEachConstant (callback) {
    forEachKeyValue(this._constant, callback);
  }
}