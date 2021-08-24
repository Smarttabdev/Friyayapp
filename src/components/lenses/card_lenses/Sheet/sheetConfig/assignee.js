import React, { useState, useMemo, useEffect } from 'react';
import orderBy from 'lodash/orderBy';
import ReactSelectCustom from 'Components/shared/ReactSelectCustom';
import reactSelectCustomStyles from 'Components/shared/ReactSelectCustom/reactSelectCustomStyles';
import { connect } from 'react-redux';
import { getPeopleArray } from 'Src/newRedux/database/people/selectors';
import { getRelevantViewForPage } from 'Src/newRedux/interface/lenses/selectors';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { camel2title } from 'src/lib/utilities';

const SheetCardAssignee = ({
  card,
  topic,
  handleValueUpdate,
  people,
  viewKey,
  active_font_color
}) => {
  const [assignedToValues, setAssignedValue] = useState([]);

  const handleAssignedToChange = value => {
    setAssignedValue(value);
    updateAssignment(value);
  };

  const updateAssignment = value => {
    handleValueUpdate(
      card
        ? {
            relationships: {
              tip_assignments: { data: value.map(i => i.value) }
            }
          }
        : {
            relationships: {
              assignments: {
                data: value.map(i => ({
                  assigned_type: 'User',
                  assigned_id: i.value
                }))
              }
            }
          }
    );
  };

  const options = useMemo(() => {
    return Object.keys(people).map(p => {
      const { first_name, last_name } = people[p].attributes;
      return {
        value: people[p].id,
        label: camel2title(`${first_name} ${last_name}`),
        item: p
      };
    });
  }, [people]);

  const assignments =
    (card
      ? card.relationships.tip_assignments.data
      : topic.relationships.assignments.data) || [];

  useEffect(() => {
    const value = card
      ? card.relationships.tip_assignments.data.map(id =>
          options.find(option => option.value == id)
        )
      : topic.relationships.assignments.data.map(obj =>
          options.find(option => option.value == obj.assigned_id)
        );
    setAssignedValue(value);
  }, [assignments.sort().join(',')]);

  return (
    <ReactSelectCustom
      className="sheet-view__card-label-select assignee"
      value={assignedToValues}
      onChange={handleAssignedToChange}
      activeColor={viewKey == 'SHEET' && active_font_color}
      styles={{
        ...reactSelectCustomStyles,
        control: provided => ({
          ...reactSelectCustomStyles.control(provided),
          border: 'none',
          ...{ background: viewKey == 'SHEET' && 'transparent' }
        })
      }}
      options={options}
      isMulti
      isSearchable
    />
  );
};

const mapState = state => {
  const sm = stateMappings(state);
  const people = getPeopleArray(state);
  const viewKey = getRelevantViewForPage(state);
  const {
    utilities: { active_design }
  } = sm;
  return {
    people,
    viewKey,
    active_font_color: active_design.card_font_color
  };
};

const ConnectedAssignee = connect(mapState, null)(SheetCardAssignee);

export default {
  cssModifier: 'assignee',
  display: 'Assignee',
  Component: ConnectedAssignee,
  resizableProps: {
    minWidth: '200'
  },
  renderSummary: () => null,
  sort(cards, order) {
    return orderBy(
      cards,
      [card => card.relationships.tip_assignments.data],
      order
    );
  }
};
