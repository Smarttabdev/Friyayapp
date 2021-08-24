import React from 'react';
import cn from 'classnames';

import BackButton from '../BackButton';
import { typesMap } from './Trending.js';
import '../styles.module.scss';

const data = [
  {
    type: 'post',
    text: '16 best ways to avoid unhappy customers'
  },
  {
    type: 'comment',
    text: 'Fix this issue'
  },
  {
    type: 'post',
    text: 'Blog post'
  },
  {
    type: 'post',
    text: 'Youtube video'
  },
  {
    type: 'event',
    text: 'Club event'
  },
  {
    type: 'event',
    text: 'Party invites'
  }
];

const Recent = () => {
  return (
    <div styleName="panel recent">
      <div styleName="topbar">
        <BackButton />
        <div styleName="title">Recent in Promotion project</div>
      </div>
      <div styleName="panel-main recent-list">
        {data.map((item, i) => {
          const type = typesMap[item.type];
          return (
            <div
              key={i}
              styleName={cn('list-item recent-item', `type-${item.type}`)}
            >
              <i
                className={
                  type.iconOutlined
                    ? 'material-icons-outlined'
                    : 'material-icons'
                }
                styleName="icon"
              >
                {type.icon}
              </i>
              <div styleName="text">{item.text}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Recent;
