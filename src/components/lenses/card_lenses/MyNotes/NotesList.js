import React, { useState, useEffect } from 'react';
import Icon from 'Components/shared/Icon';
import AddCardOrSubtopic from 'Components/shared/assemblies/AddCardOrSubtopic';
import GenericDropZone from 'Components/shared/drag_and_drop/GenericDropZone';
import { dragItemTypes } from 'Components/shared/drag_and_drop/dragTypeEnum';
import IconButton from 'Components/shared/buttons/IconButton';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { getSortedFilteredCardsByTopic } from 'Src/newRedux/database/cards/selectors';
import { getSortedFilteredTopicsByParentTopic } from 'Src/newRedux/database/topics/selectors';
import GenericDragDropListing from 'Components/shared/drag_and_drop/GenericDragDropListing';
import DMLoader from 'Src/dataManager/components/DMLoader';
import CardList from './CardList';
import PropTypes from 'prop-types';
import { getBoardTypeAttributes } from 'Src/utils/icons';
import { getBoardType } from 'Lib/utilities';
import TopicActionsDropdown from 'Components/shared/topics/elements/TopicActionsDropdown';

function NotesList(props) {
  const {
    userId,
    cards = [],
    cardRequirements,
    onDropCard,
    renderSubtopicSection,
    subtopics,
    topic,
    topicId,
    handleRemoveBoard,
    handleCardDetails,
    selectedCard,
    isKnowledgeBase = false
  } = props;
  const [sectionIsOpen, setsectionIsOpen] = useState(false);
  const [inCardInputMode, setinCardInputMode] = useState(true);
  const [isNestedItemEmpty, setisNestedItemEmpty] = useState(
    topic.attributes.tips.length == 0 && topic.attributes.subtopics.length == 0
  );

  useEffect(() => {
    //re-check if the nested item is empty
    if (cards.length > 0 || subtopics.length > 0) {
      setisNestedItemEmpty(false);
    }
  }, [cards, subtopics]);

  const renderNestedCard = card => {
    return (
      <CardList
        card={card}
        topicId={topicId}
        handleCardDetails={handleCardDetails}
        selectedCard={selectedCard}
        renderItem={card => renderNestedCard(card)}
      />
    );
  };

  return (
    <div className="notes-list">
      <div className="board">
        <GenericDropZone
          dropClassName="icon-container"
          dropsDisabled={true}
          itemType={dragItemTypes.CARD}
          onDragEnter={() => setsectionIsOpen(true)}
        >
          <i
            className={`fa icon-cursor-pointer ${
              sectionIsOpen ? 'fa-caret-down' : 'fa-caret-right'
            } ${isNestedItemEmpty ? 'disable-caret' : 'undefined'}`}
            onClick={() => setsectionIsOpen(!sectionIsOpen)}
          />
        </GenericDropZone>
        <div className="main-topic">
          <Icon
            icon={getBoardTypeAttributes(getBoardType(topic)).icon}
            fontAwesome={
              getBoardTypeAttributes(getBoardType(topic)).fontAwesome
            }
            color={getBoardTypeAttributes(getBoardType(topic)).color}
            outlined={getBoardTypeAttributes(getBoardType(topic)).outlined}
            style={{
              fontSize:
                getBoardTypeAttributes(getBoardType(topic)).icon ===
                'calendar_today'
                  ? 18
                  : 20,
              marginTop:
                getBoardTypeAttributes(getBoardType(topic)).icon ===
                  'hashtag' && -4
            }}
          />
          <p
            title={topic.attributes.title}
            style={
              !topic.attributes?.parent_id &&
              topic.attributes.tag_list.indexOf(
                `user-${userId}-default-notes`
              ) > -1
                ? { marginTop: '4px' }
                : null
            }
          >
            {topic.attributes.title}
          </p>

          <TopicActionsDropdown
            dropdownLeft
            color="#A2A2B8"
            topicId={toId(topicId)}
            className="board-settings-dropdown"
          />

          {topic.attributes?.tag_list?.indexOf(
            isKnowledgeBase ? 'knowledge' : 'notes'
          ) >= 0 &&
            topic.attributes.tag_list.indexOf(
              !isKnowledgeBase && `user-${userId}-default-notes`
            ) == -1 && (
              <IconButton
                color="#A2A2B8"
                icon="remove"
                containerClasses="remove-item"
                tooltip={isKnowledgeBase ? 'Remove knowledge' : 'Remove notes'}
                onClick={() => handleRemoveBoard(topic)}
              />
            )}
          <div className="add-button">
            <div onClick={() => setsectionIsOpen(true)}>
              <AddCardOrSubtopic
                color={'BBB9B9'}
                selectedTopicId={topicId}
                displayAddCardButton
                displayAddSubtopicButton
                hideOtherButton
                cardTypeFilter={['NOTES']}
                boardTypeFilter={isKnowledgeBase ? ['knowledge'] : ['notes']}
              />
            </div>
          </div>
        </div>
      </div>
      {sectionIsOpen && (
        <div>
          <GenericDragDropListing
            itemContainerClassName=""
            itemList={cards}
            dropClassName="task-board-card-list"
            dragClassName="task-view_drag-card"
            dropZoneProps={{ topicId: topicId }}
            draggedItemProps={{ origin: { topicId: topicId } }}
            itemType={dragItemTypes.CARD}
            onDropItem={onDropCard}
            selectedCard={selectedCard}
            renderItem={card => renderNestedCard(card)}
          >
            {/* render children even if cards = 0, to fix drop cards to empty board issue */}
            {cards.length == 0 && <span>&nbsp;</span>}

            <DMLoader
              dataRequirements={{
                cardsWithAttributes: {
                  attributes: { ...cardRequirements, topicId }
                },
                subtopicsForTopic: { topicId }
              }}
              loaderKey="cardsWithAttributes"
            />
          </GenericDragDropListing>

          <div className="notes-view_child-container">
            {renderSubtopicSection &&
              subtopics.map(subtopic => renderSubtopicSection(subtopic))}
          </div>
        </div>
      )}
    </div>
  );
}

NotesList.propTypes = {
  userId: PropTypes.string.isRequired,
  cardRequirements: PropTypes.object,
  onDropCard: PropTypes.func.isRequired,
  renderSubtopicSection: PropTypes.func.isRequired,
  topicId: PropTypes.string.isRequired,
  handleRemoveBoard: PropTypes.func,
  handleCardDetails: PropTypes.func
};

const mapState = (state, props) => {
  const sm = stateMappings(state);
  const topic = sm.topics[props.topicId];
  return {
    cards:
      getSortedFilteredCardsByTopic(state)[props.topicId] || props.cards || [],
    subtopics: getSortedFilteredTopicsByParentTopic(state)[props.topicId] || [],
    topic
  };
};

export default connect(mapState)(NotesList);
