import React from 'react';
import cn from 'classnames';

import BackButton from '../BackButton';
import '../styles.module.scss';

export const typesMap = {
  post: {
    icon: 'featured_play_list',
    iconOutlined: true
  },
  comment: {
    icon: 'forum',
    iconOutlined: true
  },
  event: {
    icon: 'hashtag',
    iconOutlined: true
  }
};

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

class Trending extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div styleName="panel trending">
        <div styleName="topbar">
          <BackButton />
          <div styleName="title">Trending in Promotion project</div>
        </div>
        <div styleName="panel-main trending-list">
          {data.map((item, i) => {
            const type = typesMap[item.type];
            return (
              <div
                key={i}
                styleName={cn('list-item trending-item', `type-${item.type}`)}
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
  }
}

export default Trending;
