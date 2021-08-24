import React, { useState } from 'react';
import Icon from 'Components/shared/Icon';
import GenericDropZone from 'Src/components/shared/drag_and_drop/GenericDropZone';
import {
  dragItemTypes,
  GenericDragDropListing
} from 'Components/shared/drag_and_drop/_index';
import IconButton from 'Components/shared/buttons/IconButton';
import {
  nestCardUnderCard as nestCardUnderCardAction,
  updateCard
} from 'Src/newRedux/database/cards/thunks';
import AddCardCard from 'Components/shared/cards/AddCardCard';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import PropTypes from 'prop-types';
import { getCardTypeIconAttribute } from 'Src/utils/icons';

CardList.propTypes = {
  card: PropTypes.object.isRequired,
  topicId: PropTypes.string.isRequired,
  nestCardUnderCard: PropTypes.func,
  renderItem: PropTypes.func,
  handleCardDetails: PropTypes.func
};

function CardList(props) {
  const {
    card,
    topicId,
    allCardsHash,
    nestCardUnderCard,
    renderItem,
    handleCardDetails,
    selectedCard
  } = props;
  const nestedCards = card.relationships.nested_tips.data
    .map(nestedCardId => allCardsHash[nestedCardId])
    .filter(nestedCard => !!nestedCard);
  const cardId = card.id;

  const [showNestedCards, setshowNestedCards] = useState(false);
  const [openAddCardForm, setopenAddCardForm] = useState(false);
  const [dragLeaveHandlersForParentLists] = useState([]);

  const handleNestCard = itemProps => {
    const dragged = itemProps.draggedItemProps;
    if (dragged.item.id === card.id) {
      return;
    }
    nestCardUnderCard({
      nestedCard: dragged.item,
      parentCard: card,
      fromTopicId: dragged.origin.topicId,
      toTopicId: dragged.origin.topicId,
      itemOrder: [...card.relationships.nested_tips.data, dragged.item.id]
    });
    setTimeout(() => {
      setshowNestedCards(true);
    });
  };

  const handleAddNestedCardButton = () => {
    setshowNestedCards(true);
    setopenAddCardForm(!openAddCardForm);
  };

  const handleDropCard = ({ droppedItemProps, dropZoneProps, itemOrder }) => {
    nestCardUnderCard({
      nestedCard: droppedItemProps.item,
      parentCard: allCardsHash[dropZoneProps.cardId],
      fromTopicId: droppedItemProps.origin.topicId,
      toTopicId: dropZoneProps.topicId,
      itemOrder
    });
  };

  if (card.relationships.topics.data[0] == topicId) {
    return (
      <>
        <div className="card">
          <GenericDropZone
            onDragStart={e => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onDragEnter={() => setshowNestedCards(true)}
            itemType={dragItemTypes.CARD}
            onDrop={handleNestCard}
            key="nest-zone"
          >
            <div
              className={`nest-zone ${card?.relationships.nested_tips.data
                .length == 0 && 'disable-caret'}`}
            >
              <IconButton
                fontAwesome
                icon={showNestedCards ? 'caret-down' : 'caret-right'}
                onClick={
                  card.relationships.nested_tips.data.length > 0
                    ? () => setshowNestedCards(!showNestedCards)
                    : undefined
                }
              />
            </div>
          </GenericDropZone>
          <div
            onClick={() => handleCardDetails(card.id)}
            style={{ display: 'flex', cursor: 'pointer' }}
            className={`main-card ${selectedCard == card.id && 'active'}`}
          >
            <Icon
              icon={
                getCardTypeIconAttribute(card?.attributes?.card_type).icon ||
                'featured_play_list'
              }
              style={{ fontSize: '20px' }}
              outlined
              color={
                getCardTypeIconAttribute(card?.attributes.card_type)
                  .defaultColor || '#56CCF2'
              }
            />
            <p title={card.attributes.title}>{card.attributes.title}</p>
            <div className="add-button">
              <IconButton
                icon="add"
                onClick={handleAddNestedCardButton}
                color="#A2A2A2"
                additionalIconClasses="button-icon"
                tooltip="Add Nested Card"
                tooltipOptions={{ place: 'bottom' }}
              />
            </div>
          </div>
        </div>
        {showNestedCards && (
          <div style={{ paddingLeft: '15px' }}>
            <GenericDragDropListing
              dragClassName="task-view_drag-card"
              draggedItemProps={{ origin: { topicId, cardId } }}
              dropClassName="wiki-list_topic-dropzone"
              dropZoneProps={{ topicId, cardId }}
              itemList={nestedCards}
              itemType={dragItemTypes.CARD}
              onDropItem={handleDropCard}
              parentListDragLeaveHandlers={dragLeaveHandlersForParentLists}
              renderItem={renderItem}
            >
              {openAddCardForm && (
                <div style={{ paddingLeft: '30px', paddingRight: '18px' }}>
                  <AddCardCard
                    cardStyle={{
                      marginBottom: '10px'
                    }}
                    inInputMode
                    newCardRelationships={{ follows_tip: { data: card.id } }}
                    topicId={topicId}
                    onDismiss={() => setopenAddCardForm(false)}
                    topMenu
                    transparent
                  />
                </div>
              )}
            </GenericDragDropListing>
          </div>
        )}
      </>
    );
  } else {
    return null;
  }
}

function mapState(state) {
  const sm = stateMappings(state);

  return { allCardsHash: sm.cards };
}

const mapDispatch = { nestCardUnderCard: nestCardUnderCardAction, updateCard };

export default connect(mapState, mapDispatch)(CardList);
