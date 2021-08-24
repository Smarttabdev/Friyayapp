import React, { Component } from 'react';
import { object, func, bool } from 'prop-types';
import { connect } from 'react-redux';
import StarButton from 'Components/shared/topics/elements/StarButton';
import TopicActionsDropdown from 'Components/shared/topics/elements/TopicActionsDropdown';
// import Ability from 'lib/ability';
import { stateMappings } from 'Src/newRedux/stateMappings';
import {
  dragItemTypes,
  GenericDropZone
} from 'Components/shared/drag_and_drop/_index';
import { updateSubTopicTitle } from 'Actions/topic';
import { createTopicAndCardsForGoogleFolder } from 'Src/newRedux/integrationFiles/google-drive/thunks';
import { createTopicAndCardsForDropboxFolder } from 'Src/newRedux/integrationFiles/dropbox/thunks';
import {
  moveTopicContents,
  viewTopic,
  updateTopic
} from 'Src/newRedux/database/topics/thunks';
import { addRemoveCardFromTopics } from 'Src/newRedux/database/cards/thunks';
import get from 'lodash/get';
import ActivityIndicator from 'Components/shared/cards/elements/assemblies/ActivityIndicator';
import lineClamp from 'Src/helpers/lineClamp';
import { getBoardColor } from 'Src/utils/color';
import BoardAndCardTypeListDropdown from 'Components/shared/BoardAndCardTypeListDropdown';
import { getBoardType, toGid } from 'Lib/utilities';
import { getRootTopic } from 'Src/newRedux/database/topics/selectors';

class TopicTile extends Component {
  static propTypes = {
    topic: object.isRequired,
    subtopic: object.isRequired,
    updateTitle: func.isRequired,
    isLargeTilesView: bool,
    viewTopic: func.isRequired,
    updateTopic: func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      title: props.topic.attributes.title,
      timeoutID: null,
      hideMainBoardMessage: false
    };
  }

  handleTitleChange = title => {
    this.setState({ title });
  };

  toggleEdit = () => {
    const isEditing = this.state.isEditing;
    this.setState({
      isEditing: !isEditing
    });
  };

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.submitTitleChange();
    } else if (e.key == 'Escape' || e.keyCode == 27) {
      this.setState({
        isEditing: false,
        title: this.props.topic.attributes.title
      });
    }
  };

  submitTitleChange = () => {
    const {
      props: { topic, updateTopic },
      state: { title }
    } = this;

    if (title === topic.attributes.title || title.trim() === '') {
      this.toggleEdit();
    } else {
      updateTopic({ id: topic.id, attributes: { title } });
      this.toggleEdit();
    }
  };

  toggleAttachmentHoveringOnCard = status => {
    this.setState({ isAttachmentHoveringOnCard: status });
  };

  addTopicFromFolder = itemProps => {
    const {
      createTopicAndCardsForGoogleFolder,
      createTopicAndCardsForDropboxFolder
    } = this.props;
    const provider = itemProps.draggedItemProps.item.provider;
    const methodMaps = {
      google: createTopicAndCardsForGoogleFolder,
      dropbox: createTopicAndCardsForDropboxFolder
    };
    itemProps.providerData = this.props[`${provider}Data`];
    methodMaps[provider](itemProps);
  };

  nestTopic = itemProps => {
    this.props.moveTopicContents({
      destinationTopicId: this.props.topic.id,
      topicId: itemProps.draggedItemProps.item.id
    });
  };

  handleDrop = ({ draggedItemProps }) => {
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
    }
  };

  handleTimeoutIDChange = timeoutID => {
    this.setState({ timeoutID });
  };

  getClickHandler = () => {
    const { topic, viewTopic } = this.props;
    const { timeoutID } = this.state;
    const delay = 250;

    if (!timeoutID) {
      this.handleTimeoutIDChange(
        window.setTimeout(() => {
          viewTopic({ topicId: topic.id });
          this.handleTimeoutIDChange(null);
        }, delay)
      );
    } else {
      this.handleTimeoutIDChange(window.clearTimeout(timeoutID));
      this.toggleEdit();
    }
  };

  componentDidMount = () => {
    lineClamp(this.title, { lineCount: 2 });
    const { query, userId } = this.props;
    const { config } = query || {};

    if (config?.value && config?.value.includes(userId)) {
      this.setState({
        hideMainBoardMessage: true
      });
    }
  };

  componentDidUpdate = prevProps => {
    if (prevProps.query?.config !== this.props.query?.config) {
      const { query, userId } = this.props;
      const { config } = query || {};
      if (config?.value && config?.value.includes(userId)) {
        this.setState({
          hideMainBoardMessage: true
        });
      }
    }
  };

  handleHomeMainBoardMessage = () => {
    const { topicId, userId, query } = this.props;
    const { config } = query || {};
    let usersArray = config?.value || [];

    usersArray = [...usersArray, userId];
    usersArray = [...new Set(usersArray)];

    mutations.setConfig({
      owner: toGid('Topic', topicId),
      config: 'hide_home_main_board_message',
      value: usersArray
    });

    this.setState({
      hideMainBoardMessage: true
    });
  };

  handleUpdateBoardType = (boardId, boardType) => {
    const attributes = {
      tag_list: [boardType]
    };

    this.props.updateTopic({ id: boardId, attributes });
  };

  render() {
    const {
      topic,
      isLargeTilesView,
      viewTopic,
      active_design,
      page,
      mainBoard
    } = this.props;
    const {
      isEditing,
      title,
      isAttachmentHoveringOnCard,
      hideMainBoardMessage
    } = this.state;
    const image = topic.attributes.remote_image_url
      ? topic.attributes.remote_image_url
      : topic.attributes.image.image
      ? topic.attributes.image.image.small.url
      : topic.attributes.image.small.url;

    const mainBoardText = !hideMainBoardMessage && topic.id === mainBoard.id;
    const pages = ['home', 'topics'];

    return (
      <div>
        <GenericDropZone
          dropClassName={`tile-board-container ${
            isLargeTilesView ? 'flex-item--large' : 'flex-item'
          }`}
          onDragEnter={draggedItem =>
            draggedItem.itemType === dragItemTypes.FOLDER &&
            this.toggleAttachmentHoveringOnCard(true)
          }
          onDragLeave={draggedItem =>
            draggedItem.itemType === dragItemTypes.FOLDER &&
            this.toggleAttachmentHoveringOnCard(false)
          }
          onDrop={this.handleDrop}
          itemType={[dragItemTypes.FOLDER, dragItemTypes.CARD]}
          item={topic}
        >
          <a
            onClick={() => {
              !mainBoardText ? viewTopic({ topicId: topic.id }) : null;
            }}
          >
            {mainBoardText && (
              <div
                onClick={this.handleHomeMainBoardMessage}
                className="tile-board-container__overlay"
              >
                See everything from across your workspace.{' '}
                <span>Hide message</span>
              </div>
            )}
            <div
              className={
                isLargeTilesView ? 'img-placeholder--large' : 'img-placeholder'
              }
              style={{
                backgroundColor:
                  active_design.hexes_background_color || getBoardColor(topic)
              }}
            >
              {image && (
                <img src={image} alt={topic.title} className="topic-image" />
              )}
            </div>
          </a>
          <div className="board-type-dropdown-container">
            <BoardAndCardTypeListDropdown
              itemType={getBoardType(topic)}
              listType="board"
              setItemType={boardTypeKey =>
                this.handleUpdateBoardType(topic.id, boardTypeKey)
              }
              containerStyle={{ marginTop: '-3px' }}
              smallModal
              triggerIcon
              containerClasses="board-list-dropdown"
            />
          </div>
        </GenericDropZone>
        <GenericDropZone
          dropClassName={isLargeTilesView ? 'flex-item--large' : 'flex-item'}
          onDrop={this.nestTopic}
          itemType={dragItemTypes.TOPIC}
          item={topic}
        >
          <div className="tile-info board-bottom-icons">
            {!isAttachmentHoveringOnCard && isEditing && (
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
                  target.selectionStart = target.selectionEnd =
                    target.value.length;
                  target.scrollLeft = target.scrollWidth;
                }}
                onKeyPress={this.handleKeyPress}
                onKeyDown={this.handleKeyPress}
                value={title}
                className="add-subtopic-input"
                autoFocus
              />
            )}
            {!isAttachmentHoveringOnCard && !isEditing && (
              <a style={{ height: '100%' }} onClick={this.getClickHandler}>
                {isLargeTilesView && <span className="tiles-icon hex" />}
                <span
                  style={{ color: pages.includes(page) ? '#fff' : '' }}
                  className="line-clamp tile-title"
                  ref={span => (this.title = span)}
                >
                  {topic.attributes.title}
                  <ActivityIndicator
                    updatedAt={get(topic, 'attributes.updated_at')}
                  />
                </span>
              </a>
            )}
            {isAttachmentHoveringOnCard && (
              <span>
                {isLargeTilesView && <span className="tiles-icon hex" />}
                <span className="tile-title">Add Subtopic</span>
              </span>
            )}
            <StarButton topic={topic} />
            <TopicActionsDropdown
              topic={topic}
              onRenameTopicSelected={() => this.toggleEdit()}
            />
          </div>
        </GenericDropZone>
      </div>
    );
  }
}

