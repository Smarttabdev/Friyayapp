import React, { Fragment, Component, useEffect } from 'react';
import { connect } from 'react-redux';
import { camelize } from 'inflection';
import LoadingIndicator from 'Components/shared/LoadingIndicator';
import { stateMappings } from 'Src/newRedux/stateMappings';
import Icon from 'Components/shared/Icon';
import { get, groupBy, isEqual } from 'lodash';
import cn from 'classnames';
import FormInput from 'Components/shared/forms/FormInput';

import { dragItemTypes } from 'Components/shared/drag_and_drop/dragTypeEnum';
import GenericDragDropListing from 'Components/shared/drag_and_drop/GenericDragDropListing';
import { getRelevantViewForPage } from 'Src/newRedux/interface/lenses/selectors';
import { setUserLensPinSettings } from 'Src/newRedux/database/topics/thunks';
import { setRightMenuOpenForMenu } from 'Src/newRedux/interface/menus/actions';
import {
  toggleSubtopicPanel,
  selectView,
  toggleWorkspaceTopicsPanel
} from 'Src/newRedux/interface/lenses/thunks';
import { viewPayload } from 'Src/utils/views';
import { pageViewMappings } from 'Lib/config/lenses/lenses';
import Tooltip from 'Components/shared/Tooltip';
import Dropdown from 'Components/shared/Dropdown';
import {
  getUserConfig,
  getUiSettings,
  getCustomLensId,
  setUserUiSettings,
  setUserFilterSettings
} from 'Src/helpers/user_config';
import {
  selectCustomLens,
  createCustomLens,
  updateLens,
  deleteLens
} from 'Src/newRedux/database/lenses/thunks';
import MaterialIcon from 'material-icons-react';
import { setPinnedToolsBarWidth } from 'Src/newRedux/interface/pinnedTools/actions';
import { updateUserUiSettings } from 'Src/newRedux/database/user/thunks';
import RadialProgress from 'Components/shared/RadialProgress';
import { MAX_CARDS_PROGRESS_COUNT } from 'AppConstants';
import Switch from '../shared/ToggleSwitch';
import ToolExplorer from './ToolExplorer';
import OptionsDropdownButton from 'Components/shared/buttons/OptionsDropdownButton';
import { setOrganizerQuizModal } from 'Src/newRedux/interface/modals/actions';
import { hiddenTools } from 'src/components/shared/lensesUtils';
import {
  boardTypes,
  landingBoard
} from 'src/components/shared/CardAndBoardTypes';
import IconButton from 'Src/components/shared/buttons/IconButton';

const hoc = Component => props => {
  const { boards, customLenses, page } = props;

  useEffect(() => {
    const disposer = subscriptions.pinnedLensesOrdersUpdated({
      onNext: () => props.relay.refetch(vars => vars)
    });
    return () => disposer.dispose();
  }, []);

  let pinedLenses =
    props.query?.activePinnedLensesOrder?.order ||
    props.uiSettings.pinned_lenses ||
    [];

  pinedLenses = pinedLenses.filter(key => {
    if (!isNaN(key)) {
      key = get(customLenses, [key, 'attributes', 'current_active_template']);
    }
    return (
      boards &&
      boards[key] &&
      (!boards[key].disabledPages || !boards[key].disabledPages.includes(page))
    );
  });

  return <Component {...props} pinedLenses={pinedLenses} />;
};

class PinLenses extends Component {
  constructor(props) {
    super(props);
    this.pinnedToolsBarRef = React.createRef();
    this.createFormRef = React.createRef();
  }

  state = {
    openToolExplorer: false,
    createLens: false,
    loading: false,
    lensTitle: '',
    editLensTitle: '',
    isEdit: false,
    filteredBoards: this.props.boards || {},
    searchQuery: '',
    editCustomLensId: null,
    favTools: [],
    triggerCloseDropdown: false
  };

  componentDidMount() {
    const barRef = this.pinnedToolsBarRef.current;
    // barRef && this.props.setPinnedToolsBarWidth(barRef.offsetWidth);
    this.updateFavTools();
  }

  componentDidUpdate(prevProps) {
    //prevProps and this.props are always the same
    const barRef = this.pinnedToolsBarRef.current;
    if (
      !isEqual(prevProps.pinedLenses, this.props.pinedLenses) ||
      prevProps.pinnedLensesBarExpanded != this.props.pinnedLensesBarExpanded ||
      prevProps.viewKey != this.props.viewKey
    ) {
      setTimeout(() => {
        const barRef = this.pinnedToolsBarRef.current;
        barRef && this.props.setPinnedToolsBarWidth(barRef.offsetWidth);
      });
    }
    if (prevProps !== this.props) {
      this.updateFavTools();
      this.setState({ filteredBoards: this.props.boards });
    }
  }

