import React, { Component } from 'react';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import GenericDropZone from 'Src/components/shared/drag_and_drop/GenericDropZone';
import { dragItemTypes } from 'Components/shared/drag_and_drop/dragTypeEnum';
import { updateCard } from 'Src/newRedux/database/cards/thunks';
import { success } from 'Utils/toast';
import { moveTopicContents } from 'Src/newRedux/database/topics/thunks';
import TopicsNest from './TopicsNest';
import CardsNest from './CardsNest';

class NestedLevel extends Component {
  handleDrop = ({ dropZoneProps, draggedItemProps }) => {
    // const draggedItemType = draggedItemProps.itemType;
    const isSame = dropZoneProps.item.id == draggedItemProps.item.parentId;
    // console.log({ dropZoneProps, draggedItemProps, isSame, id: this.props.id });
    if (isSame) {
      return;
    }

    const dropZoneItemType = dropZoneProps.item.type;

    if (draggedItemProps.itemType == dragItemTypes.CARD) {
      let relationships = {};
      const isMovingToTopic = dropZoneItemType == dragItemTypes.TOPIC;
      const isNestingInCard = dropZoneItemType == dragItemTypes.CARD;
      if (isMovingToTopic) {
        // Move to topic
        relationships.topics = { data: [dropZoneProps.item.id] };
      }
      if (isNestingInCard) {
        //Move to card
        relationships.follows_tip = { data: [dropZoneProps.item.id] };
      }

      const updatedCard = !!this.props.updateCard({
        id: draggedItemProps.item.id,
        relationships
      });
      if (updatedCard) {
        success(
          isMovingToTopic
            ? 'Card moved successfully'
            : isNestingInCard
            ? 'Card nested successfully'
            : 'Card updated successfully'
        );
      }
    }

    if (draggedItemProps.itemType == dragItemTypes.TOPIC) {
      //Move topic to topic
      const serverUpdate = !!this.props.moveTopicContents({
        destinationTopicId: dropZoneProps.item.id,
        topicId: draggedItemProps.item.id
      });

      if (serverUpdate) {
        success('Topic moved successfully');
      }
    }
  };

  render() {
    const {
      type,
      id,
      parentTopicId,
      addNestedLevel,
      level,
      handleClickTitle,
      nestedLevels,
      card_font_color
    } = this.props;

    return (
      <GenericDropZone
        itemType={
          type == 'Tip'
            ? dragItemTypes.CARD
            : [dragItemTypes.CARD, dragItemTypes.TOPIC]
        }
        item={{
          id,
          type: dragItemTypes[type == 'Tip' ? 'CARD' : 'TOPIC']
        }}
        onDrop={this.handleDrop}
        dropClassName="nest_level"
        style={{ borderColor: card_font_color, color: card_font_color }}
      >
        {type == 'Topic' && (
          <TopicsNest
            id={id}
            addNestedLevel={addNestedLevel}
            level={level}
            handleClickTitle={handleClickTitle}
            nestedLevels={nestedLevels}
          />
        )}

        {type == 'Tip' && (
          <CardsNest
            id={id}
            addNestedLevel={addNestedLevel}
            level={level}
            handleClickTitle={handleClickTitle}
            nestedLevels={nestedLevels}
            parentTopicId={parentTopicId}
          />
        )}
      </GenericDropZone>
    );
  }
}

const mapDispatch = {
  updateCard,
  moveTopicContents
};

export default connect(undefined, mapDispatch)(NestedLevel);
