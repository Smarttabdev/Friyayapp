import React from 'react';
import { connect } from 'react-redux';
import className from 'classnames';
import { cardFilters } from 'Lib/config/filters/cards';
import { stateMappings } from 'Src/newRedux/stateMappings';
import Icon from 'Components/shared/Icon';
import SubMenuHeader from 'Components/menus/right/right_submenus/elements/SubMenuHeader';
import {
  getFilterSettings,
  setUserFilterSettings
} from 'Src/helpers/user_config';

const filters = Object.values(cardFilters);

const RightFiltersStatusMenu = ({
  card,
  setUserFilterSettings,
  isDocked,
  onClickBack
}) => {
  const setCardFilters = key => e => {
    const payload = { card: key };
    setUserFilterSettings(payload);
  };

  return (
    <div className="right-submenu">
      <SubMenuHeader
        rootMenu="Filters"
        title="Card Status Filters"
        isDocked={isDocked}
        onClickBack={onClickBack}
      />
      <div className="right-submenu_content">
        {filters.map(filter => (
          <a
            className={className('right-submenu_item', 'selector', {
              active: card == filter.key,
              bold: card == filter.key
            })}
            key={filter.key}
            onClick={setCardFilters(filter.key)}
          >
            <Icon
              fontAwesome={filter.iconType == 'fontAwesome'}
              icon={filter.icon}
            />
            <span className="ml5">{filter.name}</span>
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
    card: filter_setting.card,
    topicId
  };
};

const mapDispatch = {
  setUserFilterSettings
};

export default connect(mapState, mapDispatch)(RightFiltersStatusMenu);
