import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import { array, bool, func, string, object } from 'prop-types';

import DMLoader from 'Src/dataManager/components/DMLoader';
import AddCardCard from 'Components/shared/cards/AddCardCard';
import CardActionsDropdown from 'Components/shared/cards/elements/CardActionsDropdown';
import CardTitleLink from 'Components/shared/cards/elements/CardTitleLink';
import Icon from 'Components/shared/Icon';
import IconButton from 'Components/shared/buttons/IconButton';
import OptionsDropdownButton from 'Components/shared/buttons/OptionsDropdownButton';

import {
  dragItemTypes,
  GenericDragDropListing,
  GenericDropZone
} from 'Components/shared/drag_and_drop/_index';
import { getSortedFilteredCardsByTopic } from 'Src/newRedux/database/cards/selectors';
import { moveOrCopyCardInOrToTopicFromDragAndDrop } from 'Src/newRedux/database/cards/abstractions';
import { nestCardUnderCard } from 'Src/newRedux/database/cards/thunks';
import { stateMappings } from 'Src/newRedux/stateMappings';
import GenericCard from 'Components/lenses/card_lenses/GenericCard';

class WikiCard extends GenericCard {
  static propTypes = {
    card: object.isRequired,
    cards: object.isRequired,
    dragLeaveHandlersForParentLists: array,
    hideHeader: bool,
    isSelected: bool,
    moveOrCopyCardInOrToTopicFromDragAndDrop: func.isRequired,
    nestCardUnderCard: func.isRequired,
    nestedCards: array.isRequired,
    onSelectCard: func,
    renderCard: func.isRequired,
    topicId: string,
    color: string
  };

  constructor(props) {
    super(props);
    this.state = {
      displayAddCard: false,
      showNestedCards: props.hideHeader
    };
  }

  handlAddNestedCard = () =>
    this.setState({ displayAddCard: true, showNestedCards: true });

  handleDropCard = ({ droppedItemProps, dropZoneProps, itemOrder }) => {
    this.props.nestCardUnderCard({
      nestedCard: droppedItemProps.item,
      parentCard: this.props.cards[dropZoneProps.cardId],
      fromTopicId: droppedItemProps.origin.topicId,
      toTopicId: dropZoneProps.topicId,
      itemOrder
    });
  };

  handleToggleSectionOpen = open => this.setState({ showNestedCards: open });

  render() {
    const {
      card: {
        attributes: { slug, title },
        relationships: { nested_tips }
      },
      card,
      dragLeaveHandlersForParentLists,
      isSelected,
      nestedCards,
      onSelectCard,
      renderCard,
      topicId,
      color
    } = this.props;
    const { displayAddCard, showNestedCards } = this.state;
    const parentRelationship = { follows_tip: { data: card.id } };

    return (
      <div className="wikilist-topic-segment">
        <div className="wikilist-topic-segment_title-container">
          <GenericDropZone
            dropClassName="nest-card-zone"
            onDragStart={e => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onDragEnter={attrs => this.showAsNestable(attrs)}
            onDragLeave={attrs => this.dontShowAsNestable(attrs)}
            itemType={dragItemTypes.CARD}
            onDrop={this.handleNestCard}
            key="nest-zone"
          >
            <div className="nest-zone">
              <IconButton
                additionalClasses="wiki-card__nested-cards-caret"
                fontAwesome
                color={color}
                icon={this.state.showNestedCards ? 'caret-down' : 'caret-right'}
                onClick={this.handleNestedCardsCaretClick}
              />
            </div>
          </GenericDropZone>

          <div className={`wiki-card ${isSelected && 'is-selected'}`}>
            {/* <Icon color={color} additionalClasses="small" icon="description" /> */}
            <div className="wiki-card_title-container">
              <CardTitleLink
                additionalClasses={`wiki-card_title ${isSelected &&
                  'is-selected'}`}
                onClick={() => onSelectCard(card.id)}
                card={card}
                truncate
                color={color}
                showCardTypeIcon
                cardTypeIconSize={18}
              />
            </div>
            <div className="wiki-card_options">
              <OptionsDropdownButton color={color} icon="add">
                <a
                  className="dropdown-option-item"
                  onClick={this.handlAddNestedCard}
                >
                  Add Nested Card
                </a>
              </OptionsDropdownButton>
              <CardActionsDropdown
                card={card}
                color={color}
                onAddCard={this.handlAddNestedCard}
              />
            </div>
          </div>
        </div>

        <div
          className={`wikilist-topic-segment_topic-content ${showNestedCards &&
            'is-presented'}`}
        >
          {showNestedCards && (
            <Fragment>
              <GenericDragDropListing
                dragClassName="task-view_drag-card"
                draggedItemProps={{
                  origin: { topicId: topicId, cardId: card.id }
                }}
                dropClassName="wiki-list_topic-dropzone"
                dropZoneProps={{ topicId: topicId, cardId: card.id }}
                itemList={nestedCards}
                itemType={dragItemTypes.CARD}
                onDropItem={this.handleDropCard}
                parentListDragLeaveHandlers={dragLeaveHandlersForParentLists}
                renderItem={renderCard}
              >
                {displayAddCard && (
                  <AddCardCard
                    afterCardCreated={cardId => onSelectCard(cardId)}
                    cardClassName="wiki-card"
                    inInputMode={true}
                    newCardRelationships={parentRelationship}
                    onDismiss={() => this.setState({ displayAddCard: false })}
                    topicId={topicId}
                    transparent
                    topMenu
                  />
                )}
              </GenericDragDropListing>
              {nested_tips?.data?.length > 0 && (
                <DMLoader
                  dataRequirements={{
                    cardsWithAttributes: {
                      attributes: {
                        filterIDs: nested_tips?.data
                      }
                    }
                  }}
                  loaderKey="cardsWithAttributes"
                />
              )}
            </Fragment>
          )}
        </div>
      </div>
    );
  }
}

const mapState = (state, props) => {
  const sm = stateMappings(state);

  const nestedCards = (props.card?.relationships?.nested_tips?.data || [])
    .map(id => sm.cards[id])
    .filter(x => x);

  return {
    cards: sm.cards,
    nestedCards
  };
};

const mapDispatch = {
  moveOrCopyCardInOrToTopicFromDragAndDrop,
  nestCardUnderCard
};

export default connect(mapState, mapDispatch)(WikiCard);
