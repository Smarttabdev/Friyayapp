import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bool, func, object, string } from 'prop-types';
import { stateMappings } from 'Src/newRedux/stateMappings';
import {
  addRemoveCardFromTopics,
  ensureCard
} from 'Src/newRedux/database/cards/thunks';
import {
  dragItemTypes,
  GenericDropZone
} from 'Components/shared/drag_and_drop/_index';
import IconButton from 'Components/shared/buttons/IconButton';
import TopicActionsDropdown from 'Src/components/shared/topics/elements/TopicActionsDropdown';
import TopicTitleEditor from 'Src/components/shared/topics/elements/TopicTitleEditor';
import { createTopicAndCardsForGoogleFolder } from 'Src/newRedux/integrationFiles/google-drive/thunks';
import { createTopicAndCardsForDropboxFolder } from 'Src/newRedux/integrationFiles/dropbox/thunks';
import {
  moveTopicContents,
  ensureTopic
} from 'Src/newRedux/database/topics/thunks';
import get from 'lodash/get';
import ActivityIndicator from 'Components/shared/cards/elements/assemblies/ActivityIndicator';
import lineClamp from 'Src/helpers/lineClamp';
import store from 'Src/store/store';

class LeftMenuTopicRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      draggedOver: false,
      topicNameEditMode: false
    };
  }

  componentDidMount = () => {
    lineClamp(this.title, { lineCount: 1 });
  };

  handleToggleTopicNameEditMode = () => {
    this.setState(state => ({ topicNameEditMode: !state.topicNameEditMode }));
  };

  handleCardDrop = ({ draggedItemProps }) => {
    const { addRemoveCardFromTopics, shiftKeyDown, topic } = this.props; // eslint-disable-line
    let originTopicId = draggedItemProps.item.relationships.topics.data;
    let topicToAdd = [topic.id];
    if (shiftKeyDown) {
      topicToAdd = [
        ...topicToAdd,
        ...draggedItemProps.item.relationships.topics.data
      ];
      originTopicId = [];
    }
    addRemoveCardFromTopics(
      draggedItemProps.item,
      [...new Set(topicToAdd)],
      originTopicId
    );
  };

  handleFolderDrop = itemProps => {
    const {
      draggedItemProps: {
        item: { provider }
      }
    } = itemProps;
    const {
      createTopicAndCardsForGoogleFolder,
      createTopicAndCardsForDropboxFolder
    } = this.props; // eslint-disable-line
    const methodMaps = {
      google: createTopicAndCardsForGoogleFolder,
      dropbox: createTopicAndCardsForDropboxFolder
    };
    itemProps.providerData = this.props[`${provider}Data`];
    methodMaps[provider](itemProps);
  };

  handleTopicDrop = itemProps => {
    this.props.moveTopicContents({
      destinationTopicId: this.props.topic.id,
      topicId: itemProps.draggedItemProps.item.id
    });
  };

  handleDrop = async itemProps => {
    const { ensureTopic, ensureCard } = this.props;

    const item = itemProps.draggedItemProps.item;
    const id = toId(item.itemId);

    if (item.baseType === 'Topic') {
      await ensureTopic(id);
      itemProps.draggedItemProps.item = stateMappings(store.getState()).topics[
        id
      ];
    } else if (item.baseType === 'Tip') {
      await ensureCard(id);
      itemProps.draggedItemProps.item = stateMappings(store.getState()).cards[
        id
      ];
    }

    if (itemProps.draggedItemProps.itemType === dragItemTypes.CARD) {
      this.handleCardDrop(itemProps);
    } else if (itemProps.draggedItemProps.itemType === dragItemTypes.FOLDER) {
      this.handleFolderDrop(itemProps);
    } else if (
      itemProps.draggedItemProps.itemType === dragItemTypes.TOPIC ||
      itemProps.draggedItemProps.itemType === dragItemTypes.SUBTOPIC_HEX
    ) {
      this.handleTopicDrop(itemProps);
    }
  };

  render() {
    const {
      rootUrl,
      pageTopicSlug,
      onCaretClick,
      topic,
      active_design = {},
      leftPanel
    } = this.props;
    const { /* draggedOver,*/ topicNameEditMode } = this.state;
    const baseUrl = rootUrl == '/' ? '' : rootUrl;
    const { workspace_font_color } = active_design;
    const topicTitle = topic.attributes.title;

    return (
      <GenericDropZone
        dropClassName={`left-menu_topic-element ${
          pageTopicSlug == topic.attributes.slug ? 'active' : ''
        } ${leftPanel && 'leftPanel'}`}
        itemType={[
          dragItemTypes.CARD,
          dragItemTypes.FOLDER,
          dragItemTypes.TOPIC,
          dragItemTypes.SUBTOPIC_HEX
        ]}
        onDragEnter={this.handleDragEnter}
        onDragLeave={this.handleDragLeave}
        onDrop={this.handleDrop}
        item={topic}
      >
        <div className="left-menu_topic-element_details">
          {this.props.isExpandable === true ? (
            this.props.isExpanded === true ? (
              <IconButton
                color={workspace_font_color || 'rgba(255, 255, 255, 0.7)'}
                additionalClasses="caret-down"
                fontAwesome={true}
                icon="caret-down"
                onClick={() => this.props.onExpandToggle()}
                containerStyle={{ justifyContent: 'left', paddingLeft: '6px' }}
              />
            ) : (
              <Fragment>
                <IconButton
                  color={workspace_font_color}
                  additionalClasses={`white-opac-icon-button ${
                    topic.attributes.starred_by_current_user
                      ? 'left-menu_topic-element_ghost-star-icon'
                      : 'square'
                  }`}
                  fontAwesome={true}
                  icon={
                    topic.attributes.starred_by_current_user === true
                      ? 'star'
                      : 'hashtag'
                  }
                  onClick={() => {}}
                />
                <IconButton
                  color={workspace_font_color}
                  additionalClasses="expandable white-opac-icon-button"
                  fontAwesome={true}
                  icon="caret-right"
                  onClick={() => this.props.onExpandToggle()}
                  containerStyle={{
                    justifyContent: 'left',
                    paddingLeft: '6px'
                  }}
                />
              </Fragment>
            )
          ) : (
            <IconButton
              color={workspace_font_color}
              additionalClasses={`${
                topic.attributes.starred_by_current_user
                  ? 'left-menu_topic-element_ghost-star-icon'
                  : 'square'
              } white-opac-icon-button`}
              fontAwesome={true}
              icon={
                topic.attributes.starred_by_current_user === true
                  ? 'star'
                  : 'hashtag'
              }
              onClick={() => this.props.onExpandToggle()}
            />
          )}
          {topicNameEditMode ? (
            <TopicTitleEditor
              topic={topic}
              onFinishEditing={this.handleToggleTopicNameEditMode}
            />
          ) : (
            <Link
              className="left-menu_topic-element_topic-name"
              to={`${baseUrl}/boards/${topic.attributes.slug}`}
            >
              <span
                className="line-clamp"
                style={{ color: workspace_font_color }}
                ref={span => (this.title = span)}
              >
                {topicTitle}
                <ActivityIndicator
                  updatedAt={get(topic, 'attributes.updated_at')}
                />
              </span>
            </Link>
          )}
        </div>
        <div className="left-menu_topic-element_submenu-caret">
          <IconButton
            fontAwesome
            icon="plus"
            onClick={() => this.props.onExpandToggle(topic.id, true)}
          />
          <TopicActionsDropdown
            topic={topic}
            onRenameTopicSelected={this.handleToggleTopicNameEditMode}
            color={workspace_font_color}
          />
          <IconButton
            fontAwesome
            icon="caret-right"
            onClick={() => onCaretClick(false)}
            containerStyle={{ justifyContent: 'left', paddingLeft: '6px' }}
          />
        </div>
      </GenericDropZone>
    );
  }
}

LeftMenuTopicRow.propTypes = {
  isExpandable: bool,
  rootUrl: string.isRequired,
  onCaretClick: func.isRequired,
  pageTopicSlug: string,
  topic: object.isRequired,
  onExpandToggle: func.isRequired,
  createTopicAndCardsForGoogleFolder: func,
  createTopic: func
};

const mapState = state => {
  const sm = stateMappings(state);
  const { page, utilities, integrationFiles, user } = sm;
  return {
    active_design: utilities.active_design,
    pageTopicSlug: page.topicSlug,
    rootUrl: page.rootUrl,
    shiftKeyDown: utilities.shiftKeyDown,
    googleData: integrationFiles.google,
    dropboxData: integrationFiles.dropbox,
    boxData: integrationFiles.box
  };
};

const mapDispatch = {
  addRemoveCardFromTopics,
  createTopicAndCardsForGoogleFolder,
  createTopicAndCardsForDropboxFolder,
  moveTopicContents,
  ensureTopic,
  ensureCard
};

export default connect(mapState, mapDispatch)(LeftMenuTopicRow);
