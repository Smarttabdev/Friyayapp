import { stateMappings } from 'Src/newRedux/stateMappings';
import Ability from 'Lib/ability';
import analytics from 'Lib/analytics';
import {
  getBoardType,
  returnRecordWithRemovedOrReplacedValueInArrayForAttribute,
  toggleItemInclusionInArray,
  toId
} from 'Lib/utilities';
import { success, failure } from 'Utils/toast';
import set from 'lodash/set';
import compact from 'lodash/compact';
import { addCards, changeCards } from 'Src/newRedux/database/cards/actions';
import { getCardsByTopic } from 'Src/newRedux/database/cards/selectors';
import { getGroups } from 'Src/newRedux/database/groups/thunks';
import { changeUser } from 'Src/newRedux/database/user/actions';
import {
  getTopicsByParentTopic,
  getSortedTopicsByParentTopic
} from './selectors';
import { getTopicFilters as getFilterQuery } from 'Src/newRedux/filters/selectors';
import {
  addTopics,
  changeTopic,
  changeTopics,
  deleteTopic,
  addTopicDesign,
  updateTopicDesign,
  deleteTopicDesign,
  activateTopicDesign,
  setDefaultDesign,
  updateUISettings,
  updateFilterSettings,
  updateOrderSettings,
  updateGroupSettings,
  setCustomLens
} from './actions';
import api from './apiCalls';
import { deNormalizeTopic, normalizeTopic, normalizeTopics } from './schema';
import { updateOrCreateTopicOrderFromTopicMove } from 'Src/newRedux/database/topicOrders/abstractions';
import { batchActions } from 'redux-batch-enhancer';
import { mergeUserAttributes } from 'Src/newRedux/database/user/actions';
import { logRollBarError } from 'Lib/rollbar';
import { setSelectTopicDestinationModalOpen } from 'Src/newRedux/interface/modals/actions';
import { isDeletingTopic } from 'Src/newRedux/interface/loadIndicators/actions';
import { updateUserUiSettings } from 'Src/newRedux/database/user/thunks';
import {
  SAVE_FIRST_TOPIC_REQUEST,
  SAVE_FIRST_TOPIC_SUCCESS,
  SAVE_FIRST_TOPIC_FAILURE
} from 'AppConstants';
import { topicDesignLoader } from 'Src/newRedux/interface/lenses/actions';
import get from 'lodash/get';
import {
  getFilterSettings,
  getCustomLensId,
  getUserConfig
} from 'Src/helpers/user_config';
import { updateDomainUiSettings } from '../domains/actions';
import { viewPayload } from 'Src/utils/views';
import { addTopicItem, deleteTopicItem } from 'Lib/items';
import store from 'store/store';
import { updateUiSettings as updateUiSettingsApi } from 'Src/newRedux/database/topics/apiCalls';

export const createTopicDesign = newTopicDesign => async dispatch => {
  try {
    dispatch(topicDesignLoader({ topicDesignLoading: true }));
    const newServerDesign = await api.postTopicDesign(newTopicDesign);
    dispatch(addTopicDesign(newServerDesign.data));
    dispatch(selectTopicDesign(newServerDesign.data.data.id));
    dispatch(topicDesignLoader({ topicDesignLoading: false }));
    return newServerDesign;
  } catch (error) {
    failure('Unable to create new topic design');
    logRollBarError(error, 'warning', 'Create topic design Error');
    return null;
  }
};

export const changeTopicDesign = newTopicDesign => async dispatch => {
  try {
    dispatch(topicDesignLoader({ topicDesignLoading: true }));
    const {
      data: {
        data: { id, attributes }
      }
    } = await api.updateTopicDesign(newTopicDesign);
    dispatch(updateTopicDesign({ id, ...attributes }));
    dispatch(topicDesignLoader({ topicDesignLoading: false }));
    return;
  } catch (error) {
    failure('Unable to update topic design');
    logRollBarError(error, 'warning', 'Update topic design Error');
    return null;
  }
};

