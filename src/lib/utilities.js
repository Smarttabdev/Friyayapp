import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ConnectionHandler } from 'relay-runtime';
import moment from 'moment';
import { get, set, pick, reduce, each, castArray } from 'lodash';
import qs from 'querystringify';
import { singularize } from 'inflection';
import parameterize from 'parameterize-string';
import { createSelector } from 'reselect';
import { mapLabelsByKind } from 'Src/newRedux/database/labels/selectors';
import { SHARE_NAMES } from 'AppConstants';
import { getFilterSettings } from 'Src/helpers/user_config';
import { sheetConfig } from 'Components/lenses/card_lenses/Sheet/sheetConfig';
import LoadingIndicator from 'Components/shared/LoadingIndicator';
import { getActiveBoardFilters } from 'Src/newRedux/database/topics/selectors';
import cardLenses from 'Lib/config/lenses/cards';
import { boardTypeTags } from 'Components/shared/CardAndBoardTypes';
import reduxStore from 'Src/store/store';
import { setUserLocation } from 'Src/newRedux/utilities/actions';
import { emojisplosion, emojisplosions } from 'emojisplosion';

export const compactFilters = filters => {
  const compact = { ...filters };
  Object.keys(compact).forEach(key => {
    if (
      compact[key] === undefined ||
      compact[key] === null ||
      compact[key] === false ||
      compact[key] === 'ALL' ||
      (Array.isArray(compact[key]) &&
        (!compact[key].length ||
          (compact[key].length === 1 && compact[key] == 'ALL'))) ||
      (typeof compact[key] === 'object' &&
        !Array.isArray(compact[key]) &&
        !Object.keys(compact[key]).length) ||
      [
        'id',
        'created_at',
        'updated_at',
        'filter_settable_id',
        'filter_settable_type'
      ].includes(key)
    ) {
      delete compact[key];
    }
  });
  return compact;
};

export const getBoardType = topic => {
  const tags = topic.attributes.tag_list || [];
  return tags.find(tag => boardTypeTags.includes(tag)) || null;
};

export const getToolDefaultFilters = viewKey => {
  const lensConfig = cardLenses[viewKey];

  const defaultFilters = { ...lensConfig?.defaultFilters };

  if (!defaultFilters.card_type && lensConfig?.cardType) {
    defaultFilters.card_type = [lensConfig.cardType];
  }

  return defaultFilters;
};

export const isFilterEnabled = (key, val, states) => {
  const stateKey = getFilterStateKey(key, val);
  return !states[stateKey]?.disabled;
};

export const tipsVarsFromFilterSettings = filter => {
  if (!filter?.id) return;

  const vars = {
    filter: {
      root: !filter?.include_nested_cards,
      subtopics: filter?.include_subtopic_cards,
      archived: filter?.include_archived_cards,
      exclude_completed: !filter?.include_completed_cards,
      exclude_uncompleted: !filter?.include_uncompleted_cards
    }
  };

  const boardFilters = getActiveBoardFilters();
  if (boardFilters.length && !boardFilters.find(f => f.excludes)) {
    vars.filter.topics_params = {
      ids: boardFilters.map(f => f.id)
    };
  }

  if (filter && filter.card == 'LIKED' && isEnabled('card', 'LIKED')) {
    vars.filter.type = 'liked';
  } else if (
    filter &&
    filter.card == 'STARRED' &&
    isEnabled('card', 'STARRED')
  ) {
    vars.filter.type = 'starred';
  } else if (
    filter &&
    filter.card == 'CREATED' &&
    isEnabled('card', 'CREATED')
  ) {
    vars.filter.type = 'mine';
  }

  assignFilter(vars.filter, filter, 'assigned', 'assigned_to');
  assignFilter(vars.filter, filter, 'creator', 'created_by');
  assignFilter(vars.filter, filter, 'label', 'labels');
  assignFilter(vars.filter, filter, 'priority');

  // remove empty and false filters
  for (var key in vars.filter) {
    if (!vars.filter[key]) {
      delete vars.filter[key];
    }
  }
  if (!Object.keys(vars.filter).length) {
    delete vars.filter;
  }
  for (key in vars) {
    if (!vars[key]) {
      delete vars[key];
    }
  }

  return vars;

  function isEnabled(key, val) {
    return isFilterEnabled(key, val, filter.filter_states);
  }

  function assignFilter(dest, filter, srcKey, destKey) {
    if (destKey === undefined) {
      destKey = srcKey;
    }
    if (filter && Array.isArray(filter[srcKey])) {
      const ar = filter[srcKey].filter(val =>
        isFilterEnabled(srcKey, val, filter.filter_states)
      );
      if (ar.length) {
        dest[destKey] = ar;
      }
    } else if (
      filter &&
      isFilterEnabled(srcKey, filter[srcKey], filter.filter_states)
    ) {
      dest[destKey] = filter[srcKey];
    }
  }
};

