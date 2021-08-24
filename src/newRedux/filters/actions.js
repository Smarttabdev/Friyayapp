import actionTypes from './actionEnum';

export const setFilterSettings = payload => ({
  type: actionTypes.setFilterSettings,
  payload
});

export const setShowFilterPanel = payload => ({
  type: actionTypes.setShowFiltersPanel,
  payload
});

export const setRightFiltersMenuOpen = payload => ({
  type: actionTypes.setRightFiltersMenuOpen,
  payload
});

export const setRightFiltersDefaultSubmenuState = payload => ({
  type: actionTypes.setRightFiltersDefaultSubmenuState,
  payload
});

export const setRightFiltersMenuOpenExpanded = payload => ({
  type: actionTypes.setRightFiltersMenuOpenExpanded,
  payload
});

export const setWorkspaceHomeSearchQuery = payload => ({
  type: actionTypes.setWorkspaceHomeSearchQuery,
  payload
});
