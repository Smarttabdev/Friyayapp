import { createSelector } from 'reselect';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { peopleFilters } from 'Lib/config/filters/people';
import { applyFilters, sortAlpha } from 'Lib/utilities';
import compact from 'lodash/compact';
import get from 'lodash/get';
import { peopleGroupFilter } from 'Lib/config/filters/other';
import { getFilterSettings } from 'Src/helpers/user_config';

const getPeople = state => stateMappings(state).people;

export const getPeopleArray = createSelector(
  state => getPeople(state),
  state => stateMappings(state).user,
  (people, user) => {
    const filteredPeople = Object.values(people).filter(
      p => p.attributes.is_active
    );
    const currentUser = people[user.id];
    if (currentUser) filteredPeople.push(currentUser);
    return sortAlpha(Object.values(filteredPeople), 'name');
  }
);

export const getPeopleObject = createSelector(
  state => getPeople(state),
  state => stateMappings(state).user,
  (people, user) => {
    const peopleObject = {};
    Object.values(people)
      .filter(p => p.attributes.is_active)
      .forEach(p => (peopleObject[p.id] = people[p.id]));
    const currentUser = people[user.id];
    if (currentUser) peopleObject[user.id] = currentUser;
    return peopleObject;
  }
);

export const getFilteredPeople = createSelector(
  state => getPeopleArray(state),
  state => getFilterSettings(state).people,
  state => stateMappings(state).user,
  state => stateMappings(state).page.groupId,
  state => stateMappings(state).groups,
  (_, isWorkspace) => isWorkspace,
  state => stateMappings(state).filters.people,
  (
    people,
    activePeopleFilters = ['ALL'],
    user,
    groupId,
    groups,
    isWorkspace,
    workspacePeopleFilter
  ) => {
    const activeFilters = isWorkspace
      ? workspacePeopleFilter
      : activePeopleFilters;
    const filters = compact([
      ...activeFilters.map(key => peopleFilters[key].filter(user)),
      groupId &&
        peopleGroupFilter(
          get(groups[groupId], 'relationships.following_users.data', [])
        )
    ]);
    let filteredPeople = applyFilters(people, filters, true);
    return filteredPeople;
  }
);
