import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class TimelineModeSelector extends Component {
  static propTypes = {
    className: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    goalView: PropTypes.bool,
    board: PropTypes.string,
    renderItem: PropTypes.func,
    color: PropTypes.string
  };

  state = {
    showDropdown: false,
    changeCaretColor: true
  };

  handleOptionSelect(e, id) {
    if (e.defaultPrevented) return;
    this.props.onChange(id);
    this.toggleDropdown();
  }

  handleOutsideClick = ev => {
    if (!this.dropdownRef.contains(ev.target)) {
      this.toggleDropdown();
    }
  };

  saveDropdownRef = ref => {
    this.dropdownRef = ref;
  };

  toggleDropdown = () => {
    const { refShowDropdown } = this.props;
    if (this.props.value == 'daysInfinite') {
      this.props.toggleModeSelectorDropdown(!refShowDropdown);
      if (!refShowDropdown == true)
        document.addEventListener('click', this.handleOutsideClick, false);
      else
        document.removeEventListener('click', this.handleOutsideClick, false);
    } else {
      this.setState({ showDropdown: !this.state.showDropdown }, () => {
        if (this.state.showDropdown) {
          document.addEventListener('click', this.handleOutsideClick, false);
        } else {
          document.removeEventListener('click', this.handleOutsideClick, false);
        }
      });
    }
  };

  getColumnModeInUse = () => {
    let columnModeInUse = null;
    if (this.props.board === 'calendar') {
      columnModeInUse = columnModeOptionsCalendarView;
    } else if (this.props.goalView) {
      columnModeInUse = columnModeOptionsGoalView;
    } else if (this.props.board === 'status_table') {
      columnModeInUse = columnModeOptionsStatusTableView;
    } else if (this.props.board === 'weeklySpreadView') {
      columnModeInUse = columnModeOptionsWeeklySpreadView;
    } else if (this.props.board === 'planLens') {
      columnModeInUse = columnModeOptionsPlanViews;
    } else {
      columnModeInUse = columnModeOptions;
    }

    return columnModeInUse;
  };

  renderDropdown = (isFromRef, extraStyle = {}) => {
    const columnModeInUse = this.getColumnModeInUse();

    return (
      (this.state.showDropdown || isFromRef) && (
        <ul
          ref={this.saveDropdownRef}
          className="timeline-mode-selector__options"
          style={{ ...extraStyle }}
        >
          {columnModeInUse.map(opt => (
            <li
              key={opt.id}
              className="timeline-mode-selector__option"
              onClick={e => this.handleOptionSelect(e, opt.id)}
            >
              {this.props.renderItem ? this.props.renderItem(opt) : opt.name}
            </li>
          ))}
        </ul>
      )
    );
  };

  render() {
    const controlClassNames = classNames(
      this.props.className,
      'timeline-mode-selector'
    );
    const { bold, color } = this.props;

    const columnModeInUse = this.getColumnModeInUse();

    const activeOption =
      columnModeInUse.find(opt => opt.id === this.props.value) ||
      columnModeInUse[0];

    return (
      <div
        className={controlClassNames}
        style={{ fontWeight: bold ? 600 : 400 }}
      >
        <div
          className="timeline-mode-selector__value"
          onClick={this.toggleDropdown}
          onMouseEnter={() => this.setState({ changeCaretColor: false })}
          onMouseLeave={() => this.setState({ changeCaretColor: true })}
        >
          <span className="no-wrap">{activeOption && activeOption.name}</span>
          <span
            className="timeline-mode-selector__arrow material-icons"
            style={{
              paddingTop: '4.5px',
              color: this.state.changeCaretColor && color ? color : '#a2a2a2'
            }}
          >
            {this.state.showDropdown ? 'arrow_drop_up' : 'arrow_drop_down'}
          </span>
        </div>
        {this.renderDropdown()}
      </div>
    );
  }
}

const columnModeOptions = [
  { id: 'quarters', name: 'Quarters' },
  { id: 'months', name: 'Months' },
  { id: 'weeks', name: 'Weeks' },
  { id: 'weeksWD', name: 'Weeks (weekdays)' },
  { id: 'days', name: 'Days' },
  { id: 'daysWD', name: 'Days (weekdays)' },
  { id: 'daysInfinite', name: 'Days (continous)' }
];

const columnModeOptionsGoalView = [
  { id: 'quarters', name: 'Quarters' },
  { id: 'months', name: 'Months' },
  { id: 'weeks', name: 'Weeks' },
  { id: 'days', name: 'Days' },
  { id: 'any', name: 'Any Due Date' },
  { id: 'viewDateRange', name: "This Board's date range" },
  { id: 'anyDateRange', name: 'Select date range' },
  { id: 'allCards', name: 'All cards' }
];

const columnModeOptionsCalendarView = [
  { id: 'months', name: 'Months' },
  { id: 'monthsWD', name: 'Months (weekdays)' },
  { id: 'weeks', name: 'Weeks' },
  { id: 'weeksWD', name: 'Weeks (weekdays)' }
];

const columnModeOptionsStatusTableView = [
  { id: 'weeks', name: 'Month' },
  { id: 'days', name: 'Week' }
];

const columnModeOptionsWeeklySpreadView = [
  { id: 'monthDays', name: 'Month' },
  { id: 'weeks', name: 'Weeks' },
  { id: 'weeksWD', name: 'Weeks (weekdays)' }
];

const columnModeOptionsPlanViews = [
  { id: 'monthDays', name: 'Month' },
  { id: 'weeks', name: 'Weeks' },
  { id: 'days', name: 'Days' }
];

export default TimelineModeSelector;
