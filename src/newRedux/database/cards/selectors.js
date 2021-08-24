import { createSelector } from 'reselect';
import {
  get,
  assign,
  first,
  compact,
  concat,
  uniq,
  flatten,
  groupBy as _lodashGroupBy,
  keyBy,
  map,
  orderBy,
  sortBy,
  flow
} from 'lodash';
import moment from 'moment';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { cardFilters } from 'Lib/config/filters/cards';
import { getSpeed } from '../../../components/lenses/card_lenses/Sheet/sheetConfig/speed';
import { sheetConfig } from '../../../components/lenses/card_lenses/Sheet/sheetConfig/index';
import { getActiveBoardFilters } from 'Src/newRedux/database/topics/selectors';

const shortid = require('shortid');
import {
  cardTypesFilter,
  archivedFilter,
  assignedFilter,
  createdDateFilter,
  creatorFilter,
  completedDateFilter,
  dueDateFilter,
  cardGroupFilter,
  labelFilter,
  startDateFilter,
  priorityFilters,
  topicFilter,
  nonNestedCardFilter,
  nonSubtopicCardFilter,
  nonCompletedCardFilter,
  nonUnCompletedCardFilter,
  searchCardsFilter
} from 'Lib/config/filters/other';
import { applyFilters, getArchivedLabelId } from 'Lib/utilities';
import {
  getRelevantTopicOrderForTopic,
  getRelevantTopicOrderByTopic
} from 'Src/newRedux/database/topicOrders/selectors';
import {
  getTopics,
  getTopicFilters
} from 'Src/newRedux/database/topics/selectors';
import { getFilterSettings } from 'Src/helpers/user_config';

export const getCards = state => state._newReduxTree.database.cards;

const priorityColorMap = {
  Highest: {
    backgroundColor: '#60cf8b',
    color: 'white'
  },
  Medium: {
    backgroundColor: '#cf61c4',
    color: 'white'
  },
  High: {
    backgroundColor: '#5f8ccf',
    color: 'white'
  },
  Low: {
    backgroundColor: '#3b3155',
    color: 'white'
  },
  Lowest: {
    backgroundColor: '#f2ab13',
    color: 'white'
  }
};

//Seems cards can have no topics or subtopics.  Filter them out as they break things:
const hasTopicOrSubtopicFilter = () => card =>
  card.relationships.topics.data.length > 0 ||
  card.relationships.subtopics.data.length > 0;

export const getCardArray = createSelector(
  state => getCards(state),
  state => getActiveBoardFilters(state),
  (cards, boardFilters) => {
    cards = Object.values(cards).filter(
      card =>
        card?.attributes?.card_type !== 'SYSTEM' &&
        !get(card, 'attributes.is_chat') &&
        !get(card, 'attributes.is_video_chat')
    );
    if (boardFilters?.length) {
      cards = cards.filter(card => {
        const cardTopicIds = get(card, 'relationships.topics.data', []);
        const every = !boardFilters.find(f => !f.excludes);
        return cardTopicIds.some(id =>
          every
            ? boardFilters.every(
                f => (f.id == id && !f.excludes) || (f.id != id && f.excludes)
              )
            : boardFilters.some(
                f => (f.id == id && !f.excludes) || (f.id != id && f.excludes)
              )
        );
      });
    }
    return cards;
  }
);

export const getCardsByCreator = createSelector(
  state => getCardArray(state),
  cards =>
    cards.reduce((a, b) => {
      const cardCreatorId = get(b, 'attributes.creator.id', '0');
      a[cardCreatorId] = a[cardCreatorId] ? [...a[cardCreatorId], b] : [b];
      return a;
    }, {})
);

const addCardToTopicAndParentTopicsInMap = (
  card,
  parentTopicId,
  topics,
  map
) => {
  if (parentTopicId) {
    const topic = topics[parentTopicId];
    const path = (topic?.attributes?.ancestry || '').split('/');
    path.concat(parentTopicId).forEach(id => {
      map[id] = map[id]
        ? [...map[id].filter(item => item.id != card.id), card]
        : [card];
    });
  }
  return map;
};

export const getCardsFilter = createSelector(
  state => getTopicFilters(state),
  filters => {
    return filters;
  }
);

export const getTopicCards = createSelector(
  getCardArray,
  (state, topicId) => topicId,
  (cards, topicId) => {
    return cards.filter(card => {
      const cardTopicIds = get(card, 'relationships.topics.data', []);
      return cardTopicIds.includes(topicId);
    });
  }
);

export const getCardsByTopic = createSelector(
  state => getCardArray(state),
  state => getTopics(state),
  (cards, topics) => {
    return cards.reduce((a, b) => {
      const cardTopicIds = get(b, 'relationships.topics.data', '0');
      if (cardTopicIds) {
        cardTopicIds.forEach(topicId => {
          a = addCardToTopicAndParentTopicsInMap(b, topicId, topics, a);
        });
      }
      a['0'] = a['0'] ? [...a['0'], b] : [b]; //have reference to every card in the index key
      return a;
    }, {});
  }
);

export const getSortedCardsByTopic = createSelector(
  state => getCardsByTopic(state),
  state => getRelevantTopicOrderByTopic(state),
  (cardsByTopic, topicOrdersByTopic) =>
    Object.keys(cardsByTopic).reduce((a, b) => {
      const relevantOrder = topicOrdersByTopic[b];
      const cardOrder = relevantOrder
        ? get(relevantOrder, 'attributes.tip_order', [])
        : [];
      a[b] = sortByOrderAndCreatedDate(cardsByTopic[b], cardOrder) || [];
      return a;
    }, {})
);

