import dts from 'rollup-plugin-dts';
// import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

import { input, external } from './build.constant.js';

export default [
  {
    input,
    external,
    output: [
      {
        file: 'dist/index.js',
        exports: 'named',
        format: 'cjs'
      },
      {
        file: 'dist/index.mjs',
        format: 'esm',
      },
      {
        file: 'dist/index.module.js',
        format: 'es',
      },
    ],
    plugins: [
      typescript(),
      terser()
    ],
  },

  {
    input,
    external,
    output: [
      {
        file: 'dist/index.d.ts',
        format: 'es',
      },
    ],
    plugins: [dts()],
  },
];