export const deleteNode = ({ field, vars, id, store }) => {
  const connection = store.getRoot().getLinkedRecord(field, vars);
  if (!connection) return;
  ConnectionHandler.deleteNode(connection, id);
};

export const handleReorderRecords = ({
  field,
  recordsField,
  recordsVars,
  itemOrder,
  store
}) => {
  const fieldRecord = store.get(field);
  const records = fieldRecord.getLinkedRecords(recordsField, recordsVars);
  const newList = itemOrder.map(item =>
    records?.find(x => x?.getDataID() == item.id)
  );
  fieldRecord.setLinkedRecords(newList, recordsField, recordsVars);
};

export const handleCreatedRecord = ({
  rootField,
  field,
  recordsField,
  recordsVars,
  prepend,
  store
}) => {
  const rootFieldRecord = store.getRootField(rootField);
  if (!rootFieldRecord) return;
  const fieldRecord = rootFieldRecord.getLinkedRecord(field);
  if (!fieldRecord) return;
  const root = store.getRoot();
  const records = root.getLinkedRecords(recordsField, recordsVars) || [];
  if (!records.find(record => record.getDataID() == fieldRecord?.getDataID())) {
    prepend ? records.unshift(fieldRecord) : records.push(fieldRecord);
    root.setLinkedRecords(records, recordsField, recordsVars);
  }
};

export const insertRecord = (
  newRecord,
  recordsField,
  vars,
  parent,
  isBefore
) => {
  const list = parent.getLinkedRecords(recordsField, vars) || [];
  isBefore ? list.unshift(newRecord) : list.push(newRecord);
  parent.setLinkedRecords(list, recordsField, vars);
};

export const replaceMatchedRecord = (
  id,
  recordField,
  vars,
  parent,
  newRecord
) => {
  const record = parent.getLinkedRecord(recordField, vars);
  if (record && record.getDataID() == id) {
    if (typeof newRecord == 'function') {
      newRecord = newRecord(record);
    }
    if (!newRecord) {
      parent.setValue(null, recordField, vars);
    } else {
      parent.setLinkedRecord(newRecord, recordField, vars);
    }
  }
};

export const deleteFromRecords = (id, recordsField, vars, parent) => {
  let records = parent.getLinkedRecords(recordsField, vars);
  if (!records) return;
  records = records.filter(record => record.getDataID() != id);
  parent.setLinkedRecords(records, recordsField, vars);
};

export const deleteRecord = ({ id, recordsField, store }) => {
  const root = store.getRoot();
  let records = root.getLinkedRecords(recordsField);
  records = records.filter(record => record.getDataID() != id);
  root.setLinkedRecords(records, recordsField);
  store.delete(id);
};

export const handleDeletedRecord = ({
  rootField,
  field,
  id,
  recordsField,
  recordsVars,
  store
}) => {
  const rootFieldRecord = store.getRootField(rootField);
  if (rootFieldRecord && !rootFieldRecord.getLinkedRecord(field)) {
    const root = store.getRoot();
    const records = (
      root.getLinkedRecords(recordsField, recordsVars) || []
    ).filter(record => record.getDataID() != id);
    root.setLinkedRecords(records, recordsField, recordsVars);
  }
};

export const handleCreatedEdge = ({
  rootField,
  field,
  connectionId,
  connectionVars,
  store,
  edgeType,
  prepend
}) => {
  const rootFieldRecord = store.getRootField(rootField);
  if (!rootFieldRecord) return;
  const fieldRecord = rootFieldRecord.getLinkedRecord(field);
  if (!fieldRecord) return;
  const connection = connectionVars
    ? store.getRoot().getLinkedRecord(connectionId, connectionVars)
    : store.get(connectionId);
  if (!connection) return;
  const edges = connection.getLinkedRecords('edges');
  const exists = edges.find(edge => {
    const node = edge.getLinkedRecord('node');
    return node && node.getDataID() == fieldRecord.getDataID();
  });
  if (exists) return;
  const edge = ConnectionHandler.createEdge(
    store,
    connection,
    fieldRecord,
    edgeType
  );
  prepend
    ? ConnectionHandler.insertEdgeBefore(connection, edge)
    : ConnectionHandler.insertEdgeAfter(connection, edge);
};

export const createEdge = ({
  record,
  connectionField,
  connectionVars,
  store,
  edgeType,
  prepend
}) => {
  const connection = store
    .getRoot()
    .getLinkedRecord(connectionField, connectionVars);
  if (!connection) return;
  const edges = connection.getLinkedRecords('edges');
  const exists = edges.find(edge => {
    const node = edge.getLinkedRecord('node');
    return node && node.getDataID() == record.getDataID();
  });
  if (exists) return;
  const edge = ConnectionHandler.createEdge(
    store,
    connection,
    record,
    edgeType
  );
  prepend
    ? ConnectionHandler.insertEdgeBefore(connection, edge)
    : ConnectionHandler.insertEdgeAfter(connection, edge);
};

