import React, { Component } from 'react';
import { number } from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import GoalCard from './GoalCard';
import { dragItemTypes } from 'Components/shared/drag_and_drop/dragTypeEnum';
import GenericDragDropListing from 'Components/shared/drag_and_drop/GenericDragDropListing';
import Ability from 'Lib/ability';
import { failure } from 'Utils/toast';
import DMLoader from 'Src/dataManager/components/DMLoader';
import { updateCard } from 'Src/newRedux/database/cards/thunks';
import { moveOrCopyCardInOrToTopicFromDragAndDrop } from 'Src/newRedux/database/cards/abstractions';
import {
  getFilterSettings,
  setUserFilterSettings
} from 'Src/helpers/user_config';

class CompletedSection extends Component {
  static propTypes = {
    percentageOfCards: number.isRequired
  };

  completeCard = ({ droppedItemProps, dropZoneProps, itemOrder }) => {
    const { updateCard, moveOrCopyCardInOrToTopicFromDragAndDrop } = this.props;
    const { item } = droppedItemProps;

    if (Ability.can('update', 'self', item)) {
      updateCard({
        id: item.id,
        attributes: {
          completed_percentage: 100,
          completion_date: moment().format()
        }
      });

      moveOrCopyCardInOrToTopicFromDragAndDrop({
        droppedItemProps,
        dropZoneProps,
        itemOrder
      });
    } else {
      failure("You don't have permission to move that card!");
    }
  };

  render() {
    const {
      cards,
      percentageOfCards,
      cardRequirements,
      topic,
      includeArchivedCards,
      setUserFilterSettings
    } = this.props;

    return (
      <div className="goal-board-section prel">
        <header className="header-links divider goal-board-section-header">
          <h2 className="goal-view_title">Completed</h2>
          <span className="goal-view_percentage">
            {isNaN(percentageOfCards) ? '-' : `${percentageOfCards}%`}
          </span>
        </header>
        <GenericDragDropListing
          dragClassName="task-view_drag-card"
          dropClassName="oscroll mt10 mb40 mh120 flex-1"
          dropZoneProps={{ topicId: topic ? topic.id : null }}
          draggedItemProps={{ origin: { topicId: topic ? topic.id : null } }}
          itemContainerClassName="grid-view_card-container"
          itemList={cards}
          itemType={dragItemTypes.CARD}
          onDropItem={this.completeCard}
          renderItem={card => (
            <GoalCard
              card={card}
              key={card.id}
              topicId={topic ? topic.id : null}
            />
          )}
        >
          <DMLoader
            dataRequirements={{
              cardsWithAttributes: { attributes: cardRequirements }
            }}
            loaderKey="cardsWithAttributes"
          />
        </GenericDragDropListing>

        <div className="toggle-archive">
          <input
            onChange={e => {
              const payload = {
                include_archived_cards: e.target.checked
              };
              setUserFilterSettings(payload);
            }}
            type="checkbox"
            id="showArchived"
            checked={includeArchivedCards}
          />
          <label className="ml10" htmlFor="showArchived">
            Include Archived Cards
          </label>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  const filter_setting = getFilterSettings(state);
  return {
    includeArchivedCards: filter_setting.include_archived_cards
  };
};

const mapDispatch = {
  moveOrCopyCardInOrToTopicFromDragAndDrop,
  updateCard,
  setUserFilterSettings
};

export default connect(mapState, mapDispatch)(CompletedSection);
