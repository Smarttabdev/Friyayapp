import React, { useState } from 'react';
import IconButton from 'Components/shared/buttons/IconButton';
import { getIconColor } from 'Src/utils/color';
import { getToolIcon } from 'Src/utils/icons';
import ExpandedTopic from './ExpandedTopic';
import ExpandedCard from './ExpandedCard';

const nestTypes = [
  { type: 'Tip', Component: ExpandedCard },
  { type: 'Topic', Component: ExpandedTopic }
];

const ListItem = ({
  item,
  id,
  type,
  baseType,
  handleClickTitle,
  card_font_color
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const slug = item?.itemType === 'file' ? item.tip.slug : item.slug;
  const icon = getToolIcon(type);
  const color = getIconColor(type);
  const canShowDropdown = type != 'CHAT' && type != 'VIDEO_CHAT';

  const renderExpandedItem = () => {
    const nestedType = nestTypes.find(val => val.type == baseType);

    return <nestedType.Component id={id} handleClickTitle={handleClickTitle} />;
  };

  return (
    <div className="item">
      <div className="item_parent" style={{ borderColor: card_font_color }}>
        <div
          className={`expand_button ${!canShowDropdown && 'is_empty'}`}
          style={{ color: card_font_color }}
        >
          {canShowDropdown && (
            <IconButton
              icon={`arrow_${isExpanded ? 'drop_down' : 'right'}`}
              outlined
              onClick={() => setIsExpanded(!isExpanded)}
            />
          )}
        </div>
        <div className="item_info">
          <div className="icon" style={{ color }}>
            <i className="material-icons-outlined">{icon}</i>
          </div>
          <div
            className="title"
            onClick={() => handleClickTitle({ type, slug, id })}
          >
            {item.title}
          </div>
        </div>
      </div>
      {isExpanded && renderExpandedItem()}
    </div>
  );
};

export default ListItem;
