import React from 'react';
import { connect } from 'react-redux';
import {
  getFilterSettings,
  setUserFilterSettings
} from 'Src/helpers/user_config';
import PriorityLevelRow from 'Components/menus/right/right_submenus/elements/PriorityLevelRow';

const PriorityOptions = ({ priority, levels, setUserFilterSettings }) => {
  const setPriorityLevelFilters = id => e => {
    const payload = {};
    if (priority.includes(id)) {
      payload.priority = priority.filter(a => a !== id);
    } else {
      payload.priority = [...priority, id];
    }
    setUserFilterSettings(payload);
  };

  return (
    <>
      {levels.map(level => (
        <PriorityLevelRow
          key={level}
          isSelected={priority.includes(level)}
          onClick={setPriorityLevelFilters(level)}
          level={level}
        />
      ))}
    </>
  );
};

const mapState = state => {
  const filter_setting = getFilterSettings(state);
  return {
    priority: filter_setting.priority,
    levels: ['Highest', 'High', 'Medium', 'Low', 'Lowest']
  };
};

const mapDispatch = {
  setUserFilterSettings
};

export default connect(mapState, mapDispatch)(PriorityOptions);
