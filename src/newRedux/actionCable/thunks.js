import store from 'Src/store/store';

let id = 1;

export const subscribe = (channel, params = {}) => {
  const paramId = id++;

  store.dispatch({
    channel,
    params: {
      ...params,
      id: paramId
    }
  });

  const unsubscribe = () => {
    store.dispatch({
      channel,
      params: {
        ...params,
        id: paramId
      },
      leave: true
    });
  };

  return unsubscribe;
};
