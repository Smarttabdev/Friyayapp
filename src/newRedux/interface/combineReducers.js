import { combineReducers } from 'redux';

import dock from './dock/reducer';
import menus from './menus/reducer';
import modals from './modals/reducer';
import page from './page/reducer';
import loadIndicator from './loadIndicators/reducer';
import tools from './lenses/reducer';
import pinnedTools from './pinnedTools/reducer';

const interfaceReducers = combineReducers({
  dock,
  modals,
  menus,
  page,
  loadIndicator,
  tools,
  pinnedTools
});

export default interfaceReducers;
