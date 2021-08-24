import { createSelector } from 'reselect';
import get from 'lodash/get';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { sortAlpha, getThisDomain } from 'Lib/utilities';

const defaultFilter = {
  assigned: [],
  creator: [],
  label: [],
  priority: [],
  people: ['ALL'],
  card: 'ALL',
  topic_filter: ['ALL'],
  completed_start_date: null,
  completed_end_date: null,
  created_start_date: null,
  created_end_date: null,
  due_start_date: null,
  due_end_date: null,
  start_start_date: null,
  start_end_date: null,
  include_now_cards: false,
  include_archived_cards: false,
  include_subtopic_cards: false,
  include_nested_cards: false,
  include_completed_cards: true,
  include_uncompleted_cards: true,
  include_uncompleted_sorted_cards: false,
  filter_states: {}
};

export const getDomains = createSelector(
  state => state._newReduxTree.database.domains,
  domains => {
    return [
      domains['0'],
      ...sortAlpha(Object.values(domains), 'name').filter(dom => dom.id != '0')
    ];
  }
);

export const getCurrentDomain = createSelector(
  state => getDomains(state),
  domains => getThisDomain(domains)
);

export const getUserDomainContext = createSelector(
  state => stateMappings(state).page.domainId,
  state => stateMappings(state).page.groupId,
  state => stateMappings(state).domains,
  (domainId, groupId, domains) => {
    const thisDomain = domains[domainId];
    const domainMasks = get(thisDomain, 'relationships.masks.data');
    if (domainMasks) {
      if (domainId === '0') {
        return 'PUBLIC';
      } else if (domainMasks.is_guest && groupId) {
        return 'GUESTINGROUP';
      } else if (domainMasks.is_guest) {
        return 'GUEST';
      } else if (domainMasks.is_owner) {
        return 'OWNER';
      } else if (window.location.href.includes('https://support')) {
        return 'SUPPORT';
      } else {
        return 'DOMAIN';
      }
    } else {
      return 'DOMAIN';
    }
  }
);

export const getDomainUISettings = createSelector(
  state => stateMappings(state).domains,
  state => stateMappings(state).page.domainId,
  (domains, domainId) => {
    return get(
      domains[domainId],
      'attributes.user_configuration.data.attributes.ui_settings',
      {}
    );
  }
);

export const getDomainFilters = createSelector(
  state => stateMappings(state).domains,
  state => stateMappings(state).page.domainId,
  (domains, domainId) => {
    return get(
      domains[domainId],
      'attributes.user_configuration.data.attributes.filter_setting',
      defaultFilter
    );
  }
);

export const getDomainCustomLensId = createSelector(
  state => stateMappings(state).domains,
  state => stateMappings(state).page.domainId,
  (domains, domainId) => {
    return get(
      domains[domainId],
      'attributes.user_configuration.data.attributes.current_active_lens_id'
    );
  }
);

export const getDomainUserConfig = createSelector(
  state => stateMappings(state).domains,
  state => stateMappings(state).page.domainId,
  (domains, domainId) => {
    return get(
      domains[domainId],
      'attributes.user_configuration.data.attributes',
      {}
    );
  }
);