export const getSortedFilteredCardsByTopic = createSelector(
  state => getSortedCardsByTopic(state),
  state => stateMappings(state).user,
  state => getFilterSettings(state),
  state => stateMappings(state).people[stateMappings(state).page.personId],
  state => stateMappings(state).page.groupId,
  state => stateMappings(state).groups,
  state => getArchivedLabelId(state),
  state => stateMappings(state).search,
  (
    sortedCardsByTopic,
    user,
    filters,
    person,
    groupId,
    groups,
    archiveLabelId,
    search
  ) => {
    const filterStates = get(filters, 'filter_states', {});
    let filtersToApply = compact([]);
    filtersToApply =
      filters &&
      compact([
        !filters.include_archived_cards && archivedFilter(archiveLabelId),
        assignedFilter(filters.assigned, filterStates),
        filters.card_type?.length > 0 &&
          cardTypesFilter(filters.card_type, filterStates),
        cardFilters[filters.card]?.filter({ user, filterStates }),
        cardFilters['CREATED'].filter({ user: person }),
        groupId &&
          cardGroupFilter(
            get(groups[groupId], 'relationships.following_tips.data', [])
          ),
        completedDateFilter(
          {
            startDate: filters.completed_start_date,
            endDate: filters.completed_end_date
          },
          filterStates
        ),
        createdDateFilter(
          {
            startDate: filters.created_start_date,
            endDate: filters.created_end_date
          },
          filterStates
        ),
        creatorFilter(filters.creator, filterStates),
        dueDateFilter(
          {
            startDate: filters.due_start_date,
            endDate: filters.due_end_date
          },
          filterStates
        ),
        labelFilter(filters.label, filterStates),
        startDateFilter(
          {
            startDate: filters.start_start_date,
            endDate: filters.start_end_date
          },
          filterStates
        ),
        priorityFilters(filters.priority, filterStates),
        searchCardsFilter(search.searchCardsResult),
        get(filters, 'include_now_cards') && assignedFilter([user.id]),
        !get(filters, 'include_completed_cards') && nonCompletedCardFilter,
        !get(filters, 'include_uncompleted_cards') && nonUnCompletedCardFilter,
        !get(filters, 'include_nested_cards') && nonNestedCardFilter
      ]);

    const filtersToApplyWithIncludeSubtopicCardsFilter = topicId =>
      compact([
        !get(filters, 'include_subtopic_cards') &&
          nonSubtopicCardFilter(topicId)
      ]);

    return Object.keys(sortedCardsByTopic).reduce((a, b) => {
      const sortedCardsForTopic = sortedCardsByTopic[b];
      let filteredCards = applyFilters(
        sortedCardsForTopic,
        filtersToApply,
        true
      );
      filteredCards = applyFilters(
        filteredCards,
        filtersToApplyWithIncludeSubtopicCardsFilter(b),
        true
      );
      a[b] = filteredCards;
      return a;
    }, {});
  }
);
const getSheetViewCards = (state, props) => props.cards;
const getTopicId = (state, props) => props.topicId;
const getGroupBy = (state, props) => getFilterSettings(state).group_by.groupBy;

const getOrderByForTopic = (state, props) => {
  const order = get(
    stateMappings(state).topics[stateMappings(state).page.topicId],
    'attributes.user_configuration.data.attributes.orders'
  );
  const peopleOrder = get(stateMappings(state), 'peopleOrders');
  const labelOrder = get(stateMappings(state), 'labelOrders');
  return {
    order,
    peopleOrder,
    labelOrder,
    sortOrder: props.sortOrder,
    sortColumn: props.sortColumn
  };
};

const getLabels = (state, props) => state._newReduxTree.database.labels;
const getPeople = (state, props) => state._newReduxTree.database.people;
const _pipe = (a, b) => arg => b(a(arg));
const pipe = (...ops) => ops.reduce(_pipe);

