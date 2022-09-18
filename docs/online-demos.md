<script>
  import RepeatClick from './.vitepress/directives/repeat-click'

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

# Delfin playground

## Basic usage
### Counter
<div class="font-mono mt-1">
  double：<code>{{ counter.count }}</code> * 2 = <code>{{ counter.double }}</code>
</div>
<div class="font-mono mt-1">
  triple：<code>{{ counter.count }}</code> * 3 = <code>{{ counter.triple }}</code>
</div>

<button class="btn" v-repeat-click="calculate(1)">PLUS</button>
<button class="btn" v-repeat-click="calculate(-1)">MINUS</button>
