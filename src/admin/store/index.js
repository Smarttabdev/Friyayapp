import React from 'react';
import globalHook from 'use-global-hook';

import states from './states';

const rootStates = Object.keys(states).reduce((obj, key) => {
  obj[key] = states[key].state;
  return obj;
}, {});

const rootActions = Object.keys(states).reduce((obj, key) => {
  obj[key] = states[key].actions;
  return obj;
}, {});

const useGlobal = globalHook(React, rootStates, rootActions);

export default useGlobal;
