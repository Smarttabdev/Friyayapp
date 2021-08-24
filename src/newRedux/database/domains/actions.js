import actionTypes from './actionEnum';

export const addDomains = normalizedRecords => ({
  type: actionTypes.add,
  payload: normalizedRecords
});

export const domainUpdate = updatedDomain => ({
  type: actionTypes.change,
  payload: updatedDomain
});

export const updateDomain = domain => ({
  type: actionTypes.update,
  payload: domain
});

export const addDomainDesign = workspaceDesign => ({
  type: actionTypes.addDesign,
  payload: workspaceDesign
});

export const updateDomainDesign = payload => ({
  type: actionTypes.updateDesign,
  payload
});

export const removeDomainDesign = workspaceDesign => ({
  type: actionTypes.deleteDesign,
  payload: workspaceDesign
});

export const activateDomainDesign = payload => ({
  type: actionTypes.activateDesign,
  payload
});

export const setDefaultDesign = payload => ({
  type: actionTypes.setDefaultDesign,
  payload
});

export const updateDomainUiSettings = payload => ({
  type: actionTypes.updateDomainUiSettings,
  payload
});

export const updateDomainFilterSettings = payload => ({
  type: actionTypes.updateDomainFilterSettings,
  payload
});

export const setCustomDomainLens = payload => ({
  type: actionTypes.setCustomDomainLens,
  payload
});

export const updateOrderSettings = payload => ({
  type: actionTypes.updateOrderSettings,
  payload
});
