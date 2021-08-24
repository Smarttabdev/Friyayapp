import { ApiRequest } from 'Lib/ApiRequest';

export const fetchLenses = async () =>
  ApiRequest.request({
    method: 'GET',
    url: 'lens'
  });

export const createCustomLens = async ({ title, id, topicId }) =>
  ApiRequest.request({
    method: 'POST',
    url: 'lens',
    data: {
      data: {
        attributes: {
          title,
          kind: topicId ? 'topic' : 'domain'
        },
        relationships: {
          user_configuration: {
            data: {
              id
            }
          }
        }
      }
    }
  });

export const deleteLens = async id =>
  ApiRequest.request({
    method: 'DELETE',
    url: `lens/${id}`
  });

export const updateLens = async (id, payload) =>
  ApiRequest.request({
    method: 'PUT',
    url: `lens/${id}`,
    data: {
      data: {
        attributes: payload
      }
    }
  });
