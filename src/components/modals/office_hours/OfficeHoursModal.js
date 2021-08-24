import React, { Component } from 'react';
import { func, object, array } from 'prop-types';
import PageModal from 'Src/components/pages/page_modal';
import { setOfficeHoursModalOpen } from 'Src/newRedux/interface/modals/actions';
import { connect } from 'react-redux';
import OfficeHoursHeader from './OfficeHoursHeader';
import OfficeHoursUserSegment from './OfficeHoursUserSegment';
import OfficeHoursDaySegment from './OfficeHoursDaySegment';
import OfficeHoursTimeSegment from './OfficeHoursTimeSegment';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { getPeopleArray } from 'Src/newRedux/database/people/selectors';
import {
  getUserOfficeHours,
  getAllOfficeHours
} from 'Src/newRedux/database/user/thunks';
import { setUsers } from 'Src/newRedux/database/officeHours/actions';
// import IconButton from 'Components/shared/buttons/IconButton';
import moment from 'moment-timezone';

Date.prototype.formatMMDDYYYY = function() {
  return this.getMonth() + 1 + '/' + this.getDate() + '/' + this.getFullYear();
};

class OfficeHoursModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeDate: new Date().formatMMDDYYYY()
    };
  }

  static propTypes = {
    setOfficeHoursModalOpen: func.isRequired,
    currentUser: object.isRequired,
    people: array.isRequired,
    setUsers: func.isRequired,
    selectedUsers: array.isRequired
  };

  componentDidMount() {
    const { setUsers, currentUser, selectedUsers } = this.props;
    selectedUsers.length < 1 && setUsers([currentUser]);
  }

  closeModal = () => {
    this.props.setOfficeHoursModalOpen(false);
  };

  addUser = userObj => {
    const { setUsers, selectedUsers } = this.props;
    setUsers([...selectedUsers, userObj]);
  };

  removeUser = userId => {
    let { setUsers, selectedUsers } = this.props;
    setUsers(selectedUsers.filter(user => user.id != userId));
  };

  setActiveDate = date => {
    this.setState({
      activeDate: new Date(date).formatMMDDYYYY()
    });
  };

  handleJumpToDay = day => {
    const momentDate = moment().day(day);
    const activeDate = momentDate.toDate().formatMMDDYYYY();
    this.setState({
      activeDate: activeDate
    });
  };

  render() {
    const { activeDate } = this.state;
    const { people, currentUser, selectedUsers } = this.props;
    const availableUsers = people.filter(user => {
      const idSet = selectedUsers.map(u => u.id);
      return !idSet.includes(user.id);
    });
    const userTimezone = moment.tz.guess(true);
    const formatedTimezone = moment.tz(userTimezone).format('z');

    return (
      <PageModal keyboard={false} size={'full'}>
        <div ref={this.modalRef} className="office_hours">
          <OfficeHoursHeader
            jumpToDay={this.handleJumpToDay}
            addUser={this.addUser}
            availableUsers={availableUsers}
            formatedTimezone={formatedTimezone}
          />
          <OfficeHoursUserSegment
            currentUser={currentUser}
            availableUsers={availableUsers}
            addUser={this.addUser}
            removeUser={this.removeUser}
          />
          <OfficeHoursDaySegment
            activeDate={activeDate}
            setActiveDate={this.setActiveDate}
            currentUser={currentUser}
          />
          <OfficeHoursTimeSegment
            userTimezone={userTimezone}
            activeDate={activeDate}
            currentUser={currentUser}
          />
        </div>
      </PageModal>
    );
  }
}

const mapState = state => {
  const { user, officeHours } = stateMappings(state);

  // getUserOfficeHours(user.id);
  // getAllOfficeHours();

  return {
    currentUser: user,
    people: getPeopleArray(state),
    selectedUsers: officeHours.selectedUsers
  };
};

const mapDispatch = {
  setOfficeHoursModalOpen,
  setUsers
};

export default connect(mapState, mapDispatch)(OfficeHoursModal);
