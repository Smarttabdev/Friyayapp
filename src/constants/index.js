export const LOCATION_CHANGE = 'LOCATION_CHANGE';

export const GET_TIPS_REQUEST = 'GET_TIPS_REQUEST';
export const GET_TIPS_REQUEST_ROOT = 'GET_TIPS_REQUEST_ROOT';
export const GET_TIPS_SUCCESS = 'GET_TIPS_SUCCESS';
export const GET_TIPS_FAILURE = 'GET_TIPS_FAILURE';
export const GET_TIPS_BY_USER_ID_REQUEST = 'GET_TIPS_BY_USER_ID_REQUEST';
export const GET_TIPS_BY_USER_ID_SUCCESS = 'GET_TIPS_BY_USER_ID_SUCCESS';
export const GET_TIPS_BY_USER_ID_FAILURE = 'GET_TIPS_BY_USER_ID_FAILURE';
export const SELECTION = 'SELECTION';
export const GET_RELATED_TIPS_REQUEST = 'GET_RELATED_TIPS_REQUEST';
export const GET_RELATED_TIPS_SUCCESS = 'GET_RELATED_TIPS_SUCCESS';
export const GET_RELATED_TIPS_FAILURE = 'GET_RELATED_TIPS_FAILURE';

export const REMOVE_TIP_SUCCESS = 'REMOVE_TIP_SUCCESS';
export const REMOVE_TIP_FAILURE = 'REMOVE_TIP_FAILURE';

export const ARCHIVE_TIP_REQUEST = 'ARCHIVE_TIP_REQUEST';
export const ARCHIVE_TIP_SUCCESS = 'ARCHIVE_TIP_SUCCESS';
export const ARCHIVE_TIP_FAILURE = 'ARCHIVE_TIP_FAILURE';

export const STAR_TIP_SUCCESS = 'STAR_TIP_SUCCESS';
export const STAR_TIP_FAILURE = 'STAR_TIP_FAILURE';
export const UNSTAR_TIP_SUCCESS = 'UNSTAR_TIP_SUCCESS';
export const UNSTAR_TIP_FAILURE = 'UNSTAR_TIP_FAILURE';

export const LIKE_TIP_SUCCESS = 'LIKE_TIP_SUCCESS';
export const LIKE_TIP_FAILURE = 'LIKE_TIP_FAILURE';
export const UNLIKE_TIP_SUCCESS = 'UNLIKE_TIP_SUCCESS';
export const UNLIKE_TIP_FAILURE = 'UNLIKE_TIP_FAILURE';

export const FILTER_TIP_BY_SLUG = 'FILTER_TIP_BY_SLUG';
export const FILTER_TIP_BY_TOPIC = 'FILTER_TIP_BY_TOPIC';
export const RESET_TIP_FILTER = 'RESET_TIP_FILTER';
export const FILTER_USER_BY_ID = 'FILTER_USER_BY_ID';
export const RESET_USER_FILTER = 'RESET_USER_FILTER';

export const FILTER_TIP_CARD_VIEW_BY_ID = 'FILTER_TIP_CARD_VIEW_BY_ID';
export const RESET_FILTER_TIP_CARD_VIEW = 'RESET_FILTER_TIP_CARD_VIEW';

export const GET_TIP_BY_SLUG_REQUEST = 'GET_TIP_BY_SLUG_REQUEST';
export const GET_TIP_BY_SLUG_SUCCESS = 'GET_TIP_BY_SLUG_SUCCESS';
export const GET_TIP_BY_SLUG_FAILURE = 'GET_TIP_BY_SLUG_FAILURE';

export const SAVE_TIP_REQUEST = 'SAVE_TIP_REQUEST';
export const SAVE_TIP_SUCCESS = 'SAVE_TIP_SUCCESS';
export const SAVE_TIP_FAILURE = 'SAVE_TIP_FAILURE';

export const UPDATE_TIP_REQUEST = 'UPDATE_TIP_REQUEST';
export const UPDATE_TIP_SUCCESS = 'UPDATE_TIP_SUCCESS';
export const UPDATE_TIP_FAILURE = 'UPDATE_TIP_FAILURE';

export const MOVE_CARD_AFTER_CARDS_IN_TOPIC_SUCCESS =
  'MOVE_CARD_AFTER_CARDS_IN_TOPIC_SUCCESS';

export const RENAME_CARD_FAILURE = 'RENAME_CARD_FAILURE';
export const RENAME_CARD_REQUEST = 'RENAME_CARD_REQUEST';
export const RENAME_CARD_SUCCESS = 'RENAME_CARD_SUCCESS';

