import React from 'react';

const AssignedLens = React.lazy(() =>
  import(
    /* webpackChunkName: "AssignedView" */ 'Components/lenses/card_lenses/Assigned/AssignedLens'
  )
);
const CardLens = React.lazy(() =>
  import(
    /* webpackChunkName: "CardLens" */ 'Components/lenses/card_lenses/Card/CardLens'
  )
);
const DocumentLens = React.lazy(() =>
  import(
    /* webpackChunkName: "DocumentLens" */ 'Components/lenses/card_lenses/Document/DocumentLens'
  )
);
const FilesTool = React.lazy(() =>
  import(
    /* webpackChunkName: "FilesTool" */ 'Components/lenses/card_lenses/Files/FilesTool'
  )
);
const GoalLens = React.lazy(() =>
  import(
    /* webpackChunkName: "GoalLens" */ 'Components/lenses/card_lenses/Goal/GoalLens'
  )
);
const TrackerLens = React.lazy(() =>
  import(
    /* webpackChunkName: "TrackerLens" */ 'Components/lenses/card_lenses/Tracker/TrackerLens'
  )
);
const GridLens = React.lazy(() =>
  import(
    /* webpackChunkName: "GridLens" */ 'Components/lenses/card_lenses/Grid/GridLens'
  )
);
const KanbanLens = React.lazy(() =>
  import(
    /* webpackChunkName: "KanbanLens" */ 'Components/lenses/card_lenses/Kanban/KanbanLens'
  )
);
const SmallLens = React.lazy(() =>
  import(
    /* webpackChunkName: "SmallLens" */ 'Components/lenses/card_lenses/Small_Grid/SmallGridLens'
  )
);
const TaskLens = React.lazy(() =>
  import(
    /* webpackChunkName: "TaskLens" */ 'Components/lenses/card_lenses/Task/TaskLens'
  )
);
const ListLens = React.lazy(() =>
  import(
    /* webpackChunkName: "ListLens" */ 'Components/lenses/card_lenses/List/ListLens'
  )
);
const TodoLens = React.lazy(() =>
  import(
    /* webpackChunkName: "TodoLens" */ 'Components/lenses/card_lenses/Todo/TodoLens'
  )
);
const CanvasLens = React.lazy(() =>
  import(
    /* webpackChunkName: "CanvasLens" */ 'Components/lenses/card_lenses/Canvas/CanvasLens'
  )
);
const GoalOverviewLens = React.lazy(() =>
  import(
    /* webpackChunkName: "GoalOverviewLens" */ 'Components/lenses/card_lenses/GoalOverview/GoalOverviewLens'
  )
);
const ProjectOverviewLens = React.lazy(() =>
  import(
    /* webpackChunkName: "ProjectOverviewLens" */ 'Components/lenses/card_lenses/ProjectOverview/ProjectOverviewLens'
  )
);
const BasicLens = React.lazy(() =>
  import(
    /* webpackChunkName: "BasicLens" */ 'Components/lenses/card_lenses/Basic/BasicLens'
  )
);
const WikiLens = React.lazy(() =>
  import(
    /* webpackChunkName: "WikiLens" */ 'Components/lenses/card_lenses/Wiki/WikiLens'
  )
);
const PlanningLens = React.lazy(() =>
  import(
    /* webpackChunkName: "PlanningLens" */ 'Components/lenses/card_lenses/Planning/PlanningLens'
  )
);
const CalendarLens = React.lazy(() =>
  import(
    /* webpackChunkName: "CalendarLens" */ 'Components/lenses/card_lenses/Calendar/CalendarLens'
  )
);
const TimelineLens = React.lazy(() =>
  import(
    /* webpackChunkName: "TimelineLens" */ 'Components/lenses/card_lenses/Timeline/TimelineLens'
  )
);
const StatusTableLens = React.lazy(() =>
  import(
    /* webpackChunkName: "StatusTableLens" */ 'Components/lenses/card_lenses/StatusTable/StatusTableLens'
  )
);
const BurndownLens = React.lazy(() =>
  import(
    /* webpackChunkName: "BurndownLens" */ 'Components/lenses/card_lenses/Burndown/BurndownLens'
  )
);
const SheetLens = React.lazy(() =>
  import(
    /* webpackChunkName: "SheetLens" */ 'Components/lenses/card_lenses/Sheet/SheetLens'
  )
);
const EstimationLens = React.lazy(() =>
  import(
    /* webpackChunkName: "EstimationLens" */ 'Components/lenses/card_lenses/Estimation/EstimationLens'
  )
);
const PrioritizeLens = React.lazy(() =>
  import(
    /* webpackChunkName: "PrioritizeLens" */ 'Components/lenses/card_lenses/Prioritize/PrioritizeLens'
  )
);
const PagesLens = React.lazy(() =>
  import(
    /* webpackChunkName: "PagesLens" */ 'Components/lenses/card_lenses/Pages/PagesLens'
  )
);
const MessageBoardLens = React.lazy(() =>
  import(
    /* webpackChunkName: "MessageBoardLens" */ 'Components/lenses/card_lenses/MessageBoard/MessageBoardLens'
  )
);
const FeedLens = React.lazy(() =>
  import(
    /* webpackChunkName: "FeedLens" */ 'Components/lenses/card_lenses/Feed/FeedLens'
  )
);
const ChatLens = React.lazy(() =>
  import(
    /* webpackChunkName: "ChatLens" */ 'Components/lenses/card_lenses/Chat/ChatLens'
  )
);
const VideoChatLens = React.lazy(() =>
  import(
    /* webpackChunkName: "VideoChatLens" */ 'Components/lenses/card_lenses/VideoChat/VideoChatLens'
  )
);
const LiveChatRoomsLens = React.lazy(() =>
  import(
    /* webpackChunkName: "LiveChatRoomsLens" */ 'Components/lenses/card_lenses/LiveChatRooms/LiveChatRoomsLens'
  )
);
const LiveVideoRoomsLens = React.lazy(() =>
  import(
    /* webpackChunkName: "LiveVideoRoomsLens" */ 'Components/lenses/card_lenses/LiveVideoRooms/LiveVideoRoomsLens'
  )
);
const ActionPlanLens = React.lazy(() =>
  import(
    /* webpackChunkName: "ActionPlanLens" */ 'Components/lenses/card_lenses/ActionPlan/ActionPlanLens'
  )
);

const MyTasksLens = React.lazy(() =>
  import(
    /* webpackChunkName: "MyTasksLens" */ 'Components/lenses/card_lenses/MyTasks/MyTasksLens'
  )
);

const MyGoalsLens = React.lazy(() =>
  import(
    /* webpackChunkName: "MyGoalsLens" */ 'Components/lenses/card_lenses/MyGoals/MyGoalsLens'
  )
);