export const removeTopicDesign = (id, topic_id) => async dispatch => {
  try {
    dispatch(topicDesignLoader({ topicDesignLoading: true }));
    await api.deleteTopicDesign(id);
    dispatch(deleteTopicDesign({ id, topic_id }));
    dispatch(topicDesignLoader({ topicDesignLoading: false }));
    return '';
  } catch (error) {
    failure('Unable to delete topic design');
    logRollBarError(error, 'warning', 'Delete topic design Error');
    return null;
  }
};

export const selectTopicDesign = id => async dispatch => {
  try {
    dispatch(topicDesignLoader({ topicDesignLoading: true }));
    const topicDesign = await api.activateDesign(id);
    dispatch(activateTopicDesign(topicDesign.data));
    dispatch(topicDesignLoader({ topicDesignLoading: false }));
    return topicDesign;
  } catch (error) {
    failure('Unable to activate topic design');
    logRollBarError(error, 'warning', 'Activate topic design Error');
    return null;
  }
};

export const activateDefaultDesign = payload => async dispatch => {
  try {
    dispatch(topicDesignLoader({ topicDesignLoading: true }));
    const topicDesign = await api.defaultDesign(payload);
    dispatch(setDefaultDesign(payload));
    dispatch(topicDesignLoader({ topicDesignLoading: false }));
    return topicDesign;
  } catch (error) {
    failure('Failed to set default design');
    logRollBarError(error, 'warning', 'Activate topic design Error');
    return null;
  }
};

export const createFirstTopic = newTopic => async dispatch => {
  try {
    dispatch({ type: SAVE_FIRST_TOPIC_REQUEST });
    const newServerTopic = await api.postTopic(newTopic);
    analytics.track('Topic Created', {
      id: newServerTopic.data.data.id,
      title: newServerTopic.data.data.attributes.title
    });

    dispatch({
      type: SAVE_FIRST_TOPIC_SUCCESS,
      payload: newServerTopic.data.data
    });

    return newServerTopic.data.data;
  } catch (error) {
    failure('Unable to save new Board');
    dispatch({ type: SAVE_FIRST_TOPIC_FAILURE });
    return null;
  }
};

export const createDefaultTopic = () => async (dispatch, getState) => {
  try {
    const newServerTopic = await api.createDefaultTopic();
    const userFollowedTopics = [
      ...stateMappings(getState()).user.relationships.following_topics.data,
      newServerTopic.data.data.id
    ];
    //Add topic to redux, and add it to topics user follows (in redux only, as server does this for us, we just don't update the user_follows at this moment)
    dispatch(
      batchActions([
        addTopics(normalizeTopic(newServerTopic).topics),
        mergeUserAttributes({
          relationships: { following_topics: { data: userFollowedTopics } }
        })
      ])
    );

    if (newServerTopic.status === 201) {
      analytics.track('Topic Created', {
        id: newServerTopic.data.data.id,
        title: newServerTopic.data.data.attributes.title
      });
      success('Default Board created!');
    }
    return newServerTopic;
  } catch (error) {
    failure('Unable to save default Board');
    logRollBarError(error, 'warning', 'Create default Board Error');
    console.log(error);
    return null;
  }
};

export const createTopic = (newTopic, includeOptions) => async (
  dispatch,
  getState
) => {
  const allTopics = getSortedTopicsByParentTopic(getState())[0] || [];
  const allTopicsTitle = allTopics.map(topic => topic.attributes.title);

  //check for duplicate name -- Logic Start
  if (allTopicsTitle.includes(newTopic.attributes.title)) {
    const copies = allTopicsTitle.filter(
      val => val.search(newTopic.attributes.title) != -1
    );
    const copyCountReg = /\d+/;
    const copiesWithCount = copies.filter(val =>
      val.charAt(val.length - 1).match(copyCountReg)
    );
    if (copiesWithCount.length > 0) {
      const copyCounts = copiesWithCount.map(val =>
        parseInt(val.charAt(val.length - 1))
      );
      newTopic.attributes.title =
        newTopic.attributes.title + ' ' + (Math.max(...copyCounts) + 1);
    } else {
      newTopic.attributes.title = newTopic.attributes.title + ' 2';
    }
  }
  //check for duplicate name -- Logic End

  try {
    const newServerTopic = await api.postTopic(newTopic, includeOptions);
    const userFollowedTopics = [
      ...stateMappings(getState()).user.relationships.following_topics.data,
      newServerTopic.data.data.id
    ];
    //Add topic to redux, and add it to topics user follows (in redux only, as server does this for us, we just don't update the user_follows at this moment)
    dispatch(
      batchActions([
        addTopics(normalizeTopic(newServerTopic).topics),
        mergeUserAttributes({
          relationships: { following_topics: { data: userFollowedTopics } }
        })
      ])
    );

    // addTopicItem(newServerTopic.data.data);

    analytics.track('Topic Created', {
      id: newServerTopic.data.data.id,
      title: newServerTopic.data.data.attributes.title
    });

    if (getBoardType(newServerTopic.data.data) == 'project') {
      const uiSettings = {
        pinned_lenses: ['PROJECT_OVERVIEW', 'ACTION_PLAN']
      };

      updateUISettings({
        topicId: newServerTopic.data?.data?.id,
        ui_settings: uiSettings
      });

      await updateUiSettingsApi(
        newServerTopic.data?.data?.attributes.user_configuration.data.id,
        uiSettings,
        null
      );
    }

    success('New Board created!');
    return newServerTopic;
  } catch (error) {
    failure('Unable to save new Board');
    logRollBarError(error, 'warning', 'Create Board Error');
    console.log(error);
    return null;
  }
};

