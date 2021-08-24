import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Ability from 'Lib/ability';
import { stateMappings } from 'Src/newRedux/stateMappings';
import {
  initiateDeleteTopicDialog,
  initiateMoveTopicDialog
} from 'Src/newRedux/database/topics/abstractions';
import {
  toggleStarTopic,
  toggleFollowTopic,
  updateTopic,
  toggleTemplateTopic
} from 'Src/newRedux/database/topics/thunks';
import { setUpdateTopicModalOpen } from 'Src/newRedux/interface/modals/actions';
import { setRightMenuOpenForMenu } from 'Src/newRedux/interface/menus/actions';
import OptionsDropdownButton from 'Components/shared/buttons/OptionsDropdownButton';
import FilePickerUpload from 'Src/components/shared/FilePickerUpload';
import QSModal from 'Components/pages/quick_setup';
import get from 'lodash/get';
import { getRelevantViewForPage } from 'Src/newRedux/interface/lenses/selectors';
import classNames from 'classnames';
import { setUserUiSettings } from 'Src/helpers/user_config';
import {
  setCopyTopicModalOpen,
  setBulkChangesModal
} from 'Src/newRedux/interface/modals/actions';
import DMLoader from 'Src/dataManager/components/DMLoader';
import ToggleSwitch from 'Components/shared/ToggleSwitch';

class TopicActionsDropdown extends PureComponent {
  static propTypes = {
    userFollowsTopic: PropTypes.bool,
    withoutAddImage: PropTypes.bool,
    initiateDeleteTopicDialog: PropTypes.func,
    initiateMoveTopicDialog: PropTypes.func,
    toggleStarTopic: PropTypes.func,
    toggleFollowTopic: PropTypes.func,
    setUpdateTopicModalOpen: PropTypes.func,
    onRenameTopicSelected: PropTypes.func,
    isCardsHidden: PropTypes.func,
    addNewTopic: PropTypes.func,
    toggleShowFilePicker: PropTypes.func,
    setRightMenuOpenForMenu: PropTypes.func,
    topic: PropTypes.any,
    children: PropTypes.node,
    icon: PropTypes.string,
    color: PropTypes.string,
    className: PropTypes.string,
    noButton: PropTypes.bool,
    isSmall: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {
      filePickerShown: false,
      quickSetup: false,
      toggleTemplateState: props.topic?.attributes?.is_template
    };
  }

  getTopics() {
    const {
      topic,
      noButton,
      setUpdateTopicModalOpen,
      onRenameTopicSelected,
      initiateMoveTopicDialog,
      initiateDeleteTopicDialog,
      setUserUiSettings,
      toggleStarTopic,
      toggleFollowTopic,
      setRightMenuOpenForMenu,
      addNewTopic,
      setBulkChangesModal,
      dropdownLeft
    } = this.props;
    const adminOptions = {
      settings: {
        text: 'Settings',
        onClick: () => setUpdateTopicModalOpen(topic.id, true)
      },
      share: {
        text: 'Share',
        onClick: () => setUpdateTopicModalOpen(topic.id, true, 1)
      },
      fields: {
        text: 'Fields',
        onClick: () => setUpdateTopicModalOpen(topic.id, true, 5)
      },
      rename: { text: 'Rename', onClick: onRenameTopicSelected },
      copy: { text: 'Copy', onClick: this.handleCopyTopic },
      move: {
        text: 'Move',
        onClick: () => initiateMoveTopicDialog(topic.id)
      },
      moveToTop: {
        text: 'Move to top',
        onClick: () => this.handleMoveToTop()
      },
      delete: {
        text: 'Delete',
        onClick: () => initiateDeleteTopicDialog(topic.id)
      },
      archive: {
        text: 'Archive',
        onClick: () => console.log('Archive button clicked')
      },
      turnCardsInto: {
        text: 'Turn cards into',
        onClick: () => setBulkChangesModal({ topicId: topic.id, isOpen: true })
      }
    };
    if (noButton === false || noButton === undefined || noButton === null) {
      adminOptions.showCard = {
        text: 'Show Card Block',
        onClick: () =>
          this.props.setUserUiSettings({
            card_hidden: false,
            current_active_template: this.props.cardView
          })
      };
      adminOptions.quickSetup = {
        text: 'Quick Setup',
        onClick: this.toggleQuickSetup
      };
      adminOptions.hideCard = {
        text: 'Hide Card Block',
        onClick: () =>
          this.props.setUserUiSettings({
            card_hidden: true,
            current_active_template: this.props.cardView
          })
      };
      adminOptions.addImage = {
        text: 'Add Image',
        onClick: this.toggleShowFilePicker
      };
    }
    const options = {
      star: {
        text: 'Star',
        onClick: () => toggleStarTopic(topic.id)
      },
      unStar: {
        text: 'Unstar',
        onClick: () => toggleStarTopic(topic.id)
      },
      follow: {
        text: 'Follow',
        onClick: () => toggleFollowTopic(topic.id)
      },
      unFollow: {
        text: 'Unfollow',
        onClick: () => toggleFollowTopic(topic.id)
      }
    };
    if (noButton === false || noButton === undefined || noButton === null) {
      options.selectView = {
        text: 'Select Tool',
        onClick: () => setRightMenuOpenForMenu('Tools')
      };
      options.selectDesign = {
        text: 'Select Design',
        onClick: () => setRightMenuOpenForMenu('Design')
      };
      options.selectFilter = {
        text: 'Select Filter',
        onClick: () => setRightMenuOpenForMenu('Filters')
      };
      options.selectOrder = {
        text: 'Select Order',
        onClick: () => setRightMenuOpenForMenu('Orders')
      };
      options.addView = {
        text: 'Add Board',
        onClick: addNewTopic
      };
    }
    if (!topic?.attributes?.parent_id) {
      delete adminOptions.moveToTop;
    }
    return { adminOptions, options };
  }

