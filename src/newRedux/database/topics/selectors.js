import { createSelector } from 'reselect';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { get, compact, intersection } from 'lodash';
import { topicFilters } from 'Lib/config/filters/topics';
import { applyFilters, isPrivateView, isSharedWithTeam } from 'Lib/utilities';
import {
  getRelevantTopicOrderForTopic,
  getRelevantTopicOrderByTopic
} from 'Src/newRedux/database/topicOrders/selectors';
import { getDomainTopicOrder } from 'Src/newRedux/database/topicOrders/selectors';
import {
  getFilterStates,
  topicGroupFilter,
  searchTopicsFilter,
  filterBoardType,
  filterBoardIds
} from 'Lib/config/filters/other';
import { getFilterSettings } from 'Src/helpers/user_config';
import store from 'Src/store/store';

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

export const getActiveBoardFilters = createSelector(
  (state = store.getState()) => getFilterSettings(state)?.board_ids,
  (state = store.getState()) => getFilterSettings(state)?.filter_states,
  (boardIds, filterStates) => {
    return (boardIds || [])
      .filter(id => !getFilterStates(filterStates, 'board_ids', id).disabled)
      .map(id => ({
        id,
        ...getFilterStates(filterStates, 'board_ids', id)
      }));
  }
);

export const getTopics = state => state._newReduxTree.database.topics;

export const getTopicArray = createSelector(
  state => getTopics(state),
  topics => Object.values(topics).filter(x => x)
);

export const getRootTopic = createSelector(getTopicArray, topics =>
  topics.find(
    topic => !topic.attributes.parent_id && topic.attributes.is_default
  )
);

export const getSortedTopicArray = createSelector(
  state => getTopicArray(state),
  topics =>
    topics.sort((a, b) =>
      a.attributes.title
        .toLowerCase()
        .localeCompare(b.attributes.title.toLowerCase())
    )
);

const isAncestor = (topicId, topic, topicsMap) => {
  let nextTopic = topic;
  while (nextTopic) {
    if (nextTopic.attributes.parent_id == topicId) {
      return true;
    }
    nextTopic = topicsMap[nextTopic.attributes.parent_id];
  }
  return false;
};

export const getAllTopicSubtopics = createSelector(
  getTopicArray,
  (state, topicId) => topicId,
  getTopics,
  (topics, topicId, topicsMap) => {
    return topics.filter(topic => isAncestor(topicId, topic, topicsMap));
  }
);

export const getTopicsByParentTopic = createSelector(
  state => getTopicArray(state),
  getRootTopic,
  (topics, rootTopic) =>
    topics.reduce((a, b) => {
      const parentTopicId = b.attributes.path
        ? b.attributes.path.length > 1
          ? b.attributes.path[b.attributes.path.length - 2].id
          : 'exclude'
        : 'exclude'; //this because topics coming nested in cards (that we use for path component) don't have their path with them

      a[parentTopicId] = a[parentTopicId] ? [...a[parentTopicId], b] : [b];

      if (parentTopicId == rootTopic.id) {
        a['0'] = a[parentTopicId];
      }

      return a;
    }, {})
);

export const getSortedTopicsByParentTopic = createSelector(
  state => getTopicsByParentTopic(state),
  state => getRelevantTopicOrderByTopic(state),
  getDomainTopicOrder,
  getRootTopic,
  (topicsByTopic, topicOrdersByTopic, domainTopicOrder, rootTopic) =>
    Object.keys(topicsByTopic).reduce((a, b) => {
      const relevantOrder =
        b == 0 ? topicOrdersByTopic[rootTopic?.id] : topicOrdersByTopic[b];
      const subtopicOrder = relevantOrder
        ? get(relevantOrder, 'attributes.subtopic_order', [])
        : [];
      a[b] = sortByOrderAndAlpha(topicsByTopic[b], subtopicOrder) || [];
      return a;
    }, {})
);