  updateFavTools = () => {
    let favTools = [];
    const screenOne = this.props.query.screenOneFavTools?.value || [];
    const screenTwo = this.props.query.screenTwoFavTools?.value || [];
    const screenFour = this.props.query.screenFourFavTools?.value || [];
    const screenSeven = this.props.query.screenSevenFavTools?.value || [];
    const screenEight = this.props.query.screenEightFavTools?.value || [];
    favTools = [
      ...screenOne,
      ...screenTwo,
      ...screenFour,
      ...screenSeven,
      ...screenEight
    ];
    favTools = [...new Set(favTools)];
    this.setState({ favTools });
  };

  handleCancel = event => {
    if (event.keyCode === 27) {
      event.preventDefault();
      this.setState({ createLens: false, lensTitle: '' });
    }
  };

  submitLens = async () => {
    this.setState({ loading: true, createLens: false, lensTitle: '' });

    const createdLensId = await this.props.createCustomLens({
      title: this.state.lensTitle
    });
    this.handlePinLensClick(null, createdLensId);

    this.props.setRightMenuOpenForMenu('Tool Configuration', createdLensId);

    this.setState(prev => ({
      loading: false,
      lensTitle: '',
      triggerCloseDropdown: !prev.triggerCloseDropdown
    }));
  };

  handleOpenOrganizer = () => {
    this.setState(prev => ({
      triggerCloseDropdown: !prev.triggerCloseDropdown
    }));

    this.props.setOrganizerQuizModal({ isOpen: true });
    setTimeout(() => {
      this.setState(prev => ({
        triggerCloseDropdown: !prev.triggerCloseDropdown
      }));
    }, 3000);
  };
  handleLensTitle = title => {
    this.setState({ lensTitle: title });
  };

  updateEditTitleLens = title => {
    this.setState({ editLensTitle: title });
  };

  renameCustomLens = () => {
    this.props.updateLens(this.state.editCustomLensId, {
      title: this.state.editLensTitle
    });
    this.setState({ isEdit: false });
  };

  handleDeleteCustomLens = id => {
    this.props.deleteLens(id);

    Number(this.props.lensId) === Number(id) &&
      this.props.selectCustomLens({
        id: this.props.configurationId,
        current_active_lens_id: null
      });
  };

  handleSelectView = async toView => {
    const {
      setUserUiSettings,
      setRightMenuOpenForMenu,
      lensId,
      customLenses,
      selectCustomLens,
      configurationId,
      setUserFilterSettings,
      updateUserUiSettings,
      currentPage
    } = this.props;
    const tool = customLenses[toView];
    if (tool) {
      selectCustomLens({
        id: configurationId,
        current_active_lens_id: toView
      });
    } else {
      if (lensId) {
        await selectCustomLens({
          id: configurationId,
          current_active_lens_id: null,
          current_active_template: toView
        });
      }
      setUserUiSettings(viewPayload(toView));
    }
    currentPage == 'topics' &&
      updateUserUiSettings({
        newSettings: { all_topics_view: toView }
      });
    setRightMenuOpenForMenu(false);
    if (toView == 'MY_TASKS' || toView == 'MY_WEEKLY_SPREAD_VIEW') {
      setUserFilterSettings({
        assigned: [Number(this.props.currentUser.id)]
      });
    } else {
      setUserFilterSettings({ assigned: [] });
    }
  };

