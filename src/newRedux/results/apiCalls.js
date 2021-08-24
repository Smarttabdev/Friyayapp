import { ApiRequest } from 'Lib/ApiRequest';

export const getResults = ({
  stats,
  assignedIds,
  startDate,
  endDate,
  periodUnit = 'week',
  weekStartDay = moment()
    .startOf('week')
    .day(),
  utcOffset = moment().format('Z')
}) => {
  return ApiRequest.request({
    method: 'GET',
    url: 'users/results',
    params: {
      stats,
      assigned_ids: assignedIds,
      start_date: startDate,
      end_date: endDate,
      period_unit: periodUnit,
      week_start_day: weekStartDay,
      utc_offset: utcOffset
    }
  });
};

export const getProjectResults = ({
  stats,
  topicIds,
  startDate,
  endDate,
  periodUnit = 'week',
  weekStartDay = moment()
    .startOf('week')
    .day(),
  utcOffset = moment().format('Z')
}) => {
  return ApiRequest.request({
    method: 'GET',
    url: 'topics/results',
    params: {
      stats,
      topic_ids: topicIds,
      start_date: startDate,
      end_date: endDate,
      period_unit: periodUnit,
      week_start_day: weekStartDay,
      utc_offset: utcOffset
    }
  });
};
