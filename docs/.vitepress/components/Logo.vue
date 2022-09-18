<template>
  <span class="flex gap-.1em text-50px">
    <i class="d" />
    <i class="e" />
    <i class="l" />
    <i class="f" />
    <i class="i" />
    <i class="n" />
  </span>
</template>

<style scoped>
.d,.e,.l,.f,.i,.n {
  position: relative;
  display: inline-block;
  height: 1em;
}

.d,.l,.n {
  border: .2em solid;
}

.d {
  width: .8em;
}

.e::before,
.e::after {
  content: '';
  display: block;
  width: .72em;
  border-style: solid
}

.e::before {
  border-width: .2em 0 .2em .2em;
  height: .6em;
}

.e::after {
  border-width: 0 0 .2em .2em;
  height: .4em;
}

.l {
  width: .6em;
  border-top:0;
  border-right:0
}

.f::before,
.f::after {
  content: '';
  display: block;
  width: .65em;
  border-style: solid
}

.f::before {
  border-width: .2em 0 0 .2em;
  height: 1em;
}

.f::after {
  position: absolute;
  top: .35em;
  left: 0;
  height: .2em;
  background-color: currentColor;
}

.i {
  content: '';
  display: block;
  width: .22em;
  background-color: currentColor
}

.n {
  width: .8em;
  border-bottom: 0
}
</style>
