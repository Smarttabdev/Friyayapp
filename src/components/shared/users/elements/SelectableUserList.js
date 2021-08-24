import React, { PureComponent } from 'react';
import { getPeopleArray } from 'Src/newRedux/database/people/selectors';
import { toggleItemInclusionInArray } from 'Lib/utilities';

import withDataManager from 'Src/dataManager/components/withDataManager';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { setUserInvitationModalOpen } from 'Src/newRedux/interface/modals/actions';
import { getPendingEmails } from 'Src/newRedux/database/invitations/selectors';
import UserAvatar from './UserAvatar';

class SelectableUserList extends PureComponent {
  handleToggleUserSelected = person => {
    const { multiSelect, onChangeSelection, selectedUserIds } = this.props;
    multiSelect
      ? onChangeSelection(
          toggleItemInclusionInArray(person.id, selectedUserIds)
        )
      : onChangeSelection([person.id]);
  };

  render() {
    const {
      people,
      selectedUserIds,
      user,
      setUserInvitationModalOpen,
      pendingEmails
    } = this.props;

    const pendingUsers = pendingEmails.map(email => ({
      id: email
    }));
    const users = people.concat(pendingUsers);

    return (
      <div className="selectable-user-list">
        {users.map(person => (
          <a
            className="selectable-user-list_row"
            key={person.id}
            onClick={() => this.handleToggleUserSelected(person)}
          >
            <UserAvatar showName userId={person.id} noTooltip={true} />
          </a>
        ))}
        <div
          className="selectable-user-list_row pointer"
          onClick={() => setUserInvitationModalOpen(user.id)}
        >
          <div className="flex-r-center-start">
            <i
              className="material-icons ml1"
              style={{ fontSize: 22, marginTop: 2, alignSelf: 'baseline' }}
            >
              person_add
            </i>
            <span className="pl11">
              Invite People
              <br />
              <small>
                After the user accepts the invite you will be able to assign
                Cards.
              </small>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

const dataRequirements = () => ({
  pendingInvitationEmails: {}
});

const mapState = (state, props) => {
  const { user } = stateMappings(state);
  return {
    user,
    people: props.users || getPeopleArray(state),
    pendingEmails: getPendingEmails(state)
  };
};

const mapDispatch = {
  setUserInvitationModalOpen
};

export default withDataManager(
  dataRequirements,
  mapState,
  mapDispatch
)(SelectableUserList);