const WeeklySpreadLens = React.lazy(() =>
  import(
    /* webpackChunkName: "WeeklySpreadLens" */ 'Components/lenses/card_lenses/WeeklySpreadLens/WeeklySpreadLens'
  )
);
const MyResultsLens = React.lazy(() =>
  import(
    /* webpackChunkName: "MyResultsLens" */ 'Components/lenses/card_lenses/MyResults/MyResultsLens'
  )
);
const TeamResultsLens = React.lazy(() =>
  import(
    /* webpackChunkName: "TeamResultsLens" */ 'Components/lenses/card_lenses/TeamResults/TeamResultsLens'
  )
);
const ProjectResultsLens = React.lazy(() =>
  import(
    /* webpackChunkName: "ProjectResultsLens" */ 'Components/lenses/card_lenses/ProjectResults/ProjectResultsLens'
  )
);
const ActivityLens = React.lazy(() =>
  import(
    /* webpackChunkName: "ActivityLens" */ 'Components/lenses/card_lenses/Activity/ActivityLens'
  )
);
const GoogleDriveLens = React.lazy(() =>
  import(
    /* webpackChunkName: "GoogleDriveLens" */ 'Components/lenses/card_lenses/GoogleDrive/GoogleDriveLens'
  )
);

const StarterLens = React.lazy(() =>
  import('Components/lenses/card_lenses/Starter/StarterLens')
);

const InboxLens = React.lazy(() =>
  import('Components/lenses/card_lenses/Inbox/InboxLens')
);

const FinderLens = React.lazy(() =>
  import('Components/lenses/topic_lenses/Finder/FinderLens')
);

const MapLens = React.lazy(() =>
  import('Components/lenses/card_lenses/Map/MapLens')
);

const IndexView = React.lazy(() =>
  import('Components/views/card_views/Index/IndexView')
);

const ProjectLens = React.lazy(() =>
  import('Components/lenses/card_lenses/Project/ProjectLens')
);

const SituationRoomLens = React.lazy(() =>
  import('Components/lenses/topic_lenses/SituationRoom/SituationRoomLens')
);

const TeamPlanLens = React.lazy(() =>
  import('Components/lenses/card_lenses/Plan/TeamPlan/TeamPlanLens')
);

const MyTeamLens = React.lazy(() =>
  import('Components/lenses/card_lenses/MyTeam/MyTeamLens')
);

const MyPlanLens = React.lazy(() =>
  import('Components/lenses/card_lenses/Plan/MyPlan/MyPlanLens')
);
const TeamDayLens = React.lazy(() =>
  import('Components/lenses/card_lenses/Day/TeamDay/TeamDayLens')
);
const MyDayLens = React.lazy(() =>
  import('Components/lenses/card_lenses/Day/MyDay/MyDayLens')
);
const MyNotesLens = React.lazy(() =>
  import('Components/lenses/card_lenses/MyNotes/MyNotesLens')
);
const NotebookLens = React.lazy(() =>
  import('Components/lenses/card_lenses/Notebook/NotebookLens')
);
const KnowledgeBaseLens = React.lazy(() =>
  import('Components/lenses/card_lenses/KnowledgeBase/KnowledgeBaseLens')
);
const OverviewLens = React.lazy(() =>
  import('Components/lenses/card_lenses/Overview/OverviewLens')
);

const ProjectPlanLens = React.lazy(() =>
  import('Components/lenses/card_lenses/Plan/ProjectPlan/ProjectPlanLens')
);

const GoalPlanLens = React.lazy(() =>
  import('Components/lenses/card_lenses/Plan/GoalPlan/GoalPlanLens')
);

const ProjectHubLens = React.lazy(() =>
  import('src/components/lenses/card_lenses/ProjectHub/ProjectHubLens')
);

const ProjectBoardsLens = React.lazy(() =>
  import('src/components/lenses/card_lenses/ProjectBoards/ProjectBoardsLens')
);

const MyProjectsLens = React.lazy(() =>
  import('Components/lenses/card_lenses/MyProjects/MyProjectsLens')
);

const GoalBoardsLens = React.lazy(() =>
  import('src/components/lenses/card_lenses/GoalBoards/GoalBoardsLens')
);

const TaskBoardsLens = React.lazy(() =>
  import('src/components/lenses/card_lenses/TaskBoards/TaskBoardsLens')
);

const FileBoardsLens = React.lazy(() =>
  import('src/components/lenses/card_lenses/FileBoards/FileBoardsLens')
);

const NoteBoardsLens = React.lazy(() =>
  import('src/components/lenses/card_lenses/NoteBoards/NoteBoardsLens')
);

const ContributorsLens = React.lazy(() =>
  import('src/components/lenses/card_lenses/Contributors/ContributorsLens')
);

const DashboardLens = React.lazy(() =>
  import('src/components/lenses/card_lenses/Dashboard/DashboardLens')
);
const TeamGoalsLens = React.lazy(() =>
  import('src/components/lenses/card_lenses/TeamGoals/TeamGoalsLens')
);
const TeamProjectsLens = React.lazy(() =>
  import('src/components/lenses/card_lenses/TeamProjects/TeamProjectsLens')
);
/**
 * NB: The order affects how the tools are being arranged on the pinned tool menu, right menu and  on the tool selection page
 * This object is arranged based on category. The current arrangement is
 *  -- my tools
 * -- teams tools
 * -- general tools
 * -- project tools
 * -- task tools
 * -- document tools
 * -- chat tools
 * -- data tools
 * -- goal tools
 * -- Reporting
 * --   base tools
 **/