export const getTopic = ({ topicSlug, topicId }) => async dispatch => {
  try {
    const topicData = await api.fetchTopic({ topicSlug, topicId });
    dispatch(addTopics(normalizeTopic(topicData).topics));
    return topicData;
  } catch (error) {
    failure('Unable to load Board');
    logRollBarError(error, 'warning', 'Get Board Error');
    return null;
  }
};

export const getTopics = ({
  roots,
  all,
  title,
  topicIds,
  createdBy,
  followedBy,
  assignedId,
  assignedType,
  pageNumber,
  pageSize,
  parentTopicId,
  subtopics,
  sharedWith,
  tagged,
  tagOn,
  tagOp,
  type
}) => async (dispatch, getState) => {
  const sm = stateMappings(getState());
  const userId = sm.user.id;
  const topicFilters = getFilterQuery(getState());
  const filterToFollows =
    !followedBy && !topicFilters.map(filter => filter.key).includes('ALL');

  const fetchQueries = [
    roots && '&roots=true',
    all && '&all=true',
    topicIds && '&ids=' + topicIds,
    title && '&filter[title]=' + title,
    createdBy && '&filter[created_by]=' + createdBy,
    followedBy && '&filter[followed_by_user]=' + followedBy,
    assignedId && '&filter[assigned_to]=' + assignedId,
    assignedType && '&filter[assigned_to_type]=' + assignedType,
    sharedWith && '&filter[shared_with]=' + sharedWith,
    type && '&filter[type]=' + type,
    parentTopicId && '&parent_id=' + parentTopicId,
    subtopics && '&subtopics=' + subtopics,
    `&page[size]=${pageSize || 99}`,
    pageNumber && '&page[number]=' + pageNumber,
    filterToFollows && '&filter[followed_by_user]=' + userId, //this to filter topics on personal workspace
    tagged && '&tagged=' + tagged, // list of tags
    tagOn && '&tag_on=' + tagOn, // tags|categories -- omit for now
    tagOp && '&tag_op=' + tagOp // any|exact|exclude -- defaults to any if omitted
  ];

  const fetchQuery = compact(fetchQueries).join('');
  try {
    const topicsData = await api.fetchTopics(fetchQuery);
    const normalizedTopics = normalizeTopics(topicsData).topics;
    dispatch(addTopics(normalizedTopics));
    return topicsData;
  } catch (error) {
    failure('Unable to load boards');
    logRollBarError(error, 'warning', 'Get Topics Error');
    return null;
  }
};

