import React from 'react';
import { connect } from 'react-redux';
import FilterDateElement from 'Components/menus/right/right_submenus/elements/FilterDateElement';
import SubMenuHeader from 'Components/menus/right/right_submenus/elements/SubMenuHeader';
import { stateMappings } from 'Src/newRedux/stateMappings';
import {
  getFilterSettings,
  setUserFilterSettings
} from 'Src/helpers/user_config';

const RightFiltersCompletedDateMenu = ({
  completed_start_date,
  completed_end_date,
  setUserFilterSettings,
  isDocked,
  onClickBack
}) => {
  const setCompletedDateFilter = date => {
    const payload = {
      completed_start_date: date.startDate,
      completed_end_date: date.endDate
    };
    setUserFilterSettings(payload);
  };
  return (
    <div className="right-submenu">
      <SubMenuHeader
        rootMenu="Filters"
        title="Completed Date Filter"
        isDocked={isDocked}
        onClickBack={onClickBack}
      />
      <div className="right-submenu_content">
        <FilterDateElement
          filter={{
            startDate: completed_start_date,
            endDate: completed_end_date
          }}
          onSetFilter={setCompletedDateFilter}
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
    completed_start_date: filter_setting.completed_start_date,
    completed_end_date: filter_setting.completed_end_date
  };
};

const mapDispatch = {
  setUserFilterSettings
};

export default connect(mapState, mapDispatch)(RightFiltersCompletedDateMenu);
