import { normalizeLabel } from 'Src/newRedux/database/labels/schema';
import {
  addLabels,
  changeLabel,
  deleteLabel
} from 'Src/newRedux/database/labels/actions';

export default (message, dispatch, getState) => ({
  label_created: () => {
    const { data: newLabel } = message.data;
    dispatch(
      addLabels(
        normalizeLabel({
          data: {
            data: newLabel
          }
        }).labels
      )
    );
  },
  label_updated: () => {
    const { data: updatedLabel } = message.data;
    dispatch(changeLabel(updatedLabel));
  },
  label_deleted: () => {
    const { label_id: labelId } = message.data;
    dispatch(deleteLabel(labelId));
  }
});
