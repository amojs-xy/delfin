---
layout: home
# hero:
#   name: VitePress
#   text: Vite & Vue powered static site generator.
#   tagline: Lorem ipsum...
#   actions:
#     - theme: brand
#       text: Get Started
#       link: /guide/what-is-vitepress
#     - theme: alt
#       text: View on GitHub
#       link: https://github.com/vuejs/vitepress

# features:
#   - icon: ⚡️
#     title: Vite, The DX that can't be beat
#     details: Lorem ipsum...
#   - icon: 🖖
#     title: Power of Vue meets Markdown
#     details: Lorem ipsum...
#   - icon: 🛠️
#     title: Simple and minimal, always
#     details: Lorem ipsum...
---

<script setup>
import Logo from './.vitepress/components/Logo.vue'
</script>

<main class="max-w-960px mx-auto px-32px">
  <section class="flex flex-col items-center justify-center pt-128px pb-168px">
    <h1 class="text-#ff7d00 text-6xl font-bold mt-8">
      <span class="text-0 hidden">delfin</span>
      <Logo />
    </h1>
    <p class="font-500 mt-6 mb-8">
      Delfin is a new generation of <code>SHARED-STATE</code> manager for Vue 3 application.
    </p>
    <div class="text-center">
      <a href="/introduction" class="btn !h-34px !leading-32px">📖 Get Started</a>
      <a href="/online-demos" class="btn !h-34px !leading-32px">🎮 Playground</a>
    </div>
  </section>

  <hr class="border-0 border-t border-$vp-c-gray-light-2 border-dashed opacity-70 mx-16" />

  <section class="pt-30px">
    <h2 class="font-600 text-2xl mt-16 mb-6 uppercase">features</h2>
    <ul class="flex gap-4">
      <li class="w-33.33% rounded-3 p-4 bg-$vp-c-bg-soft">
        <h3 class="uppercase font-500">feature</h3>
        <p>lorem ...</p>
      </li>
      <li class="w-33.33% rounded-3 p-4 bg-$vp-c-bg-soft">
        <h3 class="uppercase font-500">feature</h3>
        <p>lorem ...</p>
      </li>
      <li class="w-33.33% rounded-3 p-4 bg-$vp-c-bg-soft">
        <h3 class="uppercase font-500">feature</h3>
        <p>lorem ...</p>
      </li>
    </ul>
  </section>
</main>
