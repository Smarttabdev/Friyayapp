import { ApiRequest } from 'Lib/ApiRequest';

export const fetchPendingEmails = async () =>
  ApiRequest.request({
    method: 'GET',
    url: `invitations/pending`
  });

export default {
  fetchPendingEmails
};
