import { CACHE_AGE_MS } from 'AppConstants';
import { getTopicOrders } from 'Src/newRedux/database/topicOrders/thunks';

const dmRequirements = {
  topicOrders: {
    action: ({ topicId }) => [getTopicOrders, { topicId }],
    key: attrs => `topicOrders-${JSON.stringify(attrs)}`,
    test: ({ callHistory }) =>
      callHistory && callHistory.lastCall >= moment().valueOf() - CACHE_AGE_MS
  }
};

export default dmRequirements;
