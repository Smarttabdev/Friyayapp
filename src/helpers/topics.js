import get from 'lodash/get';

import DomainFormPageActions from 'Src/actions/domain_form_page_actions';
import Ability from 'Src/lib/ability';
import { viewPayload } from 'Src/utils/views';
import { success } from 'Utils/toast';
import { updateUiSettings } from 'Src/newRedux/database/topics/apiCalls';
import { stateMappings } from 'Src/newRedux/stateMappings';
import store from 'Src/store/store';

import { createTopic } from 'Src/newRedux/database/topics/thunks';
import { setLeftSubtopicMenuOpenForTopic } from 'Src/newRedux/interface/menus/actions';
import { createCard } from 'Src/newRedux/database/cards/thunks';
import { setUserLensPinSettings } from 'Src/newRedux/database/topics/thunks';
import { createTopicOrder } from 'Src/newRedux/database/topicOrders/thunks';
import {
  updateTopic,
  setTopicFilterSettings
} from 'Src/newRedux/database/topics/thunks';
import {
  getUiSettings,
  setUserUiSettings,
  setUserFilterSettings
} from 'Src/helpers/user_config';

const { dispatch, getState } = store;

const mediumProjectChildren = [
  { id: 1, title: 'Tasks', defaultViewId: 'ACTION_PLAN', children: [] },
  { id: 2, title: 'Notes', defaultViewId: 'GRID', children: [] },
  { id: 3, title: 'Files', defaultViewId: 'DOCUMENT', children: [] },
  {
    id: 4,
    title: 'Chat',
    defaultViewId: 'CHAT',
    children: []
  },
  {
    id: 5,
    title: 'Project Briefing',
    defaultViewId: 'BASIC',
    children: []
  }
];

const createProjectTopic = async (parentId, yay) => {
  const createdTopic = await dispatch(
    createTopic({
      attributes: {
        title: yay.title,
        parent_id: parentId,
        default_view_id: yay.defaultViewId
      }
    })
  );

  const ui_settings = {
    current_active_template: yay.defaultViewId,
    card_hidden: yay.defaultViewId === 'TOPIC_TILES',
    subtopic_view: 'TILE',
    subtopic_panel_visible: yay.defaultViewId === 'TOPIC_TILES'
  };

  await updateUiSettings(
    get(createdTopic.data.data, 'attributes.user_configuration.data.id'),
    ui_settings,
    null
  );

  return createdTopic.data.data;
};

const createChildrenTopic = async (parentId, children) => {
  let subtopicOrderArray = [];
  for (let yay of children) {
    const createdTopic = await createProjectTopic(parentId, yay);
    subtopicOrderArray.push(createdTopic.id);
    await createNewCard(createdTopic.id);
    await createChildrenTopic(createdTopic.id, yay.children);
  }
  if (subtopicOrderArray.length !== 0) {
    dispatch(
      createTopicOrder({
        subtopicOrder: subtopicOrderArray,
        topicId: parentId,
        isDefault: true
      })
    );
  }
};

const createNewCard = async topicId => {
  const attributes = { title: 'Title' };
  const relationships = {
    topics: { data: [topicId] }
  };
  await dispatch(createCard({ attributes, relationships }));
};

// Create block
const createCardBlock = (type, position = 1, topicId) => {
  return mutations.createBlock({
    ownerId: toGid('Topic', topicId),
    type,
    position,
    config: {}
  });
};

