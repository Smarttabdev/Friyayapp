import actionTypes from './actionEnum';

const timeframeDefaults = {
  columnMode: 'weeks',
  startDate: moment().startOf('week'),
  endDate: moment().endOf('week'),
  offsets: {
    days: 1,
    weeks: 1
  }
};

const defaultState = {
  header: 'STANDARD',
  topic: 'HEX',
  card: 'SMALL_GRID',
  topicDesignLoading: false,
  domainDesignLoading: false,
  timeframe: { ...timeframeDefaults },
  chatLens: {
    chatId: null
  },
  videoChatLens: {
    videoRoomId: null
  },
  teamPlanLens: {
    vertical: false
  },
  projectPlanLens: {
    vertical: true
  },
  goalPlanLens: {
    vertical: true
  },
  starterLens: {
    sort: 'recentCreated',
    activeFilters: ['ALL'],
    searchQuery: null
  },
  inboxLens: {
    sort: 'recentCreated',
    activeFilters: ['ALL'],
    searchQuery: null,
    pinnedLabels: JSON.parse(
      window.localStorage.getItem('inboxLensPinnedLabels')
    )
  },
  finderLens: {
    sort: 'recentCreated',
    activeFilters: ['ALL'],
    searchQuery: null,
    activeLayout: 'columns',
    refreshCount: 0
  },
  mapLens: {
    sort: 'recentCreated',
    searchQuery: null
  },
  trackerLens: {
    currentTab: 'activities',
    currentMode: 'lane',
    selectedTeam: null,
    selectedGoal: null,
    selectedProject: null,
    selectedUserId: null,
    selectedGroupId: null,
    selectedGoalId: null,
    selectedProjectId: null
  },
  projectHubLens: {
    activeFilters: ['TASK_CARD', 'NOTE_CARD', 'FILE_CARD', 'CHAT_CARD', 'BOARD']
  }
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.changeLens:
      return { ...state, ...action.payload };
    case actionTypes.topicDesignLoader:
      return { ...state, ...action.payload };
    case actionTypes.domainDesignLoader:
      return { ...state, ...action.payload };
    case actionTypes.updateTimeframe:
      return {
        ...state,
        timeframe: {
          ...state.timeframe,
          [action.payload.tool]: [
            'TEAM_PLAN',
            'PROJECT_PLAN',
            'MY_PLAN',
            'TEAM_DAY',
            'MY_DAY',
            'CONTRIBUTORS'
          ].includes(action.payload.tool)
            ? {
                ...state.timeframe[action.payload.tool],
                ...action.payload
              }
            : { ...action.payload }
        }
      };
    case actionTypes.updateChatLens:
      return {
        ...state,
        chatLens: {
          ...state.chatLens,
          ...action.payload
        }
      };
    case actionTypes.updateVideoChatLens:
      return {
        ...state,
        videoChatLens: {
          ...state.videoChatLens,
          ...action.payload
        }
      };
    case actionTypes.updateTeamPlanLens:
      return {
        ...state,
        teamPlanLens: {
          ...state.teamPlanLens,
          ...action.payload
        }
      };
    case actionTypes.updateProjectPlanLens:
      return {
        ...state,
        projectPlanLens: {
          ...state.projectPlanLens,
          ...action.payload
        }
      };
    case actionTypes.updateGoalPlanLens:
      return {
        ...state,
        goalPlanLens: {
          ...state.goalPlanLens,
          ...action.payload
        }
      };
    case actionTypes.updateStarterLens:
      return {
        ...state,
        starterLens: {
          ...state.starterLens,
          ...action.payload
        }
      };
    case actionTypes.updateInboxLens:
      return {
        ...state,
        inboxLens: {
          ...state.inboxLens,
          ...action.payload
        }
      };
    case actionTypes.updateMyPlanLens:
      return {
        ...state,
        myPlanLens: {
          ...state.myPlanLens,
          ...action.payload
        }
      };
    case actionTypes.updateTrackerLens:
      return {
        ...state,
        trackerLens: {
          ...state.trackerLens,
          ...action.payload
        }
      };
    case actionTypes.updateProjectHubLens:
      return {
        ...state,
        projectHubLens: {
          ...action.payload
        }
      };
    case actionTypes.updateFinderLens:
      return {
        ...state,
        finderLens: {
          ...state.finderLens,
          ...action.payload
        }
      };
    case actionTypes.updateMapLens:
      return {
        ...state,
        mapLens: {
          ...state.mapLens,
          ...action.payload
        }
      };
    default:
      return state;
  }
};

export default reducer;