export const COMPLETE_CARD_FAILURE = 'COMPLETE_CARD_FAILURE';
export const COMPLETE_CARD_REQUEST = 'COMPLETE_CARD_REQUEST';
export const COMPLETE_CARD_SUCCESS = 'COMPLETE_CARD_SUCCESS';

export const UPDATE_CARD_DATES_FAILURE = 'UPDATE_CARD_DATES_FAILURE';
export const UPDATE_CARD_DATES_REQUEST = 'UPDATE_CARD_DATES_REQUEST';
export const UPDATE_CARD_DATES_SUCCESS = 'UPDATE_CARD_DATES_SUCCESS';

export const SET_TIP_MODAL_ACTIVE = 'SET_TIP_MODAL_ACTIVE';
export const SET_TIP_MODAL_HIDDEN = 'SET_TIP_MODAL_HIDDEN';
export const SET_TIP_EDIT_ACTIVE = 'SET_TIP_EDIT_ACTIVE';
export const SET_TIP_EDIT_HIDDEN = 'SET_TIP_EDIT_HIDDEN';
export const TOGGLE_TIP_RELATED = 'TOGGLE_TIP_RELATED';
export const RESET_TIP_MODAL = 'RESET_TIP_MODAL';
export const SET_TIP_CREATE_ACTIVE = 'SET_TIP_CREATE_ACTIVE';
export const SET_TIP_CREATE_HIDDEN = 'SET_TIP_CREATE_HIDDEN';

export const GET_LABELS_REQUEST = 'GET_LABELS_REQUEST';
export const GET_LABELS_SUCCESS = 'GET_LABELS_SUCCESS';
export const GET_LABELS_FAILURE = 'GET_LABELS_FAILURE';

export const ADD_LABEL_SUCCESS = 'ADD_LABEL_SUCCESS';
export const ADD_LABEL_FAILURE = 'ADD_LABEL_FAILURE';
export const REMOVE_LABEL_SUCCESS = 'REMOVE_LABEL_SUCCESS';
export const REMOVE_LABEL_FAILURE = 'REMOVE_LABEL_FAILURE';
export const UPDATE_LABEL_SUCCESS = 'UPDATE_LABEL_SUCCESS';
export const UPDATE_LABEL_FAILURE = 'UPDATE_LABEL_FAILURE';
export const ASSIGN_LABEL_SUCCESS = 'ASSIGN_LABEL_SUCCESS';
export const ASSIGN_LABEL_FAILURE = 'ASSIGN_LABEL_FAILURE';
export const UNASSIGN_LABEL_SUCCESS = 'UNASSIGN_LABEL_SUCCESS';
export const UNASSIGN_LABEL_FAILURE = 'UNASSIGN_LABEL_FAILURE';

export const ADD_LABEL_FILTER = 'ADD_LABEL_FILTER';
export const REMOVE_LABEL_FILTER = 'REMOVE_LABEL_FILTER';
export const REMOVE_ALL_LABEL_FILTER = 'REMOVE_ALL_LABEL_FILTER';

export const MINIMIZE_TIP = 'MINIMIZE_TIP';
export const RESTORE_TIP = 'RESTORE_TIP';
export const TOGGLE_MINIMIZE_BAR = 'TOGGLE_MINIMIZE_BAR';

export const NOTIFICATION_RECEIVED = 'NOTIFICATION_RECEIVED';
export const GET_NOTIFICATIONS_REQUEST = 'NOTIFICATIONS_REQUEST';
export const GET_NOTIFICATIONS_SUCCESS = 'NOTIFICATIONS_SUCCESS';
export const GET_NOTIFICATIONS_FAILURE = 'NOTIFICATIONS_FAILURE';
export const MARK_ALL_NOTIFICATIONS_READ = 'MARK_ALL_NOTIFICATIONS_READ';
export const MARK_NOTIFICATION_READ = 'MARK_NOTIFICATION_READ';

export const SELECT_VIEW = 'SELECT_VIEW';
export const SELECT_TOPIC_VIEW = 'SELECT_TOPIC_VIEW';
export const SELECT_GRID_VIEW = 'SELECT_GRID_VIEW';
export const SELECT_SMALL_GRID_VIEW = 'SELECT_SMALL_GRID_VIEW';
export const SELECT_LIST_VIEW = 'SELECT_LIST_VIEW';
export const SELECT_TASK_VIEW = 'SELECT_TASK_VIEW';
export const SELECT_CARD_VIEW = 'SELECT_CARD_VIEW';
export const SELECT_GRID_VIEW_FOR_TOPIC = 'SELECT_GRID_VIEW_FOR_TOPIC';
export const SELECT_SMALL_GRID_VIEW_FOR_TOPIC =
  'SELECT_SMALL_GRID_VIEW_FOR_TOPIC';
