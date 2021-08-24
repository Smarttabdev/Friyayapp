import React, { Component, Fragment } from 'react';
import UserAvatar from 'Components/shared/users/elements/UserAvatar';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { connect } from 'react-redux';
import ReactSelectCustom from 'Components/shared/ReactSelectCustom';
import reactSelectCustomStyles from 'Components/shared/ReactSelectCustom/reactSelectCustomStyles';
import { getPeopleArray } from 'Src/newRedux/database/people/selectors';
import { isOnline } from 'Lib/utilities';
import { getUserOfficeHours } from 'Src/newRedux/database/user/thunks';
import moment from 'moment-timezone';
import get from 'lodash/get';
import IconButton from 'Components/shared/buttons/IconButton';
import { func, object, array } from 'prop-types';

class OfficeHoursUserSegment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assignedToValues: [],
      selectedUsersData: []
    };
  }

  static propTypes = {
    currentUser: object.isRequired,
    people: array.isRequired,
    selectedUsers: array.isRequired
  };

  addUser = userObj => {
    this.props.addUser(userObj);
  };

  handleRemoveUser = userId => {
    this.props.removeUser(userId);
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

  arrangeUsers = async () => {
    // Objective -- create object with user and timezone
    const { selectedUsers } = this.props;
    const selectedUsersData = await Promise.all(
      selectedUsers.map(async user => {
        let userOfficeHours = await getUserOfficeHours({ userId: user.id });
        let returnValue = { attributes: user };
        userOfficeHours.data == null
          ? (returnValue.timezone = null)
          : (returnValue.timezone = moment
              .tz(get(userOfficeHours, 'data.attributes.timezone'))
              .format('z'));
        return returnValue;
      })
    );
    this.setState({
      selectedUsersData: selectedUsersData
    });
  };

  async componentDidMount() {
    await this.arrangeUsers();
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.selectedUsers != this.props.selectedUsers) {
      await this.arrangeUsers();
    }
  }

  userIsOnline = userId => isOnline(userId, this.props.presence);

  render() {
    const { availableUsers, currentUser } = this.props;
    const { selectedUsersData } = this.state;

    return (
      <div className="office_hours-user_segment">
        {selectedUsersData.map((user, i) => (
          <div key={i} className="office_hours-user">
            <div className="office_hours-user_info">
              <div>{get(user, 'attributes.attributes.name')}</div>
              <div>
                <UserAvatar
                  user={get(user, 'attributes')}
                  margin={0}
                  size={18}
                  tooltipText={false}
                  color="#bbb"
                  noPointer
                />
                <div className="user-timezone">
                  {get(user, 'timezone') ? user.timezone : 'not set'}
                </div>
                <div className="user-online">
                  {this.userIsOnline(get(user, 'attributes.id'))
                    ? 'Online'
                    : null}
                </div>
              </div>
            </div>
            {user.attributes.id != currentUser.id && (
              <div className="remove-user">
                <IconButton
                  icon="close"
                  fontSize="24px"
                  onClick={() => this.handleRemoveUser(user.attributes.id)}
                  height="100%"
                  lineHeight="initial"
                />
              </div>
            )}
          </div>
        ))}
        <ReactSelectCustom
          className="select_people"
          value={[]}
          onChange={this.addUser}
          styles={{
            ...reactSelectCustomStyles,
            control: provided => ({
              ...reactSelectCustomStyles.control(provided),
              border: 'none'
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
          placeholder="Select people..."
        />
      </div>
    );
  }
}

const mapState = state => {
  const { user, presence, officeHours } = stateMappings(state);

  return {
    people: getPeopleArray(state),
    selectedUsers: officeHours.selectedUsers,
    presence
  };
};

export default connect(mapState)(OfficeHoursUserSegment);
