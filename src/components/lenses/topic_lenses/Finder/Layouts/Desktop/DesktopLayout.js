import React, { Component } from 'react';
import { getToolIcon } from 'Src/utils/icons';
import { getIconColor } from 'Src/utils/color';
import { handleType } from '../../utils';
import GenericDragContainer from 'Components/shared/drag_and_drop/GenericDragContainer';
import { dragItemTypes } from 'Components/shared/drag_and_drop/dragTypeEnum';
import GenericDropZone from 'Src/components/shared/drag_and_drop/GenericDropZone';
import { updateCard } from 'Src/newRedux/database/cards/thunks';
import { connect } from 'react-redux';
import { success } from 'Utils/toast';
import { moveTopicContents } from 'Src/newRedux/database/topics/thunks';
import DesktopItem from './DesktopItem';
import FilterTabs from './FilterTabs';
import LoadMore from 'Components/shared/LoadMore';

class DesktopLayout extends Component {
  state = {};

  handleDropElsewhere = () => {};

  handleDrop = ({ dropZoneProps, draggedItemProps }) => {
    // const draggedItemType = draggedItemProps.itemType;
    const isSame =
      dropZoneProps.item.type == draggedItemProps.itemType &&
      dropZoneProps.item.id == draggedItemProps.item.id;
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

    setTimeout(() => {
      this.props.forceGraphQLUpdateItems();
    });
  };

  render() {
    const { card_font_color } = this.props;
    return (
      <div className="desktop_layout" style={{ borderColor: card_font_color }}>
        <FilterTabs card_font_color={card_font_color} />
        <div className="items_section" style={{ color: card_font_color }}>
          {this.props.items
            .filter(item => item.label !== '')
            .map((item, i) => {
              const type = handleType(item.itemType);
              const icon = getToolIcon(type);
              const color = getIconColor(type);
              const id = toId(item.itemId);
              const slug = item.itemType === 'file' ? item.tip.slug : item.slug;

              return (
                <GenericDropZone
                  key={i}
                  itemType={
                    item.baseType == 'Tip'
                      ? dragItemTypes.CARD
                      : [dragItemTypes.CARD, dragItemTypes.TOPIC]
                  }
                  item={{
                    id,
                    type:
                      dragItemTypes[item.baseType == 'Tip' ? 'CARD' : 'TOPIC']
                  }}
                  onDrop={this.handleDrop}
                  dropClassName="item"
                >
                  <GenericDragContainer
                    item={{ id }}
                    itemType={
                      dragItemTypes[item.baseType == 'Tip' ? 'CARD' : 'TOPIC']
                    }
                    dragPreview={
                      <DesktopItem
                        color={color}
                        icon={icon}
                        title={item?.title}
                        isPreview
                      />
                    }
                    onDropElsewhere={this.handleDropElsewhere}
                  >
                    <DesktopItem
                      color={color}
                      icon={icon}
                      title={
                        item.itemType === 'file' ? item.tip.title : item.title
                      }
                      handleClickTitle={this.props.handleClickTitle}
                      type={item.itemType}
                      baseType={item.baseType}
                      id={id}
                      slug={slug}
                    />
                  </GenericDragContainer>
                </GenericDropZone>
              );
            })}
          <div style={{ padding: '45px 0' }}>
            <LoadMore relay={this.props.paginationRelay} />
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatch = {
  updateCard,
  moveTopicContents
};

export default connect(undefined, mapDispatch)(DesktopLayout);
