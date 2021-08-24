import React, { useState } from 'react';
import IconButton from 'Components/shared/buttons/IconButton';
import ExpandedBoardItem from './ExpandedBoardItem';
import { handleType } from '../../utils';

const DesktopItem = ({
  color,
  icon,
  title,
  isPreview,
  handleClickTitle,
  type,
  baseType,
  id,
  slug,
  isNested
}) => {
  const [boardIsOpen, setBoardIsOpen] = useState(false);

  return (
    <div className={` ${isPreview && 'desktop-preview-item'}`}>
      {boardIsOpen ? (
        <ExpandedBoardItem
          color={color}
          icon={icon}
          title={title}
          id={id}
          slug={slug}
          handleClickTitle={handleClickTitle}
        />
      ) : (
        <>
          <div className="icon" style={{ color }}>
            <i className="material-icons-outlined">{icon}</i>
          </div>
          <div
            className="title"
            onClick={() =>
              handleClickTitle({ type: handleType(type), slug, id })
            }
          >
            {title}
          </div>
        </>
      )}
      {baseType == 'Topic' && !isNested && (
        <div className="expand_button">
          <IconButton
            icon={boardIsOpen ? 'unfold_less' : 'unfold_more'}
            onClick={() => setBoardIsOpen(!boardIsOpen)}
          />
        </div>
      )}
    </div>
  );
};

export default DesktopItem;