  handleCopyTopic = async () => {
    const { topic, setCopyTopicModalOpen } = this.props;
    setCopyTopicModalOpen(true, topic);
  };

  toggleShowFilePicker = () => {
    const { filePickerShown } = this.state;
    this.setState({
      filePickerShown: !filePickerShown
    });
  };

  toggleQuickSetup = () => {
    this.setState({ quickSetup: !this.state.quickSetup });
  };

  handleFilePickerClose = () => {
    this.setState({
      filePickerShown: false
    });
  };

  handleCreateViewTemplate = () => {
    const { topic, updateTopic, toggleTemplateTopic } = this.props;
    const { toggleTemplateState } = this.state;

    this.setState(prevState => {
      return {
        toggleTemplateState: !prevState.toggleTemplateState
      };
    });
    toggleTemplateTopic(topic.id);
    updateTopic({
      id: topic.id,
      attributes: { is_template: !toggleTemplateState }
    });
  };

  handleMoveToTop = () => {
    const { topic, updateTopic } = this.props;
    updateTopic({
      id: topic.id,
      attributes: { parent_id: null }
    });
  };

  toggleBoardTabs = () => {
    mutations.setConfig({
      owner: toGid('Topic', this.props.topic?.id),
      config: `${this.props.cardView}.boardTabsClosed`,
      value: !this.props.boardTabsClosed?.value
    });
  };