export const SELECT_LIST_VIEW_FOR_TOPIC = 'SELECT_LIST_VIEW_FOR_TOPIC';
export const SELECT_TASK_VIEW_FOR_TOPIC = 'SELECT_TASK_VIEW_FOR_TOPIC';
export const SELECT_CARD_VIEW_FOR_TOPIC = 'SELECT_CARD_VIEW_FOR_TOPIC';

export const TOGGLE_TOPIC_OPTIONS = 'TOGGLE_TOPIC_OPTIONS';
export const SET_ALL_TOPICS_VIEW = 'SET_ALL_TOPICS_VIEW';
export const SET_TOPIC_ID_VIEW = 'SET_TOPIC_ID_VIEW';

export const UPDATE_APP_VERSION = 'UPDATE_APP_VERSION';

export const GET_COMMENTS_REQUEST = 'GET_COMMENTS_REQUEST';
export const GET_COMMENTS_SUCCESS = 'GET_COMMENTS_SUCCESS';
export const GET_COMMENTS_FAILURE = 'GET_COMMENTS_FAILURE';
export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';
export const UPDATE_COMMENT_REQUEST = 'UPDATE_COMMENT_REQUEST';
export const UPDATE_COMMENT_SUCCESS = 'UPDATE_COMMENT_SUCCESS';
export const UPDATE_COMMENT_FAILURE = 'UPDATE_COMMENT_FAILURE';
export const REMOVE_COMMENT_SUCCESS = 'REMOVE_COMMENT_SUCCESS';
export const REMOVE_COMMENT_FAILURE = 'REMOVE_COMMENT_FAILURE';
export const GET_USERS_COMMENTS_SUCCESS = 'GET_USERS_COMMENTS_SUCCESS';
export const GET_USERS_COMMENTS_FAILURE = 'GET_USERS_COMMENTS_FAILURE';
export const SET_COMMENT_EDIT = 'SET_COMMENT_EDIT';
export const RESET_COMMENT_EDIT = 'RESET_COMMENT_EDIT';
export const GET_USERS_COMMENTS_REQUEST = 'GET_USERS_COMMENTS_REQUEST';

export const TOGGLE_LABELS_PANEL = 'TOGGLE_LABELS_PANEL';

export const ALL_TIPS = 'ALL_TIPS';
export const FOLLOWING_TIPS = 'FOLLOWING_TIPS';
export const LIKED_TIPS = 'LIKED_TIPS';
export const STARRED_TIPS = 'STARRED_TIPS';
export const MINE_TIPS = 'MINE_TIPS';
export const POPULAR_TIPS = 'POPULAR_TIPS';
export const RESET_FILTER = 'RESET_FILTER';

export const GET_USERS_REQUEST = 'GET_USERS_REQUEST';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_FAILURE = 'GET_USERS_FAILURE';
export const SET_FOLLOWING_USER = 'SET_FOLLOWING_USER';
export const FOLLOW_USER = 'FOLLOW_USER';
export const UNFOLLOW_USER = 'UNFOLLOW_USER';
export const FOLLOW_USER_FAILURE = 'FOLLOW_USER_FAILURE';
export const UNFOLLOW_USER_FAILURE = 'UNFOLLOW_USER_FAILURE';
export const GET_USER_BY_ID_REQUEST = 'GET_USER_BY_ID_REQUEST';
export const GET_USER_BY_ID_SUCCESS = 'GET_USER_BY_ID_SUCCESS';
export const GET_USER_BY_ID_FAILURE = 'GET_USER_BY_ID_FAILURE';

export const GET_APP_USER_REQUEST = 'GET_APP_USER_REQUEST';
export const GET_APP_USER_FAILURE = 'GET_APP_USER_FAILURE';
export const GET_APP_USER_SUCCESS = 'GET_APP_USER_SUCCESS';
export const UPDATE_APP_USER = 'UPDATE_APP_USER';
export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const RESET_USER = 'RESET_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';

export const GET_DOMAIN_INFO = 'GET_DOMAIN_INFO';

export const GET_TOPICS_REQUEST = 'GET_TOPICS_REQUEST';
export const GET_TOPICS_SUCCESS = 'GET_TOPICS_SUCCESS';
export const GET_TOPICS_FAILURE = 'GET_TOPICS_FAILURE';
export const TOPIC_FOLLOW_REQUEST = 'TOPIC_FOLLOW_REQUEST';
export const TOPIC_FOLLOW_SUCCESS = 'TOPIC_FOLLOW_SUCCESS';
export const TOPIC_FOLLOW_ERROR = 'TOPIC_FOLLOW_ERROR';
export const TOPIC_UNFOLLOW_REQUEST = 'TOPIC_UNFOLLOW_REQUEST';
export const TOPIC_UNFOLLOW_SUCCESS = 'TOPIC_UNFOLLOW_SUCCESS';
export const TOPIC_UNFOLLOW_ERROR = 'TOPIC_UNFOLLOW_ERROR';

