import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import moment from 'moment';
import DateInput from 'Components/shared/forms/DateInput';
import customStyles from 'src/components/shared/cards/AddAssigneeStyle';
import { getPeopleArray } from 'Src/newRedux/database/people/selectors';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { createTopic } from 'Src/newRedux/database/topics/thunks';
import { set } from 'lodash';
import LocationPicker from '../LocationPicker';
import { camel2title } from 'src/lib/utilities';

const allOptions = {
  assignee: {
    value: 'assignee',
    label: 'assignee'
  },
  board: {
    value: 'board',
    label: 'board'
  },
  due_date: {
    value: 'due_date',
    label: 'due date'
  },
  label: {
    value: 'label',
    label: 'label'
  },
  location: {
    value: 'location',
    label: 'location'
  }
};

const AddAssignee = props => {
  const {
    createBoard,
    labels,
    users,
    people,
    getDetails,
    getSelectedPeople,
    taskCard,
    createChatOrVideoRoom,
    makeChatPublic,
    handleChecked,
    topics,
    topicId,
    topicHeader,
    initialDueDate,
    initialLabelIds,
    initialAssignments,
    initialTopicIds,
    hideAddFields,
    transparent,
    createTopic,
    card_font_color,
    smallCard,
    initialLocation,
    showLocation
  } = props;

  const selectableOptions = createBoard
    ? [allOptions.assignee, allOptions.board, allOptions.due_date]
    : [
        allOptions.assignee,
        allOptions.board,
        allOptions.due_date,
        allOptions.label,
        allOptions.location
      ];
  const boards = Object.values(topics || {});

  let customOptions = [];
  if (taskCard && !createChatOrVideoRoom)
    customOptions.push(allOptions.assignee, allOptions.due_date);
  if (initialLocation || showLocation) customOptions.push(allOptions.location);
  if (initialLabelIds?.length > 0) customOptions.push(allOptions.label);

  const prevDate = initialDueDate !== 'Invalid date' ? initialDueDate : null;

  const [selectedCustomOption, setSelectedCustomOption] = useState(
    customOptions
  );
  const [selectedTopics, setSelectedTopics] = useState(null);
  const [selectedAssignee, setSelectedAssignee] = useState(null);
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [selectedPeople, setSelectedPeople] = useState(null);
  const [dueDate, setDueDate] = useState(prevDate);
  const [showAssignee, setShowAssignee] = useState(false);
  const [showLabel, setShowLabel] = useState(false);
  const [showDueDate, setShowDueDate] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [showBoard, setShowBoard] = useState(false);
  const [additionalStyles, setAdditionalStyles] = useState(customStyles);

  useEffect(() => {
    setSelectedCustomOption(customOptions);
  }, [initialLocation]);

  useEffect(() => {
    setAdditionalStyles({
      ...customStyles,
      control: (provided, state) => ({
        ...customStyles.control(provided, state),
        borderBottom: `1px solid ${(transparent && card_font_color) || '#eee'}`
      }),
      placeholder: provided => ({
        ...provided,
        marginLeft: '-6px',
        color: `${(transparent && card_font_color) || '#bbb'}`
      }),
      dropdownIndicator: provided => ({
        ...provided,
        color: `${(transparent && card_font_color) || '#bbb'}`
      }),
      clearIndicator: provided => ({
        ...provided,
        color: `${(transparent && card_font_color) || '#bbb'}`
      })
    });
  }, [card_font_color]);

  useEffect(() => {
    const initialTopics = initialTopicIds?.map(id => topics[id]).filter(x => x);
    setSelectedTopics(initialTopics);
  }, [topics]);

  useEffect(() => {
    if (!labels?.length) return;
    const initialLabels = initialLabelIds?.map(id =>
      labels.find(l => toId(l.id) == id)
    );
    setSelectedLabel(initialLabels);
  }, [labels]);

  useEffect(() => {
    if (!people?.length) return;
    const initialAssignee = initialAssignments
      ?.map(id => {
        const user = people.find(x => toId(x.id) == id);
        return user && { id: user.id, name: user.attributes.name };
      })
      .filter(x => x);
    setSelectedAssignee(initialAssignee);
  }, [people]);

  const updateDetails = changes => {
    if (changes.selectedPeople) getSelectedPeople(changes.selectedPeople);

    // if (
    //   !changes.selectedAssignee &&
    //   !changes.selectedTopics &&
    //   !changes.selectedLabel &&
    //   !changes.dueDate
    // )
    //   return;

    const boardIds = (changes.selectedTopics || selectedTopics || []).map(
      t => t.id
    );

    getDetails({
      assignees: changes.selectedAssignee || selectedAssignee || [],
      dueDate: changes.dueDate || dueDate,
      labels: changes.selectedLabel || selectedLabel || [],
      selectedTopicIds: boardIds || [],
      selectedLocation: changes.selectedLocation
    });
  };

  useEffect(() => {
    if (selectedCustomOption) {
      let values = [];
      values = selectedCustomOption.map(x => x.value);

      if (values.includes('board')) {
        setShowBoard(true);
      } else {
        setShowBoard(false);
      }
      if (values.includes('assignee')) {
        setShowAssignee(true);
      } else {
        setShowAssignee(false);
      }
      if (values.includes('label')) {
        setShowLabel(true);
      } else {
        setShowLabel(false);
      }
      if (values.includes('due_date')) {
        setShowDueDate(true);
      } else {
        setShowDueDate(false);
      }
      if (values.includes('location')) {
        setShowLocationPicker(true);
      } else setShowLocationPicker(false);
    }
  }, [selectedCustomOption]);

  const handleDueDate = date => {
    const dueDateFormatted = moment(date).toISOString();
    setDueDate(dueDateFormatted);
    updateDetails({ dueDate: dueDateFormatted });
  };
  const handleDisplay = selected => {
    setSelectedCustomOption(selected);
  };

  const AddNewBoard = ({ inputValue }) => {
    const createBoard = async () => {
      const attributes = {
        title: inputValue,
        parent_id: topicId,
        tag_list: [],
        default_view_id: 'PROJECT_OVERVIEW'
      };

      const relationships = {};
      topicId && set(relationships, 'parent.data', topicId);
      const newTopic = await createTopic({ attributes, relationships });
      setSelectedTopics([...selectedTopics, newTopic?.data?.data]);
    };
    return (
      <p style={{ cursor: 'pointer' }} onClick={createBoard}>
        Add Board
      </p>
    );
  };

  if (hideAddFields) return null;

  return (
    <div
      style={{ marginLeft: '0px', color: !transparent && '#555' }}
      className="addAssignee mt15 mb15"
    >
      {createChatOrVideoRoom && !makeChatPublic && (
        <Select
          transparent={transparent}
          classNamePrefix="react-select-dropdown"
          styles={additionalStyles}
          value={selectedPeople}
          onChange={selected => {
            setSelectedPeople(selected);
            updateDetails({ selectedPeople: selected });
          }}
          options={people}
          getOptionLabel={option =>
            camel2title(
              `${option.attributes.first_name} ${option.attributes.last_name}`
            )
          }
          getOptionValue={option => option.id}
          isSearchable
          isMulti
          placeholder="Select people"
        />
      )}

      {createChatOrVideoRoom && (
        <div className="custom-checkbox mt15 mb15">
          <label
            style={
              topicHeader
                ? {
                    paddingTop: '2.5px'
                  }
                : {
                    paddingTop: '1.5px'
                  }
            }
          >
            <input
              type="checkbox"
              checked={makeChatPublic}
              onChange={handleChecked}
            />
            <i className="input-helper" />
            <span>All Workspace Members</span>
          </label>
        </div>
      )}

      {showBoard || createChatOrVideoRoom ? (
        <Select
          transparent={transparent}
          classNamePrefix="react-select-dropdown"
          styles={additionalStyles}
          value={selectedTopics}
          options={boards}
          noOptionsMessage={e => <AddNewBoard inputValue={e.inputValue} />}
          getOptionLabel={option => option?.attributes?.title}
          getOptionValue={option => option?.id}
          onChange={selected => {
            setSelectedTopics(selected);
            updateDetails({ selectedTopics: selected });
          }}
          placeholder="Select Board"
          isSearchable
          isMulti
        />
      ) : null}

      {showAssignee && (
        <Select
          transparent={transparent}
          classNamePrefix="react-select-dropdown"
          styles={additionalStyles}
          value={selectedAssignee}
          options={users}
          getOptionLabel={option => option.name}
          getOptionValue={option => option.id}
          onChange={selected => {
            setSelectedAssignee(selected);
            updateDetails({ selectedAssignee: selected });
          }}
          placeholder="Assignee"
          isMulti
          isSearchable
        />
      )}

      {showLabel && (
        <Select
          classNamePrefix="react-select-dropdown"
          transparent={transparent}
          styles={additionalStyles}
          value={selectedLabel}
          options={labels}
          getOptionLabel={option => option.name}
          getOptionValue={option => option.id}
          onChange={selected => {
            setSelectedLabel(selected);
            updateDetails({ selectedLabel: selected });
          }}
          placeholder="Labels"
          isMulti
          isSearchable
        />
      )}
      {showDueDate && (
        <DateInput
          date={dueDate}
          onChange={handleDueDate}
          placeholder="Due date"
          style={{
            borderBottom: `solid 1px ${(transparent && card_font_color) ||
              '#eee'}`
          }}
          transparent={transparent}
          card_font_color={card_font_color}
        />
      )}
      {showLocationPicker && (
        <LocationPicker
          asDropdown
          address={initialLocation?.address}
          onResultClick={location => {
            updateDetails({ selectedLocation: location });
          }}
        />
      )}
      {!createChatOrVideoRoom && (
        <Select
          transparent={transparent}
          classNamePrefix="react-select-dropdown"
          styles={additionalStyles}
          value={selectedCustomOption}
          options={selectableOptions}
          onChange={handleDisplay}
          placeholder="Add fields (dates, etc.)"
          isMulti
          isSearchable
        />
      )}
    </div>
  );
};

const mapState = (state, props) => {
  const { topics, page, utilities } = stateMappings(state);
  const topicId = props.topicId || page.topicId;
  const people = getPeopleArray(state);
  return {
    people,
    topics,
    topicId,
    card_font_color: utilities.active_design.card_font_color
  };
};

export default connect(mapState, { createTopic })(
  QueryRenderer(AddAssignee, {
    query: graphql`
      query AddAssigneeQuery {
        groups {
          id
          title
        }
        users {
          id
          name
        }
        labels {
          id
          name
          kind
          color
        }
      }
    `
  })
);
