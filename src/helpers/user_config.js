import { stateMappings } from 'Src/newRedux/stateMappings';
import {
  getTopicUISettings,
  getTopicFilters,
  getTopicCustomLensId,
  getTopicUserConfig
} from 'Src/newRedux/database/topics/selectors';
import {
  getDomainUISettings,
  getDomainFilters,
  getDomainCustomLensId,
  getDomainUserConfig
} from 'Src/newRedux/database/domains/selectors';
import {
  setTopicUiSettings,
  setTopicFilterSettings
} from 'Src/newRedux/database/topics/thunks';
import {
  setDomainUiSettings,
  setDomainFilterSettings
} from 'Src/newRedux/database/domains/thunks';

export const getUiSettings = (state, topicId) => {
  const sm = stateMappings(state);
  if (topicId || sm.page.topicId) {
    return getTopicUISettings(state, topicId);
  } else {
    return getDomainUISettings(state);
  }
};

export const getFilterSettings = (state, topicId) => {
  const sm = stateMappings(state);
  if (topicId || sm.page.topicId) {
    return getTopicFilters(state, topicId);
  } else {
    return getDomainFilters(state);
  }
};

export const getCustomLensId = (state, topicId) => {
  const sm = stateMappings(state);
  if (topicId || sm.page.topicId) {
    return getTopicCustomLensId(state, topicId);
  } else {
    return getDomainCustomLensId(state);
  }
};

export const getUserConfig = (state, topicId) => {
  const sm = stateMappings(state);
  if (topicId || sm.page.topicId) {
    return getTopicUserConfig(state, topicId || sm.page.topicId);
  } else {
    return getDomainUserConfig(state);
  }
};

export const setUserUiSettings = (ui_settings, topic_id) => (
  dispatch,
  getState
) => {
  const sm = stateMappings(getState());
  if (sm.page.topicId || topic_id) {
    dispatch(setTopicUiSettings(ui_settings, topic_id));
  } else {
    dispatch(setDomainUiSettings(ui_settings));
  }
};

export const setUserFilterSettings = (filter_settings, topicId) => (
  dispatch,
  getState
) => {
  const sm = stateMappings(getState());
  if (topicId || sm.page.topicId) {
    dispatch(setTopicFilterSettings(filter_settings, topicId));
  } else {
    dispatch(setDomainFilterSettings(filter_settings));
  }
};
