import { ApiRequest } from 'Lib/ApiRequest';

export const fetchActivities = async ({ from, to }) =>
  ApiRequest.request({
    method: 'GET',
    url: `activities${
      from ? `?from=${from}${to ? `&to=${to}` : ''}` : ''
    }&page[size]=100`
  });
