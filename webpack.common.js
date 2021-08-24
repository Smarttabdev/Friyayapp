'use strict';
require('dotenv').config();
const path = require('path');

module.exports = function(webpackOptions = {}, options = {}) {
  return {
    mode: process.env.NODE_ENV == 'production' ? 'production' : 'development',
    entry: {
      app: [
        // 'babel-polyfill',
        'react-hot-loader/patch',
        './src/main.js' // your app's entry point
      ],
      vendors: [
        'imports-loader?define=>false&exports=>false&this=>window&window=>this&window.paceOptions=>{ajax:{trackWebSockets:false}}!pace-progress',
        'jquery',
        './vendor/scripts/bootstrap',
        'typeahead.js',
        'jquery-deparam',
        'twitter-text',
        'autolink-js',
        'imports-loader?define=>false!selectize',
        'imports-loader?define=>false!blueimp-file-upload',
        'filepicker-js',
        'imports-loader?define=>false!./vendor/scripts/bootstrap-submenu',
        'messenger/build/js/messenger',
        'messenger/build/js/messenger-theme-flat',
        'imports-loader?define=>false&exports=>false!vex-js',
        'dropbox',
        'client-oauth2'
      ],
      analytics: './src/lib/analytic_vendors.js'
    },
    output: {
      publicPath: '/',
      path: path.join(__dirname, 'public'),
      filename: `js/[name].bundle-[${options.hmr ? 'hash' : 'chunkhash'}].js`
    },
    resolve: {
      // .mjs should come before .js - https://github.com/graphql/graphql-js/issues/1272
      extensions: ['.mjs', '.js', '.jsx'],
      alias: {
        Enums: path.resolve(__dirname, 'src/enums'),
        Utils: path.resolve(__dirname, 'src/utils'),
        AppConstants: path.resolve(__dirname, 'src/constants'),
        Actions: path.resolve(__dirname, 'src/actions'),
        Components: path.resolve(__dirname, 'src/components'),
        Lib: path.resolve(__dirname, 'src/lib'),
        Src: path.resolve(__dirname, 'src'),
        ...(options.hmr
          ? {
              'react-dom': '@hot-loader/react-dom'
            }
          : {})
      },
      modules: [path.resolve(__dirname, 'src'), 'node_modules']
    },
    node: {
      fs: 'empty'
    },
    optimization: {
      runtimeChunk: {
        name: 'runtime'
      },
      noEmitOnErrors: true
    },
    ...webpackOptions
  };
};
