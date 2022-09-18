# API 文档

## Center
`Center` 是一个很重要的概念，所有的状态连携都是通过 `Center` 来实现的。但是作为开发者，你不需要直接使用 `Center`，也不需要了解其的具体实现，若非特殊需求，你可能永远也用不到它的其他方法。比如：
```js
import { createDelfin } from 'delfin'

const center = createDelfin({ counter }) // => instanceof Center
```

而当你需要使用它的时候，你可以通过 `useCenter` 来获取 `Center` 的实例：
```js
import { useCenter } from 'delfin'

const center = useCenter()
```

### install
在实例中，它只有一个普通方法：`install` ，`install` 方法用于安装插件注入到 Vue app 的全局，以便可以在应用的任意地方访问。比如在调用 `createDelfin` 后返回的就是 `Center` 的实例：
```js
app.use(delfin) // === delfin.install(app)
```

### $setStore
`$setStore` 方法用于动态注册 `store` 到 `Center` 中，比如：
```js
import user from './center/user'

delfin.$setStore('user', user)
```

## Store
`Store` 则是另一个重要的概念，它与开发者最常打交道，因为它是状态管理的集合，所有对状态的操作都是由 `Store` 来完成的。创建 `Store` 也非常简单，
```js
// center/counter.js
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
      store.$parent.user.setAge(100);
    }
  }
}
```
```js
// center/index.js
import { createDelfin } from 'delfin'
import counter from './counter.js'

export default createDelfin({
  // 注册这个 store
  counter
})
```

`Store` 的内置方法比较多，但实际上，正常情况下，你可能一个都用不上，因为这些方法本身是为了覆盖 `Store` 内部状态而存在的，它们可以以安全的形式来对 `Store` 内部的状态及方法进行改写或重置。

### $parent
`$parent` 方法主要用于获取 `Store` 的父级 `Center`，比如：
```js
const { counter } = useCenter()

counter.$parent()
```

### $setConstant
`$setConstant` 方法用于设置 `Store` 的常量，比如：
```js
const { counter } = useCenter()

counter.$setConstant('delay', 300)
```

### $setState
`$setState` 方法用于动态设置新添加的 `Store` 的状态，常用于在获取后台字典数据后，将其保存到 `Store` 中，比如：
```js
const { counter } = useCenter()
counter.$setState('PROJECT_LEVEL', 1)
```

### $setGetter
`$setGetter` 方法用于动态设置新添加的 `Store` 的 `getter`，可以理解为动态创建了一个计算属性，比如：
```js
const { counter } = useCenter()
counter.$setGetter('double', store => store.count * 2)
```

### $setAction
`$setAction` 方法用于动态设置新添加的 `Store` 的 `action`，可以理解为动态创建了一个方法，比如：
```js
const { counter } = useCenter()
counter.$setAction('setCount', (store, count) => {
  store.count += count
})
```

### $reset
最后 `$reset` 方法则是用于重置 `Store` 的状态，将其恢复成 `Store` 在刚注册时的状态，比如：
```js
const { counter } = useCenter()
counter.$reset()
```

## 最后
当你使用 `delfin` 的时候，你所需要了解的知识点就这么多，最后祝你使用愉快！
