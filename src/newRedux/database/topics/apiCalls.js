//This file holds the API calls that hit the /tips route for DRY purposes
import { ApiRequest } from 'Lib/ApiRequest';

export const deleteTopic = async topicId =>
  ApiRequest.request({
    method: 'DELETE',
    url: `topics/${topicId}`
  });

export const deleteTopicAndMoveContent = async (topicId, destinationTopicId) =>
  ApiRequest.request({
    method: 'DELETE',
    url: `topics/${topicId}`,
    data: {
      data: {
        alternate_topic_id: destinationTopicId,
        move_tip_ids: 'all'
      }
    }
  });

export const fetchTopic = async ({ topicSlug, topicId }) =>
  ApiRequest.request({
    method: 'GET',
    url: `topics/${topicSlug ? topicSlug : topicId}`
  });

export const fetchTopics = async fetchQuery =>
  ApiRequest.request({
    method: 'GET',
    // url: `topics?with_permissions=true${fetchQuery}&with_details=true`
    url: `topics?with_details=true${fetchQuery}`
  });

export const patchTopic = async topic => {
  return ApiRequest.request({
    method: 'PATCH',
    url: `topics/${topic.id}`,
    data: {
      data: topic
    }
  });
};

export const postActionOnTopic = async ({ topicId, action, data }) =>
  ApiRequest.request({
    method: 'POST',
    url: `topics/${topicId}/${action}`,
    data
  });

export const postTopic = async (newTopic, includeOptions) => {
  let data = {
    data: {
      type: 'topics',
      ...newTopic
    }
  };
  if (includeOptions) {
    const {
      subviews,
      cards_in_view,
      nested_cards,
      existing_topic_id
    } = includeOptions;
    data.data.include_options = {
      subviews: subviews,
      cards_in_view: cards_in_view,
      nested_cards: nested_cards,
      copy_type: 'topic',
      existing_topic_id: existing_topic_id
    };
  }
  return ApiRequest.request({
    method: 'POST',
    url: `topics`,
    data: data
  });
};

export const postTopicDesign = async newTopicDesign =>
  ApiRequest.request({
    method: 'POST',
    url: 'topic_designs',
    data: {
      data: { attributes: newTopicDesign }
    }
  });

export const removeDesign = async (
  topicId,
  { removeTopicDesign, removeDefaultDesign }
) => {
  return ApiRequest.request({
    method: 'PATCH',
    url: `topics/${topicId}/remove_design`,
    params: {
      remove_topic_design: removeTopicDesign,
      remove_default_design: removeDefaultDesign
    }
  });
};

export const updateTopicDesign = async updateDesign =>
  ApiRequest.request({
    method: 'PUT',
    url: `topic_designs/${updateDesign.id}`,
    data: {
      data: { attributes: updateDesign }
    }
  });

export const deleteTopicDesign = async id =>
  ApiRequest.request({
    method: 'DELETE',
    url: `topic_designs/${id}`
  });

export const activateDesign = async id =>
  ApiRequest.request({
    method: 'POST',
    url: `topic_designs/${id}/activate_topic_design_for_user`
  });

export const defaultDesign = async ({ design_id, topic_id }) =>
  ApiRequest.request({
    method: 'POST',
    url: `topics/${topic_id}/assign_default_design`,
    data: {
      data: {
        attributes: {
          default_design_id: design_id
        }
      }
    }
  });

export const toggleUiSettings = async ({ type, topicId, userId, uiData }) =>
  ApiRequest.request({
    method: 'POST',
    url: `topics/${topicId}/${type.action}_ui_settings`,
    data: {
      id: topicId,
      user_id: userId,
      data: {
        attributes: {
          user_attributes: {
            id: userId
          }
        },
        ui_settings: {
          [type.name]: [uiData]
        }
      }
    }
  });

export const updateUiSettings = async (id, payload, lens_id) =>
  ApiRequest.request({
    method: 'PUT',
    url: `user_configurations/${id}`,
    data: { data: { ui_settings: payload, lens_id } }
  });

export const updatePinLensSettings = async (id, payload) =>
  ApiRequest.request({
    method: 'PUT',
    url: `user_configurations/${id}`,
    data: payload
  });

export const postFilterSettings = async ({
  filter_settable_type,
  filter_settable_id,
  attributes
}) =>
  ApiRequest.request({
    method: 'POST',
    url: 'filter_settings',
    data: {
      no_config: true,
      filter_settable_type,
      filter_settable_id,
      data: { attributes }
    }
  });

export const deleteFilterSettings = async id =>
  ApiRequest.request({
    method: 'DELETE',
    url: `filter_settings/${id}`
  });

export const updateFilterSettings = async (id, payload, lens_id) =>
  ApiRequest.request({
    method: 'PUT',
    url: `filter_settings/${id}`,
    data: { data: { attributes: payload }, lens_id }
  });

export const updateGroupSettings = async (id, group_settings, lens_id) =>
  ApiRequest.request({
    method: 'POST',
    url: 'update_group_settings',
    data: {
      data: {
        attributes: {
          configurable_type: 'Topic',
          configurable_id: id,
          group_settings
        },
        lens_id
      }
    }
  });

export const selectCustomLens = async (
  id,
  current_active_lens_id,
  current_active_template
) =>
  ApiRequest.request({
    method: 'POST',
    url: `user_configurations/${id}/activate`,
    data: {
      data: {
        attributes: {
          current_active_lens_id,
          current_active_template
        }
      }
    }
  });

export const copyTopic = async topicId => {
  return ApiRequest.request({
    method: 'GET',
    url: `topics/${topicId}/copy`
  });
};

export const createDefaultTopic = async () =>
  ApiRequest.request({
    method: 'POST',
    url: 'topics/create_default_topic'
  });

export default {
  updatePinLensSettings,
  selectCustomLens,
  updateGroupSettings,
  updateFilterSettings,
  updateUiSettings,
  defaultDesign,
  activateDesign,
  deleteTopicDesign,
  updateTopicDesign,
  postTopicDesign,
  deleteTopic,
  deleteTopicAndMoveContent,
  fetchTopic,
  fetchTopics,
  patchTopic,
  postActionOnTopic,
  postTopic,
  toggleUiSettings,
  copyTopic,
  createDefaultTopic,
  removeDesign
};