export const getSortedFilteredTopicsByParentTopicForTopic = createSelector(
  state => getSortedFilteredTopicsByParentTopic(state),
  state => getFilterSettings(state)?.topic_filter,
  state => stateMappings(state).user,
  state => stateMappings(state).page.groupId,
  state => stateMappings(state).groups,
  state => stateMappings(state).search,
  (
    sortedTopicsByTopic,
    topicFilterKeys = [],
    user,
    groupId,
    groups,
    search
  ) => {
    return Object.keys(sortedTopicsByTopic).reduce((a, b) => {
      const sortedTopicsForTopic = sortedTopicsByTopic[b];
      const filters = compact([
        ...topicFilterKeys.map(key => topicFilters[key]?.filter(user)),
        groupId &&
          topicGroupFilter(
            get(groups[groupId], 'relationships.following_topics.data', []),
            groupId
          ),
        searchTopicsFilter(search.searchTopicsResult)
      ]);
      const filteredTopicsForTopic = applyFilters(
        sortedTopicsForTopic,
        filters,
        true
      );
      a[b] = filteredTopicsForTopic;
      return a;
    }, {});
  }
);

export const getSortedFilteredTopicsByParentTopic = createSelector(
  state => getSortedTopicsByParentTopic(state),
  state => getFilterSettings(state)?.filter_states,
  state => getFilterSettings(state)?.board_type,
  state => getFilterSettings(state)?.topic_filter,
  state => getFilterSettings(state)?.pick_your_boards,
  state => getFilterSettings(state)?.active_tool_board_order,
  state => stateMappings(state).user,
  state => stateMappings(state).page.groupId,
  state => stateMappings(state).groups,
  state => stateMappings(state).filters.workspaceHomeSearchQuery,
  (state, tags) => tags,
  (state, tags, assignedObj) => assignedObj,
  (
    sortedTopicsByTopic,
    filterStates,
    boardTypeFilter,
    topicFilterKeys = [],
    pickYourBoardsFilter,
    activeToolBoardOrder,
    user,
    groupId,
    groups,
    workspaceHomeSearchQuery,
    tags,
    assignedObj
  ) => {
    if (getActiveBoardFilters().length > 0) return {};
    return Object.keys(sortedTopicsByTopic).reduce((a, b) => {
      let sortedTopicsForTopic = sortedTopicsByTopic[b];
      if (tags) {
        sortedTopicsForTopic = sortedTopicsForTopic.filter(topic => {
          return (
            !tags.length ||
            intersection(get(topic, 'attributes.tag_list', []), tags).length ===
              tags.length
          );
        });
      }
      if (workspaceHomeSearchQuery) {
        sortedTopicsForTopic = sortedTopicsForTopic.filter(topic =>
          topic.attributes.title
            .toLowerCase()
            .includes(workspaceHomeSearchQuery.toLowerCase())
        );
      }
      if (assignedObj) {
        sortedTopicsForTopic = sortedTopicsForTopic.filter(topic => {
          return get(topic, 'relationships.assignments.data', []).find(a => {
            return (
              a.assigned_type == assignedObj.assigned_type &&
              a.assigned_id == assignedObj.assigned_id
            );
          });
        });
      }
      const filterByOrder = topic =>
        (activeToolBoardOrder || []).includes(topic.id);
      const filters = compact([
        boardTypeFilter?.length > 0 &&
          filterBoardType(boardTypeFilter, filterStates),
        pickYourBoardsFilter && filterByOrder,
        ...topicFilterKeys.map(key => topicFilters[key]?.filter(user)),
        groupId &&
          topicGroupFilter(
            get(groups[groupId], 'relationships.following_topics.data', []),
            groupId
          )
      ]);
      const filteredTopicsForTopic = applyFilters(
        sortedTopicsForTopic,
        filters,
        true
      );
      a[b] = filteredTopicsForTopic;
      return a;
    }, {});
  }
);

