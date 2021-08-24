import React, { useState, Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import Icon from 'src/components/shared/Icon';
import Switch from 'src/components/shared/ToggleSwitch';
import Tooltip from 'Components/shared/Tooltip';
import { setUserLensPinSettings } from 'Src/newRedux/database/topics/thunks';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { getUiSettings } from 'Src/helpers/user_config';
import { groupBy } from 'lodash';
import DriveIcon from 'src/components/svg_icons/driveIcon';
import { hiddenTools } from 'src/components/shared/lensesUtils';
import {
  boardTypes,
  landingBoard
} from 'src/components/shared/CardAndBoardTypes';
import cardViews from 'Src/lib/config/lenses/cards';

const forId = Math.ceil(Math.random() * 100000, 6);
const forDesId = Math.ceil(Math.random() * 100000, 6);

const AllToolsList = ({
  handleSelectView,
  pinnedLenses,
  setUserLensPinSettings,
  boards,
  customLenses
}) => {
  const [filteredBoards, setFilteredBoards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const viewSegments = groupBy(filteredBoards, 'category');

  // remove custom lenses without filter_setting
  const filteredCustomLenses = customLenses
    ? Object.values(customLenses).filter(
        lens => lens?.relationships?.filter_setting?.data
      )
    : [];

  let pinnedCustomLenses = pinnedLenses.filter(tool =>
    Object.keys(customLenses).find(c => Number(c) == Number(tool))
  );
  pinnedCustomLenses = pinnedCustomLenses.map(l => customLenses[l]);

  useEffect(() => {
    setFilteredBoards(boards);
  }, [boards]);
  const handlePinLensClick = key => {
    const payload = {
      ui_settings: {
        pinned_lenses: pinnedLenses.includes(key)
          ? pinnedLenses.filter(x => x !== key)
          : [...pinnedLenses, key]
      },
      action: pinnedLenses.includes(key) ? 'remove' : 'add',
      view: key
    };
    setUserLensPinSettings(payload);
  };

  const handleSearch = query => {
    setSearchQuery(query);
    if (!boards) return;
    const customBoards = [];
    const formattedQuery = query.toLowerCase();
    boards.forEach(x => {
      if (x.name.toLowerCase().includes(formattedQuery)) {
        return customBoards.push(x);
      }
    });
    setFilteredBoards(customBoards);
  };

  return (
    <Fragment>
      <div>
        <input
          type="search"
          className="board-selector-view__search"
          value={searchQuery}
          onChange={({ target }) => handleSearch(target.value)}
          autoFocus
          placeholder="Search a tool"
        />
      </div>

      <div className="board-selector_view-grid">
        {!searchQuery && filteredCustomLenses?.length > 0 && (
          <div className="board-selector_view-grid__list">
            <div className="board-selector_view-grid__category board-selector_view-grid__category--custom">
              CUSTOM TOOLS
            </div>
            {filteredCustomLenses.map(x => {
              const board = cardViews[x.attributes.current_active_template];
              if (!board) return null;
              const name = x.attributes.title;
              const {
                key,
                icon,
                teamIcon,
                subIcon,
                projectIcon,
                fontAwesomeIcon,
                outlineIcon
              } = board;

              return (
                <div className="board-selector_view-board" key={key}>
                  <span
                    data-tip={name.length > 14 ? name : null}
                    data-for={forDesId}
                    className="board-selector_view-board__left"
                  >
                    <Icon
                      icon={icon}
                      outlined={
                        outlineIcon || icon === 'category' ? true : false
                      }
                      teamIcon={teamIcon}
                      projectIcon={projectIcon}
                      fontAwesome={fontAwesomeIcon}
                      subIcon={subIcon}
                    />
                    <p className="board-selector_view-board__name">
                      {name.length > 14 ? `${name.substring(0, 14)}...` : name}
                    </p>
                    <Tooltip {...{ place: 'right' }} id={forDesId} />
                  </span>
                  <span className="board-selector_view-board__right">
                    <span
                      data-tip={
                        pinnedLenses.includes(key) ? 'Unpin Tool' : 'Pin Tool'
                      }
                      data-for={forId}
                      onClick={() => handlePinLensClick(key)}
                    >
                      <Switch on={pinnedLenses.includes(key) ? true : false} />
                      <Tooltip {...{ place: 'right' }} id={forId} />
                    </span>
                    <i
                      onClick={() => {
                        return handleSelectView(board);
                      }}
                      role="button"
                      className="fa fa-arrow-right ml20"
                    ></i>
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {!searchQuery && (
          <div className="board-selector_view-grid__list">
            <div className="board-selector_view-grid__category board-selector_view-grid__category--board-types">
              BOARD TYPES
            </div>
            {boardTypes
              .filter(x => x.label !== 'Board')
              .concat(landingBoard)
              .map(x => (
                <div className="board-selector_view-board" key={x.label}>
                  <span
                    data-tip={x.description}
                    data-for={forDesId}
                    className="board-selector_view-board__left"
                  >
                    <Icon
                      icon={x.iconType}
                      color={x.color}
                      outlined={x.outlined}
                      fontSize={x.fontSize}
                    />
                    <p className="board-selector_view-board__name">{x.label}</p>
                    <Tooltip {...{ place: 'right' }} id={forDesId} />
                  </span>
                  <span className="board-selector_view-board__right">
                    <span
                      data-tip={
                        pinnedLenses.includes(x.defaultTool)
                          ? 'Unpin Tool'
                          : 'Pin Tool'
                      }
                      data-for={forId}
                      onClick={() => {
                        handlePinLensClick(x.defaultTool);
                        const extractBoard =
                          filteredBoards?.length > 0 &&
                          filteredBoards.filter(
                            board =>
                              board.key === x.defaultTool &&
                              board.category !== 'favorite_tools'
                          );

                        //if board type is selected
                        !pinnedLenses.includes(x.defaultTool) &&
                          handleSelectView(...extractBoard, x.type);
                      }}
                    >
                      <Switch
                        on={pinnedLenses.includes(x.defaultTool) ? true : false}
                      />
                      <Tooltip {...{ place: 'right' }} id={forId} />
                    </span>
                    <i
                      onClick={() => {
                        const extractBoard =
                          filteredBoards?.length > 0 &&
                          filteredBoards.filter(
                            board =>
                              board.key === x.defaultTool &&
                              board.category !== 'favorite_tools'
                          );

                        return handleSelectView(...extractBoard, x.type);
                      }}
                      role="button"
                      className="fa fa-arrow-right ml20"
                    ></i>
                  </span>
                </div>
              ))}
          </div>
        )}

        {Object.keys(viewSegments)
          .filter(cat => cat !== 'board_views' && cat !== 'my_tools')
          .map(category => (
            <div className="board-selector_view-grid__list" key={category}>
              <div
                className={`board-selector_view-grid__category board-selector_view-grid__category--${category}`}
              >
                {category.replace(/_/g, ' ').toUpperCase()}
                {category !== 'board_lists' && ' TOOLS'}
              </div>
              {viewSegments[category]
                .filter(board => !hiddenTools.includes(board.key))
                .map(board => {
                  const {
                    key,
                    icon,
                    name,
                    teamIcon,
                    subIcon,
                    projectIcon,
                    fontAwesomeIcon,
                    outlineIcon
                  } = board;
                  return (
                    <div key={key} className="board-selector_view-board">
                      <span
                        data-tip={board.description}
                        data-for={forDesId}
                        className="board-selector_view-board__left"
                      >
                        {icon === 'drive' ? (
                          <DriveIcon className="ml6 icon" />
                        ) : (
                          <Icon
                            icon={icon}
                            outlined={
                              outlineIcon || icon === 'category' ? true : false
                            }
                            teamIcon={teamIcon}
                            projectIcon={projectIcon}
                            fontAwesome={fontAwesomeIcon}
                            subIcon={subIcon}
                          />
                        )}

                        <p className="board-selector_view-board__name">
                          {name}
                        </p>
                        <Tooltip {...{ place: 'right' }} id={forDesId} />
                      </span>
                      <span className="board-selector_view-board__right">
                        <span
                          data-tip={
                            pinnedLenses.includes(key)
                              ? 'Unpin Tool'
                              : 'Pin Tool'
                          }
                          data-for={forId}
                          onClick={() => handlePinLensClick(key)}
                        >
                          <Switch
                            on={pinnedLenses.includes(key) ? true : false}
                          />
                          <Tooltip {...{ place: 'right' }} id={forId} />
                        </span>
                        <i
                          onClick={() => handleSelectView(board)}
                          className="fa fa-arrow-right ml20"
                          role="button"
                        ></i>
                      </span>
                    </div>
                  );
                })}
            </div>
          ))}
      </div>
    </Fragment>
  );
};

const mapState = state => {
  const { lensList: customLenses } = stateMappings(state);
  const ui_settings = getUiSettings(state);

  return {
    pinnedLenses: ui_settings.pinned_lenses || [],
    customLenses
  };
};

const mapDispatch = {
  setUserLensPinSettings
};

export default connect(mapState, mapDispatch)(AllToolsList);
