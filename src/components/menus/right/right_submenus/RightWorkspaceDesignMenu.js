import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { stateMappings } from 'Src/newRedux/stateMappings';
import FormInput from 'Components/shared/forms/FormInput';
import {
  createDesign,
  updateDesign,
  removeDesign,
  selectDesign,
  defaultDesign
} from 'Src/newRedux/database/domains/thunks';
import { setRightMenuOpenForMenu } from 'Src/newRedux/interface/menus/actions';
import IconButton from 'Components/shared/buttons/IconButton';
import RightDesignDetailMenu from './workspace_design/RightDesignDetailMenu';
import DefaultBadge from 'Components/shared/badges/DefaultBadge';
import LoadingIndicator from 'Components/shared/LoadingIndicator';
import OptionsDropdownButton from 'Components/shared/buttons/OptionsDropdownButton';

class RightWorkspaceDesignMenu extends Component {
  static propTypes = {
    displaySubmenu: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
      .isRequired,
    setOpenMenu: PropTypes.func.isRequired,
    active_design: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    domainId: PropTypes.string,
    createDesign: PropTypes.func,
    domain_designs: PropTypes.array.isRequired,
    removeDesign: PropTypes.func.isRequired,
    selectDesign: PropTypes.func.isRequired,
    updateDesign: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
    domain: PropTypes.object,
    defaultDesign: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      inInputMode: false,
      title: '',
      selected: null
    };
    this.setOpenMenu = props.setOpenMenu;
  }

  clickDesignDetail = index => {
    this.setState({
      selected: index
    });
    this.setOpenMenu('Workspace_Design_Sub');
  };

  handleKeyDown = e => {
    if (e.key == 'Escape' || e.keyCode == 27) {
      this.handleToggleInputMode();
    }
  };

  handleToggleInputMode = () => {
    this.state.inInputMode
      ? window.removeEventListener('keydown', this.handleKeyDown, true)
      : window.addEventListener('keydown', this.handleKeyDown, true);
    this.setState(state => ({ inInputMode: !state.inInputMode }));
  };

  handleDesignTitle = title => {
    this.setState({ title });
  };

  createDesign = async () => {
    this.setState({
      inInputMode: false
    });
    const design = await this.props.createDesign({
      name: this.state.title
    });
    if (this.isOwner() && !this.props.domain.attributes.default_design_id) {
      // Set domain default
      this.setDefault({
        domain_id: this.props.domainId,
        design_id: design.data.id
      });
    }
    this.setState({ title: '' });
  };

  setDefault = ({ domain_id, design_id }) => {
    this.props.defaultDesign({
      domain_id,
      design_id
    });
  };

  isOwner = () => {
    const {
      domain: {
        relationships: {
          masks: {
            data: { is_admin, is_owner, is_power }
          }
        }
      }
    } = this.props;
    if (is_admin || is_owner || is_power) {
      return true;
    }
    return false;
  };

  deleteDesign = (id, domain_id) => {
    this.props.removeDesign(id, domain_id);
  };

  selectDesign = (id, domain_id) => {
    this.props.selectDesign(id, domain_id);
  };

  canEdit = user_id => {
    return Number(this.props.userId) === Number(user_id);
  };

  render() {
    const {
      displaySubmenu,
      domain_designs,
      isLoading,
      domain,
      active_design
    } = this.props;
    const { selected, inInputMode, title } = this.state;
    return (
      <div className="right-submenu">
        <div className="right-submenu_header">
          <IconButton
            fontAwesome
            icon="caret-left"
            onClick={() => this.setOpenMenu(true)}
          />
          <span className="ml5">Design</span>
        </div>
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <Fragment>
            {domain_designs &&
              domain_designs.map((design, index) => (
                <div className="Right-design" key={design.id}>
                  <a
                    className="right-submenu_item option Right-design-name"
                    onClick={() => this.clickDesignDetail(index)}
                  >
                    <span>{design.name}</span>
                    <span>
                      {Number(active_design) === Number(design.id) && (
                        <DefaultBadge text="active" />
                      )}
                      {Number(domain.attributes.default_design_id) ===
                        Number(design.id) && <DefaultBadge text="default" />}
                    </span>
                  </a>
                  <OptionsDropdownButton>
                    <a
                      className="dropdown-option-item"
                      onClick={() => {
                        this.selectDesign(design.id, design.domain_id);
                      }}
                    >
                      Activate
                    </a>
                    {this.isOwner() && (
                      <a
                        className="dropdown-option-item"
                        onClick={() => {
                          this.setDefault({
                            design_id: design.id,
                            domain_id: design.domain_id
                          });
                        }}
                      >
                        Default
                      </a>
                    )}
                    {this.canEdit(design.user_id) && (
                      <a
                        className="dropdown-option-item"
                        onClick={() => {
                          this.deleteDesign(design.id, design.domain_id);
                        }}
                      >
                        Delete
                      </a>
                    )}
                  </OptionsDropdownButton>
                </div>
              ))}

            {!isLoading && inInputMode && (
              <div className="Right-design-add-wrapper">
                <FormInput
                  autoFocus
                  defaultValue={title}
                  onChange={this.handleDesignTitle}
                  onSubmit={this.createDesign}
                  placeholder="Design Title"
                />
                <div className="add-card-input-footer">
                  <p>hit enter to create</p>
                  <a onClick={() => {}}>Create</a>
                </div>
              </div>
            )}
            {!isLoading && !inInputMode && (
              <a
                className="right-submenu_item Right-design-add-color option"
                onClick={this.handleToggleInputMode}
              >
                <span>Add new design</span>
              </a>
            )}
            <div
              className={`${
                typeof displaySubmenu === 'string' &&
                displaySubmenu === 'Workspace_Design_Sub'
                  ? 'right-submenu_option-container presented'
                  : 'right-submenu_option-container'
              }`}
            >
              {displaySubmenu == 'Workspace_Design_Sub' && (
                <RightDesignDetailMenu
                  canEdit={this.canEdit(domain_designs[selected].user_id)}
                  selected={selected}
                />
              )}
            </div>
          </Fragment>
        )}
      </div>
    );
  }
}

const mapState = state => {
  const sm = stateMappings(state);
  const { domainId } = sm.page;
  const domain = sm.domains[domainId];
  let domain_designs, active_design;
  if (domain) {
    domain_designs = domain.attributes.domain_designs;
    active_design = domain.attributes.domain_design_id_for_current_user;
  }
  return {
    domain,
    domainId,
    userId: sm.user.id,
    displaySubmenu: sm.menus.displayRightSubMenuForMenu,
    active_design,
    domain_designs,
    isLoading: sm.tools.domainDesignLoading
  };
};

const mapDispatch = {
  setOpenMenu: setRightMenuOpenForMenu,
  createDesign,
  updateDesign,
  removeDesign,
  selectDesign,
  defaultDesign
};

export default connect(mapState, mapDispatch)(RightWorkspaceDesignMenu);