export const getSortedFilteredSearchedTopicsByParentTopic = createSelector(
  state => getSortedFilteredTopicsByParentTopic(state),
  state => stateMappings(state).search.searchTopicsResult,
  (sortedFilteredTopicsByParentTopic, searchTopicsResult) => {
    const filters = compact([searchTopicsFilter(searchTopicsResult)]);
    return Object.keys(sortedFilteredTopicsByParentTopic).reduce((a, b) => {
      a[b] = applyFilters(sortedFilteredTopicsByParentTopic[b], filters, true);
      return a;
    }, {});
  }
);

export const instanceOfGetSortedTopicsForTopic = () => {
  const getSortedTopicsForTopic = createSelector(
    //pass null for  topics
    (state, topicId) => topicId,
    (state, topicId) => getRelevantTopicOrderForTopic(state, topicId || '0'),
    state => getTopicArray(state),
    (topicId, topicOrder, topics) => {
      const topicsOrSubtopics = topics.filter(topic =>
        topicId && topicId != '0'
          ? topic.attributes.kind == 'Subtopic' &&
            topic.attributes.path[topic.attributes.path.length - 2].id ==
              topicId
          : topic.attributes.kind == 'Hive'
      );
      return (
        sortByOrderAndAlpha(
          topicsOrSubtopics,
          get(topicOrder, 'attributes.subtopic_order', [])
        ) || []
      );
    }
  );

  return getSortedTopicsForTopic;
};

export const instanceOfGetSortedFilteredTopicsForTopic = () => {
  const getSortedTopicsForTopic = instanceOfGetSortedTopicsForTopic();

  const getSortedFilteredTopicsForTopic = createSelector(
    //pass null as topicId for topics
    (state, topicId) => getSortedTopicsForTopic(state, topicId),
    state => getFilterSettings(state)?.topic_filter,
    state => stateMappings(state).user,
    (sortedTopics, topicFilterKeys = [], user) => {
      const filters = topicFilterKeys.map(key =>
        topicFilters[key]?.filter(user)
      );
      const filteredTopics = applyFilters(sortedTopics, filters, true);
      return filteredTopics;
    }
  );

  return getSortedFilteredTopicsForTopic;
};

export const getSortedTopicsForTopic = instanceOfGetSortedTopicsForTopic();
export const getSortedFilteredTopicsForTopic = instanceOfGetSortedFilteredTopicsForTopic();

export const sortByOrderAndAlpha = (array, order) => {
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

    return a?.attributes?.title
      ? a.attributes.title
          .toLowerCase()
          .localeCompare(b.attributes.title.toLowerCase())
      : 0;
  });
};

export const getTopicFilters = createSelector(
  state => stateMappings(state).topics,
  (state, topicId) => topicId || stateMappings(state).page.topicId,
  (topics, topicId) => {
    return get(
      topics[topicId],
      'attributes.user_configuration.data.attributes.filter_setting',
      defaultFilter
    );
  }
);

export const getTopicUISettings = createSelector(
  state => stateMappings(state).topics,
  (state, topicId) => topicId || stateMappings(state).page.topicId,
  (topics, topicId) => {
    return get(
      topics[topicId],
      'attributes.user_configuration.data.attributes.ui_settings',
      {}
    );
  }
);

export const getTopicCustomLensId = createSelector(
  state => stateMappings(state).topics,
  (state, topicId) => topicId || stateMappings(state).page.topicId,
  (topics, topicId) => {
    return get(
      topics[topicId],
      'attributes.user_configuration.data.attributes.current_active_lens_id'
    );
  }
);

export const getTopicUserConfig = createSelector(
  state => stateMappings(state).topics,
  (state, topicId) => topicId || stateMappings(state).page.topicId,
  (topics, topicId) => {
    return get(
      topics[topicId],
      'attributes.user_configuration.data.attributes',
      {}
    );
  }
);

