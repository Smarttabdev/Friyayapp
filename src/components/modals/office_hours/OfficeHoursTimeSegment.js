import React, { Component } from 'react';
import { func, object, array, string } from 'prop-types';
import hoursOfDay from './hoursOfDay';
import {
  getUserOfficeHours,
  getAllOfficeHours,
  updateUserOfficeHours
} from 'Src/newRedux/database/user/thunks';
import { updateActiveDateOfficeHours } from 'Src/newRedux/database/officeHours/actions';
import get from 'lodash/get';
import moment from 'moment-timezone';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import daysOfWeek from './daysOfWeek';

class OfficeHoursTimeSegment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUsersData: []
    };
  }

  static propTypes = {
    currentUser: object.isRequired,
    selectedUsers: array.isRequired,
    updateUserOfficeHours: func.isRequired,
    activeDate: string.isRequired,
    userTimezone: string.isRequired,
    updateActiveDateOfficeHours: func.isRequired
  };

  handleSelectTime = (user, time) => {
    const {
      currentUser,
      updateUserOfficeHours,
      activeDate,
      userTimezone
    } = this.props;

    if (user.attributes.id == currentUser.id) {
      updateUserOfficeHours({
        userId: user.attributes.id,
        date: activeDate,
        time: time,
        timezone: userTimezone,
        dateId: get(user, 'dateId')
      });
      this.arrange(user.attributes, time);
    }
  };

  arrange = async (user, time) => {
    /**
     * Objective --
     * create or update selectedUsersData object which would include properties
     * -attributes, which is user data,
     * -selectedTimes, which is the selected times for active date,
     * -dateId, which is used to update database
     */
    const { activeDate, currentUser, updateActiveDateOfficeHours } = this.props;
    let { selectedUsersData, dayOfWeek } = this.state;
    let userOfficeHours = await getUserOfficeHours({ userId: user.id });

    if (
      userOfficeHours.data == null &&
      selectedUsersData.find(data => data.attributes.id == user.id) == undefined
    ) {
      this.setState(prev => ({
        selectedUsersData: [
          ...prev.selectedUsersData,
          {
            attributes: user,
            selectedTimes: []
          }
        ]
      }));
      return null;
    }

    userOfficeHours = get(userOfficeHours, 'data.attributes', {});

    // -- Recurring Logic Start
    let allDates = get(userOfficeHours, 'date_slots.data', []);
    let recurringDay = allDates.find(
      date =>
        date.attributes.day == dayOfWeek && date.attributes.recurring == true
    );
    let recurring = recurringDay ? recurringDay.attributes.hours : false;
    // -- Recurring Logic End

    let dateData = allDates.find(date => date.attributes.date == activeDate);
    let selectedTimesForDate = dateData ? dateData.attributes.hours : [];
    let dateId = dateData ? dateData.attributes.id : null;

    // -- Converting time to user timezone Logic Start
    const convertedTime = this.handleConvertTime(
      recurring ? recurring : selectedTimesForDate,
      userOfficeHours.timezone
    );
    // -- Converting time to user timezone Logic End

    if (selectedUsersData.find(data => data.attributes.id == user.id)) {
      //if user is included in selectedUsersData
      let index = selectedUsersData.findIndex(
        data => data.attributes.id == user.id
      );
      selectedUsersData[index].dateId = dateId;
      if (time) {
        //if time is included means update hours
        selectedUsersData[index].selectedTimes.includes(time)
          ? selectedUsersData[index].selectedTimes.splice(
              selectedUsersData[index].selectedTimes.indexOf(time),
              1
            )
          : selectedUsersData[index].selectedTimes.push(time);
      } else {
        selectedUsersData[index].selectedTimes = convertedTime;
      }
      user.id == currentUser.id &&
        updateActiveDateOfficeHours(selectedUsersData[index].selectedTimes);
      this.setState({ selectedUsersData: selectedUsersData });
    } else {
      this.setState(prev => ({
        selectedUsersData: [
          ...prev.selectedUsersData,
          {
            attributes: user,
            selectedTimes: convertedTime,
            dateId: dateId
          }
        ]
      }));
      user.id == currentUser.id && updateActiveDateOfficeHours(convertedTime);
    }
  };

  timeIsSelected = (user, time) => {
    let includedTime = user.selectedTimes.find(t => t == time);
    return includedTime ? true : false;
  };

  handleConvertTime = (timeArray, timezone) => {
    const { activeDate, userTimezone } = this.props;
    const returnValue = timeArray.map(time => {
      const momentString = moment(
        activeDate.replace(/\//g, '-'),
        'MM-DD-YYYY'
      ).format('YYYY-MM-DD');
      const timezoneMoment = moment.tz(`${momentString} ${time}`, timezone);
      return timezoneMoment
        .clone()
        .tz(userTimezone)
        .format('HH:mm');
    });
    return returnValue;
  };

  async componentDidMount() {
    const { selectedUsers } = this.props;

    this.setState({
      dayOfWeek: daysOfWeek[new Date(this.props.activeDate).getDay()]
    });

    for (const user of selectedUsers) {
      await this.arrange(user);
    }
  }

  async componentDidUpdate(prevProps) {
    const { selectedUsers, activeDate } = this.props;
    if (prevProps.activeDate !== activeDate) {
      this.setState(
        {
          dayOfWeek: daysOfWeek[new Date(activeDate).getDay()]
        },
        async () => {
          for (const user of selectedUsers) {
            await this.arrange(user);
          }
        }
      );
    }
    if (prevProps.selectedUsers !== selectedUsers) {
      for (const user of selectedUsers) {
        await this.arrange(user);
      }
      //Make sure data is in sync with selected users
      const selectedIds = selectedUsers.map(u => u.id);
      this.setState(prev => ({
        selectedUsersData: prev.selectedUsersData.filter(u =>
          selectedIds.includes(u.attributes.id)
        )
      }));
    }
  }

  render() {
    const { currentUser } = this.props;
    const { selectedUsersData } = this.state;

    return (
      <div className="office_hours-time_segment">
        {hoursOfDay.map((hour, i) => (
          <div className="hour_container" key={i}>
            <div className="hour_container-hour">{hour.time}</div>
            {selectedUsersData.map((user, j) => (
              <div className="hour_container-person" key={j}>
                <div
                  style={{
                    backgroundColor: this.timeIsSelected(user, hour.halfHour)
                      ? '#6FCF97'
                      : '',
                    cursor:
                      user.attributes.id == currentUser.id
                        ? 'pointer'
                        : 'default'
                  }}
                  onClick={() => this.handleSelectTime(user, hour.halfHour)}
                ></div>
                <div
                  style={{
                    backgroundColor: this.timeIsSelected(user, hour.fullHour)
                      ? '#6FCF97'
                      : '',
                    cursor:
                      user.attributes.id == currentUser.id
                        ? 'pointer'
                        : 'default'
                  }}
                  onClick={() => this.handleSelectTime(user, hour.fullHour)}
                ></div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

const mapState = state => {
  const { officeHours } = stateMappings(state);
  return {
    selectedUsers: officeHours.selectedUsers
  };
};

const mapDispatch = {
  updateActiveDateOfficeHours,
  updateUserOfficeHours
};

export default connect(mapState, mapDispatch)(OfficeHoursTimeSegment);
