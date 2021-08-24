import { useEffect, useState } from 'react';

import useScript from '../../../../hooks/useScript';

const useJitsi = ({
  avatarUrl,
  displayName,
  videoRoomId,
  containerId,
  jitsiApi,
  setJitsiApi,
  topicTitle,
  callEndedCb,
  videoRoomName
}) => {
  // const [jitsiApi, setJitsiApiInternal] = useState(null);

  const [loaded] = useScript('https://meet.jit.si/external_api.js');
  const [lastRoomLoaded, setLastRoomLoaded] = useState(null);

  useEffect(() => {
    if (!displayName) {
      return;
    }

    // eslint-disable-next-line no-undef
    // const prefix = window.APP_ENV;
    // const prefixStr = prefix !== undefined ? `-${prefix}` : '';

    const roomName = `${videoRoomId}`;

    if (loaded && lastRoomLoaded !== roomName) {
      // dispose existing jitsi
      if (jitsiApi) {
        jitsiApi.executeCommand('hangup');
        jitsiApi.dispose();
      }

      const domain = 'meet.jit.si';
      const options = {
        roomName,
        parentNode: document.querySelector(containerId),
        interfaceConfigOverwrite: {
          // filmStripOnly: true,
          DEFAULT_REMOTE_DISPLAY_NAME: 'FRIYAY',
          enableWelcomePage: false,
          SHOW_CHROME_EXTENSION_BANNER: false,
          // DEFAULT_BACKGROUND: '#ff0000',
          TOOLBAR_BUTTONS: [
            'microphone',
            'camera',
            'closedcaptions',
            'desktop',
            'fullscreen',
            'fodeviceselection',
            'hangup',
            'profile',
            'chat',
            'recording',
            'livestreaming',
            'etherpad',
            'sharedvideo',
            'settings',
            'raisehand',
            'videoquality',
            'filmstrip',
            'invite',
            'feedback',
            'stats',
            'shortcuts',
            'tileview',
            'videobackgroundblur',
            'download',
            'help',
            'mute-everyone',
            'e2ee',
            'info'
          ],
          SHOW_JITSI_WATERMARK: false,
          SHOW_WATERMARK_FOR_GUESTS: false,
          SHOW_BRAND_WATERMARK: true,
          BRAND_WATERMARK_LINK:
            'https://static.wixstatic.com/media/3dd5cb_4de2746f559f4a679cb1258800b2028e~mv2.png/v1/fill/w_238,h_106,al_c,q_95/Friyay-04.webp'
          // SHOW_POWERED_BY: ,
          // DISABLE_VIDEO_BACKGROUND: true,
          // TOOLBAR_ALWAYS_VISIBLE: true,
          // SUPPORT_URL: 'https://github.com/jitsi/jitsi-meet/issues/new',
        }
      };

      // TRY: You can disable it as follows: use a URL like so https://meet.jit.si/test123#config.p2p.enabled=false

      // eslint-disable-next-line no-undef
      const api = new JitsiMeetExternalAPI(domain, options);
      /* eslint-enable no-undef */
      api.executeCommand('displayName', displayName);
      api.executeCommand(
        'subject',
        `Friyay | ${topicTitle} | ${videoRoomName}`
      );
      if (avatarUrl) {
        api.executeCommand('avatarUrl', avatarUrl);
      }
      api.addEventListener('videoConferenceLeft', event => {
        if (callEndedCb) {
          callEndedCb(event);
        }
        // handleCallEnded();
      });
      api.addEventListener('readyToClose', event => {
        // console.log('readyToClose: ', event);
        if (callEndedCb) {
          callEndedCb(event);
        }
        // handleCallEnded();
      });

      setLastRoomLoaded(roomName);
      setJitsiApi(api);
      // setJitsiApiInternal(api);
    }
    return () => {
      // console.log('jitsi api', jitsiApi);
      // if (jitsiApi) {
      //   jitsiApi.executeCommand('hangup');
      //   jitsiApi.dispose();
      // }
    };
  }, [
    loaded,
    jitsiApi,
    setJitsiApi,
    displayName,
    avatarUrl,
    videoRoomId,
    lastRoomLoaded,
    callEndedCb,
    containerId,
    topicTitle,
    videoRoomName
  ]);

  return jitsiApi;
};

export default useJitsi;