export const moveTopicContents = ({ destinationTopicId, topicId }) => async (
  dispatch,
  getState
) => {
  try {
    const state = getState();
    const sm = stateMappings(state);
    const thisTopicsCards = getCardsByTopic(state)[topicId] || [];
    const destinationTopic = sm.topics[destinationTopicId];
    const thisTopic = sm.topics[topicId];
    // const cardUpdates = thisTopicsCards.map(card =>
    //   returnRecordWithRemovedOrReplacedValueInArrayForAttribute({
    //     record: card,
    //     attributePath: 'relationships.topics.data',
    //     oldValue: topicId,
    //     newValue: destinationTopicId
    //   })
    // );

    // const thisTopicsSubtopics = getTopicsByParentTopic(state)[topicId] || [];
    // const topicUpdates = thisTopicsSubtopics.map(topic => {
    //   const topicClone = { ...topic };
    //   const topicPath = [destinationTopic, topicClone].map(top => ({
    //     id: top.id,
    //     type: 'topics',
    //     title: top.attributes.title,
    //     slug: top.attributes.slug
    //   }));
    //   set(topicClone, 'relationships.parent.data', destinationTopicId);
    //   set(topicClone, 'attributes.path', topicPath);
    //   return topicClone;
    // });
    const lastPath =
      thisTopic.attributes.path[thisTopic.attributes.path.length - 1];
    set(thisTopic, 'attributes.path', [
      ...destinationTopic.attributes.path,
      lastPath
    ]);
    set(thisTopic, 'attributes.parent_id', destinationTopicId);
    set(destinationTopic, 'attributes.subtopics', [
      ...destinationTopic.attributes.subtopics,
      {
        id: thisTopic.id,
        title: thisTopic.attributes.title
      }
    ]);
    const data = {
      data: {
        alternate_topic_id: destinationTopicId,
        move_tip_ids: 'all'
      }
    };
    const serverUpdate = await api.postActionOnTopic({
      topicId: topicId,
      action: 'move',
      data
    });
    const normalizedTopic = normalizeTopic(serverUpdate).topics;
    // dispatch(changeCards(cardUpdates));
    // dispatch(changeTopics(topicUpdates));
    dispatch(changeTopics([destinationTopic, thisTopic]));
    dispatch(addTopics(normalizedTopic));
    dispatch(setSelectTopicDestinationModalOpen(topicId, false, 'move'));
    return serverUpdate;
  } catch (error) {
    failure('Unable to move Board contents');
    logRollBarError(error, 'warning', 'Move Topic Error');
    return null;
  }
};

export const moveTopic = ({
  afterTopicId,
  beforeTopicId,
  parentTopicId,
  topic
}) => dispatch => {
  if (afterTopicId || beforeTopicId) {
    dispatch(
      updateOrCreateTopicOrderFromTopicMove({
        afterTopicId,
        beforeTopicId,
        movedTopicId: topic.id,
        parentTopicId
      })
    );
  }
};

export const moveOrCopyTopicInOrToTopic = ({
  afterTopicId,
  beforeTopicId,
  topic,
  fromTopicId,
  toTopicId
}) => dispatch => {
  if (Ability.can('update', 'self', topic)) {
    const dispatches = [];

    if (fromTopicId && toTopicId && fromTopicId != toTopicId) {
      const attributes = { parent_id: toTopicId };
      dispatches.push(updateTopic({ id: topic.id, attributes }));
    }

    if (afterTopicId || beforeTopicId) {
      dispatches.push(
        updateOrCreateTopicOrderFromTopicMove({
          afterTopicId,
          beforeTopicId,
          movedTopicId: topic.id,
          parentTopicId: toTopicId
        })
      );
    }

    dispatch(batchActions(dispatches));
  } else {
    failure("You don't have permission to move that topic!");
  }
};

export const removeTopic = topicId => async (dispatch, getState) => {
  vex.dialog.confirm({
    message: 'Are you sure you want to delete this Board?',
    callback: async value => {
      if (value) {
        dispatch(isDeletingTopic(topicId));
        try {
          await api.deleteTopic(topicId);
        } catch (error) {
          failure('Unable to remove Board');
          dispatch(isDeletingTopic(null));
        }

        const sm = stateMappings(getState());
        const thisTopic = sm.topics[topicId];
        dispatch(deleteTopic(topicId));
        deleteTopicItem(topicId);

        const history = sm.routing.routerHistory;
        const rootUrl = sm.page.rootUrl;
        const baseUrl = rootUrl == '/' ? rootUrl : rootUrl + '/';
        const topicPath = thisTopic.attributes.path;
        const prevTopic = topicPath[topicPath.length - 2];
        const slug = prevTopic ? prevTopic.slug : '';

        const currentPath = sm.routing.routerHistory.location.pathname;
        currentPath === '/'
          ? history.push(`${baseUrl}`)
          : history.push(`${baseUrl}boards/${slug}`);
      }
    }
  });
};