export const LEFT_MENU_GET_TOPICS_REQUEST = 'LEFT_MENU_GET_TOPICS_REQUEST';
export const LEFT_MENU_GET_TOPICS_SUCCESS = 'LEFT_MENU_GET_TOPICS_SUCCESS';
export const LEFT_MENU_GET_TOPICS_FAILURE = 'LEFT_MENU_GET_TOPICS_FAILURE';
export const LEFT_MENU_GET_USERS_REQUEST = 'LEFT_MENU_GET_USERS_REQUEST';
export const LEFT_MENU_GET_USERS_SUCCESS = 'LEFT_MENU_GET_USERS_SUCCESS';
export const LEFT_MENU_GET_USERS_FAILURE = 'LEFT_MENU_GET_USERS_FAILURE';
export const LEFT_MENU_FOLLOW_USER = 'LEFT_MENU_FOLLOW_USER';
export const LEFT_MENU_FOLLOW_USER_FAILURE = 'LEFT_MENU_FOLLOW_USER_FAILURE';
export const LEFT_MENU_UNFOLLOW_USER = 'LEFT_MENU_UNFOLLOW_USER';
export const LEFT_MENU_UNFOLLOW_USER_FAILURE =
  'LEFT_MENU_UNFOLLOW_USER_FAILURE';

export const LEFT_MENU_SET_USER_FILTER = 'LEFT_MENU_SET_USER_FILTER';
export const LEFT_MENU_SET_TOPIC_FILTER = 'LEFT_MENU_SET_TOPIC_FILTER';
export const LEFT_MENU_TOGGLE = 'LEFT_MENU_TOGGLE';

export const SET_GROUP_BY_SLUG = 'SET_GROUP_BY_SLUG';
export const GET_GROUPS_REQUEST = 'GET_GROUPS_REQUEST';
export const GET_GROUPS_FAILURE = 'GET_GROUPS_FAILURE';
export const GET_GROUPS_SUCCESS = 'GET_GROUPS_SUCCESS';
export const ADD_GROUP_REQUEST = 'ADD_GROUP_REQUEST';
export const ADD_GROUP_FAILURE = 'ADD_GROUP_FAILURE';
export const ADD_GROUP_SUCCESS = 'ADD_GROUP_SUCCESS';
export const REMOVE_GROUP_REQUEST = 'REMOVE_GROUP_REQUEST';
export const REMOVE_GROUP_FAILURE = 'REMOVE_GROUP_FAILURE';
export const REMOVE_GROUP_SUCCESS = 'REMOVE_GROUP_SUCCESS';
export const UPDATE_GROUP_REQUEST = 'UPDATE_GROUP_REQUEST';
export const UPDATE_GROUP_FAILURE = 'UPDATE_GROUP_FAILURE';
export const UPDATE_GROUP_SUCCESS = 'UPDATE_GROUP_SUCCESS';

export const FILTER_GROUP_BY_SLUG = 'FILTER_GROUP_BY_SLUG';
export const RESET_GROUP_FILTER = 'RESET_GROUP_FILTER';

export const TIP_CONNECTIONS_SUCCESS = 'TIP_CONNECTIONS_SUCCESS';
export const TIP_CONNECTIONS_FAILURE = 'TIP_CONNECTIONS_FAILURE';

