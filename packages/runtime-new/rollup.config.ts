import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import cleanup from 'rollup-plugin-cleanup';

export default {
  input: 'index.ts',
  plugins: [
    typescript({
      compilerOptions: { declaration: false },
    }),
    nodeResolve(),
    cleanup(),
  ],
  output: [
    {
      file: '../../dist/runtime/sff.js',
      format: 'esm',
    },
    {
      file: '../../dist/runtime/sff.min.js',
      format: 'esm',
      plugins: [terser()],
    },
  ],
};
