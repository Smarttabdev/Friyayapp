import React from 'react';
import { connect } from 'react-redux';
import FilterDateElement from 'Components/menus/right/right_submenus/elements/FilterDateElement';
import SubMenuHeader from 'Components/menus/right/right_submenus/elements/SubMenuHeader';
import { stateMappings } from 'Src/newRedux/stateMappings';
import {
  getFilterSettings,
  setUserFilterSettings
} from 'Src/helpers/user_config';

const RightFiltersDueDateMenu = ({
  due_end_date,
  due_start_date,
  setUserFilterSettings,
  isDocked,
  onClickBack
}) => {
  const setDueDateFilter = date => {
    const payload = {
      due_start_date: date.startDate,
      due_end_date: date.endDate
    };
    setUserFilterSettings(payload);
  };
  return (
    <div className="right-submenu">
      <SubMenuHeader
        rootMenu="Filters"
        title="Due Date Filter"
        isDocked={isDocked}
        onClickBack={onClickBack}
      />
      <div className="right-submenu_content">
        <FilterDateElement
          filter={{
            startDate: due_start_date,
            endDate: due_end_date
          }}
          onSetFilter={setDueDateFilter}
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
    due_start_date: filter_setting.due_start_date,
    due_end_date: filter_setting.due_end_date
  };
};

const mapDispatch = {
  setUserFilterSettings
};

export default connect(mapState, mapDispatch)(RightFiltersDueDateMenu);
