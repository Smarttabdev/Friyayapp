import {
  addDomains,
  domainUpdate,
  addDomainDesign,
  updateDomainDesign,
  removeDomainDesign,
  activateDomainDesign,
  setDefaultDesign,
  updateDomainUiSettings,
  updateDomainFilterSettings,
  setCustomDomainLens,
  updateOrderSettings
} from './actions';

import analytics from 'Src/lib/analytics';

import {
  fetchDomains,
  postDomain,
  archiveHive,
  deleteHive,
  postDomainDesign,
  putDomainDesign,
  deleteDomainDesign,
  selectDomainDesign,
  defaultDomainDesign
} from './apiCalls';

import { fetchUserConfigurations } from '../user/apiCalls';

import { logRollBarError } from 'Lib/rollbar';
import { normalizeDomain, normalizeDomains } from './schema';
import { success, failure } from 'Utils/toast';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { domainDesignLoader } from 'Src/newRedux/interface/lenses/actions';
import {
  getCustomLensId,
  getFilterSettings,
  getUserConfig
} from 'Src/helpers/user_config';
import {
  updateFilterSettings,
  updateUiSettings,
  selectCustomLens
} from '../topics/apiCalls';
import { get, merge } from 'lodash';
import { viewPayload } from 'Src/utils/views';

export const createDesign = newDomainDesign => async dispatch => {
  try {
    dispatch(domainDesignLoader({ domainDesignLoading: true }));
    const {
      data: { data }
    } = await postDomainDesign(newDomainDesign);
    dispatch(addDomainDesign(data));
    dispatch(activateDomainDesign(data));
    dispatch(domainDesignLoader({ domainDesignLoading: false }));
    return data;
  } catch (error) {
    failure('Unable to create new domain design');
    logRollBarError(error, 'warning', 'Create domain design Error');
    dispatch(domainDesignLoader({ domainDesignLoading: false }));
    return null;
  }
};

export const updateDesign = newDomainDesign => async dispatch => {
  try {
    dispatch(domainDesignLoader({ domainDesignLoading: true }));
    const {
      data: { data }
    } = await putDomainDesign(newDomainDesign);
    dispatch(updateDomainDesign(data));
    dispatch(domainDesignLoader({ domainDesignLoading: false }));
    return;
  } catch (error) {
    failure('Unable to update domain design');
    logRollBarError(error, 'warning', 'Update domain design Error');
    dispatch(domainDesignLoader({ domainDesignLoading: false }));
    return null;
  }
};

export const removeDesign = (id, domain_id) => async dispatch => {
  try {
    dispatch(domainDesignLoader({ domainDesignLoading: true }));
    await deleteDomainDesign(id);
    dispatch(removeDomainDesign({ id, domain_id }));
    dispatch(domainDesignLoader({ domainDesignLoading: false }));
    return '';
  } catch (error) {
    failure('Unable to delete domain design');
    logRollBarError(error, 'warning', 'Delete domain design Error');
    dispatch(domainDesignLoader({ domainDesignLoading: false }));
    return null;
  }
};

export const selectDesign = id => async dispatch => {
  try {
    dispatch(domainDesignLoader({ domainDesignLoading: true }));
    const {
      data: { data }
    } = await selectDomainDesign(id);
    dispatch(activateDomainDesign(data));
    dispatch(domainDesignLoader({ domainDesignLoading: false }));
    return data;
  } catch (error) {
    failure('Unable to activate domain design');
    logRollBarError(error, 'warning', 'Activate domain design Error');
    dispatch(domainDesignLoader({ domainDesignLoading: false }));
    return null;
  }
};

export const defaultDesign = payload => async dispatch => {
  try {
    dispatch(domainDesignLoader({ domainDesignLoading: true }));
    const domainDesign = await defaultDomainDesign(payload);
    dispatch(setDefaultDesign(payload));
    dispatch(domainDesignLoader({ domainDesignLoading: false }));
    return domainDesign;
  } catch (error) {
    failure('Failed to set default design');
    logRollBarError(error, 'warning', 'Activate domain design Error');
    dispatch(domainDesignLoader({ domainDesignLoading: false }));
    return null;
  }
};

export const createDomain = ({ attributes = {}, relationships = {} }) => async (
  dispatch,
  getState
) => {
  try {
    const newServerDomain = await postDomain({ attributes, relationships });
    const normalizedDomain = normalizeDomain(newServerDomain).domains;
    dispatch(addDomains(normalizedDomain));
    analytics.track('Domain(Domain) Created', {
      id: newServerDomain.data.data.id,
      name: newServerDomain.data.data.attributes.name
    });
    success('New Domain created!');
    return newServerDomain;
  } catch (error) {
    failure('Unable to save new Domain');
    logRollBarError(error, 'warning', 'Create Domain Error');
    return null;
  }
};

