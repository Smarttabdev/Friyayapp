import enums from './actionEnum';

export const fetchLenses = payload => ({
  type: enums.fetchAll,
  payload
});

export const updateLens = payload => ({
  type: enums.update,
  payload
});

export const deleteLens = payload => ({
  type: enums.delete,
  payload
});

export const fetchLens = payload => ({
  type: enums.fetch,
  payload
});

export const createLens = payload => ({
  type: enums.add,
  payload
});