// Assuming that the default chat rooms are made with the following slugs when workspace is created
// 1-chat-room
// 2-video-room
export const getDefaultChatRoom = createSelector(
  state => getTopics(state),
  topics => {
    let chatRoom = null;
    const topicsArr = Object.keys(topics);
    if (topicsArr) {
      for (let i = 0; i < topicsArr.length; i++) {
        const topic = topics[topicsArr[i]];
        if (topic.attributes.slug.match(/\d+-chat-room$/)) {
          chatRoom = topic;
          break;
        }
      }
    }
    return chatRoom;
  }
);
// (topics[1].attributes.slug === '1-chat-room' ? topics[1] : null)}

export const getDefaultVideoRoom = createSelector(
  state => getTopics(state),
  topics => {
    let videoChatRoom = null;
    const topicsArr = Object.keys(topics);
    if (topicsArr) {
      for (let i = 0; i < topicsArr.length; i++) {
        const topic = topics[topicsArr[i]];
        if (topic.attributes.slug.match(/\d+-video-chat-room$/)) {
          videoChatRoom = topic;
          break;
        }
      }
    }
    return videoChatRoom;
  }
  // topics[2].attributes.slug === '2-video-chat-room' ? topics[2] : null
);

export const getDefaultTopic = createSelector(
  state => getTopics(state),
  topics => {
    const topicsArr = Object.keys(topics);
    if (topicsArr) {
      for (let i = 0; i < topicsArr.length; i++) {
        const topic = topics[topicsArr[i]];
        if (topic.attributes.is_default) {
          return topic;
        }
      }
    }
  }
);

export const allWorkspaceViewsSelector = createSelector(
  getSortedTopicsByParentTopic,
  allWorkspaceViews => allWorkspaceViews[0] || []
);

export const allWorkspaceViewsForGroupSelector = createSelector(
  allWorkspaceViewsSelector,
  (state, groupId) => groupId,
  (allWorkspaceViews, groupId) =>
    groupId
      ? allWorkspaceViews.filter(topic => isSharedWithTeam(topic, groupId))
      : allWorkspaceViews
);

export const starredViewsSelector = createSelector(
  allWorkspaceViewsSelector,
  allWorkspaceViews =>
    allWorkspaceViews.filter(topic => topic.attributes.starred_by_current_user)
);

export const templateViewsSelector = createSelector(
  allWorkspaceViewsSelector,
  allWorkspaceViews =>
    allWorkspaceViews.filter(topic => topic.attributes.is_template)
);

export const followingViewsSelector = createSelector(
  (state, groupId) => allWorkspaceViewsForGroupSelector(state, groupId),
  state => stateMappings(state).user,
  (allWorkspaceViews, user) => {
    const userFollwedWorkspace = user.relationships.following_topics.data || [];
    return allWorkspaceViews.filter(topic =>
      userFollwedWorkspace.includes(topic.id)
    );
  }
);

export const privateViewsSelector = createSelector(
  (state, groupId) => allWorkspaceViewsForGroupSelector(state, groupId),
  state => stateMappings(state).user,
  (allWorkspaceViews, user) =>
    allWorkspaceViews.filter(topic => isPrivateView(topic, user))
);

export const workspaceViewsSelector = createSelector(
  (state, groupId) => allWorkspaceViewsForGroupSelector(state, groupId),
  privateViewsSelector,
  (allWorkspaceViews, privateViews) =>
    allWorkspaceViews.filter(topic => !privateViews.includes(topic))
);

export const personalTemplatesSelector = createSelector(
  (state, groupId) => allWorkspaceViewsForGroupSelector(state, groupId),
  state => stateMappings(state).user,
  (allWorkspaceViews, user) =>
    allWorkspaceViews.filter(
      topic =>
        topic.attributes.is_template == true &&
        topic.attributes.user_id == user.id
    )
);

export const workspaceTemplatesSelector = createSelector(
  (state, groupId) => allWorkspaceViewsForGroupSelector(state, groupId),
  allWorkspaceViews =>
    allWorkspaceViews.filter(topic => topic.attributes.is_template == true)
);
