import actionTypes from './actionEnum';

export const updateTimeframe = payload => ({
  type: actionTypes.updateTimeframe,
  payload
});

export const updateTeamPlanUsers = ({ userId, replaceId }) => ({
  type: actionTypes.updateTeamPlanUsers,
  payload: { userId, replaceId }
});

export const toggleAlphabetFilter = () => ({
  type: actionTypes.toggleAlphabetFilter
});

export const updateProjectPlanTopics = ({ topics }) => ({
  type: actionTypes.updateProjectPlanTopics,
  payload: topics
});