export const initBoard = async (topic, board, boardType) => {
  const topicId = topic.id;
  const state = getState();
  const { user } = stateMappings(state);

  const uiSettings = getUiSettings(state, topicId);

  let pinnedLenses = uiSettings.pinned_lenses || [];
  pinnedLenses = [...new Set([board.key, ...pinnedLenses])];
  dispatch(
    setUserLensPinSettings(
      {
        ui_settings: {
          pinned_lenses: pinnedLenses
        }
      },
      topicId
    )
  );
  const projectPinnedLensKeys = [
    'PROJECT',
    'ACTION_PLAN',
    'CHAT',
    'VIDEO_CHAT'
  ];

  const smallProjectPinnedLensKeys = [
    'CANVAS',
    'PROJECT',
    'ACTION_PLAN',
    'MY_PLAN',
    'CHAT'
  ];

  const largeProjectPinnedLensKeys = [
    'CANVAS',
    'PROJECT',
    'TIMELINE',
    'MY_PLAN',
    'CHAT',
    'VIDEO_CHAT'
  ];

  const viewKey = board.key == 'PROJECT_SETUP' ? 'PROJECT' : board.key;
  const attributes = {
    default_view_id: viewKey,
    tag_list: boardType ? [boardType] : []
  };
  const payload = viewPayload(viewKey);
  await dispatch(setUserUiSettings(payload, topicId));

  if (board.name == 'Project Board') {
    await dispatch(
      setUserUiSettings(
        {
          pinned_lenses_bar_visible: true,
          pinned_lenses_bar_expanded: false
        },
        topicId
      )
    );
    await dispatch(
      setUserLensPinSettings(
        {
          ui_settings: {
            pinned_lenses: projectPinnedLensKeys
          }
        },
        topicId
      )
    );
  }

  if (board.name == 'My Tasks' || board.key == 'MY_WEEKLY_SPREAD_VIEW') {
    await dispatch(
      setUserFilterSettings(
        {
          assigned: [Number(user.id)]
        },
        topicId
      )
    );
  } else {
    await dispatch(setUserFilterSettings({ assigned: [] }, topicId));
  }

  if (board.name === 'Small Project') {
    await createCardBlock('cardTaskList', undefined, topicId);
    await dispatch(setUserUiSettings({ sprint_bar_visible: true }, topicId));
    await dispatch(
      setUserUiSettings({ pinned_lenses_bar_visible: true }, topicId)
    );
    await dispatch(
      setUserLensPinSettings(
        {
          ui_settings: {
            pinned_lenses: smallProjectPinnedLensKeys
          }
        },
        topicId
      )
    );
  }

  if (board.name === 'Medium Project') {
    success('Creating project, please wait...');
    dispatch(setLeftSubtopicMenuOpenForTopic(topicId));
    createChildrenTopic(topicId, mediumProjectChildren);
  }

  if (board.name === 'Large Project') {
    const defaultBlocks = [
      'goalList',
      'projectList',
      'cardTaskList',
      'boardList'
    ];
    success('Creating project, please wait...');
    dispatch(setLeftSubtopicMenuOpenForTopic(topicId));
    await createChildrenTopic(topicId, mediumProjectChildren, boardType);
    await defaultBlocks.forEach((block, i) =>
      createCardBlock(block, i + 1, topicId)
    );
    await dispatch(setUserUiSettings({ sprint_bar_visible: true }, topicId));
    await dispatch(
      setUserUiSettings({ pinned_lenses_bar_visible: true }, topicId)
    );
    await dispatch(
      setUserLensPinSettings(
        {
          ui_settings: {
            pinned_lenses: largeProjectPinnedLensKeys
          }
        },
        topicId
      )
    );
  }

  if (board.name === 'Project Canvas' || board.name === 'Goal Canvas') {
    await createCardBlock('cardTaskList', undefined, topicId);
    dispatch(setUserUiSettings({ sprint_bar_visible: true }, topicId));
  }

  if (board.name === 'Project Overview') {
    console.log('INITIAL PROJECT BOARD / PROJECT OVERVIEW');
    await dispatch(
      setUserUiSettings(
        {
          pinned_lenses_bar_visible: true,
          pinned_lenses_bar_expanded: false
        },
        topicId
      )
    );
    await dispatch(
      setUserLensPinSettings(
        {
          ui_settings: {
            pinned_lenses: ['PROJECT_OVERVIEW', 'ACTION_PLAN']
          }
        },
        topicId
      )
    );
  }

  if (board.name === 'Multiple Goals Canvas') {
    await createCardBlock('goalList', undefined, topicId);
    await createCardBlock('cardTaskList', undefined, topicId);

    setTimeout(() => {
      dispatch(setUserUiSettings({ sprint_bar_visible: true }, topicId));
    }, 3000);
  }
  // onUpdateComplete && onUpdateComplete();

  const updatedTopic = stateMappings(store.getState()).topics[topic.id];

  await mutations.createPinnedLensesOrder({
    name: 'Team Default',
    topicId: topic.id,
    isTeamDefault: true,
    order:
      updatedTopic?.attributes?.user_configuration?.data?.attributes
        ?.ui_settings?.pinned_lenses
  });

  // TODO: this should be at the end otherwise realtime topic update will override redux store with previous data
  if (topic) {
    const navigationView = ['HEX', 'TILE', 'SMALL_HEX', 'LIST'];
    if (!navigationView.includes(viewKey)) {
      await createNewCard(topic.id);
    }
    if (topic.id && board.category === 'planning') {
      await dispatch(
        setTopicFilterSettings(
          {
            include_subtopic_cards: !['TODO'].includes(board.key)
          },
          topicId
        )
      );
    }
    Ability.can('update', 'self', topic) &&
      (await dispatch(updateTopic({ id: topic.id, attributes })));
  } else {
    await DomainFormPageActions.updateDomainDefaultCardView(
      window.currentDomain.id,
      viewKey
    );
  }
};
