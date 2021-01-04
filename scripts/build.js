import path from "path";
import alias from "@rollup/plugin-alias";
import commonjs from "@rollup/plugin-commonjs";
import { babel } from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import aliases from "./alias.js";

const resolve = p => {
  const base = p.split("/")[0];
  if (aliases[base]) {
    return path.resolve(aliases[base], p.slice(base.length + 1));
  } else {
    return path.resolve(__dirname, "../", p);
  }
};

const builds = {
  esm: {
    input: resolve("core/index.js"),
    format: "esm",
    outputFile: resolve("dist/yyui.vue.component.esm.js")
  },
  cjs: {
    input: resolve("core/index.js"),
    format: "cjs",
    outputFile: resolve("dist/yyui.vue.component.cjs.js")
  },
  umd: {
    input: resolve("core/index.js"),
    format: "umd",
    outputFile: resolve("dist/yyui.vue.component.js")
  },
  "esm-min": {
    input: resolve("core/index.js"),
    format: "esm",
    outputFile: resolve("dist/yyui.vue.component.esm.min.js"),
    plugins: [terser()]
  },
  "cjs-min": {
    input: resolve("core/index.js"),
    format: "cjs",
    outputFile: resolve("dist/yyui.vue.component.cjs.min.js"),
    plugins: [terser()]
  },
  "umd-min": {
    input: resolve("core/index.js"),
    format: "umd",
    outputFile: resolve("dist/yyui.vue.component.min.js"),
    plugins: [terser()]
  }
};

const getConfig = name => {
  const options = builds[name];
  const config = {
    input: options.input,
    external: "vue",
    plugins: [
      nodeResolve(),
      commonjs(),
      alias({
        entries: Object.assign({}, aliases)
      }),
      babel({
        exclude: [/node_modules/, /@babel\/runtime/],
        babelHelpers: "runtime"
      })
    ].concat(options.plugins || []),
    output: [
      {
        file: options.outputFile,
        format: options.format,
        name: options.moduleName || "VueComponent"
      }
    ]
  };
  return config;
};

module.exports = getConfig(process.env.TARGET);
