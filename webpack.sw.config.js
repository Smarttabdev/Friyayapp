require('dotenv').config();
const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');

const dev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

module.exports = {
  mode: process.env.NODE_ENV == 'production' ? 'production' : 'development',
  entry: './src/sw.js',
  output: {
    publicPath: '/',
    path: path.join(__dirname, 'public'),
    filename: 'sw.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components|public\/)/,
        include: [path.join(__dirname, './src')],
        use: [
          'babel-loader',
          ...(dev
            ? [
                {
                  loader: 'eslint-loader',
                  options: {
                    failOnError: true,
                    quiet: true,
                    emitWarning: true
                  }
                }
              ]
            : [])
        ]
      }
    ]
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
      Src: path.resolve(__dirname, 'src')
    },
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  plugins: [
    new webpack.DefinePlugin({
      'self.API_URL': JSON.stringify(process.env.API_URL)
    }),
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.(js|css|html)$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ]
};
