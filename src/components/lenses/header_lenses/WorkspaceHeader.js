/* eslint-disable complexity */
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import QuickRightBarActions from 'Components/shared/assemblies/QuickRightBarActions';
import DomainLogo from 'Src/components/shared/DomainLogo';
import { connect } from 'react-redux';
import { setUserInvitationModalOpen } from 'Src/newRedux/interface/modals/actions';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { getThisDomain } from 'Src/lib/utilities';
import { getDomains } from 'Src/newRedux/database/domains/selectors';
import {
  getLeftPxFixedHeader,
  setDomainSubtopicsView
} from 'Src/newRedux/interface/menus/thunks';
import { toggleHexPanel } from 'Src/newRedux/interface/menus/actions';
import { setUpdateTopicModalOpen } from 'Src/newRedux/interface/modals/actions';
import { setEditDomainModalOpen } from 'Src/newRedux/interface/modals/actions';
import { setRightMenuOpenForMenu } from 'Src/newRedux/interface/menus/actions';
import IconButton from 'Src/components/shared/buttons/IconButton';
import { updateShowTutorial } from 'Src/newRedux/database/user/thunks';
import classNames from 'classnames';
import get from 'lodash/get';
import AddCardOrSubtopic from 'Components/shared/assemblies/AddCardOrSubtopic';
import { togglePriorityView } from 'Src/newRedux/utilities/actions';
import ViewDropdownMenu from './icon_dropdown_menu/ViewDropdownMenu';
import CardDropdownMenu from './icon_dropdown_menu/CardDropdownMenu';
import FileDropdownMenu from './icon_dropdown_menu/FileDropdownMenu';
import ChatDropdownMenu from './icon_dropdown_menu/ChatDropdownMenu';
import VideoDropdownMenu from './icon_dropdown_menu/VideoDropdownMenu';
import Ability from 'Src/lib/ability';
import WorkspaceActionsDropdown from 'Src/components/shared/WorkspaceActionsDropdown';
import WorkspaceTitleEditor from 'Src/components/shared/WorkspaceTitleEditor';
import PinLenses from 'Components/lenses/PinLenses';
import { pageViewMappings } from 'Lib/config/lenses/lenses';
import {
  clearSearchCardsResult,
  clearSearchTopicsResult
} from 'Src/newRedux/database/search/actions';
import { searchTopicsAndCardsResult } from 'Src/newRedux/database/search/thunks';
import { getUiSettings } from 'Src/helpers/user_config';
import AddViewsPanel from 'Components/lenses/AddViewsPanel';
import { getRelevantViewForPage } from 'Src/newRedux/interface/lenses/selectors';
import HeaderLiveUsers from 'Src/components/shared/HeaderLiveUsers';
import GIDBFTeamHeader from 'Src/components/shared/GIDBF/GIDBFTeamHeader';
import GIDBFMyHeader from 'Src/components/shared/GIDBF/GIDBFMyHeader';
import { updateTrackerLens } from 'Src/newRedux/interface/lenses/actions';
import Resizable from 're-resizable';
import { setShowFilterPanel } from 'src/newRedux/filters/actions';
import { filterMap } from 'src/components/shared/filters/ActiveFiltersPanel';
import Dropdown from 'Components/shared/Dropdown';
import Switch from 'Components/shared/ToggleSwitch';
import Tooltip from 'Components/shared/Tooltip';
import { updateProjectHubLens } from 'Src/newRedux/interface/lenses/actions';
import { projectHubFilterTypes } from 'src/components/shared/CardAndBoardTypes';

const HideButtonsForTools = ['STARTER', 'INBOX'];

