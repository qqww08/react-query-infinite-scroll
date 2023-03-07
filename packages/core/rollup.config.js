import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import css from "rollup-plugin-import-css";
import terser from "@rollup/plugin-terser";

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
    css(),
    terser(),
    babel({
      babelHelpers: "bundled",
      extensions: [".ts", ".js"],
      presets: ["@babel/preset-env", "@babel/preset-typescript"],
      exclude: "node_modules/**",
    }),
  ],
};
