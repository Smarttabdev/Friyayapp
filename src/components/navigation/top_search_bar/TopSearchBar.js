import PropTypes from 'prop-types';
import React, { Component, Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingIndicator from 'Components/shared/LoadingIndicator';

import { stateMappings } from 'Src/newRedux/stateMappings';
import IconButton from 'Components/shared/buttons/IconButton';

import ReactDOMServer from 'react-dom/server';
import SearchPending from 'Components/pages/search_page/search_pending';
import SearchSuggestion from 'Components/pages/search_page/search_suggestion';
import SearchHeader from 'Components/pages/search_page/search_header';
import SearchNotFound from 'Components/pages/search_page/search_not_found';
import SearchEngine from 'Lib/search_engine';
import Tour from 'Lib/tour';
import { toggleLeftMenu } from 'Src/newRedux/interface/menus/thunks';
import UserAvatar from 'Components/shared/users/elements/UserAvatar';
import NotificationIndicator from 'Components/shared/notifications/NotificationIndicator';
import {
  setEditCardModalOpen,
  setEditUserModalOpen,
  setOfficeHoursModalOpen
} from 'Src/newRedux/interface/modals/actions';
import Dropdown from 'Components/shared/Dropdown';
import Breadcrumbs from 'Src/components/navigation/breadcrumbs/Breadcrumbs';
import Icon from 'Src/components/shared/Icon';
import { logoutUser } from 'Actions/appUser';
import { showSearchModal } from 'Src/newRedux/database/search/thunks';
import { viewPerson } from 'Src/newRedux/database/people/thunks';
import SearchModal from './SearchModal';
import { ColouredDots } from '../../shared/Dots';
import { getUnreadNotifications } from 'Src/newRedux/database/notifications/selectors';
import ChatButton from 'Components/menus/right/elements/ChatButton';
import NewChatButton from './TopSearchBar/ChatButton';
import VideoButton from './TopSearchBar/VideoButton';
import Tooltip from 'Components/shared/Tooltip';
import { superadminIds } from 'AppConstants';
import BreadcrumbDropdown from '../breadcrumbs/breadcrumb_dropdown';
import { getGroups } from 'Src/newRedux/database/groups/selectors';
import get from 'lodash/get';
import MainFormPage from 'Components/pages/MainFormPage';
import AddCardOrSubtopic from 'Components/shared/assemblies/AddCardOrSubtopic';
import {
  createTopic,
  viewTopic,
  setUserLensPinSettings
} from 'Src/newRedux/database/topics/thunks';
import { getUiSettings, setUserUiSettings } from 'Src/helpers/user_config';
import cs from 'classnames';
import { viewOptions } from 'src/components/shared/CardAndBoardTypes';
import { updateUiSettings } from 'Src/newRedux/database/topics/apiCalls';
import { createCard } from 'Src/newRedux/database/cards/thunks';
import { success } from 'src/utils/toast';
import { updateShowTutorialAttribute } from 'Src/newRedux/database/user/actions';

class TopSearchBar extends Component {
  static propTypes = {
    displayLeftMenu: PropTypes.bool,
    setEditCardModalOpen: PropTypes.func.isRequired,
    toggleLeftMenu: PropTypes.func.isRequired,
    showSearchModal: PropTypes.func.isRequired,
    viewPerson: PropTypes.func.isRequired,
    currentUser: PropTypes.object.isRequired,
    unreadNotifications: PropTypes.array,
    rootUrl: PropTypes.string.isRequired,
    routerHistory: PropTypes.object.isRequired,
    setEditUserModalOpen: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    updateShowTutorialAttribute: PropTypes.func
  };

  state = {
    displayMainFormModal: false,
    slug: null,
    iconVisible: true,
    tag: null,
    boardIndex: null
  };

  componentDidMount() {
    const $searchInput = $('#search-input');

    if (localStorage.tourIntroductionFinished === undefined) {
      Tour.startIntroductionTour();
    }

    SearchEngine.clear();
    $searchInput.typeahead(null, {
      source: SearchEngine.ttAdapter(),
      limit: 20,
      display: item => item.name,
      templates: {
        pending(search) {
          const pendingHTML = ReactDOMServer.renderToString(
            <SearchPending search={search} />
          );
          return $(pendingHTML);
        },
        suggestion(item) {
          const suggestionHTML = ReactDOMServer.renderToString(
            <SearchSuggestion
              label={item.label}
              resource_type={item.resource_type}
              item={item.data}
            />
          );
          return $(suggestionHTML);
        },
        header(search) {
          const headerHTML = ReactDOMServer.renderToString(
            <SearchHeader search={search} />
          );
          return $(headerHTML);
        },
        notFound(search) {
          const notFoundHTML = ReactDOMServer.renderToString(
            <SearchNotFound search={search} />
          );
          return $(notFoundHTML);
        }
      }
    });

    $searchInput.bind(
      'typeahead:select',
      (
        e,
        {
          data: {
            attributes: { resource_type, slug }
          }
        }
      ) => {
        let resource = null;

        switch (resource_type) {
          case 'topics':
            resource = 'topics';
            break;

          case 'tips':
            resource = 'cards';
            break;

          case 'users':
          case 'domainmembers':
            resource = 'users';
            break;

          default:
            break;
        }
      }
    );
  }

  handleToggleLeftMenu = () =>
    this.props.toggleLeftMenu(!this.props.displayLeftMenu);

  handleToggleMainFormModal = () =>
    this.setState(state => ({
      displayMainFormModal: !state.displayMainFormModal
    }));

  /**
   * On click search event handler.
   *
   * @param {Event} e
   * @return {Void}
   */
  handleClickSearch = e => {
    e.preventDefault();
    this.props.showSearchModal();
  };

  showTutorial = () => {
    this.props.updateShowTutorialAttribute({
      attributes: { showTutorial: true }
    });
  };

  handleSSOLogout = e => {
    e.preventDefault();
    this.props.router.push('/saml/init_logout');
  };

  handleLogout = async () => {
    await this.props.logout();
    this.props.routerHistory.push('/login');
  };

  toggleMenu = () => {
    this.setState(state => ({ iconVisible: !state.iconVisible }));
  };

  handleCreateGroupClick = e => {
    e.preventDefault();
    this.setState({ isGroupFormOpen: true });
  };

  closeMainForm = () => {
    this.setState({ isGroupFormOpen: false });
  };

  handleSelectedBoardType = (type, index) => {
    this.setState({ tag: type, boardIndex: index });
  };

  createNewTopic = async (parentId, yay) => {
    const { createTopic, viewTopic, updateUiSettings } = this.props;

    const createdTopic = await createTopic({
      attributes: {
        title: yay.title,
        parent_id: parentId,
        default_view_id: yay.defaultViewId,
        tag_list: this.state.tag ? [this.state.tag] : []
      }
    });

    viewTopic({ topicSlug: createdTopic?.data?.data?.attributes?.slug });
    const ui_settings = {
      current_active_template: yay.defaultViewId,
      card_hidden: yay.defaultViewId === 'TOPIC_TILES',
      subtopic_view: 'TILE',
      subtopic_panel_visible: yay.defaultViewId === 'TOPIC_TILES'
    };

    await updateUiSettings(
      get(createdTopic.data.data, 'attributes.user_configuration.data.id'),
      ui_settings,
      null
    );

    return createdTopic.data.data;
  };

  createNewCard = async topic => {
    const isChat = topic.attributes.default_view_id == 'CHAT';
    const { createCard } = this.props;
    const attributes = { title: 'Title', is_chat: isChat };
    const relationships = {
      topics: { data: [topic.id] }
    };
    return await createCard({ attributes, relationships });
  };

  createChildrenTopic = async (parentId, children) => {
    for (let yay of children) {
      const createdTopic = await this.createNewTopic(parentId, yay);
      await this.createNewCard(createdTopic);
      await this.createChildrenTopic(createdTopic.id, yay.children);
    }
  };

  handleCreateView = async () => {
    const { tag, boardIndex } = this.state;
    const {
      parentTopic,
      setUserLensPinSettings,
      setUserUiSettings
    } = this.props;
    const parentTopicId = parentTopic?.id || null;

    const projectPinnedLensKeys = [
      'PROJECT_HUB',
      'ACTION_PLAN',
      'CHAT',
      'VIDEO_CHAT'
    ];

    if (tag === 'project') {
      success('Creating Board...');

      const createdTopic = await this.createNewTopic(
        parentTopicId,
        viewOptions[boardIndex].yays[0]
      );

      setTimeout(() => {
        setUserUiSettings(
          {
            pinned_lenses_bar_visible: true,
            pinned_lenses_bar_expanded: false
          },
          createdTopic.id
        );
        projectPinnedLensKeys.forEach(key => {
          setUserLensPinSettings({
            ui_settings: {
              pinned_lenses: projectPinnedLensKeys
            },
            action: 'add',
            view: key
          });
        });
      });
    } else {
      success('Creating Board...');
      this.createChildrenTopic(parentTopicId, viewOptions[boardIndex].yays);
    }
  };

  onModalHandler = type => {
    switch (type) {
      case 'Card':
        this.props.setEditCardModalOpen(true);
        break;
      case 'Board':
        this.handleCreateView();
        break;
      default:
        break;
    }
  };

  render() {
    const {
      displayLeftMenu,
      unreadNotifications,
      currentUser,
      rootUrl,
      active_design = {},
      setEditUserModalOpen,
      setOfficeHoursModalOpen,
      chatUnreadCount,
      teams,
      groupId,
      page,
      parentTopic
    } = this.props;
    const { isGroupFormOpen, saving } = this.state;

    const team = teams.find(team => team.id === groupId) || {};
    const baseUrl = rootUrl === '/' ? rootUrl : rootUrl + '/';

    const { iconVisible } = this.state;

    const notifDotClass =
      unreadNotifications && unreadNotifications.length ? 'hasUnread' : '';
    const peopleUrl = (rootUrl == '/' ? '' : rootUrl) + '/users';
    const userUrl = peopleUrl + `/${currentUser.id}`;
    const { workspace_font_color, workspace_background_color } = active_design;
    const forId = Math.ceil(Math.random() * 100000, 6);
    const usersPathStyle = {
      borderBottom:
        this.props.routerHistory.location.pathname === '/users'
          ? 'solid 1px #56ccf2'
          : 'solid 1px transparent'
    };

    const isBoardsPage = ['home', 'topics'].includes(page);
    const workspaceBackgroundColor =
      !isBoardsPage && active_design?.workspace_background_color
        ? workspace_background_color
        : '#2e3037';
    const workspaceFontColor =
      !isBoardsPage && active_design?.workspace_font_color
        ? workspace_font_color
        : '';

    return (
      <div
        style={{
          backgroundColor: workspaceBackgroundColor
        }}
        className={`top-search-bar ${
          displayLeftMenu ? 'top-search-bar-radius' : ''
        }`}
        id="topSearchBar"
      >
        <div
          className={cs('top-bar-left-menu dropdown add-card-or-subtopic ml3', {
            open: saving
          })}
        >
          {!displayLeftMenu && !isBoardsPage && (
            <div
              data-tip={'Boards menu'}
              data-for={'boards-menu-icon'}
              className="flex"
            >
              <IconButton
                icon="sort"
                color={workspaceFontColor || '#fff'}
                containerClasses="mr7 icon-21 top-bar-boards-icon"
                onClick={this.handleToggleLeftMenu}
              />
              <Tooltip {...{ place: 'bottom' }} id={'boards-menu-icon'} />
            </div>
          )}

          {saving && (
            <ul
              className={`dropdown-menu`}
              id="domain-dropdown"
              style={{ overflow: 'visible' }}
            >
              <LoadingIndicator />
            </ul>
          )}
          <Breadcrumbs
            workspaceFontColor={workspaceFontColor}
            isBoardsPage={isBoardsPage}
          />
        </div>

        <div className="top-bar-right-menu">
          <div
            className={
              iconVisible
                ? 'dots-layer-container-visible'
                : 'dots-layer-container'
            }
          >
            {!isBoardsPage && (
              <Fragment>
                <IconButton
                  wrapperClasses="top-search-bar-caret"
                  color={workspaceFontColor}
                  fontAwesome
                  icon={iconVisible ? 'caret-right' : 'caret-left'}
                  onClick={this.toggleMenu}
                />

                {/* {team && (
              <div
                className="dropdown"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 10px'
                }}
              >
                <Link
                  to={
                    `${baseUrl}` +
                    (team.id
                      ? `groups/${get(team, 'attributes.slug')}`
                      : `boards`)
                  }
                  className="mr5"
                >
                  <span className="ml2">
                    {get(team, 'attributes.title', 'Everyone')}
                  </span>
                </Link>
                <BreadcrumbDropdown
                  topics={teams}
                  type={'team'}
                  action={this.handleCreateGroupClick}
                />
                {isGroupFormOpen && (
                  <MainFormPage
                    selectedTab="group-pane"
                    onClose={this.closeMainForm}
                  />
                )}
              </div>
            )} */}

                {/* <div
              className="top-search-bar_right-button"
              data-tip={'Add Card'}
              data-for={`AddCard-${forId}`}
            >
              <IconButton
                icon="add_box"
                color={workspaceFontColor || '#6FCF97'}
                onClick={() => setEditCardModalOpen(true)}
              />
              <Tooltip {...{ place: 'bottom' }} id={`AddCard-${forId}`} />
            </div> */}
                <AddCardOrSubtopic
                  color={workspaceFontColor || '#6FCF97'}
                  displayAddCardButton
                  displayAddSubtopicButton
                  displayAddChatButton
                  displayAddVideoRoomButton
                  icon="add_circle"
                  className="top-bar-icon mt1 icon-21"
                  disableModalAdd={true}
                  disabledModalAddHandler={this.onModalHandler}
                  getBoardType={this.handleSelectedBoardType}
                  topic={parentTopic}
                />

                <div
                  data-tip={'Search'}
                  data-for={`search-${forId}`}
                  className="top-bar-icon"
                >
                  <IconButton
                    color={workspaceFontColor || '#56ccf2'}
                    icon="search"
                    containerClasses="mt2 ml7 icon-21"
                    onClick={this.handleClickSearch}
                  />
                  <Tooltip {...{ place: 'bottom' }} id={`search-${forId}`} />
                </div>
                <NewChatButton
                  color={workspaceFontColor || '#F2C94C'}
                  className={'top-search-bar_right-button'}
                  count={chatUnreadCount?.count}
                />
                <VideoButton
                  color={workspaceFontColor || '#eb5757'}
                  className={'top-search-bar_right-button'}
                />
                <ColouredDots
                  color={workspaceFontColor}
                  className={notifDotClass}
                  unreadCount={unreadNotifications.length}
                />
                <div
                  className="top-search-bar_right-button notif-bell"
                  data-tip={'Notifications'}
                  data-for={`Notifications-${forId}`}
                >
                  <NotificationIndicator
                    color={workspaceFontColor || '#9B51E0'}
                  />
                  <Tooltip
                    {...{ place: 'bottom' }}
                    id={`Notifications-${forId}`}
                  />
                </div>
              </Fragment>
            )}
            {!isBoardsPage && (
              <div
                className="top-search-bar_right-button  dropdown-container"
                data-tip={'People & Teams'}
                data-for={`People-${forId}`}
                style={{ justifyContent: 'flex-start' }}
              >
                <Link
                  to={peopleUrl}
                  className="icon-users"
                  style={usersPathStyle}
                >
                  <Icon
                    color={workspaceFontColor || '#56CCF2'}
                    outlined
                    icon="people"
                    additionalClasses={'icon-people'}
                  />
                  <Tooltip {...{ place: 'bottom' }} id={`People-${forId}`} />
                </Link>
                {team && (
                  <div
                    className="dropdown team-dropdown"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0 10px 0 0'
                    }}
                  >
                    <BreadcrumbDropdown
                      topics={teams}
                      type={'team'}
                      action={this.handleCreateGroupClick}
                    />
                    {isGroupFormOpen && (
                      <MainFormPage
                        selectedTab="group-pane"
                        onClose={this.closeMainForm}
                      />
                    )}
                  </div>
                )}
              </div>
            )}
            {isBoardsPage && (
              <div className="top-search-bar_right-button dropdown">
                <ul className="user-nav-right">
                  <li>
                    <Dropdown
                      trigger={
                        <a
                          className="dropdown-toggle user-dropdown-toggle d-block"
                          role="button"
                          aria-haspopup="true"
                          aria-expanded="false"
                          data-tip={'Profile'}
                          data-for={`Profile-${forId}`}
                          style={{ paddingLeft: 0 }}
                        >
                          <UserAvatar
                            user={currentUser}
                            margin={0}
                            size={18}
                            tooltipText={false}
                            color={workspaceFontColor}
                          />
                          <Tooltip
                            {...{ place: 'bottom' }}
                            id={`Profile-${forId}`}
                          />
                        </a>
                      }
                      menuStyle={{ right: 0, left: 'unset' }}
                      ignorePreventDefault
                    >
                      {superadminIds.includes(currentUser.id) && (
                        <Fragment>
                          <li>
                            <a href="/admin">
                              <i className="glyphicon glyphicon-stats" /> Admin
                            </a>
                          </li>
                          <li role="separator" className="menu-divider" />
                        </Fragment>
                      )}
                      <li>
                        <Link to={userUrl}>
                          <i className="glyphicon glyphicon-user" /> Profile
                        </Link>
                      </li>
                      <li role="separator" className="menu-divider" />
                      <li>
                        <a onClick={() => this.showTutorial(true)}>
                          <i className="glyphicon glyphicon-blackboard" />{' '}
                          Tutorial
                        </a>
                      </li>
                      <li role="separator" className="menu-divider" />
                      <li>
                        <a onClick={() => setOfficeHoursModalOpen(true)}>
                          <i className="glyphicon glyphicon-time" /> Office
                          Hours
                        </a>
                      </li>
                      <li role="separator" className="menu-divider" />
                      <li>
                        <a onClick={() => setEditUserModalOpen(true)}>
                          <i className="glyphicon glyphicon-cog" /> Settings
                        </a>
                      </li>
                      <li role="separator" className="menu-divider" />
                      <li>
                        <a onClick={this.handleLogout}>
                          <i className="glyphicon glyphicon-log-out" /> Logout
                        </a>
                      </li>
                      <li role="separator" className="menu-divider" />
                      <ChatButton />
                      <li role="separator" className="menu-divider" />
                      <li>
                        <a
                          href="https://www.youtube.com/channel/UCyQfjwOvysXR26qPFKU14bQ/videos"
                          target="_blank"
                        >
                          <i className="glyphicon glyphicon-log-out" /> Video
                          Tutorials
                        </a>
                      </li>
                      <li role="separator" className="menu-divider" />
                      <li>
                        <a href="https://www.friyay.io/pricing" target="_blank">
                          <i className="glyphicon 	glyphicon glyphicon-usd mr5" />
                          Pricing
                        </a>
                      </li>
                    </Dropdown>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <SearchModal />
      </div>
    );
  }
}

const mapState = state => {
  const sm = stateMappings(state);
  const {
    menus,
    user,
    page,
    topics,
    routing,
    utilities: { active_design }
  } = sm;
  const uiSettings = getUiSettings(state);
  return {
    page: page.page,
    active_design,
    displayLeftMenu: menus.displayLeftMenu,
    currentUser: user,
    routerHistory: routing.routerHistory,
    unreadNotifications: getUnreadNotifications(state),
    rootUrl: page.rootUrl,
    teams: getGroups(state),
    groupId: page.groupId,
    parentTopic: sm.topics[page.topicId],
    addViewsPanelVisible: uiSettings.pinned_lenses || []
  };
};

const mapDispatch = {
  setEditCardModalOpen,
  setEditUserModalOpen,
  setOfficeHoursModalOpen,
  logout: logoutUser,
  toggleLeftMenu,
  showSearchModal,
  viewPerson,
  updateShowTutorialAttribute,
  createTopic,
  viewTopic,
  setUserLensPinSettings,
  setUserUiSettings,
  createCard,
  updateUiSettings
};

const hoc = Component => props => {
  useEffect(() => {
    const disposer = subscriptions.unreadChatsUpdated();
    return () => disposer.dispose();
  }, []);
  return <Component {...props} />;
};

export default connect(
  mapState,
  mapDispatch
)(
  QueryRenderer(hoc(TopSearchBar), {
    query: graphql`
      query TopSearchBarQuery {
        chatUnreadCount {
          id
          count
        }
      }
    `
  })
);