  render() {
    const {
      children,
      className,
      icon,
      topic,
      topicId,
      userFollowsTopic,
      withoutAddImage,
      color,
      noButton,
      setRightMenuOpenForMenu,
      displaySubmenu,
      onRenameTopicSelected,
      dropdownLeft,
      ...props
    } = this.props;

    const { filePickerShown, quickSetup, toggleTemplateState } = this.state;
    const { adminOptions, options } = this.getTopics();

    const optionForAdmin = Object.keys(adminOptions);
    if (noButton === false || noButton === undefined || noButton === null) {
      optionForAdmin.splice(
        optionForAdmin.indexOf(props.cardsHidden ? 'hideCard' : 'showCard'),
        1
      );
      if (withoutAddImage) {
        optionForAdmin.splice(optionForAdmin.indexOf('addImage', 1), 1);
      }
    }
    const defaultOptions = Object.keys(options);
    defaultOptions.splice(
      defaultOptions.indexOf(
        topic?.attributes?.starred_by_current_user ? 'star' : 'unStar'
      ),
      1
    );
    defaultOptions.splice(
      defaultOptions.indexOf(userFollowsTopic ? 'follow' : 'unFollow'),
      1
    );
    const toggleClass = classNames('fa', 'icon', {
      'fa-toggle-on': toggleTemplateState,
      'fa-toggle-off': !toggleTemplateState,
      green: toggleTemplateState
    });

    const dropdown = (
      <span>
        {!topic && topicId && (
          <DMLoader
            dataRequirements={{
              topic: { topicId }
            }}
            loaderKey="topic"
          />
        )}
        <div
          className={noButton ? 'topicOptionsTitle' : 'dropdown-option-title'}
        >
          Board options
        </div>
        {Ability.can('update', 'self', topic) &&
          optionForAdmin
            .filter(option =>
              !onRenameTopicSelected
                ? adminOptions[option].text !== 'Rename'
                : adminOptions[option].text
            )
            .map(key => (
              <a
                className={
                  noButton ? 'topicOptionsItem' : 'dropdown-option-item'
                }
                key={key}
                onClick={adminOptions[key].onClick}
              >
                {adminOptions[key].text}
              </a>
            ))}
        {defaultOptions.map(key => (
          <a
            className={noButton ? 'topicOptionsItem' : 'dropdown-option-item'}
            key={key}
            onClick={options[key].onClick}
          >
            {options[key].text}
          </a>
        ))}
        {children}
        {noButton ? (
          <span
            onClick={() =>
              setRightMenuOpenForMenu(
                displaySubmenu == 'Design' ? null : 'Design'
              )
            }
            className="topicOptionsItem mt25"
          >
            Design
          </span>
        ) : null}
        <span
          className={
            noButton
              ? 'topicOptionsItem template_button'
              : 'dropdown-option-item template_button'
          }
        >
          Save as template
          <a onClick={this.handleCreateViewTemplate}>
            <i className={toggleClass} />
          </a>
        </span>
        <span
          className={
            noButton
              ? 'topicOptionsItem template_button'
              : 'dropdown-option-item template_button'
          }
        >
          Show Boards in Tabs
          <ToggleSwitch
            on={!this.props.boardTabsClosed?.value}
            onClick={this.toggleBoardTabs}
          />
        </span>
      </span>
    );

    return (
      <span>
        {noButton ? (
          dropdown
        ) : (
          <OptionsDropdownButton
            dropdownLeft={dropdownLeft}
            className={className}
            icon={icon}
            color={color}
            additionalClasses={'dark-grey-icon-button'}
            isSmall
          >
            {dropdown}
          </OptionsDropdownButton>
        )}
        {quickSetup && (
          <QSModal toggleModal={this.toggleQuickSetup} topic={topic} />
        )}
        {filePickerShown && (
          <FilePickerUpload
            topic={topic}
            onClose={this.handleFilePickerClose}
          />
        )}
      </span>
    );
  }
}

const mapState = (state, props) => {
  const sm = stateMappings(state);
  const {
    user,
    menus,
    topics,
    utilities: { active_design }
  } = sm;

  const topic = props.topic || topics[props.topicId];

  const userFollowedTopics = user.relationships.following_topics.data;
  const ui_settings = get(
    props.topic,
    'attributes.user_configuration.data.attributes.ui_settings',
    {}
  );
  const topicViews = ['TOPIC_HEXES', 'TOPIC_LIST', 'TOPIC_TILES'];
  const cardView = getRelevantViewForPage(state);
  return {
    topic,
    cardView,
    cardsHidden: !get(ui_settings, 'card_hidden')
      ? !ui_settings.current_active_template && topicViews.includes(cardView)
      : get(ui_settings, 'card_hidden'),
    active_design,
    displaySubmenu: menus.displayRightSubMenuForMenu,
    userFollowsTopic: userFollowedTopics.includes(topic?.id)
  };
};

const mapDispatch = {
  initiateDeleteTopicDialog,
  initiateMoveTopicDialog,
  toggleStarTopic,
  toggleFollowTopic,
  setUpdateTopicModalOpen,
  setRightMenuOpenForMenu,
  setUserUiSettings,
  updateTopic,
  toggleTemplateTopic,
  setCopyTopicModalOpen,
  setBulkChangesModal
};

export default connect(
  mapState,
  mapDispatch
)(
  QueryRenderer(TopicActionsDropdown, {
    query: graphql`
      query TopicActionsDropdownQuery(
        $topicId: ID!
        $config: String!
        $hasTopic: Boolean!
      ) {
        boardTabsClosed: config(owner: $topicId, config: $config)
          @include(if: $hasTopic) {
          value
        }
      }
    `,
    vars: ({ topic, cardView }) => ({
      hasTopic: !!topic?.id,
      topicId: toGid('Topic', topic?.id),
      config: `${cardView}.boardTabsClosed`
    })
  })
);
