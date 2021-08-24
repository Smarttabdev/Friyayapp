import React from 'react';
import cn from 'classnames';
import groupBy from 'lodash/groupBy';

import BackButton from '../BackButton';
import SampleAvatarUrl from 'Src/assets/images/portrait.jpg';

import '../styles.module.scss';

const rolesMap = {
  projectManager: {
    label: 'Project managers'
  },
  developer: {
    label: 'Developers'
  },
  marketer: {
    label: 'Marketers'
  },
  member: {
    label: 'Members'
  }
};

const data = [
  {
    name: 'Jason',
    role: 'projectManager',
    avatarUrl: SampleAvatarUrl,
    lastSeenAt: moment().subtract(5, 'seconds'),
    online: true
  },
  {
    name: 'Sarah',
    role: 'projectManager',
    avatarUrl: SampleAvatarUrl,
    lastSeenAt: moment().subtract(2, 'minutes')
  },
  {
    name: 'Syl',
    role: 'projectManager',
    avatarUrl: SampleAvatarUrl,
    lastSeenAt: moment().subtract(1, 'hour')
  },
  {
    name: 'Jason',
    role: 'developer',
    avatarUrl: SampleAvatarUrl,
    lastSeenAt: moment().subtract(5, 'seconds')
  },
  {
    name: 'Sarah',
    role: 'developer',
    avatarUrl: SampleAvatarUrl,
    lastSeenAt: moment().subtract(2, 'minutes')
  },
  {
    name: 'Syl',
    role: 'developer',
    avatarUrl: SampleAvatarUrl,
    lastSeenAt: moment().subtract(2, 'hours')
  },
  {
    name: 'Jason',
    role: 'marketer',
    avatarUrl: SampleAvatarUrl,
    lastSeenAt: moment().subtract(5, 'seconds')
  },
  {
    name: 'Sarah',
    role: 'marketer',
    avatarUrl: SampleAvatarUrl,
    lastSeenAt: moment().subtract(3, 'minutes')
  },
  {
    name: 'Syl',
    role: 'marketer',
    avatarUrl: SampleAvatarUrl,
    lastSeenAt: moment().subtract(1, 'day')
  },
  {
    name: 'Jason',
    role: 'member',
    avatarUrl: SampleAvatarUrl,
    lastSeenAt: moment().subtract(5, 'seconds')
  },
  {
    name: 'Sarah',
    role: 'member',
    avatarUrl: SampleAvatarUrl,
    lastSeenAt: moment().subtract(2, 'hours')
  },
  {
    name: 'Syl',
    role: 'member',
    avatarUrl: SampleAvatarUrl,
    lastSeenAt: moment().subtract(1, 'week')
  }
];

class OnlineUsers extends React.Component {
  constructor(props) {
    super(props);
  }

  formatDate = date => moment(date).format('H:mmA');

  render() {
    const usersByRole = groupBy(data, user => user.role);
    const roles = Object.keys(usersByRole);
    return (
      <div styleName="panel online-users">
        <div styleName="topbar">
          <BackButton />
          <div styleName="title">People in Promotion project</div>
          <div styleName="roles-btn">
            Roles <span styleName="plus">&#xff0b;</span>
          </div>
        </div>
        <div styleName="panel-main lists">
          {roles.map(role => {
            const users = usersByRole[role];
            return (
              <div key={role} styleName="role-item">
                <div styleName="role">{rolesMap[role].label}</div>
                <div styleName="user-list">
                  {users.map((user, i) => (
                    <div key={i} styleName="user-item">
                      <img styleName="avatar" src={SampleAvatarUrl} />
                      <div styleName="name">{user.name}</div>
                      <div styleName="time">
                        {this.formatDate(user.lastSeenAt)}
                      </div>
                      {user.online && (
                        <span styleName="indicator green left"></span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default OnlineUsers;