class WorkspaceHeader extends Component {
  static propTypes = {
    domains: PropTypes.array.isRequired,
    setUserInvitationModalOpen: PropTypes.func.isRequired,
    user: PropTypes.object,
    getLeftPxFixedHeader: PropTypes.func.isRequired,
    setUpdateTopicModalOpen: PropTypes.func.isRequired,
    toggleHexPanel: PropTypes.func.isRequired,
    subtopicsPanelView: PropTypes.string.isRequired,
    topicMinimized: PropTypes.bool,
    setDomainSubtopicsView: PropTypes.func.isRequired,
    setRightMenuOpenForMenu: PropTypes.func,
    active_design: PropTypes.any,
    activeTemplate: PropTypes.string,
    boards: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.toggleHexPanel = props.toggleHexPanel;
    this.getLeftPxFixedHeader = props.getLeftPxFixedHeader;
    this.setUserInvitationModalOpen = props.setUserInvitationModalOpen;
    this.setDomainSubtopicsView = props.setDomainSubtopicsView;
    this.dropdownRef = React.createRef();
    this.headerRef = React.createRef();
    this.workspaceTitleRef = React.createRef();
    this.menuRef1 = React.createRef();
    this.menuRef2 = React.createRef();
  }

  state = {
    showWorkspaceOptions: false,
    workspaceNameEdit: false,
    workspaceName: window.currentDomain.attributes.name,
    searchInput: false,
    query: '',
    iconVisible: false,
    iconAnchor: false,
    bannerHeight: 0
  };

  /**
   * Get the current domain name
   *
   * @return {Object}
   */
  getCurrentDomain = () => {
    const { domains } = this.props;
    const thisDomain = getThisDomain(domains);
    window.currentDomain = thisDomain;

    return thisDomain;
  };

  toggleWorkspaceNameEdit = () => {
    this.setState(state => ({ workspaceNameEdit: !state.workspaceNameEdit }));
  };

  showTutorial = () => {
    this.props.updateShowTutorial(true);
  };

  toggleWorkspaceOptions = () => {
    this.setState({ showWorkspaceOptions: !this.state.showWorkspaceOptions });
  };

  isVisible = elem => {
    !!elem &&
      !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
  };

  hideWorkspaceDropdownOnClickOut = element => {
    const outsideClickListener = event => {
      if (!element.contains(event.target) || this.isVisible(element)) {
        this.setState({ showWorkspaceOptions: false });
        removeClickListener();
      }
    };
    const removeClickListener = () => {
      document.removeEventListener('click', outsideClickListener);
    };
    document.addEventListener('click', outsideClickListener);
  };

  setWorkspaceEditWidth = () => {
    if (
      Ability.can('update', 'self', window.currentDomain) &&
      window.currentDomain.id !== '0'
    ) {
      const header = this.headerRef.current;
      const title = this.workspaceTitleRef.current;
      const headerMenu1 = this.menuRef1.current;
      const headerMenu2 = this.menuRef2.current;
      const titleWidth =
        title.offsetWidth - Math.round(title.offsetWidth * 0.354);
      const usableWidth =
        header.offsetWidth -
        (headerMenu1.offsetWidth + headerMenu2.offsetWidth);
      const editTopicWidth =
        titleWidth > usableWidth ? usableWidth : titleWidth;
      this.setState({ editTopicWidth: editTopicWidth });
    }
  };