  getDriveIcon = ({ width, height, Imageclass }) => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginRight: '9px'
      }}
      className={Imageclass}
    >
      <img
        alt=""
        aria-hidden="true"
        src="https://www.gstatic.com/images/branding/product/1x/drive_48dp.png"
        srcSet="https://www.gstatic.com/images/branding/product/1x/drive_48dp.png 1x, https://www.gstatic.com/images/branding/product/2x/drive_48dp.png 2x "
        width={width || '20px'}
        height={height || '20px'}
      />
    </div>
  );

  handlePinLensClick = (e, key) => {
    const { query, pinedLenses, setUserLensPinSettings, topicId } = this.props;
    if (query?.activePinnedLensesOrder) {
      let order;
      if (query.activePinnedLensesOrder.order.includes(key))
        order = query.activePinnedLensesOrder.order.filter(x => x != key);
      else {
        order = query.activePinnedLensesOrder.order.concat(key);
        this.handleSelectView(key);
      }

      mutations.confirmUpdatePinnedLensesOrder({
        topicId: topicId || 0,
        pinnedLensesOrder: query.activePinnedLensesOrder,
        order
      });
    } else {
      let pinned_lenses;
      if (pinedLenses.includes(key))
        pinned_lenses = pinedLenses.filter(x => x !== key);
      else {
        pinned_lenses = [...pinedLenses, key];
        this.handleSelectView(key);
      }
      const payload = {
        ui_settings: { pinned_lenses },
        action: pinedLenses.includes(key) ? 'remove' : 'add',
        view: key
      };
      setUserLensPinSettings(payload);
    }
  };

  renderLensDropdownItem = ({
    key,
    pinned,
    fontAwesomeIcon,
    icon,
    outlineIcon,
    teamIcon,
    projectIcon,
    subIcon,
    label,
    isCustomLens,
    ownerUserId,
    description
  }) => {
    const forId = Math.ceil(Math.random() * 100000, 6);
    const forLabelId = Math.ceil(Math.random() * 100000, 6);

    return (
      <li
        key={key}
        onClick={isCustomLens ? () => this.updateEditTitleLens(label) : null}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: '250px'
        }}
        className="pin-tools-bar_lens-list"
      >
        <a
          data-tip={
            isCustomLens && label.length > 23
              ? label
              : description
              ? description
              : null
          }
          data-for={forLabelId}
          className={cn(
            'pin-tools-bar__lens-item',
            pinned && 'pin-tools-bar__lens-item--muted'
          )}
          onClick={e => this.handlePinLensClick(e, key)}
        >
          {icon == 'drive' ? (
            this.getDriveIcon({ width: 15, height: 15, Imageclass: 'icon ml5' })
          ) : (
            <Icon
              fontAwesome={fontAwesomeIcon}
              icon={icon}
              color={pinned ? '#ccc' : undefined}
              outlined={outlineIcon || icon == 'category' ? true : false}
              teamIcon={teamIcon}
              projectIcon={projectIcon}
              subIcon={subIcon}
            />
          )}
          {label.length > 18 ? `${label.substring(0, 18)}...` : label}
          <Tooltip {...{ place: 'right' }} id={forLabelId} />
        </a>
        <span className="flex-r-center">
          {this.props.topicId || this.props.page === 'home' ? (
            <span className="pin-tools-bar__lens-item-more">
              <OptionsDropdownButton isSmall style={{ fontSize: '14px' }}>
                <a
                  className="dropdown-option-item"
                  onClick={e => this.handlePinLensClick(e, key)}
                >
                  {pinned ? 'Unpin Tool' : 'Pin Tool'}
                </a>
                <a
                  onClick={() => this.handleSelectView(key)}
                  className="dropdown-option-item"
                >
                  Select Tool
                </a>

                {isCustomLens &&
                  Number(ownerUserId) === Number(this.props.currentUser.id) && (
                    <Fragment>
                      <a
                        onClick={() => this.handleDeleteCustomLens(key)}
                        className="dropdown-option-item"
                      >
                        Delete
                      </a>
                      <a
                        onClick={() =>
                          this.setState({ isEdit: true, editCustomLensId: key })
                        }
                        className="dropdown-option-item"
                      >
                        Edit
                      </a>
                      <a
                        onClick={() => {
                          this.props.setRightMenuOpenForMenu(
                            'Tool Configuration',
                            key
                          );
                        }}
                        className="dropdown-option-item"
                      >
                        Tool Configuration
                      </a>
                    </Fragment>
                  )}
              </OptionsDropdownButton>
            </span>
          ) : null}
          <span
            data-tip={pinned ? 'Unpin Tool' : 'Pin Tool'}
            data-for={forId}
            onClick={e => this.handlePinLensClick(e, key)}
          >
            <Switch on={pinned ? true : false} />
            <Tooltip {...{ place: 'bottom' }} id={forId} />
          </span>
        </span>
      </li>
    );
  };

  renderTopLensItem = ({
    key,
    active,
    fontAwesomeIcon,
    icon,
    label,
    subIcon,
    projectIcon,
    outlineIcon,
    teamIcon
  }) => {
    icon = icon.replace('_outline', '');
    return (
      <div
        key={key}
        className={'pin-tools-item ' + (active && 'active')}
        onClick={() => this.handleSelectView(key)}
        data-tip={label}
        data-for={key}
      >
        <Icon
          fontAwesome={fontAwesomeIcon}
          icon={icon}
          subIcon={subIcon}
          projectIcon={projectIcon}
          teamIcon={teamIcon}
          outlined={outlineIcon || icon == 'category' ? true : false}
        />
        <Tooltip {...{ place: 'bottom' }} id={key} />
      </div>
    );
  };

  renderLensBarItem = ({
    key,
    active,
    fontAwesomeIcon,
    icon,
    outlineIcon,
    teamIcon,
    projectIcon,
    subIcon,
    label,
    expandBar
  }) => (
    <div
      key={key}
      className={`flex-r-center menu-active ${active ? 'm-active' : ''}`}
      onClick={() => this.handleSelectView(key)}
      style={{ cursor: 'pointer' }}
    >
      <div
        className="pin-tools-bar__item"
        data-tip={label}
        data-for={`bar-${key}`}
      >
        {icon == 'drive' ? (
          this.getDriveIcon({ width: 20, height: 20, Imageclass: 'icon' })
        ) : (
          <Icon
            fontAwesome={fontAwesomeIcon}
            icon={icon}
            color={active ? '#000' : '#b7b7b7'}
            outlined={outlineIcon || icon == 'category' ? true : false}
            teamIcon={teamIcon}
            projectIcon={projectIcon}
            subIcon={subIcon}
            containerStyle={
              key === 'TOPIC_TILES' ? { marginBottom: '3px' } : {}
            }
          />
        )}
        <Tooltip {...{ place: 'right' }} id={`bar-${key}`} />
      </div>
      {expandBar && (
        <div className={`lens_name ${active ? 'active' : ''}`}>
          <span>{label}</span>
          {['MY_PLAN', 'TEAM_PLAN', 'PROJECT_PLAN'].includes(key) &&
            this.props[`${camelize(key.toLowerCase(), true)}CardsCount`] <=
              MAX_CARDS_PROGRESS_COUNT && (
              <RadialProgress
                diameter={18.5}
                maxValue={MAX_CARDS_PROGRESS_COUNT}
                value={
                  this.props[`${camelize(key.toLowerCase(), true)}CardsCount`]
                }
                color="#eb5757"
                borderColor="#eb5757"
                style={{ marginLeft: 35 }}
              />
            )}
        </div>
      )}
    </div>
  );

  handleExpandBar = () => {
    const { setUserUiSettings, pinnedLensesBarExpanded } = this.props;
    const payload = {
      pinned_lenses_bar_expanded: !pinnedLensesBarExpanded
    };
    setUserUiSettings(payload);
  };

  handleSearch = search => {
    const { boards } = this.props;
    this.setState({ searchQuery: search });

    if (!boards || !Object.entries(boards)) return;

    const formattedQuery = search.toLowerCase();
    let customBoards = {};
    for (let key in boards) {
      if (boards[key].name.toLowerCase().includes(formattedQuery)) {
        customBoards = { ...customBoards, ...{ [key]: boards[key] } };
      }
    }
    this.setState({ filteredBoards: customBoards || {} });
  };

  handleToggleToolExplorer = () => {
    const { setUserUiSettings, boards } = this.props;
    if (!this.state.openToolExplorer) {
      const payload = {
        pinned_lenses_bar_expanded: true
      };
      setUserUiSettings(payload);
      this.setState({
        filteredBoards: boards,
        searchQuery: '',
        openToolExplorer: true
      });
    } else {
      const payload = {
        pinned_lenses_bar_expanded: false
      };
      setUserUiSettings(payload);
      this.setState({ openToolExplorer: false });
    }
  };

  handleDropLensItem = ({ itemOrder }) => {
    const { query, setUserUiSettings, topicId } = this.props;
    if (query?.activePinnedLensesOrder) {
      mutations.confirmUpdatePinnedLensesOrder({
        topicId: topicId || 0,
        pinnedLensesOrder: query.activePinnedLensesOrder,
        order: itemOrder.map(({ id }) => id)
      });
    } else {
      const uiSettings = {
        pinned_lenses: itemOrder.map(({ id }) => id)
      };
      setUserUiSettings(uiSettings, topicId);
    }
  };

  handleShowPinnedLensesBarClick = () => {
    const { pinnedLensesBarVisible, setUserUiSettings } = this.props;
    const payload = {
      pinned_lenses_bar_visible: !pinnedLensesBarVisible
    };
    setUserUiSettings(payload);
  };

  render() {
    const {
      currentPage,
      pinedLenses,
      cardView,
      viewKey,
      lensId,
      asLeftBar,
      customLenses,
      topicId,
      pinnedLensesBarExpanded,
      query,
      setRightMenuOpenForMenu,
      setOrganizerQuizModal,
      pinnedLensesBarVisible
    } = this.props;

    const {
      lensTitle,
      isEdit,
      createLens,
      openToolExplorer,
      editLensTitle,
      favTools,
      searchQuery,
      // boards gotten from the search
      filteredBoards: boards
    } = this.state;

    const forId = Math.ceil(Math.random() * 100000, 6);
    const forIds = Math.ceil(Math.random() * 100000, 6);
    const forShowId = Math.ceil(Math.random() * 100000, 6);

    // remove custom lenses without filter_setting
    const filteredCustomLenses = customLenses
      ? Object.values(customLenses).filter(
          lens => lens?.relationships?.filter_setting?.data
        )
      : [];

    const viewSegments = groupBy(Object.values(boards || {}), 'category');
    let pinnedCustomLenses = pinedLenses.filter(tool =>
      Object.keys(customLenses).find(c => Number(c) == Number(tool))
    );
    pinnedCustomLenses = pinnedCustomLenses.map(l => customLenses[l]);

    const renderLensItem = key => {
      if (isNaN(key)) {
        const active = key === cardView && !lensId;
        const board = this.props.boards[key] || {};
        return this.renderLensBarItem({
          key,
          active,
          fontAwesomeIcon: board.fontAwesomeIcon,
          icon: board.icon,
          outlineIcon: board.outlineIcon,
          teamIcon: board.teamIcon,
          projectIcon: board.projectIcon,
          subIcon: board.subIcon,
          label: board.name,
          expandBar: pinnedLensesBarExpanded
        });
      } else {
        const tool = customLenses[key];
        const board = boards[tool.attributes.current_active_template] || {};
        return this.renderLensBarItem({
          key: tool.id,
          active: tool.id == lensId,
          fontAwesomeIcon: board.fontAwesomeIcon,
          icon: board.icon,
          outlineIcon: board.outlineIcon,
          teamIcon: board.teamIcon,
          projectIcon: board.projectIcon,
          subIcon: board.subIcon,
          label: tool.attributes.title,
          expandBar: pinnedLensesBarExpanded
        });
      }
    };

    return asLeftBar ? (
      <div
        className={`pin-tools-bar ${
          viewKey == 'INBOX' ? 'pin-tools-bar__isDark' : ''
        }`}
        ref={this.pinnedToolsBarRef}
      >
        {openToolExplorer && (
          <ToolExplorer
            handleToggleToolExplorer={this.handleToggleToolExplorer}
            viewSegments={viewSegments}
            handleSelectView={this.handleSelectView}
            pinedLenses={pinedLenses}
            handlePinLensClick={this.handlePinLensClick}
            getDriveIcon={this.getDriveIcon}
            setOrganizerQuizModal={setOrganizerQuizModal}
          />
        )}
        {!openToolExplorer && (
          <Fragment>
            <div className="expand_button" onClick={this.handleExpandBar}>
              <i
                className={`fa fa-angle-${
                  pinnedLensesBarExpanded ? 'left' : 'right'
                }`}
              />
            </div>
            <Dropdown
              menuClassName={'pin-tools-bar__dropdown'}
              closeOnClick={false}
              trigger={
                <Fragment>
                  {pinnedLensesBarExpanded ? (
                    <div className="pin-tools-bar__item pin-tools-add-icon--expanded flex-r-center">
                      <Icon
                        icon="expand_more"
                        color="#808080"
                        fontSize={22}
                        style={{ marginTop: '3px' }}
                      />
                      <span
                        style={{
                          color: '#515050',
                          fontWeight: 700,
                          fontSize: '14px'
                        }}
                      >
                        Tools
                      </span>
                    </div>
                  ) : (
                    <div
                      className="pin-tools-bar__item pin-tools-add-icon flex-r-center"
                      data-tip={'Pinned Tools'}
                      data-for={forId}
                    >
                      <Icon icon="expand_more" color="#5d5d5d" fontSize={22} />
                      <Tooltip {...{ place: 'right' }} id={forId} />
                    </div>
                  )}
                </Fragment>
              }
              triggerClose={this.state.triggerCloseDropdown}
            >
              <div className="dropdown-top">
                <div
                  className="dropdown-header dropdown-top__left"
                  tabIndex={0}
                >
                  <span> Pin Tools to this Board</span>
                  {!favTools?.length && (
                    <IconButton
                      additionalClasses="ml10  dropdown-top__left-fav-icon"
                      icon="new_releases"
                      tooltip="Set your favorite tools"
                      tooltipOptions={{ place: 'bottom' }}
                      color="#56ccf2"
                      onClick={this.handleOpenOrganizer}
                    />
                  )}
                </div>

                <div className="dropdown-top__right">
                  <span
                    data-tip={'Hide toolbar'}
                    data-for={forShowId}
                    onClick={this.handleShowPinnedLensesBarClick}
                    className="mt10 mr20"
                  >
                    <Switch on={pinnedLensesBarVisible ? true : false} />
                    <Tooltip {...{ place: 'bottom' }} id={forShowId} />
                  </span>
                  <div
                    className="dropdown-description  mt10"
                    onClick={this.handleToggleToolExplorer}
                  >
                    <span>Explore Tools</span>
                    <span
                      style={{ marginBottom: '-3px', fontSize: '14px' }}
                      className="material-icons ml10"
                    >
                      arrow_forward
                    </span>
                  </div>
                  <div
                    className="pin-tools-bar__info"
                    data-tip={
                      'Tools let you organize your Cards and Boards. There are Tools for organizing tasks, notes, files, projects and more.'
                    }
                    data-for={forIds}
                  >
                    <Icon icon="contact_support" outlined color="#56ccf2" />
                    <Tooltip {...{ place: 'right' }} id={forIds} />
                  </div>
                </div>
              </div>
              <div className="dropdown-mid">
                <div>
                  <input
                    type="search"
                    className="pin-tools-bar__search"
                    value={this.state.searchQuery}
                    onChange={({ target }) => this.handleSearch(target.value)}
                    autoFocus
                    placeholder="Search a tool"
                  />
                </div>
                {createLens ? (
                  <div
                    className=" Right-design-add-wrapper"
                    ref={this.createFormRef}
                  >
                    <FormInput
                      autoFocus
                      defaultValue={lensTitle}
                      onChange={this.handleLensTitle}
                      onSubmit={this.submitLens}
                      placeholder="Tool Title"
                      onKeyDown={this.handleCancel}
                    />
                    <div
                      style={{ justifyContent: 'space-between' }}
                      className="add-card-input-footer"
                    >
                      <p>hit enter to create</p>
                      <a
                        // style={{ marginTop: '-10px' }}
                        onClick={this.submitLens}
                      >
                        Create new
                      </a>
                    </div>
                  </div>
                ) : !isEdit ? (
                  <div
                    onClick={() => this.setState({ createLens: true })}
                    className="dropdown-create"
                  >
                    <span
                      style={{ marginBottom: '-3px', fontSize: '14px' }}
                      className="material-icons mr3"
                    >
                      add
                    </span>
                    <span> Create new Tool</span>{' '}
                  </div>
                ) : null}
                {isEdit && (
                  <div className=" Right-design-add-wrapper">
                    <FormInput
                      autoFocus
                      defaultValue={editLensTitle}
                      onChange={this.updateEditTitleLens}
                      onSubmit={this.renameCustomLens}
                      placeholder="Tool Title"
                    />
                    <div
                      style={{ justifyContent: 'space-between' }}
                      className="add-card-input-footer"
                    >
                      <p>hit enter to update</p>
                      <a
                        // style={{ marginTop: '-10px' }}
                        onClick={this.renameCustomLens}
                      >
                        Update
                      </a>
                    </div>
                  </div>
                )}
                <div
                  onClick={() => setRightMenuOpenForMenu('Orders')}
                  className="dropdown-description"
                >
                  <span> Saved Tool orders</span>{' '}
                  <span
                    style={{ marginBottom: '-3px', fontSize: '14px' }}
                    className="material-icons ml10"
                  >
                    arrow_forward
                  </span>
                </div>
              </div>
              {/*<div className="pin-tools-bar__divider"></div> */}

              {boards &&
                this.state.searchQuery &&
                !Object.entries(boards).length && (
                  <p
                    style={{
                      fontSize: '12px',
                      marginLeft: '5px'
                    }}
                  >
                    No such tool
                  </p>
                )}
              <div className="dropdown-category">
                {!isEdit && !searchQuery && filteredCustomLenses?.length > 0 && (
                  <div>
                    <li className="dropdown-badge dropdown-badge--custom">
                      CUSTOM TOOLS
                    </li>
                    {filteredCustomLenses.map(tool => {
                      const board =
                        boards[tool.attributes.current_active_template];
                      return (
                        board &&
                        this.renderLensDropdownItem({
                          key: tool.id,
                          ownerUserId: tool.attributes.user_id,
                          pinned: pinedLenses.includes(tool.id),
                          fontAwesomeIcon: board.fontAwesomeIcon,
                          icon: board.icon,
                          outlineIcon: board.outlineIcon,
                          teamIcon: board.teamIcon,
                          projectIcon: board.projectIcon,
                          subIcon: board.subIcon,
                          label: tool.attributes.title,
                          isCustomLens: true
                        })
                      );
                    })}
                  </div>
                )}

                {boardTypes?.length > 0 && !searchQuery && (
                  <div>
                    <li className="dropdown-badge dropdown-badge--board-types">
                      BOARD TYPES
                    </li>
                    {boardTypes
                      .filter(x => x.label !== 'Board')
                      .concat(landingBoard)
                      .map(tool => {
                        return this.renderLensDropdownItem({
                          key: tool.defaultTool,
                          // ownerUserId: this.props.user?.id,
                          pinned: pinedLenses.includes(tool.defaultTool),
                          fontAwesomeIcon: tool.fontAwesomeIcon,
                          icon: tool.iconType,
                          outlineIcon: tool.outlined,
                          teamIcon: tool.teamIcon,
                          projectIcon: tool.projectIcon,
                          subIcon: tool.subIcon,
                          label: tool.label,
                          description: tool.description,
                          isCustomLens: false
                        });
                      })}
                  </div>
                )}

                {favTools?.length > 0 && !searchQuery && (
                  <div>
                    <li className="dropdown-badge dropdown-badge--favorite">
                      FAVORITE TOOLS
                    </li>
                    {favTools.map(tool => {
                      const board = boards[tool];
                      return (
                        board &&
                        this.renderLensDropdownItem({
                          key: tool,
                          // ownerUserId: this.props.user?.id,
                          pinned: pinedLenses.includes(tool),
                          fontAwesomeIcon: board.fontAwesomeIcon,
                          icon: board.icon,
                          outlineIcon: board.outlineIcon,
                          teamIcon: board.teamIcon,
                          projectIcon: board.projectIcon,
                          subIcon: board.subIcon,
                          label: board.name,
                          isCustomLens: false,
                          description: board.description
                        })
                      );
                    })}
                  </div>
                )}
                {Object.keys(viewSegments)
                  .filter(cat => cat !== 'board_views')
                  .map(category => (
                    <div key={category}>
                      <li
                        className={`dropdown-badge dropdown-badge--${category}`}
                      >
                        {category.replace(/_/g, ' ').toUpperCase()}
                        {category !== 'board_lists' && ' TOOLS'}
                      </li>
                      {viewSegments[category]
                        .filter(board => !hiddenTools.includes(board.key))
                        .map(
                          board =>
                            (!board.disabledPages ||
                              !board.disabledPages.includes(currentPage)) &&
                            this.renderLensDropdownItem({
                              key: board.key,
                              pinned: pinedLenses.includes(board.key),
                              fontAwesomeIcon: board.fontAwesomeIcon,
                              icon: board.icon,
                              outlineIcon: board.outlineIcon,
                              teamIcon: board.teamIcon,
                              projectIcon: board.projectIcon,
                              subIcon: board.subIcon,
                              label: board.name,
                              description: board.description
                            })
                        )}
                    </div>
                  ))}
              </div>
            </Dropdown>
            <GenericDragDropListing
              itemList={pinedLenses.map(id => ({ id }))}
              itemType={dragItemTypes.TOOL}
              onDropItem={this.handleDropLensItem}
              renderItem={({ id }) => renderLensItem(id)}
            />
          </Fragment>
        )}
      </div>
    ) : (
      <div className="pin-tools">
        <div className="pin-tools-wrapper">
          {boards &&
            pinnedCustomLenses.map(tool => {
              const board =
                boards[tool.attributes.current_active_template] || {};
              return this.renderTopLensItem({
                key: tool.id,
                active: tool.id == lensId,
                fontAwesomeIcon: board.fontAwesomeIcon,
                icon: board.icon,
                label: tool.attributes.title,
                subIcon: board.subIcon,
                projectIcon: board.projectIcon,
                outlineIcon: board.outlineIcon,
                teamIcon: board.teamIcon
              });
            })}
          {boards &&
            pinedLenses
              .filter(
                data =>
                  boards[data] &&
                  (!boards[data].disabledPages ||
                    !boards[data].disabledPages.includes(currentPage))
              )
              .map(data => {
                const active = data === cardView;
                const board = boards[data] || {};
                return this.renderTopLensItem({
                  key: data,
                  active,
                  fontAwesomeIcon: board.fontAwesomeIcon,
                  icon: board.icon,
                  label: board.name,
                  subIcon: board.subIcon,
                  projectIcon: board.projectIcon,
                  outlineIcon: board.outlineIcon,
                  teamIcon: board.teamIcon
                });
              })}
        </div>
      </div>
    );
  }
}

