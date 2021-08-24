import { ApiRequest } from 'Lib/ApiRequest';

export const getStats = ({ periodStart, periodEnd }) => {
  return ApiRequest.request({
    method: 'GET',
    url: `stats?period_start=${periodStart}&period_end=${periodEnd}`
  });
};

export const getDiskUsage = () => {
  return ApiRequest.request({
    method: 'GET',
    url: 'stats/disk_usage'
  });
};

export const getNewUsers = ({
  periodStart,
  periodEnd,
  pageNumber = 1,
  pageSize = 10
}) => {
  return ApiRequest.request({
    method: 'GET',
    url: `stats/new_users?period_start=${periodStart}&period_end=${periodEnd}&page[size]=${pageSize}&page[number]=${pageNumber}`
  });
};

export const getActiveUsers = ({
  periodStart,
  periodEnd,
  signupDateFrom,
  signupDateTo,
  pageNumber = 1,
  pageSize = 10
}) => {
  return ApiRequest.request({
    method: 'GET',
    url: `stats/active_users?page[size]=${pageSize}&page[number]=${pageNumber}`,
    params: {
      period_start: periodStart,
      period_end: periodEnd,
      signup_date_from: signupDateFrom,
      signup_date_to: signupDateTo
    }
  });
};
