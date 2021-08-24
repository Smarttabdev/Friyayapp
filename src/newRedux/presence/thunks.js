import store from 'Src/store/store';

let id = 1;

export const joinChannel = room => {
  store.dispatch({
    channel: 'PresenceChannel',
    params: { room, id }
  });

  const createLeaveChannel = (room, id) => () => {
    store.dispatch({
      channel: 'PresenceChannel',
      params: { room, id },
      leave: true
    });
  };

  return createLeaveChannel(room, id++);
};
