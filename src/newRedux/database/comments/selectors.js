import { get } from 'lodash';
import { createSelector } from 'reselect';
import { reduceArrayToMappedObjectForAttribute } from 'Lib/utilities';

//note: not sorting comments as their IDs should be a natural chrono sort
const getComments = state => state._newReduxTree.database.comments;

export const getCommentArray = createSelector(
  state => getComments(state),
  comments => Object.values(comments)
);

export const getCardComments = createSelector(getCommentArray, comments =>
  comments.filter(
    comment => get(comment, 'attributes.commentable_type') === 'Tip'
  )
);

export const getTopicComments = createSelector(getCommentArray, comments =>
  comments.filter(
    comment => get(comment, 'attributes.commentable_type') === 'Topic'
  )
);

export const getCommentsByCardId = createSelector(
  state => getCardComments(state),
  comments =>
    reduceArrayToMappedObjectForAttribute(comments, 'attributes.commentable_id')
);

export const getCommentsByTopicId = createSelector(
  state => getTopicComments(state),
  comments =>
    reduceArrayToMappedObjectForAttribute(comments, 'attributes.commentable_id')
);
