import { consumer } from 'Lib/action_cable/cable';

const createReduxMiddleware = () => {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return next(action);
    }

    const { channel, params, leave, call, connected, disconnected } = action;
    let { calls, received } = action;

    if (!channel) {
      return next(action);
    }

    if (!params) {
      throw new Error('missing channel params');
    }

    if (params.channel) {
      throw new Error('params cannot contain channel');
    }

    const getSubscriptions = () => {
      const id = JSON.stringify({ channel, ...params });
      const subs = consumer.subscriptions.findAll(id);
      !subs.length && console.error('No cable subscriptions', action);
      return subs;
    };

    if (leave) {
      const subscriptions = getSubscriptions();
      return subscriptions.forEach(s => s.unsubscribe());
    }

    if (call) {
      calls = calls ? [call, ...calls] : [call];
    }

    if (calls) {
      const subscriptions = getSubscriptions();
      calls.forEach(call => {
        subscriptions.forEach(s => s.perform(call.action, call.data));
      });
    } else {
      if (typeof received === 'string') {
        received = result => dispatch({ type: received, payload: result });
      } else if (typeof received === 'function') {
        const _received = received;
        received = result => _received(result, dispatch, getState);
      }

      const mixin = received && { received };

      if (connected) {
        mixin.connected = () => connected(dispatch, getState);
      }
      if (disconnected) {
        mixin.disconnected = () => disconnected(dispatch, getState);
      }

      consumer.subscriptions.create({ channel, ...params }, mixin);
    }
  };
};

export default createReduxMiddleware;
