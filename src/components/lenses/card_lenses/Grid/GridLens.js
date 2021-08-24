import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { array, func, object, string } from 'prop-types';
import { dragItemTypes } from 'Components/shared/drag_and_drop/dragTypeEnum';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { moveOrCopyCardInOrToTopicFromDragAndDrop } from 'Src/newRedux/database/cards/abstractions';
import ActiveFiltersPanel from 'Components/shared/filters/ActiveFiltersPanel';
import DMLoader from 'Src/dataManager/components/DMLoader';
import GridCard from './GridCard';
import GenericDragDropListing from 'Components/shared/drag_and_drop/GenericDragDropListing';
import AddCardCard from 'Components/shared/cards/AddCardCard';
import { nonNestedCardFilter } from 'Lib/config/filters/other';
import { scrollToShow } from 'Src/lib/utilities';

class GridLens extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      inInputMode: false
    };
  }

  handleToggleInputMode = () => {
    this.setState(state => ({ inInputMode: !state.inInputMode }));
  };

  afterCardCreated = cardId => {
    if (this.props.cardsSplitScreen) {
      this.props.updateSelectedCard(cardId);
    }
    const elem = document.querySelector('.card-title.c' + cardId);
    scrollToShow(elem, 18, 24);
  };

  render() {
    const {
      cardRequirements,
      cards,
      moveOrCopyCardInOrToTopicFromDragAndDrop,
      topic,
      isHome
    } = this.props;
    const nonNestedCards = cards.filter(nonNestedCardFilter);
    return (
      <div className={`grid-board ${isHome ? 'pl28' : 'pl35'}`}>
        <ActiveFiltersPanel additionalContainerClass={'ml10'} />
        <GenericDragDropListing
          dragClassName="task-view_drag-card"
          dropClassName="grid-view_items-container"
          dropZoneProps={{ topicId: topic ? topic.id : null }}
          draggedItemProps={{ origin: { topicId: topic ? topic.id : null } }}
          itemContainerClassName="grid-view_card-container"
          itemList={nonNestedCards}
          itemType={dragItemTypes.CARD}
          onDropItem={moveOrCopyCardInOrToTopicFromDragAndDrop}
          renderItem={card => (
            <GridCard card={card} key={card.id} topic={topic} />
          )}
        >
          <AddCardCard
            cardClassName="grid-card"
            board="grid-new"
            containerClassName="grid-view_card-container"
            topic={topic}
            inInputMode={this.state.inInputMode}
            afterCardCreated={this.afterCardCreated}
            defaultIconColor
            topMenu
          />

          <DMLoader
            dataRequirements={{
              cardsWithAttributes: { attributes: cardRequirements }
            }}
            loaderKey="cardsWithAttributes"
          />
        </GenericDragDropListing>
      </div>
    );
  }
}

GridLens.propTypes = {
  cards: array.isRequired,
  topic: object,
  topicId: string,
  cardRequirements: object,
  moveOrCopyCardInOrToTopicFromDragAndDrop: func
};

const mapState = state => {
  const sm = stateMappings(state);
  const isHome = sm.page.isHome;

  return {
    isHome
  };
};

const mapDispatch = {
  moveOrCopyCardInOrToTopicFromDragAndDrop
};

export default connect(mapState, mapDispatch)(GridLens);
