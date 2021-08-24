import get from 'lodash/get';
import difference from 'lodash/difference';
import moment from 'moment';
import { getFilterStateKey, isSharedWithTeam } from 'Lib/utilities';
import { itemFilters } from 'Lib/config/filters/items';

export const getFilterStates = (filterStates, filterName, value) =>
  get(filterStates, getFilterStateKey(filterName, value), {});

export const isIncluded = ({
  name,
  values,
  filters,
  filterStates,
  every,
  compareFn = (a, b) => a == b
}) => {
  if (!filters) return true;

  const activeFilters = filters.filter(
    x => !getFilterStates(filterStates, name, x).disabled
  );
  const excludeFilters = activeFilters.filter(
    x => getFilterStates(filterStates, name, x).excludes
  );
  const includeFilters = difference(activeFilters, excludeFilters);

  if (activeFilters.length === 0) {
    return true;
  }
  if (
    excludeFilters.length &&
    excludeFilters.some(a => values.some(b => compareFn(a, b)))
  ) {
    return false;
  }
  if (includeFilters.length === 0) {
    return true;
  }
  if (
    every
      ? includeFilters.every(a => values.some(b => compareFn(a, b)))
      : includeFilters.some(a => values.some(b => compareFn(a, b)))
  ) {
    return true;
  }
  return false;
};

export const filterBoardIds = (boardIds, filterStates) => topic => {
  return isIncluded({
    name: 'board_ids',
    values: [topic.id],
    filters: boardIds,
    filterStates
  });
};

export const filterBoardType = (boardTypeFilter, filterStates) => topic => {
  const values = topic.attributes.tag_list?.length
    ? topic.attributes.tag_list
        .map(tag => {
          return Object.values(itemFilters).find(item => item.tag == tag);
        })
        .filter(x => x)
        .map(item => item.key)
    : ['BOARDS'];
  return isIncluded({
    name: 'board_type',
    values,
    filters: boardTypeFilter,
    filterStates
  });
};

export const newArchiveFilter = (archiveLabelId, isArchive) => card => {
  if (isArchive) {
    return true;
  }
  return (
    !card.attributes.is_disabled &&
    !card.relationships.labels.data.includes(archiveLabelId)
  );
};

export const archivedFilter = archiveLabelId => card =>
  !card.attributes.is_disabled &&
  !card.relationships.labels.data.includes(archiveLabelId);

export const assignedFilter = (assignedIds = [], filterStates) => card =>
  isIncluded({
    name: 'assigned',
    values: card.relationships.tip_assignments.data,
    filters: assignedIds,
    filterStates
  });

export const dueDateFilter = (dateRange, filterStates) => card =>
  // card date is GMT, startDate and endDate are in local
  isIncluded({
    name: 'due',
    values: [
      moment(new Date(card.attributes.due_date).toDateString()).isBetween(
        dateRange.startDate,
        dateRange.endDate
      ) && dateRange
    ],
    filters: dateRange.startDate ? [dateRange] : [],
    filterStates
  });

export const completedDateFilter = (dateRange, filterStates) => card =>
  isIncluded({
    name: 'completed',
    values: [
      moment(
        new Date(card.attributes.completion_date).toDateString()
      ).isBetween(dateRange.startDate, dateRange.endDate) && dateRange
    ],
    filters: dateRange.startDate ? [dateRange] : [],
    filterStates
  });

export const createdDateFilter = (dateRange, filterStates) => card =>
  isIncluded({
    name: 'created',
    values: [
      moment(new Date(card.attributes.created_at).toDateString()).isBetween(
        dateRange.startDate,
        dateRange.endDate
      ) && dateRange
    ],
    filters: dateRange.startDate ? [dateRange] : [],
    filterStates
  });

export const creatorFilter = (creatorIds = [], filterStates) => card =>
  isIncluded({
    name: 'creator',
    values: [card.attributes.creator.id],
    filters: creatorIds,
    filterStates
  });

export const cardGroupFilter = groupTipFollows => card =>
  groupTipFollows.includes(card.id);
export const topicGroupFilter = (groupTopicFollows, groupId) => topic =>
  groupTopicFollows.includes(topic.id) || isSharedWithTeam(topic, groupId);
export const peopleGroupFilter = groupPeopleFollows => person =>
  groupPeopleFollows.includes(person.id);

export const cardTypesFilter = (filters = [], filterStates) => card =>
  isIncluded({
    name: 'card_type',
    values: [card.attributes.card_type || 'CARD'],
    filters,
    filterStates
  });

export const labelFilter = (labelIds = [], filterStates) => card =>
  isIncluded({
    name: 'label',
    values: card.relationships.labels.data,
    filters: labelIds,
    filterStates,
    every: true
  });

export const startDateFilter = (dateRange, filterStates) => card =>
  isIncluded({
    name: 'started',
    values: [
      moment(new Date(card.attributes.start_date).toDateString()).isBetween(
        dateRange.startDate,
        dateRange.endDate
      ) && dateRange
    ],
    filters: dateRange.startDate ? [dateRange] : [],
    filterStates
  });

export const priorityFilters = (levels, filterStates) => card =>
  isIncluded({
    name: 'priority',
    values: [card.attributes.priority_level],
    filters: levels,
    filterStates
  });

export const topicFilter = topicId => card => {
  return card.relationships.topics.data.includes(topicId);
};

export const nonNestedCardFilter = card => {
  return !(
    card.relationships.follows_tip && card.relationships.follows_tip.data
  );
};

export const nonCompletedCardFilter = card => {
  return !(card.attributes.completion_date && true);
};

export const nonUnCompletedCardFilter = card => {
  return card.attributes.completion_date && true;
};

export const nonSubtopicCardFilter = topicId => card => {
  return card.relationships.topics.data.includes(topicId);
};

export const searchCardsFilter = searchCardsResult => card => {
  return searchCardsResult !== 'ALL'
    ? searchCardsResult.includes(card.attributes.title)
    : true;
};

export const searchTopicsFilter = searchTopicsResult => topic => {
  return searchTopicsResult !== 'ALL'
    ? searchTopicsResult.includes(topic.attributes.title)
    : true;
};
