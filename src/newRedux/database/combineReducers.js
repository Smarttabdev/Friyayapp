import { combineReducers } from 'redux';

import cards from './cards/reducer';
import comments from './comments/reducer';
import domains from './domains/reducer';
import groups from './groups/reducer';
import labelCategories from './labelCategories/reducer';
import labelOrders from './labelOrders/reducer';
import labels from './labels/reducer';
import notifications from './notifications/reducer';
import people from './people/reducer';
import topics from './topics/reducer';
import topicOrders from './topicOrders/reducer';
import user from './user/reducer';
import search from './search/reducer';
import logtimes from './logtimes/reducer';
import tools from './lenses/reducers';
import columnOrders from './columnOrders/reducer';
import officeHours from './officeHours/reducer';
import GIDBFLenses from './GIDBFLenses/reducer';
import activity from './activity/reducer';
import invitations from './invitations/reducer';

const dbReducers = combineReducers({
  tools,
  cards,
  logtimes,
  comments,
  domains,
  groups,
  labelCategories,
  labelOrders,
  labels,
  notifications,
  people,
  topics,
  topicOrders,
  user,
  search,
  columnOrders,
  officeHours,
  GIDBFLenses,
  activity,
  invitations
});

export default dbReducers;
