import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import cx from 'classnames';
import IndexViewCard from './IndexViewCard';
import {
  dragItemTypes,
  GenericDragDropListing,
  GenericDropZone
} from 'Components/shared/drag_and_drop/_index';
import { moveOrCopyCardInOrToTopicFromDragAndDrop } from 'Src/newRedux/database/cards/abstractions';
import { getSortedFilteredTopicsByParentTopic } from 'Src/newRedux/database/topics/selectors';
import { nonNestedCardFilter } from 'Lib/config/filters/other';
import AddCardCard from 'Components/shared/cards/AddCardCard';
import cardViews from 'Src/lib/config/lenses/cards';
import {
  getChatsForTopic,
  getVideoRoomsForTopic
} from 'Src/newRedux/database/cards/selectors';
import { getCardTypeAndIndex } from 'src/components/shared/CardAndBoardTypes';

const categories = ['content', 'database', 'planning', 'communication'];

const CardDragPreview = ({ card }) => (
  <div className="wiki-view_topic_drag-preview">
    <div className="wikilist-topic-segment_topic-title">
      {card.attributes.title}
    </div>
  </div>
);

class IndexViewCardsList extends Component {
  static propTypes = {
    isRootTopic: PropTypes.string,
    displayAddCard: PropTypes.bool,
    cards: PropTypes.array
  };

  static defaultProps = {
    className: null,
    displayAddCard: false
  };

  state = {
    cardType: null
  };

  componentDidMount() {
    this.setCardType();
  }

  componentDidUpdate(prevProps) {
    if (this.props.topic !== prevProps.topic) {
      this.setCardType();
    }
  }

  setCardType = () => {
    let cardType = null;
    const tag = this.props.topic?.attributes?.tag_list || [];
    if (tag.includes('notes')) {
      cardType = getCardTypeAndIndex('NOTES');
      return this.setState({ cardType });
    }
    if (tag.includes('task')) {
      cardType = getCardTypeAndIndex('TASK');
      return this.setState({ cardType });
    }
    if (tag.includes('data')) {
      cardType = getCardTypeAndIndex('DATA');
      return this.setState({ cardType });
    }
  };

  render() {
    const {
      cards,
      topic,
      className,
      displayAddCard,
      moveOrCopyCardInOrToTopicFromDragAndDrop,
      isSubtopics,
      projectLens,
      isAddChat,
      isAddVideo,
      isAddFile,
      cardFontColor,
      level,
      isTaskBoardsLens,
      isFileBoardsLens,
      isNoteBoardsLens,
      setDisplayAddCard,
      isTopLevelTopic
    } = this.props;

    const nonNestedCards = cards.filter(nonNestedCardFilter);

    const topicId = topic ? topic.id : '0';

    let boards = Object.values(cardViews);
    const defaultView = topic.attributes.default_view_id;
    const viewProperties = boards.filter(board => board.key == defaultView);
    let viewCategory = viewProperties[0] ? viewProperties[0].category : null;
    let cardIcon;
    let cardIconColor;
    let onlyChatCards = [];
    let isChat = false;
    if (projectLens) {
      if (categories.includes(viewCategory)) {
        if (viewCategory == categories[0] || viewCategory == categories[1]) {
          cardIcon = 'featured_play_list';
          cardIconColor = '#56ccf2';
        } else if (viewCategory == categories[3]) {
          isChat = true;
          if (viewProperties[0].key == 'CHAT') {
            cardIcon = 'forum';
            cardIconColor = '#d4b042';
            onlyChatCards = this.props.chats;
          } else {
            cardIcon = 'videocam';
            cardIconColor = '#eb5757';
            onlyChatCards = this.props.videoRooms;
          }
        } else cardIcon = 'check_box_outline_blank';
      } else cardIcon = 'description';
    }

    return (
      <div className={cx(className)}>
        <GenericDragDropListing
          dragClassName="task-view_drag-card"
          draggedItemProps={{ origin: { topicId } }}
          dropClassName="wiki-list_topic-dropzone"
          dragPreview={card => <CardDragPreview card={card} />}
          dropZoneProps={{ topicId }}
          itemList={isChat ? onlyChatCards : nonNestedCards}
          itemType={dragItemTypes.CARD}
          onDropItem={moveOrCopyCardInOrToTopicFromDragAndDrop}
          renderItem={cardItem => (
            <IndexViewCard
              moveOrCopyCardInOrToTopicFromDragAndDrop={
                moveOrCopyCardInOrToTopicFromDragAndDrop
              }
              card={cardItem}
              topic={topic}
              projectLens={projectLens}
              cardIcon={cardIcon}
              cardIconColor={cardIconColor}
              cardFontColor={cardFontColor}
              level={level}
              selectedCardType={this.state.cardType}
              isTaskBoardsLens={isTaskBoardsLens}
              showCompleteBox={
                !isFileBoardsLens && !isNoteBoardsLens && isTaskBoardsLens
              }
            />
          )}
        >
          {nonNestedCards.length === 0 &&
            onlyChatCards.length == 0 &&
            !projectLens &&
            !isTaskBoardsLens &&
            !displayAddCard &&
            !isSubtopics && (
              <div
                className="index-view__no-items-label"
                style={{ color: cardFontColor }}
              >
                {isAddChat
                  ? 'No Chats'
                  : isAddVideo
                  ? 'No Video Chats'
                  : 'No Cards'}
              </div>
            )}

          {/* {// nonNestedCards.length === 0 &&
          ((onlyChatCards.length == 0 &&
            // !isSubtopics &&
            isTaskBoardsLens &&
            isTopLevelTopic) ||
            displayAddCard) && (
            <AddCardCard
              afterCardCreated={cardId =>
                console.log('afterCardCreated > onSelectCard( cardId )', cardId)
              }
              selectedCardType={this.state.cardType}
              cardClassName="wiki-card"
              cardStyle={{
                marginLeft: !isTaskBoardsLens && '15px',
                width: !isTaskBoardsLens && '95%'
              }}
              inInputMode={displayAddCard || !isTaskBoardsLens}
              onDismiss={() => setDisplayAddCard(false)}
              topicId={topicId}
              newCardAttributes={
                isAddChat
                  ? { is_chat: true }
                  : isAddVideo
                  ? { is_video_chat: true }
                  : null
              }
              uploadFileForm={isAddFile}
              topMenu={true}
              transparent={!isTaskBoardsLens}
            />
          )} */}
        </GenericDragDropListing>
      </div>
    );
  }
}

const mapStateToProps = (state, { topic }) => {
  const topicId = topic ? topic.id : '0';

  let isSubtopics = topicId
    ? getSortedFilteredTopicsByParentTopic(state)[topicId] || []
    : [];
  isSubtopics = !!isSubtopics.length;

  const chats = getChatsForTopic(state, topicId);
  const videoRooms = getVideoRoomsForTopic(state, topicId);

  return { isSubtopics, chats, videoRooms };
};

const mapDispatch = {
  moveOrCopyCardInOrToTopicFromDragAndDrop
};

const IndexViewCardsListConnected = connect(
  mapStateToProps,
  mapDispatch
)(IndexViewCardsList);

export default IndexViewCardsListConnected;