const mapState = state => {
  const {
    topics,
    page: { page, topicId },
    lensList: customLenses,
    user
  } = stateMappings(state);
  const topic = topics[topicId];
  const userConfiguration = getUserConfig(state);
  const ui_settings = getUiSettings(state);
  const userProfile = get(user, 'attributes.user_profile');
  const viewOptions = pageViewMappings[page];
  const boards = viewOptions || {};

  return {
    page,
    uiSettings: ui_settings,
    viewKey: getRelevantViewForPage(state),
    customLenses,
    lensId: getCustomLensId(state),
    boards,
    currentPage: page,
    topicId,
    cardView: ui_settings.current_active_template,
    currentTopic: topic,
    displayTopics: ui_settings.subtopic_panel_visible,
    configurationId: get(userConfiguration, 'id'),
    currentUser: user,
    pinnedLensesBarExpanded: ui_settings.pinned_lenses_bar_expanded,
    pinnedLensesBarVisible: ui_settings.pinned_lenses_bar_visible,
    myPlanCardsCount: userProfile.my_plan_cards_count,
    teamPlanCardsCount: userProfile.team_plan_cards_count,
    projectPlanCardsCount: userProfile.project_plan_cards_count,
    user
  };
};

const mapDispatch = {
  toggleSubtopicPanel,
  setRightMenuOpenForMenu,
  setUserUiSettings,
  selectView,
  selectCustomLens,
  createCustomLens,
  updateLens,
  deleteLens,
  setUserLensPinSettings,
  toggleWorkspaceTopicsPanel,
  setUserFilterSettings,
  setPinnedToolsBarWidth,
  updateUserUiSettings,
  setOrganizerQuizModal
};

