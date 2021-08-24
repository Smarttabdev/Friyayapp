import React from 'react';
import { connect } from 'react-redux';
import { array } from 'prop-types';

import { stateMappings } from 'Src/newRedux/stateMappings';
import PriorityLevelRow from 'Components/menus/right/right_submenus/elements/PriorityLevelRow';
import SubMenuHeader from 'Components/menus/right/right_submenus/elements/SubMenuHeader';
import {
  getFilterSettings,
  setUserFilterSettings
} from 'Src/helpers/user_config';

const RightFiltersPriorityMenu = ({
  priority,
  levels,
  setUserFilterSettings,
  isDocked,
  onClickBack
}) => {
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
    <div className="right-submenu">
      <SubMenuHeader
        rootMenu="Filters"
        title="Priority Level Filter"
        isDocked={isDocked}
        onClickBack={onClickBack}
      />
      <div className="right-submenu_content">
        {levels.map(level => (
          <PriorityLevelRow
            key={level}
            isSelected={priority.includes(level)}
            onClick={setPriorityLevelFilters(level)}
            level={level}
          />
        ))}
      </div>
    </div>
  );
};

RightFiltersPriorityMenu.propTypes = {
  priority: array.isRequired,
  levels: array.isRequired
};

const mapState = state => {
  const {
    page: { topicId }
  } = stateMappings(state);
  const filter_setting = getFilterSettings(state);
  return {
    topicId,
    priority: filter_setting.priority,
    levels: ['Highest', 'High', 'Medium', 'Low', 'Lowest']
  };
};

const mapDispatch = {
  setUserFilterSettings
};

export default connect(mapState, mapDispatch)(RightFiltersPriorityMenu);
