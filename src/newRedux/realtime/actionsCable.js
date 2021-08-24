import { isEqual } from 'lodash';

import { clearPresences } from 'Src/newRedux/presence/actions';

import userHandlers from './actionsCable/userHandlers';
import presenceHandlers from './actionsCable/presenceHandlers';
import topicHandlers from './actionsCable/topicHandlers';
import cardHandlers from './actionsCable/cardHandlers';
import topicOrderHandlers from './actionsCable/topicOrderHandlers';
import labelOrderHandlers from './actionsCable/labelOrderHandlers';
import chatMessageHandlers from './actionsCable/chatMessageHandlers';
import lensHandlers from './actionsCable/lensHandlers';
import labelHandlers from './actionsCable/labelHandlers';
import commentHandlers from './actionsCable/commentHandlers';

let clientId;
let isConnected;
let joinedChannels = [];
let id = 0;

const leaveMap = {};

export const getRealtimeChannelParams = params => ({
  channel: 'RealtimeChannel',
  params: { client_id: clientId, id, ...params }
});

const received = (message, dispatch, getState) => {
  const handlers = {
    client_id: () => {
      const { client_id: newClientId } = message.data;
      const oldClientId = clientId;

      clientId = newClientId;

      leaveMap[oldClientId || '0']();

      dispatch(joinRealtime(newClientId));
      leaveMap[oldClientId || '0'] = leaveMap[newClientId];
      delete leaveMap[newClientId];

      isConnected = false;
    },
    messages: () => {
      const { messages, channel } = message.data;

      messages.forEach(message => received(message, dispatch, getState));

      const lastTimestamp =
        messages.length && messages[messages.length - 1].timestamp;

      lastTimestamp && dispatch(ackMessages(channel, lastTimestamp));
    },
    ...userHandlers(message, dispatch, getState),
    ...presenceHandlers(message, dispatch, getState),
    ...topicHandlers(message, dispatch, getState),
    ...cardHandlers(message, dispatch, getState),
    ...topicOrderHandlers(message, dispatch, getState),
    ...labelOrderHandlers(message, dispatch, getState),
    ...chatMessageHandlers(message, dispatch, getState),
    ...lensHandlers(message, dispatch, getState),
    ...labelHandlers(message, dispatch, getState),
    ...commentHandlers(message, dispatch, getState)
  };

  if (handlers[message.type]) {
    handlers[message.type]();
  } else {
    throw Error(`Unknown message ${JSON.stringify(message)}`);
  }
};

const connected = (dispatch, getState) => {
  isConnected = true;
  rejoinChannels(dispatch);
};

const disconnected = (dispatch, getState) => {
  isConnected = false;
  dispatch(clearPresences());
};

const rejoinChannels = dispatch => {
  clientId &&
    isConnected &&
    joinedChannels.forEach(c => {
      dispatch(_joinRealtimeChannel(clientId, c.type, c.id));
    });
};

const _joinRealtime = client_id => ({
  ...getRealtimeChannelParams({ client_id }),
  received,
  connected,
  disconnected
});

const _leaveRealtime = (client_id, id) => ({
  ...getRealtimeChannelParams({ client_id, id }),
  leave: true
});

const _joinRealtimeChannel = (client_id, type, id) => ({
  ...getRealtimeChannelParams({ client_id }),
  call: {
    action: 'join',
    data: { type, id }
  }
});

const _leaveRealtimeChannel = (client_id, type, id) => ({
  ...getRealtimeChannelParams({ client_id }),
  call: {
    action: 'leave',
    data: { type, id }
  }
});

const _ackMessages = (client_id, channel, timestamp) => ({
  ...getRealtimeChannelParams({ client_id }),
  call: {
    action: 'ack_messages',
    data: { channel, timestamp }
  }
});

export const joinRealtime = newClientId => (dispatch, getState) => {
  const cid = newClientId || clientId;

  id++;
  dispatch(_joinRealtime(cid));

  const createLeaveRealtime = (clientId, id) => {
    leaveMap[clientId || '0'] = () => {
      dispatch(_leaveRealtime(clientId, id));
      delete leaveMap[clientId || '0'];
    };
  };

  createLeaveRealtime(cid, id);

  return () => leaveMap[cid || '0']();
};

export const joinRealtimeChannel = (type, id) => (dispatch, getState) => {
  const channel = { type, id };

  if (joinedChannels.find(c => isEqual(c, channel))) {
    return;
  }

  joinedChannels.push(channel);

  clientId && isConnected && dispatch(_joinRealtimeChannel(clientId, type, id));
};

export const leaveRealtimeChannel = (type, id) => (dispatch, getState) => {
  const channel = { type, id };

  if (!joinedChannels.find(c => isEqual(c, channel))) {
    return;
  }

  dispatch(_leaveRealtimeChannel(clientId, type, id));

  const index = joinedChannels.findIndex(c => isEqual(c, channel));
  joinedChannels.splice(index, 1);
};

export const ackMessages = (channel, timestamp) => (dispatch, getState) => {
  // console.log(clientId, channel, timestamp);
  clientId && dispatch(_ackMessages(clientId, channel, timestamp));
};