export const deleteEdge = ({ id, connectionField, connectionVars, store }) => {
  const connection = store
    .getRoot()
    .getLinkedRecord(connectionField, connectionVars);
  if (!connection) return;
  let edges = connection.getLinkedRecords('edges');
  edges = edges.filter(edge => {
    const node = edge.getLinkedRecord('node');
    return node && node.getDataID() != id;
  });
  connection.setLinkedRecords(edges, 'edges');
};

export const loadingIndicator = () => <LoadingIndicator />;

export const detectMount = id => {
  useEffect(() => {
    console.log(id, 'mounted');
    return () => console.log(id, 'unmounted');
  }, []);
  return null;
};

export const getNodes = relayConnection => {
  return relayConnection?.edges
    ? (relayConnection?.edges || []).map(({ node }) => node)
    : relayConnection || [];
};

export const rootFragments = props => {
  if (props.__id && props.__fragments && props.__fragmentOwner) {
    return pick(props, ['__id', '__fragments', '__fragmentOwner']);
  }
  return null;
};

export const getColumnFieldIds = (columns = [], gid = true) => {
  return columns
    .map(column => {
      const parsed = parseColumn(column);
      if (parsed.column == 'custom_field') {
        return gid ? parsed.data.id : toId(parsed.data.id);
      }
    })
    .filter(x => x)
    .sort(); // fix cache invalidated with changing order
};

export const validCustomFieldValue = (value, type) => {
  switch (type) {
    case 'number':
      return isNaN(value) ? 0 : value;
    case 'checkbox':
      return value === true || value === false ? value : false;
    case 'date':
      return moment(value).isValid() ? value : moment().format();
    case 'person':
      return Array.isArray(value) ? value : [];
    case 'color':
    case 'text':
      return typeof value == 'string' ? value : String(value);
    default:
      return value;
  }
};

export const scrollToEl = (scrollEl, childSelector) => {
  if (!scrollEl) return;
  setTimeout(() => {
    const childEl = scrollEl.querySelector(childSelector);
    if (childEl) {
      const parentRect = scrollEl.getBoundingClientRect();
      const rect = childEl.getBoundingClientRect();
      scrollEl.scrollTo(0, scrollEl.scrollTop + rect.y - parentRect.y);
    }
  });
};

export const getNextDueDate = fromDate => {
  fromDate = moment(fromDate);
  const date = fromDate.day() <= 5 ? fromDate.day(5) : fromDate.day(7 + 5);
  return date.endOf('day');
};

export const toGid = (type, id) =>
  id === null || typeof id === 'undefined' || String(id).includes(':')
    ? id
    : `${type}:${id}`;

export const toId = (gid, type = null) =>
  gid && String(gid).includes(':')
    ? String(gid).split(':')[type == 'items' ? 2 : 1]
    : gid;

export const cleanTenantName = name => parameterize(name);

export const denormalize = (data, included) => {
  const relationships = Object.keys(data.relationships).reduce((obj, key) => {
    const paramsList = castArray(get(data, ['relationships', key, 'data'], []));
    const entities = paramsList
      .map(params =>
        included.find(inc => {
          return (
            inc.id == params.id &&
            singularize(inc.type) === singularize(params.type)
          );
        })
      )
      .filter(x => x);
    if (entities.length) {
      obj[key] = {
        data: Array.isArray(data.relationships[key].data)
          ? entities
          : entities[0]
      };
    }
    return obj;
  }, {});

  return {
    ...data,
    relationships
  };
};

export const getAvatarUrl = user => {
  let oldAvatarUrl = '';
  if (get(user, 'avatar_url')) {
    oldAvatarUrl = user.avatar_url;
  } else if (get(user, 'attributes.avatar_url')) {
    oldAvatarUrl = user.attributes.avatar_url;
  }

  const avatarUrl = get(
    user,
    'relationships.user_profile.data.attributes.avatar_url',
    oldAvatarUrl
  );

  return avatarUrl;
};

export const makeColor = num => {
  const hue = (num * 45) % 360;
  return `hsl(${hue}, 83%, 63%)`;
};

export const findScrollParent = (node, vertical = true) => {
  if (!node) return;
  if (node.clientWidth || node.clientHeight) {
    const style = getComputedStyle(node);
    const isScroll = overflow =>
      ['auto', 'scroll', 'overlay'].includes(overflow);
    if (vertical) {
      if (node.scrollHeight > node.clientHeight && isScroll(style.overflowY)) {
        return node;
      }
    } else {
      if (node.scrollWidth > node.clientWidth && isScroll(style.overflowX)) {
        return node;
      }
    }
  }
  return findScrollParent(node.parentElement, vertical);
};

export const isNumberField = type => ['number', 'money'].includes(type);

export const getFieldSum = (customField, cards, tips) => {
  if (!isNumberField(customField.fieldType)) return;

  let sum = 0;

  each(cards, card => {
    const tip = tips.find && tips.find(tip => tip.id == toGid('Tip', card.id));
    if (!tip) return;
    const customFieldValue = tip.customFieldValues.find(
      fv => fv.customField.id == customField.id
    );
    if (!customFieldValue) return;
    sum += isNaN(customFieldValue.value) ? 0 : Number(customFieldValue.value);
  });

  return sum;
};

