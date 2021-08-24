import React from 'react';
import { connect } from 'react-redux';
import { array } from 'prop-types';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { getPeopleArray } from 'Src/newRedux/database/people/selectors';
import PersonMenuRow from 'Components/menus/right/right_submenus/elements/PersonMenuRow';
import SubMenuHeader from 'Components/menus/right/right_submenus/elements/SubMenuHeader';
import {
  getFilterSettings,
  setUserFilterSettings
} from 'Src/helpers/user_config';

const RightFiltersAssignedMenu = ({
  assigned,
  people,
  setUserFilterSettings,
  isDocked,
  onClickBack
}) => {
  const toggleAssignFilter = id => {
    const payload = {};
    if (assigned.includes(Number(id))) {
      payload.assigned = assigned.filter(a => Number(a) !== Number(id));
    } else {
      payload.assigned = [...assigned, Number(id)];
    }
    setUserFilterSettings(payload);
  };
  return (
    <div className="right-submenu">
      <SubMenuHeader
        rootMenu="Filters"
        title="Assigned-to Filter"
        isDocked={isDocked}
        onClickBack={onClickBack}
      />
      <div className="right-submenu_content">
        {people.map(person => (
          <PersonMenuRow
            key={person.id}
            isSelected={assigned.includes(Number(person.id))}
            onClick={() => toggleAssignFilter(person.id)}
            person={person}
          />
        ))}
      </div>
    </div>
  );
};

RightFiltersAssignedMenu.propTypes = {
  assigned: array.isRequired,
  people: array.isRequired
};

const mapState = state => {
  const {
    page: { topicId }
  } = stateMappings(state);
  const filter_setting = getFilterSettings(state);
  return {
    topicId,
    assigned: filter_setting.assigned,
    people: getPeopleArray(state)
  };
};

const mapDispatch = {
  setUserFilterSettings
};

export default connect(mapState, mapDispatch)(RightFiltersAssignedMenu);
