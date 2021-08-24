import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { setRightMenuOpenForMenu } from 'Src/newRedux/interface/menus/actions';
import IconButton from 'Components/shared/buttons/IconButton';
import Icon from 'Components/shared/Icon';
import RightFiltersAssignedMenu from './filters/RightFiltersAssignedMenu';
import RightFiltersCompletedDateMenu from './filters/RightFiltersCompletedDateMenu';
import RightFiltersCreatedDateMenu from './filters/RightFiltersCreatedDateMenu';
import RightFiltersCreatorMenu from './filters/RightFiltersCreatorMenu';
import RightFiltersDueDateMenu from './filters/RightFiltersDueDateMenu';
import RightFiltersStartDateMenu from './filters/RightFiltersStartDateMenu';
import RightFiltersStatusMenu from './filters/RightFiltersStatusMenu';
import RightFiltersBoardMenu from './filters/RightFiltersBoardMenu';
import RightFiltersItemsMenu from './filters/RightFiltersItemsMenu';
import RightFiltersLabelMenu from './filters/RightFiltersLabelMenu';
import RightFiltersPriorityMenu from './filters/RightFiltersPriorityMenu';
import {
  getFilterSettings,
  setUserFilterSettings
} from 'Src/helpers/user_config';
import { getRelevantViewForPage } from 'Src/newRedux/interface/lenses/selectors';
import {
  setShowFilterPanel,
  setRightFiltersMenuOpen,
  setRightFiltersDefaultSubmenuState
} from 'src/newRedux/filters/actions';
import ToggleSwitch from 'Components/shared/ToggleSwitch';
import Tooltip from 'Components/shared/Tooltip';

const localStorageTagForOpenFilters = 'showRightFilterMenu';

const filters = [
  { title: 'Card and Board types', SubmenuComponent: RightFiltersItemsMenu },
  { title: 'Board', SubmenuComponent: RightFiltersBoardMenu },
  { title: 'Status', SubmenuComponent: RightFiltersStatusMenu },
  { title: 'Labels', SubmenuComponent: RightFiltersLabelMenu },
  { title: 'Created By', SubmenuComponent: RightFiltersCreatorMenu },
  { title: 'Assigned To', SubmenuComponent: RightFiltersAssignedMenu },
  { title: 'Created Date', SubmenuComponent: RightFiltersCreatedDateMenu },
  { title: 'Start Date', SubmenuComponent: RightFiltersStartDateMenu },
  { title: 'Due Date', SubmenuComponent: RightFiltersDueDateMenu },
  { title: 'Completed Date', SubmenuComponent: RightFiltersCompletedDateMenu },
  { title: 'Priority Level', SubmenuComponent: RightFiltersPriorityMenu }
];

