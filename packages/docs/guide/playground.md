<script>
  import RepeatClick from '../.vitepress/directives/repeat-click'

  export default {
    directives: {
      'repeat-click': RepeatClick
    }
  }
</script>

<script setup>
import { useCenter } from 'delfin'

const { counter } = useCenter()

const calculate = value => () => {
  counter.count += value
}
</script>

<h1>Delfin playground</h1>

<section>
  <h3 class="!mb-2">Basic usage</h3>

  <ul class="font-mono">
    <li>double：<code>{{ counter.count }}</code> * 2 = <code>{{ counter.double }}</code></li>
    <li>triple：<code>{{ counter.count }}</code> * 3 = <code>{{ counter.triple }}</code></li>
  </ul>

  <div>
    <button class="btn" v-repeat-click="calculate(1)">PLUS</button>
    <button class="btn" v-repeat-click="calculate(-1)">MINUS</button>
  </div>

</section>
