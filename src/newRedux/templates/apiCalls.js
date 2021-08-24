import { ApiRequest } from 'Lib/ApiRequest';

export const fetchDefaultTemplates = async () =>
  ApiRequest.request({
    method: 'GET',
    url: `topics/default_templates`
  });

export default {
  fetchDefaultTemplates
};