export const getValue = (valueFn, ...args) =>
  typeof valueFn === 'function' ? valueFn(...args) : valueFn;

export const getNewFieldId = (activeFields, newFieldType) => {
  let max = 1;
  activeFields.forEach(f => {
    if (
      f.name.startsWith(newFieldType.name) &&
      f.field_type == newFieldType.field_type
    ) {
      const m = f.name.match(/(\d+)\s*$/);
      if (m) {
        max = Math.max(max, Number(m[1]) + 1);
      }
    }
  });
  return max;
};

export const packColumn = (column, data) => {
  return `${column}:${JSON.stringify(data)}`;
};

export const parseColumn = column => {
  const m = column.match(/([^:]+)(?::(.+))?/);
  const ret = {
    column: m[1],
    unparsedColumn: column
  };
  if (m[2]) {
    ret.data = JSON.parse(m[2]);
  }
  return ret;
};

export const getParsedColumn = (column, { customFields = [], tips }) => {
  const parsed = parseColumn(column);
  parsed.config = sheetConfig[parsed.column] || sheetConfig.default;
  if (parsed.column == 'custom_field') {
    parsed.customField =
      customFields &&
      customFields.find(f => parsed.data && f.id == parsed.data.id);
    parsed.tips = tips;
  }
  parsed.getValue = (name, props) =>
    getValue(parsed.config[name], { ...parsed, ...props });
  return parsed;
};

export const domainChannelName = channel => {
  return `${window.currentDomainName}_${channel}`;
};

export const isOnline = (userId, presence) => {
  return inChannel(userId, 'domain_channel', presence);
};

export const inChannel = (userId, channel, presence) => {
  return !!get(presence, [
    'channels',
    domainChannelName(channel),
    'users',
    userId,
    'presence'
  ]);
};

export const getCardUserNames = (card, people, groups) => {
  const cardUsers = getCardUsers(card, people, groups);
  const cardUserNames = cardUsers.users
    .map(user => get(user, 'attributes.name'))
    .concat(cardUsers.groups.map(group => get(group, 'attributes.title')));
  return cardUserNames;
};

export const getCardUsers = (card, people, groups) => {
  const cardUsers = {
    creator: null,
    users: [],
    groups: [],
    usersByGroup: {}
  };

  const creator = get(people, get(card, 'attributes.creator.id'));
  cardUsers.creator = creator;

  if (get(card, 'attributes.private')) {
    cardUsers.users.push({
      id: 'private',
      attributes: { username: SHARE_NAMES.private }
    });
  }
  if (get(card, 'attributes.share_public')) {
    cardUsers.users.push({
      id: 'public',
      attributes: { username: SHARE_NAMES.public }
    });
  }
  if (get(card, 'attributes.share_following')) {
    cardUsers.users.push({
      id: 'following',
      attributes: { username: SHARE_NAMES.following }
    });
  }

  const shareSettings = get(card, 'attributes.share_settings', []);

  shareSettings.forEach(shareSetting => {
    const sharingObjectType = get(shareSetting, 'sharing_object_type');
    const sharingObjectId = get(shareSetting, 'sharing_object_id');
    if (sharingObjectType === 'User') {
      const user = get(people, sharingObjectId);
      user && cardUsers.users.push(user);
    }
    if (sharingObjectType === 'Group') {
      const group = get(groups, sharingObjectId);
      group && cardUsers.groups.push(group);
    }
  });

  cardUsers.groups.forEach(group => {
    cardUsers.usersByGroup[group.id] = get(
      group,
      'relationships.user_followers.data',
      []
    ).map(userId => get(people, userId));
  });

  return cardUsers;
};

export const getCardUsersNew = (card, people, groups) => {
  const cardUsers = {
    creator: card.user,
    users: [],
    groups: []
  };

  if (card.private) {
    cardUsers.users.push({
      id: 'private',
      username: SHARE_NAMES.private
    });
  }
  if (card.sharePublic) {
    cardUsers.users.push({
      id: 'public',
      username: SHARE_NAMES.public
    });
  }
  if (card.shareFollowing) {
    cardUsers.users.push({
      id: 'following',
      username: SHARE_NAMES.following
    });
  }

  const shareSettings = card.shareSettings || [];

  shareSettings.forEach(({ sharingObjectType, sharingObjectId }) => {
    if (sharingObjectType === 'User') {
      const user = people?.find(u => toId(u.id) == sharingObjectId);
      user && cardUsers.users.push(user);
    }
    if (sharingObjectType === 'Group') {
      const group = groups?.find(g => toId(g.id) == sharingObjectId);
      group && cardUsers.groups.push(group);
    }
  });

  if (!cardUsers.users?.find(user => user.id == cardUsers.creator.id)) {
    cardUsers.users.unshift(cardUsers.creator);
  }

  return cardUsers;
};

