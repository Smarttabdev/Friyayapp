import { CancelToken } from 'axios';
import { ApiRequest } from '../lib/ApiRequest';
import { merge } from 'ramda';
import getUrlParams from '../utils/getUrlParams';
import { failure } from 'Utils/toast';
import uniqueId from 'lodash/uniqueId';

import {
  GET_ACTIVITIES_SUCCESS,
  GET_ACTIVITIES_REQUEST,
  SELECTION
} from 'AppConstants';
import { MENU_FILTER as FILTER } from 'Enums';

let getPeopleCancel = null;
let peopleCancelId = null;
let getUserByIdCancel = null;
let userByIdCancelId = null;

const defaultOptions = merge({
  with_details: true,
  filter: {
    users: FILTER.ALL,
    is_active: true
  },
  page: {
    number: 1,
    size: 25
  }
});

export const activities = payload => async dispatch => {
  dispatch({ type: GET_ACTIVITIES_REQUEST });
  try {
    const {
      data: { data }
    } = await ApiRequest.request({
      url: `activities${payload.topicId ? `?topic_id=${payload.topicId}` : ''}${
        payload.size ? `&page[size]=${payload.size}` : ''
      }`
    }).catch(err => {});
    dispatch({ type: GET_ACTIVITIES_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
  } finally {
    // empty
  }
};

export const setSelection = value => dispatch =>
  dispatch({ type: SELECTION, payload: value });
