import React, { useState } from 'react';
import GroupUpdateFormPage from 'Src/components/pages/group_update_form_page';
import UserAvatar from 'Components/shared/users/elements/UserAvatar';
import DomainLogo from 'Src/components/shared/DomainLogo';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import urlHelper from 'Src/helpers/url_helper';

export default function TeamContainer({ group, people, pathname = '/' }) {
  const [isAddMemberOpen, setisAddMemberOpen] = useState(false);
  const memberList = () => {
    return group.relationships.user_followers.data.map(key => {
      return (
        <UserAvatar
          key={key}
          user={people[key]}
          margin={3}
          tooltipText={people[key].attributes.name}
          tooltipStyle={{ top: '3rem', left: '2rem' }}
        />
      );
    });
  };
  return (
    <div className="team-container">
      <div className="team-content">
        <div>
          <div className="link-tooltip-container update-section">
            <div
              style={{ color: '#DADADA' }}
              className="material-icons invite-person-icon"
              onClick={() => setisAddMemberOpen(!isAddMemberOpen)}
            >
              person_add
            </div>
            <span className="link-tooltip top" style={{ marginLeft: '-6rem' }}>
              Add Team Member
            </span>
          </div>
        </div>
        <div className="member-list">{memberList()}</div>
        <div>
          <Link to={urlHelper(pathname, group.attributes.slug, 'team')}>
            <h5>{group.attributes.title}</h5>
          </Link>

          <DomainLogo
            name={group.attributes.title}
            componentClass="team-logo"
            rounded
          />
        </div>
      </div>
      {isAddMemberOpen && (
        <GroupUpdateFormPage
          group={group}
          onClose={() => setisAddMemberOpen(false)}
          isMemberActive
        />
      )}
    </div>
  );
}

TeamContainer.propTypes = {
  group: propTypes.object,
  people: propTypes.object,
  pathname: propTypes.string
};
