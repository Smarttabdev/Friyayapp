import React from 'react';
import { handleType } from '../../utils';
import {
  getToolIcon,
  getCardTypeIconAttribute,
  getBoardTypeAttributes
} from 'Src/utils/icons';
import { getIconColor } from 'Src/utils/color';
import IconButton from 'Components/shared/buttons/IconButton';
import GenericDragContainer from 'Components/shared/drag_and_drop/GenericDragContainer';
import { dragItemTypes } from 'Components/shared/drag_and_drop/dragTypeEnum';
import { getBoardTypeAttributesByTag } from 'Src/components/shared/CardAndBoardTypes';

const Item = ({
  item,
  id,
  type,
  handleClickTitle,
  handleExpandItem,
  isExpanded,
  isPreview,
  tip,
  topic
}) => {
  const slug = item?.itemType === 'file' ? item.tip.slug : item.slug;

  const icon = tip
    ? getCardTypeIconAttribute(type).icon
    : topic
    ? getBoardTypeAttributesByTag(type)?.iconType ??
      getBoardTypeAttributesByTag(null).iconType
    : getToolIcon(type);

  const color = tip
    ? getCardTypeIconAttribute(type).defaultColor
    : topic
    ? getBoardTypeAttributesByTag(type)?.color ??
      getBoardTypeAttributesByTag(null).color
    : getIconColor(type);

  return (
    <div
      className={`item ${isExpanded && 'is_expanded'} ${isPreview &&
        'columns_preview_item'}`}
    >
      <div className="item_info">
        <div className="icon" style={{ color }}>
          <i className="material-icons-outlined" style={{ fontSize: '20px' }}>
            {icon == 'hashtag' ? <span className="fa fa-hashtag"></span> : icon}
          </i>
        </div>

        <div
          className="title"
          onClick={() =>
            handleClickTitle({
              type: topic ? getBoardTypeAttributesByTag(type).itemType : type,
              slug,
              id
            })
          }
        >
          {item.title}
        </div>
      </div>
      <div className="expand_button" onClick={handleExpandItem}>
        <IconButton icon="arrow_right" outlined />
      </div>
    </div>
  );
};

const ColumnItem = ({
  item,
  id,
  parentId,
  tip,
  topic,
  handleClickTitle,
  handleExpandItem,
  isExpanded,
  baseType
}) => {
  const type = handleType(item?.itemType ?? tip?.cardType ?? topic?.tagList[0]);
  item = item ?? tip ?? topic;

  return (
    <GenericDragContainer
      item={{ id, parentId }}
      itemType={dragItemTypes[baseType == 'Tip' ? 'CARD' : 'TOPIC']}
      dragPreview={
        <Item item={item} tip={!!tip} topic={!!topic} type={type} isPreview />
      }
      onDropElsewhere={() => {}}
    >
      <Item
        item={item}
        id={id}
        type={type}
        handleClickTitle={handleClickTitle}
        handleExpandItem={handleExpandItem}
        isExpanded={isExpanded}
        tip={!!tip}
        topic={!!topic}
      />
    </GenericDragContainer>
  );
};

export default ColumnItem;