export const removeTopicAndMoveContent = (
  topicId,
  destinationTopicId
) => async (dispatch, getState) => {
  const sm = stateMappings(getState());
  const thisTopic = sm.topics[topicId];

  try {
    const originalTopicsCards = getCardsByTopic(getState())[topicId] || [];
    const originalTopicsSubtopics =
      getTopicsByParentTopic(getState())[topicId] || [];

    const cardUpdates = originalTopicsCards.reduce((a, b) => {
      const updatedCard = { ...b };
      set(
        updatedCard,
        'relationships.topics.data',
        updatedCard.relationships.topics.data.map(id =>
          id == topicId ? destinationTopicId : id
        )
      );
      set(a, `${b.id}`, updatedCard);
      return a;
    }, {});

    const subtopicUpdates = originalTopicsSubtopics.map(topic =>
      returnRecordWithRemovedOrReplacedValueInArrayForAttribute({
        record: topic,
        attributePath: 'attribute.parent_id',
        oldValue: topicId,
        newValue: destinationTopicId,
        isArrayAttrubuteValue: false
      })
    );
    //
    // const subtopicUpdates = originalTopicsSubtopics.reduce( (a, b) => {
    //   const updatedTopic = { ...b };
    //   set( updatedTopic, 'relationships.parent_topic.data', destinationTopicId);
    //   set( a, `${b.id}`, updatedTopic );
    //   return a;
    // }, {});
    dispatch(
      batchActions([
        deleteTopic(topicId),
        addCards(cardUpdates),
        changeTopics(subtopicUpdates)
      ])
    );

    const history = sm.routing.routerHistory;
    const rootUrl = sm.page.rootUrl;
    const baseUrl = rootUrl == '/' ? rootUrl : rootUrl + '/';
    const slug = sm.topics[destinationTopicId].attributes.slug;
    history.push(`${baseUrl}boards/${slug}`);

    await api.deleteTopicAndMoveContent(topicId, destinationTopicId);
  } catch (error) {
    failure('Unable to remove Board');
    dispatch(addTopics({ [thisTopic.id]: thisTopic }));
  }
};

export const toggleFollowTopic = topicId => async (dispatch, getState) => {
  const userFollowedTopics = [
    ...stateMappings(getState()).user.relationships.following_topics.data
  ];
  const revisedFollows = toggleItemInclusionInArray(
    topicId,
    userFollowedTopics
  );

  dispatch(
    changeUser({
      relationships: { following_topics: { data: revisedFollows } }
    })
  );
  api.postActionOnTopic({
    topicId: topicId,
    action: userFollowedTopics.includes(topicId) ? 'leave' : 'join'
  });
};

export const toggleStarTopic = topicId => async (dispatch, getState) => {
  const topic = stateMappings(getState()).topics[topicId];
  const topicIsStarred = topic.attributes.starred_by_current_user;
  api.postActionOnTopic({
    topicId: topicId,
    action: topicIsStarred ? 'unstar' : 'star'
  });
  dispatch(
    changeTopic({
      id: topicId,
      attributes: {
        ...topic.attributes,
        starred_by_current_user: !topicIsStarred
      },
      relationships: topic.relationships
    })
  );
};

export const updateTopic = ({
  attributes = {},
  id,
  relationships = {}
}) => async (dispatch, getState) => {
  const prevVersion = { ...getState()._newReduxTree.database.topics[id] };
  if (Ability.can('update', 'self', prevVersion)) {
    const newVersion = {
      ...prevVersion,
      attributes: { ...prevVersion.attributes, ...attributes },
      relationships: { ...prevVersion.relationships, ...relationships }
    };
    dispatch(changeTopic(newVersion));
    try {
      const updates = { id, attributes, relationships };
      const updatedTopic = await api.patchTopic(deNormalizeTopic(updates));
      //next line as share settings is generated at server:
      dispatch(
        batchActions([
          addTopics(normalizeTopic(updatedTopic).topics),
          // Should group followers change
          getGroups()
        ])
      );
      success('Board updated');
    } catch (error) {
      failure('Unable to save changes');
      logRollBarError(error, 'warning', 'Update Topic Error');
      dispatch(changeTopic(prevVersion));
    }
  } else {
    failure("You don't have permission to make changes to this Board");
  }
};

