import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import pkg from "./package.json";

export default {
  input: "index.ts",
  bundleConfigAsCjs: true,
  output: [
    {
      file: "./dist/index.js",
      format: "iife",
      name: "BottomSheet",
    },
    { file: pkg.main, format: "cjs" },
    { file: pkg.module, format: "es" },
  ],
  plugins: [
    commonjs(),
    typescript(),
    babel({
      babelHelpers: "bundled",
      extensions: [".ts", ".js"],
    }),
  ],
};
