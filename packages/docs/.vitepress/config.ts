import { defineConfig } from 'vitepress'
// import NavbarConfig from './navbar.json'
// import SidebarConfig from './sidebar.json'

export default defineConfig({
  base: '/',
  // lang: 'en-US',
  lang: 'zh-CN',
  title: 'Delfin',
  titleTemplate: 'Vite & Vue powered static site generator',
  description: 'Just playing around.',
  ignoreDeadLinks: true, // 防止因为死链接导致的构建失败
  lastUpdated: true, // 使用 git commit 获取最后更新时间
  head: [
    ['meta', { content: 'Delfin is new generation of SHARED-STATE manager for Vue 3 application.' }]
  ],

  themeConfig: {
    outlineTitle: 'ON THIS PAGE',
    // logo: '/logo.svg',
    // nav: NavbarConfig,
    // sidebar: SidebarConfig,
    lastUpdatedText: '最后更新于',

    socialLinks: [
      { icon: 'github', link: 'https://github.com/amojs-xy/delfin' }
    ],

    editLink: {
      pattern: 'https://github.com/amojs-xy/delfin/edit/master/packages/docs/:path',
      text: 'Edit this page on GitHub'
    },

    docFooter: {
      prev: 'Previous page',
      next: 'Next page'
    }
  }
})
