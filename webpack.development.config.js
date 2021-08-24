'use strict';
const path = require('path');
const common = require('./webpack.common');
const loaders = require('./webpack.loaders');
const plugins = require('./webpack.plugins');

module.exports = common(
  {
    module: {
      rules: loaders({
        eslint: true,
        eslintOptions: {
          emitWarning: true
        }
      })
    },
    plugins: plugins({
      dev: true,
      devTools: true,
      hmr: true
    }),
    devServer: {
      inline: true,
      hot: true,
      historyApiFallback: true,
      contentBase: path.join(__dirname, 'public'),
      clientLogLevel: 'error',
      noInfo: true
    },
    devtool: process.env.DEBUG && 'source-map',
    watch: true,
    watchOptions: {
      poll: false,
      ignored: /node_modules/
    }
  },
  {
    hmr: true
  }
);
