import React from 'react';
import { connect } from 'react-redux';
import className from 'classnames';
import { stateMappings } from 'Src/newRedux/stateMappings';
import Icon from 'Components/shared/Icon';
import SubMenuHeader from 'Components/menus/right/right_submenus/elements/SubMenuHeader';
import {
  getFilterSettings,
  setUserFilterSettings
} from 'Src/helpers/user_config';
import { itemFilters } from 'Lib/config/filters/items';

const filters = Object.values(itemFilters);

const RightFiltersItemsMenu = ({
  cardTypeFilter,
  boardTypeFilter,
  setUserFilterSettings,
  isDocked,
  onClickBack
}) => {
  const toggle = (arr, val) => {
    return arr.includes(val) ? arr.filter(x => x != val) : arr.concat(val);
  };

  const toggleFilter = filter => e => {
    if (filter.type == 'card_type') {
      const payload = { card_type: toggle(cardTypeFilter, filter.key) };
      setUserFilterSettings(payload);
    } else if (filter.type == 'board_type') {
      const payload = { board_type: toggle(boardTypeFilter, filter.key) };
      setUserFilterSettings(payload);
    }
  };

  const isActive = filter =>
    filter.type == 'card_type'
      ? cardTypeFilter.includes(filter.key)
      : filter.type == 'board_type'
      ? boardTypeFilter.includes(filter.key)
      : false;

  return (
    <div className="right-submenu">
      <SubMenuHeader
        rootMenu="Filters"
        title="Card and Board types"
        isDocked={isDocked}
        onClickBack={onClickBack}
      />
      <div className="right-submenu_content">
        {filters.map(filter => (
          <a
            className={className('right-submenu_item', 'selector', {
              active: isActive(filter)
            })}
            key={filter.key}
            onClick={toggleFilter(filter)}
          >
            <span className="ml5">{filter.name}</span>
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
      </div>
    </div>
  );
};

const mapState = (state, props) => {
  const {
    page: { topicId }
  } = stateMappings(state);
  const filter_setting = getFilterSettings(state);
  return {
    cardTypeFilter: filter_setting.card_type || [],
    boardTypeFilter: filter_setting.board_type || [],
    topicId
  };
};

const mapDispatch = {
  setUserFilterSettings
};

export default connect(mapState, mapDispatch)(RightFiltersItemsMenu);
