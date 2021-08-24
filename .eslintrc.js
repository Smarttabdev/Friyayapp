module.exports = {
  parser: 'babel-eslint',
  rules: {
    complexity: ['warn', { max: 20 }],
    indent: ['warn', 2, { SwitchCase: 1 }],
    'linebreak-style': ['warn', 'unix'],
    'max-depth': ['warn', { max: 4 }],
    'max-len': ['warn', { code: 120, tabWidth: 2 }],
    'no-console': [
      'warn',
      {
        allow: ['warn', 'error', 'info']
      }
    ],
    quotes: ['warn', 'single'],
    semi: ['warn', 'always'],
    'no-shadow': [
      'warn',
      {
        builtinGlobals: false,
        hoist: 'functions',
        allow: []
      }
    ],

    // temp ease rules while fixing errors
    'no-prototype-builtins': 'off',
    'no-mixed-spaces-and-tabs': 'warn',
    'no-unused-vars': 'warn',
    'react/no-unescaped-entities': 'warn',
    'react/display-name': 'warn',
    'react/prop-types': 'warn',
    'react/no-string-refs': 'warn',
    'react/jsx-no-target-blank': 'warn'
  },
  env: {
    es6: true,
    node: true,
    commonjs: true,
    browser: true,
    jquery: true,
    jest: true
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  globals: {
    __DEV__: true,
    __REDUX_DEVTOOLS__: true,
    appEnv: true,
    moment: true,
    devLog: true,
    cn: true,
    get: true,
    eventBus: true,
    vex: true,
    Pace: true,
    twttr: true,
    Messenger: true,
    filepicker: true,
    Trello: true,
    Codox: true,
    toId: true,
    toGid: true,
    getNodes: true,
    rootFragments: true,
    fetchQuery: true,
    graphql: true,
    queryRenderer: true,
    QueryRenderer: true,
    requestSubscription: true,
    commitMutation: true,
    updateStore: true,
    createFragmentContainer: true,
    createPaginationContainer: true,
    createRefetchContainer: true,
    ConnectionHandler: true,
    containers: true,
    queries: true,
    mutations: true,
    subscriptions: true,
    detectMount: true,
    loadingIndicator: true
  },
  parserOptions: {
    ecmaVersion: 9,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true
    }
  },
  plugins: ['react'],
  settings: {
    react: {
      version: 'detect'
    }
  }
};
