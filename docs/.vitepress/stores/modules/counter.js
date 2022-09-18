// stores/modules/counter.js

export default {
  state: {
    count: 0
  },
  getters: {
    double (store) {
      return store.count * 2;
    },
    triple (store) {
      return this.double + store.count;
    }
  },
  actions: {
    setCountPlus (store) {
      store.count += 1;
    },
    setCountMinus (store) {
      store.count -= 1;
    }
  }
}