const cardLenses = {
  MY_PLAN: {
    key: 'MY_PLAN',
    name: 'My Plan',
    icon: 'explore',
    outlineIcon: true,
    fontAwesomeIcon: false,
    category: 'my',
    description:
      'Table with all tasks assigned to you organized by week or other timeframe you choose.',
    viewComponent: MyPlanLens,
    previewImage: 'my_plan',
    cardType: 'TASK',
    defaultConfig: {
      header: 'STANDARD',
      topic: 'TOPIC_TILES',
      card: null
    },
    defaultFilters: {
      pick_your_boards: false,
      include_subtopic_cards: true
    }
  },
  MY_DAY: {
    key: 'MY_DAY',
    name: 'My Day',
    icon: 'show_chart',
    outlineIcon: true,
    fontAwesomeIcon: false,
    category: 'my',
    description: 'Report to see your activity by day, week or month.',
    viewComponent: MyDayLens,
    previewImage: 'my_day',
    defaultConfig: {
      header: 'STANDARD',
      topic: 'TOPIC_TILES',
      card: null
    }
  },
  MY_RESULTS: {
    key: 'MY_RESULTS',
    name: 'My Results',
    icon: 'done_outline',
    outlineIcon: true,
    fontAwesomeIcon: false,
    category: 'my',
    description: 'Report showing if you completed your weekly plan.',
    viewComponent: MyResultsLens,
    previewImage: 'my_results',
    defaultConfig: {
      header: 'STANDARD',
      topic: null,
      card: 'MY_RESULTS'
    }
  },
  MY_CALENDAR: {
    key: 'MY_CALENDAR',
    name: 'My Calendar',
    icon: 'calendar',
    fontAwesomeIcon: true,
    category: 'my',
    description:
      'Calendar to organize your tasks and events by days, weeks and months.',
    viewComponent: CalendarLens,
    previewImage: 'calendar',
    cardType: 'TASK',
    defaultConfig: {
      header: 'STANDARD',
      topic: null,
      card: 'MY_CALENDAR'
    }
  },
  MY_NOTES: {
    key: 'MY_NOTES',
    name: 'My Notes',
    icon: 'description',
    outlineIcon: true,
    fontAwesomeIcon: false,
    category: 'my',
    description: 'Notebook to keep your personal notes.',
    viewComponent: MyNotesLens,
    previewImage: 'wiki',
    cardType: 'NOTES',
    boardType: 'notes',
    defaultConfig: {
      header: 'STANDARD',
      topic: null,
      card: 'NOTES'
    },
    defaultFilters: {
      pick_your_boards: false,
      board_type: ['NOTE_BOARDS'],
      card: 'CREATED'
    }
  },
  MY_TEAMS: {
    key: 'MY_TEAMS',
    name: 'My Teams',
    icon: 'people',
    outlineIcon: true,
    fontAwesomeIcon: false,
    category: 'my',
    description: 'List of all teams you are a member of.',
    viewComponent: MyTeamLens,
    previewImage: 'team_day',
    defaultConfig: {
      header: 'STANDARD',
      topic: 'TOPIC_TILES',
      card: null
    }
  },
  MY_TASKS: {
    key: 'MY_TASKS',
    name: 'My Tasks',
    icon: 'bookmark',
    fontAwesomeIcon: true,
    category: 'my',
    description: ' List of all tasks assigned to you.',
    previewImage: 'Topic_List',
    viewComponent: MyTasksLens,
    cardType: 'TASK',
    boardType: 'task',
    defaultConfig: {
      header: 'STANDARD',
      topic: null,
      card: 'ACTION_PLAN'
    },
    defaultFilters: {
      pick_your_boards: false,
      board_type: ['TASK_BOARDS']
    }
  },
  MY_GOALS: {
    key: 'MY_GOALS',
    name: 'My Goals',
    icon: 'flag',
    fontAwesomeIcon: false,
    outlineIcon: true,
    category: 'my',
    description: 'List of all goals assogmed to you.',
    viewComponent: MyGoalsLens,
    previewImage: 'pages',
    defaultConfig: {
      header: 'STANDARD',
      topic: 'TOPIC_TILES',
      card: null
    },
    defaultFilters: {
      include_nested_cards: true,
      include_subtopic_cards: true,
      board_type: ['GOAL_BOARDS']
    }
  },
  MY_PROJECTS: {
    key: 'MY_PROJECTS',
    name: 'My Projects',
    icon: 'category',
    fontAwesomeIcon: false,
    outlineIcon: true,
    category: 'my',
    description: 'List of all your projects. Each Project is a sub board.',
    viewComponent: MyProjectsLens,
    boardType: 'project',
    previewImage: 'pages',
    defaultConfig: {
      header: 'STANDARD',
      topic: 'TOPIC_TILES',
      card: null
    },
    defaultFilters: {
      pick_your_boards: false,
      include_nested_cards: true,
      include_subtopic_cards: true,
      board_type: ['PROJECT_BOARDS']
    }
  },
  MY_WEEKLY_SPREAD_VIEW: {
    key: 'MY_WEEKLY_SPREAD_VIEW',
    name: 'My Time Log',
    icon: 'hourglass_empty',
    outlineIcon: true,
    fontAwesomeIcon: false,
    category: 'my',
    description: 'Easily log your time with drag and drop on a calendar.',
    viewComponent: WeeklySpreadLens,
    previewImage: 'time_log',
    cardType: 'TASK',
    boardType: 'task',
    defaultConfig: {
      header: 'STANDARD',
      topic: null,
      card: 'WEEKLY_SPREAD_VIEW'
    }
  },
  TEAM_PLAN: {
    key: 'TEAM_PLAN',
    name: 'Team Plan',
    icon: 'explore',
    teamIcon: true,
    outlineIcon: true,
    fontAwesomeIcon: false,
    category: 'team',
    description:
      'Tables for each team member with tasks per week or other timeframe you choose.',
    viewComponent: TeamPlanLens,
    previewImage: 'team_plan',
    cardType: 'TASK',
    defaultConfig: {
      header: 'STANDARD',
      topic: 'TOPIC_TILES',
      card: null
    },
    defaultFilters: {
      include_subtopic_cards: true
    }
  },
  TEAM_DAY: {
    key: 'TEAM_DAY',
    name: 'Team Day',
    icon: 'show_chart',
    teamIcon: true,
    outlineIcon: true,
    fontAwesomeIcon: false,
    category: 'team',
    description: 'Report to see activity per team member per day or week.',
    viewComponent: TeamDayLens,
    previewImage: 'team_day',
    defaultConfig: {
      header: 'STANDARD',
      topic: 'TOPIC_TILES',
      card: null
    }
  },
  TEAM_PROJECTS: {
    key: 'TEAM_PROJECTS',
    name: 'Team Projects',
    icon: 'category',
    teamIcon: true,
    fontAwesomeIcon: false,
    outlineIcon: true,
    category: 'team',
    description:
      'List of all Projects on your Board. Each Project is a sub board.',
    viewComponent: TeamProjectsLens,
    boardType: 'project',
    previewImage: 'pages',
    defaultConfig: {
      header: 'STANDARD',
      topic: 'TOPIC_TILES',
      card: null
    },
    defaultFilters: {
      pick_your_boards: false,
      include_nested_cards: true,
      include_subtopic_cards: true,
      board_type: ['PROJECT_BOARDS']
    }
  },
  TEAM_GOALS: {
    key: 'TEAM_GOALS',
    name: 'Team Goals',
    icon: 'flag',
    fontAwesomeIcon: false,
    outlineIcon: true,
    teamIcon: true,
    category: 'team',
    description: 'List of all Goals.',
    viewComponent: TeamGoalsLens,
    previewImage: 'pages',
    boardType: 'goal',
    defaultConfig: {
      header: 'STANDARD',
      topic: 'TOPIC_TILES',
      card: null
    },
    defaultFilters: {
      include_nested_cards: true,
      include_subtopic_cards: true,
      board_type: ['GOAL_BOARDS']
    }
  },
  TEAM_RESULTS: {
    key: 'TEAM_RESULTS',
    name: 'Team Results',
    icon: 'done_outline',
    teamIcon: true,
    outlineIcon: true,
    fontAwesomeIcon: false,
    category: 'team',
    description:
      'Report that shows per team member if the weekly plan is completed.',
    viewComponent: TeamResultsLens,
    previewImage: 'team_results',
    defaultConfig: {
      header: 'STANDARD',
      topic: null,
      card: 'TEAM_RESULTS'
    }
  },
  TRACKER: {
    key: 'TRACKER',
    name: 'Tracker',
    icon: 'bullseye',
    fontAwesomeIcon: true,
    category: 'team',
    description:
      'Tool that shows connections between people, goals, projects and tasks.',
    viewComponent: TrackerLens,
    previewImage: 'goal',
    defaultConfig: {
      header: 'STANDARD',
      topic: null,
      card: 'TRACKER'
    },
    defaultFilters: {
      pick_your_boards: true
    }
  },
  ACTIVITY: {
    key: 'ACTIVITY',
    name: 'Activity',
    icon: 'flash_on',
    fontAwesomeIcon: false,
    category: 'team',
    description: 'List of recent team activity.',
    viewComponent: ActivityLens,
    previewImage: 'my_day',
    defaultConfig: {
      header: 'STANDARD',
      topic: null,
      card: 'ACTIVITY'
    }
  },
  OVERVIEW: {
    key: 'OVERVIEW',
    name: 'GIDBF Overview',
    icon: 'bubble_chart',
    outlineIcon: true,
    fontAwesomeIcon: false,
    category: 'team',
    description:
      'Report showing status of My plan and Team plan (Get It Done By Friday).',
    viewComponent: OverviewLens,
    previewImage: 'my_day', // Need to change to correct
    defaultConfig: {
      header: 'STANDARD',
      topic: 'TOPIC_TILES',
      card: null
    }
  },
  CONTRIBUTORS: {
    key: 'CONTRIBUTORS',
    name: 'Contributors',
    icon: 'equalizer',
    teamIcon: false,
    outlineIcon: false,
    fontAwesomeIcon: false,
    category: 'team',
    description:
      'Report that shows contribution of each team member across weeks.',
    viewComponent: ContributorsLens,
    previewImage: 'team_day',
    defaultConfig: {
      header: 'STANDARD',
      topic: 'TOPIC_TILES',
      card: null
    }
  },
  TOPIC_TILES: {
    key: 'TOPIC_TILES',
    name: 'Boards',
    icon: 'hashtag',
    fontAwesomeIcon: true,
    category: 'general',
    description: ' List of all sub boards of your current Board.',
    previewImage: 'Topic_Tile'
  },
  STARTER: {
    key: 'STARTER',
    name: 'Starter',
    icon: 'rocket',
    fontAwesomeIcon: true,
    category: 'general',
    description:
      'List of all Cards and subboards in your Board ordered by most recently created first.',
    viewComponent: StarterLens,
    previewImage: 'pages',
    defaultConfig: {
      header: 'STANDARD',
      topic: false,
      card: 'CANVAS'
    },
    defaultFilters: {
      include_subtopic_cards: true
    }
  },
  FINDER: {
    key: 'FINDER',
    name: 'Finder',
    icon: 'visibility',
    outlineIcon: true,
    category: 'general',
    description:
      'List of all your Boards and Cards organized in columns for each sub level - just like the Finder on Mac or the Explorer on Windows.',
    viewComponent: FinderLens,
    previewImage: 'pages',
    defaultConfig: {
      header: 'STANDARD',
      topic: false,
      card: 'ACTIVITY'
    },
    defaultFilters: {
      include_subtopic_cards: true,
      include_nested_cards: true
    }
  },
  INBOX: {
    key: 'INBOX',
    name: 'Inbox',
    icon: 'all_inbox',
    outlineIcon: true,
    category: 'general',
    description:
      "List of all Cards ordered by most recent activity - so you can easily keep up with what's happening.",
    viewComponent: InboxLens,
    previewImage: 'pages',
    defaultConfig: {
      header: 'STANDARD',
      topic: false,
      card: 'ACTIVITY'
    },
    defaultFilters: {
      include_subtopic_cards: true,
      include_nested_cards: true
    }
  },
  MAP: {
    key: 'MAP',
    name: 'Map',
    icon: 'room',
    outlineIcon: true,
    category: 'general',
    description: 'Map to organize your Cards by location.',
    viewComponent: MapLens,
    previewImage: 'pages',
    defaultConfig: {
      header: 'STANDARD',
      topic: false,
      card: 'ACTIVITY'
    },
    defaultFilters: {
      include_subtopic_cards: true,
      include_nested_cards: true,
      include_cards_with_location: true,
      include_cards_without_location: false
    }
  },
  TASK: {
    key: 'TASK',
    name: 'List',
    icon: 'view_day',
    fontAwesomeIcon: false,
    category: 'general',
    description:
      'List of your Boards and Cards in an expandable tree for documentation and quickly creating outlines.',
    viewComponent: TaskLens,
    previewImage: 'task',
    defaultConfig: {
      header: 'STANDARD',
      topic: 'SMALL_HEX',
      card: 'TASK'
    },
    defaultFilters: {
      card_type: ['CARD', 'TASK', 'NOTES'],
      pick_your_boards: false
    }
  },
  CANVAS: {
    key: 'CANVAS',
    name: 'Canvas',
    icon: 'dashboard',
    outlineIcon: true,
    fontAwesomeIcon: false,
    category: 'general',
    description:
      'Customizable canvas with blocks for text, media, lists, assignees, timelines and many more.',
    viewComponent: CanvasLens,
    previewImage: 'pages',
    defaultConfig: {
      header: 'STANDARD',
      topic: false,
      card: 'CANVAS'
    }
  },
  LIST: {
    key: 'LIST',
    name: 'Cards',
    icon: 'view_stream',
    fontAwesomeIcon: false,
    category: 'general',
    description: ' List of all Cards in your Board.',
    viewComponent: ListLens,
    previewImage: 'list',
    defaultConfig: {
      header: 'STANDARD',
      topic: 'SMALL_HEX',
      card: 'LIST'
    },
    defaultFilters: {
      include_subtopic_cards: true,
      card_type: ['CARD', 'TASK', 'NOTES']
    }
  },
  SITUATION_ROOM: {
    key: 'SITUATION_ROOM',
    name: 'Live Boards',
    icon: 'account_box',
    fontAwesomeIcon: false,
    category: 'general',
    description:
      'List of Boards currently in use by team members so you can see who is where in real time.',
    viewComponent: SituationRoomLens,
    previewImage: 'situation_room',
    defaultConfig: {
      header: 'STANDARD',
      topic: 'TOPIC_TILES',
      card: null
    }
  },
  PROJECT_PLAN: {
    key: 'PROJECT_PLAN',
    name: 'Project Plan',
    icon: 'explore',
    projectIcon: true,
    outlineIcon: true,
    fontAwesomeIcon: false,
    category: 'project',
    description: 'Tables for each task group. Each Table is a sub board.',
    viewComponent: ProjectPlanLens,
    previewImage: 'team_plan',
    boardType: 'task',
    defaultConfig: {
      header: 'STANDARD',
      topic: 'TOPIC_TILES',
      card: null
    },
    defaultFilters: {
      pick_your_boards: false
    }
  },
  PROJECT_HUB: {
    key: 'PROJECT_HUB',
    name: 'Project Hub',
    icon: 'category',
    fontAwesomeIcon: false,
    outlineIcon: true,
    category: 'project',
    description:
      'Tool with boxes for each item: tasks, files, notes, chats and more.',
    viewComponent: ProjectHubLens,
    previewImage: 'project',
    defaultConfig: {
      header: 'STANDARD',
      topic: 'TOPIC_TILES',
      card: null
    },
    defaultFilters: {
      include_nested_cards: true,
      include_subtopic_cards: true
    }
  },
  PROJECT_RESULTS: {
    key: 'PROJECT_RESULTS',
    name: 'Project Results',
    icon: 'done_outline',
    outlineIcon: true,
    fontAwesomeIcon: false,
    subIcon: {
      icon: 'timer',
      fontAwesomeIcon: false
    },
    category: 'project',
    description: 'Report to see if weekly planned tasks are completed.',
    viewComponent: ProjectResultsLens,
    previewImage: 'my_results',
    defaultConfig: {
      header: 'STANDARD',
      topic: null,
      card: 'PROJECT_RESULTS'
    }
  },
  PROJECT_CANVAS: {
    key: 'PROJECT_CANVAS',
    name: 'Project Doc',
    icon: 'insert_drive_file',
    outlineIcon: true,
    fontAwesomeIcon: false,
    category: 'project',
    description:
      'Customizable canvas to create a project document with flexible block layout.',
    viewComponent: CanvasLens,
    previewImage: 'pages',
    defaultConfig: {
      header: 'STANDARD',
      topic: false,
      card: 'PROJECT_CANVAS'
    }
  },
  PROJECT_BOARDS: {
    key: 'PROJECT_BOARDS',
    name: 'Project Boards',
    icon: 'category',
    fontAwesomeIcon: false,
    outlineIcon: true,
    category: 'project',
    description:
      'List of all Projects on your Board. Each Project is a sub board.',
    viewComponent: ProjectBoardsLens,
    boardType: 'project',
    previewImage: 'pages',
    defaultConfig: {
      header: 'STANDARD',
      topic: 'TOPIC_TILES',
      card: null
    },
    defaultFilters: {
      pick_your_boards: false,
      include_nested_cards: true,
      include_subtopic_cards: true,
      board_type: ['PROJECT_BOARDS']
    }
  },
  PROJECT: {
    key: 'PROJECT',
    name: 'Project Board',
    icon: 'category',
    fontAwesomeIcon: false,
    outlineIcon: true,
    category: 'project',
    description:
      'Tool with boxes for each sub board to organize anything: meetings notes, research, ideas, tasks, etc.',
    viewComponent: ProjectLens,
    previewImage: 'project',
    defaultConfig: {
      header: 'STANDARD',
      topic: 'TOPIC_TILES',
      card: null
    },
    defaultFilters: {
      include_nested_cards: true
    }
  },
  SMALL_PROJECT: {
    key: 'SMALL_PROJECT',
    name: 'Small Project',
    icon: 'category',
    fontAwesomeIcon: false,
    outlineIcon: true,
    category: 'project',
    description: 'Template using Canvas',
    viewComponent: CanvasLens,
    previewImage: 'project',
    defaultConfig: {
      header: 'STANDARD',
      topic: 'TOPIC_TILES',
      card: null
    }
  },
  MEDIUM_PROJECT: {
    key: 'MEDIUM_PROJECT',
    name: 'Medium Project',
    icon: 'category',
    fontAwesomeIcon: false,
    outlineIcon: true,
    category: 'project',
    description: 'Template using project boards',
    viewComponent: ProjectLens,
    previewImage: 'project_setup',
    defaultConfig: {
      header: 'STANDARD',
      topic: 'TOPIC_TILES',
      card: null
    }
  },
  LARGE_PROJECT: {
    key: 'LARGE_PROJECT',
    name: 'Large Project',
    icon: 'category',
    fontAwesomeIcon: false,
    outlineIcon: true,
    category: 'project',
    description: 'Template using Canvas',
    viewComponent: CanvasLens,
    previewImage: 'project_setup',
    defaultConfig: {
      header: 'STANDARD',
      topic: 'TOPIC_TILES',
      card: null
    }
  },
  TODO: {
    key: 'TODO',
    name: 'Tasks',
    icon: 'check_circle',
    fontAwesomeIcon: false,
    category: 'task',
    description: 'List of all tasks in your Board with tabs for due dates.',
    viewComponent: TodoLens,
    previewImage: 'todo',
    cardType: 'TASK',
    boardType: 'task',
    defaultConfig: {
      header: 'STANDARD',
      topic: null,
      card: 'TODO'
    },
    defaultFilters: {
      include_subtopic_cards: false,
      pick_your_boards: false,
      board_type: ['TASK_BOARDS']
    }
  },
  TASK_BOARDS: {
    key: 'TASK_BOARDS',
    name: 'Task Boards',
    icon: 'calendar_today',
    fontAwesomeIcon: false,
    outlineIcon: true,
    category: 'task',
    description: 'Tool with boxes for each task list. Each box is a subboard.',
    viewComponent: TaskBoardsLens,
    previewImage: 'grid',
    cardType: 'TASK',
    boardType: 'task',
    defaultConfig: {
      header: 'STANDARD',
      topic: 'TOPIC_TILES',
      card: null
    },
    defaultFilters: {
      include_nested_cards: true,
      board_type: ['TASK_BOARDS'],
      card_type: ['TASK']
    }
  },
  ACTION_PLAN: {
    key: 'ACTION_PLAN',
    name: 'Action Plan',
    icon: 'view_stream',
    fontAwesomeIcon: false,
    category: 'task',
    description:
      'Action Plan: Table with a list of tasks with customizable columns to assign, set dates and more.',
    previewImage: 'action',
    viewComponent: ActionPlanLens,
    cardType: 'TASK',
    boardType: 'task',
    defaultConfig: {
      header: 'STANDARD',
      topic: null,
      card: 'ACTION_PLAN'
    },
    defaultFilters: {
      pick_your_boards: false,
      board_type: ['TASK_BOARDS']
    }
  },
  KANBAN: {
    key: 'KANBAN',
    name: 'Kanban Board',
    icon: 'view_week',
    fontAwesomeIcon: false,
    category: 'task',
    description:
      'Organize tasks in lanes to create a workflow. Each lane is a label.',
    viewComponent: KanbanLens,
    previewImage: 'kanban',
    cardType: 'TASK',
    boardType: 'task',
    defaultConfig: {
      header: 'STANDARD',
      topic: null,
      card: 'KANBAN'
    },
    defaultFilters: {
      include_subtopic_cards: true,
      board_type: ['TASK_BOARDS']
    }
  },
  ASSIGNED: {
    key: 'ASSIGNED',
    name: 'Assign Board',
    icon: 'assignment_ind',
    fontAwesomeIcon: false,
    category: 'task',
    description:
      'Organize tasks in lanes to see tasks assigned to team members. Each lane is an assignee.',
    viewComponent: AssignedLens,
    previewImage: 'assigned',
    cardType: 'TASK',
    boardType: 'task',
    layoutConfig: {
      secondaryInitialSize: 35
    },
    defaultConfig: {
      header: 'STANDARD',
      topic: null,
      card: 'ASSIGNED'
    },
    defaultFilters: {
      include_subtopic_cards: true,
      board_type: ['TASK_BOARDS']
    }
  },
  PRIORITIZE: {
    key: 'PRIORITIZE',
    name: 'Prioritize Board',
    icon: 'subtitles',
    fontAwesomeIcon: false,
    category: 'task',
    description: 'Organize tasks by priority level.',
    viewComponent: PrioritizeLens,
    previewImage: 'prioritize',
    cardType: 'TASK',
    boardType: 'task',
    defaultConfig: {
      header: 'STANDARD',
      topic: null,
      card: 'PRIORITIZE'
    },
    defaultFilters: {
      include_subtopic_cards: true,
      board_type: ['TASK_BOARDS']
    }
  },
  GOAL: {
    key: 'GOAL',
    name: 'Sprint Board',
    icon: 'bullseye',
    fontAwesomeIcon: true,
    category: 'task',
    description:
      'Organize tasks in a sprint with a column for To Do and Done - by week or any timeframe you choose.',
    viewComponent: GoalLens,
    previewImage: 'goal',
    cardType: 'TASK',
    boardType: 'task',
    defaultConfig: {
      header: 'STANDARD',
      topic: null,
      card: 'GOAL'
    },
    defaultFilters: {
      include_subtopic_cards: true,
      board_type: ['TASK_BOARDS']
    }
  },
  PLANNING: {
    key: 'PLANNING',
    name: 'Planning Table',
    icon: 'date_range',
    fontAwesomeIcon: false,
    category: 'task',
    description:
      'See tasks in a table with columns for due dates and rows for assignees.',
    viewComponent: PlanningLens,
    previewImage: 'planning',
    cardType: 'TASK',
    boardType: 'task',
    defaultConfig: {
      header: 'STANDARD',
      topic: null,
      card: 'PLANNING'
    },
    defaultFilters: {
      include_subtopic_cards: true,
      board_type: ['TASK_BOARDS']
    }
  },
  TIMELINE: {
    key: 'TIMELINE',
    name: 'Timeline',
    icon: 'subtitles',
    fontAwesomeIcon: false,
    category: 'task',
    description: 'Organize tasks on a timeline.',
    viewComponent: TimelineLens,
    previewImage: 'timeline',
    cardType: 'TASK',
    boardType: 'task',
    defaultConfig: {
      header: 'STANDARD',
      topic: null,
      card: 'TIMELINE'
    },
    defaultFilters: {
      include_subtopic_cards: true,
      board_type: ['TASK_BOARDS']
    }
  },
  CALENDAR: {
    key: 'CALENDAR',
    name: 'Calendar',
    icon: 'calendar',
    fontAwesomeIcon: true,
    category: 'task',
    description: 'Organize tasks on a calendar.',
    viewComponent: CalendarLens,
    previewImage: 'calendar',
    cardType: 'TASK',
    boardType: 'task',
    defaultConfig: {
      header: 'STANDARD',
      topic: null,
      card: 'CALENDAR'
    },
    defaultFilters: {
      include_subtopic_cards: true,
      board_type: ['TASK_BOARDS']
    }
  },
  STATUS_TABLE: {
    key: 'STATUS_TABLE',
    name: 'Status Table',
    icon: 'delicious',
    fontAwesomeIcon: true,
    category: 'task',
    description: 'Organize tasks by status table.',
    viewComponent: StatusTableLens,
    previewImage: 'status_table',
    cardType: 'TASK',
    boardType: 'task',
    defaultConfig: {
      header: 'STANDARD',
      topic: null,
      card: 'STATUS_TABLE'
    },
    defaultFilters: {
      include_subtopic_cards: true,
      board_type: ['TASK_BOARDS']
    }
  },
  BURNDOWN: {
    key: 'BURNDOWN',
    name: 'Burndown',
    icon: 'cubes',
    fontAwesomeIcon: true,
    category: 'task',
    description: 'See remaining tasks by week or timeframe you choose.',
    viewComponent: BurndownLens,
    previewImage: 'burndown',
    cardType: 'TASK',
    boardType: 'task',
    defaultConfig: {
      header: 'STANDARD',
      topic: null,
      card: 'BURNDOWN'
    },
    defaultFilters: {
      include_subtopic_cards: true,
      board_type: ['TASK_BOARDS']
    }
  },
  WEEKLY_SPREAD_VIEW: {
    key: 'WEEKLY_SPREAD_VIEW',
    name: 'Time Log',
    icon: 'hourglass_empty',
    outlineIcon: true,
    fontAwesomeIcon: false,
    category: 'task',
    description: 'Easily log your time with drag and drop on a calendar.',
    viewComponent: WeeklySpreadLens,
    previewImage: 'time_log',
    cardType: 'TASK',
    boardType: 'task',
    defaultConfig: {
      header: 'STANDARD',
      topic: null,
      card: 'WEEKLY_SPREAD_VIEW'
    },
    defaultFilters: {
      include_subtopic_cards: true,
      board_type: ['TASK_BOARDS']
    }
  },
  ESTIMATION: {
    key: 'ESTIMATION',
    name: 'Estimation Sheet',
    icon: 'timer',
    fontAwesomeIcon: false,
    category: 'task',
    description: 'Table with a task list to estimate work.',
    viewComponent: EstimationLens,
    previewImage: 'worksheet',
    cardType: 'TASK',
    boardType: 'task',
    defaultConfig: {
      header: 'STANDARD',
      topic: null,
      card: 'ESTIMATION'
    },
    defaultFilters: {
      include_subtopic_cards: true,
      board_type: ['TASK_BOARDS']
    }
  },
  SMALL_GRID: {
    key: 'SMALL_GRID',
    name: 'Small Notes',
    icon: 'apps',
    fontAwesomeIcon: false,
    category: 'document',
    description: 'Like Notes, but smaller',
    viewComponent: SmallLens,
    previewImage: 'small_grid',
    cardType: 'NOTES',
    layoutConfig: {
      secondaryInitialSize: 45
    },
    defaultConfig: {
      header: 'STANDARD',
      topic: 'SMALL_HEX',
      card: 'SMALL_GRID'
    },
    defaultFilters: {
      include_subtopic_cards: true
    }
  },
  GRID: {
    key: 'GRID',
    name: 'Notes',
    icon: 'view_module',
    fontAwesomeIcon: false,
    category: 'document',
    description: 'A list of Note Cards in a grid layout.',
    viewComponent: GridLens,
    previewImage: 'grid',
    cardType: 'NOTES',
    boardType: 'notes',
    layoutConfig: {
      secondaryInitialSize: 40
    },
    defaultConfig: {
      header: 'STANDARD',
      topic: 'SMALL_HEX',
      card: 'GRID'
    },
    defaultFilters: {
      include_subtopic_cards: true
    }
  },
  BASIC: {
    key: 'BASIC',
    name: 'Page',
    icon: 'paragraph',
    fontAwesomeIcon: true,
    category: 'document',
    description: 'Documentation tool for writing, images, links, etc.',
    viewComponent: BasicLens,
    previewImage: 'basic',
    cardType: 'NOTES',
    defaultConfig: {
      header: 'STANDARD',
      topic: false,
      card: 'WIKI'
    },
    disabledPages: ['home']
  },
  PAGES: {
    key: 'PAGES',
    name: 'Pages',
    icon: 'newspaper-o',
    fontAwesomeIcon: true,
    category: 'document',
    description: 'Documentation tool with page sections.',
    viewComponent: PagesLens,
    previewImage: 'pages',
    cardType: 'NOTES',
    defaultConfig: {
      header: 'STANDARD',
      topic: false,
      card: 'PAGES'
    },
    disabledPages: ['home']
  },
  CARD: {
    key: 'CARD',
    name: 'Guide',
    icon: 'view_quilt',
    fontAwesomeIcon: false,
    category: 'document',
    description:
      'A list of cards on the left and the card content on the right - without subboards to organize your list.',
    viewComponent: CardLens,
    previewImage: 'card',
    isSplitLayoutDisabled: true,
    cardType: 'NOTES',
    boardType: 'knowledge',
    defaultConfig: {
      header: 'STANDARD',
      topic: 'SMALL_HEX',
      card: 'CARD'
    },
    defaultFilters: {
      board_type: ['KNOWLEDGE_BOARDS'],
      include_subtopic_cards: true
    }
  },
  NOTEBOOK: {
    key: 'NOTEBOOK',
    name: 'Notebook',
    icon: 'book',
    outlineIcon: true,
    fontAwesomeIcon: false,
    category: 'document',
    description:
      'A list of note cards on the left with the card content on the right. Organize your notes further with subboards.',
    viewComponent: NotebookLens,
    previewImage: 'wiki',
    cardType: 'NOTES',
    boardType: 'notes',
    defaultConfig: {
      header: 'STANDARD',
      topic: null,
      card: 'NOTES'
    },
    defaultFilters: {
      pick_your_boards: false,
      board_type: ['NOTE_BOARDS']
    }
  },
  NOTE_BOARDS: {
    key: 'NOTE_BOARDS',
    name: 'Note Boards',
    icon: 'list_alt',
    fontAwesomeIcon: false,
    outlineIcon: true,
    category: 'document',
    description: ' List of all Note Boards in your Board.',
    viewComponent: NoteBoardsLens,
    previewImage: 'grid',
    cardType: 'NOTES',
    boardType: 'notes',
    defaultConfig: {
      header: 'STANDARD',
      topic: 'TOPIC_TILES',
      card: 'notes'
    },
    defaultFilters: {
      include_nested_cards: true,
      board_type: ['NOTE_BOARDS']
    }
  },
  KNOWLEDGE_BASE: {
    key: 'KNOWLEDGE_BASE',
    name: 'Knowledge Base',
    icon: 'chrome_reader_mode',
    outlineIcon: true,
    fontAwesomeIcon: false,
    category: 'document',
    description:
      'An expandable list of knowledge cards on the left and the card content on the right. Organize your knowledge further with subboards.',
    viewComponent: KnowledgeBaseLens,
    previewImage: 'wiki',
    cardType: 'NOTES',
    boardType: 'knowledge',
    defaultConfig: {
      header: 'STANDARD',
      topic: null,
      card: 'NOTES'
    },
    defaultFilters: {
      pick_your_boards: false,
      board_type: ['KNOWLEDGE_BOARDS'],
      card_type: ['NOTES']
    }
  },
  WIKI: {
    key: 'WIKI',
    name: 'Wiki',
    icon: 'school',
    outlineIcon: true,
    fontAwesomeIcon: false,
    category: 'document',
    description: 'Like the knowledge base tool but with minimal design theme.',
    viewComponent: WikiLens,
    previewImage: 'wiki',
    isSplitLayoutDisabled: true,
    cardType: 'NOTES',
    boardType: 'knowledge',
    defaultConfig: {
      header: 'STANDARD',
      topic: false,
      card: 'WIKI'
    },
    defaultFilters: {
      pick_your_boards: false,
      board_type: ['KNOWLEDGE_BOARDS']
    }
  },
  FILES: {
    key: 'FILES',
    name: 'Files',
    icon: 'insert_drive_file',
    outlineIcon: true,
    fontAwesomeIcon: false,
    category: 'document',
    description: 'A list of Files in your Board.',
    viewComponent: FilesTool,
    previewImage: 'document',
    boardType: 'file',
    defaultConfig: {
      header: 'STANDARD',
      topic: null,
      card: 'DOCUMENT'
    },
    defaultFilters: {
      board_type: ['FILE_BOARDS']
    }
  },
  FILE_BOARDS: {
    key: 'FILE_BOARDS',
    name: 'File Boards',
    icon: 'insert_drive_file',
    fontAwesomeIcon: false,
    outlineIcon: true,
    category: 'document',
    description: 'A list of File Boards in your Board.',
    viewComponent: FileBoardsLens,
    previewImage: 'grid',
    boardType: 'file',
    defaultConfig: {
      header: 'STANDARD',
      topic: 'TOPIC_TILES'
    },
    defaultFilters: {
      include_nested_cards: true,
      board_type: ['FILE_BOARDS']
    }
  },
  DOCUMENT: {
    key: 'DOCUMENT',
    name: 'File List',
    icon: 'insert_drive_file',
    outlineIcon: true,
    fontAwesomeIcon: false,
    category: 'document',
    description:
      'A list of Cards in your Board with a column to show attached files for each Card. This is for when you have a mixed list of Notes and Cards with attached files.',
    viewComponent: DocumentLens,
    previewImage: 'document',
    defaultConfig: {
      header: 'STANDARD',
      topic: null,
      card: 'DOCUMENT'
    },
    defaultFilters: {
      include_subtopic_cards: true
    }
  },
  INDEX: {
    key: 'INDEX',
    name: 'Index',
    icon: 'university',
    fontAwesomeIcon: true,
    category: 'document',
    description: 'Boxes with lists of subboards and Cards organized.',
    viewComponent: IndexView,
    previewImage: 'index',
    defaultConfig: {
      header: 'STANDARD',
      topic: 'SMALL_HEX',
      card: 'INDEX'
    },
    defaultFilters: {
      include_nested_cards: true
    }
  },
  GOOGLE_DRIVE: {
    key: 'GOOGLE_DRIVE',
    name: 'Google Drive',
    icon: 'drive',
    fontAwesomeIcon: true,
    category: 'document',
    description: 'See your Google files.',
    viewComponent: GoogleDriveLens,
    previewImage: 'drive',
    defaultConfig: {
      // header: 'STANDARD',
      // topic: null,
      // card: 'WEEKLY_SPREAD_VIEW'
    }
  },
  CHAT: {
    key: 'CHAT',
    name: 'Chat',
    icon: 'forum',
    fontAwesomeIcon: false,
    outlineIcon: true,
    category: 'chat',
    description: 'A list of all chats in the Board.',
    viewComponent: ChatLens,
    previewImage: 'Chat_rooms',
    cardType: 'CHAT',
    defaultConfig: {
      header: 'STANDARD',
      topic: null,
      card: 'CHAT'
    }
  },
  VIDEO_CHAT: {
    key: 'VIDEO_CHAT',
    name: 'Video Chat',
    icon: 'videocam',
    fontAwesomeIcon: false,
    outlineIcon: true,
    category: 'chat',
    description: 'A list of all video chats in the Board.',
    viewComponent: VideoChatLens,
    previewImage: 'Video_chat_rooms',
    cardType: 'VIDEO_CHAT',
    defaultConfig: {
      header: 'STANDARD',
      topic: null,
      card: 'VIDEO_CHAT'
    }
  },
  LIVE_CHAT_ROOMS: {
    key: 'LIVE_CHAT_ROOMS',
    name: 'Live Chat',
    icon: 'forum',
    outlineIcon: true,
    fontAwesomeIcon: false,
    category: 'chat',
    description: 'See live chats with team members.',
    viewComponent: LiveChatRoomsLens,
    previewImage: 'Chat_rooms',
    cardType: 'CHAT',
    defaultConfig: {
      header: 'STANDARD',
      topic: null,
      card: 'LIVE_CHAT_ROOMS'
    }
  },
  LIVE_VIDEO_ROOMS: {
    key: 'LIVE_VIDEO_ROOMS',
    name: 'Live Video Chat',
    icon: 'videocam',
    outlineIcon: true,
    fontAwesomeIcon: false,
    category: 'chat',
    description: 'See live video chats with team members.',
    viewComponent: LiveVideoRoomsLens,
    previewImage: 'Video_chat_rooms',
    cardType: 'VIDEO_CHAT',
    defaultConfig: {
      header: 'STANDARD',
      topic: null,
      card: 'LIVE_VIDEO_ROOMS'
    }
  },
  MESSAGE_BOARD: {
    key: 'MESSAGE_BOARD',
    name: 'Message Board',
    icon: 'bullhorn',
    fontAwesomeIcon: true,
    category: 'chat',
    description: 'Post messages on a team forum.',
    viewComponent: MessageBoardLens,
    previewImage: 'message_board',
    defaultConfig: {
      header: 'STANDARD',
      topic: false,
      card: 'MESSAGE_BOARD'
    },
    defaultFilters: {
      include_subtopic_cards: true
    }
  },
  FEED: {
    key: 'FEED',
    name: 'News Feed',
    icon: 'assessment',
    fontAwesomeIcon: false,
    category: 'chat',
    description: 'See recent Cards in a news feed format.',
    viewComponent: FeedLens,
    previewImage: 'feed',
    defaultConfig: {
      header: 'STANDARD',
      topic: null,
      card: 'FEED'
    },
    defaultFilters: {
      include_subtopic_cards: true
    }
  },
  SHEET: {
    key: 'SHEET',
    name: 'Sheet',
    icon: 'grid_on',
    fontAwesomeIcon: false,
    category: 'data',
    description: 'Table with Data Cards with customizable columns.',
    viewComponent: SheetLens,
    previewImage: 'sheet',
    cardType: 'DATA',
    boardType: 'data',
    defaultConfig: {
      header: 'STANDARD',
      topic: null,
      card: 'SHEET'
    },
    defaultFilters: {
      pick_your_boards: false
    }
  },
  GOAL_OVERVIEW: {
    key: 'GOAL_OVERVIEW',
    name: 'Goal Overview',
    icon: 'flag',
    outlineIcon: true,
    fontAwesomeIcon: false,
    category: 'goal',
    description:
      'Canvas to define a goal with blocks for goal description, setting timelines and assigning team members.',
    viewComponent: GoalOverviewLens,
    previewImage: 'pages',
    defaultConfig: {
      header: 'STANDARD',
      topic: false,
      card: 'CANVAS'
    }
  },
  GOAL_PLAN: {
    key: 'GOAL_PLAN',
    name: 'Goal Plan',
    icon: 'flag',
    projectIcon: true,
    outlineIcon: true,
    fontAwesomeIcon: false,
    category: 'goal',
    description:
      'Table for each Goal with a list tasks and customizable columns.',
    viewComponent: GoalPlanLens,
    previewImage: 'team_plan',
    boardType: 'goal',
    cardType: 'TASK',
    defaultConfig: {
      header: 'STANDARD',
      topic: 'TOPIC_TILES',
      card: null
    },
    defaultFilters: {
      pick_your_boards: false,
      board_type: ['GOAL_BOARDS']
    }
  },
  GOAL_CANVAS: {
    key: 'GOAL_CANVAS',
    name: 'Goal Canvas',
    icon: 'insert_drive_file',
    outlineIcon: true,
    fontAwesomeIcon: false,
    category: 'goal',
    description: ' Map out goals and actions in a visual canvas.',
    viewComponent: CanvasLens,
    previewImage: 'pages',
    defaultConfig: {
      header: 'STANDARD',
      topic: false,
      card: 'GOAL_CANVAS'
    }
  },
  GOAL_BOARDS: {
    key: 'GOAL_BOARDS',
    name: 'Goal Boards',
    icon: 'flag',
    fontAwesomeIcon: false,
    outlineIcon: true,
    category: 'goal',
    description: 'List of all Goals.',
    viewComponent: GoalBoardsLens,
    previewImage: 'pages',
    defaultConfig: {
      header: 'STANDARD',
      topic: 'TOPIC_TILES',
      card: null
    },
    defaultFilters: {
      include_nested_cards: true,
      include_subtopic_cards: true,
      board_type: ['GOAL_BOARDS']
    }
  },
  PROJECT_OVERVIEW: {
    key: 'PROJECT_OVERVIEW',
    name: 'Project Overview',
    icon: 'category',
    outlineIcon: true,
    fontAwesomeIcon: false,
    category: 'project',
    description:
      'Canvas to define a project with blocks for project description, setting timelines and assigning team members.',
    viewComponent: ProjectOverviewLens,
    previewImage: 'pages',
    defaultConfig: {
      header: 'STANDARD',
      topic: false,
      card: 'CANVAS'
    }
  },
  MULTIPLE_GOALS_CANVAS: {
    key: 'MULTIPLE_GOALS_CANVAS',
    name: 'Multiple Goals Canvas',
    icon: 'insert_drive_file',
    outlineIcon: true,
    fontAwesomeIcon: false,
    category: 'goal',
    description: 'Organize goals with sub goals',
    viewComponent: CanvasLens,
    previewImage: 'pages',
    defaultConfig: {
      header: 'STANDARD',
      topic: false,
      card: 'GOAL_CANVAS'
    }
  },
  DASHBOARD: {
    key: 'DASHBOARD',
    name: 'Dashboard',
    icon: 'speed',
    fontAwesomeIcon: false,
    outlineIcon: true,
    category: 'reporting',
    description: 'See goal and project progress in visual displays.',
    viewComponent: DashboardLens,
    previewImage: 'burndown',
    defaultConfig: {
      header: 'STANDARD',
      topic: false,
      card: 'CANVAS'
    },
    defaultFilters: {
      include_subtopic_cards: true
    }
  },
  TOPIC_LIST: {
    key: 'TOPIC_LIST',
    name: 'Board List',
    icon: 'view_stream',
    fontAwesomeIcon: false,
    category: 'board_views',
    description: 'For a list of sub Boards shown as a list',
    previewImage: 'Topic_List'
  },
  TOPIC_HEXES: {
    key: 'TOPIC_HEXES',
    name: 'Board Hexes',
    icon: 'topic',
    fontAwesomeIcon: false,
    category: 'board_views',
    description: 'For a list of sub Boards shown as hexes',
    previewImage: 'Topic_Hex'
  }
  // PROJECT_SETUP: {
  //   key: 'PROJECT_SETUP',
  //   name: 'Project Setup',
  //   icon: 'category',
  //   fontAwesomeIcon: false,
  //   outlineIcon: true,
  //   category: 'action',
  //   description: 'Board set up for tasks, files, chat and notes',
  //   viewComponent: ProjectLens,
  //   previewImage: 'project_setup',
  //   defaultConfig: {
  //     header: 'STANDARD',
  //     topic: 'TOPIC_TILES',
  //     card: null
  //   }
  // },
};

export default cardLenses;
