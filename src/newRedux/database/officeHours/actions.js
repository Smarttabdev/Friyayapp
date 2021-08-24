import actionTypes from './actionEnum';

export const updateActiveDateOfficeHours = hours => ({
  type: actionTypes.updateActiveDateOfficeHours,
  payload: hours
});

export const setUsers = users => ({
  type: actionTypes.setUsers,
  payload: users
});
