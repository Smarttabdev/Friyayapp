import * as actions from 'Src/newRedux/presence/actions';

export default (message, dispatch, getState) => ({
  presences: () => {
    const channels = message.data;
    dispatch(actions.updatePresences({ channels }));
  }
});
