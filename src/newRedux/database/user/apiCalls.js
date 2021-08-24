//This file holds the API calls that hit the /user route for DRY purposes
import { ApiRequest } from 'Lib/ApiRequest';

export const fetchUser = async () =>
  ApiRequest.request({
    method: 'GET',
    url: `me`
  });

export const fetchUserFollows = async userId =>
  ApiRequest.request({
    method: 'GET',
    url: `users/${userId}/follows`
  });

export const postOrderChange = async (userId, updateObject) =>
  ApiRequest.request({
    method: 'POST',
    url: `users/${userId}/update_order`,
    data: {
      data: updateObject
    }
  });

export const updateShowTutorialApi = async (userId, show_tutorial) =>
  ApiRequest.request({
    method: 'POST',
    url: `users/${userId}/show_tutorial`,
    data: {
      data: {
        attributes: {
          show_tutorial
        }
      }
    }
  });

export const postUserProfile = async (userId, content) =>
  ApiRequest.request({
    method: 'POST',
    url: `/users/${userId}/user_profile`,
    data: {
      ...content
    }
  });

export const patchUserProfile = async (userId, content) =>
  ApiRequest.request({
    method: 'PATCH',
    url: `/users/${userId}/user_profile`,
    data: {
      ...content
    }
  });

export const patchDefaultPinnedLenses = async (userId, defaultPinnedLenses) =>
  ApiRequest.request({
    method: 'PATCH',
    url: `/users/${userId}/user_profile/default_pinned_lenses`,
    data: {
      default_pinned_lenses: defaultPinnedLenses
    }
  });

export const postUserTokens = async (userId, data) =>
  ApiRequest.request({
    method: 'POST',
    url: '/users/update_integration_tokens',
    data: {
      ...data
    }
  });

export const deleteUserTokens = async provider =>
  ApiRequest.request({
    method: 'POST',
    url: '/users/remove_integration_tokens',
    data: {
      provider
    }
  });

export const fetchUserConfigurations = async (type, id) =>
  ApiRequest.request({
    method: 'GET',
    url: `user_configurations?configurable_type=${type}&configurable_id=${id}`
  });

export const fetchUserOfficeHours = async userId =>
  ApiRequest.request({
    method: 'GET',
    url: `/users/${userId}/office_hours`
  });

export const postUserOfficeHours = async ({
  method,
  userId,
  date,
  hours,
  timezone
}) => {
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];
  const day = daysOfWeek[new Date(date).getDay()];
  const date_slots_attributes = [
    {
      date: date,
      day: day,
      hours: hours
    }
  ];
  const office_hours =
    method == 'POST'
      ? {
          user_id: userId,
          time_slot_in_minutes: 30,
          timezone: timezone,
          date_slots_attributes
        }
      : { date_slots_attributes };

  return ApiRequest.request({
    method: method,
    url: `/users/${userId}/office_hours`,
    data: {
      office_hours
    }
  });
};

export const patchUserOfficeHours = async ({
  userId,
  recurring,
  dateId,
  hours
}) => {
  const date_slots_attributes = [
    {
      id: dateId,
      hours: hours
    }
  ];
  recurring && (date_slots_attributes[0].recurring = true);

  //For deleting
  // const date_slots_attributes = [{
  //   id: dateId,
  //   _destroy: true
  // }];

  return ApiRequest.request({
    method: 'PATCH',
    url: `/users/${userId}/office_hours`,
    data: {
      office_hours: {
        date_slots_attributes
      }
    }
  });
};

export const fetchAllOfficeHours = async () =>
  ApiRequest.request({
    method: 'GET',
    url: '/office_hours'
  });
