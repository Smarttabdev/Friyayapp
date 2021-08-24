import { setPendingEmails } from './actions';
import api from './apiCalls';
import { failure } from 'Utils/toast';

export const getPendingEmails = () => async (dispatch, getState) => {
  try {
    const response = await api.fetchPendingEmails();
    dispatch(setPendingEmails(response.data.data));
    return response.data;
  } catch (error) {
    failure('Unable to load pending invitations');
    return null;
  }
};