  componentDidMount() {
    const { viewKey } = this.props;
    const notGIDBF =
      viewKey != 'TEAM_PLAN' &&
      viewKey != 'TEAM_DAY' &&
      viewKey != 'PROJECT_PLAN' &&
      viewKey != 'MY_TEAMS' &&
      viewKey != 'MY_PLAN' &&
      viewKey != 'MY_DAY' &&
      viewKey != 'MY_NOTES' &&
      viewKey != 'NOTEBOOK' &&
      viewKey != 'KNOWLEDGE_BASE';
    notGIDBF && this.setWorkspaceEditWidth();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.showWorkspaceOptions === true) {
      const dropdown = this.dropdownRef.current;
      this.hideWorkspaceDropdownOnClickOut(dropdown);
    }
    if (this.state.workspaceNameEdit != prevState.workspaceNameEdit) {
      this.setState({ workspaceName: window.currentDomain.attributes.name });
    }
  }

  renderSearchIcon = () => {
    const { searchInput, query } = this.state;
    const { currentDomain } = this.props;
    const domainDesigns = get(currentDomain, 'attributes.domain_designs', []);
    const domainDesignId = get(
      currentDomain,
      'attributes.domain_design_id_for_current_user'
    );
    const searchClass = classNames('search-input', { open: searchInput });
    if (searchInput) this.searchInput.focus();
    return (
      <div className="search-container">
        <IconButton
          additionalClasses="font-size-16"
          icon="search"
          fontAwesome
          color="#63A0C3"
          onClick={this.handleClickSearch}
          tooltip="Search"
          tooltipOptions={{ place: 'bottom' }}
        />
        <input
          type="text"
          value={query}
          className={searchClass}
          name="q"
          onChange={this.handleChangeQ}
          autoFocus
          autoComplete={'off'}
          ref={input => (this.searchInput = input)}
          style={{ color: '#666666' }}
        />
      </div>
    );
  };

  renderShareIcon = () => {
    if (!Ability.can('update', 'self', window.currentDomain)) return null;
    const {
      active_design: { card_font_color },
      user,
      setUserInvitationModalOpen
    } = this.props;
    return (
      <div
        className="link-tooltip-container update-section"
        onClick={() => setUserInvitationModalOpen(user.id)}
      >
        <div
          style={{ color: card_font_color || '#9B51E0' }}
          className="material-icons invite-person-icon"
        >
          person_add
        </div>
        <span className="link-tooltip top" style={{ marginLeft: '-15px' }}>
          Invite Members
        </span>
      </div>
    );
  };

  renderDots = () => {
    const { displayRightSubMenuForMenu } = this.props;
    const forId = Math.ceil(Math.random() * 100000, 6);
    return (
      <div>
        <div
          data-tip={'Right  Menu'}
          data-for={forId}
          className="dots-container expandable-area-wrap"
          onMouseEnter={this.showIcon}
          onMouseLeave={this.hideIcon}
          onClick={() =>
            this.props.setRightMenuOpenForMenu(!displayRightSubMenuForMenu)
          }
        >
          <span className="dots"></span>
          <span className="dots"></span>
          <span className="dots"></span>
        </div>
        <Tooltip {...{ place: 'bottom' }} id={forId} />
      </div>
    );
  };

  showIcon = () => {
    this.setState({ iconVisible: true });
  };

  hideIcon = () => {
    this.setState({ iconVisible: false });
  };

  toggleAnchor = () => {
    this.setState(({ iconAnchor }) => ({ iconAnchor: !iconAnchor }));
  };
  isTextCardVisible = () => {
    if (this.props.viewKey) {
      return ['BASIC'].includes(this.props.viewKey);
    }
    return false;
  };

  isUploadCardVisible = () => {
    if (this.props.viewKey) {
      return ['DOCUMENT'].includes(this.props.viewKey);
    }
  };

  handleClickSearch = () => {
    this.setState(({ searchInput }) => ({ searchInput: !searchInput }));
  };

  updateProjectHubFilters = type => {
    const { projectHubLens, updateProjectHubLens } = this.props;
    let activeFilters = [];
    projectHubLens.activeFilters.find(t => t === type)
      ? (activeFilters = projectHubLens.activeFilters.filter(t => t !== type))
      : (activeFilters = projectHubLens.activeFilters.concat(type));

    if (!activeFilters.length) {
      activeFilters = projectHubFilterTypes.map(x => x.key);
    }

    updateProjectHubLens({ activeFilters });
  };

  /**
   * Handle change input query.
   *
   * @param {Event} e
   * @return  {Void}
   */
  handleChangeQ = e => {
    e.preventDefault();
    const query = e.target.value;
    this.setState({ query });

    // Prevent next action when user is typing
    if (this.timeoutId) clearTimeout(this.timeoutId);

    this.timeoutId = setTimeout(() => {
      (async () => {
        try {
          if (query) await this.props.searchTopicsAndCardsResult(query);
          else {
            this.props.clearSearchCardsResult();
            this.props.clearSearchTopicsResult();
          }
        } catch (err) {
          console.error(err);
        }
      })();
    }, 500);
  };

  render() {
    const {
      setEditDomainModalOpen,
      active_design,
      currentView,
      togglePriorityView,
      pinnedLensesBarVisible,
      addViewsPanelVisible,
      viewKey,
      updateTrackerLens,
      currentMode,
      bannerHeightConfig,
      activeTemplate,
      boards,
      updateProjectHubLens,
      projectHubLens,
      customLenses,
      topicId,
      ...others
    } = this.props;
    const {
      iconVisible,
      showWorkspaceOptions,
      workspaceNameEdit,
      editTopicWidth,
      workspaceName,
      iconAnchor,
      searchInput,
      bannerHeight
    } = this.state;
    const domain = this.getCurrentDomain();
    const leftPx = this.getLeftPxFixedHeader();
    const {
      card_font_color,
      banner_color_display,
      banner_image_display,
      banner_color,
      banner_image_url,
      workspace_font_color
    } = active_design || {};
    const isOpen = iconAnchor || searchInput || iconVisible;
    const isPrioritize = viewKey === 'PRIORITIZE';
    const isGroupBy = [
      'ACTION_PLAN',
      'TODO',
      'PROJECT_PLAN',
      'SHEET',
      'TIMELINE'
    ].includes(viewKey);
    //const isGroupBy = false; // change to above when group by starts working
    const expandablePanelClass = classNames(
      'flex-r-center',
      'expandable-panel',
      {
        opened: isOpen,
        extra: (isPrioritize || isGroupBy || searchInput) && isOpen
      }
    );
    const tooltipConfig = { place: 'bottom' };
    const canShowAddViewsPanel = [
      'TOPIC_TILES'
      // 'TOPIC_HEXES',
      // 'TOPIC_LIST'
    ].includes(viewKey);

    const handleResize = (e, direction, ref, d) => {
      const height = parseInt(ref.style.height);
      this.setState({ bannerHeight: height });
      mutations.setConfig({
        owner: 'Topic:0',
        config: `${viewKey}.banner_height`,
        value: height
      });
    };

    const color = card_font_color
      ? card_font_color
      : viewKey == 'INBOX'
      ? '#b1b2b4'
      : '';

    return (
      <header className="topic-header" style={{ left: leftPx }}>
        {(banner_color_display && banner_color) ||
        (banner_image_display && banner_image_url) ? (
          <Resizable
            size={{ height: bannerHeightConfig?.value || bannerHeight }}
            minHeight={52}
            maxHeight={700}
            onResizeStop={handleResize}
            enable={{
              top: false,
              bottom: true,
              right: false,
              left: false,
              topRight: false,
              topLeft: false,
              bottomRight: false,
              bottomLeft: false
            }}
            style={{
              backgroundColor: banner_color,
              backgroundImage:
                banner_image_display && `url('${banner_image_url}')`
            }}
            className="topic-header-top-section"
          />
        ) : null}
        {!pinnedLensesBarVisible && <PinLenses />}
        <div className="flex-r-center">
          <div
            className="flex-1 flex-r-center-spacebetween topic-header-container"
            ref={this.headerRef}
          >
            <div className="flex-r-center topic-header-main">
              {viewKey == 'TEAM_PLAN' ||
              viewKey == 'TEAM_DAY' ||
              viewKey == 'PROJECT_PLAN' ? (
                <GIDBFTeamHeader
                  lensType={viewKey}
                  domain={domain}
                  showWorkspaceLogo
                />
              ) : viewKey == 'MY_PLAN' ||
                viewKey == 'MY_DAY' ||
                viewKey == 'MY_TEAMS' ||
                viewKey == 'MY_NOTES' ? (
                <GIDBFMyHeader lensType={viewKey} showWorkspaceLogo />
              ) : (
                <div className="flex-r-center topic-header-main">
                  <div
                    data-tip={domain.attributes.name}
                    data-for={`workspace-${domain.attributes.name}`}
                    className="flex"
                    style={{
                      color: card_font_color
                        ? card_font_color
                        : viewKey == 'INBOX'
                        ? '#fff'
                        : ''
                    }}
                  >
                    <DomainLogo
                      domain={domain}
                      preferredColor={workspace_font_color}
                      rounded
                      componentClass="domain-logo domain-logo-workspace-header"
                    />
                  </div>
                  <h1
                    className={
                      Ability.can('update', 'self', window.currentDomain) &&
                      window.currentDomain.id !== '0'
                        ? 'm0 text-center workspace-header-h1'
                        : 'm0 text-center workspace-header-noHover'
                    }
                    onDoubleClick={
                      Ability.can('update', 'self', window.currentDomain) &&
                      window.currentDomain.id !== '0'
                        ? this.toggleWorkspaceNameEdit
                        : null
                    }
                    onClick={
                      Ability.can('update', 'self', window.currentDomain) &&
                      window.currentDomain.id !== '0'
                        ? workspaceNameEdit
                          ? null
                          : this.toggleWorkspaceOptions
                        : null
                    }
                    style={{
                      backgroundColor: `${
                        Ability.can('update', 'self', window.currentDomain) &&
                        window.currentDomain.id !== '0'
                          ? showWorkspaceOptions
                            ? '#F2F1F1'
                            : ''
                          : 'none'
                      }`,
                      color,
                      marginLeft: '0'
                    }}
                  >
                    {workspaceNameEdit ? (
                      <WorkspaceTitleEditor
                        workspaceTitle={'Main board'}
                        onFinishEditing={this.toggleWorkspaceNameEdit}
                        setFormWidth={editTopicWidth}
                      />
                    ) : (
                      <span ref={this.workspaceTitleRef}>Main board</span>
                    )}
                  </h1>
                  <span
                    style={{ alignSelf: 'center', marginTop: '10px', color }}
                  >
                    / {boards[viewKey].name}
                  </span>
                  {showWorkspaceOptions &&
                  Ability.can('update', 'self', window.currentDomain) &&
                  window.currentDomain.id !== '0' ? (
                    <span className="workspaceOptions" ref={this.dropdownRef}>
                      <WorkspaceActionsDropdown
                        handleRenameWorkspace={this.toggleWorkspaceNameEdit}
                      />
                      <div className="topicOptionsFooter">
                        <i>Double click the Workspace title to edit</i>
                      </div>
                    </span>
                  ) : null}
                  <div
                    className="board-top-bar_element left-space"
                    ref={this.menuRef1}
                  >
                    <div className="topic-header_button-container">
                      {!HideButtonsForTools.includes(viewKey) && (
                        <Fragment>
                          <ViewDropdownMenu showAddViewsPanel {...this.props} />
                          <CardDropdownMenu {...this.props} />
                          <FileDropdownMenu {...this.props} />
                          <ChatDropdownMenu {...this.props} />
                          <VideoDropdownMenu {...this.props} />
                          <AddCardOrSubtopic
                            color={card_font_color}
                            className={'pt8'}
                            displayAddCardButton
                            displayAddSubtopicButton
                            displayAddChatButton
                            displayAddVideoRoomButton
                            showAddTextCard={this.isTextCardVisible()}
                            showUploadFileCard={this.isUploadCardVisible()}
                            topicHeader
                            transparent={false}
                          />
                        </Fragment>
                      )}
                    </div>
                  </div>
                </div>
              )}
              {this.props.numOfActiveFilters > 0 &&
                !HideButtonsForTools.includes(viewKey) && (
                  <Dropdown
                    closeOnClick={false}
                    trigger={
                      <IconButton
                        additionalClasses={
                          viewKey === 'MY_PLAN' ||
                          viewKey === 'MY_NOTES' ||
                          viewKey === 'MY_TEAMS'
                            ? 'mt32'
                            : viewKey === 'MY_DAY'
                            ? 'mt35'
                            : viewKey === 'TEAM_DAY'
                            ? 'mt29'
                            : viewKey === 'TEAM_PLAN' ||
                              viewKey === 'PROJECT_PLAN'
                            ? 'mt30'
                            : 'mt19'
                        }
                        color={card_font_color || '#AA31B9'}
                        fontSize={23}
                        icon="error"
                        tooltip="Show Filters"
                        tooltipOptions={tooltipConfig}
                      />
                    }
                  >
                    <p style={{ color: '#B3B3B3', fontStyle: 'italic' }}>
                      There are active filters
                    </p>
                    <div className="flex-r-center">
                      <span
                        style={{
                          color: '#B3B3B3',
                          marginRight: '10px',
                          fontWeight: 'normal',
                          marginBottom: '1px'
                        }}
                      >
                        Show Active filters bar
                      </span>{' '}
                      <span
                        onClick={() =>
                          this.props.setShowFilterPanel(
                            !this.props.showFilterPanel
                          )
                        }
                      >
                        <Switch
                          on={this.props.showFilterPanel ? true : false}
                        />
                      </span>
                    </div>
                  </Dropdown>
                )}
            </div>
            {domain.attributes.tenant_name != 'my' && (
              <div
                className="flex-r-center right-container"
                ref={this.menuRef2}
              >
                {viewKey === 'TRACKER' && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginRight: '15px'
                    }}
                  >
                    <IconButton
                      additionalClasses="mr5"
                      fontSize={26}
                      icon="view_column"
                      outlined
                      color={currentMode === 'lane' ? '#56CCF2' : '#808080'}
                      onClick={() => updateTrackerLens({ currentMode: 'lane' })}
                      tooltip="Lane view"
                      tooltipOptions={{ place: 'bottom' }}
                    />
                    <IconButton
                      style={{ display: 'none' }}
                      additionalClasses="mr5"
                      fontSize={20}
                      icon="storage"
                      color={currentMode === 'timeline' ? '#56CCF2' : '#808080'}
                      onClick={() =>
                        updateTrackerLens({ currentMode: 'timeline' })
                      }
                      tooltip="Timeline view"
                      tooltipOptions={{ place: 'bottom' }}
                    />
                    <IconButton
                      additionalClasses=""
                      fontSize={20}
                      outlined
                      icon="view_agenda"
                      color={currentMode === 'table' ? '#56CCF2' : '#808080'}
                      onClick={() =>
                        updateTrackerLens({ currentMode: 'table' })
                      }
                      tooltip="Table view"
                      tooltipOptions={{ place: 'bottom' }}
                    />
                  </div>
                )}
                <div className="topic-header_button-container">
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center'
                    }}
                  >
                    {viewKey === 'PROJECT_HUB' && (
                      <Dropdown
                        closeOnClick={false}
                        menuClassName="project-hub-filters"
                        trigger={
                          <IconButton
                            color={card_font_color || '#000'}
                            fontSize={22}
                            icon="settings"
                            tooltip="Filter types"
                            tooltipOptions={tooltipConfig}
                          />
                        }
                      >
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column'
                          }}
                        >
                          {projectHubFilterTypes.map((item, i) => (
                            <div
                              key={i}
                              onClick={() =>
                                this.updateProjectHubFilters(item.key)
                              }
                              className="dropdown-workspace-item"
                            >
                              <p
                                className="grey-link"
                                style={{
                                  color: projectHubLens.activeFilters.includes(
                                    item.key
                                  )
                                    ? '#f2ab13'
                                    : '#000',
                                  fontSize: '12px'
                                }}
                              >
                                {item.title}
                              </p>
                              <span className="mb3">
                                <Switch
                                  className="mt2"
                                  on={
                                    projectHubLens.activeFilters.includes(
                                      item.key
                                    )
                                      ? true
                                      : false
                                  }
                                />
                              </span>
                            </div>
                          ))}
                        </div>
                      </Dropdown>
                    )}
                    <HeaderLiveUsers />
                    {this.renderShareIcon()}
                    <div
                      className="semicircle"
                      onMouseEnter={this.showIcon}
                      onMouseLeave={this.hideIcon}
                    ></div>
                    <div
                      className={expandablePanelClass}
                      onMouseEnter={this.showIcon}
                      onMouseLeave={this.hideIcon}
                    >
                      <IconButton
                        containerClasses="width-unset"
                        color="#515050"
                        fontAwesome
                        icon={iconAnchor ? 'caret-right' : 'caret-left'}
                        onClick={this.toggleAnchor}
                      />
                      {this.renderSearchIcon()}
                      {isPrioritize ? (
                        <IconButton
                          onClick={togglePriorityView}
                          icon="web"
                          color="#3B3155"
                          tooltip="Sub Board"
                          tooltipOptions={tooltipConfig}
                        />
                      ) : null}
                      {!searchInput ? (
                        <QuickRightBarActions
                          tooltipOptions={tooltipConfig}
                          groupBy={isGroupBy}
                          topicId={topicId}
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
                {this.renderDots()}
              </div>
            )}
          </div>
        </div>
        {addViewsPanelVisible && canShowAddViewsPanel && <AddViewsPanel />}
      </header>
    );
  }
}

