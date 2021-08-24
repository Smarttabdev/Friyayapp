import { getTopicViewName } from 'Src/newRedux/interface/lenses/thunks';

export const viewPayload = board => {
  let subTopic = '';
  const topicViews = ['TOPIC_HEXES', 'TOPIC_LIST', 'TOPIC_TILES'];
  if (topicViews.includes(board)) {
    subTopic = getTopicViewName(board)();
  }
  const payload = {
    subtopic_panel_visible: !!subTopic,
    current_active_template: board,
    card_hidden: !!subTopic,
    subtopic_view: subTopic ? subTopic : 'TILE'
  };
  !topicViews.includes(board) && delete payload.subtopic_view;
  return payload;
};
