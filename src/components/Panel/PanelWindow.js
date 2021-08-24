import React from 'react';
import PropTypes from 'prop-types';

import UserActivity from './Panels/UserActivity';
import Trending from './Panels/Trending';
import ToDo from './Panels/ToDo';
import Recent from './Panels/Recent';
import OnlineUsers from './Panels/OnlineUsers';
import Comments from './Panels/Comments';

import './styles.module.scss';

export const panels = {
  default: {
    render: () => null
  },
  // trending: {
  //   icon: 'trending_up',
  //   iconColor: '#b3ebde',
  //   render: props => <Trending {...props} />
  // },
  // recent: {
  //   icon: 'access_time',
  //   iconColor: '#f3ad6f',
  //   render: props => <Recent {...props} />
  // },
  // todo: {
  //   icon: 'assignment_turned_in',
  //   iconOutlined: true,
  //   iconColor: '#f0d274',
  //   render: props => <ToDo {...props} />
  // },
  // activity: {
  //   icon: 'flash_on',
  //   iconColor: '#51cbf2',
  //   render: props => <UserActivity {...props} />
  // },
  comments: {
    icon: 'forum',
    iconOutlined: true,
    iconColor: '#9f5ae1',
    render: props => <Comments {...props} />
  }
  // users: {
  //   icon: 'group',
  //   iconOutlined: true,
  //   iconColor: '#4dcdc6',
  //   render: props => <OnlineUsers {...props} />
  // }
};

class PanelWindow extends React.Component {
  constructor(props) {
    super(props);
  }

  renderPanel = () => {
    const { activePanel } = this.props;
    return panels[activePanel || 'default'].render();
  };

  render() {
    return <div styleName="panel-window">{this.renderPanel()}</div>;
  }
}

PanelWindow.propTypes = {
  activePanel: PropTypes.any,
  setActivePanel: PropTypes.func.isRequired
};

export default PanelWindow;
