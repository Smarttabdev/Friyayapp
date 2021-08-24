import actionTypes from './actionEnum';
import omit from 'lodash/omit';
import isObject from 'lodash/isObject';
import set from 'lodash/set';
import get from 'lodash/get';
import isUndefined from 'lodash/isUndefined';
import merge from 'lodash/merge';
import mergeWith from 'lodash/mergeWith';

const defaultState = {};

const addTopicDesign = (state, { data }) => {
  const designTopic = JSON.parse(
    JSON.stringify(state[data.attributes.topic_id])
  );
  designTopic.attributes.topic_designs = [
    ...designTopic.attributes.topic_designs,
    { id: data.id, ...data.attributes }
  ];
  return designTopic;
};

const updateTopicDesign = (state, payload) => {
  const designTopic = JSON.parse(JSON.stringify(state[payload.topic_id]));
  const index = designTopic.attributes.topic_designs.findIndex(
    d => Number(d.id) === Number(payload.id)
  );
  designTopic.attributes.topic_designs[index] = {
    ...designTopic.attributes.topic_designs[index],
    ...payload
  };
  return designTopic;
};

const deleteTopicDesign = (state, payload) => {
  const designTopic = JSON.parse(JSON.stringify(state[payload.topic_id]));
  const index = designTopic.attributes.topic_designs.findIndex(
    d => Number(d.id) === Number(payload.id)
  );
  designTopic.attributes.topic_designs.splice(index, 1);
  return designTopic;
};

const activateTopicDesign = (state, payload) => {
  const designTopic = JSON.parse(
    JSON.stringify(state[payload.data.relationships.topic.data.id])
  );
  designTopic.attributes.topic_design_id_for_current_user =
    payload.data.attributes.topic_design_id;
  return designTopic;
};

const setDefaultDesign = (state, payload) => {
  const designTopic = JSON.parse(JSON.stringify(state[payload.topic_id]));
  designTopic.attributes.default_design_id = payload.design_id;
  return designTopic;
};

const updateUISettings = (state, payload) => {
  let ui_settings = get(
    state[payload.topicId],
    'attributes.user_configuration.data.attributes.ui_settings'
  );
  ui_settings = { ...ui_settings, ...payload.ui_settings };
  const topic = set(
    state[payload.topicId],
    'attributes.user_configuration.data.attributes.ui_settings',
    ui_settings
  );
  return topic;
};

const updateFilterSettings = (state, payload) => {
  let filter_setting = get(
    state[payload.topicId],
    'attributes.user_configuration.data.attributes.filter_setting'
  );
  filter_setting = { ...filter_setting, ...payload.filter_setting };
  const topic = set(
    state[payload.topicId],
    'attributes.user_configuration.data.attributes.filter_setting',
    filter_setting
  );
  topic.attributes.user_configurations?.data?.find(config => {
    if (config.attributes.filter_setting.id == filter_setting.id) {
      config.attributes.filter_setting = { ...filter_setting };
      return true;
    }
  });
  return topic;
};

const updateOrderSettings = (state, payload) => {
  let orders = get(
    state[payload.topicId],
    'attributes.user_configuration.data.attributes.orders'
  );
  orders = { ...orders, ...payload.orders };
  const topic = set(
    state[payload.topicId],
    'attributes.user_configuration.data.attributes.orders',
    orders
  );
  return topic;
};

const updateGroupSettings = (state, payload) => {
  let group_settings = get(
    state[payload.topicId],
    'attributes.user_configuration.data.attributes.group_settings'
  );
  group_settings = [...payload.group];
  const topic = set(
    state[payload.topicId],
    'attributes.user_configuration.data.attributes.group_settings',
    group_settings
  );
  return topic;
};

const setCustomLens = (state, payload) => {
  const topic = JSON.parse(JSON.stringify(state[payload.topicId]));
  set(
    topic,
    'attributes.user_configuration.data.attributes',
    payload.attributes
  );
  return topic;
};

const addMissingTopics = (state, payload) => {
  if (isObject(payload)) {
    Object.keys(payload).forEach(key => {
      if (get(payload[key], 'attributes.title') == 'Chat room') {
        payload[key].attributes.title = 'Chat Board';
      } else if (get(payload[key], 'attributes.title') == 'Video Chat room') {
        payload[key].attributes.title = 'Video Chat Board';
      }
      if (key != payload[key].attributes.parent_id) {
        if (!state[key]) {
          state[key] = payload[key];
        } else {
          state[key] = merge(payload[key], state[key]);
        }
      }
    });
  }
  return { ...state };
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.add:
      // using merge as records come without attributes from index route
      // adding mergewith as arrays got merged when should be replaced
      // eg. when reducing the number of users shared with.
      return addMissingTopics(state, action.payload);

    case actionTypes.change:
    case actionTypes.changeMany:
      return { ...state, ...action.payload };

    case actionTypes.delete:
      return omit(state, [action.payload]);

    case actionTypes.replace:
      return {
        ...omit(state, [action.payload.replaceId]),
        ...action.payload.replacement
      };

    case actionTypes.addDesign:
      return {
        ...state,
        [action.payload.data.attributes.topic_id]: addTopicDesign(
          state,
          action.payload
        )
      };

    case actionTypes.updateDesign:
      return {
        ...state,
        [action.payload.topic_id]: updateTopicDesign(state, action.payload)
      };

    case actionTypes.deleteDesign:
      return {
        ...state,
        [action.payload.topic_id]: deleteTopicDesign(state, action.payload)
      };

    case actionTypes.activateDesign:
      return {
        ...state,
        [action.payload.data.relationships.topic.data.id]: activateTopicDesign(
          state,
          action.payload
        )
      };

    case actionTypes.setDefaultDesign:
      return {
        ...state,
        [action.payload.topic_id]: setDefaultDesign(state, action.payload)
      };
    case actionTypes.updateUISettings:
      return {
        ...state,
        [action.payload.topicId]: updateUISettings(state, action.payload)
      };
    case actionTypes.updateFilterSettings:
      return {
        ...state,
        [action.payload.topicId]: updateFilterSettings(state, action.payload)
      };
    case actionTypes.updateOrderSettings:
      return {
        ...state,
        [action.payload.topicId]: updateOrderSettings(state, action.payload)
      };
    case actionTypes.updateGroupSettings:
      return {
        ...state,
        [action.payload.topicId]: updateGroupSettings(state, action.payload)
      };
    case actionTypes.setCustomLens:
      return {
        ...state,
        [action.payload.topicId]: setCustomLens(state, action.payload)
      };
    default:
      return state;
  }
};

export default reducer;
