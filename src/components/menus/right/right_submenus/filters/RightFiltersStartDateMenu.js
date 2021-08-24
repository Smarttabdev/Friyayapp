import React from 'react';
import { connect } from 'react-redux';
import FilterDateElement from 'Components/menus/right/right_submenus/elements/FilterDateElement';
import SubMenuHeader from 'Components/menus/right/right_submenus/elements/SubMenuHeader';
import { stateMappings } from 'Src/newRedux/stateMappings';
import {
  getFilterSettings,
  setUserFilterSettings
} from 'Src/helpers/user_config';

const RightFiltersStartDateMenu = ({
  start_end_date,
  start_start_date,
  setUserFilterSettings,
  isDocked,
  onClickBack
}) => {
  const setStartDateFilter = date => {
    const payload = {
      start_start_date: date.startDate,
      start_end_date: date.endDate
    };
    setUserFilterSettings(payload);
  };
  return (
    <div className="right-submenu">
      <SubMenuHeader
        rootMenu="Filters"
        title="Start Date Filter"
        isDocked={isDocked}
        onClickBack={onClickBack}
      />
      <div className="right-submenu_content">
        <FilterDateElement
          filter={{
            startDate: start_start_date,
            endDate: start_end_date
          }}
          onSetFilter={setStartDateFilter}
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
    start_start_date: filter_setting.start_start_date,
    start_end_date: filter_setting.start_end_date
  };
};

const mapDispatch = {
  setUserFilterSettings
};

export default connect(mapState, mapDispatch)(RightFiltersStartDateMenu);
