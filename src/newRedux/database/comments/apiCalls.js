//This file holds the API calls that hit the /tips route for DRY purposes
import { ApiRequest } from 'Lib/ApiRequest';

export const deleteComment = async commentId =>
  ApiRequest.request({
    method: 'DELETE',
    url: `comments/${commentId}`
  });

export const fetchComment = async commentId =>
  ApiRequest.request({
    method: 'GET',
    url: `comments/${commentId}`
  });

export const fetchCardComments = async cardId =>
  ApiRequest.request({
    method: 'GET',
    url: `comments?tip_id=${cardId}`
  });

export const fetchTopicComments = async topicId =>
  ApiRequest.request({
    method: 'GET',
    url: `comments?topic_id=${topicId}`
  });

export const patchComment = async comment => {
  return ApiRequest.request({
    method: 'PATCH',
    url: `comments/${comment.id}`,
    data: {
      data: comment
    }
  });
};
// export const postComment = async( newComment ) => (
//   ApiRequest.request({
//     method: 'POST',
//     url: `comments`,
//     data: {
//       data: {
//         type: 'comments',
//         ...newComment
//       }
//     }
//   })
// )

export const postCommentOnCard = async (newComment, cardId) =>
  ApiRequest.request({
    method: 'POST',
    url: `comments`,
    data: {
      tip_id: cardId,
      data: newComment
    }
  });

export const postCommentOnTopic = async (newComment, topicId) =>
  ApiRequest.request({
    method: 'POST',
    url: `comments`,
    data: {
      topic_id: topicId,
      data: newComment
    }
  });

export default {
  deleteComment,
  fetchComment,
  fetchCardComments,
  fetchTopicComments,
  patchComment,
  postCommentOnCard,
  postCommentOnTopic
};
