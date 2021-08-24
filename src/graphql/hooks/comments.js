import { useEffect } from 'react';
import {
  addComments,
  deleteComment,
  changeComment
} from 'Src/newRedux/database/comments/actions';
import store from 'Src/store/store';

export const useCommentSubscriptions = commentableId => {
  useEffect(() => {
    if (!commentableId) return;

    const disposers = [
      requestSubscription({
        subscription: graphql`
          subscription commentsCommentCreatedSubscription($commentableId: ID!) {
            commentCreated(commentableId: $commentableId) {
              comments {
                id
                jsonApi
              }
              comment {
                id
                jsonApi
              }
            }
          }
        `,
        vars: { commentableId },
        onNext: data => {
          if (data.commentCreated.comments) {
            const comments = {};
            data.commentCreated.comments
              .map(comment => comment.jsonApi.data)
              .forEach(comment => (comments[comment.id] = comment));
            store.dispatch(addComments(comments));
          } else if (data.commentCreated.comment) {
            const comment = data.commentCreated.comment.jsonApi.data;
            store.dispatch(addComments({ [comment.id]: comment }));
          }
        }
      }),
      requestSubscription({
        subscription: graphql`
          subscription commentsCommentUpdatedSubscription($commentableId: ID!) {
            commentUpdated(commentableId: $commentableId) {
              comment {
                id
                jsonApi
              }
            }
          }
        `,
        vars: { commentableId },
        onNext: data =>
          data.commentUpdated.comment &&
          store.dispatch(
            changeComment(data.commentUpdated.comment.jsonApi.data)
          )
      }),
      requestSubscription({
        subscription: graphql`
          subscription commentsCommentDeletedSubscription($commentableId: ID!) {
            commentDeleted(commentableId: $commentableId) {
              commentId
            }
          }
        `,
        vars: { commentableId },
        onNext: data =>
          data.commentDeleted.commentId &&
          store.dispatch(deleteComment(data.commentDeleted.commentId))
      })
    ];
    return () => disposers.forEach(d => d.dispose());
  }, [commentableId]);
};
