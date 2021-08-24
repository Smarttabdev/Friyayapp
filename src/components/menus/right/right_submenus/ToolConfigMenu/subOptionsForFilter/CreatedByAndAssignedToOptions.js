import React from 'react';
import { connect } from 'react-redux';
import {
  getFilterSettings,
  setUserFilterSettings
} from 'Src/helpers/user_config';
import { getPeopleArray } from 'Src/newRedux/database/people/selectors';
import PersonMenuRow from 'Components/menus/right/right_submenus/elements/PersonMenuRow';

const CreatedByAndAssignedToOptions = ({
  type,
  assigned,
  creator,
  people,
  setUserFilterSettings
}) => {
  const filters = [
    { type: 'assigned', data: assigned },
    { type: 'creator', data: creator }
  ];

  const toggleFilter = id => {
    const payload = {};
    const filter = filters.find(f => f.type == type);

    if (filter.data.includes(id)) {
      payload[filter.type] = filter.data.filter(
        a => (type == assigned ? Number(a) : a) !== id
      );
    } else {
      payload[filter.type] = [...filter.data, id];
    }
    setUserFilterSettings(payload);
  };

  return (
    <>
      {people.map(person => {
        const personId = type == 'assigned' ? Number(person.id) : person.id;
        return (
          <PersonMenuRow
            key={person.id}
            isSelected={filters
              .find(f => f.type == type)
              .data.includes(personId)}
            onClick={() => toggleFilter(personId)}
            person={person}
          />
        );
      })}
    </>
  );
};

const mapState = state => {
  const filter_setting = getFilterSettings(state);
  return {
    creator: filter_setting.creator,
    assigned: filter_setting.assigned,
    people: getPeopleArray(state)
  };
};

const mapDispatch = {
  setUserFilterSettings
};

export default connect(mapState, mapDispatch)(CreatedByAndAssignedToOptions);
