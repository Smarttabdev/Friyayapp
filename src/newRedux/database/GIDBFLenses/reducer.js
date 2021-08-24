import actionTypes from './actionEnum';

const defaultState = {
  timeframe_mode: null,
  timeframe: {
    startDate: null,
    endDate: null
  },
  team_plan: {
    userIds: [],
    alphabet_filter: false
  },
  project_plan: {
    topics: []
  }
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.updateTimeframe: {
      const { timeframe_mode, timeframe } = action.payload;
      if (timeframe_mode == 'days')
        timeframe.endDate = timeframe.startDate.clone().endOf('day');
      return {
        ...state,
        timeframe_mode,
        timeframe
      };
    }
    case actionTypes.updateTeamPlanUsers: {
      const { userId, replaceId } = action.payload;
      const currentUserIds = state.team_plan.userIds;
      const index = currentUserIds.indexOf(replaceId ? replaceId : userId);
      if (replaceId) {
        state.team_plan.userIds[index] = userId;
      } else {
        index != -1
          ? state.team_plan.userIds.splice(index, 1)
          : state.team_plan.userIds.push(userId);
      }

      return { ...state };
    }
    case actionTypes.toggleAlphabetFilter: {
      state.team_plan.alphabet_filter = !state.team_plan.alphabet_filter;
      console.log('index', state.team_plan.alphabet_filter);
      return { ...state };
    }
    case actionTypes.updateProjectPlanTopics: {
      return { ...state, project_plan: { topics: [...action.payload] } };
    }
    default:
      return state;
  }
};
