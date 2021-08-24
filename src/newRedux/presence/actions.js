import actionTypes from './actionEnum';

export const updatePresences = ({ channels }) => ({
  type: actionTypes.updatePresences,
  payload: { channels }
});

export const clearPresences = () => ({
  type: actionTypes.clearPresences
});
