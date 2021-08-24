import { stateMappings } from 'Src/newRedux/stateMappings';
import get from 'lodash/get';
import set from 'lodash/set';
import { normalizeUser } from './schema';
import {
  reduceArrayToObjectWithKeyAndValuePair,
  mapRelationship
} from 'Lib/utilities';
import { success, failure } from 'Utils/toast';
import { addUser, changeUser, updateShowTutorialAttribute } from './actions';
import { setLeftMenuOpen } from 'Src/newRedux/interface/menus/actions';
import { logRollBarError, setRollbarUser } from 'Lib/rollbar';
import { addPeople } from 'Src/newRedux/database/people/actions';
import { setDockContents } from 'Src/newRedux/interface/dock/actions';
import {
  setPeopleFilters,
  setTopicFilters
} from 'Src/newRedux/filters/actions';
import { topicFilters } from 'Lib/config/filters/topics';
import { peopleFilters } from 'Lib/config/filters/people';
import { batchActions } from 'redux-batch-enhancer';
import { idFromSlug } from 'Lib/utilities';
import {
  fetchUser,
  fetchUserFollows,
  postOrderChange,
  postUserProfile,
  patchUserProfile,
  postUserTokens,
  deleteUserTokens,
  updateShowTutorialApi,
  fetchUserOfficeHours,
  fetchAllOfficeHours,
  postUserOfficeHours,
  patchUserOfficeHours
} from './apiCalls';

const mapRelationships = user => {
  let mappedData = user;
  for (let relation of ['user_topic_people_order', 'user_topic_label_order']) {
    mappedData.data.data.relationships[relation].data = mapRelationship(
      mappedData.data.data,
      mappedData.data.included,
      relation
    );
  }
  const user_profile = mappedData.data.data.relationships.user_profile.data;
  mappedData.data.data.relationships.user_profile.data = mappedData.data.included.find(
    includedRelation =>
      includedRelation.id === user_profile.id &&
      includedRelation.type === 'user_profiles'
  );
  return mappedData;
};

export const getUser = () => async (dispatch, getState) => {
  try {
    const userData = await fetchUser();
    const userFollows = await fetchUserFollows(userData.data.data.id);
    const normalizedUserWithProfile = normalizeUser(mapRelationships(userData));
    setRollbarUser(userData.data.data);

    const normalizedUser =
      normalizedUserWithProfile.user[
        Object.keys(normalizedUserWithProfile.user)[0]
      ];
    normalizedUser.relationships = {
      ...normalizedUser.relationships,
      ...get(userFollows, 'data.data.relationships')
    };
    normalizedUser.attributes.notification_settings = reduceArrayToObjectWithKeyAndValuePair(
      normalizedUser.attributes.notification_settings,
      'key',
      'value'
    );
    normalizedUser.attributes.ui_settings = reduceArrayToObjectWithKeyAndValuePair(
      normalizedUser.attributes.ui_settings,
      'key',
      'value'
    );
    normalizedUser.attributes.counters =
      normalizedUser.relationships.user_profile.data.attributes.counters;

    const actions = [
      addUser(normalizedUser),
      addPeople(normalizedUserWithProfile.user),
      setLeftMenuOpen(normalizedUser.attributes.ui_settings.left_menu_open),
      setDockContents(normalizedUser.attributes.ui_settings.minimize_dock)
    ];

    // const topicFilter =
    //   normalizedUser.attributes.ui_settings.left_menu_topics_filter;
    // const peopleFilter =
    //   normalizedUser.attributes.ui_settings.left_menu_people_filter;

    // Object.keys(topicFilters).includes(topicFilter) &&
    //   actions.push(setTopicFilters([topicFilter]));
    // Object.keys(peopleFilters).includes(peopleFilter) &&
    //   actions.push(setPeopleFilters([peopleFilter]));

    dispatch(batchActions(actions));
  } catch (error) {
    failure('Unable to load user details');
    // logRollBarError( error, 'error', 'Unable to load user details' );
  }
};

export const setUserWorkspaceOrderSettings = orders => async dispatch => {
  try {
    return dispatch(
      changeUser({
        attributes: { ...orders },
        relationships: {}
      })
    );
  } catch (error) {
    failure('Unable to update workspace order settings');
    logRollBarError(error, 'warning', 'Update Order Error');
    return null;
  }
};

export const updateUserDefaultOrder = ({ orderType, orderValue }) => async (
  dispatch,
  getState
) => {
  const sm = stateMappings(getState());
  const userId = sm.user.id;
  const reduxUpdate = { [orderType]: { data: orderValue } };
  const serverUpdate = {
    id: orderValue,
    type: orderType == 'topic_orders' ? orderType : `${orderType}s`
  };

  try {
    dispatch(changeUser({ relationships: reduxUpdate }));
    await postOrderChange(userId, serverUpdate);
  } catch (error) {
    logRollBarError(error, 'warning', 'Error posting order change');
  }
};

export const updateUserDefaultOrderForTopic = ({ order, update }) => async (
  dispatch,
  getState
) => {
  const sm = stateMappings(getState());
  const userId = sm.user.id;

  const currentOrders = sm.user.relationships[order].data;
  const reduxUpdate = [
    ...currentOrders.filter(order => order.topic_id !== update.topic_id),
    update
  ];
  const relationships = {};
  set(relationships, `${order}.data`, reduxUpdate);
  try {
    dispatch(changeUser({ relationships }));
    await postOrderChange(userId, update);
  } catch (error) {
    logRollBarError(error, 'warning', 'Error posting order change');
  }
};