const RefetchContainer = createRefetchContainer(
  TopicTile,
  {
    query: graphql`
      fragment TopicTile_query on Query
        @argumentDefinitions(owner: { type: "ID!" }) {
        config(owner: $owner, config: "hide_home_main_board_message") {
          id
          value
        }
      }
    `
  },
  graphql`
    query TopicTileRefetchQuery($owner: ID!) {
      ...TopicTile_query @arguments(owner: $owner)
    }
  `
);

const mapState = state => {
  const sm = stateMappings(state);
  const {
    utilities: { active_design },
    user,
    page: { topicId, page }
  } = sm;
  const rootTopic = getRootTopic(state);
  return {
    active_design,
    googleData: sm.integrationFiles.google,
    dropboxData: sm.integrationFiles.dropbox,
    boxData: sm.integrationFiles.box,
    topicId,
    page,
    userId: user.id,
    mainBoard: rootTopic
  };
};

const mapDispatch = {
  updateTitle: updateSubTopicTitle,
  createTopicAndCardsForGoogleFolder,
  createTopicAndCardsForDropboxFolder,
  moveTopicContents,
  addRemoveCardFromTopics,
  viewTopic,
  updateTopic
};

export default connect(
  mapState,
  mapDispatch
)(
  QueryRenderer(props => <RefetchContainer {...props} query={props} />, {
    query: graphql`
      query TopicTileQuery($owner: ID!) {
        ...TopicTile_query @arguments(owner: $owner)
      }
    `,
    vars: ({ topicId }) => ({
      owner: toGid('Topic', topicId)
    })
  })
);