// Topic Page
export const GET_USERS_BY_DOMAIN_REQUEST = 'GET_USERS_BY_DOMAIN_REQUEST';
export const GET_USERS_BY_DOMAIN_SUCCESS = 'GET_USERS_BY_DOMAIN_SUCCESS';
export const GET_USERS_BY_DOMAIN_FAILURE = 'GET_USERS_BY_DOMAIN_FAILURE';
export const GET_ROLES_REQUEST = 'GET_ROLES_REQUEST';
export const GET_ROLES_SUCCESS = 'GET_ROLES_SUCCESS';
export const GET_ROLES_FAILURE = 'GET_ROLES_FAILURE';
export const UPDATE_ROLE_REQUEST = 'UPDATE_ROLE_REQUEST';
export const UPDATE_ROLE_SUCCESS = 'UPDATE_ROLE_SUCCESS';
export const UPDATE_ROLE_FAILURE = 'UPDATE_ROLE_FAILURE';
export const REMOVE_MEMBER_REQUEST = 'REMOVE_MEMBER_REQUEST';
export const REMOVE_MEMBER_SUCCESS = 'REMOVE_MEMBER_SUCCESS';
export const REMOVE_MEMBER_FAILURE = 'REMOVE_MEMBER_FAILURE';
export const GET_TOPIC_REQUEST = 'GET_TOPIC_REQUEST';
export const GET_TOPIC_SUCCESS = 'GET_TOPIC_SUCCESS';
export const GET_TOPIC_FAILURE = 'GET_TOPIC_FAILURE';
export const SAVE_TOPIC_REQUEST = 'SAVE_TOPIC_REQUEST';
export const SAVE_TOPIC_SUCCESS = 'SAVE_TOPIC_SUCCESS';
export const SAVE_TOPIC_FAILURE = 'SAVE_TOPIC_FAILURE';
export const UPDATE_TOPIC_REQUEST = 'UPDATE_TOPIC_REQUEST';
export const UPDATE_TOPIC_SUCCESS = 'UPDATE_TOPIC_SUCCESS';
export const UPDATE_TOPIC_FAILURE = 'UPDATE_TOPIC_FAILURE';
export const DELETE_TOPIC_REQUEST = 'DELETE_TOPIC_REQUEST';
export const DELETE_TOPIC_SUCCESS = 'DELETE_TOPIC_SUCCESS';
export const DELETE_TOPIC_FAILURE = 'DELETE_TOPIC_FAILURE';
export const GET_TOPIC_GROUP_REQUEST = 'GET_TOPIC_GROUP_REQUEST';
export const GET_TOPIC_GROUP_SUCCESS = 'GET_TOPIC_GROUP_SUCCESS';
export const GET_TOPIC_GROUP_FAILURE = 'GET_TOPIC_GROUP_FAILURE';
export const GET_TOPIC_SUBTOPICS_REQUEST = 'GET_TOPIC_SUBTOPICS_REQUEST';
export const GET_TOPIC_SUBTOPICS_SUCCESS = 'GET_TOPIC_SUBTOPICS_SUCCESS';
export const GET_TOPIC_SUBTOPICS_FAILURE = 'GET_TOPIC_SUBTOPICS_FAILURE';
export const STAR_TOPIC_SUCCESS = 'STAR_TOPIC_SUCCESS';
export const STAR_TOPIC_LEFT_MENU = 'STAR_TOPIC_LEFT_MENU';
export const STAR_TOPIC_FAILURE = 'STAR_TOPIC_FAILURE';
export const UNSTAR_TOPIC_SUCCESS = 'UNSTAR_TOPIC_SUCCESS';
export const UNSTAR_TOPIC_FAILURE = 'UNSTAR_TOPIC_FAILURE';
export const FOLLOW_TOPIC_SUCCESS = 'FOLLOW_TOPIC_SUCCESS';
export const FOLLOW_TOPIC_FAILURE = 'FOLLOW_TOPIC_FAILURE';
export const UNFOLLOW_TOPIC_SUCCESS = 'UNFOLLOW_TOPIC_SUCCESS';
export const UNFOLLOW_TOPIC_FAILURE = 'UNFOLLOW_TOPIC_FAILURE';
export const UPDATE_TOPIC_SUBTOPIC_SUCCESS = 'UPDATE_TOPIC_SUBTOPIC_SUCCESS';
export const UPDATE_TOPIC_SUBTOPIC_FAILURE = 'UPDATE_TOPIC_SUBTOPIC_FAILURE';
export const SAVE_TOPIC_SUBTOPIC_SUCCESS = 'SAVE_TOPIC_SUBTOPIC_SUCCESS';
export const SAVE_TOPIC_SUBTOPIC_FAILURE = 'SAVE_TOPIC_SUBTOPIC_FAILURE';
export const GET_TOPIC_TIPS_REQUEST = 'GET_TOPIC_TIPS_REQUEST';
export const GET_TOPIC_TIPS_SUCCESS = 'GET_TOPIC_TIPS_SUCCESS';
export const GET_TOPIC_TIPS_FAILURE = 'GET_TOPIC_TIPS_FAILURE';
export const GET_TOPIC_TIPS_WIKI_REQUEST = 'GET_TOPIC_TIPS_WIKI_REQUEST';
export const GET_TOPIC_TIPS_WIKI_SUCCESS = 'GET_TOPIC_TIPS_WIKI_SUCCESS';
export const GET_SUBTOPIC_TIPS_WIKI_SUCCESS = 'GET_SUBTOPIC_TIPS_WIKI_SUCCESS';
export const GET_TOPIC_TIPS_WIKI_FAILURE = 'GET_TOPIC_TIPS_WIKI_FAILURE';
export const CHANGE_TOPIC_TIP_ORDER_WIKI_SUCCESS =
  'CHANGE_TOPIC_TIP_ORDER_WIKI_SUCCESS';
