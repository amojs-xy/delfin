import { defineConfig } from 'vitepress'
// import NavbarConfig from './navbar.json'
// import SidebarConfig from './sidebar.json'

export default defineConfig({
  base: '/',
  // lang: 'en-US',
  lang: 'zh-CN',
  title: 'Delfin',
  titleTemplate: 'Vue share states library.',
  description: 'Delfin is new generation of SHARED-STATE manager for Vue 3 application.',
  ignoreDeadLinks: true, // 防止因为死链接导致的构建失败
  lastUpdated: true, // 使用 git commit 获取最后更新时间
  cleanUrls: 'without-subfolders',

  themeConfig: {
    // outlineTitle: 'ON THIS PAGE',
    // logo: '/logo.svg',
    // nav: NavbarConfig,
    // sidebar: SidebarConfig,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/amojs-xy/delfin' }
    ],

    editLink: {
      pattern: 'https://github.com/amojs-xy/delfin/edit/master/docs/:path',
      text: 'Edit this page on GitHub'
    },

    docFooter: {
      prev: 'Previous page',
      next: 'Next page'
    }
  }
})
