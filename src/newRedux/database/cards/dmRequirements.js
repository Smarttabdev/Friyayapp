import { CACHE_AGE_MS } from 'AppConstants';
import { getCards } from './thunks';

const dmRequirements = {
  cards: {
    action: () => [getCards, {}],
    key: () => 'cards',
    test: ({ callHistory }) =>
      callHistory && callHistory.lastCall >= moment().valueOf() - CACHE_AGE_MS
  },
  cardsForLabel: {
    action: ({ labelId, topicId = null }) => [
      getCards,
      { labelId: labelId, topicId: topicId }
    ],
    key: ({ labelId, topicId = null }) => `cardsForLabel-${labelId}-${topicId}`,
    test: ({ callHistory }) =>
      callHistory && callHistory.lastCall >= moment().valueOf() - CACHE_AGE_MS
  },
  cardsForPerson: {
    action: ({ personId }) => [getCards, { personId: personId }],
    key: ({ personId }) => `cardsForPerson-${personId}`,
    test: ({ callHistory }) =>
      callHistory && callHistory.lastCall >= moment().valueOf() - CACHE_AGE_MS
  },
  cardsForTopic: {
    action: ({ topicId }) => [getCards, { topicId: topicId }],
    key: ({ topicId }) => `cardsForTopic-${topicId}`,
    test: ({ callHistory }) =>
      callHistory && callHistory.lastCall >= moment().valueOf() - CACHE_AGE_MS
  },
  cardsWithAttributes: {
    action: ({ attributes }) => [getCards, { ...attributes }],
    key: ({ attributes }) =>
      `cardsWithAttributes-${JSON.stringify(attributes)}`,
    test: ({ callHistory }) =>
      callHistory && callHistory.lastCall >= moment().valueOf() - CACHE_AGE_MS
  }
};

export default dmRequirements;