export const getTopicUsers = (topic, people, groups) => {
  const topicUsers = {
    creator: null,
    users: Object.keys(people).map(user => people[user]),
    groups: [],
    usersByGroup: {}
  };

  const creator = get(people, get(topic, 'attributes.user_id'));
  topicUsers.creator = creator;

  if (
    get(topic, 'relationships.share_settings.data[0].sharing_object_name') ==
    'All Team Workspace members'
  ) {
    topicUsers.users.push({
      id: 'public',
      attributes: { username: SHARE_NAMES.public }
    });
  }

  // const shareSettings = get(topic, 'relationships.share_settings.data', []);

  // shareSettings.forEach(shareSetting => {
  //   const sharingObjectType = get(shareSetting, 'sharing_object_type');
  //   const sharingObjectId = get(shareSetting, 'sharing_object_id');
  //   if (sharingObjectType === 'users') {
  //     sharingObjectId == 'everyone' && Object.keys(people).map(user =>topicUsers.users.push(user) )
  //   }
  //   if (sharingObjectType === 'groups') {
  //     const group = get(groups, sharingObjectId);
  //     group && topicUsers.groups.push(group);
  //   }
  // });

  topicUsers.groups.forEach(group => {
    topicUsers.usersByGroup[group.id] = get(
      group,
      'relationships.user_followers.data',
      []
    ).map(userId => get(people, userId));
  });

  return topicUsers;
};

export const getFilterStateKey = (filterName, value) => {
  // convert string id to number
  const fixedValue = isNaN(Number(value)) ? value : Number(value);
  return `${filterName}=${JSON.stringify(fixedValue)}`;
};

export const isPrivateView = (topic, user) => {
  const data = get(topic, 'relationships.share_settings.data');
  return (
    data.length === 1 &&
    data[0].sharing_object_type === 'users' &&
    (data[0].sharing_object_id == user.id ||
      data[0].sharing_object_id == 'private')
  );
};

export const isSharedWithTeam = (topic, groupId) => {
  const data = get(topic, 'relationships.share_settings.data', []);
  const group = data.find(
    item =>
      item.sharing_object_id === Number(groupId) &&
      item.sharing_object_type === 'groups'
  );
  return group ? true : false;
};

export const getTotalLogTime = (logTimes = [], startDate, endDate) => {
  const today = moment().startOf('day');
  const totalLogTime = reduce(
    logTimes,
    (total, lt) => {
      // calc only past log times in the time frame
      if (
        lt.startTime.isBetween(startDate, endDate, null, '[]') &&
        lt.endTime.isBefore(today)
      ) {
        return total + lt.endTime.diff(lt.startTime, 'minutes') / 60;
      }
      return total;
    },
    0
  );
  return totalLogTime;
};

//function to detect click or dblclick and use corresponding method
export const getClickHandler = (onClick, onDblClick, delay) => {
  let timeoutID = null;
  delay = delay || 250;
  return event => {
    if (!timeoutID) {
      timeoutID = setTimeout(function() {
        onClick(event);
        timeoutID = null;
      }, delay);
    } else {
      timeoutID = clearTimeout(timeoutID);
      onDblClick(event);
    }
  };
};

//runs an array of items through multiple filters and returns the results:
export const applyFilters = (arrayOrObject, filters, passAllFilters) => {
  const array = Array.isArray(arrayOrObject)
    ? arrayOrObject
    : Object.values(arrayOrObject);
  return filters?.length > 0
    ? passAllFilters
      ? array.filter(item => filters.every(filter => filter(item)))
      : array.filter(item => filters.some(filter => filter(item)))
    : array;
};

//used by page components to build out the card requirements they pass down to their views
export const createBuildCardRequirementsSelector = () =>
  createSelector(
    (state, cardRequirements) => cardRequirements,
    state => getFilterSettings(state)?.include_archived_cards,
    state => getFilterSettings(state)?.include_subtopic_cards,
    state => getActiveBoardFilters(state),
    (
      cardRequirements,
      includeArchivedCards,
      includeSubtopicCards,
      boardFilters
    ) => {
      if (includeArchivedCards) {
        cardRequirements = {
          ...cardRequirements,
          includeArchived: true
        };
      }
      if (includeSubtopicCards) {
        cardRequirements = {
          ...cardRequirements,
          includeSubtopics: true
        };
      }
      if (boardFilters?.length && !boardFilters.find(f => f.excludes)) {
        cardRequirements = {
          ...cardRequirements,
          topicsParams: {
            ids: boardFilters.map(f => f.id)
          }
        };
      }
      return cardRequirements;
    }
  );

export const buildSubTopicRequirements = topicId => {
  return { subtopicsForTopic: { topicId } };
};

//modifies relationship data to suit the server when POST or PATCHing records:
export const buildToOneRelationshipData = (type, id, extras) => {
  return id ? { data: { id, type, ...extras } } : '';
};

