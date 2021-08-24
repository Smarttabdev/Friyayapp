import React, { useRef, useState, useEffect } from 'react';
import IconButton from 'Components/shared/buttons/IconButton';
import Icon from 'Components/shared/Icon';
import classNames from 'classnames';
import cardLenses from 'Lib/config/lenses/cards';
import BoardAndCardTypeListDropdown from 'Components/shared/BoardAndCardTypeListDropdown';
import { getBoardType } from 'Lib/utilities';
import { updateTopic } from 'Src/newRedux/database/topics/thunks';
import { connect } from 'react-redux';
import { getCardTypeIconAttribute } from 'Src/utils/icons';

const IconDropdownMenu = ({
  truncate = true,
  title,
  itemList = [],
  color,
  cardFontColor,
  icon,
  toggleList,
  count,
  additionalClasses,
  containerClasses,
  badgeTopMargin,
  animate = false,
  activeFilterShowed,
  currentTool,
  setRightFiltersDefaultSubmenuState,
  setRightFiltersMenuOpen,
  isRightFilterOpened,
  setRightFiltersMenuOpenExpanded,
  boardList,
  updateTopic,
  outlined,
  dropdownStyle = {},
  topicHeader
}) => {
  const myRef = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [myRef]);

  const handleClickOutside = e => {
    if (myRef.current && !myRef.current.contains(e.target)) {
      setVisible(false);
    }
  };

  const toggleDropdownVisibility = () => {
    setVisible(v => !v);
  };

  const handleUpdateBoardType = async (boardId, boardType) => {
    const attributes = {
      tag_list: [boardType]
    };

    await updateTopic({ id: boardId, attributes });
  };

  const renderList = () => {
    const textClass = classNames(
      'list-text',
      truncate && 'list-text--truncate'
    );
    return itemList.map(item => (
      <div
        className="list-item header-list-item"
        key={item.id}
        onClick={() => {
          !boardList && !item.clickHandler() && toggleDropdownVisibility();
        }}
      >
        {!item.noIcon &&
          (boardList ? (
            <BoardAndCardTypeListDropdown
              itemType={getBoardType(item)}
              listType="board"
              setItemType={boardTypeKey =>
                handleUpdateBoardType(item.id, boardTypeKey)
              }
              containerStyle={{ marginTop: '-3px' }}
              smallModal
            />
          ) : (
            <Icon
              color={
                getCardTypeIconAttribute(item?.cardType).defaultColor || color
              }
              icon={getCardTypeIconAttribute(item?.cardType).icon || icon}
              outlined={outlined}
            />
          ))}
        <div
          className={textClass}
          onClick={() => {
            boardList && !item.clickHandler() && toggleDropdownVisibility();
          }}
        >
          {item.title}
        </div>
      </div>
    ));
  };

  const renderToogle = () => {
    return toggleList.map((item, index) => {
      const { title, toggleState, toggleHandler } = item;
      const toggleClass = classNames('fa', 'icon', {
        'fa-toggle-on': toggleState,
        'fa-toggle-off': !toggleState,
        green: toggleState
      });
      return (
        <div className="horizontal" key={index}>
          <span className="text" onClick={toggleHandler}>
            {title}
          </span>
          <a onClick={toggleHandler}>
            <i className={toggleClass} />
          </a>
        </div>
      );
    });
  };

  if (itemList.length == 0) return null;
  const iconColor = topicHeader ? color : cardFontColor || color;
  const dropdownClass = classNames('add-card-or-subtopic', 'dropdown', {
    open: visible,
    countAnimation: animate
  });
  const underlined = toggleList.some(item => item.toggleState);

  return (
    <div
      style={{ maxHeight: topicHeader ? '600px' : '' }}
      ref={myRef}
      className={`${dropdownClass} ${containerClasses}`}
    >
      <div className="dropdown-toggle">
        <div className="icon-wrapper">
          {/* <span
            className="icon-badge"
            style={{
              color: iconColor,
              ...{ marginTop: badgeTopMargin || '-10px' }
            }}
          >
            {count !== undefined ? count : itemList.length}
          </span>*/}
          <IconButton
            // containerClasses={{ underlined }}
            style={{ color: iconColor }}
            icon={icon}
            outlined={outlined}
            onClick={toggleDropdownVisibility}
            tooltip={title}
            tooltipOptions={{ place: 'bottom' }}
            additionalClasses={additionalClasses}
          />
        </div>
      </div>
      {visible && (
        <div
          className="dropdown-menu"
          id="domain-dropdown"
          style={{ overflow: 'auto', ...dropdownStyle }}
        >
          <div className="title">{title}</div>
          {renderToogle()}
          <br />
          <br />
          {activeFilterShowed && (
            <span
              style={{
                color: 'rgb(179, 179, 179)',
                fontStyle: 'italic'
              }}
              className="flex-r-center mb5"
            >
              <Icon
                icon="error_outline"
                outlined
                color="rgb(179, 179, 179)"
                style={{ marginRight: 5 }}
              />
              {cardLenses[currentTool].name} filter is on,&nbsp;
              <button
                className="open-filter-tab-button"
                onClick={() => (
                  setRightFiltersDefaultSubmenuState(
                    !isRightFilterOpened ? 'Card and Board types' : null
                  ),
                  setRightFiltersMenuOpenExpanded(true),
                  setRightFiltersMenuOpen(!isRightFilterOpened)
                )}
              >
                Go to filter
              </button>
            </span>
          )}
          {renderList()}
        </div>
      )}
    </div>
  );
};

const mapDispatch = {
  updateTopic
};

export default connect(null, mapDispatch)(IconDropdownMenu);