const groupByFn = (
  sheetViewCards,
  groupBy,
  topicId,
  labels,
  people,
  groupByPath,
  orderBy
) => {
  let options = {};
  if (orderBy.sortColumn) {
    sheetViewCards = sheetConfig[orderBy.sortColumn].sort(
      sheetViewCards,
      orderBy.sortOrder
    );
  }
  switch (groupBy.value) {
    case 'assignee': {
      options.attribute = 'assignee';
      options.runStandardGroupBy = false;
      const getCardAssignees = card =>
        card.relationships.tip_assignments.data.map(assigneeId => assigneeId);
      const getAllPeopleNames = () => {
        let sortedPeople = people;
        if (orderBy.order.user_topic_people_order) {
          sortedPeople = sortBy(people, function(item) {
            return orderBy.peopleOrder?.[
              orderBy.order.user_topic_people_order
            ].attributes.order.indexOf(item.id);
          });
          return sortedPeople.map((key, index) => {
            return {
              peopleName: key.attributes.first_name,
              id: `${key.id}`
            };
          });
        }
        return Object.keys(sortedPeople).map((key, index) => {
          return {
            peopleName: people[key].attributes.first_name,
            id: `${people[key].id}`
          };
        });
      };

      const assignee_preprocess = cards =>
        cards.map(card => {
          return {
            ...card,
            attributes: {
              ...card.attributes,
              tip_assignments_id: getCardAssignees(card)
            }
          };
        });
      const assigneeGroupedCards = cards => {
        const assignedCards = [];
        getAllPeopleNames().map((people, index) => {
          const assigneeFilteredCards = cards.filter(card =>
            card.attributes.tip_assignments_id.includes(`${people.id}`)
          );
          if (assigneeFilteredCards.length > 0) {
            assignedCards.push({
              assignee: people.peopleName,
              assignee_id: people.id,
              data: assigneeFilteredCards
            });
          }
        });
        const unassignedAssigness = cards.filter(
          card => card.attributes.tip_assignments.length === 0
        );
        return concat(assignedCards, {
          assignee: 'Unassigned',
          assignee_id: null,
          data: unassignedAssigness
        });
      };
      options.chainedOps = sheetViewCards =>
        pipe(assignee_preprocess, assigneeGroupedCards)(sheetViewCards);

      options.groupByCardStyle = {
        display: 'flex',
        color: '#fff',
        padding: '16px',
        minWidth: '107px',
        height: '32px',
        alignItems: 'center',
        backgroundColor: groupBy.color,
        borderRadius: '4px'
      };
      break;
    }
    case 'priority_level': {
      options.attribute = 'priority_level';
      options.runStandardGroupBy = true;
      const order = {
        Highest: 1,
        High: 2,
        Medium: 3,
        Low: 4,
        Lowest: 5
      };
      options.sortMode = 'asc';
      const prioirty_level_preprocess = cards =>
        cards.map(card => {
          return {
            ...card,
            attributes: {
              ...card.attributes,
              priority_level: card.attributes.priority_level
                ? card.attributes.priority_level
                : 'Unassigned'
            }
          };
        });

      const priority_level_ordered = cards =>
        cards.map(card => {
          return {
            ...card,
            priority_level_order: order[card.attributes.priority_level],
            labelColor: priorityColorMap[card.attributes.priority_level]
          };
        });
      const prioirty_level_sorted = cards =>
        orderBy(cards, card => card.priority_level_order, [options.sortMode]);
      options.groupByCardStyle = {
        display: 'flex',
        color: '#fff',
        padding: '16px',
        minWidth: '107px',
        height: '32px',
        alignItems: 'center',
        backgroundColor: groupBy.color,
        borderRadius: '4px'
      };
      options.chainedOps = sheetViewCards =>
        pipe(
          // prioirty_level_preprocess,
          priority_level_ordered,
          prioirty_level_sorted
        )(sheetViewCards);
      break;
    }
    case 'update_date': {
      options.attribute = 'updated_at';
      options.runStandardGroupBy = true;
      options.sortMode = 'desc';
      options.isDate = true;
      const update_date_preprocess = cards =>
        cards.map(card => {
          return {
            ...card,
            attributes: {
              ...card.attributes,
              updated_at: card.attributes.updated_at,
              grouped_updated_at: card.attributes.updated_at
                ? new moment(card.attributes.updated_at).format("Do MMMM 'YY")
                : 'Unassigned'
            }
          };
        });

      const update_date_sort = cards =>
        cards.sort(
          (a, b) =>
            moment(b.attributes.updated_at).unix() -
            moment(a.attributes.updated_at).unix()
        );
      options.groupByCardStyle = {
        display: 'flex',
        color: '#fff',
        padding: '16px',
        minWidth: '107px',
        height: '32px',
        alignItems: 'center',
        backgroundColor: groupBy.color,
        borderRadius: '4px'
      };
      options.chainedOps = sheetViewCards =>
        pipe(update_date_sort, update_date_preprocess)(sheetViewCards);
      break;
    }
    case 'due_date': {
      options.attribute = 'due_date';
      options.runStandardGroupBy = true;
      options.sortMode = 'desc';
      options.isDate = true;
      const due_date_preprocess = cards =>
        cards.map(card => {
          return {
            ...card,
            attributes: {
              ...card.attributes,
              due_date: card.attributes.due_date,
              grouped_due_date: card.attributes.due_date
                ? new moment(card.attributes.due_date).format("Do MMMM 'YY")
                : 'Unassigned'
            }
          };
        });

      const due_date_sort = cards =>
        cards.sort(
          (a, b) =>
            new Date(a.attributes.due_date) - new Date(b.attributes.due_date)
        );
      options.groupByCardStyle = {
        display: 'flex',
        color: '#fff',
        padding: '16px',
        minWidth: '107px',
        height: '32px',
        alignItems: 'center',
        backgroundColor: groupBy.color,
        borderRadius: '4px'
      };
      options.chainedOps = sheetViewCards =>
        pipe(due_date_sort, due_date_preprocess)(sheetViewCards);
      break;
    }
    case 'start_date': {
      options.attribute = 'start_date';
      options.runStandardGroupBy = true;
      options.sortMode = 'desc';
      options.isDate = true;
      const start_date_preprocess = cards =>
        cards.map(card => {
          return {
            ...card,
            attributes: {
              ...card.attributes,
              start_date: card.attributes.start_date,
              grouped_start_date: card.attributes.start_date
                ? new moment(card.attributes.start_date).format("Do MMMM 'YY")
                : 'Unassigned'
            }
          };
        });

      const start_date_sort = cards =>
        cards.sort(
          (a, b) =>
            moment(a.attributes.start_date).unix() -
            moment(b.attributes.start_date).unix()
        );
      options.groupByCardStyle = {
        display: 'flex',
        color: '#fff',
        padding: '16px',
        minWidth: '107px',
        height: '32px',
        alignItems: 'center',
        backgroundColor: groupBy.color,
        borderRadius: '4px'
      };
      options.chainedOps = sheetViewCards =>
        pipe(start_date_sort, start_date_preprocess)(sheetViewCards);
      break;
    }
    case 'label': {
      options.attribute = 'labels';
      options.runStandardGroupBy = false;
      const labelColorMap = {};
      Object.keys(labels).forEach((key, index) => {
        labelColorMap[labels[key].attributes.name] =
          labels[key].attributes.color;
      });
      const getCardLabels = card =>
        card.relationships.labels.data.map(
          labelId => labels[labelId].attributes.name
        );
      const getAllCardLabels = cards => {
        const AllLabels = flatten(cards.map(card => getCardLabels(card)));
        const uniqLabels = uniq(AllLabels);
        return uniqLabels;
      };
      const label_preprocess = cards =>
        cards.map(card => {
          return {
            ...card,
            attributes: { ...card.attributes, labels: getCardLabels(card) }
          };
        });
      const labelGroupedCards = cards => {
        let labeledCards = getAllCardLabels(cards).map(labelName => {
          const labelFilteredCards = cards.filter(card =>
            card.attributes.labels.includes(labelName)
          );
          return {
            labels: labelName,
            labelColor: { backgroundColor: labelColorMap[labelName] },
            data: labelFilteredCards
          };
        });
        if (orderBy.order.user_topic_label_order) {
          const namedLabelOrder = orderBy.labelOrder[
            orderBy.order.user_topic_label_order
          ].attributes.order.map((k, v) => {
            return labels[k].attributes.name;
          });
          labeledCards = sortBy(labeledCards, function(item) {
            let index = namedLabelOrder.indexOf(item.labels);
            return index >= 0 ? index : Number.MAX_SAFE_INTEGER;
          });
        }
        const unassignedLabels = cards.filter(
          card => card.attributes.labels.length === 0
        );
        if (unassignedLabels.length > 0) {
          return concat(labeledCards, {
            labels: 'Unassigned',
            data: unassignedLabels
          });
        }
        return labeledCards;
      };
      options.chainedOps = sheetViewCards =>
        pipe(label_preprocess, labelGroupedCards)(sheetViewCards);

      options.groupByCardStyle = {
        display: 'flex',
        color: '#fff',
        padding: '16px',
        minWidth: '107px',
        height: '32px',
        alignItems: 'center',
        backgroundColor: groupBy.color,
        borderRadius: '4px'
      };
      break;
    }
    case 'status': {
      options.attribute = 'status';
      options.runStandardGroupBy = true;
      const status_order = {
        'In progress': 1,
        Overdue: 2,
        Unstarted: 3,
        Completed: 4
      };
      options.sortMode = 'asc';
      const getStatus = ({ attributes }) => {
        if (attributes.completed_percentage === 100) {
          return 'Completed';
        } else if (moment() > moment(attributes.due_date)) {
          return 'Overdue';
        } else if (attributes.completed_percentage > 0) {
          return 'In progress';
        } else {
          return 'Unstarted';
        }
      };
      const status_preprocess = cards =>
        cards.map(card => {
          return {
            ...card,
            attributes: { ...card.attributes, status: getStatus(card) }
          };
        });

      const status_ordered = cards =>
        cards.map(card => {
          return {
            ...card,
            status_order: status_order[card.attributes.status]
          };
        });
      const status_sorted = cards =>
        orderBy(cards, card => card.status_order, [options.sortMode]);
      options.groupByCardStyle = {
        display: 'flex',
        color: '#fff',
        padding: '16px',
        minWidth: '107px',
        height: '32px',
        alignItems: 'center',
        backgroundColor: groupBy.color,
        borderRadius: '4px'
      };
      options.chainedOps = sheetViewCards =>
        pipe(status_preprocess, status_ordered, status_sorted)(sheetViewCards);
      break;
    }
    case 'speed': {
      options.attribute = 'speed';
      options.runStandardGroupBy = true;
      options.sortMode = 'asc';
      const speed_order = {
        Rocket: 1,
        Done: 2,
        Car: 3,
        Horse: 4,
        Turtle: 5,
        Snail: 6,
        Snooze: 7
      };

      const speed_preprocess = cards =>
        cards.map(card => {
          return {
            ...card,
            attributes: { ...card.attributes, speed: getSpeed(card) }
          };
        });

      const speed_ordered = cards =>
        cards.map(card => {
          return {
            ...card,
            speed_order: speed_order[card.attributes.speed]
          };
        });
      const speed_sorted = cards =>
        orderBy(cards, card => card.speed_order, [options.sortMode]);
      options.groupByCardStyle = {
        display: 'flex',
        color: '#fff',
        padding: '16px',
        minWidth: '107px',
        height: '32px',
        alignItems: 'center',
        backgroundColor: groupBy.color,
        borderRadius: '4px'
      };
      options.chainedOps = sheetViewCards =>
        pipe(speed_preprocess, speed_ordered, speed_sorted)(sheetViewCards);
      break;
    }
    case 'completion': {
      options.attribute = 'completion_date';
      options.runStandardGroupBy = true;
      options.sortMode = 'desc';
      options.isDate = true;
      const completion_date_preprocess = cards =>
        cards.map(card => {
          return {
            ...card,
            attributes: {
              ...card.attributes,
              completion_date: card.attributes.completion_date,
              grouped_completion_date: card.attributes.completion_date
                ? new moment(card.attributes.completion_date).format(
                    "Do MMMM 'YY"
                  )
                : 'Unassigned'
            }
          };
        });

      const completion_date_sort = cards =>
        cards.sort(
          (a, b) =>
            moment(a.attributes.completion_date).unix() -
            moment(b.attributes.completion_date).unix()
        );
      options.groupByCardStyle = {
        display: 'flex',
        color: '#fff',
        padding: '16px',
        minWidth: '107px',
        height: '32px',
        alignItems: 'center',
        backgroundColor: groupBy.color,
        borderRadius: '4px'
      };
      options.chainedOps = sheetViewCards =>
        pipe(completion_date_sort, completion_date_preprocess)(sheetViewCards);
      break;
    }
    case 'created_date': {
      options.attribute = 'created_at';
      options.runStandardGroupBy = true;
      options.sortMode = 'asc';
      options.isDate = true;
      const created_date_preprocess = cards =>
        cards.map(card => {
          return {
            ...card,
            attributes: {
              ...card.attributes,
              created_at: card.attributes.created_at,
              grouped_created_at: card.attributes.created_at
                ? new moment(card.attributes.created_at).format("Do MMMM 'YY")
                : 'Unassigned'
            }
          };
        });

      const created_date_sort = cards =>
        cards.sort(
          (a, b) =>
            moment(b.attributes.created_at).unix() -
            moment(a.attributes.created_at).unix()
        );
      options.groupByCardStyle = {
        display: 'flex',
        color: '#fff',
        padding: '16px',
        minWidth: '107px',
        height: '32px',
        alignItems: 'center',
        backgroundColor: groupBy.color,
        borderRadius: '4px'
      };
      options.chainedOps = sheetViewCards =>
        pipe(created_date_sort, created_date_preprocess)(sheetViewCards);
      break;
    }
    case 'comment_date': {
      options.attribute = 'completion_date';
      options.runStandardGroupBy = true;
      options.sortMode = 'desc';
      options.isDate = true;
      const comment_date_preprocess = cards =>
        cards.map(card => {
          return {
            ...card,
            attributes: {
              ...card.attributes,
              completion_date: card.attributes.completion_date,
              grouped_completion_date: card.attributes.completion_date
                ? new moment(card.attributes.completion_date).format(
                    "Do MMMM 'YY"
                  )
                : 'Unassigned'
            }
          };
        });

      const comment_date_sort = cards =>
        cards.sort(
          (a, b) =>
            moment(a.attributes.completion_date).unix() -
            moment(b.attributes.completion_date).unix()
        );
      options.groupByCardStyle = {
        display: 'flex',
        color: '#fff',
        padding: '16px',
        minWidth: '107px',
        height: '32px',
        alignItems: 'center',
        backgroundColor: groupBy.color,
        borderRadius: '4px'
      };
      options.chainedOps = sheetViewCards =>
        pipe(comment_date_sort, comment_date_preprocess)(sheetViewCards);
      break;
    }
    case 'created_by': {
      options.attribute = 'created_by';
      options.runStandardGroupBy = true;
      options.sortMode = 'asc';
      const created_by_preprocess = cards =>
        cards.map(card => {
          return {
            ...card,
            attributes: {
              ...card.attributes,
              created_by: card.attributes.creator.name
            }
          };
        });
      let created_by_sort;
      if (orderBy.order.user_topic_people_order) {
        created_by_sort = cards =>
          sortBy(cards, function(item) {
            return orderBy.peopleOrder?.[
              orderBy.order.user_topic_people_order
            ].attributes.order.indexOf(item.attributes.creator.id);
          });
      } else {
        created_by_sort = cards =>
          orderBy(cards, card => card.attributes.creator.name, [
            options.sortMode
          ]);
      }
      options.groupByCardStyle = {
        display: 'flex',
        color: '#fff',
        padding: '16px',
        minWidth: '107px',
        height: '32px',
        alignItems: 'center',
        backgroundColor: groupBy.color,
        borderRadius: '4px'
      };
      options.chainedOps = sheetViewCards =>
        pipe(created_by_sort, created_by_preprocess)(sheetViewCards);
      break;
    }
    case 'sub_view': {
      // Need to change this logic when we know what to do sub board grouping
      options.attribute = 'completion_date';
      options.runStandardGroupBy = true;
      options.sortMode = 'desc';
      options.isDate = true;
      const sub_view_preprocess = cards =>
        cards.map(card => {
          return {
            ...card,
            attributes: {
              ...card.attributes,
              completion_date: card.attributes.completion_date
                ? card.attributes.completion_date
                : 'Unassigned',
              grouped_completion_date: card.attributes.completion_date
                ? new moment(card.attributes.completion_date).format(
                    "Do MMMM 'YY"
                  )
                : 'Unassigned'
            }
          };
        });

      const subview_sort = cards =>
        cards.sort(
          (a, b) =>
            moment(a.attributes.completion_date).unix() -
            moment(b.attributes.completion_date).unix()
        );
      options.groupByCardStyle = {
        display: 'flex',
        color: '#fff',
        padding: '16px',
        minWidth: '107px',
        height: '32px',
        alignItems: 'center',
        backgroundColor: groupBy.color,
        borderRadius: '4px'
      };
      options.chainedOps = sheetViewCards =>
        pipe(subview_sort, sub_view_preprocess)(sheetViewCards);
      break;
    }
    default:
      (options.attribute = 'priority_level'),
        (options.order = {
          Highest: 1,
          High: 2,
          Medium: 3,
          Low: 4,
          Lowest: 5,
          null: 6
        }),
        (options.sortMode = 'asc'),
        (options.groupByCardStyle = {
          display: 'flex',
          color: '#fff',
          fontWeight: '600',
          padding: '16px',
          width: '107px',
          height: '32px',
          alignItems: 'center',
          backgroundColor: 'green'
        });
  }
  let orderedCards, groupedCards;
  if (options.chainedOps) {
    orderedCards = options.chainedOps(sheetViewCards);
  }
  const getKey = key => (key === 'null' ? 'Unassigned' : key);
  if (options.runStandardGroupBy) {
    if (options.isDate) {
      groupedCards = _lodashGroupBy(
        orderedCards,
        `attributes.grouped_${options.attribute}`
      );
    } else {
      groupedCards = _lodashGroupBy(
        orderedCards,
        `attributes.${options.attribute}`
      );
    }
    groupedCards = map(groupedCards, (value, key) => ({
      [options.attribute]: getKey(key),
      data: value,
      labelColor: first(value).labelColor
    }));

    //groupedCards = orderedCards;
  } else {
    groupedCards = orderedCards;
  }
  const denormalizedCards = groupedCards.map(groupedCard => {
    let curr_label_color = {};
    if (groupedCard.labelColor) {
      curr_label_color = groupedCard.labelColor;
    }
    return assign({
      attributes: {
        title: groupedCard[options.attribute],
        id: groupedCard[`${options.attribute}_id`],
        view: { ...options.groupByCardStyle, ...curr_label_color }
      },
      type: 'groupby',
      id: shortid.generate(),
      groupByPath: {
        ...groupByPath,
        [options.attribute]: groupedCard[options.attribute]
      },
      relationships: {
        nested_tips: { data: groupedCard.data },
        topics: {
          data: [topicId]
        }
      }
    });
  });
  return { denormalizedCards };
};

