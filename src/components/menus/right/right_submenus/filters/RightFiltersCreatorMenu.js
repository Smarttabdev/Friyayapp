import React from 'react';
import { connect } from 'react-redux';
import { array } from 'prop-types';
import { getPeopleArray } from 'Src/newRedux/database/people/selectors';
import { stateMappings } from 'Src/newRedux/stateMappings';
import PersonMenuRow from 'Components/menus/right/right_submenus/elements/PersonMenuRow';
import SubMenuHeader from 'Components/menus/right/right_submenus/elements/SubMenuHeader';
import {
  getFilterSettings,
  setUserFilterSettings
} from 'Src/helpers/user_config';

const RightFiltersCreatorMenu = ({
  creator,
  people,
  setUserFilterSettings,
  isDocked,
  onClickBack
}) => {
  const toggleCreatorFilter = id => e => {
    const payload = {};
    if (creator.includes(id)) {
      payload.creator = creator.filter(a => a !== id);
    } else {
      payload.creator = [...creator, id];
    }
    setUserFilterSettings(payload);
  };
  return (
    <div className="right-submenu">
      <SubMenuHeader
        rootMenu="Filters"
        title="Created-by Filter"
        isDocked={isDocked}
        onClickBack={onClickBack}
      />
      <div className="right-submenu_content">
        {people.map(person => (
          <PersonMenuRow
            key={person.id}
            isSelected={creator.includes(person.id)}
            onClick={toggleCreatorFilter(person.id)}
            person={person}
          />
        ))}
      </div>
    </div>
  );
};

RightFiltersCreatorMenu.propTypes = {
  creator: array.isRequired,
  people: array.isRequired
};

const mapState = state => {
  const {
    page: { topicId }
  } = stateMappings(state);
  const filter_setting = getFilterSettings(state);
  return {
    topicId,
    creator: filter_setting.creator,
    people: getPeopleArray(state)
  };
};

const mapDispatch = {
  setUserFilterSettings
};

export default connect(mapState, mapDispatch)(RightFiltersCreatorMenu);
