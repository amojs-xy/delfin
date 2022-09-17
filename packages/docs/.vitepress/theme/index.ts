import DefaultTheme from 'vitepress/theme'
import useDelfin from '../stores/index.js'

import 'uno.css'
import './global.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(useDelfin)
  }
}
