//This file holds the API calls that hit the /tips route for DRY purposes
import { ApiRequest } from 'Lib/ApiRequest';

export const assignTipToUser = async (tipId, userId) => {
  ApiRequest.request({
    method: 'POST',
    url: `tip_assignments?tip_id=${tipId}&user_id=${userId}`
  });
};

export const deleteCard = async cardId =>
  ApiRequest.request({
    method: 'DELETE',
    url: `tips/${cardId}`
  });

export const fetchCard = async cardId =>
  ApiRequest.request({
    method: 'GET',
    url: `tips/${cardId}`
  });

export const fetchCards = async fetchQuery =>
  ApiRequest.request({
    method: 'GET',
    url: `tips?page[size]=30&include=share_settings${fetchQuery}`
  });

export const patchCard = async card => {
  return ApiRequest.request({
    method: 'PATCH',
    url: `tips/${card.id}`,
    data: {
      data: card,
      include: 'share_settings'
    }
  });
};

export const postActionOnCard = async (cardId, action, uploadData = {}) =>
  ApiRequest.request({
    method: 'POST',
    url: `tips/${cardId}/${action}`,
    data: uploadData
  });

export const postCard = async (newCard, domain) => {
  if (domain) {
    ApiRequest.defaults.headers.common['X-Tenant-Name'] =
      domain.attributes.name;
  } else {
    delete ApiRequest.defaults.headers.common['X-Tenant-Name'];
  }
  return ApiRequest.request({
    method: 'POST',
    url: 'tips',
    data: {
      data: newCard
    }
  });
};

export const fetchVersions = async cardId =>
  ApiRequest.request({
    method: 'GET',
    url: `tips/versions/${cardId}`
  });

export const addLogTime = async (tip_id, data) =>
  ApiRequest.request({
    method: 'POST',
    url: `tips/${tip_id}/log_times`,
    data: { data }
  });

export const updateLogTime = async (tip_id, data) =>
  ApiRequest.request({
    method: 'PUT',
    url: `tips/${tip_id}/log_times/${data.id}`,
    data: { data }
  });

export const unarchiveCard = async tip_id =>
  ApiRequest.request({
    method: 'POST',
    url: `tips/${tip_id}/unarchive`
  });

export const copyCard = async tip_id =>
  ApiRequest.request({
    method: 'GET',
    url: `tips/${tip_id}/copy`
  });

export default {
  unarchiveCard,
  assignTipToUser,
  deleteCard,
  fetchCard,
  fetchCards,
  patchCard,
  postActionOnCard,
  postCard,
  fetchVersions,
  addLogTime,
  updateLogTime,
  copyCard
};
