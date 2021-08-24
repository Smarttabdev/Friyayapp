//This file holds the API calls that hit the /labels route for DRY purposes
import { ApiRequest } from 'Lib/ApiRequest';

export const fetchDomains = async () =>
  ApiRequest.request({
    method: 'GET',
    url: `domains`
  });

export const postDomain = async newDomain =>
  ApiRequest.request({
    method: 'POST',
    url: `domains`,
    data: {
      data: newDomain
    }
  });

export const updateDomain = async updatedDomain =>
  ApiRequest.request({
    method: 'PATCH',
    url: `domains/${updatedDomain.id}`,
    data: {
      data: updatedDomain
    }
  });

export const archiveHive = async domain => {
  ApiRequest.request({
    method: 'POST',
    url: `domains/${domain.id}/archive_hive`
  });
};

export const deleteHive = async domain => {
  ApiRequest.request({
    method: 'POST',
    url: `domains/${domain.id}/delete_hive`
  });
};

export const postDomainDesign = async newDomainDesign =>
  ApiRequest.request({
    method: 'POST',
    url: 'domain_designs',
    data: {
      data: { attributes: { ...newDomainDesign } }
    }
  });

export const putDomainDesign = async updateDesign =>
  ApiRequest.request({
    method: 'PUT',
    url: `domain_designs/${updateDesign.id}`,
    data: {
      data: { attributes: updateDesign }
    }
  });

export const deleteDomainDesign = async id =>
  ApiRequest.request({
    method: 'DELETE',
    url: `domain_designs/${id}`
  });

export const selectDomainDesign = async id =>
  ApiRequest.request({
    method: 'POST',
    url: `domain_designs/${id}/activate_domain_design_for_user`
  });

export const defaultDomainDesign = async ({ design_id, domain_id }) =>
  ApiRequest.request({
    method: 'POST',
    url: `domains/${domain_id}/assign_default_design`,
    data: {
      data: {
        attributes: {
          default_design_id: design_id
        }
      }
    }
  });