export const CHANGE_TOPIC_TIP_ORDER_WIKI_FAILURE =
  'CHANGE_TOPIC_TIP_ORDER_WIKI_FAILURE';
export const STAR_TOPIC_TIP_SUCCESS = 'STAR_TOPIC_TIP_SUCCESS';
export const STAR_TOPIC_TIP_FAILURE = 'STAR_TOPIC_TIP_FAILURE';
export const UNSTAR_TOPIC_TIP_SUCCESS = 'UNSTAR_TOPIC_TIP_SUCCESS';
export const UNSTAR_TOPIC_TIP_FAILURE = 'UNSTAR_TOPIC_TIP_FAILURE';
export const LIKE_TOPIC_TIP_SUCCESS = 'LIKE_TOPIC_TIP_SUCCESS';
export const LIKE_TOPIC_TIP_FAILURE = 'LIKE_TOPIC_TIP_FAILURE';
export const UNLIKE_TOPIC_TIP_SUCCESS = 'UNLIKE_TOPIC_TIP_SUCCESS';
export const UNLIKE_TOPIC_TIP_FAILURE = 'UNLIKE_TOPIC_TIP_FAILURE';
export const CHANGE_TOPIC_TIP_ORDER_SUCCESS = 'CHANGE_TOPIC_TIP_ORDER_SUCCESS';
export const CHANGE_TOPIC_TIP_ORDER_FAILURE = 'CHANGE_TOPIC_TIP_ORDER_FAILURE';
export const ADD_TOPIC_TIP_SUCCESS = 'ADD_TOPIC_TIP_SUCCESS';
export const ADD_TOPIC_TIP_FAILURE = 'ADD_TOPIC_TIP_FAILURE';
export const REMOVE_TOPIC_TIP_SUCCESS = 'REMOVE_TOPIC_TIP_SUCCESS';
export const REMOVE_TOPIC_TIP_FAILURE = 'REMOVE_TOPIC_TIP_FAILURE';
export const ADD_TIP_FROM_TOPIC_SUCCESS = 'ADD_TIP_FROM_TOPIC_SUCCESS';
export const ADD_TIP_FROM_TOPIC_FAILURE = 'ADD_TIP_FROM_TOPIC_FAILURE';
export const MOVE_TIP_FROM_TOPIC_SUCCESS = 'MOVE_TIP_FROM_TOPIC_SUCCESS';
export const MOVE_TIP_FROM_TOPIC_FAILURE = 'MOVE_TIP_FROM_TOPIC_FAILURE';
export const UPDATE_TOPIC_VIEW_SUCCESS = 'UPDATE_TOPIC_VIEW_SUCCESS';
export const UPDATE_TOPIC_VIEW_FAILURE = 'UPDATE_TOPIC_VIEW_FAILURE';
export const REORDER_TOPIC_TIP_SUCCESS = 'REORDER_TOPIC_TIP_SUCCESS';
export const REORDER_TOPIC_TIP_FAILURE = 'REORDER_TOPIC_TIP_FAILURE';
export const DELETE_TOPIC_AND_MOVE_REQUEST = 'DELETE_TOPIC_AND_MOVE_REQUEST';
export const DELETE_TOPIC_AND_MOVE_SUCCESS = 'DELETE_TOPIC_AND_MOVE_SUCCESS';
export const DELETE_TOPIC_AND_MOVE_FAILURE = 'DELETE_TOPIC_AND_MOVE_FAILURE';
export const MOVE_TOPIC_REQUEST = 'MOVE_TOPIC_REQUEST';
export const MOVE_TOPIC_SUCCESS = 'MOVE_TOPIC_SUCCESS';
export const MOVE_TOPIC_FAILURE = 'MOVE_TOPIC_FAILURE';
export const DELETE_SUBTOPIC_REQUEST = 'DELETE_SUBTOPIC_REQUEST';
export const DELETE_SUBTOPIC_SUCCESS = 'DELETE_SUBTOPIC_SUCCESS';
export const DELETE_SUBTOPIC_FAILURE = 'DELETE_SUBTOPIC_FAILURE';
export const DELETE_SUBTOPIC_AND_MOVE_REQUEST =
  'DELETE_SUBTOPIC_AND_MOVE_REQUEST';
export const DELETE_SUBTOPIC_AND_MOVE_SUCCESS =
  'DELETE_SUBTOPIC_AND_MOVE_SUCCESS';
export const DELETE_SUBTOPIC_AND_MOVE_FAILURE =
  'DELETE_SUBTOPIC_AND_MOVE_FAILURE';
export const REORDER_TASK_TOPIC_TIP_SUCCESS = 'REORDER_TASK_TOPIC_TIP_SUCCESS';
export const ADD_TIP_FROM_TASK_TOPIC_SUCCESS =
  'ADD_TIP_FROM_TASK_TOPIC_SUCCESS';
