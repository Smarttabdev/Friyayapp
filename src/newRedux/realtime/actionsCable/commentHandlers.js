import { get, set, merge } from 'lodash';

import { stateMappings } from 'Src/newRedux/stateMappings';
import {
  addComments,
  changeComment,
  deleteComment
} from 'Src/newRedux/database/comments/actions';
import { changeCard } from 'Src/newRedux/database/cards/actions';

export default (message, dispatch, getState) => ({
  comment_created: () => {
    const { data: comment } = message.data;
    const { cards } = stateMappings(getState());

    const card = cards[comment.attributes.commentable_id];

    const comments = get(card, 'attributes.comments.data', []);

    if (comments.find(m => m.id == comment.id)) {
      return;
    }

    set(card, 'attributes.comments.data', comments);
    const commentData = { comments: { [comment.id]: comment } };

    dispatch(changeCard(card));
    dispatch(addComments(commentData.comments));
  },
  comment_updated: () => {
    const { data: comment } = message.data;
    const { cards } = stateMappings(getState());

    const card = cards[comment.attributes.commentable_id];

    const comments = get(card, 'attributes.comment.data', []);

    if (comments.find(c => c.id == comment.id)) {
      const updatedCard = merge({}, card, {
        attributes: {
          comments: {
            data: comments.map(c => {
              return c.id == comment.id ? comment : c;
            })
          }
        }
      });
      dispatch(changeComment(comment));
      dispatch(changeCard(updatedCard));
    }
  },
  comment_deleted: () => {
    const { tip_id: cardId, comment_id: commentId } = message.data;
    const { cards } = stateMappings(getState());

    const card = cards[cardId];

    const comments = get(card, 'attributes.comments.data', []);

    if (comments.find(c => c.id == commentId)) {
      const updatedCard = {
        ...card,
        attributes: {
          ...card.attributes,
          comments: {
            data: comments.filter(c => c.id != commentId)
          }
        }
      };
      dispatch(deleteComment(commentId));
      dispatch(changeCard(updatedCard));
    }
  }
});