export const updateSelectedCard = selectedCardId => async (
  dispatch,
  getState
) => {
  if (selectedCardId.includes('-')) {
    selectedCardId = idFromSlug(selectedCardId);
  }

  const user = stateMappings(getState()).user;

  return dispatch(
    changeUser({
      attributes: {
        ui_settings: { ...user.attributes.ui_settings, selectedCardId }
      }
    })
  );
};

export const updateUserProfile = (userId, userProfile) => async (
  dispatch,
  getState
) => {
  try {
    const { user } = stateMappings(getState());

    dispatch(
      changeUser({
        attributes: {
          user_profile: {
            ...user.attributes.user_profile,
            ...userProfile
          }
        }
      })
    );
    await patchUserProfile(userId, {
      data: {
        attributes: userProfile
      }
    });
  } catch (error) {
    failure('There was a problem saving your changes');
    logRollBarError(error, 'warning', 'Error in updateUserProfile');
  }
};

export const updateUserUiSettings = ({ newSettings }) => async (
  dispatch,
  getState
) => {
  const user = stateMappings(getState()).user;
  const userId = user.attributes.id;
  const userProfileId = user.attributes.user_profile_id;
  const newUiSettings = {
    ui_settings: newSettings
  };

  dispatch(
    changeUser({
      attributes: {
        ui_settings: { ...user.attributes.ui_settings, ...newSettings }
      }
    })
  );

  const userUiSettingsPost = util_UserProfilePostContent({
    userId,
    userProfileId,
    updatedContent: newUiSettings
  });
  try {
    await postUserProfile(userId, userUiSettingsPost);
  } catch (error) {
    failure('There was a problem saving your changes');
    logRollBarError(error, 'warning', 'Error in updateUserUiSettings');
  }
};

export const updateShowTutorial = showTutorial => async (
  dispatch,
  getState
) => {
  const user = stateMappings(getState()).user;
  dispatch(
    updateShowTutorialAttribute({
      attributes: {
        show_tutorial: showTutorial
      }
    })
  );
  try {
    await updateShowTutorialApi(user.id, showTutorial);
  } catch (error) {
    failure('There was a problem hiding the tutorial');
    logRollBarError(error, 'warning', 'Error in updateShowTutorial');
  }
};

export const updateUserIntegrationTokens = tokens => async (
  dispatch,
  getState
) => {
  try {
    const user = getState().appUser;
    const userId = user.id;
    await postUserTokens(userId, tokens);
    let userAttributes = { attributes: {} };
    if (tokens.provider == 'google') {
      userAttributes.attributes = {
        google_drive_access_token: tokens.access_token,
        google_drive_refresh_token: tokens.refresh_token
      };
    } else if (tokens.provider == 'dropbox') {
      userAttributes.attributes = {
        dropbox_access_token: tokens.access_token
      };
    }
    dispatch(changeUser(userAttributes));
  } catch (err) {
    failure('unable to save access token to databse');
  }
};

export const deleteUserIntegrationToken = provider => async dispatch => {
  try {
    await deleteUserTokens(provider);
    let userAttributes = { attributes: {} };
    if (provider == 'google') {
      userAttributes.attributes = {
        google_drive_access_token: null,
        google_drive_refresh_token: null
      };
    } else if (provider == 'dropbox') {
      userAttributes.attributes = {
        dropbox_access_token: null
      };
    }
    dispatch(changeUser(userAttributes));
    success(`Disconnected from ${provider}`);
  } catch (err) {
    failure(`Failed to disconnect ${provider}, Try again!`);
  }
};

const util_UserProfilePostContent = ({
  userId,
  userProfileId,
  updatedContent
}) => ({
  id: userProfileId,
  user_id: userId,
  data: {
    attributes: {
      user_attributes: {
        id: userId
      }
    },
    ...updatedContent
  }
});

export const getUserOfficeHours = async ({ userId }) => {
  try {
    const userHours = await fetchUserOfficeHours(userId);
    return userHours.data;
  } catch (e) {
    console.error(e);
  }
};

export const getAllOfficeHours = async () => {
  try {
    const allOfficeHours = await fetchAllOfficeHours();
    return allOfficeHours.data;
  } catch (e) {
    console.error(e);
  }
};

export const updateUserOfficeHours = ({
  userId,
  date,
  time,
  timezone,
  recurring,
  dateId
}) => async (dispatch, getState) => {
  try {
    if (recurring) {
      const hours = stateMappings(getState()).officeHours.activeDateHours;
      const patchedHours = await patchUserOfficeHours({
        userId,
        dateId,
        recurring,
        hours
      });
      return null;
    }

    let allDatesData = await getUserOfficeHours({ userId });
    let dateSlots = get(allDatesData, 'data.attributes.date_slots.data', []);
    let postedHours;
    // if(allDatesData.data == null || dateSlots.length == 0){
    if (allDatesData.data == null) {
      postedHours = await postUserOfficeHours({
        method: 'POST',
        userId,
        date,
        hours: [time],
        timezone
      });
    } else {
      let dateData = dateSlots.find(d => d.attributes.date == date);
      if (dateData) {
        let officeHoursForDate = dateData.attributes.hours;

        if (officeHoursForDate.length != 0) {
          officeHoursForDate.includes(time)
            ? officeHoursForDate.splice(officeHoursForDate.indexOf(time), 1)
            : officeHoursForDate.push(time);
        } else {
          officeHoursForDate = [time];
        }
        postedHours = await patchUserOfficeHours({
          userId,
          dateId,
          hours: officeHoursForDate
        });
      } else {
        postedHours = await postUserOfficeHours({
          method: 'PUT',
          userId,
          date,
          hours: [time]
        });
      }
    }
  } catch (e) {
    console.error(e);
  }
};
