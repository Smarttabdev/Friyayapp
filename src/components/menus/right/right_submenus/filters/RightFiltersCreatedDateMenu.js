import React from 'react';
import { connect } from 'react-redux';
import FilterDateElement from 'Components/menus/right/right_submenus/elements/FilterDateElement';
import SubMenuHeader from 'Components/menus/right/right_submenus/elements/SubMenuHeader';
import { stateMappings } from 'Src/newRedux/stateMappings';
import {
  getFilterSettings,
  setUserFilterSettings
} from 'Src/helpers/user_config';

const RightFiltersCreatedDateMenu = ({
  created_end_date,
  created_start_date,
  setUserFilterSettings,
  isDocked,
  onClickBack
}) => {
  const setCreatedDateFilter = date => {
    const payload = {
      created_start_date: date.startDate,
      created_end_date: date.endDate
    };
    setUserFilterSettings(payload);
  };
  return (
    <div className="right-submenu">
      <SubMenuHeader
        rootMenu="Filters"
        title="Created Date Filter"
        isDocked={isDocked}
        onClickBack={onClickBack}
      />
      <div className="right-submenu_content">
        <FilterDateElement
          filter={{
            startDate: created_start_date,
            endDate: created_end_date
          }}
          onSetFilter={setCreatedDateFilter}
        />
      </div>
    </div>
  );
};

const mapState = state => {
  const {
    page: { topicId }
  } = stateMappings(state);
  const filter_setting = getFilterSettings(state);
  return {
    topicId,
    created_start_date: filter_setting.created_start_date,
    created_end_date: filter_setting.created_end_date
  };
};

const mapDispatch = {
  setUserFilterSettings
};

export default connect(mapState, mapDispatch)(RightFiltersCreatedDateMenu);
