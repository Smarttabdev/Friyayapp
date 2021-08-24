import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { stateMappings } from 'Src/newRedux/stateMappings';
import ErrorBoundary from 'Components/shared/errors/ErrorBoundary';
import get from 'lodash/get';

export class UserAvatar extends Component {
  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick();
      return;
    }
    const { canClick, rootUrl, routerHistory, user } = this.props;
    const baseUrl = rootUrl == '/' ? rootUrl : rootUrl + '/';
    if (canClick) {
      routerHistory.push(`${baseUrl}users/${user.id}`);
    }
  };

  render() {
    const {
      canClick,
      margin,
      people,
      showName,
      size,
      style,
      avatarUrl,
      userId,
      tooltipText,
      color,
      noTooltip,
      isCounter,
      noPointer,
      marginTop,
      tooltipStyle,
      firstName
    } = this.props;

    let user = this.props.user || people[userId] || (userId ? null : {});
    const name = user
      ? user.attributes
        ? user.attributes[firstName ? 'first_name' : 'name']
        : user[firstName ? 'firstName' : 'name'] || user.name || '-'
      : `${userId} (pending)`;

    const baseStyle = {
      width: size,
      height: size,
      lineHeight: `${size}px`,
      backgroundColor: color
    };
    const tooltipToShow =
      tooltipText === false
        ? tooltipText
        : tooltipText || (name == '-' ? '' : name);

    let circle = (
      <span className="avatar-letter" style={{ ...baseStyle, ...style }}>
        {!isCounter ? name.charAt(0).toUpperCase() : name}
      </span>
    );

    if (avatarUrl) {
      circle = (
        <img
          style={style}
          src={avatarUrl}
          className="user-avatar_image"
          width={size}
          height={size}
        />
      );
    }

    return (
      <ErrorBoundary>
        <div
          className={`mr${margin} mt${marginTop} link-tooltip-container flexCenter`}
          style={{ cursor: noPointer && 'default' }}
        >
          {canClick ? (
            <a onClick={this.handleClick} className="user-avatar_link">
              {tooltipToShow ? (
                noTooltip ? null : (
                  <div className="card-due-date-label__tooltip link-tooltip">
                    {tooltipToShow}
                  </div>
                )
              ) : null}
              {circle}
              {showName && <span className="pl10">{name}</span>}
            </a>
          ) : (
            <div className="user-avatar_link">
              {tooltipToShow ? (
                noTooltip ? null : (
                  <div
                    className="card-due-date-label__tooltip link-tooltip"
                    style={{ ...tooltipStyle }}
                  >
                    {tooltipToShow}
                  </div>
                )
              ) : null}
              {circle}
              {showName && <span className="pl10">{name}</span>}
            </div>
          )}
        </div>
      </ErrorBoundary>
    );
  }
}

UserAvatar.propTypes = {
  user: PropTypes.object,
  // userId: PropTypes.string,
  size: PropTypes.number,
  showName: PropTypes.bool,
  onClick: PropTypes.func,
  readonly: PropTypes.bool,
  style: PropTypes.object,
  margin: PropTypes.number,
  showTooltip: PropTypes.bool
};

UserAvatar.defaultProps = {
  user: null,
  size: 25,
  showName: false,
  style: {},
  // margin: 10
  margin: 5
};

const mapState = (state, props) => {
  const sm = stateMappings(state);

  let appUserData = {};
  if (props.user) {
    appUserData = sm.user.id === props.user.id ? sm.user : props.user;
  }
  let peopleData = sm.people ? sm.people[props.userId] : {};
  peopleData = peopleData != undefined ? peopleData : {};
  const user =
    Object.entries(appUserData).length === 0 ? peopleData : appUserData;

  let oldAvatarUrl = '';
  if (get(user, 'avatar_url')) {
    oldAvatarUrl = user.avatar_url;
  } else if (get(user, 'attributes.avatar_url', user?.avatarUrl)) {
    oldAvatarUrl = user?.avatarUrl || user.attributes?.avatar_url;
  }

  const avatarUrl = get(
    user,
    'relationships.user_profile.data.attributes.avatar_url',
    oldAvatarUrl
  );
  return {
    rootUrl: sm.page.rootUrl,
    routerHistory: sm.routing.routerHistory,
    people: sm.people,
    avatarUrl
  };
};

export default connect(mapState)(UserAvatar);
