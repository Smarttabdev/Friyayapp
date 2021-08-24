import actionTypes from './actionEnum';

// ViewObject to be passed looks like:
// {
//   header: 0, <- where 0 is an enum value for the diff headers we have
//   topic: 1,  <- where 1 is an enum value for the diff topic views we have
//   card: 1    <- where 2 is an enum value for the diff vard views we have
// }
// and will replace the reducer state completely

export const changeLens = viewObject => ({
  type: actionTypes.changeLens,
  payload: {
    header: viewObject.defaultConfig.header,
    topic: viewObject.defaultConfig.topic,
    card: viewObject.defaultConfig.card
  }
});

export const updateTimeframe = payload => ({
  type: actionTypes.updateTimeframe,
  payload
});

export const topicDesignLoader = payload => ({
  type: actionTypes.topicDesignLoader,
  payload
});

export const domainDesignLoader = payload => ({
  type: actionTypes.domainDesignLoader,
  payload
});

export const updateChatLens = payload => ({
  type: actionTypes.updateChatLens,
  payload
});

export const updateVideoChatLens = payload => ({
  type: actionTypes.updateVideoChatLens,
  payload
});

export const updateTeamPlanLens = payload => ({
  type: actionTypes.updateTeamPlanLens,
  payload
});

export const updateProjectPlanLens = payload => ({
  type: actionTypes.updateProjectPlanLens,
  payload
});

export const updateGoalPlanLens = payload => ({
  type: actionTypes.updateGoalPlanLens,
  payload
});

export const updateStarterLens = payload => ({
  type: actionTypes.updateStarterLens,
  payload
});

export const updateInboxLens = payload => ({
  type: actionTypes.updateInboxLens,
  payload
});

export const updateMyPlanLens = payload => ({
  type: actionTypes.updateMyPlanLens,
  payload
});

export const updateTrackerLens = payload => ({
  type: actionTypes.updateTrackerLens,
  payload
});

export const updateProjectHubLens = payload => ({
  type: actionTypes.updateProjectHubLens,
  payload
});

export const updateFinderLens = payload => ({
  type: actionTypes.updateFinderLens,
  payload
});

export const updateMapLens = payload => ({
  type: actionTypes.updateMapLens,
  payload
});
