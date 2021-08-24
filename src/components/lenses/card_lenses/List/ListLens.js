import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { array, func, object } from 'prop-types';
import { dragItemTypes } from 'Components/shared/drag_and_drop/dragTypeEnum';
import { moveOrCopyCardInOrToTopicFromDragAndDrop } from 'Src/newRedux/database/cards/abstractions';
import ActiveFiltersPanel from 'Components/shared/filters/ActiveFiltersPanel';

import DMLoader from 'Src/dataManager/components/DMLoader';
import GenericDragDropListing from 'Components/shared/drag_and_drop/GenericDragDropListing';
import ListCard from './ListCard';
import AddCardCard from 'Components/shared/cards/AddCardCard';
import { scrollToShow } from 'Src/lib/utilities';

class ListLens extends PureComponent {
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
    scrollToShow(elem, 14, 24);
  };

  render() {
    const {
      cardRequirements,
      cards,
      moveOrCopyCardInOrToTopicFromDragAndDrop,
      topic
    } = this.props;
    return (
      <div className="list-board ml25 root-list-card">
        <ActiveFiltersPanel />
        <GenericDragDropListing
          dragClassName="draggable-card"
          dropClassName="list-board-card-list"
          dropZoneProps={{ topicId: topic ? topic.id : null }}
          draggedItemProps={{ origin: { topicId: topic ? topic.id : null } }}
          itemContainerClassName="list-board-card-seperator"
          itemList={cards}
          itemType={dragItemTypes.CARD}
          onDropItem={moveOrCopyCardInOrToTopicFromDragAndDrop}
          renderItem={card => (
            <ListCard
              card={card}
              key={card.id}
              topicId={topic ? topic.id : null}
              useLevel
            />
          )}
        >
          <AddCardCard
            topic={topic}
            inInputMode={this.state.inInputMode}
            afterCardCreated={this.afterCardCreated}
            transparent
            topMenu={true}
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

ListLens.propTypes = {
  cards: array.isRequired,
  moveOrCopyCardInOrToTopicFromDragAndDrop: func.isRequired,
  topic: object
};
const mapDispatch = {
  moveOrCopyCardInOrToTopicFromDragAndDrop
};

export default connect(undefined, mapDispatch)(ListLens);