export const viewTopic = ({ topicId, topicSlug }) => (dispatch, getState) => {
  const sm = stateMappings(getState());
  const history = sm.routing.routerHistory;
  const rootUrl = sm.page.rootUrl;
  const baseUrl = rootUrl == '/' ? rootUrl : rootUrl + '/';
  const slug =
    topicSlug || stateMappings(getState()).topics[topicId].attributes.slug;
  history.push(`${baseUrl}boards/${slug}`);
};

/**
 * Toggle hide/show cards of a topic.
 *
 * @param {Object}  topic
 * @return {Void}
 */
export const toggleHideCards = (topic, setAsDefault = false) => {
  return async (dispatch, getState) => {
    const sm = stateMappings(getState());
    const { topics, user, page } = sm;
    // copy object to prevent direct state mutation
    const topicCopy = { ...topics[topic.id] };

    const { attributes } = topicCopy;
    const { cards_hidden } = attributes;
    topicCopy.attributes.cards_hidden = !cards_hidden;

    try {
      // Optimistic UI, revert when failed.
      const currentSettings = user.attributes.ui_settings.my_topics_view.find(
        item => item.id === page.topicId
      );
      const updatedSettings = [
        ...user.attributes.ui_settings.my_topics_view.filter(
          item => item.id !== page.topicId
        ),
        {
          id: page.topicId,
          view: currentSettings ? currentSettings.view : null,
          cards_hidden: !currentSettings.cards_hidden,
          subtopic_view: currentSettings.subtopic_view,
          subtopic_panel_visible: !currentSettings.subtopic_panel_visible
            ? false
            : true
        }
      ];
      const newSettings = { my_topics_view: updatedSettings };
      dispatch(updateUserUiSettings({ newSettings }));

      if (setAsDefault) {
        dispatch(changeTopic(topicCopy));
        await api.patchTopic(topicCopy);
      }
    } catch (err) {
      dispatch(changeTopic({ ...topic }));
      failure('Unable to update Board');
      console.error(err);
    }
  };
};

/**
 * Determine whether topic has its cards hidden.
 *
 * @param {Object}  topic
 * @return  {Boolean}
 */
export const isCardsHidden = topic => {
  return (dispatch, getState) => {
    const sm = stateMappings(getState());
    const { user } = sm;
    const { my_topics_view } = user.attributes.ui_settings;
    const myTopicView = my_topics_view.find(item => item.id === topic.id);

    return (
      (myTopicView && myTopicView.cards_hidden) ||
      (topic && topic.attributes.cards_hidden)
    );
  };
};

export const setUserLensPinSettings = (
  { ui_settings, action, view },
  topic_id
) => async (dispatch, getState) => {
  try {
    const sm = stateMappings(getState());
    const lensId = getCustomLensId(getState());
    const topicId = topic_id ? topic_id : sm.page.topicId;
    const domainId = sm.page.domainId;
    if (topicId) {
      dispatch(updateUISettings({ topicId, ui_settings }));
    } else {
      dispatch(updateDomainUiSettings({ domainId, ui_settings }));
    }
    const { id } = getUserConfig(getState());

    if (id) {
      let payload;
      if (action === 'add') {
        payload = {
          data: { ui_settings: { pinned: [view] }, lens_id: lensId }
        };
      } else if (action === 'remove') {
        payload = {
          data: { ui_settings: { unpinned: [view] }, lens_id: lensId }
        };
      } else {
        payload = {
          data: { ui_settings, lens_id: lensId }
        };
      }
      await api.updatePinLensSettings(id, payload);
    }
  } catch (error) {
    failure('Unable update pin tool');
    logRollBarError(error, 'warning', 'Update Pin Tool Error');
    return null;
  }
};