export const getGroupByCards = createSelector(
  [
    getSheetViewCards,
    getGroupBy,
    getTopicId,
    getLabels,
    getPeople,
    getOrderByForTopic
  ],
  (sheetViewCards, groupBy, topicId, labels, people, orderBy) => {
    let cards = sheetViewCards;
    let nestedCardData;
    /* The code here is intentionally left like this for further optimization. The current version explains the algorithm
    well. The groupBy cards are computed again fully for new nested group by options which can be improved by using some
    sort of caching/closure/DP/redux techniques. Also the number of nesting is arbitrarily left for 4 levels beyond which performance
    takes a hit.

    With time either me or anyone can come up with a way to improve this process. After that solving for 'n' nesting
    levels would be easy hopefully as well.
    */
    groupBy.forEach((group, index) => {
      if (index === 0) {
        cards = groupByFn(cards, group, topicId, labels, people, {}, orderBy);
      } else if (index === 1) {
        let path = cards.denormalizedCards;
        for (let i = 0; i < path.length; i++) {
          nestedCardData = groupByFn(
            cards.denormalizedCards[i].relationships.nested_tips.data,
            group,
            topicId,
            labels,
            people,
            { [groupBy[0].value]: cards.denormalizedCards[i].attributes.title },
            orderBy
          );
          cards.denormalizedCards[i].relationships.nested_tips.data =
            nestedCardData.denormalizedCards;
        }
      } else if (index === 2) {
        for (let i = 0; i < cards.denormalizedCards.length; i++) {
          let path = cards.denormalizedCards[i].relationships.nested_tips.data;
          for (let j = 0; j < path.length; j++) {
            nestedCardData = groupByFn(
              cards.denormalizedCards[i].relationships.nested_tips.data[j]
                .relationships.nested_tips.data,
              group,
              topicId,
              labels,
              people,
              {
                [groupBy[0].value]: cards.denormalizedCards[i].attributes.title,
                [groupBy[1].value]:
                  cards.denormalizedCards[i].relationships.nested_tips.data[j]
                    .attributes.title
              },
              orderBy
            );
            cards.denormalizedCards[i].relationships.nested_tips.data[
              j
            ].relationships.nested_tips.data = nestedCardData.denormalizedCards;
          }
        }
      } else if (index === 3) {
        for (let i = 0; i < cards.denormalizedCards.length; i++) {
          let path1 = cards.denormalizedCards[i].relationships.nested_tips.data;
          for (let j = 0; j < path1.length; j++) {
            let path2 =
              cards.denormalizedCards[i].relationships.nested_tips.data;
            for (let k = 0; k < path2.length; k++) {
              nestedCardData = groupByFn(
                cards.denormalizedCards[i].relationships.nested_tips.data[j]
                  .relationships.nested_tips.data[k].relationships.nested_tips
                  .data,
                group,
                topicId,
                labels,
                people,
                [groupBy[0], groupBy[1], groupBy[2]],
                orderBy
              );
              cards.denormalizedCards[i].relationships.nested_tips.data[
                j
              ].relationships.nested_tips.data[
                k
              ].relationships.nested_tips.data =
                nestedCardData.denormalizedCards;
            }
          }
        }
      }
    });
    return cards.denormalizedCards;
  }
);

