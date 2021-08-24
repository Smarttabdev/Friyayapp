import React, { Component } from 'react';
import {
  createTopic,
  viewTopic,
  setUserLensPinSettings
} from 'Src/newRedux/database/topics/thunks';
import { updateUiSettings } from 'Src/newRedux/database/topics/apiCalls';
import { createCard } from 'Src/newRedux/database/cards/thunks';
import get from 'lodash/get';
import { success } from 'Utils/toast';
import { connect } from 'react-redux';
import ViewsDropdown from './ViewsDropdown';
import { setLeftSubtopicMenuOpenForTopic } from 'Src/newRedux/interface/menus/actions';
import { getUiSettings, setUserUiSettings } from 'Src/helpers/user_config';

const boards = [
  {
    name: 'Create Action Plan',
    image: 'action',
    yays: [
      {
        id: 1,
        title: 'Action Plan Title',
        defaultViewId: 'ACTION_PLAN',
        children: []
      }
    ]
  },
  {
    name: 'Create Wiki',
    image: 'wiki',
    yays: [
      {
        id: 1,
        title: 'Wiki Title',
        defaultViewId: 'WIKI',
        children: []
      }
    ]
  },
  {
    name: 'Create List',
    image: 'task',
    yays: [{ id: 1, title: 'List', defaultViewId: 'TASK', children: [] }]
  },
  {
    name: 'Create Project Hub',
    image: 'project',
    yays: [
      {
        id: 1,
        title: 'Project Hub Title',
        defaultViewId: 'PROJECT_OVERVIEW',
        children: []
      }
    ]
  },
  {
    name: 'Create Notes',
    image: 'grid',
    yays: [{ id: 1, title: 'Notes Title', defaultViewId: 'GRID', children: [] }]
  }
];

class AddViewsPanel extends Component {
  constructor(props) {
    super(props);
    this.viewDropdownRef = React.createRef();
    this.state = {
      showMoreOptions: false
    };
  }

  createNewTopic = async (parentId, yay) => {
    const { createTopic, viewTopic } = this.props;
    const { isCreatingProject } = this.state;

    const createdTopic = await createTopic({
      attributes: {
        title: yay.title,
        parent_id: parentId,
        default_view_id: yay.defaultViewId
      }
    });

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

    !isCreatingProject &&
      (await viewTopic({ topicId: createdTopic.data.data.id }));
    return createdTopic.data.data;
  };

  createNewCard = async topic => {
    const isChat = topic.attributes.default_view_id == 'CHAT';
    const { createCard } = this.props;
    const attributes = { title: 'Title', is_chat: isChat };
    const relationships = {
      topics: { data: [topic.id] }
    };
    return await createCard({ attributes, relationships });
  };

  createChildrenTopic = async (parentId, children) => {
    for (let yay of children) {
      const createdTopic = await this.createNewTopic(parentId, yay);
      await this.createNewCard(createdTopic);
      await this.createChildrenTopic(createdTopic.id, yay.children);
    }
  };

  handleCreateView = async (typeName, typeIndex) => {
    const {
      setLeftSubtopicMenuOpenForTopic,
      viewTopic,
      pinedLenses,
      setUserLensPinSettings,
      setUserUiSettings
    } = this.props;
    const projectPinnedLensKeys = [
      'PROJECT_HUB',
      'ACTION_PLAN',
      'CHAT',
      'VIDEO_CHAT'
    ];
    if (
      typeName == 'Create Action Plan' ||
      typeName === 'Create Wiki' ||
      typeName === 'Create List' ||
      typeName === 'Create Notes'
    ) {
      this.setState({ isCreatingProject: true });
      const createdTopic = await this.createNewTopic(
        null,
        boards[typeIndex].yays[0]
      );
      viewTopic({ topicId: createdTopic.id });
      success('Creating project, please wait...');
      await this.createNewCard(createdTopic);
      await this.createChildrenTopic(
        createdTopic.id,
        boards[3].yays[0].children
      );
    } else if (typeName == 'Create Project Hub') {
      const createdTopic = await this.createNewTopic(
        null,
        boards[typeIndex].yays[0]
      );
      await setUserUiSettings(
        {
          pinned_lenses_bar_visible: true,
          pinned_lenses_bar_expanded: false
        },
        createdTopic.id
      );
      setTimeout(() => {
        projectPinnedLensKeys.forEach(key => {
          setUserLensPinSettings({
            ui_settings: {
              pinned_lenses: projectPinnedLensKeys
            },
            action: 'add',
            view: key
          });
        });
      }, 5000);
    } else {
      success('Creating board...');
      this.createChildrenTopic(null, boards[typeIndex].yays);
    }
  };

  toggleMoreOptions = () => {
    this.setState(prev => {
      return {
        showMoreOptions: !prev.showMoreOptions
      };
    });
  };

  isVisible = elem => {
    !!elem &&
      !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
  };

  hideViewDropdownOnClickOut = element => {
    const outsideClickListener = event => {
      if (!element.contains(event.target) || this.isVisible(element)) {
        this.setState({ showMoreOptions: false });
        removeClickListener();
      }
    };
    const removeClickListener = () => {
      document.removeEventListener('click', outsideClickListener);
    };
    document.addEventListener('click', outsideClickListener);
  };

  componentDidUpdate() {
    if (this.state.showMoreOptions) {
      const dropdown = this.viewDropdownRef.current;
      this.hideViewDropdownOnClickOut(dropdown);
    }
  }

  render() {
    const { showMoreOptions } = this.state;
    const imageUrl = name => `/images/lenses/${name}.png`;
    return (
      <div>
        <div className="add-views_panel">
          {boards.map((board, i) => (
            <div
              className="panel_child"
              key={i}
              onClick={() => this.handleCreateView(board.name, i)}
            >
              <img src={imageUrl(board.image)} className="panel_child_img" />
              <div>{board.name}</div>
            </div>
          ))}
          <div className="panel_child more" onClick={this.toggleMoreOptions}>
            <div>More Tools</div>
            {showMoreOptions && (
              <div ref={this.viewDropdownRef} className="c">
                <ViewsDropdown />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  const uiSettings = getUiSettings(state);
  return {
    pinedLenses: uiSettings.pinned_lenses || []
  };
};

const mapDispatch = {
  createTopic,
  createCard,
  viewTopic,
  setLeftSubtopicMenuOpenForTopic,
  setUserLensPinSettings,
  setUserUiSettings
};

export default connect(mapState, mapDispatch)(AddViewsPanel);
