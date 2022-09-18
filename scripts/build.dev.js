import typescript from 'rollup-plugin-typescript2';

import { input, external, onwarn } from './build.constant.js';

export default {
  input,
  external,
  onwarn,
  output: {
    file: 'dist/index.mjs',
    format: 'esm',
    exports: 'named'
  },
  plugins: [typescript()],
};
