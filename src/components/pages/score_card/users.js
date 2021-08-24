import React from 'react';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import UserAvatar from 'Src/components/shared/users/elements/UserAvatar.js';
import { getPeopleArray } from 'Src/newRedux/database/people/selectors';

const Users = ({ selectedUser, setSelectedUser, people }) => {
  return (
    <div className="user-wrapper">
      <div>
        <img
          className="score-user-all"
          src="/images/all_user.svg"
          alt="all user"
          onClick={() =>
            setSelectedUser({
              id: 'All',
              attributes: {
                name: 'All Users'
              }
            })
          }
        />
        {selectedUser && selectedUser.id == 'All' && (
          <div className="hr-line"></div>
        )}
      </div>
      {people.map(person => (
        <div key={person.id}>
          <UserAvatar
            user={person}
            showTooltip
            size={40}
            margin={8}
            canClick
            onClick={() => setSelectedUser(person)}
          />
          {selectedUser && person.id == selectedUser.id && (
            <div className="hr-line"></div>
          )}
        </div>
      ))}
    </div>
  );
};

const mapState = state => {
  const sm = stateMappings(state);
  return {
    people: getPeopleArray(state)
  };
};
export default connect(mapState)(Users);
