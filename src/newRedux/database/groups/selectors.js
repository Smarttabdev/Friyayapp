import { createSelector } from 'reselect';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { sortAlpha } from 'Lib/utilities';

export const getGroups = createSelector(
  state => state._newReduxTree.database.groups,
  groups => sortAlpha(Object.values(groups), 'title')
);