//modifies relationship data to suit the server when POST or PATCHing records:
export const buildToManyRelationshipData = (type, relationship, extras) => {
  const relationships = relationship.map(relId => ({
    id: relId,
    type: type,
    ...extras
  }));
  return relationships.length > 0 ? { data: relationships } : '';
};

//creates a cancellable promise (for cancelling on unmounts. see: https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html)
export const cancellablePromise = promise => {
  let hasCanceled_ = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      val => (hasCanceled_ ? reject({ isCanceled: true }) : resolve(val)),
      error => (hasCanceled_ ? reject({ isCanceled: true }) : reject(error))
    );
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled_ = true;
    }
  };
};

//gets the current domain from the url:
export const getThisDomain = domains =>
  domains.find(
    dom =>
      dom &&
      dom.attributes.tenant_name == window.location.host.split('.')[0] &&
      dom.relationships
  ) || domains[0];

//gets the URL for a domain, based on environment:
export const getDomainUrl = domain =>
  window.appEnv == 'development'
    ? `//${domain.attributes.tenant_name}.${window.APP_DOMAIN}:5000`
    : window.appEnv == 'staging'
    ? `https://${domain.attributes.tenant_name}.stage.friyayapp.io`
    : `https://${domain.attributes.tenant_name}.${window.APP_DOMAIN}`;

//returns the id for the 'archived' label:
export const getArchivedLabelId = state => {
  const systemLabels = mapLabelsByKind(state)['system'] || [];
  const archiveLabel = systemLabels.find(
    label => label.attributes.name.toLowerCase() == 'archived'
  );
  return get(archiveLabel, 'id', 1);
};

//gets an id from a slug:
export const idFromSlug = slug => (slug ? slug.split('-')[0] : null);

//pass it a normalized record you wish to update but cant use lodash/merge:
export const overwriteRecordWithAttributesAndRelationships = ({
  existingRecord,
  attributes,
  relationships
}) => ({
  ...existingRecord,
  attributes: {
    ...existingRecord.attributes,
    ...attributes
  },
  relationships: {
    ...existingRecord.relationships,
    ...relationships
  }
});

//parses attachments.json into data used for the FileUploadBox:
export const parseAttachmentsJson = attachmentsJson => {
  const images = attachmentsJson.images || [];
  const docs = attachmentsJson.documents || [];

  return [
    ...images.map(file => ({
      response: {
        data: {
          id: file.id,
          type: 'images',
          attributes: file
        }
      },
      localData: {
        preview: null
      }
    })),
    ...docs.map(file => ({
      response: {
        data: {
          id: file.id,
          type: 'images',
          attributes: file
        }
      },
      localData: {
        preview: null
      }
    }))
  ];
};

//converts an array of key/values to an object with the keys as keys:
export const reduceArrayToObjectWithKeyAndValuePair = (array, key, value) => {
  const setUpReducer = (key, value) => (obj, next) => {
    const keyAtt = next[key];
    const keyVal = next[value];
    obj[keyAtt] = keyVal;
    return obj;
  };

  const reduceWithKey = setUpReducer(key, value);
  return array.reduce(reduceWithKey, {});
};

export const reduceArrayToMappedObjectForAttribute = (
  array,
  attribute,
  defaultAttributeValue = '0'
) =>
  array.reduce((a, b) => {
    const key = get(b, attribute, defaultAttributeValue);
    set(a, key, [...get(a, key, []), b]);
    return a;
  }, {});

//for moving an array of items back to an object keyed by Id:
export const reNormalizeArrayOfRecords = array =>
  array.reduce((a, b) => {
    a[b.id] = b;
    return a;
  }, {});

//get the before and after cardIds to determine card order, from the itemOrder returned at drag and drop:
export const returnBeforeAndAfterCardIdsFromItemOrder = (
  movedCardId,
  itemOrder
) => {
  const mappedItemOrder = itemOrder.map(item => item.id);
  const indexOfMovedCardInItemOrder = mappedItemOrder.indexOf(movedCardId);
  const beforeCardId = mappedItemOrder[indexOfMovedCardInItemOrder + 1];
  const afterCardId = beforeCardId
    ? null
    : mappedItemOrder[indexOfMovedCardInItemOrder - 1];
  return { afterCardId, beforeCardId };
};

//for toggles that may or may not receive a bool as an arg.  Pass the bool and the current val, get back the bool or the opposite of the current val
export const returnToggleValOrBool = (bool, currentVal) =>
  bool == undefined ? !currentVal : bool;

//make a copy of a record and update particular attributes
export const returnRecordWithNewAttributes = ({
  record = {},
  attributes = [],
  values = []
}) => {
  const replacementRecord = { ...record };
  attributes.forEach((attr, index) => {
    set(replacementRecord, attr, values[index]);
  });
  return replacementRecord;
};