export const getSortedFilteredCardsByTopicWithoutNestedCards = createSelector(
  state => getSortedFilteredCardsByTopic(state),
  cardsByTopic =>
    Object.keys(cardsByTopic).reduce((a, b) => {
      a[b] = cardsByTopic[b].filter(nonNestedCardFilter);
      return a;
    }, {})
);

export const getSortedFilteredCardsByTopicWithoutDescendants = createSelector(
  state => getSortedFilteredCardsByTopic(state),
  cardsByTopic =>
    Object.keys(cardsByTopic).reduce((a, b) => {
      a[b] = cardsByTopic[b].filter(card =>
        get(card, 'relationships.topics.data', []).includes(b)
      );
      return a;
    }, {})
);

export const getSortedFilteredNonNestedCardsByTopicWithoutDescendants = createSelector(
  state => getSortedFilteredCardsByTopic(state),
  cardsByTopic =>
    Object.keys(cardsByTopic).reduce((a, b) => {
      a[b] = cardsByTopic[b].filter(card => {
        return (
          get(card, 'relationships.topics.data', []).includes(b) &&
          !(
            card.relationships.follows_tip &&
            card.relationships.follows_tip.data
          )
        );
      });
      return a;
    }, {})
);

export const getSortedCardsByIds = createSelector(
  (state, cardIds) => cardIds,
  (state, cardIds, topicId) =>
    getRelevantTopicOrderForTopic(state, topicId || '0'),
  state => getCards(state),
  (cardIds, topicOrder, cardsMap) => {
    const cards = cardIds.map(id => cardsMap[id]);
    const results =
      sortByOrderAndCreatedDate(
        cards,
        get(topicOrder, 'attributes.tip_order', [])
      ) || [];
    return results.filter(x => x);
  }
);