export const MOVE_TIP_FROM_TASK_TOPIC_SUCCESS =
  'MOVE_TIP_FROM_TASK_TOPIC_SUCCESS';
export const CHANGE_TASK_TOPIC_TIP_ORDER_SUCCESS =
  'CHANGE_TASK_TOPIC_TIP_ORDER_SUCCESS';
export const SAVE_TIP_IN_TASK_TOPIC_REQUEST = 'SAVE_TIP_IN_TASK_TOPIC_REQUEST';
export const SAVE_TIP_IN_TASK_TOPIC_SUCCESS = 'SAVE_TIP_IN_TASK_TOPIC_SUCCESS';
export const SAVE_TIP_IN_TOPIC_SUCCESS = 'SAVE_TIP_IN_TOPIC_SUCCESS';
export const SAVE_TIP_IN_TASK_TOPIC_FAILURE = 'SAVE_TIP_IN_TASK_TOPIC_FAILURE';
export const SAVE_FIRST_TOPIC_REQUEST = 'SAVE_FIRST_TOPIC_REQUEST';
export const SAVE_FIRST_TOPIC_SUCCESS = 'SAVE_FIRST_TOPIC_SUCCESS';
export const SAVE_FIRST_TOPIC_FAILURE = 'SAVE_FIRST_TOPIC_FAILURE';
export const DELETE_TIP_IN_TASK_TOPIC_SUCCESS =
  'DELETE_TIP_IN_TASK_TOPIC_SUCCESS';
export const DELETE_TIP_IN_TASK_TOPIC_FAILURE =
  'DELETE_TIP_IN_TASK_TOPIC_FAILURE';
export const ARCHIVE_TIP_IN_TASK_TOPIC_REQUEST =
  'ARCHIVE_TIP_IN_TASK_TOPIC_REQUEST';
export const ARCHIVE_TIP_IN_TASK_TOPIC_SUCCESS =
  'ARCHIVE_TIP_IN_TASK_TOPIC_SUCCESS';
export const ARCHIVE_TIP_IN_TASK_TOPIC_FAILURE =
  'ARCHIVE_TIP_IN_TASK_TOPIC_FAILURE';
export const UPDATE_TIP_IN_TASK_TOPIC_SUCCESS =
  'UPDATE_TIP_IN_TASK_TOPIC_SUCCESS';
export const CREATE_SUBTOPIC_IN_TASK_VIEW_REQUEST =
  'CREATE_SUBTOPIC_IN_TASK_VIEW_REQUEST';
export const CREATE_SUBTOPIC_IN_TASK_VIEW_SUCCESS =
  'CREATE_SUBTOPIC_IN_TASK_VIEW_SUCCESS';
export const UPDATE_TOPIC_IN_TASK_VIEW_SUCCESS =
  'UPDATE_TOPIC_IN_TASK_VIEW_SUCCESS';
export const UPDATE_SUBTOPIC_IN_TASK_VIEW_SUCCESS =
  'UPDATE_SUBTOPIC_IN_TASK_VIEW_SUCCESS';
export const SET_SELECTED_TIP_FOR_WIKI_VIEW_SUCCESS =
  'SET_SELECTED_TIP_FOR_WIKI_VIEW_SUCCESS';
export const SET_SELECTED_TIP_FOR_WIKI_VIEW_FAILURE =
  'SET_SELECTED_TIP_FOR_WIKI_VIEW_FAILURE';
export const SET_TIP_NESTED_TIPS_SUCCESS = 'SET_TIP_NESTED_TIPS_SUCCESS';
export const SET_TIP_NESTED_TIPS_FAILURE = 'SET_TIP_NESTED_TIPS_FAILURE';
export const CHANGE_TIP_NESTED_TIPS_ORDER_SUCCESS =
  'CHANGE_TIP_NESTED_TIPS_ORDER_SUCCESS';
export const CHANGE_TIP_NESTED_TIPS_ORDER_FAILURE =
  'CHANGE_TIP_NESTED_TIPS_ORDER_FAILURE';
export const UPDATE_TIP_IN_TOPIC_REQUEST = 'UPDATE_TIP_IN_TOPIC_REQUEST';
export const UPDATE_TIP_IN_TOPIC_SUCCESS = 'UPDATE_TIP_IN_TOPIC_SUCCESS';
export const UPDATE_TIP_IN_TOPIC_FAILURE = 'UPDATE_TIP_IN_TOPIC_FAILURE';
export const SET_TOPIC_ACTIVE_VIEW_SUCCESS = 'SET_TOPIC_ACTIVE_VIEW_SUCCESS';