const RefetchContainer = createRefetchContainer(
  hoc(PinLenses),
  {
    query: graphql`
      fragment PinLenses_query on Query
        @argumentDefinitions(topicId: { type: ID }, owner: { type: "ID!" }) {
        activePinnedLensesOrder(topicId: $topicId) {
          id
          name
          order
        }
        screenOneFavTools: config(
          owner: $owner
          config: "ORGANIZER_QUIZ.favorite_tools_screen1"
        ) {
          id
          value
        }
        screenTwoFavTools: config(
          owner: $owner
          config: "ORGANIZER_QUIZ.favorite_tools_screen2"
        ) {
          id
          value
        }
        screenFourFavTools: config(
          owner: $owner
          config: "ORGANIZER_QUIZ.favorite_tools_screen4"
        ) {
          id
          value
        }
        screenSevenFavTools: config(
          owner: $owner
          config: "ORGANIZER_QUIZ.favorite_tools_screen7"
        ) {
          id
          value
        }
        screenEightFavTools: config(
          owner: $owner
          config: "ORGANIZER_QUIZ.favorite_tools_screen8"
        ) {
          id
          value
        }
      }
    `
  },
  graphql`
    query PinLensesRefetchQuery($topicId: ID, $owner: ID!) {
      ...PinLenses_query @arguments(topicId: $topicId, owner: $owner)
    }
  `
);

export default connect(
  mapState,
  mapDispatch
)(
  QueryRenderer(props => <RefetchContainer {...props} query={props} />, {
    query: graphql`
      query PinLensesQuery($topicId: ID, $owner: ID!) {
        ...PinLenses_query @arguments(topicId: $topicId, owner: $owner)
      }
    `,
    vars: ({ topicId, user }) => ({
      topicId: toGid('Topic', topicId || 0),
      owner: toGid('User', user?.id || null)
    })
  })
);
