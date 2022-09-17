<script setup>
import { useCenter } from 'delfin'

const { counter } = useCenter()

</script>

<div>
counter.count：<code>{{ counter.count }}</code>

<button class="btn" @click="counter.count++">PLUS</button>
<button class="btn" @click="counter.count--">MINUS</button>
</div>
