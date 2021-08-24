import React, { Component, Fragment } from 'react';
import { func } from 'prop-types';
import Icon from 'Components/shared/Icon';
import { connect } from 'react-redux';
import {
  createTopic,
  viewTopic,
  setUserLensPinSettings
} from 'Src/newRedux/database/topics/thunks';
import { updateUiSettings } from 'Src/newRedux/database/topics/apiCalls';
import { createCard } from 'Src/newRedux/database/cards/thunks';
import get from 'lodash/get';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { success } from 'Utils/toast';
import MaterialIcon from 'material-icons-react';
import classNames from 'classnames';
import { getUiSettings, setUserUiSettings } from 'Src/helpers/user_config';
import { setLeftSubtopicMenuOpenForTopic } from 'Src/newRedux/interface/menus/actions';
import { viewOptions } from 'src/components/shared/CardAndBoardTypes';

const options = [
  {
    title: 'Action Plan',
    description: 'Organize actions in a table with columns',
    icon: 'view_stream'
  },
  {
    title: 'Project Board',
    description: 'Organize your project with sub boards',
    icon: 'category'
  },
  {
    title: 'Goal Board',
    description: 'Make a plan to reach your goal',
    icon: 'description'
  },
  {
    title: 'Wiki',
    description: 'For larger knowledge base',
    icon: 'subtitles'
  },
  {
    title: 'Note Board',
    description: 'Take notes',
    icon: 'view_module'
  },
  {
    title: 'File Board',
    description: 'Organize files',
    icon: 'insert_drive_file'
  }
];

class AddCardOrSubtopicMoreOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // toggleAddOptionsState: props.addViewsPanelVisible,
      hoveredBoard: 0
    };
  }

  static propTypes = {
    create: func.isRequired,
    createCard: func
  };

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

  handleCreateView = async typeIndex => {
    //typeIndex is the index position of the board from board options
    const {
      parentTopic,
      setLeftSubtopicMenuOpenForTopic,
      viewTopic,
      pinedLenses,
      setUserLensPinSettings,
      setUserUiSettings
    } = this.props;

    const parentTopicId =
      parentTopic != undefined && parentTopic != null ? parentTopic.id : null;

    const projectPinnedLensKeys = [
      'PROJECT',
      'ACTION_PLAN',
      'CHAT',
      'VIDEO_CHAT'
    ];

    this.props.closeDropdown();

    if (typeIndex == 1) {
      const createdTopic = await this.createNewTopic(
        parentTopicId,
        viewOptions[typeIndex].yays[0]
      );
      setTimeout(() => {
        setUserUiSettings({ pinned_lenses_bar_visible: true }, createdTopic.id);
        projectPinnedLensKeys.forEach(key => {
          setUserLensPinSettings({
            ui_settings: {
              pinned_lenses: projectPinnedLensKeys
            },
            action: 'add',
            view: key
          });
        });
      });
    } else {
      success('Creating Board...');
      this.createChildrenTopic(parentTopicId, viewOptions[typeIndex].yays);
    }
  };

  // toggleAddOptions = () => {
  //   const { addViewsPanelVisible, setUserUiSettings } = this.props;
  //   const payload = {
  //     add_option: !addViewsPanelVisible
  //   };
  //   setUserUiSettings(payload);
  //   this.setState(prev => {
  //     return {
  //       toggleAddOptionsState: !prev.toggleAddOptionsState
  //     };
  //   });
  // };

  render() {
    // const { toggleAddOptionsState } = this.state;
    // const toggleClass = classNames('fa', 'icon', {
    //   'fa-toggle-on': toggleAddOptionsState,
    //   'fa-toggle-off': !toggleAddOptionsState,
    //   green: toggleAddOptionsState
    // });

    return (
      <Fragment>
        <li style={{ display: 'none' }} className="dropdown-menu__details-3">
          <article>
            {options.map((option, i) => (
              <a
                key={i}
                onClick={() => this.handleCreateView(i)}
                onMouseEnter={() => this.setState({ hoveredBoard: i })}
              >
                <Icon color="#777" icon={option.icon} outlined={true} />
              </a>
            ))}
          </article>
          <h4>{options[this.state.hoveredBoard].title}</h4>
          <p>{options[this.state.hoveredBoard].description}</p>
        </li>
      </Fragment>
    );
  }
}

const mapState = state => {
  const sm = stateMappings(state);
  const {
    page: { topicId }
  } = sm;
  const uiSettings = getUiSettings(state);
  return {
    parentTopic: sm.topics[topicId],
    // addViewsPanelVisible: uiSettings.add_option,
    pinedLenses: uiSettings.pinned_lenses || []
  };
};

const mapDispatch = {
  createTopic,
  createCard,
  viewTopic,
  setUserUiSettings,
  setLeftSubtopicMenuOpenForTopic,
  setUserLensPinSettings
};

export default connect(mapState, mapDispatch)(AddCardOrSubtopicMoreOptions);