const RightFiltersMenu = (
  {
    displaySubmenu,
    include_now_cards,
    include_archived_cards,
    include_subtopic_cards,
    include_nested_cards,
    include_completed_cards,
    include_uncompleted_cards,
    setRightMenuOpenForMenu,
    topicId,
    setUserFilterSettings,
    isSituationLens,
    pick_your_boards,
    include_live_views,
    include_new_views,
    include_recently_updated_views,
    setShowFilterPanel,
    isDocked,
    keepFiltersOpen,
    setRightFiltersMenuOpen,
    setRightFiltersDefaultSubmenuState,
    include_cards_with_location,
    include_cards_without_location,
    defaultSubmenu
  } // eslint-disable-line
) => {
  const situationLensFilters = [
    {
      title: 'Pick your Boards',
      includeOptionTitle: 'pick_your_boards',
      includeOption: pick_your_boards
    },
    {
      title: 'Include Live Boards',
      includeOptionTitle: 'include_live_views',
      includeOption: include_live_views
    },
    {
      title: 'Include New Boards',
      includeOptionTitle: 'include_new_views',
      includeOption: include_new_views
    },
    {
      title: 'Include Recently updated Boards',
      includeOptionTitle: 'include_recently_updated_views',
      includeOption: include_recently_updated_views
    }
  ];

  const checkFilters = [
    {
      title: 'Now?',
      includeOptionTitle: 'include_now_cards',
      includeOption: include_now_cards
    },
    {
      title: 'Include Archived Cards?',
      includeOptionTitle: 'include_archived_cards',
      includeOption: include_archived_cards
    },
    {
      title: 'Include Cards from Boards?',
      includeOptionTitle: 'include_subtopic_cards',
      includeOption: include_subtopic_cards
    },
    {
      title: 'Include Nested Cards?',
      includeOptionTitle: 'include_nested_cards',
      includeOption: include_nested_cards
    },
    {
      title: 'Include completed Cards?',
      includeOptionTitle: 'include_completed_cards',
      includeOption: include_completed_cards
    },
    {
      title: 'Include uncompleted Cards?',
      includeOptionTitle: 'include_uncompleted_cards',
      includeOption: include_uncompleted_cards
    },
    {
      title: 'Include Cards with location?',
      includeOptionTitle: 'include_cards_with_location',
      includeOption: include_cards_with_location
    },
    {
      title: 'Include Cards without location?',
      includeOptionTitle: 'include_cards_without_location',
      includeOption: include_cards_without_location
    }
  ];

  const [displaySubmenu_state, set_displaySubmenu_state] = useState(null);

  useEffect(() => {
    set_displaySubmenu_state(defaultSubmenu);
  }, []);

  const handleSelectOption = filter => {
    if (isDocked) {
      set_displaySubmenu_state(filter);
      return;
    }
    setRightMenuOpenForMenu(`${displaySubmenu}_${filter}`);
    setShowFilterPanel(true);
  };

  const toggleFiltersMenu = () => {
    setRightFiltersMenuOpen(!keepFiltersOpen);
    if (!keepFiltersOpen) {
      setRightMenuOpenForMenu(false);
    }
    window.localStorage.setItem(
      localStorageTagForOpenFilters,
      !keepFiltersOpen
    );
  };

  const forId = Math.ceil(Math.random() * 100000, 6);

  return (
    <div className="right-submenu">
      <div
        className={`right-submenu_header ${isDocked && 'isDocked'} isFilters`}
      >
        <div
          className={`right-submenu_header ${isDocked && 'isDocked'}`}
          style={{ margin: 0, padding: 0 }}
        >
          {!isDocked && (
            <IconButton
              fontAwesome
              icon="caret-left"
              onClick={() => setRightMenuOpenForMenu(true)}
            />
          )}
          <span className="ml5">Filters</span>
        </div>
        {!isDocked && (
          <span data-tip="keep open" data-for={forId}>
            <ToggleSwitch onClick={toggleFiltersMenu} on={keepFiltersOpen} />
            <Tooltip {...{ place: 'bottom' }} id={forId} />
          </span>
        )}
      </div>
      {filters.map((filter, i) => (
        <a
          className="right-submenu_item option"
          key={i}
          onClick={() => {
            handleSelectOption(filter.title);
          }}
        >
          <span>{filter.title}</span>
        </a>
      ))}
      <Fragment>
        {situationLensFilters.map((filter, i) => (
          <a
            className="right-submenu_item option"
            onClick={() => {
              let payload = {};
              payload[filter.includeOptionTitle] = !filter.includeOption;
              setUserFilterSettings(payload);
            }}
            key={i}
          >
            <span>{filter.title}</span>
            <Icon
              fontAwesome
              icon={filter.includeOption ? 'check-square' : 'square'}
            />
          </a>
        ))}
      </Fragment>

      {checkFilters.map((filter, i) => (
        <a
          key={i}
          className="right-submenu_item option"
          onClick={() => {
            let payload = {};
            payload[filter.includeOptionTitle] = !filter.includeOption;
            setUserFilterSettings(payload);
          }}
        >
          <span>{filter.title}</span>
          <Icon
            fontAwesome
            icon={filter.includeOption ? 'check-square' : 'square'}
          />
        </a>
      ))}

      <div
        className={`${
          (typeof displaySubmenu == 'string' &&
            displaySubmenu.includes('Filters_')) ||
          displaySubmenu_state
            ? `right-submenu_option-container presented ${isDocked &&
                'isDocked'}`
            : 'right-submenu_option-container'
        }`}
      >
        {filters.map((filter, i) => {
          return (
            (displaySubmenu == `Filters_${filter.title}` ||
              displaySubmenu_state == filter.title) && (
              <filter.SubmenuComponent
                isDocked={isDocked}
                onClickBack={() => (
                  set_displaySubmenu_state(null),
                  setRightFiltersDefaultSubmenuState(null)
                )}
              />
            )
          );
        })}
      </div>
    </div>
  );
};

RightFiltersMenu.propTypes = {
  include_now_cards: PropTypes.bool,
  include_archived_cards: PropTypes.bool,
  include_subtopic_cards: PropTypes.bool,
  include_nested_cards: PropTypes.bool,
  include_completed_cards: PropTypes.bool,
  include_uncompleted_cards: PropTypes.bool,
  displaySubmenu: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  setRightMenuOpenForMenu: PropTypes.func
};

const mapState = state => {
  const {
    menus,
    page: { topicId },
    filters: { keepOpen, defaultSubmenu }
  } = stateMappings(state);
  const filter_setting = getFilterSettings(state);
  const viewKey = getRelevantViewForPage(state);
  const isSituationLens = viewKey == 'SITUATION_ROOM';
  return {
    topicId,
    displaySubmenu: menus.displayRightSubMenuForMenu,
    include_now_cards: filter_setting.include_now_cards,
    include_archived_cards: filter_setting.include_archived_cards,
    include_subtopic_cards: filter_setting.include_subtopic_cards,
    include_nested_cards: filter_setting.include_nested_cards,
    include_completed_cards: filter_setting.include_completed_cards,
    include_uncompleted_cards: filter_setting.include_uncompleted_cards,
    include_cards_with_location: filter_setting.include_cards_with_location,
    include_cards_without_location:
      filter_setting.include_cards_without_location,
    isSituationLens,
    pick_your_boards: filter_setting.pick_your_boards,
    include_live_views: filter_setting.include_live_views,
    include_new_views: filter_setting.include_new_views,
    include_recently_updated_views:
      filter_setting.include_recently_updated_views,
    include_recently_visited_views:
      filter_setting.include_recently_visited_views,
    keepFiltersOpen: keepOpen,
    defaultSubmenu
  };
};

const mapDispatch = {
  setRightMenuOpenForMenu,
  setUserFilterSettings,
  setShowFilterPanel,
  setRightFiltersMenuOpen,
  setRightFiltersDefaultSubmenuState
};

export default connect(mapState, mapDispatch)(RightFiltersMenu);
