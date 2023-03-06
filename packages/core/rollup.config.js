import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import mjsEntry from "rollup-plugin-mjs-entry";

import pkg from "./package.json";

export default {
  input: "src/index.ts",
  bundleConfigAsCjs: true,
  output: [
    { file: pkg.main, format: "cjs" },
    { file: pkg.module, format: "es" },
  ],
  plugins: [
    typescript(),
    commonjs(),
    mjsEntry(),
    babel({
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      babelHelpers: "bundled",
      presets: ["@babel/preset-env", "@babel/preset-typescript"],
    }),
  ],
};
