import React, { useState } from 'react';
import { cardTypes, boardTypes } from 'src/components/shared/CardAndBoardTypes';
import IconButton from 'Components/shared/buttons/IconButton';
import Dropdown from 'Components/shared/Dropdown';
import PropTypes from 'prop-types';

export default function BoardAndCardTypeListDropdown({
  listType = 'card',
  itemType = null,
  setItemType,
  containerClasses,
  containerStyle,
  itemListStyle,
  itemListClasses,
  smallModal,
  typeIconSize,
  hideItemTypeDropdown,
  triggerIcon,
  color,
  hideItemTypeIcon,
  dropdownIconClasses,
  dropDownMenuClassName,
  leftMenu
}) {
  const [showItemTypes, setShowItemTypes] = useState(false);
  const itemTypes = listType === 'card' ? cardTypes : boardTypes;
  const tempItemType = itemType === 'SYSTEM' ? 'CARD' : itemType;
  const getItemTypeIndex =
    itemTypes.findIndex(item => item.type === tempItemType) || 0;

  return (
    <span
      className={`board-and-card-type-list-dropdown-container ${containerClasses} ${smallModal &&
        'smallModal'}`}
      style={containerStyle}
    >
      {!hideItemTypeIcon && (
        <IconButton
          additionalClasses="mt4 type-icon"
          outlined={itemTypes[getItemTypeIndex]?.outlined}
          icon={itemTypes[getItemTypeIndex].iconType}
          color={color || itemTypes[getItemTypeIndex].color}
          tooltip={itemTypes[getItemTypeIndex].label}
          tooltipOptions={{ place: 'bottom' }}
          fontAwesome={itemTypes[getItemTypeIndex].fontAwesome}
          fontSize={typeIconSize}
        />
      )}
      {!hideItemTypeDropdown && (
        <Dropdown
          style={triggerIcon && { width: 0 }}
          triggerAdditionalClasses={triggerIcon && 'trigger-icon'}
          menuClassName={dropDownMenuClassName}
          trigger={
            <IconButton
              containerClasses={dropdownIconClasses}
              additionalClasses="dark-grey-icon-button mt4"
              fontSize={12}
              fontAwesome
              icon={!showItemTypes ? 'caret-down' : 'caret-up'}
              onClick={() => setShowItemTypes(!showItemTypes)}
            />
          }
        >
          {itemTypes.map((itemAttributes, index) => (
            <div
              key={index}
              className={`sheet-view__cell--title-type-dropdown item-list ${itemListClasses}`}
              style={itemListStyle}
              onClick={() => {
                setItemType(itemAttributes.type), setShowItemTypes(false);
              }}
            >
              <IconButton
                additionalClasses="font-size-16 mr5"
                icon={itemAttributes.iconType}
                outlined={itemAttributes?.outlined}
                color={itemAttributes.color}
                tooltip={itemAttributes.label}
                tooltipOptions={{ place: 'top' }}
              />
              <span>{itemAttributes.label}</span>
            </div>
          ))}
        </Dropdown>
      )}
    </span>
  );
}

BoardAndCardTypeListDropdown.propTypes = {
  listType: PropTypes.oneOf(['card', 'board']).isRequired,
  setItemType: PropTypes.func.isRequired,
  itemType: PropTypes.string,
  containerClasses: PropTypes.string,
  containerStyle: PropTypes.object,
  smallModal: PropTypes.bool,
  itemListStyle: PropTypes.object,
  itemListClasses: PropTypes.string,
  typeIconSize: PropTypes.number,
  hideItemTypeDropdown: PropTypes.bool
};
