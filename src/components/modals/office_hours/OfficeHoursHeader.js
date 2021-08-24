import React, { Component, Fragment } from 'react';
import { func } from 'prop-types';
import { setOfficeHoursModalOpen } from 'Src/newRedux/interface/modals/actions';
import { connect } from 'react-redux';
import IconButton from 'Components/shared/buttons/IconButton';
import ReactSelectCustom from 'Components/shared/ReactSelectCustom';
import reactSelectCustomStyles from 'Components/shared/ReactSelectCustom/reactSelectCustomStyles';
import { getPeopleArray } from 'Src/newRedux/database/people/selectors';
import daysOfWeek from './daysOfWeek';

class OfficeHoursHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assignedToValues: []
    };
  }

  static propTypes = {
    setOfficeHoursModalOpen: func.isRequired
  };

  handleAssignedToChange = value => {
    this.setState({ assignedToValues: value });
  };

  camel2title = camelCase => {
    const re = /(\b[a-z](?!\s))/g;
    if (camelCase) {
      return camelCase.replace(re, function(x) {
        return x.toUpperCase();
      });
    } else {
      return ' ';
    }
  };

  closeModal = () => {
    this.props.setOfficeHoursModalOpen(false);
  };

  toggleTimezoneInfo = () => {
    this.setState(prev => ({ showTimezoneInfo: !prev.showTimezoneInfo }));
  };

  render() {
    const {
      people,
      jumpToDay,
      addUser,
      availableUsers,
      formatedTimezone
    } = this.props;
    const { showTimezoneInfo } = this.state;

    return (
      <Fragment>
        <div className="office_hours-header">
          <div>Office hours</div>
          <div>
            <div>Jump to:</div>
            <ReactSelectCustom
              className="office_hours-select-field"
              value={this.state.assignedToValues}
              onChange={jumpToDay}
              styles={{
                ...reactSelectCustomStyles,
                control: provided => ({
                  ...reactSelectCustomStyles.control(provided)
                })
              }}
              options={daysOfWeek}
              getOptionLabel={option => this.camel2title(`${option}`)}
              getOptionValue={option => option}
              isSearchable
              placeholder="Day"
            />
            <ReactSelectCustom
              className="office_hours-select-field"
              value={this.state.assignedToValues}
              onChange={addUser}
              styles={{
                ...reactSelectCustomStyles,
                control: provided => ({
                  ...reactSelectCustomStyles.control(provided)
                })
              }}
              options={availableUsers}
              getOptionLabel={option =>
                this.camel2title(
                  `${option.attributes.first_name} ${option.attributes.last_name}`
                )
              }
              getOptionValue={option => option.id}
              isSearchable
              placeholder="Person"
            />
            <div>My timezone:</div>
            <div
              style={{
                display: 'flex',
                marginRight: '3px',
                alignItems: 'flex-end'
              }}
            >
              {formatedTimezone}
              <div
                style={{
                  display: 'flex',
                  fontSize: '12px',
                  alignItems: 'center'
                }}
              >
                <IconButton
                  icon="info_outline"
                  fontSize="14px"
                  onClick={this.toggleTimezoneInfo}
                />
                {showTimezoneInfo &&
                  "selected user's office hours would be adjusted to this timezone"}
              </div>
            </div>
          </div>
        </div>
        <div className="office_hours-close_btn">
          <IconButton icon="close" fontSize="30px" onClick={this.closeModal} />
        </div>
      </Fragment>
    );
  }
}

const mapState = state => {
  return {
    people: getPeopleArray(state)
  };
};

const mapDispatch = {
  setOfficeHoursModalOpen
};

export default connect(mapState, mapDispatch)(OfficeHoursHeader);
