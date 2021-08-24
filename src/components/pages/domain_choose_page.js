import React, { Component } from 'react';
import PageContainerFull from '../../components/pages/page_container_full';
import DomainFormPage from '../../components/pages/domain_form_page';
import DomainFormPageStore from '../../stores/domain_form_page_store';
import DomainLogo from 'Src/components/shared/DomainLogo';
import { Link } from 'react-router-dom';

const port = location.host.split(':')[1];

const personalDomain = `//my.${window.APP_DOMAIN}${port ? `:${port}` : ''}`;

const AddWorkspaceButton = ({ componentClasses, onClickAddDomain }) => (
  <div className={componentClasses}>
    <a style={{ color: '#444' }} onClick={onClickAddDomain}>
      &#43; Add Workspace
    </a>
  </div>
);

const WorkspaceItem = ({ domain, fullUrl, sameDomain }) => (
  <div key={`${domain.id}`} className="workspace-item">
    <DomainLogo
      name={domain.attributes.name}
      domain={domain}
      componentClass="logo"
    />
    <span>
      {sameDomain ? (
        <Link to={{ pathname: fullUrl, state: { from: '/choose_domain' } }}>
          {domain.attributes.name}
        </Link>
      ) : (
        <a href={fullUrl}>{domain.attributes.name}</a>
      )}
    </span>
  </div>
);

export default class DomainChoosePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      domains: [],
      isDomainFormOpen: false
    };

    this.onDomainsLoad = this.onDomainsLoad.bind(this);
    this.closeDomainForm = this.closeDomainForm.bind(this);
    this.handleCreateDomainClick = this.handleCreateDomainClick.bind(this);
  }

  componentDidMount() {
    DomainFormPageStore.addEventListener(
      window.DOMAINS_LOAD_EVENT,
      this.onDomainsLoad
    );

    // fetch domains from server
    DomainFormPageStore.loadDomains();
  }

  componentWillUnmount() {
    DomainFormPageStore.removeEventListener(
      window.DOMAINS_LOAD_EVENT,
      this.onDomainsLoad
    );
  }

  onDomainsLoad = () =>
    this.setState(state => ({
      ...state,
      domains: DomainFormPageStore.getDomains()
    }));

  closeDomainForm = () =>
    this.setState(state => ({ ...state, isDomainFormOpen: false }));

  handleCreateDomainClick = e => {
    e.preventDefault();
    this.setState(state => ({ ...state, isDomainFormOpen: true }));
  };

  renderWorkspaceList() {
    const { domains } = this.state;
    return domains.map(domain => {
      const {
        attributes: { tenant_name }
      } = domain;
      const tenantUrl = `//${tenant_name}.${window.APP_DOMAIN}${
        port ? `:${port}` : ''
      }`;

      return (
        <WorkspaceItem
          domain={domain}
          fullUrl={tenantUrl}
          key={`${domain.id}`}
        />
      );
    });
  }

  render() {
    const {
      state: { isDomainFormOpen }
    } = this;

    return (
      <PageContainerFull>
        <div className="row choose-domain-page-header">
          <div className="col-md-6 col-md-offset-3">
            <AddWorkspaceButton
              componentClasses={'add-workspace-header-button'}
              onClickAddDomain={this.handleCreateDomainClick}
            />
            <h1 className="domain-page-title">Workspaces</h1>
            <form>
              <div className="form-group">
                <input
                  placeholder="Search Workspaces"
                  className="form-control"
                />
                <span className="glyphicon glyphicon-search" />
              </div>
            </form>
          </div>
        </div>
        <div className="row choose-domain-page-content">
          <div className="col-md-6 col-md-offset-3 col-scrollable">
            <div className="workspace-list">
              <WorkspaceItem
                domain={{
                  id: 0,
                  attributes: { name: 'Personal Workspace', tenant_name: 'my' }
                }}
                fullUrl={personalDomain}
              />
              {this.renderWorkspaceList()}
            </div>
            <AddWorkspaceButton
              componentClasses={'add-workspace-button'}
              onClickAddDomain={this.handleCreateDomainClick}
            />
          </div>
        </div>
        {isDomainFormOpen && <DomainFormPage onClose={this.closeDomainForm} />}
      </PageContainerFull>
    );
  }
}
