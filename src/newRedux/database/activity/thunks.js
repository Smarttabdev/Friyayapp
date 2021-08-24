import { fetchActivities } from './apiCalls';
import { addActivities } from './actions';

export const getActivities = ({ from, to }) => async (dispatch, getState) => {
  try {
    const activities = await fetchActivities({ from, to });
    dispatch(addActivities(activities.data.data));
  } catch (err) {
    console.log('error fetching', err);
  }
};
