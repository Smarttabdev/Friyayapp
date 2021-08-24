import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { func, object, string } from 'prop-types';
import {
  updateUserOfficeHours,
  getUserOfficeHours
} from 'Src/newRedux/database/user/thunks';
import get from 'lodash/get';
import { connect } from 'react-redux';

Date.prototype.formatMMDDYYYY = function() {
  return this.getMonth() + 1 + '/' + this.getDate() + '/' + this.getFullYear();
};

class OfficeHoursDaySegment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeDate: props.activeDate
    };
  }

  static propTypes = {
    setActiveDate: func.isRequired,
    activeDate: string,
    currentUser: object.isRequired,
    updateUserOfficeHours: func.isRequired
  };

  handleDateChange = date => {
    const { setActiveDate } = this.props;
    // this.setState({
    //   activeDate: new Date(date).formatMMDDYYYY()
    // });
    setActiveDate(date);
    this.toggleDatePicker(false);
  };

  toggleDatePicker = performCallback => {
    this.setState(
      prev => ({
        showDatePicker: !prev.showDatePicker
      }),
      () => {
        performCallback && this.datepicker.input.focus();
      }
    );
  };

  handleCopyDay = async () => {
    //Objective --
    //Check for selected day with recurring, if any, change the hours of that day,
    //else create selected day with recurring

    const { activeDate, currentUser, updateUserOfficeHours } = this.props;
    let activeDay = new Date(activeDate).toISOString();
    activeDay = moment(activeDay)
      .format('dddd')
      .toLowerCase();

    let dateData = await getUserOfficeHours({ userId: currentUser.id });
    dateData = get(dateData, 'data.attributes.date_slots.data', []);
    const isAlreadyRecurring = dateData.find(
      date =>
        date.attributes.day.toLowerCase() == activeDay &&
        date.attributes.recurring == true
    );
    let dateId = !isAlreadyRecurring
      ? dateData.find(data => data.attributes.date == activeDate).id
      : isAlreadyRecurring.id;

    await updateUserOfficeHours({
      userId: currentUser.id,
      recurring: true,
      dateId: dateId
    });
    this.setState({ isCopied: true });
    setTimeout(() => {
      this.setState({ isCopied: false });
    }, 1500);
  };

  render() {
    const { showDatePicker, isCopied } = this.state;
    const { activeDate } = this.props;

    return (
      <div className="office_hours-day_segment">
        {!showDatePicker ? (
          <div
            onClick={() => this.toggleDatePicker(true)}
            className="day_segment-date"
          >
            {new Date(activeDate).toDateString().slice(0, -5)}
          </div>
        ) : (
          <DatePicker
            todayButton="Go to today"
            selected={new Date(activeDate)}
            onChange={date => this.handleDateChange(date)}
            withPortal
            ref={datepicker => {
              this.datepicker = datepicker;
            }}
          />
        )}
        <div className="copy" onClick={this.handleCopyDay}>
          {isCopied ? 'Copied' : 'Copy'}
        </div>
      </div>
    );
  }
}

const mapDispatch = {
  updateUserOfficeHours
};

export default connect(undefined, mapDispatch)(OfficeHoursDaySegment);
