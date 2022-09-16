import { reactive } from 'vue';
import { forEachKeyValue, isObject } from '../utils';
import {
  createConstant,
  createState,
  createActions,
  createGetters
} from '../creators';

export default class Store {
  constructor (rawStore) {
    const { constant, state, getters, actions } = rawStore;
    
    state && (this._state = reactive({ data: state }));
    constant && (this._constant = constant);
    getters && (this._getters = getters);
    actions && (this._actions = actions);
    
    this.initialize();
  }

  initialize () {
    this._state && createState(this);
    this._constant && createConstant(this);
    this._getters && createGetters(this);
    this._actions && createActions(this);
  }

  get state () {
    return this._state.data;
  }

  $set (...args) {
    const [ prop, state ] = args;

    if (isObject(state)) {
      forEachKeyValue(state, (key, value) => {
        this._state.data[prop][key] = value;
      });
      return;
    }

    if (!this._state.data[prop]) {
      this._state.data[prop] = state;
      Object.defineProperty(this, prop, {
        enumerable: true,
        get: () => this._state.data[prop],
        set (newValue) {
          this._state.data[prop] = newValue;
        }
      })
    }
  }

  forEachAction (callback) {
    forEachKeyValue(this._actions, callback);
  }

  forEachGetters (callback) {
    forEachKeyValue(this._getters, callback);
  }

  forEachState (callback) {
    forEachKeyValue(this._state.data, callback);
  }

  forEachConstant (callback) {
    forEachKeyValue(this._constant, callback);
  }
}