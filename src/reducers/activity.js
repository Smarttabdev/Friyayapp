import { switchcaseF } from './utils';
import {
  GET_ACTIVITIES_FAILURE,
  GET_ACTIVITIES_REQUEST,
  GET_ACTIVITIES_SUCCESS,
  SELECTION
} from 'AppConstants';
const initialState = {
  isLoading: null,
  activities: [],
  selected: true
};

const startActivitiesFetch = state => {
  return {
    ...state,
    isLoading: true,
    activities: []
  };
};

const activitiesFetchSuccess = (state, payload) => {
  return {
    ...state,
    activities: payload,
    isLoading: false
  };
};

const activitiesFetchFailure = (state, payload) => {
  return {
    ...state,
    isLoading: false
  };
};

const menueSelection = (state, payload) => {
  console.log('state: ', state);
  console.log('payload: ', payload);
  return {
    ...state,
    selected: payload
  };
};

const activity = (state = initialState, { type, payload }) =>
  switchcaseF({
    [GET_ACTIVITIES_FAILURE]: activitiesFetchFailure,
    [GET_ACTIVITIES_REQUEST]: startActivitiesFetch,
    [GET_ACTIVITIES_SUCCESS]: activitiesFetchSuccess,
    [SELECTION]: menueSelection
  })(state)(type)(state, payload);

export default activity;