// Left Menu
export const TOGGLE_SUBTOPICS_PANEL = 'TOGGLE_SUBTOPICS_PANEL';
export const LEFT_MENU_GET_SUBTOPICS_REQUEST =
  'LEFT_MENU_GET_SUBTOPICS_REQUEST';
export const LEFT_MENU_GET_SUBTOPICS_SUCCESS =
  'LEFT_MENU_GET_SUBTOPICS_SUCCESS';
export const CREATE_SUBTOPICS_WITH_TITLE_REQUEST =
  'CREATE_SUBTOPICS_WITH_TITLE_REQUEST';
export const CREATE_SUBTOPICS_WITH_TITLE_SUCCESS =
  'CREATE_SUBTOPICS_WITH_TITLE_SUCCESS';
export const CREATE_SUBTOPICS_WITH_TITLE_FAILURE =
  'CREATE_SUBTOPICS_WITH_TITLE_FAILURE';

export const TOGGLE_HEX_GRID = 'TOGGLE_HEX_GRID';
export const GET_VIEWS = 'GET_VIEWS';

export const SET_UI_SETTINGS = 'SET_UI_SETTINGS';
export const UPDATE_UI_SETTINGS_REQUEST = 'UPDATE_UI_SETTINGS_REQUEST';
export const UPDATE_UI_SETTINGS_SUCCESS = 'UPDATE_UI_SETTINGS_SUCCESS';
export const UPDATE_UI_SETTINGS_FAILURE = 'UPDATE_UI_SETTINGS_FAILURE';
export const TOGGLE_LEFT_MENU_PEOPLE_PANEL = 'TOGGLE_LEFT_MENU_PEOPLE_PANEL';
export const FINISH_INTRO_TOUR = 'FINISH_INTRO_TOUR';
export const REMOVE_ATTACHMENT_FROM_TIP = 'REMOVE_ATTACHMENT_FROM_TIP';

export const SET_AUTO_SAVE_CONTENT = 'SET_AUTO_SAVE_CONTENT';
export const CLEAR_AUTO_SAVE_CONTENT = 'CLEAR_AUTO_SAVE_CONTENT';
export const FLUSH_TIP = 'FLUSH_TIP';

export const SAVE_LABEL_CATEGORY_REQUEST = 'SAVE_LABEL_CATEGORY_REQUEST';
export const SAVE_LABEL_CATEGORY_SUCCESS = 'SAVE_LABEL_CATEGORY_SUCCESS';
export const SAVE_LABEL_CATEGORY_FAILURE = 'SAVE_LABEL_CATEGORY_FAILURE';

export const GET_LABELS_CATEGORY_REQUEST = 'GET_LABELS_CATEGORY_REQUEST';
export const GET_LABELS_CATEGORY_SUCCESS = 'GET_LABELS_CATEGORY_SUCCESS';
export const GET_LABELS_CATEGORY_FAILURE = 'GET_LABELS_CATEGORY_FAILURE';

export const GET_ACTIVITIES_REQUEST = 'GET_ACTIVITIES_REQUEST';
export const GET_ACTIVITIES_SUCCESS = 'GET_ACTIVITIES_SUCCESS';
export const GET_ACTIVITIES_FAILURE = 'GET_ACTIVITIES_FAILURE';

export const SET_ASSIGN_FILTER = 'SET_ASSIGN_FILTER';

export const PRIORITY_LEVELS = [
  { id: 1, level: 'Highest', color: '#60cf8b' },
  { id: 2, level: 'High', color: '#5f8ccf' },
  { id: 3, level: 'Medium', color: '#cf61c4' },
  { id: 4, level: 'Low', color: '#3b3155' },
  { id: 5, level: 'Lowest', color: '#f2ab13' }
];
export const DEFAULT_DOMAIN_COLOR = '#C256A3';

export const GREY_VIEW = [
  'GRID',
  'SMALL_GRID',
  'PAGES',
  'WIKI',
  'ASSIGNED',
  'PRIORITIZE',
  'PLANNING',
  'TIMELINE',
  'CALENDAR',
  'STATUS_TABLE',
  'BURNDOWN',
  'LIST',
  'TASK',
  'CARD',
  'WEEKLY_SPREAD_VIEW',
  'FEED',
  'MY_PLAN',
  'TEAM_PLAN',
  'PROJECT_PLAN'
];

export const SHARE_NAMES = {
  private: 'Just Me (Private)',
  public: 'Everyone',
  following: 'People I Follow'
};

export const CACHE_AGE_MS = 60 * 60 * 24 * 1000;

export const superadminIds = (window.SUPERADMIN_IDS || '').split(',');

export const MAX_CARDS_PROGRESS_COUNT = 7;
