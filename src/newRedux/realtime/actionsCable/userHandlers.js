import { denormalize } from 'Lib/utilities';
import { addPeople } from 'Src/newRedux/database/people/actions';
import { getPendingEmails } from 'Src/newRedux/database/invitations/thunks';

export default (message, dispatch, getState) => ({
  user_created: async () => {
    const { data, included } = message.data;
    const user = denormalize(data, included);
    dispatch(addPeople({ [user.id]: user }));
    dispatch(getPendingEmails());
  }
});
