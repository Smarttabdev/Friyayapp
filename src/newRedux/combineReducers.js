import { combineReducers } from 'redux';

import presence from './presence/reducer';
import database from './database/combineReducers';
import filters from './filters/reducer';
import groupBy from './groupBy/reducer';
import routing from './routing/reducer';
import session from './session/reducer';
import ui from './interface/combineReducers';
import utilities from './utilities/reducer';
import bot from './bot/reducer';
import integrationFiles from './integrationFiles/combineReducers';
import videoRoom from './videoRoom/reducer';
import templates from './templates/reducer';
import results from './results/reducer';

const newReduxReducers = combineReducers({
  presence,
  database,
  filters,
  groupBy,
  routing,
  session,
  ui,
  utilities,
  bot,
  integrationFiles,
  videoRoom,
  templates,
  results
});

export default newReduxReducers;
