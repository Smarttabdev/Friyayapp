/* eslint-disable complexity */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import QuickRightBarActions from 'Components/shared/assemblies/QuickRightBarActions';
import Icon from 'Components/shared/Icon';
import LoadingIndicator from 'Src/components/shared/LoadingIndicator';
import TopicTitleEditor from 'Src/components/shared/topics/elements/TopicTitleEditor';
import { setUpdateTopicModalOpen } from 'Src/newRedux/interface/modals/actions';
import { setRightMenuOpenForMenu } from 'Src/newRedux/interface/menus/actions';
import {
  clearSearchCardsResult,
  clearSearchTopicsResult
} from 'Src/newRedux/database/search/actions';
import { searchTopicsAndCardsResult } from 'Src/newRedux/database/search/thunks';
import { stateMappings } from 'Src/newRedux/stateMappings';
import {
  getLeftPxFixedHeader,
  setTopicPanelView
} from 'Src/newRedux/interface/menus/thunks';
import { getThisDomain } from 'Src/lib/utilities';
import { getDomains } from 'Src/newRedux/database/domains/selectors';
import { getRootTopic } from 'Src/newRedux/database/topics/selectors';
import { toggleSubtopicPanel } from 'Src/newRedux/interface/lenses/thunks';
import PinLenses from './../PinLenses';
import AddCardOrSubtopic from 'Components/shared/assemblies/AddCardOrSubtopic';
import { togglePriorityView } from 'Src/newRedux/utilities/actions';
import get from 'lodash/get';
import CardDropdownMenu from './icon_dropdown_menu/CardDropdownMenu';
import ViewDropdownMenu from './icon_dropdown_menu/ViewDropdownMenu';
import FileDropdownMenu from './icon_dropdown_menu/FileDropdownMenu';
import ChatDropdownMenu from './icon_dropdown_menu/ChatDropdownMenu';
import { pageViewMappings } from 'Lib/config/lenses/lenses';
import TopicActionsDropdown from 'Src/components/shared/topics/elements/TopicActionsDropdown';
import {
  getUiSettings,
  setUserUiSettings,
  getCustomLensId
} from 'Src/helpers/user_config';
import VideoDropdownMenu from './icon_dropdown_menu/VideoDropdownMenu';
import HeaderLiveUsers from 'Src/components/shared/HeaderLiveUsers';
import cardLenses from 'Lib/config/lenses/cards';
import { DEFAULT_COLOR } from 'Src/appConstants';
import { updateTrackerLens } from 'Src/newRedux/interface/lenses/actions';
import Resizable from 're-resizable';
import { setShowFilterPanel } from 'src/newRedux/filters/actions';
import { filterMap } from 'src/components/shared/filters/ActiveFiltersPanel';
import Dropdown from 'Components/shared/Dropdown';
import Switch from 'Components/shared/ToggleSwitch';
import Tooltip from 'Components/shared/Tooltip';
import { getRelevantViewForPage } from 'Src/newRedux/interface/lenses/selectors';
import { updateProjectHubLens } from 'Src/newRedux/interface/lenses/actions';
import { projectHubFilterTypes } from 'src/components/shared/CardAndBoardTypes';
import TimeframeSelectors from 'Src/components/shared/TimeframeSelectors';
import { updateTimeframe } from 'Src/newRedux/interface/lenses/actions';
import { toggleAlphabetFilter } from 'Src/newRedux/database/GIDBFLenses/actions';
import {
  updateTeamPlanLens,
  updateProjectPlanLens,
  updateGoalPlanLens
} from 'Src/newRedux/interface/lenses/actions';
import DomainLogo from 'Src/components/shared/DomainLogo';
import WorkspaceTitleEditor from 'Src/components/shared/WorkspaceTitleEditor';
import Ability from 'Src/lib/ability';
import WorkspaceActionsDropdown from 'Src/components/shared/WorkspaceActionsDropdown';
import MainFormPage from 'Components/pages/MainFormPage';
import { setUserInvitationModalOpen } from 'Src/newRedux/interface/modals/actions';
import SwitchFinderLayout from 'Src/components/lenses/topic_lenses/Finder/SwitchFinderLayout';
import IconButton from 'Src/components/shared/buttons/IconButton';
import { viewPayload } from 'Src/utils/views';
import { getBoardTypeAttributes } from 'src/utils/icons';
import { boardTypes } from 'src/components/shared/CardAndBoardTypes';
import { updateTopic } from 'Src/newRedux/database/topics/thunks';