export const instanceOfGetSortedCardsForTopic = () => {
  const getSortedCardsForTopic = createSelector(
    //pass null for all cards
    (state, topicId) => topicId,
    (state, topicId) => getRelevantTopicOrderForTopic(state, topicId || '0'),
    state => getCardsByTopic(state),
    state => getCardArray(state),
    (topicId, topicOrder, cardsByTopic, allCards) => {
      const thisTopicsCards = topicId ? cardsByTopic[topicId] || [] : allCards;
      const results =
        sortByOrderAndCreatedDate(
          thisTopicsCards,
          get(topicOrder, 'attributes.tip_order', [])
        ) || [];
      return results;
    }
  );

  return getSortedCardsForTopic;
};

export const instanceOfGetSortedFilteredCardsForTopic = () => {
  const getSortedCardsForTopic = instanceOfGetSortedCardsForTopic();

  const getSortedFilteredCardsForTopic = createSelector(
    //pass null for all cards
    (state, topicId) => getSortedCardsForTopic(state, topicId),
    state => stateMappings(state).user,
    state => getFilterSettings(state),
    state => stateMappings(state).people[stateMappings(state).page.personId],
    (sortedCards, user, filters, personPagePerson) => {
      const filtersToApply = [
        archivedFilter(filters.labelFilters),
        cardFilters[filters.card]?.filter({ user }),
        cardFilters['CREATED'].filter({ user: personPagePerson }),
        completedDateFilter(filters.completedDateFilter),
        createdDateFilter(filters.createdDateFilter),
        dueDateFilter(filters.dueDateFilter),
        labelFilter(filters.labelFilters),
        startDateFilter(filters.startDateFilter),
        priorityFilters(filters.priorityFilters)
      ];
      const filteredCards = applyFilters(sortedCards, filtersToApply, true);
      return filteredCards;
    }
  );

  return getSortedFilteredCardsForTopic;
};

