import cards from './cards';
import headers from './headers';
import topics from './topics';

const lensConfig = {
  cards,
  headers,
  topics
};

export default lensConfig;

export const pageViewMappings = {
  home: lensConfig.cards,
  topic: lensConfig.cards,
  topics: lensConfig.topics,
  user: lensConfig.cards,
  users: {}
};
