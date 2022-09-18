# Delfin

### 什么是 Delfin?
Delfin 是 Vue3 的新一代共享状态管理器，它类似于 Vuex/Pinia，但不同于它们。

### 安装
```bash
npm install delfin
# OR
yarn add delfin
# OR
pnpm add delfin
```

### 使用
```js
// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import center from './center';

createApp(App).use(center).mount('#app')
```

```js
// src/center/index.js
import { createDelfin } from 'delfin';
import counter from './counter';

export default createDelfin({
  counter
});
```

```js
// src/center/counter.js
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

### 示例
```vue
<template>
  <h1>{{ calculatorStore.result }}</h1>
  <input type="text" v-model="calculatorStore.a" placeholder="a" />
  {{ calculatorStore.sign }}
  <input type="text" v-model="calculatorStore.b" placeholder="b" />
  <p>
    <button @click="calculatorStore.setSign('+')">+</button>
    <button @click="calculatorStore.setSign('-')">-</button>
  </p>
  <hr>
  <h1>{{ count }}</h1>
  <h2>{{ counter.count1 }}</h2>
  <h2>{{ double }}</h2>
  <h3>{{ triple }}</h3>
  <h4>{{ counter.quadruple }}</h4>
  <button @click="setCount(2)">ADD</button>
  <button @click="setCount1(5)">MINUS</button>

  <hr>

  <h1>{{ title }}</h1>
  <h2>{{ user.subTitle }}</h2>
  <h1>{{ username }}</h1>
  <h2>{{ age }}</h2>
  <h3>{{ height }}</h3>
  <button @click="setUserName">SET NAME</button>
  <button @click="setAge">SET AGE</button>
  <button @click="setHeight(180)">SET HEIGHT</button>

  <hr>
  <ul v-if="studentStore">
    <h2>{{ studentStore.total }}</h2>
    <li
      v-for="student of studentStore.students"
      :key="student.name"
    >
      <p>姓名：{{ student.name }}</p>
      <p>年级：{{ student.grade }}</p>
    </li>
  </ul>

  <button @click="addStudent">ADD STUDENT</button>

  <hr>

  <button @click="counter.$reset">RESET STORE</button>
</template>

<script setup>

  import { computed, onMounted, ref } from 'vue';
  import { useCenter } from './delfin/packages/delfin';
  import useCalculator from './center/calculator';

 const center = useCenter();
 const { user, counter } = center;

  console.log(center);

  const count = computed(() => counter.count);
  const double = computed(() => counter.double);
  const triple = computed(() => counter.triple);

  const title = user.title;
  const username = computed(() => user.info.name);
  const age = computed(() => user.info.age);
  const height = computed(() => user.info.height);

  const setCount = (number) => {
    counter.setCount(number);
    counter.$setState('count1', 100);
    counter.$setAction('setCount1', (store, count) => {
      store.count1 -= count;
    });

    counter.$setGetter('quadruple', (store) => {
      return store.count * 4;
    })
  }

  const setCount1 = (number) => {
    counter.setCount1(number);
  }

  const setUserName = () => {
    user.setUserName();
    user.$setState('info', {
      'height': 176
    });
    user.$setConstant('subTitle', '机密');
  }

  const setAge = () => {
    user.setAge(20);
  }

  const setHeight = (height) => {
    user.setHeight(height);
  }


  const studentStore = ref(null);

  onMounted(() => {
    studentStore.value = center.$setStore('student', {
      state: {
        students: [
          {
            name: '张三',
            grade: 3
          },
          {
            name: '李四',
            grade: 4
          },
          {
            name: '王五',
            grade: 5
          },
        ]
      },
      getters: {
        total (state) {
          return state.students.length;
        }
      },
      actions: {
        setStudent (state, student) {
          state.students.push(student);
        }
      }
    });
  });

  function addStudent () {
    studentStore.value.setStudent({
      name: '小明',
      grade: 6
    })
  }

  const calculatorStore = useCalculator();
  console.log(calculatorStore);
</script>
```