const noteViews = ['SMALL_GRID', 'GRID', 'CARD', 'PAGES'];
const timeFrameViews = [
  'OVERVIEW',
  'MY_DAY',
  'TEAM_DAY',
  'TEAM_PLAN',
  'PROJECT_PLAN',
  'GOAL_PLAN',
  'CONTRIBUTORS'
];

class TopicHeader extends Component {
  static propTypes = {
    topic: PropTypes.object,
    displayLeftSubtopicMenuForTopic: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.bool
    ]),
    showHexButton: PropTypes.bool,
    setUpdateTopicModalOpen: PropTypes.func.isRequired,
    setTopicPanelView: PropTypes.func.isRequired,
    currentView: PropTypes.string,
    viewKey: PropTypes.string,
    leftMenuOpen: PropTypes.bool,
    isWorkspaceListSidebarOpen: PropTypes.bool,
    getLeftPxFixedHeader: PropTypes.func.isRequired,
    toggleSubtopicPanel: PropTypes.func.isRequired,
    subtopicPanelVisible: PropTypes.bool,
    view: PropTypes.object,
    searchTopicsAndCardsResult: PropTypes.func.isRequired,
    clearSearchCardsResult: PropTypes.func.isRequired,
    active_design: PropTypes.any,
    displayRightSubMenuForMenu: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    boardsForPage: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.dropdownRef = React.createRef();
    this.headerRef = React.createRef();
    this.topicTitleRef = React.createRef();
    this.menuRef1 = React.createRef();
    this.menuRef2 = React.createRef();
    this.workspaceTitleRef = React.createRef();

    this.state = {
      topicNameEditMode: false,
      searchInput: false,
      query: '',
      iconAnchor: false,
      iconVisible: false,
      showTopicOptions: false,
      editTopicWidth: 100,
      bannerHeight: 0
    };

    this.setTopicPanelView = props.setTopicPanelView;
    this.getLeftPxFixedHeader = props.getLeftPxFixedHeader;
    this.toggleSubtopicPanel = props.toggleSubtopicPanel;
    this.setUpdateTopicModalOpen = props.setUpdateTopicModalOpen;
    this.handleTopicViewSelect = this.handleTopicViewSelect.bind(this);
  }

  canUpdate = () => {
    const { isHome, currentDomain } = this.props;
    return (
      !isHome ||
      (Ability.can('update', 'self', currentDomain) && currentDomain.id !== '0')
    );
  };

  handleToggleTopicNameEditMode = () => {
    if (!this.canUpdate() || this.props.isMainBoard) return;
    this.setState(state => ({ topicNameEditMode: !state.topicNameEditMode }));
  };

  handleTopicViewSelect = topicViewMode => {
    const { subtopicPanelVisible, topic } = this.props;

    if (!subtopicPanelVisible) {
      this.toggleSubtopicPanel(topic);
    }

    this.setTopicPanelView(topicViewMode);
  };

  /**
   * Determine if cards visibility state hidden or not.
   *
   * @return {Boolean}
   */
  isCardsHidden = () => {
    const { topic, cardsHidden } = this.props;
    return cardsHidden || (topic && topic.attributes.card_hidden);
  };

  addNewTopic = () => {
    const { subtopicPanelVisible, toggleSubtopicPanel, topic } = this.props;
    !subtopicPanelVisible && toggleSubtopicPanel(topic);
    this.props.addNewTopic();
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

  toggleTopicOptions = () => {
    if (!this.canUpdate() || this.props.isMainBoard) return;
    this.setState({ showTopicOptions: !this.state.showTopicOptions });
  };

  setTopicEditWidth = () => {
    const header = this.headerRef.current;
    const title = this.topicTitleRef.current;
    const headerMenu1 = this.menuRef1.current;
    const headerMenu2 = this.menuRef2.current;
    const titleWidth =
      title.offsetWidth - Math.round(title.offsetWidth * 0.354);
    const usableWidth =
      header.offsetWidth -
      (headerMenu1.offsetWidth + (headerMenu2?.offsetWidth || 0));
    const editTopicWidth = titleWidth > usableWidth ? usableWidth : titleWidth;
    this.setState({ editTopicWidth: editTopicWidth });
  };

  componentDidMount() {
    this.handleShowOrHideToolsConfigDiv();

    const { viewKey } = this.props;
    const notGIDBF =
      viewKey != 'TEAM_PLAN' &&
      viewKey != 'TEAM_DAY' &&
      viewKey != 'PROJECT_PLAN' &&
      viewKey != 'GOAL_PLAN' &&
      viewKey != 'MY_PLAN' &&
      viewKey != 'MY_DAY' &&
      viewKey != 'MY_NOTES' &&
      viewKey != 'NOTEBOOK' &&
      viewKey != 'KNOWLEDGE_BASE';
    notGIDBF && this.setTopicEditWidth();
  }

  componentDidUpdate(prevProps, prevState) {
    this.handleShowOrHideToolsConfigDiv();
    if (this.state.showTopicOptions === true) {
      const dropdown = this.dropdownRef.current;
      this.hideViewDropdownOnClickOut(dropdown);
    }
    // if(this.state.topicNameEditMode === false){
    //   this.setTopicEditWidth();
    // }
  }

  handleShowOrHideToolsConfigDiv = () => {
    const parent = document.querySelector('#toolsConfig');
    if (!parent?.children?.length) {
      parent.style.display = 'none';
    } else {
      parent.style.display = 'flex';
    }
  };

  toggleLeftSubtopicMenu = () => {
    const {
      topic,
      setLeftSubtopicMenuOpenForTopic,
      displayLeftSubtopicMenuForTopic
    } = this.props;
    const { topicId } = displayLeftSubtopicMenuForTopic;
    setLeftSubtopicMenuOpenForTopic(topicId ? null : topic.id);
  };

  handleToggleTopicSection = () => {
    const { setUserUiSettings, subtopicPanelVisible } = this.props;
    setUserUiSettings({
      subtopic_panel_visible: !subtopicPanelVisible
    });
  };

  handleToggleSprintBar = () => {
    const { sprintBarVisible, setUserUiSettings } = this.props;
    setUserUiSettings({ sprint_bar_visible: !sprintBarVisible });
  };

  isVisible = elem => {
    !!elem &&
      !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
  };

  hideViewDropdownOnClickOut = element => {
    const outsideClickListener = event => {
      if (!element.contains(event.target) || this.isVisible(element)) {
        this.setState({ showTopicOptions: false });
        removeClickListener();
      }
    };
    const removeClickListener = () => {
      document.removeEventListener('click', outsideClickListener);
    };
    document.addEventListener('click', outsideClickListener);
  };

  // eslint-disable-next-line complexity
  renderSearchIcon = () => {
    const { searchInput, query } = this.state;
    const searchClass = classNames('search-input', { open: searchInput });
    if (searchInput) this.searchInput.focus();
    return (
      <div className="search-container">
        <Icon
          button
          icon="search"
          fontAwesome
          color="#63A0C3"
          onClick={this.handleClickSearch}
          tooltip="Search"
          tooltipOptions={{ place: 'bottom' }}
          style={{ fontSize: '14px' }}
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
    if (!this.canUpdate() || this.props.isMainBoard) return null;
    const forIds = Math.ceil(Math.random() * 100000, 6);
    const { isHome, userId, topic, setUserInvitationModalOpen } = this.props;

    const toolTip = isHome ? 'Invite Members' : 'Share';
    return (
      <div
        data-tip={toolTip}
        data-for={forIds}
        style={{ marginRight: '7px', marginTop: '5px' }}
      >
        <span
          onClick={() =>
            isHome
              ? setUserInvitationModalOpen(userId)
              : this.props.setUpdateTopicModalOpen(topic.id, true, 1)
          }
          style={{
            color: '#9B51E0',
            cursor: 'pointer',
            fontSize: '18px'
            // marginRight: '7px'
          }}
          className={cn('material-icons', isHome && 'invite-person-icon')}
        >
          person_add
        </span>
        <Tooltip {...{ place: 'bottom' }} id={forIds} />
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
          className="dots-container"
          // onMouseEnter={this.showIcon}
          // onMouseLeave={this.hideIcon}
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

  handleTimelineModeChange = columnMode => {
    this.props.updateTimeframe({ columnMode, tool: this.props.viewKey });
  };

  handleDateRangeChange = ({ startDate, endDate }) => {
    this.props.updateTimeframe({
      startDate,
      endDate,
      tool: this.props.viewKey
    });
  };

  handleOffsetChange = (id, offset) => {
    this.props.updateTimeframe({
      offsets: {
        ...this.props.offsets,
        [id]: offset
      },
      tool: this.props.viewKey
    });
  };

  handleViewToggle = () => {
    const {
      viewKey,
      vertical,
      updateTeamPlanLens,
      updateProjectPlanLens,
      updateGoalPlanLens
    } = this.props;
    (viewKey === 'TEAM_PLAN'
      ? updateTeamPlanLens
      : viewKey === 'GOAL_PLAN'
      ? updateGoalPlanLens
      : updateProjectPlanLens)({
      vertical: !vertical
    });
  };

  handleOpenToolConfig = () => {
    this.props.setRightMenuOpenForMenu('Tool Configuration');
  };

  handleSwitchNoteViews = () => {
    const { viewKey, setUserUiSettings } = this.props;
    const currentToolIndex = noteViews.indexOf(viewKey);
    const nextTool = noteViews[currentToolIndex + 1];

    if (nextTool) {
      return setUserUiSettings(viewPayload(nextTool));
    } else {
      return setUserUiSettings(viewPayload(noteViews[0]));
    }
  };

  handleUpdateBoardType = type => {
    const { updateTopic, topicId } = this.props;

    const attributes = { tag_list: [type] };
    return updateTopic({ id: topicId, attributes });
  };

  render() {
    const {
      topic,
      currentView,
      togglePriorityView,
      active_design,
      pinnedLensesBarVisible,
      topicId,
      hideQuickToolbar,
      updateTrackerLens,
      currentMode,
      bannerHeightConfig,
      boardsForPage,
      viewKey,
      updateProjectHubLens,
      currentDomain,
      isHome,
      projectHubLens,
      customLensId,
      addViewsPanelVisible,
      isMainBoard
    } = this.props;
    const {
      topicNameEditMode,
      searchInput,
      iconAnchor,
      iconVisible,
      showTopicOptions,
      editTopicWidth,
      bannerHeight
    } = this.state;
    const {
      card_font_color,
      banner_color_display,
      banner_image_display,
      banner_color,
      banner_image_url
    } = active_design || {};
    const isOpen = iconVisible || searchInput || iconAnchor;

    const isPrioritize = viewKey === 'PRIORITIZE';
    const isGroupBy = [
      'ACTION_PLAN',
      'SHEET',
      'PROJECT_PLAN',
      'GOAL_PLAN',
      'TODO',
      'TIMELINE'
    ].includes(viewKey);

    //const isGroupBy = false; // change to above when group by starts working
    const expandablePanelClass = classNames(
      'flex-r-center',
      'expandable-panel',
      'opened',
      {
        opened: isOpen,
        extra: (isPrioritize || isGroupBy || searchInput) && isOpen
      }
    );
    const tooltipConfig = { place: 'bottom' };

    const viewConfig = get(cardLenses, viewKey);
    const topicTitle = isHome ? 'Main Board' : topic.attributes.title;

    const boardTypeAttr = getBoardTypeAttributes(
      topic.attributes.tag_list[0] || null
    );

    const handleResize = (e, direction, ref, d) => {
      const height = parseInt(ref.style.height);
      this.setState({ bannerHeight: height });
      mutations.setConfig({
        owner: toGid('Topic', this.props.topic?.id || 0),
        config: `${this.props.viewKey}.banner_height`,
        value: height
      });
    };

    const showWorkspaceLogo = isMainBoard;
    const showTopicLogo =
      !isHome && !isMainBoard && ['STARTER'].includes(viewKey);
    const showBoardTypeDropdown = !showWorkspaceLogo && !showTopicLogo;
    const showIconDropdowns = ![
      'STARTER',
      'INBOX',
      'MY_PLAN',
      'TEAM_PLAN',
      'PROJECT_PLAN',
      'GOAL_PLAN',
      'FINDER'
    ].includes(viewKey);
    const showTimeSelector = timeFrameViews.includes(viewKey);
    const showColumnToggle = [
      'TEAM_PLAN',
      'PROJECT_PLAN',
      'GOAL_PLAN'
    ].includes(viewKey);
    const showIndex = ['TEAM_PLAN'].includes(viewKey);

    const color = card_font_color
      ? card_font_color
      : viewKey == 'INBOX'
      ? '#b1b2b4'
      : '';

    const canShowAddViewsPanel = ['TOPIC_TILES'].includes(viewKey);

    return (
      <header className="topic-header">
        {(banner_color_display && banner_color) ||
        (banner_image_display && banner_image_url) ? (
          <Resizable
            size={{
              height: bannerHeightConfig?.value || bannerHeight
            }}
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
        {topic ? (
          <Fragment>
            {!pinnedLensesBarVisible && <PinLenses />}
            <div className="flex-r-center">
              <div
                className="flex-1 flex-r-center-spacebetween topic-header-container"
                ref={this.headerRef}
              >
                <div className="flex-r-center topic-header-main">
                  {showWorkspaceLogo && (
                    <div
                      className="flex"
                      style={{
                        marginRight: '10px',
                        color: card_font_color
                          ? card_font_color
                          : viewKey == 'INBOX'
                          ? '#fff'
                          : ''
                      }}
                    >
                      <DomainLogo
                        domain={currentDomain}
                        preferredColor={active_design.workspace_font_color}
                        rounded
                        componentClass="domain-logo domain-logo-workspace-header"
                      />
                    </div>
                  )}
                  <div className="flex-r-center topic-header-main">
                    {showBoardTypeDropdown && (
                      <Dropdown
                        className="topic-header-main__board-type-dropdown mr5 mt2"
                        trigger={
                          <IconButton
                            icon={boardTypeAttr.icon}
                            outlined={boardTypeAttr.outlined}
                            color={card_font_color || boardTypeAttr.color}
                            fontSize={16}
                          />
                        }
                      >
                        {boardTypes.map((x, i) => (
                          <div
                            className="topic-header-main__board-type-dropdown-list "
                            key={i}
                            onClick={() => this.handleUpdateBoardType(x.type)}
                          >
                            <IconButton
                              additionalClasses="font-size-16 mr5"
                              icon={x.iconType}
                              outlined={x?.outlined}
                              color={x.color}
                              fontAwesome={x.fontAwesome}
                            />
                            <span>{x.label}</span>
                          </div>
                        ))}
                      </Dropdown>
                    )}
                    <div
                      style={{
                        position: 'relative',
                        display: 'flex',
                        pointerEvents:
                          !this.canUpdate() || isMainBoard ? 'none' : 'unset'
                      }}
                    >
                      <h1
                        className="m0 text-center title topic-header-h1"
                        onDoubleClick={
                          !isMainBoard && this.handleToggleTopicNameEditMode
                        }
                        onClick={
                          topicNameEditMode ? null : this.toggleTopicOptions
                        }
                        style={{
                          backgroundColor: `${
                            showTopicOptions ? '#DADADA' : ''
                          }`,
                          // color: `${card_font_color ? card_font_color : ''}`
                          color
                        }}
                      >
                        {isMainBoard && topicNameEditMode && (
                          <WorkspaceTitleEditor
                            additionalClasses="title-editor-form form-inline full-width"
                            workspaceTitle={currentDomain.attributes.name}
                            onFinishEditing={this.handleToggleTopicNameEditMode}
                            // setFormWidth={editTopicWidth}
                          />
                        )}
                        {!isMainBoard && topicNameEditMode && (
                          <TopicTitleEditor
                            additionalClasses="title-editor-form form-inline full-width"
                            topic={topic}
                            onFinishEditing={this.handleToggleTopicNameEditMode}
                            //setFormWidth={editTopicWidth}
                          />
                        )}
                        {!topicNameEditMode && showTopicLogo && (
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center'
                            }}
                          >
                            <span
                              style={{
                                width: '4.2rem',
                                height: '4.2rem',
                                marginRight: '1.3rem',
                                borderRadius: '50%',
                                background: DEFAULT_COLOR,
                                color: 'rgba(255,255,255, 0.8)',
                                padding: '1rem',
                                fontSize: '2rem',
                                fontWeight: 400,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              {topicTitle && topicTitle.slice(0, 2)}
                            </span>

                            <span
                              className="topic-header-non-editable"
                              ref={this.topicTitleRef}
                              style={{
                                display: 'flex',
                                alignItems: 'baseline'
                              }}
                            >
                              <div>{topicTitle}</div>
                            </span>
                          </div>
                        )}
                        {!topicNameEditMode && !showTopicLogo && (
                          <span
                            className="topic-header-non-editable"
                            ref={this.topicTitleRef}
                            style={{
                              display: 'flex',
                              alignItems: 'baseline'
                            }}
                          >
                            <div>{topicTitle}</div>
                          </span>
                        )}
                      </h1>
                      <span
                        style={{ alignSelf: 'center', marginTop: '5px', color }}
                      >
                        {boardsForPage[viewKey] &&
                          `/ ${boardsForPage[viewKey].name}`}
                      </span>
                      {showTopicOptions && (
                        <span className="topicOptions" ref={this.dropdownRef}>
                          {isHome && (
                            <WorkspaceActionsDropdown
                              handleRenameWorkspace={
                                this.handleToggleTopicNameEditMode
                              }
                            />
                          )}
                          {!isMainBoard && (
                            <TopicActionsDropdown
                              color={card_font_color}
                              topic={topic}
                              cardsHidden={this.isCardsHidden}
                              onRenameTopicSelected={
                                this.handleToggleTopicNameEditMode
                              }
                              withoutAddImage
                              addNewTopic={this.addNewTopic}
                              noButton={true}
                            />
                          )}
                          <div className="topicOptionsFooter">
                            <i>Double click the Board title to edit</i>
                          </div>
                        </span>
                      )}
                    </div>
                    {viewKey == 'MY_TEAMS' && (
                      <div
                        title="Add Team"
                        className="add-team-button mt5 pointer"
                        onClick={() => this.setState({ mainFormOpen: true })}
                      >
                        <Icon icon="add" color="#808080" />
                      </div>
                    )}
                    <div
                      className="board-top-bar_element left-space"
                      ref={this.menuRef1}
                    ></div>
                  </div>
                  {showTimeSelector && (
                    <TimeframeSelectors
                      mode={this.props.columnMode}
                      startDate={this.props.startDate}
                      endDate={this.props.endDate}
                      offsets={this.props.offsets}
                      onModeChange={this.handleTimelineModeChange}
                      onDateRangeChange={this.handleDateRangeChange}
                      onOffsetChange={this.handleOffsetChange}
                      bold
                      color={card_font_color}
                      dropZoneEnabled={timeFrameViews.includes(viewKey)}
                    />
                  )}
                  {showIndex && (
                    <div
                      className="flex flex-r-center ml8 mr5 pointer no-wrap"
                      onClick={this.props.toggleAlphabetFilter}
                    >
                      Jump to
                    </div>
                  )}
                </div>

                {!hideQuickToolbar && (
                  <div
                    className="flex-r-center right-container"
                    ref={this.menuRef2}
                  >
                    <div className="topic-header_button-container">
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                          width: '100%'
                        }}
                      >
                        <HeaderLiveUsers />

                        {/*
                        /*
                        /* 
                      Tools Configurations ++++
                      All tools configurations  are down below
                                                            
                                                           */}

                        <div
                          id="toolsConfig"
                          className="topic-header_button-container_tools-config"
                        >
                          {showColumnToggle && (
                            <Icon
                              button
                              icon={
                                this.props.vertical
                                  ? 'view_column'
                                  : 'view_stream'
                              }
                              outlined
                              color="#808080"
                              containerClasses="mr10"
                              onClick={this.handleViewToggle}
                            />
                          )}
                          {viewKey == 'FINDER' && <SwitchFinderLayout />}
                          {viewKey === 'PROJECT_HUB' && (
                            <Dropdown
                              closeOnClick={false}
                              menuClassName="project-hub-filters"
                              trigger={
                                <Icon
                                  button
                                  color={'#000'}
                                  fontSize={18}
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
                          {viewKey === 'TRACKER' && (
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center'
                              }}
                            >
                              <IconButton
                                additionalClasses="mr10"
                                fontSize={26}
                                icon="view_column"
                                outlined
                                color={
                                  currentMode === 'lane' ? '#56CCF2' : '#808080'
                                }
                                onClick={() =>
                                  updateTrackerLens({ currentMode: 'lane' })
                                }
                                tooltip="Lane view"
                                tooltipOptions={{ place: 'bottom' }}
                              />
                              <IconButton
                                style={{ display: 'none' }}
                                // additionalClasses="mr5"
                                fontSize={20}
                                icon="storage"
                                color={
                                  currentMode === 'timeline'
                                    ? '#56CCF2'
                                    : '#808080'
                                }
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
                                color={
                                  currentMode === 'table'
                                    ? '#56CCF2'
                                    : '#808080'
                                }
                                onClick={() =>
                                  updateTrackerLens({ currentMode: 'table' })
                                }
                                tooltip="Table view"
                                tooltipOptions={{ place: 'bottom' }}
                              />
                            </div>
                          )}
                          {noteViews.includes(viewKey) && (
                            <IconButton
                              additionalClasses="mr10"
                              fontSize={22}
                              icon="zoom_out"
                              outlined
                              color={'#808080'}
                              tooltip="Switch View"
                              onClick={this.handleSwitchNoteViews}
                              tooltipOptions={{ place: 'bottom' }}
                            />
                          )}
                          {customLensId && (
                            <IconButton
                              icon="tune"
                              onClick={this.handleOpenToolConfig}
                              tooltip="Tool Configuration"
                              tooltipOptions={tooltipConfig}
                              style={{
                                color:
                                  viewKey == 'INBOX' ? '#b1b2b4' : '#808080'
                              }}
                            />
                          )}
                          {this.props.numOfActiveFilters > 0 &&
                            viewKey != 'INBOX' && (
                              <Dropdown
                                menuStyle={{ left: 'unset', right: 0 }}
                                className="flex flex-r-center"
                                closeOnClick={false}
                                trigger={
                                  <Icon
                                    style={{ marginTop: '1px' }}
                                    button
                                    color={'#AA31B9'}
                                    fontSize={20}
                                    icon="error"
                                    tooltip="Show Filters"
                                    tooltipOptions={tooltipConfig}
                                  />
                                }
                              >
                                <p
                                  style={{
                                    color: '#B3B3B3',
                                    fontStyle: 'italic'
                                  }}
                                >
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
                                      on={
                                        this.props.showFilterPanel
                                          ? true
                                          : false
                                      }
                                    />
                                  </span>
                                </div>
                              </Dropdown>
                            )}
                        </div>
                        {showIconDropdowns && (
                          <div className="topic-header_button-container topic-header_button-container-bg">
                            <AddCardOrSubtopic
                              // color={card_font_color}
                              topic={topic}
                              displayAddCardButton
                              displayAddSubtopicButton
                              displayAddChatButton
                              displayAddVideoRoomButton
                              icon="add_circle"
                              showAddTextCard={this.isTextCardVisible()}
                              showUploadFileCard={this.isUploadCardVisible()}
                              dropdownStyle={{ left: 'unset', right: 0 }}
                              topicHeader
                              transparent={false}
                            />
                            <ViewDropdownMenu
                              showAddViewsPanel
                              topicHeader
                              {...this.props}
                            />
                            <CardDropdownMenu {...this.props} topicHeader />
                            <FileDropdownMenu {...this.props} topicHeader />
                            <ChatDropdownMenu {...this.props} topicHeader />
                            <VideoDropdownMenu {...this.props} topicHeader />
                          </div>
                        )}

                        {/* <div className="semicircle"></div> */}
                        <div
                          className={expandablePanelClass}
                          onMouseEnter={this.showIcon}
                          onMouseLeave={this.hideIcon}
                        >
                          {isOpen && (
                            <Fragment>
                              <Icon
                                button
                                // containerClasses="width-unset"
                                color="#515050"
                                fontAwesome
                                icon={iconAnchor ? 'caret-right' : 'caret-left'}
                                // containerStyle={{ marginRight: 0, marginLeft: -8 }}
                                onClick={this.toggleAnchor}
                              />
                              {this.renderSearchIcon()}
                              {!searchInput && isPrioritize ? (
                                <Icon
                                  button
                                  onClick={togglePriorityView}
                                  icon="web"
                                  color="#3B3155"
                                  tooltip="Sub Board"
                                  tooltipOptions={tooltipConfig}
                                  style={{ fontSize: '18px' }}
                                />
                              ) : null}
                              {!searchInput ? (
                                <QuickRightBarActions
                                  tooltipOptions={tooltipConfig}
                                  topicId={topicId}
                                  groupBy={isGroupBy}
                                  topicHeader
                                />
                              ) : null}
                              {!searchInput ? this.renderShareIcon() : null}
                            </Fragment>
                          )}

                          {this.renderDots()}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* {addViewsPanelVisible && canShowAddViewsPanel && <AddViewsPanel />} */}
            {!isMainBoard && topic.attributes.description && (
              <div className="row" style={{ marginLeft: 0, marginRight: 0 }}>
                <h4 style={{ color: card_font_color }}>
                  {topic.attributes.description}
                </h4>
              </div>
            )}
          </Fragment>
        ) : (
          <LoadingIndicator />
        )}
        {this.state.mainFormOpen && (
          <div style={{ position: 'absolute', left: '270px' }}>
            <MainFormPage
              selectedTab="group-pane"
              onClose={() => this.setState({ mainFormOpen: false })}
            />
          </div>
        )}
      </header>
    );
  }
}

const mapState = (state, props) => {
  const sm = stateMappings(state);
  const {
    user,
    page: { topicId: pageTopicId, parentTopicId, isHome, page },
    utilities: { active_design },
    menus: { displayRightSubMenuForMenu },
    filters: { showFilterPanel },
    tools: {
      trackerLens: { currentMode },
      projectHubLens,
      teamPlanLens,
      projectPlanLens,
      goalPlanLens,
      timeframe
    },
    topics
  } = sm;
  const topicId = parentTopicId || pageTopicId;
  const topic = topics[topicId];
  const ui_settings = getUiSettings(state, topicId);
  const topic_default = get(props.topic, 'attributes.default_view_id');
  const currentView = ui_settings.current_active_template;
  const viewKey = getRelevantViewForPage(state, topicId);
  const leftMenuOpen = ui_settings.left_menu_open;
  const subtopicPanelVisible = ui_settings.subtopic_panel_visible;
  const sprintBarVisible = ui_settings.sprint_bar_visible;
  const cardsHidden = ui_settings.card_hidden;
  const activeFilters = filterMap(state);
  const boardsForPage = pageViewMappings[page] || {};
  const rootTopic = getRootTopic(state);
  const vertical =
    viewKey === 'PROJECT_PLAN'
      ? projectPlanLens.vertical
      : viewKey === 'GOAL_PLAN'
      ? goalPlanLens.vertical
      : teamPlanLens.vertical;

  const pages = ['home', 'topics'];
  const isBoardsPage = pages.includes(page);
  const isMainBoard = rootTopic?.id === topic?.id;
  return {
    isHome,
    topic,
    vertical,
    displayLeftSubtopicMenuForTopic: sm.menus.displayLeftSubtopicMenuForTopic,
    isWorkspaceListSidebarOpen: sm.menus.isWorkspaceListSidebarOpen,
    cardsHidden,
    topic_default,
    leftMenuOpen,
    subtopicPanelVisible,
    active_design,
    sprintBarVisible,
    currentView,
    currentMode,
    viewKey,
    userId: user.id,
    topicId,
    displayRightSubMenuForMenu,
    pinnedLensesBarVisible: ui_settings.pinned_lenses_bar_visible,
    numOfActiveFilters: activeFilters.length,
    activeFilters,
    showFilterPanel,
    currentDomain: getThisDomain(getDomains(state)),
    boardsForPage,
    projectHubLens,
    customLensId: getCustomLensId(state),
    ...timeframe,
    ...timeframe[viewKey],
    addViewsPanelVisible: ui_settings.add_option,
    rootTopic,
    isBoardsPage,
    isMainBoard
  };
};

const mapDispatch = {
  setUpdateTopicModalOpen,
  setTopicPanelView,
  getLeftPxFixedHeader,
  toggleSubtopicPanel,
  searchTopicsAndCardsResult,
  clearSearchCardsResult,
  clearSearchTopicsResult,
  togglePriorityView,
  setUserUiSettings,
  updateTrackerLens,
  setRightMenuOpenForMenu,
  setShowFilterPanel,
  updateProjectHubLens,
  toggleAlphabetFilter,
  setUserInvitationModalOpen,
  updateTeamPlanLens,
  updateProjectPlanLens,
  updateGoalPlanLens,
  updateTimeframe,
  updateTopic
};

export default connect(
  mapState,
  mapDispatch
)(
  QueryRenderer(TopicHeader, {
    query: graphql`
      query TopicHeaderQuery($topicId: ID!, $config: String!) {
        bannerHeightConfig: config(owner: $topicId, config: $config) {
          id
          value
        }
      }
    `,
    vars: ({ topicId, viewKey }) => ({
      topicId: toGid('Topic', topicId || 0),
      config: `${viewKey}.banner_height`
    })
  })
);
