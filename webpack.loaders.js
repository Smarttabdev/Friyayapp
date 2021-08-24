'use strict';
require('dotenv').config();
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function({ eslint, extractCSS, eslintOptions = {} }) {
  return [
    {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'file-loader'
    },
    {
      test: /\.(woff|woff2)$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'url-loader?prefix=font/&limit=5000'
    },
    {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
    },
    {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
    },
    {
      test: /\.gif/,
      exclude: /(node_modules|bower_components)/,
      loader: 'url-loader?limit=10000&mimetype=image/gif'
    },
    {
      test: /\.jpg/,
      exclude: /(node_modules|bower_components)/,
      loader: 'url-loader?limit=10000&mimetype=image/jpg'
    },
    {
      test: /\.png/,
      exclude: /(node_modules|bower_components)/,
      loader: 'url-loader?limit=10000&mimetype=image/png'
    },
    {
      test: /\.ejs?$/,
      loader: 'ejs-loader'
    },
    {
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components|public\/)/,
      include: [path.join(__dirname, './src'), /\/node_modules\/flux/],
      use: [
        {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            plugins: [
              [
                'react-css-modules',
                {
                  generateScopedName: '[path][name]__[local]',
                  context: path.resolve(__dirname, 'src/components'),
                  handleMissingStyleName: 'warn',
                  filetypes: {
                    '.scss': {
                      syntax: 'postcss-scss'
                    }
                  }
                }
              ]
            ]
          }
        },
        ...(eslint
          ? [
              {
                loader: 'eslint-loader',
                options: {
                  failOnError: true,
                  quiet: true,
                  ...eslintOptions
                }
              }
            ]
          : [])
      ]
    },
    extractCSS
      ? {
          oneOf: [
            {
              test: /\.module\.(sa|sc|c)ss$/,
              use: [
                MiniCssExtractPlugin.loader,
                {
                  loader: 'css-loader',
                  options: {
                    modules: true,
                    localIdentName: '[path][name]__[local]',
                    context: path.resolve(__dirname, 'src/components'),
                    importLoaders: 1
                  }
                },
                'sass-loader'
              ]
            },
            {
              test: /\.(sa|sc|c)ss$/,
              use: [
                MiniCssExtractPlugin.loader,
                {
                  loader: 'css-loader',
                  options: {
                    importLoaders: 1
                  }
                },
                'sass-loader'
              ]
            }
          ]
        }
      : {
          oneOf: [
            {
              test: /\.module\.(sa|sc|c)ss$/,
              use: [
                'style-loader',
                {
                  loader: 'css-loader',
                  options: {
                    modules: true,
                    localIdentName: '[path][name]__[local]',
                    context: path.resolve(__dirname, 'src/components'),
                    importLoaders: 1
                  }
                },
                'sass-loader'
              ]
            },
            {
              test: /\.(sa|sc|c)ss$/,
              use: ['style-loader', 'css-loader', 'sass-loader']
            }
          ]
        }
  ];
};
