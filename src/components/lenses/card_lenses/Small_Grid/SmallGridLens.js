import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { array, func, object, string } from 'prop-types';
// import { dragItemTypes } from 'Components/shared/drag_and_drop/dragTypeEnum';
import { moveOrCopyCardInOrToTopicFromDragAndDrop } from 'Src/newRedux/database/cards/abstractions';
import ActiveFiltersPanel from 'Components/shared/filters/ActiveFiltersPanel';
import DMLoader from 'Src/dataManager/components/DMLoader';
import SmallGridCard from './SmallGridCard';
import { dragItemTypes } from 'Components/shared/drag_and_drop/_index';
import GenericDragDropListing from 'Components/shared/drag_and_drop/GenericDragDropListing';
import AddCardCard from 'Components/shared/cards/AddCardCard';
import { nonNestedCardFilter } from 'Lib/config/filters/other';
import { scrollToShow } from 'Src/lib/utilities';
import { stateMappings } from 'Src/newRedux/stateMappings';

class SmallGridLens extends PureComponent {
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
      <div className={`grid-board   ${isHome ? 'pl28' : 'pl35'}`}>
        <ActiveFiltersPanel additionalContainerClass={'ml5'} />
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
            <SmallGridCard card={card} key={card.id} topic={topic} />
          )}
        >
          <div className="grid-view_card-container">
            <AddCardCard
              cardClassName="small-grid-card"
              board="small-grid-new"
              topic={topic}
              inInputMode={this.state.inInputMode}
              afterCardCreated={this.afterCardCreated}
              defaultIconColor
              smallCard
              topMenu
            />
          </div>

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

SmallGridLens.propTypes = {
  cards: array.isRequired,
  moveOrCopyCardInOrToTopicFromDragAndDrop: func.isRequired,
  topic: object,
  topicId: string
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

export default connect(mapState, mapDispatch)(SmallGridLens);
