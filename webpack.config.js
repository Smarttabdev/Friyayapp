'use strict';
const common = require('./webpack.common');
const loaders = require('./webpack.loaders');
const plugins = require('./webpack.plugins');

module.exports = common({
  module: {
    rules: loaders({
      eslint: true,
      extractCSS: true
    })
  },
  plugins: plugins({
    dev: true,
    devTools: true,
    extractCSS: true,
    analyzer: !!process.env.analyse
  }),
  devtool: 'cheap-module-source-map',
  watch: true,
  watchOptions: {
    poll: false,
    ignored: /node_modules/
  },
  stats: {
    entrypoints: false,
    children: false
  }
});
