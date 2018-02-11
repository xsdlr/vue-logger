const path = require('path')
const flow = require('rollup-plugin-flow-no-whitespace')
const buble = require('rollup-plugin-buble')
const resolve = require('rollup-plugin-node-resolve')
const replace = require('rollup-plugin-replace')
const filesize = require('rollup-plugin-filesize')
const progress = require('rollup-plugin-progress')
const uglify = require('rollup-plugin-uglify')
const commonjs = require('rollup-plugin-commonjs')
const vue = require('rollup-plugin-vue')
const nodent = require('rollup-plugin-nodent')
const packageInfo = require('../package.json')
const version = process.env.VERSION || packageInfo.version
const author = packageInfo.author
const license = packageInfo.license
const moduleName = packageInfo.name
const dependencies = packageInfo.dependencies || []

const banner =
`/*
 * ${moduleName} v${version}
 * (c) ${new Date().getFullYear()} ${author.name}(${author.email})
 * Released under the ${license} License.
 */
`
const external = Object.keys(dependencies)
const builds = {
  'full-umd': {
    entry: path.resolve(__dirname, '../src/index.js'),
    dest: path.resolve(__dirname, `../dist/${moduleName}.js`),
    format: 'umd',
    moduleName,
    banner
  },
  'prod-umd': {
    entry: path.resolve(__dirname, '../src/index.js'),
    dest: path.resolve(__dirname, `../dist/${moduleName}.min.js`),
    format: 'umd',
    sourceMap: true,
    plugins: [
      uglify()
    ],
    moduleName,
    banner
  },
  'esm': {
    entry: path.resolve(__dirname, '../src/index.js'),
    dest: path.resolve(__dirname, `../dist/${moduleName}.esm.js`),
    format: 'es',
    moduleName,
    banner
  },
  'cjs': {
    entry: path.resolve(__dirname, '../src/index.js'),
    dest: path.resolve(__dirname, `../dist/${moduleName}.common.js`),
    format: 'cjs',
    moduleName,
    banner
  }
}

function genConfig (opts) {
  const config = {
    entry: opts.entry,
    dest: opts.dest,
    external: external.concat(opts.external),
    globals: {
      'lodash': '_',
      'log4js-helper': 'logger'
    },
    format: opts.format,
    banner: opts.banner,
    moduleName: opts.moduleName,
    plugins: [
      replace({
        __VERSION__: version
      }),
      flow(),
      resolve(),
      commonjs(),
      vue({
        css: `dist/${moduleName}.css`
      }),
      nodent({
        promises: true,
        noRuntime: true
      }),
      buble(),
      progress(),
      filesize()
    ].concat(opts.plugins || [])
  }
  return config
}

exports.getAllBuilds = () => Object.keys(builds).map(name => genConfig(builds[name]))
