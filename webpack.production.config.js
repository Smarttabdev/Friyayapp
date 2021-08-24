'use strict';
const common = require('./webpack.common');
const loaders = require('./webpack.loaders');
const plugins = require('./webpack.plugins');

module.exports = common({
  module: {
    rules: loaders({ extractCSS: true })
  },
  plugins: plugins({
    extractCSS: true,
    compression: true,
    rollbar: true
  })
});