export const setTopicUiSettings = (ui_settings, topic_id) => async (
  dispatch,
  getState
) => {
  try {
    const sm = stateMappings(getState());
    const lensId = getCustomLensId(getState());
    const topicId = topic_id ? topic_id : sm.page.topicId;
    dispatch(updateUISettings({ topicId, ui_settings }));
    const { id } = getUserConfig(getState());
    id && (await api.updateUiSettings(id, ui_settings, lensId));
  } catch (error) {
    console.log(error);
    failure('Unable update user configration');
    logRollBarError(error, 'warning', 'Update User Configuration Error');
    return null;
  }
};

export const setTopicFilterSettings = (filter_setting, topicId) => async (
  dispatch,
  getState
) => {
  try {
    const sm = stateMappings(getState());
    const lensId = getCustomLensId(getState());
    topicId = topicId || sm.page.topicId;
    const { id } = getFilterSettings(getState());
    dispatch(updateFilterSettings({ topicId, filter_setting }));
    id && (await api.updateFilterSettings(id, filter_setting, lensId));
  } catch (error) {
    failure('Unable update filter settings');
    logRollBarError(error, 'warning', 'Update Filter Error');
    return null;
  }
};

export const setTopicOderSettings = orders => async (dispatch, getState) => {
  try {
    const sm = stateMappings(getState());
    const topicId = sm.page.topicId;
    return dispatch(updateOrderSettings({ topicId, orders }));
  } catch (error) {
    failure('Unable update order settings');
    logRollBarError(error, 'warning', 'Update Order Error');
    return null;
  }
};

export const setUserGroupSettings = (topicId, group, lensId) => async (
  dispatch,
  getState
) => {
  try {
    dispatch(updateGroupSettings({ topicId, group }));
    const { id } = getUserConfig(getState());
    id && (await api.updateUiSettings(id, { group_settings: group }, lensId));
  } catch (error) {
    failure('Unable update group settings');
    logRollBarError(error, 'warning', 'Update Group Error');
    return null;
  }
};

export const selectCustomTopicLens = ({
  current_active_lens_id,
  id,
  current_active_template
}) => async (dispatch, getState) => {
  try {
    const userConfiguration = await api.selectCustomLens(
      id,
      current_active_lens_id,
      current_active_template
    );
    const sm = stateMappings(getState());
    const topicId = sm.page.topicId;
    dispatch(
      setCustomLens({
        topicId,
        attributes: get(userConfiguration, 'data.data.attributes')
      })
    );

    if (current_active_template) {
      const payload = viewPayload(current_active_template);
      dispatch(setTopicUiSettings(payload));
    }
    return;
  } catch (error) {
    failure('Unable select tool');
    logRollBarError(error, 'warning', 'Select tool error');
    return null;
  }
};

export const copyTopic = topicId => async dispatch => {
  try {
    let topic = await api.copyTopic(topicId);
    success('Board copied');
    return topic.data.data;
  } catch (error) {
    failure('Unable to copy Board');
    console.error(error);
  }
};

export const toggleTemplateTopic = topicId => async (dispatch, getState) => {
  const topic = stateMappings(getState()).topics[topicId];
  const topicIsTemplate = topic.attributes.is_template;
  dispatch(
    changeTopic({
      id: topicId,
      attributes: {
        ...topic.attributes,
        is_template: !topicIsTemplate
      },
      relationships: topic.relationships
    })
  );
};

export const removeDesign = (
  topicId,
  { removeTopicDesign, removeDefaultDesign }
) => async (dispatch, getState) => {
  try {
    const topic = stateMappings(getState()).topics[topicId];
    const newAttributes = {};
    if (removeTopicDesign) {
      newAttributes.topic_design_id_for_current_user = null;
    }
    if (removeDefaultDesign) {
      newAttributes.default_design_id = null;
    }
    dispatch(
      changeTopic({
        ...topic,
        attributes: {
          ...topic.attributes,
          ...newAttributes
        },
        relationships: topic.relationships
      })
    );
    await api.removeDesign(topicId, { removeTopicDesign, removeDefaultDesign });
  } catch (error) {
    failure('Unable to clear topic design');
    console.error(error);
  }
};

export const ensureTopic = topicId => async (dispatch, getState) => {
  topicId = toId(topicId);
  const { topics } = stateMappings(getState());
  const topic = topics[topicId];
  !topic?.relationships?.masks && (await dispatch(getTopic({ topicId })));
};
