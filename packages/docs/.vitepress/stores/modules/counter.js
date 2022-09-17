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
    setCount (store, count) {
      store.count += count;
    },
    setCount1 (store, count) {
      store.count1 -= count;
    }
  }
}