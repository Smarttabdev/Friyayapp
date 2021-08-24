import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import {
  toggleGroupByDropdown,
  setGroupBySubBoards
} from 'Src/newRedux/groupBy/actions';
import { setUserGroupSettings } from 'Src/newRedux/database/topics/thunks';
import {
  getUiSettings,
  getFilterSettings,
  setUserFilterSettings
} from 'Src/helpers/user_config';
import get from 'lodash/get';
import IconButton from 'Components/shared/buttons/IconButton';
import chroma from 'chroma-js';
import Select, { components } from 'react-select';
import Switch from 'Src/components/shared/ToggleSwitch';

const timelineOptions = [
  { value: 'assignee', label: 'Assignee', color: '#56CCF2' },
  { value: 'priority_level', label: 'Priority level', color: '#F256D9' },
  { value: 'label', label: 'Label', color: '#6EC18B' }
];

const options = [
  ...timelineOptions,
  { value: 'due_date', label: 'Due Date', color: '#EB5757' },
  { value: 'start_date', label: 'Start Date', color: '#2F80ED' },
  { value: 'update_date', label: 'Update Date', color: '#F2994A' },
  { value: 'status', label: 'Status', color: '#B52727' },
  { value: 'speed', label: 'Speed', color: '#5694F2' },
  { value: 'completion', label: 'Completion Date', color: '#6FCF97' },
  { value: 'created_date', label: 'Created Date', color: '#C98909' },
  // { value: 'comment_date', label: 'Comment Creation Date', color: '#6FCF97' },
  { value: 'created_by', label: 'Created By', color: '#C2C2C2' }
  // { value: 'sub_view', label: 'Sub-View', color: '#6FCF97' },
];

const dot = (color = '#ccc') => ({
  alignItems: 'center',
  display: 'flex',

  ':before': {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: 'block',
    marginRight: 8,
    height: 10,
    width: 10
  }
});

const colourStyles = {
  control: styles => ({
    ...styles,
    backgroundColor: 'white',
    border: 'none',
    minWidth: '162px'
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      ...dot(data.color),
      backgroundColor: isDisabled
        ? null
        : isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.1).css()
        : null,
      color: isDisabled
        ? '#ccc'
        : isSelected
        ? chroma.contrast(color, 'white') > 2
          ? 'white'
          : 'black'
        : data.color,
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':active': {
        ...styles[':active'],
        backgroundColor:
          !isDisabled && (isSelected ? data.color : color.alpha(0.3).css())
      }
    };
  },
  input: styles => ({
    ...styles,

    height: '16px',
    color: '#fff',
    marginLeft: '6px',
    // backgroundColor: '#56CCF2',
    padding: '2px',
    alignItems: 'center',
    borderRadius: '4px',
    fontFamily: 'Helvetica',
    fontSize: '14px',
    lineHeight: '0px'
  }),
  placeholder: styles => ({
    ...styles,
    width: '102px',
    height: '16px',
    color: '#fff',
    marginLeft: '6px',
    backgroundColor: '#56CCF2',
    padding: '10px',
    alignItems: 'center',
    borderRadius: '4px',
    fontFamily: 'Helvetica',
    fontSize: '14px',
    lineHeight: '0px'
  }),
  singleValue: (styles, { data }) => ({ ...styles }),
  multiValue: (styles, { data }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      color: '#fff',
      backgroundColor: color.alpha(1).css(),
      borderRadius: '4px'
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: '#fff',
    fontFamily: 'Helvetica',
    fontSize: '14px',
    lineHeight: '18px'
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color,
    ':hover': {
      backgroundColor: data.color,
      color: 'white'
    }
  }),
  IndicatorSeparator: styles => ({ backgroundColor: 'transparent' }),
  menu: (styles, { data }) => ({
    ...styles,
    zIndex: 5
  })
};
const DropdownIndicator = props => {
  return (
    <components.DropdownIndicator {...props} className="add-indicator">
      <IconButton additionalClasses={'add_icon'} color={'#808080'} icon="add" />
    </components.DropdownIndicator>
  );
};
class GroupByDropDown extends React.Component {
  toggleSubBoards = () => {
    const {
      toolsToShowSubBoards,
      currentView,
      filterSettings,
      setUserFilterSettings,
      setGroupBySubBoards
    } = this.props;
    let newStatusArray = [];
    if (toolsToShowSubBoards.includes(currentView)) {
      newStatusArray = toolsToShowSubBoards.filter(
        item => item !== currentView
      );
    } else {
      newStatusArray = [...toolsToShowSubBoards, currentView];
    }
    const addSubtopicsCards = !newStatusArray.includes(currentView);
    setGroupBySubBoards(newStatusArray);

    const group_by = {
      ...filterSettings.group_by,
      subBoards: newStatusArray
    };

    setUserFilterSettings({
      group_by,
      include_subtopic_cards: addSubtopicsCards
    });
  };

