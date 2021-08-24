import api from './apiCalls';
import { addFriyayTemplates } from './actions';

export const setDefaultTemplates = arr => async (dispatch, getState) => {
  console.log('Got here');
  try {
    let templates = await api.fetchDefaultTemplates();
    const data = templates.data.data;
    console.log('templates data', data);
    dispatch(addFriyayTemplates(data));
    // dispatch(addFriyayTemplates(arr));
    console.log('And here');
  } catch (error) {
    console.error(error);
    return null;
  }
};
