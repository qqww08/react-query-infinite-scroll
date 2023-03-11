import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";

/** @type {import('rollup').RollupOptions}
 *  @param {import('rollup').InputPluginOption} plugins
 *  @param {import('rollup').OutputOptions} output
 * */
export default ({ plugins = [], output = [], ...rest } = {}) => {
  return {
    input: "src/index.ts",
    bundleConfigAsCjs: true,
    output: [
      {
        file: "./dist/index.js",
        format: "iife",
        name: "BottomSheet",
      },
      { file: "./dist/index.cjs.js", format: "cjs" },
      { file: "./dist/index.esm.js", format: "es" },
      ...output,
    ],
    plugins: [
      commonjs(),
      typescript(),
      terser(),
      babel({
        babelHelpers: "bundled",
        extensions: [".ts", ".js"],
        presets: ["@babel/preset-env", "@babel/preset-typescript"],
        exclude: "node_modules/**",
      }),
      ...plugins,
    ],
    ...rest,
  };
};
