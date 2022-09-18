<!-- src/Counter.vue -->
<script setup>
import { useCenter } from 'delfin'

const { counter } = useCenter()

console.log(counter)
</script>

<template>
  <div class="font-mono">
    <code>{{ counter.count }}</code> * 2 = <code>{{ counter.double }}</code>
  </div>
  <div class="font-mono my-1">
    <code>{{ counter.count }}</code> * 3 = <code>{{ counter.triple }}</code>
  </div>

  <button class="btn" @click="counter.setCountPlus">PLUS</button>
  <button class="btn" @click="counter.setCountMinus">MINUS</button>
</template>
