import { ApiRequest } from 'lib/ApiRequest';
import getUrlParams from 'Utils/getUrlParams';

export const TRELLO_SYNC_FROM_BOARD = 'TRELLO_SYNC_FROM_BOARD';
export const TRELLO_TOPICS_SUCCESS = 'TRELLO_TOPICS_SUCCESS';
export const TRELLO_SYNC_FROM_TOPIC = 'TRELLO_SYNC_FROM_TOPIC';

export function syncFromBoard(topicId, boardId) {
  ApiRequest.post('trello/sync_from_board', {
    topic_id: topicId,
    board_id: boardId
  });

  return {
    type: TRELLO_SYNC_FROM_BOARD
  };
}

export function syncFromTopic(topicId, boardId) {
  ApiRequest.post('trello/sync_from_topic', {
    topic_id: topicId,
    board_id: boardId
  });

  return {
    type: TRELLO_SYNC_FROM_TOPIC
  };
}

// TODO: Find a way to reuse global topics state
export function fetchTopics(parentId = null) {
  const options = {
    page: {
      size: 999
    },
    filter: {
      created_by: localStorage['user_id']
    },
    parent_id: parentId
  };

  const topicsRequest = ApiRequest.get(`topics?${getUrlParams(options)}`);
  return dispatch => {
    topicsRequest.then(response => {
      dispatch({
        type: TRELLO_TOPICS_SUCCESS,
        payload: { parentId, data: response.data.data }
      });
    });
  };
}
