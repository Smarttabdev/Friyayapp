import React from 'react';
import cn from 'classnames';

import BackButton from '../BackButton';
import ExpandButton from '../ExpandButton';
import SampleAvatarUrl from 'Src/assets/images/portrait.jpg';
import '../styles.module.scss';

const typesMap = {
  completed: {
    label: 'Completed'
  },
  edited: {
    label: 'Edited'
  },
  newCard: {
    label: 'New card'
  },
  updateAdded: {
    label: 'Update added'
  },
  labelAdded: {
    label: 'Label added'
  }
};

const data = [
  {
    type: 'completed',
    author: 'Jason',
    text: '16 best ways to avoid unhappy customers',
    avatarUrl: SampleAvatarUrl,
    date: moment().subtract(5, 'seconds')
  },
  {
    type: 'edited',
    author: 'Jason',
    text: 'Signup with Google drive is broken',
    avatarUrl: SampleAvatarUrl,
    date: moment().subtract(5, 'minutes')
  },
  {
    type: 'newCard',
    author: 'Sylvia',
    text: 'Branding',
    avatarUrl: SampleAvatarUrl,
    date: moment().subtract(3, 'hours')
  },
  {
    type: 'updateAdded',
    author: 'Tamara',
    text: 'Templates for sales teams',
    avatarUrl: SampleAvatarUrl,
    date: moment().subtract(1, 'day')
  },
  {
    type: 'labelAdded',
    author: 'Tamara',
    text: 'Template for sales teams',
    avatarUrl: SampleAvatarUrl,
    date: moment().subtract(3, 'days'),
    label: 'In Development'
  }
];

class UserActivity extends React.Component {
  constructor(props) {
    super(props);
  }

  formatDate = date => {
    date = moment(date);
    const today = moment().startOf('day');
    if (date.isBefore(today)) {
      return date.format('MMMM D');
    }
    return date.format('H:mmA');
  };

  render() {
    return (
      <div styleName="panel user-activity">
        <div styleName="topbar">
          <BackButton />
          <div styleName="title">Activity in Promotion project</div>
          <ExpandButton styleName="expand-btn" />
        </div>
        <div styleName="panel-main activity-list">
          {data.map((item, i) => {
            const type = typesMap[item.type];
            return (
              <div
                key={i}
                styleName={cn('list-item activity-item', `type-${item.type}`)}
              >
                <img styleName="avatar" src={item.avatarUrl} />
                <div styleName="author">{item.author}</div>
                <div styleName="label">
                  {type.label} {item.type === 'labelAdded' && item.label}
                </div>
                <div styleName="text">{item.text}</div>
                <div styleName="time">{this.formatDate(item.date)}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default UserActivity;
