import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Icon from 'Components/shared/Icon';
import { panels } from './PanelWindow';

import './styles.module.scss';

const panelOrder = [
  // 'trending',
  // 'recent',
  // 'todo',
  // 'activity',
  'comments'
  // 'users'
];

const ThreeDots = () => (
  <span styleName="three-dots">
    <span />
    <span />
    <span />
  </span>
);

const ActivityBar = ({ activePanel, setActivePanel }) => {
  const [showIcons, setShowIcons] = useState(false);
  // const unreadCount = 12;

  const handleCaretClick = () => setShowIcons(!showIcons);

  return (
    <div styleName={cn('activity-bar', showIcons && 'show-icons')}>
      <div styleName="caret" onClick={handleCaretClick}>
        <Icon
          icon={showIcons ? 'caret-down' : 'caret-up'}
          color="#4f4e4e"
          fontAwesome
        />
      </div>
      {/* {!!unreadCount && <div styleName="recent-badge">{unreadCount}</div>} */}
      <div styleName="activity-icons">
        <div styleName="btn close-btn" onClick={() => setActivePanel()}>
          <i className="material-icons">close</i>
        </div>
        {panelOrder.map(id => {
          const panel = panels[id];
          return (
            <div
              key={id}
              styleName={cn('btn', id === activePanel && 'active')}
              onClick={() => setActivePanel(id)}
            >
              <i
                className={
                  panel.iconOutlined
                    ? 'material-icons-outlined'
                    : 'material-icons'
                }
                style={{ color: panel.iconColor }}
              >
                {panel.icon}
              </i>
              {id === 'comments' && <div styleName="indicator right red" />}
            </div>
          );
        })}
      </div>
      <ThreeDots />
    </div>
  );
};

ActivityBar.propTypes = {
  activePanel: PropTypes.any,
  setActivePanel: PropTypes.func.isRequired
};

export default ActivityBar;
