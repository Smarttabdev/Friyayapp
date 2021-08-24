import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import { array, func, string, object } from 'prop-types';
import {
  dragItemTypes,
  GenericDropZone
} from 'Components/shared/drag_and_drop/_index';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { createTopic, viewTopic } from 'Src/newRedux/database/topics/thunks';
// import withDataManager from 'Src/dataManager/components/withDataManager';
import Icon from 'Components/shared/Icon';
import TopicHex from './TopicHex';
import DMLoader from 'Src/dataManager/components/DMLoader';
import { createTopicAndCardsForGoogleFolder } from 'Src/newRedux/integrationFiles/google-drive/thunks';
import { createTopicAndCardsForDropboxFolder } from 'Src/newRedux/integrationFiles/dropbox/thunks';
import { scrollToShow } from 'Src/lib/utilities';
import { getThisDomain } from 'Src/lib/utilities';
import { getDomains } from 'Src/newRedux/database/domains/selectors';
import { setDomainSubtopicsView } from 'Src/newRedux/interface/menus/thunks';
import SubtopicViewOptionsDropdown from 'Src/components/shared/topics/elements/SubtopicViewOptionsDropdown';
import SubtopicFilterDropdown from 'Src/components/shared/topics/elements/SubtopicFilterOptionsDropdown';
import { getUiSettings, setUserUiSettings } from 'Src/helpers/user_config';
import Tooltip from 'Components/shared/Tooltip';

class HexLens extends PureComponent {
  constructor(props) {
    super(props);
    this.setDomainSubtopicsView = props.setDomainSubtopicsView;
    this.viewDropdownRef = React.createRef();
  }

  static propTypes = {
    createTopic: func.isRequired,
    createTopicAndCardsForGoogleFolder: func.isRequired,
    topic: object,
    topicId: string,
    topics: array.isRequired,
    viewTopic: func.isRequired
  };

  state = {
    creatingTopic: false,
    displayAddTopic: false,
    isAttachmentHoveringOnCard: false
  };

  componentDidMount() {
    if (this.props.showAddTopicInput === true) {
      this.handleClickAddTopic();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.showAddTopicInput !== prevProps.showAddTopicInput) {
      this.props.showAddTopicInput === true && this.handleClickAddTopic();
    }
    if (this.state.viewDropdown === true) {
      const dropdown = this.viewDropdownRef.current;
      this.hideViewDropdownOnClickOut(dropdown);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown, true);
  }

  handleAddTopicClick = () => {
    this.setState({ displayAddTopic: true });
    window.addEventListener('keydown', this.handleKeyDown, true);
  };

  handleCreateNewTopicClick = async () => {
    this.setState({ creatingTopic: true });
    const newTopic = await this.props.createTopic({
      attributes: { title: this.newTopicTitleInput.value }
    });
    this.setState({ creatingTopic: false, displayAddTopic: false });
    window.removeEventListener('keydown', this.handleKeyDown, true);
    scrollToShow(
      document.querySelector(
        '.t' + newTopic.data.data.id + ' .topic-hex_title'
      ),
      15,
      25
    );
  };

  handleEscapeKeyPressed = () => {
    this.setState({ displayAddTopic: false });
    window.removeEventListener('keydown', this.handleKeyDown, true);
  };

  handleKeyDown = key => {
    (key.keyCode == 13 || key.key == 'Enter') &&
      this.handleCreateNewTopicClick();
    (key.keyCode == 27 || key.key == 'Escape') && this.handleEscapeKeyPressed();
  };

  toggleAttachmentHoveringOnCard = status => {
    this.setState(prevState => ({
      ...prevState,
      isAttachmentHoveringOnCard: status
    }));
  };

  addTopicFromFolder = itemProps => {
    const methodMaps = {
      google: createTopicAndCardsForGoogleFolder,
      dropbox: createTopicAndCardsForDropboxFolder
    };
    const {
      createTopicAndCardsForGoogleFolder,
      createTopicAndCardsForDropboxFolder
    } = this.props;
    const provider = itemProps.draggedItemProps.item.provider;
    let itemPropsCopy = Object.assignLabel({}, itemProps);
    itemPropsCopy.providerData = this.props[`${provider}Data`];
    return methodMaps[provider](itemPropsCopy);
  };

  getCurrentDomain = () => {
    const { domains } = this.props;
    const thisDomain = getThisDomain(domains);
    window.currentDomain = thisDomain;

    return thisDomain;
  };

  handleTopicViewSelect = topicViewMode => {
    const { topic, setUserUiSettings } = this.props;
    setUserUiSettings({
      subtopic_panel_visible: true,
      subtopic_view: topicViewMode
    });
  };

  handleViewsClick = () => {
    this.setState({ viewDropdown: !this.state.viewDropdown });
  };

  isVisible = elem => {
    !!elem &&
      !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
  };