export const getSortedCardsForTopic = instanceOfGetSortedCardsForTopic();
export const getSortedFilteredCardsForTopic = instanceOfGetSortedFilteredCardsForTopic();

//TODO: MH remove all selectors below:

//returns an array of cards filtered based on user-selected filters:
export const getFilteredCards = createSelector(
  [
    state => stateMappings(state).user.id,
    state => getFilterSettings(state),
    state => stateMappings(state).cards
  ],
  (userId, filters, cards) => {
    const filtersToApply = [
      archivedFilter(filters.label),
      labelFilter(filters.label),
      cardFilters[filters.card].filter(userId),
      hasTopicOrSubtopicFilter()
    ];
    const filteredCards = applyFilters(cards, filtersToApply, true);
    return filteredCards;
  }
);

//returns the array of cards from the 'getFilteredCards' filtered to a specific topic, and ordered based on the selected order for that topic:
export const getOrderedFilteredCardsForTopic = createSelector(
  [
    (state, topicId) => topicId,
    (state, topicId) => getRelevantTopicOrderForTopic(state, topicId),
    state => getFilteredCards(state)
  ],
  (topicId, topicOrder, filteredCards) => {
    const thisTopicsCards = topicId
      ? applyFilters(filteredCards, [topicFilter(topicId)], true)
      : filteredCards;
    const results =
      sortByOrderAndCreatedDate(
        thisTopicsCards,
        get(topicOrder, 'attributes.tip_order', [])
      ) || [];
    return results;
  }
);

export const sortByOrderAndCreatedDate = (array, order) => {
  return [...array].sort((a, b) => {
    if (order && order.includes(a.id) && order.includes(b.id)) {
      return order.indexOf(a.id) - order.indexOf(b.id);
    }
    if (order && order.includes(a.id)) {
      return -1;
    }
    if (order && order.includes(b.id)) {
      return 1;
    }
    return (
      moment(b.attributes.created_at).unix() -
      moment(a.attributes.created_at).unix()
    );
  });
};

