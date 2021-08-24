import actionTypes from './actionEnum';

export const setPendingEmails = emails => ({
  type: actionTypes.setPendingEmails,
  payload: emails
});

export const mergePendingEmails = emails => ({
  type: actionTypes.mergePendingEmails,
  payload: emails
});