export const getDomains = () => async (dispatch, getState) => {
  try {
    const domainsData = await fetchDomains();
    dispatch(addDomains(normalizeDomains(domainsData).domains));

    const userConfigurationResponse = await fetchUserConfigurations(
      'Domain',
      0
    );

    const _personalDomain = {
      '0': {
        attributes: {
          user_configuration: {
            data: get(userConfigurationResponse, 'data.data.0')
          }
        }
      }
    };

    if (window.location.port == 5000) {
      merge(_personalDomain, stageDomain);
    } else {
      merge(_personalDomain, personalDomain);
    }

    dispatch(addDomains(_personalDomain));
  } catch (error) {
    failure('Unable to load domains');
  }
};

export const updateDomain = updatedDomain => {
  return (dispatch, getState) => {
    const sm = stateMappings(getState());
    const { domains } = sm;
    const currentDomain = domains[updatedDomain.data.id];
    // Copy, prevent Redux state mutation
    const domainsCopy = Object.assign({}, domains, {
      [updatedDomain.data.id]: {
        attributes: {
          ...currentDomain.attributes,
          ...updatedDomain.data.attributes
        },
        id: currentDomain.id,
        type: currentDomain.type,
        relationships: currentDomain.relationships
      }
    });

    dispatch(domainUpdate(domainsCopy));
  };
};

export const archiveDomain = domain => {
  return async (dispatch, getState) => {
    try {
      const something = await archiveHive(domain);
      console.log(something);
      const url =
        window.APP_ENV === 'development'
          ? `http://${window.APP_DOMAIN}:${window.APP_PORT}`
          : `http://${window.APP_DOMAIN}`;

      location.assign(`${url}/choose_domain`);
    } catch (err) {
      failure(
        'There was a problem archiving this workspace, please try again later'
      );
      console.error(err);
    }
  };
};

export const deleteDomain = domain => {
  return async (dispatch, getState) => {
    try {
      await deleteHive(domain);
      const url =
        window.APP_ENV === 'development'
          ? `http://${window.APP_DOMAIN}:${window.APP_PORT}`
          : `http://${window.APP_DOMAIN}`;

      location.assign(`${url}/choose_domain`);
    } catch (err) {
      failure(
        'There was a problem deleting this workspace, please try again later'
      );
      console.error(err);
    }
  };
};

const stageDomain = {
  '0': {
    id: '0',
    type: 'domains',
    attributes: {
      name: 'Personal Workspace',
      tenant_name: 'stage'
    }
  }
};

const personalDomain = {
  '0': {
    id: '0',
    type: 'domains',
    attributes: {
      name: 'Personal Workspace',
      tenant_name: 'my'
    }
  }
};

export const setDomainUiSettings = ui_settings => async (
  dispatch,
  getState
) => {
  try {
    const sm = stateMappings(getState());
    const domainId = sm.page.domainId;
    const lensId = getCustomLensId(getState());
    dispatch(updateDomainUiSettings({ domainId, ui_settings }));
    const { id } = getUserConfig(getState());
    id && (await updateUiSettings(id, ui_settings, lensId));
  } catch (error) {
    console.log(error);
    failure('Unable to update user configuration');
    logRollBarError(error, 'warning', 'Update User Configuration Error');
  }
};

export const setDomainFilterSettings = filter_setting => async (
  dispatch,
  getState
) => {
  try {
    const sm = stateMappings(getState());
    const lensId = getCustomLensId(getState());
    const domainId = sm.page.domainId;
    const { id } = getFilterSettings(getState());
    dispatch(updateDomainFilterSettings({ domainId, filter_setting }));
    id && (await updateFilterSettings(id, filter_setting, lensId));
  } catch (error) {
    failure('Unable update filter settings');
    logRollBarError(error, 'warning', 'Update Filter Error');
    return null;
  }
};

export const selectCustomDomainLens = ({
  current_active_lens_id,
  id,
  current_active_template
}) => async (dispatch, getState) => {
  try {
    const userConfiguration = await selectCustomLens(
      id,
      current_active_lens_id,
      current_active_template
    );
    const sm = stateMappings(getState());
    const domainId = sm.page.domainId;
    dispatch(
      setCustomDomainLens({
        domainId,
        attributes: get(userConfiguration, 'data.data.attributes')
      })
    );

    if (current_active_template) {
      const payload = viewPayload(current_active_template);
      dispatch(setDomainUiSettings(payload));
    }
    return;
  } catch (error) {
    console.log(error);
    failure('Unable select tool');
    logRollBarError(error, 'warning', 'Select tool error');
    return null;
  }
};

export const setDomainOderSettings = orders => async (dispatch, getState) => {
  try {
    const sm = stateMappings(getState());
    const domainId = sm.page.domainId;
    return dispatch(updateOrderSettings({ domainId, orders }));
  } catch (error) {
    console.log(error);
    failure('Unable update order settings');
    logRollBarError(error, 'warning', 'Update Order Error');
    return null;
  }
};
