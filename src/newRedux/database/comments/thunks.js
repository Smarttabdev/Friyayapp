import { stateMappings } from 'Src/newRedux/stateMappings';
import Ability from 'Lib/ability';
import { toggleItemInclusionInArray } from 'Lib/utilities';
import { success, failure } from 'Utils/toast';
import get from 'lodash/get';
import set from 'lodash/set';
import { changeCard } from 'Src/newRedux/database/cards/actions';
import { changeTopic } from 'Src/newRedux/database/topics/actions';
import { returnRecordWithNewAttributes } from 'Lib/utilities';
import { addComments, changeComment, deleteComment } from './actions';
import api from './apiCalls';
import {
  deNormalizeComment,
  normalizeComment,
  normalizeComments
} from './schema';
import { getCard, updateCard } from 'Src/newRedux/database/cards/thunks';

export const updateCardComments = ({ cardId }) => async (
  dispatch,
  getState
) => {
  const card = stateMappings(getState()).cards[cardId];
  const stateComments = stateMappings(getState()).comments;
  const comments = get(card, 'attributes.comments.data');
  const cardComments = Object.keys(stateComments).map(key => {
    if (
      String(stateComments[key].attributes.commentable_id) == String(cardId)
    ) {
      return stateComments[key];
    }
  });

  const newComments = comments.filter(
    c => !cardComments.some(cc => cc.id == c.id)
  );
  const commentsData = { data: { data: {} } };
  newComments.forEach(c => {
    commentsData.data.data[c.id] = c;
  });
  dispatch(addComments(normalizeComments(commentsData).comments));
};

export const createCommentForCard = ({ newComment, cardId }) => async (
  dispatch,
  getState
) => {
  try {
    const newServerComment = await api.postCommentOnCard(newComment, cardId);
    // new comment will be received by graphql subscription
    success('New comment created!');
    return newServerComment;
  } catch (error) {
    failure('Unable to save new comment');
    return null;
  }
};

export const createCommentForTopic = ({ newComment, topicId }) => async (
  dispatch,
  getState
) => {
  try {
    const topic = stateMappings(getState()).topics[topicId];
    const topicUpdate = returnRecordWithNewAttributes({
      record: topic,
      attributes: ['attributes.comments_count'],
      values: [topic.attributes.comments_count + 1]
    });

    const newServerComment = await api.postCommentOnTopic(newComment, topicId);
    const commentData = {
      comments: {
        [newServerComment.data.id]: {
          id: newServerComment.data.id,
          type: 'comment',
          attributes: newServerComment.data
        }
      }
    };
    dispatch(changeTopic(topicUpdate));
    dispatch(addComments(commentData.comments));
    success('New comment created!');
    return newServerComment;
  } catch (error) {
    failure('Unable to save new comment');
    return null;
  }
};

export const getComment = commentId => async (dispatch, getState) => {
  try {
    const commentData = await api.fetchComment(commentId);
    dispatch(addComments(normalizeComment(commentData).comments));
    return commentData;
  } catch (error) {
    failure('Unable to load comment');
    return null;
  }
};

export const getCommentsForCardId = ({ card }) => async (
  dispatch,
  getState
) => {
  try {
    // const commentsData = await api.fetchCardComments(cardId);
    const comments = get(card, 'attributes.comments.data');
    const commentsData = { data: { data: {} } };
    comments.forEach(c => {
      commentsData.data.data[c.id] = c;
    });
    dispatch(addComments(normalizeComments(commentsData).comments));
    return commentsData;
  } catch (error) {
    failure('Unable to load comments');
    return null;
  }
};

export const getCommentsForTopicId = ({ topic }) => async (
  dispatch,
  getState
) => {
  try {
    // const commentsData = await api.fetchTopicComments(topicId);
    const comments = get(topic, 'attributes.comments.data');
    const commentsData = { data: { data: {} } };
    comments.forEach(c => {
      commentsData.data.data[c.id] = c;
    });
    dispatch(addComments(normalizeComments(commentsData).comments));
    return commentsData;
  } catch (error) {
    failure('Unable to load comments');
    return null;
  }
};

export const removeComment = commentId => async (dispatch, getState) => {
  const thisComment = stateMappings(getState()).comments[commentId];
  dispatch(deleteComment(commentId));

  try {
    await api.deleteComment(commentId);
  } catch (error) {
    failure('Unable to remove comment');
    dispatch(addComments({ [thisComment.id]: thisComment }));
  }
};

export const updateComment = ({ attributes, id, relationships }) => async (
  dispatch,
  getState
) => {
  const prevVersion = { ...getState()._newReduxTree.database.comments[id] };

  const newVersion = {
    ...prevVersion,
    attributes: { ...prevVersion.attributes, ...attributes },
    relationships: { ...prevVersion.relationships, ...relationships }
  };
  dispatch(changeComment(newVersion));

  try {
    await api.patchComment(deNormalizeComment(newVersion));
  } catch (error) {
    failure('Unable to save comment changes');
    dispatch(changeComment(prevVersion));
  }
};
