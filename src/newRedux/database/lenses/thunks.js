import * as actions from './actions';
import * as apiCalls from './apiCalls';
import { normalize, schema } from 'normalizr';
import { failure } from 'Utils/toast';
import { logRollBarError } from 'Lib/rollbar';
import { batchActions } from 'redux-batch-enhancer';
import get from 'lodash/get';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { getUserConfig } from 'Src/helpers/user_config';
import { selectCustomDomainLens } from '../domains/thunks';
import { selectCustomTopicLens } from '../topics/thunks';
import { setRightMenuOpenForMenu } from 'Src/newRedux/interface/menus/actions';

const dbRecord = new schema.Entity('tools');

export const fetchLenses = () => async dispatch => {
  try {
    const tools = await apiCalls.fetchLenses();
    const normalizedLens = normalize(tools.data, { data: [dbRecord] }).entities
      .tools;
    dispatch(actions.fetchLenses(normalizedLens));
  } catch (error) {
    failure('Unable fetch tools');
    logRollBarError(error, 'warning', 'Fetch tools error');
    return null;
  }
};

export const createCustomLens = ({ title }) => async (dispatch, getState) => {
  try {
    const sm = stateMappings(getState());
    const topicId = sm.page.topicId;
    const { id } = getUserConfig(getState());
    const tool = await apiCalls.createCustomLens({ title, id, topicId });

    dispatch(
      batchActions([
        actions.createLens(get(tool, 'data.data')),
        topicId
          ? selectCustomTopicLens({
              current_active_lens_id: get(tool, 'data.data.id'),
              id
            })
          : selectCustomDomainLens({
              current_active_lens_id: get(tool, 'data.data.id'),
              id
            })
      ])
    );
    return tool.data.data.id;
  } catch (error) {
    failure('Unable to create tools');
    logRollBarError(error, 'warning', 'Create tools error');
    return null;
  }
};

export const selectCustomLens = payload => (dispatch, getState) => {
  const sm = stateMappings(getState());
  const topicId = sm.page.topicId;
  if (topicId) {
    return dispatch(selectCustomTopicLens(payload));
  }
  return dispatch(selectCustomDomainLens(payload));
};

export const deleteLens = id => async dispatch => {
  try {
    await apiCalls.deleteLens(id);
    dispatch(actions.deleteLens(id));
    return;
  } catch (error) {
    failure('Unable to delete tools');
    logRollBarError(error, 'warning', 'Delete tools error');
    return null;
  }
};

export const updateLens = (id, payload) => async dispatch => {
  try {
    dispatch(actions.updateLens({ id, attributes: payload }));
    await apiCalls.updateLens(id, payload);
    return;
  } catch (error) {
    failure('Unable to update tools');
    logRollBarError(error, 'warning', 'Update tools error');
    return null;
  }
};