//make a copy of a record and replace a value in an array attribute/relationship.  Good for changing one Id in a list
export const returnRecordWithRemovedOrReplacedValueInArrayForAttribute = ({
  record = {},
  attributePath = '',
  oldValue,
  newValue,
  isArrayAttrubuteValue = true
}) => {
  const replacementRecord = { ...record };
  const attributeValue = get(replacementRecord, attributePath);
  const currentArray = isArrayAttrubuteValue
    ? attributeValue || []
    : attributeValue
    ? [attributeValue]
    : [];
  const newArray = currentArray.filter(item => item != oldValue);
  newValue && newArray.push(newValue);
  set(replacementRecord, attributePath, newArray);
  return replacementRecord;
};

//sorts an array of records alphabetically on a particular attribute
export const sortAlpha = (array, attribute) =>
  array.sort((a, b) => {
    const stringA = (get(a, `attributes.${attribute}`, '') || '').toLowerCase();
    const stringB = (get(b, `attributes.${attribute}`, '') || '').toLowerCase();
    return stringA.localeCompare(stringB);
  });

//sorts an array of records alphabetically on a particular attribute
export const sortAnythingAlpha = (array, attribute) =>
  array.sort((a, b) => {
    const stringA = (get(a, attribute, '') || '').toLowerCase();
    const stringB = (get(b, attribute, '') || '').toLowerCase();
    return stringA.localeCompare(stringB);
  });

//create a delay
export const timeout = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

//pass an item an an array - if the item is in the array, get back an array without it, if not, get back an array with it
export const toggleItemInclusionInArray = (item, array) => {
  return array.includes(item)
    ? array.filter(arrayItem => arrayItem != item)
    : [...array, item];
};

export const getRedirectUriForSlack = () => {
  const { currentProtocol, APP_HOST, APP_PORT, appEnv } = window;
  const { search } = window.location;
  const includePort =
    appEnv === 'development' && APP_PORT ? ':' + APP_PORT : '';
  // const staging = window.appEnv == 'staging' ? 'staging.' : '';
  const newSearch = qs.stringify(pick(qs.parse(search), 'tenant'), true);
  return `${currentProtocol}://${APP_HOST}${includePort}/slack/auth${newSearch}`;
};

export const mapRelationship = (
  cardDatum,
  included,
  relation,
  includedType
) => {
  const relationships = [];
  for (let item of cardDatum.relationships[relation].data) {
    const includedItem = included.find(
      includedRelation =>
        includedRelation.id === item.id &&
        includedRelation.type === (includedType || relation)
    );
    if (includedItem) {
      relationships.push({
        ...includedItem.attributes,
        id: item.id,
        type: relation
      });
    }
  }
  return relationships;
};

export const scrollToShow = (elem, fontStart, fontEnd) => {
  elem.scrollIntoView({ block: 'end', behavior: 'smooth' });
  const id = setInterval(() => {
    let fontSize = parseInt(elem.style.fontSize);
    fontSize = isNaN(fontSize) ? fontStart : fontSize;
    if (fontSize < fontEnd) {
      elem.style.fontSize = fontSize + 1 + 'px';
    } else {
      clearInterval(id);
      const id2 = setInterval(() => {
        const fontSize = parseInt(elem.style.fontSize);
        if (fontSize > fontStart) {
          elem.style.fontSize = fontSize - 1 + 'px';
        } else {
          clearInterval(id2);
        }
      }, 100);
    }
  }, 100);
};

export function getSidePaneArrowTop(ref) {
  if (ref.current) {
    const top = ref.current.getBoundingClientRect().top + 20;
    return `${top}px`;
  }
  return '';
}

export function getSidePaneArrowLeft(isOpen) {
  return isOpen ? 270 : 2;
}

export function yayDesign(myTopicView, topic) {
  let active_design;
  if (topic) {
    const currentDesign = topic.attributes.topic_design_id_for_current_user;
    const topic_designs = get(topic, 'attributes.topic_designs', []);
    active_design = topic_designs.find(
      d => Number(d.id) === Number(currentDesign)
    );
    if (!active_design && topic.attributes.default_design_id) {
      active_design = topic_designs.find(
        d => Number(d.id) === Number(topic.attributes.default_design_id)
      );
    }
  }
  if (!active_design && myTopicView === 'ACTION_PLAN') {
    return {
      card_font_color: '#fff',
      card_background_color: '#2499C5',
      card_background_color_display: true
    };
  }
  if (!active_design && myTopicView === 'MY_TASKS') {
    return {
      card_font_color: '#fff',
      card_background_color: '#28B798',
      card_background_color_display: true
    };
  }
  return active_design || {};
}

