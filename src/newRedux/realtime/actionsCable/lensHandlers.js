import * as actions from 'Src/newRedux/database/lenses/actions';

export default (message, dispatch, getState) => ({
  lens_created: () => {
    const { data: lens } = message.data;
    dispatch(actions.createLens(lens));
  },
  lens_updated: () => {
    const {
      data: { id, attributes }
    } = message.data;
    dispatch(actions.updateLens({ id, attributes }));
  },
  lens_deleted: () => {
    const { lens_id: lensId } = message.data;
    dispatch(actions.deleteLens(lensId));
  }
});