const mapState = (state, props) => {
  const sm = stateMappings(state);
  const {
    user,
    utilities: { active_design },
    tools: {
      trackerLens: { currentMode }
    },
    filters: { showFilterPanel },
    lensList: customLenses,
    menus: { displayRightSubMenuForMenu },
    tools: { projectHubLens },
    page: { page, topicId }
  } = sm;
  const uiSettings = getUiSettings(state);
  const subtopicsPanelView = uiSettings.subtopics_panel_view || 'HEX';
  const currentView = get(user, 'attributes.ui_settings.tips_view');
  const numOfActiveFilters = filterMap(state).length;
  const boards = pageViewMappings[page] || {};

  return {
    active_design,
    user: sm.user,
    displayRightSubMenuForMenu,
    topicMinimized: !sm.menus.displayHexPanel,
    subtopicsPanelView,
    domains: getDomains(state),
    currentDomain: getThisDomain(getDomains(state)),
    currentView,
    currentMode,
    pinnedLensesBarVisible: uiSettings.pinned_lenses_bar_visible,
    addViewsPanelVisible: uiSettings.add_option,
    viewKey: getRelevantViewForPage(state),
    numOfActiveFilters,
    showFilterPanel,
    activeTemplate: uiSettings.current_active_template,
    boards,
    customLenses,
    projectHubLens,
    topicId
  };
};

const mapDispatch = {
  updateShowTutorial,
  setEditDomainModalOpen,
  setUserInvitationModalOpen,
  getLeftPxFixedHeader,
  setUpdateTopicModalOpen,
  toggleHexPanel,
  searchTopicsAndCardsResult,
  clearSearchCardsResult,
  clearSearchTopicsResult,
  setDomainSubtopicsView,
  setRightMenuOpenForMenu,
  togglePriorityView,
  updateTrackerLens,
  setShowFilterPanel,
  updateProjectHubLens
};

export default connect(
  mapState,
  mapDispatch
)(
  QueryRenderer(WorkspaceHeader, {
    query: graphql`
      query WorkspaceHeaderQuery($topicId: ID!, $config: String!) {
        bannerHeightConfig: config(owner: $topicId, config: $config) {
          id
          value
        }
      }
    `,
    vars: ({ viewKey }) => ({
      topicId: 'Topic:0',
      config: `${viewKey}.banner_height`
    })
  })
);
