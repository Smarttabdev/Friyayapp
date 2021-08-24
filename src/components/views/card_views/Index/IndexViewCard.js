import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Icon from 'Components/shared/Icon';
import OptionsDropdownButton from 'Components/shared/buttons/OptionsDropdownButton';
import CardActionsDropdown from 'Components/shared/cards/elements/CardActionsDropdown';
import CardTitleLink from 'Components/shared/cards/elements/CardTitleLink';
import IconButton from 'Components/shared/buttons/IconButton';
import get from 'lodash/get';

import AddCardCard from 'Components/shared/cards/AddCardCard';
import {
  dragItemTypes,
  GenericDragDropListing,
  GenericDropZone
} from 'Components/shared/drag_and_drop/_index';
import { getSortedFilteredCardsByTopic } from 'Src/newRedux/database/cards/selectors';
import { moveOrCopyCardInOrToTopicFromDragAndDrop } from 'Src/newRedux/database/cards/abstractions';
import {
  nestCardUnderCard,
  updateCard
} from 'Src/newRedux/database/cards/thunks';
import { stateMappings } from 'Src/newRedux/stateMappings';
import Ability from 'Lib/ability';
import { failure } from 'Utils/toast';

class IndexViewCard extends Component {
  static propTypes = {
    dragLeaveHandlersForParentLists: PropTypes.array
  };

  static defaultProps = {
    dragLeaveHandlersForParentLists: [],
    cardIcon: 'description'
  };

  state = {
    isNestedCardsOpen: false,
    displayAddCard: false
  };

  handleDropCard = ({ droppedItemProps, dropZoneProps, itemOrder }) => {
    this.props.nestCardUnderCard({
      nestedCard: droppedItemProps.item,
      parentCard: this.props.cards[dropZoneProps.cardId],
      fromTopicId: droppedItemProps.origin.topicId,
      toTopicId: dropZoneProps.topicId,
      itemOrder
    });
  };

  handleAddNestedCard = () =>
    this.setState({ displayAddCard: true, isNestedCardsOpen: true });

  openNestedCards = () =>
    !this.state.isNestedCardsOpen && this.setState({ isNestedCardsOpen: true });

  toggleNestedCards = () =>
    this.setState(prev => ({ isNestedCardsOpen: !prev.isNestedCardsOpen }));

  handleToggleCompleteCard = card => {
    const { updateCard } = this.props;

    if (Ability.can('update', 'self', card)) {
      const { completed_percentage, completion_date } = card.attributes;
      const attributes = {
        completion_date: completion_date ? null : moment().toISOString(),
        completed_percentage: completed_percentage == 100 ? 0 : 100
      };

      updateCard({ id: card.id, attributes });
    } else {
      failure("You don't have permission to complete that card!");
    }
  };

  render() {
    const { isNestedCardsOpen, displayAddCard } = this.state;
    const {
      card,
      nestedCards,
      topic,
      dragLeaveHandlersForParentLists,
      cardIcon,
      projectLens,
      cardIconColor,
      cardFontColor,
      isTaskBoardsLens,
      level = 0,
      showCompleteBox
    } = this.props;

    const {
      id: cardId,
      attributes: { completed_percentage }
    } = card;
    const topicId = topic ? topic.id : '0';
    const isComplete = completed_percentage == 100;

    const parentRelationship = { follows_tip: { data: cardId } };

    return (
      <div>
        {/* Card Title Section */}
        <div
          className="wiki-card"
          style={{
            position: `${projectLens && 'relative'}`,
            marginLeft: level > 0 && level * 10
          }}
        >
          <GenericDropZone
            dropsDisabled={true}
            itemType={dragItemTypes.CARD}
            onDragEnter={this.openNestedCards}
          >
            <IconButton
              color={isTaskBoardsLens && '#292b2d'}
              fontAwesome
              icon={isNestedCardsOpen ? 'caret-down' : 'caret-right'}
              onClick={this.toggleNestedCards}
              containerClasses={'noWidth'}
            />
          </GenericDropZone>
          {/* <Icon
            additionalClasses="small grey"
            icon={cardIcon}
            color={cardFontColor || cardIconColor}
            containerClasses="cardIcon-mr"
          /> */}
          {showCompleteBox && (
            <IconButton
              outlined={true}
              icon={isComplete ? 'check_box' : 'check_box_outline_blank'}
              onClick={() => this.handleToggleCompleteCard(card)}
              color="#808080"
              fontSize={18}
            />
          )}
          <CardTitleLink
            additionalClasses={
              isTaskBoardsLens && isComplete && 'card-title-strike'
            }
            card={card}
            showCardTypeIcon
            cardTypeIconSize={18}
            color={!isTaskBoardsLens && cardFontColor}
            truncate
          />

          <div className={`wiki-card_options ${projectLens && 'pro_ject'}`}>
            <OptionsDropdownButton icon="add">
              <a
                className="dropdown-option-item"
                onClick={this.handleAddNestedCard}
              >
                Add Nested Card
              </a>
            </OptionsDropdownButton>
            <CardActionsDropdown
              card={card}
              onAddCard={this.handleAddNestedCard}
            />
          </div>
        </div>

        {/* Card's Nested Section */}
        <div
          className={cx('wikilist-topic-segment_topic-content', {
            'is-presented': isNestedCardsOpen
          })}
        >
          {isNestedCardsOpen && (
            <Fragment>
              <GenericDragDropListing
                dragClassName="task-view_drag-card"
                draggedItemProps={{ origin: { topicId, cardId } }}
                dropClassName="wiki-list_topic-dropzone"
                dropZoneProps={{ topicId, cardId }}
                itemList={nestedCards}
                itemType={dragItemTypes.CARD}
                onDropItem={this.handleDropCard}
                parentListDragLeaveHandlers={dragLeaveHandlersForParentLists}
                renderItem={(cardItem, parentDragLeaveHandlers) => (
                  <div className="pl15">
                    <IndexViewCardConnected
                      card={cardItem}
                      topic={topic}
                      dragLeaveHandlersForParentLists={parentDragLeaveHandlers}
                      level={projectLens ? level + 0.5 : level + 1}
                      isTaskBoardsLens={isTaskBoardsLens}
                      cardFontColor={cardFontColor}
                    />
                  </div>
                )}
              >
                {nestedCards.length == 0 && !displayAddCard && (
                  <div className="index-view__no-items-label m-l-50px">
                    No Nested Cards
                  </div>
                )}

                {displayAddCard && (
                  <AddCardCard
                    cardClassName="wiki-card"
                    cardStyle={{ marginLeft: '20px' }}
                    inInputMode={true}
                    newCardRelationships={parentRelationship}
                    onDismiss={() => this.setState({ displayAddCard: false })}
                    topicId={topicId}
                    topMenu={true}
                    selectedCardType={this.props.selectedCardType}
                    transparent
                  />
                )}
              </GenericDragDropListing>
            </Fragment>
          )}
        </div>
      </div>
    );
  }
}

const mapState = (state, props) => {
  const sm = stateMappings(state);
  const topicId = props.topic ? props.topic.id : null;

  return {
    cards: sm.cards,
    nestedCards: getSortedFilteredCardsByTopic(state)[topicId]
      ? getSortedFilteredCardsByTopic(state)[topicId].filter(
          card => get(card, 'relationships.follows_tip.data') == props.card.id
        )
      : []
  };
};

const mapDispatch = {
  moveOrCopyCardInOrToTopicFromDragAndDrop,
  nestCardUnderCard,
  updateCard
};

const IndexViewCardConnected = connect(mapState, mapDispatch)(IndexViewCard);

export default IndexViewCardConnected;
