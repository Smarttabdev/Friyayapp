/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import Notification from 'react-web-notification';
import { hideDesktopNotification } from 'Src/newRedux/database/notifications/actions';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { showNotificationModal } from 'Src/newRedux/database/notifications/thunks';

const desktopNotificationTimeout = 6000;

const DesktopNotification = ({
  latestNotificationBody,
  hideDesktopNotificationDispatch,
  showNotificationModalDispatch,
  showDesktopNotificationState
}) => {
  let showDesktopNotificationPreference = true;
  try {
    let desktopNotificationPreference =
      localStorage.getItem('show_desktop_notification') || 'always';
    showDesktopNotificationPreference =
      desktopNotificationPreference !== 'never';
  } catch (error) {
    showDesktopNotificationPreference = true;
  }

  // just in case you disable notification on active page
  React.useEffect(() => {
    const timeoutId = showDesktopNotificationState
      ? setTimeout(() => {
          hideDesktopNotificationDispatch();
        }, desktopNotificationTimeout)
      : '';
    return () => (timeoutId ? clearTimeout(timeoutId) : undefined);
  }, [hideDesktopNotificationDispatch, showDesktopNotificationState]);

  const [ignorePermissions, setIgnorePermissions] = useState(false);

  const handlePermissionGranted = () => {
    console.log('Permission Granted');
    setIgnorePermissions(false);
  };

  const handlePermissionDenied = () => {
    console.log('Permission Denied');
    setIgnorePermissions(true);
  };

  const handleNotSupported = () => {
    console.log('Web Notification not Supported');
    setIgnorePermissions(true);
  };

  const handleNotificationOnClick = (e, tag) => {
    console.log(e, 'Notification clicked tag:' + tag);
    showNotificationModalDispatch();
    hideDesktopNotificationDispatch();
  };

  const handleNotificationOnError = (e, tag) => {
    console.log(e, 'Notification error tag:' + tag);
    hideDesktopNotificationDispatch();
  };

  const handleNotificationOnClose = (e, tag) => {
    console.log(e, 'Notification closed tag:' + tag);
    hideDesktopNotificationDispatch();
  };

  const handleNotificationOnShow = (e, tag) => {
    // this.playSound();
    console.log(e, 'Notification shown tag:' + tag);
  };

  // playSound(filename){
  //   document.getElementById('sound').play();
  // }

  // ignore if
  // no permission is given or
  // preference is disabled or
  // store has show notification to false
  return (
    <Notification
      ignore={
        ignorePermissions ||
        !showDesktopNotificationPreference ||
        !showDesktopNotificationState
      }
      // disableActiveWindow={true}
      notSupported={handleNotSupported}
      onPermissionGranted={handlePermissionGranted}
      onPermissionDenied={handlePermissionDenied}
      onShow={handleNotificationOnShow}
      onClick={handleNotificationOnClick}
      onClose={handleNotificationOnClose}
      onError={handleNotificationOnError}
      timeout={desktopNotificationTimeout}
      title={latestNotificationBody.title ? latestNotificationBody.title : ''}
      options={{
        ...latestNotificationBody,
        renotify: true
      }}
      // swRegistration={this.props.swRegistration}
    />
  );
};

const mapState = state => {
  const { notifications } = stateMappings(state);
  return {
    showDesktopNotificationState: notifications.showDesktopNotification,
    latestNotificationBody: notifications.latestNotificationBody
  };
};

const mapDispatchToProps = {
  hideDesktopNotificationDispatch: hideDesktopNotification,
  showNotificationModalDispatch: showNotificationModal
};

export default connect(mapState, mapDispatchToProps)(DesktopNotification);
