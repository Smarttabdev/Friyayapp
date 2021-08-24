import { createSelector } from 'reselect';

export const getInvitations = state => state._newReduxTree.database.invitations;

export const getPendingEmails = createSelector(
  state => getInvitations(state),
  invitations => invitations.pendingEmails
);
