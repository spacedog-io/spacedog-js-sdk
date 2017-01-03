import babel from 'rollup-plugin-babel';

export default {
  moduleName: "SpaceDog",
  entry: 'src/spacedog.js',
  dest: 'spacedog.min.js',
  format: 'umd',
  sourceMap: 'inline',
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
  ],
};