import actionTypes from './actionEnum';
import { reNormalizeArrayOfRecords } from 'Lib/utilities';

export const addTopics = normalizedTopics => ({
  type: actionTypes.add,
  payload: normalizedTopics
});

export const deleteTopic = topicId => ({
  type: actionTypes.delete,
  payload: topicId
});

export const changeTopic = topic => ({
  type: actionTypes.change,
  payload: {
    [topic.id]: topic
  }
});

export const changeTopics = topics => ({
  type: actionTypes.changeMany,
  payload: reNormalizeArrayOfRecords(topics)
});

export const replaceTopic = (replaceTopicId, replacementTopic) => ({
  type: actionTypes.replace,
  payload: {
    replaceId: replaceTopicId,
    replacement: {
      [replacementTopic.id]: replacementTopic
    }
  }
});

export const addTopicDesign = topicDesign => ({
  type: actionTypes.addDesign,
  payload: topicDesign
});

export const updateTopicDesign = payload => ({
  type: actionTypes.updateDesign,
  payload
});

export const deleteTopicDesign = topicDesign => ({
  type: actionTypes.deleteDesign,
  payload: topicDesign
});

export const activateTopicDesign = payload => ({
  type: actionTypes.activateDesign,
  payload
});

export const setDefaultDesign = payload => ({
  type: actionTypes.setDefaultDesign,
  payload
});

export const updateUISettings = payload => ({
  type: actionTypes.updateUISettings,
  payload
});

export const updateFilterSettings = payload => ({
  type: actionTypes.updateFilterSettings,
  payload
});

export const updateOrderSettings = payload => ({
  type: actionTypes.updateOrderSettings,
  payload
});

export const updateGroupSettings = payload => ({
  type: actionTypes.updateGroupSettings,
  payload
});

export const setCustomLens = payload => ({
  type: actionTypes.setCustomLens,
  payload
});
