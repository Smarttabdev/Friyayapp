import React, { PureComponent } from 'react';
import FormInput from 'Components/shared/forms/FormInput';
import { connect } from 'react-redux';
import DomainFormPageActions from 'Src/actions/domain_form_page_actions';
import { getDomains } from 'Src/newRedux/database/domains/selectors';
import { updateDomain } from 'Src/newRedux/database/domains/thunks';
import { getThisDomain } from 'Src/lib/utilities';
import { DEFAULT_COLOR } from 'Src/appConstants';

class WorkspaceTitleEditor extends PureComponent {
  constructor(props) {
    super(props);
  }

  handleUpdateWorkspace = async () => {
    const { onFinishEditing, updateDomain } = this.props;
    const domainID = window.currentDomain.id;
    const domainName = this.state.workspaceTitle;
    const tenantName = window.currentDomain.attributes.tenant_name;
    const SSO = {
      domainSSOEnabled: window.currentDomain.attributes.sso_enabled,
      domainIDPEntityID: window.currentDomain.attributes.idp_entity_id,
      domainIDPSSOTargetURL: window.currentDomain.attributes.idp_sso_target_url,
      domainIDPSLOTargetURL: window.currentDomain.attributes.idp_slo_target_url,
      domainIssuer: window.currentDomain.attributes.issuer
    };
    const domainPermission =
      window.currentDomain.relationships.domain_permission.data.id;
    const domainColor = window.currentDomain.attributes.color || DEFAULT_COLOR;

    updateDomain({
      data: {
        ...window.currentDomain,
        attributes: {
          ...window.currentDomain.attributes,
          name: domainName
        }
      }
    });

    DomainFormPageActions.updateDomain(
      domainID,
      domainName,
      tenantName,
      SSO,
      undefined,
      domainPermission,
      domainColor
    );
    onFinishEditing();
  };

  setWorkspaceTitle = workspaceTitle => {
    this.setState({ workspaceTitle });
  };

  handleKeyDown = e => {
    (e.key == 'Escape' || e.keyCode == 27) && this.props.onFinishEditing();
  };

  render() {
    const { additionalClasses = '', setFormWidth, workspaceTitle } = this.props;

    return (
      <FormInput
        additionalClasses={additionalClasses}
        autoFocus
        defaultValue={workspaceTitle}
        onChange={this.setWorkspaceTitle}
        onSubmit={this.handleUpdateWorkspace}
        placeholder="Workspace title"
        onKeyPress={this.handleKeyDown}
        onKeyDown={this.handleKeyDown}
        setFormWidth={setFormWidth}
        onBlur={this.handleUpdateWorkspace}
      />
    );
  }
}

const mapState = state => {
  return {
    currentDomain: getThisDomain(getDomains(state))
  };
};

export default connect(mapState, { updateDomain })(WorkspaceTitleEditor);
