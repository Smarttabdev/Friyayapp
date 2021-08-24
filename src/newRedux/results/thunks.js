import { failure } from 'Utils/toast';
import { denormalize } from 'Lib/utilities';
import { logRollBarError } from 'Lib/rollbar';

import * as api from './apiCalls';
import { setResults } from './actions';

export const getResults = ({
  key,
  stats,
  assignedIds,
  startDate,
  endDate,
  periodUnit
}) => async (dispatch, getState) => {
  try {
    const resp = await api.getResults({
      stats,
      assignedIds,
      startDate,
      endDate,
      periodUnit
    });

    const data = resp.data.data.map(data => ({
      ...data,
      user: denormalize(data.user.data, data.user.included)
    }));

    dispatch(setResults(key, data));
  } catch (error) {
    failure('Unable to fetch results');
    logRollBarError(error, 'error', 'Unable to fetch results');
  }
};

export const getProjectResults = ({
  key,
  stats,
  topicIds,
  startDate,
  endDate,
  periodUnit
}) => async (dispatch, getState) => {
  try {
    const resp = await api.getProjectResults({
      stats,
      topicIds,
      startDate,
      endDate,
      periodUnit
    });

    dispatch(setResults(key, resp.data.data));
  } catch (error) {
    failure('Unable to fetch results');
    logRollBarError(error, 'error', 'Unable to fetch results');
  }
};