  hideViewDropdownOnClickOut = element => {
    const outsideClickListener = event => {
      if (!element.contains(event.target) || this.isVisible(element)) {
        this.setState({ viewDropdown: false });
        removeClickListener();
      }
    };
    const removeClickListener = () => {
      document.removeEventListener('click', outsideClickListener);
    };
    document.addEventListener('click', outsideClickListener);
  };

  render() {
    const {
      topics,
      topicRequirements,
      topic,
      topicsPanelVisible,
      active_design
    } = this.props;
    const {
      /* creatingTopic,*/ displayAddTopic,
      isAttachmentHoveringOnCard,
      viewDropdown
    } = this.state;
    const activeDesign = active_design.card_font_color;
    const forId = Math.ceil(Math.random() * 100000, 6);

    return (
      <div>
        <div style={{ position: 'relative' }}>
          <h3 className="subtopic-header-text">
            <span
              className="subtopic-header-text-text"
              style={viewDropdown ? { backgroundColor: '#EEEEEE' } : null}
              onClick={this.handleViewsClick}
            >
              Boards
            </span>
            <div
              data-tip={'Add Board'}
              data-for={forId}
              style={{ display: 'flex' }}
            >
              <i
                onClick={this.handleAddTopicClick}
                style={{
                  color: activeDesign ? activeDesign : null,
                  fontSize: '16px',
                  fontWeight: 600
                }}
                className="tiphive-icon material-icons addIcon"
              >
                add
              </i>
              <Tooltip {...{ place: 'right' }} id={forId} />
            </div>
          </h3>
          {this.state.viewDropdown ? (
            <span
              className="viewOptionsAndFilterDropdown"
              ref={this.viewDropdownRef}
            >
              <span className="title">Show Boards as:</span>
              <SubtopicViewOptionsDropdown
                onSelect={this.handleTopicViewSelect}
              />
              <span className="title">Filter:</span>
              <SubtopicFilterDropdown
                closeDropdown={() => this.setState({ viewDropdown: false })}
              />
            </span>
          ) : null}
        </div>
        <GenericDropZone
          dropClassName="hex-bord"
          onDragEnter={() => this.toggleAttachmentHoveringOnCard(true)}
          onDragLeave={() => this.toggleAttachmentHoveringOnCard(false)}
          dropsDisabled
          itemType={dragItemTypes.FOLDER}
        >
          <div className="hex-view_hex-container">
            <div className="topic-hex">
              <div
                className="topic-hex_content"
                onClick={this.handleAddTopicClick}
              >
                {isAttachmentHoveringOnCard && (
                  <GenericDropZone
                    dropClassName="attachment-option-hexa-topic"
                    method="link"
                    onDrop={this.addTopicFromFolder}
                    itemType={dragItemTypes.FOLDER}
                  >
                    Drop to Create
                  </GenericDropZone>
                )}
                {!isAttachmentHoveringOnCard && displayAddTopic && (
                  <Fragment>
                    <input
                      ref={ref => (this.newTopicTitleInput = ref)}
                      type="text"
                      className="hex-view_new-topic-input"
                      autoFocus={true}
                    />
                    {/* creatingTopic ?
                    <span className="hex-view_new-topic-button">
                      Creating...
                    </span>
                    :*/}
                    <button
                      className="hex-view_new-topic-button"
                      onClick={this.handleCreateNewTopicClick}
                    >
                      Create
                    </button>
                  </Fragment>
                )}
                {!isAttachmentHoveringOnCard && !displayAddTopic && (
                  <Fragment>
                    <Icon
                      color={active_design.card_font_color}
                      fontAwesome
                      icon="plus"
                    />
                    <span>Add board </span>
                  </Fragment>
                )}
              </div>
            </div>
            {topics.map(topic => (
              <TopicHex key={`topic-hex-${topic.id}`} topic={topic} />
            ))}
            <DMLoader
              dataRequirements={{
                topicsWithAttributes: { attributes: topicRequirements }
              }}
              loaderKey="topicsWithAttributes"
            />
          </div>
        </GenericDropZone>
      </div>
    );
  }
}

// const topicSelector = instanceOfGetSortedFilteredTopicsForTopic();

const mapState = state => {
  const sm = stateMappings(state);
  const {
    utilities: { active_design }
  } = sm;
  const ui_settings = getUiSettings(state);
  return {
    active_design,
    subtopicPanelVisible: ui_settings.topics_panel_visible,
    domains: getDomains(state),
    myTopicsView: ui_settings.current_active_template
  };
};

const mapDispatch = {
  createTopic,
  viewTopic,
  createTopicAndCardsForGoogleFolder,
  createTopicAndCardsForDropboxFolder,
  setDomainSubtopicsView,
  setUserUiSettings
};

export default connect(mapState, mapDispatch)(HexLens);