export const getChatsArray = createSelector(
  state => getCards(state),
  cards => Object.values(cards).filter(card => get(card, 'attributes.is_chat'))
);

export const getChats = createSelector(
  state => getChatsArray(state),
  chats => keyBy(chats, 'id')
);

export const getChatsByTopic = createSelector(
  state => getChatsArray(state),
  chats =>
    _lodashGroupBy(chats, chat => get(chat, 'relationships.topics.data.0'))
);

export const getAllChatsByTopic = createSelector(
  state => getChatsArray(state),
  state => getTopics(state),
  (chats, topics) => {
    return chats.reduce((a, b) => {
      const chatTopicIds = get(b, 'relationships.topics.data', '0');
      if (chatTopicIds) {
        chatTopicIds.forEach(topicId => {
          a = addCardToTopicAndParentTopicsInMap(b, topicId, topics, a);
        });
      }
      a['0'] = a['0'] ? [...a['0'], b] : [b]; //have reference to every card in the index key
      return a;
    }, {});
  }
);

export const getChatsForTopic = createSelector(
  state => getChatsByTopic(state),
  (state, topicId) => topicId,
  (chatsByTopic, topicId) => chatsByTopic[topicId] || []
);

const hasRecentChatMessage = chat => {
  // it's a live chat if newest message is recent (< 10 minutes)
  const chatMessage = get(chat, 'attributes.chat_messages.0');
  if (chatMessage) {
    const now = moment();
    return now.diff(moment(chatMessage.updated_at), 'minutes') < 10;
  }
};

export const getAllLiveChats = createSelector(
  state => getChatsArray(state),
  chats => {
    return chats.filter(hasRecentChatMessage).sort((a, b) => {
      const ma = moment(get(a, 'attributes.chat_messages.0.updated_at'));
      const mb = moment(get(b, 'attributes.chat_messages.0.updated_at'));
      return mb.valueOf() - ma.valueOf();
    });
  }
);

export const getAllLiveChatsForTopic = createSelector(
  state => getAllChatsByTopic(state),
  (state, topicId) => topicId,
  (chatsByTopic, topicId) => {
    const topicChats = get(chatsByTopic, topicId, []);
    return topicChats.filter(hasRecentChatMessage).sort((a, b) => {
      const ma = moment(get(a, 'attributes.chat_messages.0.updated_at'));
      const mb = moment(get(b, 'attributes.chat_messages.0.updated_at'));
      return mb.valueOf() - ma.valueOf();
    });
  }
);

export const getVideoRoomArray = createSelector(
  state => getCards(state),
  cards =>
    Object.values(cards).filter(card => get(card, 'attributes.is_video_chat'))
);

export const getVideoRooms = createSelector(
  state => getVideoRoomArray(state),
  videoRooms => keyBy(videoRooms, 'id')
);

export const getVideoRoomsByTopic = createSelector(
  state => getVideoRoomArray(state),
  videoRooms =>
    _lodashGroupBy(videoRooms, videoRoom =>
      get(videoRoom, 'relationships.topics.data.0')
    )
);

export const getAllVideoRoomsByTopic = createSelector(
  state => getVideoRoomArray(state),
  state => getTopics(state),
  (videoRooms, topics) => {
    return videoRooms.reduce((a, b) => {
      const videoRoomTopicIds = get(b, 'relationships.topics.data', '0');
      if (videoRoomTopicIds) {
        videoRoomTopicIds.forEach(topicId => {
          a = addCardToTopicAndParentTopicsInMap(b, topicId, topics, a);
        });
      }
      a['0'] = a['0'] ? [...a['0'], b] : [b]; //have reference to every card in the index key
      return a;
    }, {});
  }
);

export const getVideoRoomsForTopic = createSelector(
  state => getVideoRoomsByTopic(state),
  (state, topicId) => topicId,
  (videoRoomsByTopic, topicId) => videoRoomsByTopic[topicId] || []
);

const videoRoomHasUser = (channel, channelsMap) => {
  const users = Object.values(get(channelsMap, [channel, 'users']));
  return users.find(user => user.presence);
};

export const getAllLiveVideoRooms = createSelector(
  state => getVideoRooms(state),
  state => get(stateMappings(state), 'presence.channels'),
  (videoRoomsMap, channelsMaps) => {
    const channels = Object.keys(channelsMaps);
    return channels
      .map(channel => {
        const m = channel.match(/video-room_(\d+)/);
        if (m && videoRoomHasUser(channel, channelsMaps)) {
          return m[1];
        }
      })
      .filter(id => id)
      .map(id => videoRoomsMap[id])
      .filter(videoRoom => videoRoom);
  }
);

export const getAllLiveVideoRoomsForTopic = createSelector(
  state => getVideoRoomsByTopic(state),
  (state, topicId) => topicId,
  state => get(stateMappings(state), 'presence.channels'),
  (videoRoomsByTopic, topicId, channelsMap) => {
    const topicVideoRooms = videoRoomsByTopic[topicId];
    const channels = Object.keys(channelsMap);
    return channels
      .map(channel => {
        const m = channel.match(/video-room_(\d+)/);
        if (m && videoRoomHasUser(channel, channelsMap)) {
          return m[1];
        }
      })
      .filter(id => id)
      .map(id => topicVideoRooms.find(videoRoom => videoRoom.id == id))
      .filter(videoRoom => videoRoom);
  }
);
