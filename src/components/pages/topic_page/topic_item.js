import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import DropCardOptions from '../../shared/drop_card_options';
import lineClamp from 'Src/helpers/lineClamp';
import { updateTopic } from 'Src/newRedux/database/topics/thunks';
import { addRemoveCardFromTopics } from 'Src/newRedux/database/cards/thunks';
import { stateMappings } from 'Src/newRedux/stateMappings';

import { createTopicAndCardsForGoogleFolder } from 'Src/newRedux/integrationFiles/google-drive/thunks';
import { createTopicAndCardsForDropboxFolder } from 'Src/newRedux/integrationFiles/dropbox/thunks';
import {
  dragItemTypes,
  GenericDropZone
} from 'Components/shared/drag_and_drop/_index';
import TopicActionsDropdown from 'Components/shared/topics/elements/TopicActionsDropdown';
import get from 'lodash/get';
import ActivityIndicator from 'Components/shared/cards/elements/assemblies/ActivityIndicator';

class TopicItem extends Component {
  state = {
    cardDraggedOver: false,
    isOpen: false,
    isEditing: false,
    isSaving: false,
    title: null,
    zIndex: 0,
    timeoutID: null
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  toggleEdit = (title = null) => {
    const isEditing = this.state.isEditing;
    this.setState({
      isEditing: !isEditing,
      title
    });
  };

  toggleSaving = id => {
    if (id === this.props.topic.id) {
      this.setState({
        isSaving: !this.state.isSaving
      });
    }
  };

  handleTitleChange = title => {
    this.setState({ title });
  };

  submitTitleChange = () => {
    const {
      props: { topic },
      state: { title, isSaving }
    } = this;

    if (isSaving) {
      return;
    }

    if (title === topic.attributes.title || title.trim() === '') {
      this.toggleEdit();
    } else {
      this.props.updateTopic({ id: topic.id, attributes: { title } });
      this.toggleEdit();
    }
  };

  success = id => {
    if (id === this.props.topic.id) {
      this.toggleEdit();
      this.toggleSaving(id);
    }
  };

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.submitTitleChange();
    } else if (e.key == 'Escape' || e.keyCode == 27) {
      this.setState({
        isEditing: false
      });
    }
  };

  componentDidMount() {
    lineClamp(this.title, { lineCount: 3 });
    $(this.dropdown).on('shown.bs.dropdown', () => {
      this.setState({
        zIndex: 9
      });
    });

    $(this.dropdown).on('hidden.bs.dropdown', () => {
      this.setState({
        zIndex: 0
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isEditing && !this.state.isEditing) {
      $(this.dropdown).on('shown.bs.dropdown', () => {
        this.setState({
          zIndex: 9
        });
      });

      $(this.dropdown).on('hidden.bs.dropdown', () => {
        this.setState({
          zIndex: 0
        });
      });
    }
  }

  handleDropItem = ({ draggedItemProps, providerData }) => {
    if (draggedItemProps.itemType === dragItemTypes.CARD) {
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
    } else if (draggedItemProps.itemType === dragItemTypes.FOLDER) {
      const provider = draggedItemProps.item.provider;
      const methodMaps = {
        google: this.props.createTopicAndCardsForGoogleFolder, // eslint-disable-line
        dropbox: this.props.createTopicAndCardsForDropboxFolder // eslint-disable-line
      };
      providerData = this.props[`${provider}Data`];
      methodMaps[provider]({ draggedItemProps, providerData });
    }
  };

  handleTimeoutIDChange = timeoutID => {
    this.setState({ timeoutID });
  };

  getClickHandler = () => {
    const { timeoutID } = this.state;
    const { topic, group, currentGroupId } = this.props;

    let topicUrl = `/boards/${topic.attributes.slug}`;
    if (currentGroupId !== null) {
      if (group) {
        topicUrl = `/groups/${group.attributes.slug}${topicUrl}`;
      } else {
        topicUrl = `/groups/${currentGroupId}${topicUrl}`;
      }
    }

    const delay = 250;

    if (!timeoutID) {
      this.handleTimeoutIDChange(
        window.setTimeout(() => {
          window.location.href = topicUrl;
          this.handleTimeoutIDChange(null);
        }, delay)
      );
    } else {
      this.handleTimeoutIDChange(window.clearTimeout(timeoutID));
      this.toggleEdit(topic.attributes.title);
    }
  };

  render() {
    const {
      props: {
        topic,
        isCurrentTopic,
        className,
        handleStarSubhiveClick,
        isOver,
        active_design
      },
      state: { cardDraggedOver, isEditing, isSaving, title }
    } = this;

    let { starred_by_current_user } = topic.attributes;

    const topicWrapperClass = classnames('hex-wrapper', className);
    const topicClass = classnames({
      hex: true,
      'current-subtopic': isCurrentTopic,
      'is-over': isOver,
      'create-hex create-hex-subtopic': isEditing
    });

    let topicContent = null;
    let star = null;

    if (isEditing) {
      topicContent = (
        <div className="line-clamp-wrapper flex-c-center-end">
          <input
            type="text"
            onChange={({ target }) => this.handleTitleChange(target.value)}
            onBlur={({ target }) => {
              target.placeholder = 'Title';
              target.scrollLeft = target.scrollWidth;
            }}
            placeholder={topic.attributes.title}
            onFocus={({ target }) => {
              target.placeholder = '';
              target.selectionStart = target.selectionEnd = target.value.length;
              target.scrollLeft = target.scrollWidth;
            }}
            onKeyPress={this.handleKeyPress}
            onKeyDown={this.handleKeyPress}
            value={title}
            className="topic-title"
            autoFocus
          />
          <button
            type="button"
            className="btn btn-link"
            onClick={() => this.submitTitleChange()}
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
      );
    } else {
      topicContent = (
        <a className="line-clamp-wrapper" onClick={this.getClickHandler}>
          <div className="flex-1 topic-link">
            <span className="line-clamp" ref={span => (this.title = span)}>
              {topic.attributes.title}
              <ActivityIndicator
                updatedAt={get(topic, 'attributes.updated_at')}
              />
            </span>
          </div>
        </a>
      );

      star = (
        <div className="subtopic-star flex-r-center-center">
          <button
            className={classnames('btn btn-link topic-star-icon', {
              active: starred_by_current_user
            })}
            onClick={() =>
              handleStarSubhiveClick(topic.id, starred_by_current_user)
            }
          >
            <i className="fa fa-star fa-lg" />
          </button>
        </div>
      );
    }

    return (
      <div className={topicWrapperClass}>
        <TopicActionsDropdown
          className="hex-item-dropdown-button"
          icon="more_horiz"
          topic={topic}
          onRenameTopicSelected={() => this.toggleEdit(topic.attributes.title)}
          withoutAddImage
        />
        <GenericDropZone
          dropClassName={topicClass}
          itemType={[dragItemTypes.CARD, dragItemTypes.FOLDER]}
          item={topic}
          onDrop={this.handleDropItem}
        >
          <div
            className="corner-1"
            style={{ backgroundColor: active_design.hexes_background_color }}
          />
          <div
            className="corner-2"
            style={{ backgroundColor: active_design.hexes_background_color }}
          />
          <div
            className="inner flex-c-center"
            style={{
              height: '100%',
              backgroundColor: active_design.hexes_background_color
            }}
          >
            {topicContent}
            {star}
          </div>
        </GenericDropZone>
        {cardDraggedOver && <DropCardOptions topic={topic} />}
      </div>
    );
  }
}

TopicItem.propTypes = {
  topic: PropTypes.any,
  isCurrentTopic: PropTypes.any,
  className: PropTypes.string,
  group: PropTypes.any,
  handleStarSubhiveClick: PropTypes.func,
  handleDelete: PropTypes.func,
  handleMoveDelete: PropTypes.func,
  selectSubtopic: PropTypes.func,
  dropdownHasInput: PropTypes.bool,
  canDrop: PropTypes.bool,
  isOver: PropTypes.bool,
  updateSubTopicTitle: PropTypes.func,
  updateTopic: PropTypes.func.isRequired,
  currentGroupId: PropTypes.string,
  createTopicAndCardsForGoogleFolder: PropTypes.func.isRequired
};

TopicItem.defaultProps = {
  dropdownHasInput: true,
  group: null,
  currentGroupId: null
};

const mapState = state => {
  const sm = stateMappings(state);
  const {
    utilities: { active_design }
  } = sm;
  return {
    active_design,
    shiftKeyDown: sm.utilities.shiftKeyDown,
    googleData: sm.integrationFiles.google
  };
};

const mapDispatch = {
  addRemoveCardFromTopics,
  updateTopic,
  createTopicAndCardsForGoogleFolder,
  createTopicAndCardsForDropboxFolder
};

export default connect(mapState, mapDispatch)(TopicItem);
