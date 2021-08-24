import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import className from 'classnames';
import keyBy from 'lodash/keyBy';
import { stateMappings } from 'Src/newRedux/stateMappings';
import IconButton from 'Components/shared/buttons/IconButton';
import groupByOptions from 'Lib/config/filters/groupBy';
import { setUserGroupSettings } from 'Src/newRedux/database/topics/thunks';
import {
  getUiSettings,
  setUserFilterSettings,
  getFilterSettings
} from 'Src/helpers/user_config';
import { setRightMenuOpenForMenu } from 'Src/newRedux/interface/menus/actions';
import { setGroupBySubBoards } from 'Src/newRedux/groupBy/actions';

const RightGroupByMenu = ({
  topicId,
  groupByActiveOptions,
  setRightMenuOpenForMenu,
  setUserGroupSettings,
  currentView,
  toolsToShowSubBoards,
  setGroupBySubBoards,
  setUserFilterSettings,
  filterSettings,
  isHome
}) => {
  const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    const activeOptions = keyBy(groupByActiveOptions, 'value');
    setSelectedOptions(activeOptions);
  }, [groupByActiveOptions]);

  const handleSelectOption = option => {
    let updatedSelectedOptions = selectedOptions;
    if (updatedSelectedOptions.hasOwnProperty(option.value)) {
      delete updatedSelectedOptions[option.value];
    } else {
      updatedSelectedOptions = { ...selectedOptions, [option.value]: option };
    }
    setSelectedOptions(updatedSelectedOptions);
    setUserGroupSettings(topicId, Object.values(updatedSelectedOptions));
  };

  const isActive = option => {
    return selectedOptions.hasOwnProperty(option.value);
  };

  const toggleSubBoards = () => {
    let newStatusArray = [];
    if (toolsToShowSubBoards.includes(currentView)) {
      newStatusArray = toolsToShowSubBoards.filter(
        item => item !== currentView
      );
    } else {
      newStatusArray = [...toolsToShowSubBoards, currentView];
    }
    const group_by = {
      ...filterSettings.group_by,
      subBoards: newStatusArray
    };
    const addSubtopicsCards = !newStatusArray.includes(currentView);
    setUserFilterSettings({
      group_by,
      include_subtopic_cards: addSubtopicsCards
    });
  };

  return (
    <div className="right-submenu">
      <div className="right-submenu_header">
        <IconButton
          fontAwesome
          icon="caret-left"
          onClick={() => setRightMenuOpenForMenu(true)}
        />
        <span className="ml5">Group By</span>
      </div>
      <div className="right-submenu_content">
        {!isHome &&
          ['SHEET', 'ACTION_PLAN'].includes(currentView) &&
          groupByOptions.map(filter => (
            <a
              className={className('right-submenu_item', 'selector', {
                active: isActive(filter)
              })}
              key={filter.value}
              onClick={() => handleSelectOption(filter)}
            >
              <span className="ml5">{filter.label}</span>
              <i
                className={className(
                  'fa active-filter-chip__toggle-filter-btn',
                  isActive(filter)
                    ? 'fa-toggle-on green'
                    : 'fa-toggle-off grey-button-color'
                )}
                style={{ marginLeft: 'auto' }}
              />
            </a>
          ))}
        <a
          className={className('right-submenu_item', 'selector', {
            active: toolsToShowSubBoards.includes(currentView)
          })}
          key={'sub-boards'}
          onClick={() => toggleSubBoards()}
        >
          <span className="ml5">Sub Boards</span>
          <i
            className={className(
              'fa active-filter-chip__toggle-filter-btn',
              toolsToShowSubBoards.includes(currentView)
                ? 'fa-toggle-on green'
                : 'fa-toggle-off grey-button-color'
            )}
            style={{ marginLeft: 'auto' }}
          />
        </a>
      </div>
    </div>
  );
};

const mapState = state => {
  const sm = stateMappings(state);
  const { page, topics } = sm;
  const topicId = page.topicId || '0';
  const topic = topics[topicId];
  const groupByActiveOptions = get(
    topic,
    'attributes.user_configuration.data.attributes.group_settings'
  );
  const ui_settings = getUiSettings(state);
  const currentView = ui_settings.current_active_template;
  const filterSettings = getFilterSettings(state);
  const toolsToShowSubBoards = filterSettings?.group_by?.subBoards || [];
  return {
    filterSettings,
    groupByActiveOptions,
    topicId,
    currentView,
    toolsToShowSubBoards,
    isHome: page.isHome
  };
};

const mapDispatch = {
  setUserGroupSettings,
  setRightMenuOpenForMenu,
  setGroupBySubBoards,
  setUserFilterSettings
};

export default connect(mapState, mapDispatch)(RightGroupByMenu);