  handleChange(selectedOptions) {
    const { filterSettings, setUserFilterSettings } = this.props;
    const group_by = {
      ...filterSettings.group_by,
      groupBy: selectedOptions
    };
    setUserFilterSettings({ group_by: group_by });
    //this.props.setUserGroupSettings(this.props.topicId, selectedOptions);
  }
  render() {
    const {
      selectedOptions,
      isDropdownOpen,
      toggleGroupByDropdown,
      setUserGroupSettings,
      topicId,
      openTopicId,
      setUserFilterSettings,
      currentView,
      isHome,
      filterSettings,
      additionalClass,
      includeSubtopics,
      small
    } = this.props;

    return isDropdownOpen ? (
      <div className={additionalClass}>
        <div className="groupby-dropdown" style={small && { padding: 0 }}>
          <IconButton
            additionalClasses={'power_icon'}
            color={'#808080'}
            icon="close"
            onClick={() => {
              const group_by = {
                ...filterSettings.group_by,
                open: !filterSettings.group_by?.open
              };
              setUserFilterSettings({ group_by: group_by });
            }}
          />
          <IconButton
            additionalClasses={'power_icon'}
            color={'#808080'}
            icon="power_settings_new"
            onClick={() => {
              const group_by = {
                groupBy: [],
                open: false
              };
              setUserFilterSettings({ group_by: group_by });
            }}
          />
          {['SHEET', 'ACTION_PLAN', 'TIMELINE'].includes(currentView) && (
            <Fragment>
              <div className="group-by-text">Group By</div>
              <Select
                value={selectedOptions}
                isMulti
                components={{ DropdownIndicator }}
                defaultValue={[options[0]]}
                onChange={selectedOptions => this.handleChange(selectedOptions)}
                options={currentView == 'TIMELINE' ? timelineOptions : options}
                styles={colourStyles}
              />
            </Fragment>
          )}
          <div>
            <span className="group-by-text">Sub Boards</span>
            <Switch
              className="ml10 mr5"
              on={!includeSubtopics}
              onClick={() =>
                setUserFilterSettings({
                  include_subtopic_cards: !includeSubtopics
                })
              }
            />
          </div>
        </div>
      </div>
    ) : null;
  }
}

function mapState(state) {
  const {
    page: { topicId, isHome },
    topics,
    groupBy
  } = stateMappings(state);
  const topic = topics[topicId];
  const group_settings = get(
    topic,
    'attributes.user_configuration.data.attributes.group_settings'
  );
  const ui_settings = getUiSettings(state);
  const currentView = ui_settings.current_active_template;
  const filterSettings = getFilterSettings(state);
  return {
    topicId,
    topic,
    selectedOptions: filterSettings.group_by?.groupBy || [],
    isDropdownOpen: filterSettings.group_by?.open,
    openTopicId: groupBy.topicId,
    currentView,
    filterSettings,
    isHome,
    includeSubtopics: filterSettings?.include_subtopic_cards
  };
}

export default connect(mapState, {
  setUserGroupSettings,
  toggleGroupByDropdown,
  setGroupBySubBoards,
  setUserFilterSettings
})(GroupByDropDown);
