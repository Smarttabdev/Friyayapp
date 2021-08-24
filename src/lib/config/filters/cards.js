import { stateMappings } from 'Src/newRedux/stateMappings';
import tiphive from 'Lib/tiphive';
import get from 'lodash/get';
import { isIncluded } from 'Lib/config/filters/other';

export const cardFilters = {
  ALL: {
    key: 'ALL',
    name: 'All Cards',
    icon: 'globe',
    iconType: 'fontAwesome',
    contexts: ['domain', 'guestInGroup', 'support'],
    filter: ({ filterStates }) => card =>
      isIncluded({
        name: 'card',
        values: ['ALL'],
        filters: ['ALL'],
        filterStates
      })
  },
  LIKED: {
    key: 'LIKED',
    name: 'Cards I Liked',
    icon: 'heart',
    iconType: 'fontAwesome',
    contexts: ['domain', 'guestInGroup', 'support'],
    filter: ({ filterStates }) => card =>
      isIncluded({
        name: 'card',
        values: [card.attributes.liked_by_current_user && 'LIKED'],
        filters: ['LIKED'],
        filterStates
      })
  },
  STARRED: {
    key: 'STARRED',
    name: 'Cards I Starred',
    icon: 'star',
    iconType: 'fontAwesome',
    contexts: ['domain', 'guestInGroup', 'support'],
    filter: ({ filterStates }) => card =>
      isIncluded({
        name: 'card',
        values: [card.attributes.starred_by_current_user && 'STARRED'],
        filters: ['STARRED'],
        filterStates
      })
  },
  CREATED: {
    key: 'CREATED',
    name: 'My Cards',
    icon: 'user',
    iconType: 'fontAwesome',
    contexts: ['domain', 'guestInGroup', 'support'],
    filter: ({ user, filterStates }) => card =>
      isIncluded({
        name: 'card',
        values: [
          (user ? card.attributes.creator.id == user.id : true) && 'CREATED'
        ],
        filters: ['CREATED'],
        filterStates
      })
  },
  FOLLOWED_TOPICS: {
    key: 'FOLLOWED_TOPICS',
    name: 'Cards From Boards I Follow',
    icon: 'topic',
    iconType: 'fontAwesome',
    contexts: ['domain', 'guestInGroup', 'support'],
    filter: ({ user, filterStates }) => card =>
      isIncluded({
        name: 'card',
        values: [
          card.relationships.topics.data.some(topicId => {
            return get(
              user,
              'relationships.following_topics.data',
              []
            ).includes(topicId);
          }) && 'FOLLOWED_TOPICS'
        ],
        filters: ['FOLLOWED_TOPICS'],
        filterStates
      })
  }
};

export const cardFilterForView = {
  BASIC: {
    includeNested: false,
    includeSubtopicCards: false,
    includeCompletedCards: true,
    includeUnCompletedCards: true,
    includeNowCards: false
  },
  GRID: {
    includeNested: false,
    includeSubtopicCards: false,
    includeCompletedCards: true,
    includeUnCompletedCards: true,
    includeNowCards: false
  },
  SMALL_GRID: {
    includeNested: false,
    includeSubtopicCards: false,
    includeCompletedCards: true,
    includeUnCompletedCards: true,
    includeNowCards: false
  },
  PAGES: {
    includeNested: false,
    includeSubtopicCards: false,
    includeCompletedCards: true,
    includeUnCompletedCards: true,
    includeNowCards: false
  },
  DOC: {
    includeNested: false,
    includeSubtopicCards: false,
    includeCompletedCards: true,
    includeUnCompletedCards: true,
    includeNowCards: false
  },
  WIKI: {
    includeNested: false,
    includeSubtopicCards: false,
    includeCompletedCards: true,
    includeUnCompletedCards: true,
    includeNowCards: false
  },
  CARD: {
    includeNested: false,
    includeSubtopicCards: false,
    includeCompletedCards: true,
    includeUnCompletedCards: true,
    includeNowCards: false
  },
  MESSAGE_BOARD: {
    includeNested: false,
    includeSubtopicCards: false,
    includeCompletedCards: true,
    includeUnCompletedCards: true,
    includeNowCards: false
  },
  TODO: {
    includeNested: false,
    includeSubtopicCards: true,
    includeCompletedCards: true,
    includeUnCompletedCards: true,
    includeNowCards: false
  },
  KANBAN: {
    includeNested: false,
    includeSubtopicCards: true,
    includeCompletedCards: true,
    includeUnCompletedCards: true,
    includeNowCards: false
  },
  ASSIGNED: {
    includeNested: false,
    includeSubtopicCards: true,
    includeCompletedCards: true,
    includeUnCompletedCards: true,
    includeNowCards: false
  },
  PRIORITIZE: {
    includeNested: false,
    includeSubtopicCards: true,
    includeCompletedCards: true,
    includeUnCompletedCards: true,
    includeNowCards: false
  },
  GOAL: {
    includeNested: false,
    includeSubtopicCards: true,
    includeCompletedCards: true,
    includeUnCompletedCards: true,
    includeNowCards: false
  },
  PLANNING: {
    includeNested: false,
    includeSubtopicCards: true,
    includeCompletedCards: true,
    includeUnCompletedCards: true,
    includeNowCards: false
  },
  TIMELINE: {
    includeNested: false,
    includeSubtopicCards: true,
    includeCompletedCards: true,
    includeUnCompletedCards: true,
    includeNowCards: false
  },
  CALENDAR: {
    includeNested: false,
    includeSubtopicCards: true,
    includeCompletedCards: true,
    includeUnCompletedCards: true,
    includeNowCards: false
  },
  LIST: {
    includeNested: false,
    includeSubtopicCards: true,
    includeCompletedCards: true,
    includeUnCompletedCards: true,
    includeNowCards: false
  },
  TASK: {
    includeNested: false,
    includeSubtopicCards: false,
    includeCompletedCards: true,
    includeUnCompletedCards: true,
    includeNowCards: false
  },
  SHEET: {
    includeNested: false,
    includeSubtopicCards: false,
    includeCompletedCards: true,
    includeUnCompletedCards: true,
    includeNowCards: false
  },
  ESTIMATION: {
    includeNested: false,
    includeSubtopicCards: false,
    includeCompletedCards: true,
    includeUnCompletedCards: true,
    includeNowCards: false
  },
  DOCUMENT: {
    includeNested: false,
    includeSubtopicCards: false,
    includeCompletedCards: true,
    includeUnCompletedCards: true,
    includeNowCards: false
  },
  INDEX: {
    includeNested: false,
    includeSubtopicCards: false,
    includeCompletedCards: true,
    includeUnCompletedCards: true,
    includeNowCards: false
  },
  FEED: {
    includeNested: false,
    includeSubtopicCards: true,
    includeCompletedCards: true,
    includeUnCompletedCards: true,
    includeNowCards: false
  },
  ACTION_PLAN: {
    includeNested: false,
    includeSubtopicCards: false,
    includeCompletedCards: true,
    includeUnCompletedCards: true,
    includeNowCards: false
  },
  STATUS_TABLE: {
    includeNested: false,
    includeSubtopicCards: true,
    includeCompletedCards: true,
    includeUnCompletedCards: true,
    includeNowCards: false
  },
  BURNDOWN: {
    includeNested: false,
    includeSubtopicCards: true,
    includeCompletedCards: true,
    includeUnCompletedCards: true,
    includeNowCards: false
  },
  WEEKLY_SPREAD_VIEW: {
    includeNested: false,
    includeSubtopicCards: true,
    includeCompletedCards: true,
    includeUnCompletedCards: true,
    includeNowCards: false
  }
};
