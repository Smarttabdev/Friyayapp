import actionTypes from './actionEnum';
import omit from 'lodash/omit';
import get from 'lodash/get';
import set from 'lodash/set';

const defaultState = {};

const addDomainDesign = (state, payload) => {
  const domain = JSON.parse(
    JSON.stringify(state[payload.attributes.domain_id])
  );
  domain.attributes.domain_designs = [
    ...domain.attributes.domain_designs,
    { id: payload.id, ...payload.attributes }
  ];
  return domain;
};

const updateDomainDesign = (state, payload) => {
  const domain = JSON.parse(
    JSON.stringify(state[payload.attributes.domain_id])
  );
  const index = domain.attributes.domain_designs.findIndex(
    d => Number(d.id) === Number(payload.id)
  );
  domain.attributes.domain_designs[index] = {
    ...domain.attributes.domain_designs[index],
    ...payload.attributes
  };
  return domain;
};

const deleteDomainDesign = (state, payload) => {
  const domain = JSON.parse(JSON.stringify(state[payload.domain_id]));
  const index = domain.attributes.domain_designs.findIndex(
    d => Number(d.id) === Number(payload.id)
  );
  domain.attributes.domain_designs.splice(index, 1);
  return domain;
};

const activateTopicDesign = (state, payload) => {
  const domain = JSON.parse(
    JSON.stringify(state[payload.attributes.domain_id])
  );
  domain.attributes.domain_design_id_for_current_user = payload.id;
  return domain;
};

const setDefaultDesign = (state, payload) => {
  const domain = JSON.parse(JSON.stringify(state[payload.domain_id]));
  domain.attributes.default_design_id = payload.design_id;
  return domain;
};

const updateDomainUiSettings = (state, payload) => {
  const domain = JSON.parse(JSON.stringify(state[payload.domainId]));
  let ui_settings = get(
    domain,
    'attributes.user_configuration.data.attributes.ui_settings',
    {}
  );
  ui_settings = { ...ui_settings, ...payload.ui_settings };
  set(
    domain,
    'attributes.user_configuration.data.attributes.ui_settings',
    ui_settings
  );
  return domain;
};

const updateDomainFilterSettings = (state, payload) => {
  const domain = JSON.parse(JSON.stringify(state[payload.domainId]));
  let filter_setting = get(
    domain,
    'attributes.user_configuration.data.attributes.filter_setting'
  );
  filter_setting = { ...filter_setting, ...payload.filter_setting };
  set(
    domain,
    'attributes.user_configuration.data.attributes.filter_setting',
    filter_setting
  );
  return domain;
};

const setCustomDomainLens = (state, payload) => {
  const domain = JSON.parse(JSON.stringify(state[payload.domainId]));
  set(
    domain,
    'attributes.user_configuration.data.attributes',
    payload.attributes
  );
  return domain;
};

const updateOrderSettings = (state, payload) => {
  const domain = JSON.parse(JSON.stringify(state[payload.domainId]));
  let orders = get(
    domain,
    'attributes.user_configuration.data.attributes.orders'
  );
  orders = { ...orders, ...payload.orders };
  set(domain, 'attributes.user_configuration.data.attributes.orders', orders);
  return domain;
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.add:
    case actionTypes.change:
      return { ...state, ...action.payload };

    case actionTypes.delete:
      return omit(state, [action.payload]);

    case actionTypes.replace:
      return {
        ...omit(state, [action.payload.replaceId]),
        ...action.payload.replacement
      };

    case actionTypes.update:
      return { ...state, [action.payload.id]: action.payload };

    case actionTypes.addDesign:
      return {
        ...state,
        [action.payload.attributes.domain_id]: addDomainDesign(
          state,
          action.payload
        )
      };

    case actionTypes.updateDesign:
      return {
        ...state,
        [action.payload.attributes.domain_id]: updateDomainDesign(
          state,
          action.payload
        )
      };

    case actionTypes.deleteDesign:
      return {
        ...state,
        [action.payload.domain_id]: deleteDomainDesign(state, action.payload)
      };

    case actionTypes.activateDesign:
      return {
        ...state,
        [action.payload.attributes.domain_id]: activateTopicDesign(
          state,
          action.payload
        )
      };

    case actionTypes.setDefaultDesign:
      return {
        ...state,
        [action.payload.domain_id]: setDefaultDesign(state, action.payload)
      };

    case actionTypes.updateDomainUiSettings:
      return {
        ...state,
        [action.payload.domainId]: updateDomainUiSettings(state, action.payload)
      };

    case actionTypes.updateDomainFilterSettings:
      return {
        ...state,
        [action.payload.domainId]: updateDomainFilterSettings(
          state,
          action.payload
        )
      };

    case actionTypes.setCustomDomainLens:
      return {
        ...state,
        [action.payload.domainId]: setCustomDomainLens(state, action.payload)
      };

    case actionTypes.updateOrderSettings:
      return {
        ...state,
        [action.payload.domainId]: updateOrderSettings(state, action.payload)
      };

    default:
      return state;
  }
};

export default reducer;
