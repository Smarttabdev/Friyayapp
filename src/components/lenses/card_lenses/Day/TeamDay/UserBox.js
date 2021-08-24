import React, { Component } from 'react';
import ActivityBox from '../ActivityBox';
import ResultSection from './ResultSection';
import UserAvatar from 'Components/shared/users/elements/UserAvatar';
import get from 'lodash/get';
import IconButton from 'Components/shared/buttons/IconButton';
import SelectableUserList from 'Src/components/shared/users/elements/SelectableUserList';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';

class UserBox extends Component {
  constructor(props) {
    super(props);
    this.dropdownRef = React.createRef();
    this.state = {};
  }
  removeUserBox = () => {
    const order = this.props.selectedUserIds.filter(
      id => id != this.props.user.id
    );
    this.props.updatePeopleOrder(order);
  };

  toggleUserDropdown = () => {
    this.setState(prevState => ({ userDropdown: !prevState.userDropdown }));
  };

  handleSelectUser = userId => {
    const { user, selectedUserIds } = this.props;
    const revisedPeopleOrderPeopleIds = selectedUserIds.filter(
      id => id != userId[0]
    );
    revisedPeopleOrderPeopleIds.splice(
      revisedPeopleOrderPeopleIds.indexOf(user.id),
      1,
      userId[0]
    );
    this.props.updatePeopleOrder(revisedPeopleOrderPeopleIds);
    this.setState({ userDropdow: false });
  };

  isVisible = elem => {
    !!elem &&
      !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
  };

  hideDropdownOnClickOut = element => {
    const outsideClickListener = event => {
      if (!element.contains(event.target) || this.isVisible(element)) {
        this.setState({ userDropdown: false });
        removeClickListener();
      }
    };
    const removeClickListener = () => {
      document.removeEventListener('click', outsideClickListener);
    };
    document.addEventListener('click', outsideClickListener);
  };

  componentDidUpdate() {
    if (this.state.userDropdown) {
      const dropdown = this.dropdownRef.current;
      this.hideDropdownOnClickOut(dropdown);
    }
  }

  render() {
    const { user, users } = this.props;
    const { userDropdown } = this.state;
    return (
      <div className="user_box">
        <div className="activity_section">
          <div className="user">
            <div
              className="user_info"
              onClick={user.id != 'team' ? this.toggleUserDropdown : null}
            >
              {user.id != 'team' && (
                <UserAvatar
                  user={get(user, 'attributes')}
                  margin={0}
                  size={24}
                  tooltipText={false}
                  color="#bbb"
                  noPointer
                />
              )}
              <div
                className="header"
                style={user.id != 'team' ? { marginLeft: '5px' } : {}}
              >
                {user.id != 'team'
                  ? get(user, 'attributes.first_name')
                  : 'Team'}
              </div>
              {user.id != 'team' && (
                <div className="remove">
                  <IconButton
                    icon="close"
                    fontSize="20px"
                    onClick={this.removeUserBox}
                  />
                </div>
              )}
            </div>
            {userDropdown && (
              <div
                className="dropdown-menu label-select-dropdown"
                aria-labelledby="dLabel"
                ref={this.dropdownRef}
              >
                <SelectableUserList
                  onChangeSelection={this.handleSelectUser}
                  users={users}
                />
              </div>
            )}
          </div>
          <ActivityBox user={user} />
        </div>
        <ResultSection {...this.props} />
      </div>
    );
  }
}

const mapState = (state, props) => {
  const {
    people,
    GIDBFLenses: {
      team_plan: { userIds }
    }
  } = stateMappings(state);
  const { cards, user } = props;

  const users = Object.keys(people)
    .map(peopleId => peopleId)
    .map(peopleId => people[peopleId])
    .filter(
      usr => !props.peopleOrderPeopleIds.includes(usr.id) && usr.id != user.id
    );

  const completedCards = cards.filter(
    card => card.attributes.completed_percentage == 100
  );

  return {
    completedCards,
    users
  };
};

const mapDispatch = {};

export default connect(mapState, mapDispatch)(UserBox);
