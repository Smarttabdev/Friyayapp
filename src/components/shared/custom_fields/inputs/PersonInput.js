import React, { useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { startCase } from 'lodash';

import ReactSelectCustom from 'Components/shared/ReactSelectCustom';
import reactSelectCustomStyles from 'Components/shared/ReactSelectCustom/reactSelectCustomStyles';
import { getPeopleArray } from 'Src/newRedux/database/people/selectors';

const PersonInput = ({ value, onChange, onBlur, people }) => {
  const handleChange = val => {
    onChange(val.map(opt => opt.value));
  };

  const options = useMemo(() => {
    return Object.keys(people).map(p => {
      const { first_name, last_name } = people[p].attributes;
      return {
        value: people[p].id,
        label: startCase(`${first_name} ${last_name}`),
        item: p
      };
    });
  }, [people]);

  value = Array.isArray(value) ? value : [];
  value = value.map(id => options.find(option => option.value == id));

  return (
    <ReactSelectCustom
      className="sheet-view__card-label-select"
      value={value}
      onChange={handleChange}
      onBlur={onBlur}
      styles={{
        ...reactSelectCustomStyles,
        control: provided => ({
          ...reactSelectCustomStyles.control(provided),
          border: 'none'
        })
      }}
      options={options}
      isMulti
      isSearchable
    />
  );
};

const mapState = state => {
  const people = getPeopleArray(state);
  return {
    people
  };
};

export default connect(mapState)(PersonInput);