export function workspaceDesign(myTopicView, domain) {
  let active_design;
  if (domain) {
    const currentDesign = domain.attributes.domain_design_id_for_current_user;
    const domain_designs = get(domain, 'attributes.domain_designs', []);
    active_design = domain_designs.find(
      d => Number(d.id) === Number(currentDesign)
    );
    if (!active_design && domain.attributes.default_design_id) {
      active_design = domain_designs.find(
        d => Number(d.id) === Number(domain.attributes.default_design_id)
      );
    }
  }
  if (myTopicView === 'ACTION_PLAN') {
    if (!active_design) {
      active_design = {
        card_font_color: '#fff',
        card_background_color: '#2499C5',
        card_background_color_display: true
      };
    } else if (active_design) {
      active_design = {
        ...active_design,
        card_font_color: active_design.card_font_color || '#fff',
        card_background_color: active_design.card_background_color || '#2499C5',
        card_background_color_display:
          active_design.card_background_color_display || true
      };
    }
  }

  return active_design || {};
}

export function getStartEndDates(date, units, offset = 1) {
  const startDate = moment(date)
    .clone()
    .startOf(units);
  const endDate = startDate
    .clone()
    .add(offset, units)
    .subtract(1, 'second')
    .endOf(units);
  return { startDate, endDate };
}

export function handleScrollLeftOrRight(e, DOMElement) {
  if (!DOMElement || !e) return;
  if (e.keyCode === 37) {
    DOMElement.scrollLeft -= 40;
  }
  if (e.keyCode === 39) {
    DOMElement.scrollLeft += 40;
  }
}

export const camel2title = camelCase => {
  const re = /(\b[a-z](?!\s))/g;
  if (camelCase) {
    return camelCase.replace(re, function(x) {
      return x.toUpperCase();
    });
  } else {
    return ' ';
  }
};

export const setDefaultView = type => {
  let defaultViewId = null;
  switch (type) {
    case 'project':
      return (defaultViewId = 'PROJECT_OVERVIEW');
    case 'goal':
      return (defaultViewId = 'GOAL_OVERVIEW');
    case 'notes':
      return (defaultViewId = 'GRID');
    case 'file':
      return (defaultViewId = 'FILES');
    case 'knowledge':
      return (defaultViewId = 'KNOWLEDGE_BASE');
    case 'task':
      return (defaultViewId = 'TODO');
    case 'data':
      return (defaultViewId = 'SHEET');
    default:
      return (defaultViewId = null);
  }
};

export const convertTypeIntoNormalString = (type, baseType) => {
  if (type == null) {
    return 'Board';
  }
  if (type === 'card' || type === 'CARD') {
    return 'Card';
  }
  const convertedType = type.replace('_', ' ').toLowerCase();
  return (
    convertedType.charAt(0).toUpperCase() +
    convertedType.slice(1) +
    ' ' +
    baseType
  );
};

export const getUserCurrentLocation = () => {
  let coords = JSON.parse(window.localStorage.getItem('userLocation'));

  if (!coords) {
    if (!navigator.geolocation) {
      return;
    } else {
      navigator.geolocation.getCurrentPosition(
        position => {
          //Handle onSuccess here
          coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          reduxStore.dispatch(setUserLocation(coords));
          window.localStorage.setItem('userLocation', JSON.stringify(coords));
        },
        () => {
          //handle error here
          alert('Your location is needed to improve location suggestions.');
        }
      );
    }
  }
};

export const getCoordiantesInfo = async ({ latitude, longitude }) => {
  let info;
  await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyC579-8__jqZnxyCTV8MSRbgB2W7a9MdAs`
  )
    .then(res => res.json())
    .then(data => {
      info = {
        address: (data.results[1] ?? data.results[0]).formatted_address
      };
    })
    .catch(err => console.log(err));
  return info;
};

// Used to get window dimesions
export const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
};

export const getLinkItemTypes = async (tip_links = [], getType) => {
  if (tip_links?.length) {
    let results = [];
    for (const link of tip_links) {
      if (link.url.startsWith(window.location.origin)) {
        const isBoard = link.url.includes('/boards/');
        const isCard = link.url.includes('/cards/');
        const [, id, title] = link.url.match(/^.*\/(\d+)-(.*)$/) || [];
        let res = getType ? await getType({ id, isBoard, isCard }) : null;
        if (res) {
          res =
            (isBoard
              ? {
                  ...res.topics?.edges[0]?.node,
                  itemType: res.topics?.edges[0]?.node.tagList[0]
                }
              : {
                  ...res.tips?.edges[0]?.node,
                  itemType: res.tips?.edges[0]?.node.cardType
                }) || {};

          results.push(res);
        }
      }
    }

    return results;
  }

  return [];
};

export const handleShowEmojiSplashOnTaskComplete = () => {
  const { cancel } = emojisplosions({
    emojiCount: 100,
    emojis: [
      '💖',
      '💕',
      '💓',
      '💝',
      '😊',
      '😍',
      '🥰',
      '😘',
      '🥳',
      '🤩',
      '🤗',
      '💥',
      '💫',
      '🍔',
      '🍕',
      '🍿',
      '🚀',
      '✅',
      '💯'
    ],
    physics: {
      initialVelocities: {
        rotation: {
          max: 14,
          min: -14
        }
      },
      rotationDecelaration: 1.01,
      gravity: 0.4,
      opacityDelay: 100
    }
  });
  setTimeout(cancel, 7000);
};
