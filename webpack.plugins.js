'use strict';
require('dotenv').config();
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
// const BrotliPlugin = require('brotli-webpack-plugin');
const RollbarSourceMapPlugin = require('rollbar-sourcemap-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

function _if(cond, plugins) {
  return cond ? (Array.isArray(plugins) ? plugins : [plugins]) : [];
}

module.exports = function({
  appEnv = process.env.NODE_ENV,
  dev,
  devTools,
  hmr,
  extractCSS,
  analyzer,
  compression,
  rollbar
}) {
  return [
    ..._if(!hmr, [
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [
          'css/**',
          'js/**',
          '*.hot-update.json',
          '*.hot-update.js',
          '*.hot-update.js.map',
          '*.map',
          '*.br',
          '*.gz'
        ]
      })
    ]),
    new webpack.DefinePlugin({
      __DEV__: dev,
      ...(devTools ? { __REDUX_DEVTOOLS__: process.env.REDUX_DEVTOOLS } : {}),
      'process.env.BROWSER': false,
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'window.APP_ENV': JSON.stringify(process.env.APP_ENV),
      'window.APP_DOMAIN': JSON.stringify(process.env.APP_DOMAIN),
      'window.APP_HOST': JSON.stringify(process.env.APP_HOST),
      'window.APP_PORT': JSON.stringify(process.env.APP_PORT),
      'window.GRAPHQL_URL': JSON.stringify(process.env.GRAPHQL_URL),
      'window.API_URL': JSON.stringify(process.env.API_URL),
      'window.CABLE_URL': JSON.stringify(process.env.CABLE_URL),
      'window.SUPPORT_URL': JSON.stringify(process.env.SUPPORT_URL),
      'window.SUPERADMIN_IDS': JSON.stringify(process.env.SUPERADMIN_IDS),
      'window.WELCOME_TOPIC_ID': JSON.stringify(process.env.WELCOME_TOPIC_ID),
      'window.IDEAS_TOPIC_ID': JSON.stringify(process.env.IDEAS_TOPIC_ID),
      'window.SUPPORT_TOPIC_ID': JSON.stringify(process.env.SUPPORT_TOPIC_ID),
      'window.FILESTACK_API_KEY': JSON.stringify(process.env.FILESTACK_API_KEY),
      'window.FILESTACK_API_URL': JSON.stringify(process.env.FILESTACK_API_URL),
      'window.RECAPTCHA_SITE': JSON.stringify(process.env.RECAPTCHA_SITE),
      'window.RECAPTCHA_SECRET': JSON.stringify(process.env.RECAPTCHA_SECRET),
      'window.PUSHER_APP_KEY': JSON.stringify(process.env.PUSHER_APP_KEY),
      'window.DROPBOX_APP_URL': JSON.stringify(process.env.DROPBOX_APP_URL),
      'window.DROPBOX_APP_KEY': JSON.stringify(process.env.DROPBOX_APP_KEY),
      'window.DROPBOX_APP_SECRET': JSON.stringify(
        process.env.DROPBOX_APP_SECRET
      ),
      'window.DROPBOX_APP_AUTHORIZATION_URI': JSON.stringify(
        process.env.DROPBOX_APP_AUTHORIZATION_URI
      ),
      'window.DROPBOX_APP_ACCESS_TOKEN_URI': JSON.stringify(
        process.env.DROPBOX_APP_ACCESS_TOKEN_URI
      ),
      'window.SLACK_APP_KEY': JSON.stringify(process.env.SLACK_APP_KEY),
      'window.SLACK_APP_SECRET': JSON.stringify(process.env.SLACK_APP_SECRET),
      'window.SLACK_APP_AUTHORIZATION_URI': JSON.stringify(
        process.env.SLACK_APP_AUTHORIZATION_URI
      ),
      'window.SLACK_APP_ACCESS_TOKEN_URI': JSON.stringify(
        process.env.SLACK_APP_ACCESS_TOKEN_URI
      ),
      'window.GOOGLE_APP_KEY': JSON.stringify(process.env.GOOGLE_APP_KEY),
      'window.GOOGLE_APP_SECRET': JSON.stringify(process.env.GOOGLE_APP_SECRET),
      'window.GOOGLE_APP_AUTHORIZATION_URI': JSON.stringify(
        process.env.GOOGLE_APP_AUTHORIZATION_URI
      ),
      'window.GOOGLE_APP_ACCESS_TOKEN_URI': JSON.stringify(
        process.env.GOOGLE_APP_ACCESS_TOKEN_URI
      ),
      'window.BOX_APP_URL': JSON.stringify(process.env.BOX_APP_URL),
      'window.BOX_APP_KEY': JSON.stringify(process.env.BOX_APP_KEY),
      'window.BOX_APP_SECRET': JSON.stringify(process.env.BOX_APP_SECRET),
      'window.BOX_APP_AUTHORIZATION_URI': JSON.stringify(
        process.env.BOX_APP_AUTHORIZATION_URI
      ),
      'window.BOX_APP_ACCESS_TOKEN_URI': JSON.stringify(
        process.env.BOX_APP_ACCESS_TOKEN_URI
      ),
      'window.FROALA_EDITOR_KEY': JSON.stringify(process.env.FROALA_EDITOR_KEY),
      'window.CODOX_API_KEY': JSON.stringify(process.env.CODOX_API_KEY),
      'window.TRELLO_PUBLIC_KEY': JSON.stringify(process.env.TRELLO_PUBLIC_KEY),
      'window.WEBPUSH_PUBLIC_KEY': JSON.stringify(
        process.env.WEBPUSH_PUBLIC_KEY
      )
    }),
    ..._if(!hmr, [new webpack.HashedModuleIdsPlugin()]),
    new HtmlWebpackPlugin({
      template: 'public/index.html.ejs',
      filename: 'index.html',
      appEnv,
      CODOX_API_KEY: process.env.CODOX_API_KEY,
      devServer: hmr,
      chunksSortMode: function(chunk1, chunk2) {
        const orders = ['common', 'vendors', 'analytics', 'app'];
        return orders.indexOf(chunk1) - orders.indexOf(chunk2);
      }
      // minify: {
      //   collapseWhitespace: true,
      //   collapseInlineTagWhitespace: true,
      //   removeComments: true,
      //   removeRedundantAttributes: true
      // }
    }),
    ..._if(!hmr, [
      new HtmlWebpackPlugin({
        template: 'public/version.txt.ejs',
        filename: 'version.txt',
        inject: false
      })
    ]),
    ..._if(extractCSS, [
      new MiniCssExtractPlugin({
        filename: `css/[name].bundle-[${hmr ? 'hash' : 'chunkhash'}].css`,
        chunkFilename: `css/[name].bundle-[${hmr ? 'hash' : 'chunkhash'}].css`
      })
    ]),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      moment: 'moment',
      cn: 'classnames',
      get: 'lodash/get',
      eventBus: [
        path.resolve(path.join(__dirname, 'src/lib/eventBus')),
        'default'
      ],
      graphql: ['react-relay', 'graphql'],
      containers: [
        path.resolve(path.join(__dirname, 'src/graphql')),
        'containers'
      ],
      queries: [path.resolve(path.join(__dirname, 'src/graphql')), 'queries'],
      mutations: [
        path.resolve(path.join(__dirname, 'src/graphql')),
        'mutations'
      ],
      subscriptions: [
        path.resolve(path.join(__dirname, 'src/graphql')),
        'subscriptions'
      ],
      toId: [
        path.resolve(path.join(__dirname, 'src/lib/utilities.js')),
        'toId'
      ],
      toGid: [
        path.resolve(path.join(__dirname, 'src/lib/utilities.js')),
        'toGid'
      ],
      getNodes: [
        path.resolve(path.join(__dirname, 'src/lib/utilities.js')),
        'getNodes'
      ],
      detectMount: [
        path.resolve(path.join(__dirname, 'src/lib/utilities.js')),
        'detectMount'
      ],
      loadingIndicator: [
        path.resolve(path.join(__dirname, 'src/lib/utilities.js')),
        'loadingIndicator'
      ],
      rootFragments: [
        path.resolve(path.join(__dirname, 'src/lib/utilities.js')),
        'rootFragments'
      ],
      QueryRenderer: [
        path.resolve(path.join(__dirname, 'src/lib/relay.js')),
        'QueryRenderer'
      ],
      queryRenderer: [
        path.resolve(path.join(__dirname, 'src/lib/relay.js')),
        'default'
      ],
      requestSubscription: [
        path.resolve(path.join(__dirname, 'src/lib/relay.js')),
        'requestSubscription'
      ],
      commitMutation: [
        path.resolve(path.join(__dirname, 'src/lib/relay.js')),
        'commitMutation'
      ],
      updateStore: [
        path.resolve(path.join(__dirname, 'src/lib/relay.js')),
        'updateStore'
      ],
      fetchQuery: [
        path.resolve(path.join(__dirname, 'src/lib/relay.js')),
        'fetchQuery'
      ],
      createFragmentContainer: ['react-relay', 'createFragmentContainer'],
      createPaginationContainer: ['react-relay', 'createPaginationContainer'],
      createRefetchContainer: ['react-relay', 'createRefetchContainer'],
      ConnectionHandler: ['relay-runtime', 'ConnectionHandler']
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ..._if(hmr, [new webpack.HotModuleReplacementPlugin()]),
    ..._if(compression, [
      new CompressionPlugin({
        algorithm: 'gzip',
        test: /\.(js|css|html)$/,
        threshold: 10240,
        minRatio: 0.8
      })
      // new BrotliPlugin({
      //   test: /\.(js|css|html)$/,
      //   threshold: 10240,
      //   minRatio: 0.8
      // })
    ]),
    ..._if(rollbar, [
      new RollbarSourceMapPlugin({
        accessToken: 'cc0da5f18d31441d8a0cb4dc128ee52b',
        version: '0.6.15',
        publicPath: 'https://dynamichost'
      })
    ]),
    ..._if(analyzer, [new BundleAnalyzerPlugin()])
  ];
};
