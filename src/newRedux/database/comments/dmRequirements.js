import { getCommentsForCardId, getCommentsForTopicId } from './thunks';

const dmRequirements = {
  commentsForCard: {
    action: ({ card }) => [getCommentsForCardId, { card: card }],
    key: ({ card, cacheKey }) => `commentsForCard-${card.id}-${cacheKey}`,
    test: ({ callHistory }) =>
      callHistory && callHistory.lastCall >= moment().valueOf() - 300
  },
  commentsForTopic: {
    action: ({ topic }) => [getCommentsForTopicId, { topic: topic }],
    key: ({ topic }) => `commentsForTopic-${topic.id}`,
    test: ({ callHistory }) =>
      callHistory && callHistory.lastCall >= moment().valueOf() - 300
  }
};

export default dmRequirements;
