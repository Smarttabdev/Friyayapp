import React from 'react';
import { connect } from 'react-redux';
import {
  getFilterSettings,
  setUserFilterSettings
} from 'Src/helpers/user_config';
import FilterDateElement from 'Components/menus/right/right_submenus/elements/FilterDateElement';

const DateOptions = ({
  type,
  created_end_date,
  created_start_date,
  completed_start_date,
  completed_end_date,
  start_end_date,
  start_start_date,
  due_end_date,
  due_start_date,
  setUserFilterSettings
}) => {
  const filters = [
    {
      type: 'created',
      data: { start: created_start_date, end: created_end_date }
    },
    {
      type: 'completed',
      data: { start: completed_start_date, end: completed_end_date }
    },
    { type: 'start', data: { start: start_start_date, end: start_end_date } },
    { type: 'due', data: { start: due_start_date, end: due_end_date } }
  ];

  const filter = filters.find(f => f.type == type);

  const setDateFilter = date => {
    let payload = {};
    payload[`${type}_start_date`] = date.startDate;
    payload[`${type}_end_date`] = date.startDate;
    setUserFilterSettings(payload);
  };

  return (
    <>
      <FilterDateElement
        filter={{
          startDate: filter.data.start,
          endDate: filter.data.end
        }}
        onSetFilter={setDateFilter}
      />
    </>
  );
};

const mapState = state => {
  const filter_setting = getFilterSettings(state);
  return {
    creator: filter_setting.creator,
    created_start_date: filter_setting.created_start_date,
    created_end_date: filter_setting.created_end_date,
    completed_start_date: filter_setting.completed_start_date,
    completed_end_date: filter_setting.completed_end_date,
    start_start_date: filter_setting.start_start_date,
    start_end_date: filter_setting.start_end_date,
    due_start_date: filter_setting.due_start_date,
    due_end_date: filter_setting.due_end_date
  };
};

const mapDispatch = {
  setUserFilterSettings
};

export default connect(mapState, mapDispatch)(DateOptions);
