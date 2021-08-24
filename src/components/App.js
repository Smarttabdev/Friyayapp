import React, { Component, useEffect, useRef } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bool, func, string } from 'prop-types';
import { get } from 'lodash';
import Joyride from 'react-joyride';

import { getGroupFollows } from 'Src/newRedux/database/groups/thunks';
import { idFromSlug } from 'Lib/utilities';
import { setLaunchComplete } from 'Src/newRedux/session/actions';
import { setRouterHistory } from 'Src/newRedux/routing/actions';
import { setupDataManager } from 'Src/dataManager/DataManager';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { TipHiveVersionManager } from 'Lib/version';
import { toggleUtilityValue } from 'Src/newRedux/utilities/actions';
import { finishIntroTour } from 'Actions/appUser';
import { getUiSettings } from 'Src/helpers/user_config';
import Auth from 'Lib/auth';
import tiphive from 'Lib/tiphive';

import BottomCardDock from 'Components/navigation/BottomCardDock';
import CustomDragLayer from 'Src/components/shared/drag_and_drop/CustomDragLayer';
import DomainUpdateFormPage from 'Components/pages/domain_update_form_page';
import ErrorBoundary from 'Components/shared/errors/ErrorBoundary';
import ItemPage from 'Components/pages/ItemPage';
import LeftMenu from 'Components/menus/left/LeftMenu';
import LeftSubtopicMenu from 'Components/menus/left/LeftSubtopicMenu';
import LoadingIndicator from 'Components/shared/LoadingIndicator';
import MainFormPage from 'Components/pages/MainFormPage';
import TopicSelectDestinationPage from 'Components/pages/TopicSelectDestinationPage';
import TopicUpdateFormPage from 'Components/pages/topic_update_form_page';
import TopSearchBar from 'Components/navigation/top_search_bar/TopSearchBar';
import UserUpdateFormPage from 'Components/pages/user_update_form_page';
import UsersInvitationPage from 'Components/pages/users_invitation_page';
import LeftActionBarContainer from 'Components/menus/left/LeftActionBarContainer';
import PinLenses from 'Components/lenses/PinLenses';
import ChatModal from 'Components/shared/chat/ChatModal';
import CopyTopicModal from 'Components/shared/CopyTopicModal';
import {
  joinRealtime,
  joinRealtimeChannel,
  leaveRealtimeChannel
} from 'Src/newRedux/realtime/actionsCable';
import VideoModal from 'Components/shared/video_rooms/VideoModal';
import DesktopNotification from './shared/notifications/DesktopNotification';
import OfficeHoursModal from 'Components/modals/office_hours/OfficeHoursModal';
import { getCurrentDomain } from 'Src/newRedux/database/domains/selectors';
import { joinChannel } from 'Src/newRedux/presence/thunks';
import BulkChangesModal from 'Components/modals/bulk_changes/BulkChangesModal';
import OrganizerQuizModal from 'src/components/modals/organizer_quiz/OrganizerQuizModal';
import { useDragLayer } from 'react-dnd';
import { setShowAddCardBottomOverlay } from 'Src/newRedux/interface/modals/actions';
import { dragItemTypes } from 'Components/shared/drag_and_drop/dragTypeEnum';
import { getRelevantViewForPage } from 'Src/newRedux/interface/lenses/selectors';

import lazyComponent from './lazy';
import RightFilterMenu from './menus/right/RightFilterMenu';
import 'Src/push-notifications';
import { subscribe } from 'Src/newRedux/actionCable/thunks';

const CardsPage = lazyComponent(() =>
  import(/* webpackChunkName: "CardsPage" */ './pages/CardsPage')
);

const UserPage = lazyComponent(() =>
  import(/* webpackChunkName: "UserPage" */ './pages/UserPage')
);

const PeoplePage = lazyComponent(() =>
  import(/* webpackChunkName: "PeoplePage" */ './pages/PeoplePage')
);

const TopicPage = lazyComponent(() =>
  import(/* webpackChunkName: "TopicPage" */ './pages/TopicPage')
);

const TopicsPage = lazyComponent(() =>
  import(/* webpackChunkName: "TopicsPage" */ './pages/TopicsPage')
);

const hoc = Component => props => {
  const { joinRealtime, joinRealtimeChannel, leaveRealtimeChannel } = props;

  useEffect(() => {
    const unsubscribePingChannel = subscribe('PingChannel');
    const leaveRealtime = joinRealtime();
    joinRealtimeChannel('domain', 'channel');
    const leaveChannel = window.isSubdomain && joinChannel('domain');
    return () => {
      leaveChannel && leaveChannel();
      leaveRealtimeChannel('domain', 'channel');
      leaveRealtime();
      unsubscribePingChannel();
    };
  }, []);

  useEffect(() => {
    if (!props.loggedIn) return;
    const disposers = [
      subscriptions.notificationList(),
      subscriptions.notificationCreated()
    ];
    return () => disposers.forEach(d => d.dispose());
  }, [props.loggedIn]);

  const { itemType, isDragging } = useDragLayer(monitor => ({
    itemType: monitor.getItemType(),
    isDragging: monitor.isDragging()
  }));

  const {
    isFileDragged,
    shiftKeyDown,
    toggleUtilityValue,
    setShowAddCardBottomOverlay
  } = props;

  const propsRef = useRef({});
  propsRef.current = {
    shiftKeyDown
  };

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.keyCode == 16 && !propsRef.current.shiftKeyDown) {
        propsRef.current.shiftKeyDown = true;
        toggleUtilityValue({ shiftKeyDown: true });
      }
    };
    const handleKeyUp = e => {
      if (e.keyCode == 16 && propsRef.current.shiftKeyDown) {
        toggleUtilityValue({ shiftKeyDown: false });
      }
    };
    window.addEventListener('keydown', handleKeyDown, true);
    window.addEventListener('keyup', handleKeyUp, true);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (itemType == dragItemTypes.FILE && isFileDragged != isDragging)
      setShowAddCardBottomOverlay(isDragging);
  }, [itemType, isDragging, isFileDragged]);

  return <Component {...props} />;
};

class App extends Component {
  static propTypes = {
    getGroupFollows: func.isRequired,
    launching: bool,
    page: string,
    setLaunchComplete: func.isRequired,
    setRouterHistory: func.isRequired,
    setupDataManager: func.isRequired,
    toggleUtilityValue: func.isRequired,
    introTourFinished: bool,
    finishIntroTour: func.isRequired
  };

  state = {
    isTourRunning: false
  };

  mounted_ = false;

  _scrollTimer = null;

  joyrideSteps = [
    {
      target: '.top-bar-boards-icon i',
      content: 'Open the side-menu with a list of your Boards and Templates'
    },
    {
      target: '.top-bar-home-icon i',
      content: 'Back to Friyay Home'
    },
    {
      target: '.breadcrumbs',
      content: 'Navigate back and forth with breadcrumbs',
      placementBeacon: 'right'
    },
    {
      target: '.top-bar-right-menu',
      content: 'Access all workspace chats, notifications, and settings',
      placementBeacon: 'left'
    },
    {
      target: '.invite-person-icon',
      content: 'Invite team members',
      placementBeacon: 'left'
    },
    {
      target: '.expandable-area-wrap',
      content: 'Access configuration options',
      placementBeacon: 'left'
    },
    {
      target: '.add-card-or-subtopic_button i',
      content:
        'Add Boards, Cards, Chats, Files, Action Plans, Projects and more',
      placementBeacon: 'right'
    },
    {
      target: '.pin-tools-add-icon i',
      content: 'You can pin tools here to customize your workspace home page'
    }
  ];

  async componentDidMount() {
    this.mounted_ = true;
    const { history, match, setRouterHistory, setLaunchComplete } = this.props;

    this.dataManager = this.props.setupDataManager();
    this.props.setLaunchComplete(false);

    const { isLogin, destination } = await Auth.validateToken(true);
    const { pathname, search, hostname } = window.location;
    const tenant = hostname.startsWith(window.APP_HOST)
      ? ''
      : hostname.split('.')[0];
    if (
      isLogin &&
      (tenant === 'www' || tenant === '') &&
      destination.split('?')[0] == '/'
    ) {
      get(history, 'location.state.from', '') == '/choose_domain'
        ? history.push('/')
        : history.push('/choose_domain');
    } else if (destination !== pathname + search) history.push(destination);
    if (isLogin) {
      setRouterHistory(history);
      this.versionManager = new TipHiveVersionManager(Messenger);

      window.addEventListener('scroll', this._handleScroll, true);

      await this.dataManager.getLaunchData();
      this.mounted_ && setLaunchComplete(true);
      tiphive.detectDropboxCallback();

      // Trigger Joyride if not already completed
      if (!this.props.introTourFinished) {
        setTimeout(
          () =>
            this.setState({
              isTourRunning: true
            }),
          5000
        );
      }
    }
  }

  componentDidUpdate(prevProps) {
    const { getGroupFollows, match } = this.props;

    this.handleVersionUpdate(prevProps);

    // fix re-running query of the previous page in response to store update
    this.dataManager.updateReduxOnPageChange(this.props);

    setTimeout(() => {
      this.dataManager.updateReduxOnPageChange(this.props);
    });
    match.params.groupSlug &&
      getGroupFollows(idFromSlug(match.params.groupSlug));
  }

  componentWillUnmount() {
    this.mounted_ = false;
    document.removeEventListener('scroll', this._handleScroll);
  }

  handleVersionUpdate = prevProps => {
    const { history, viewKey } = this.props;

    if (
      this.versionManager &&
      this.versionManager.isUpdated() &&
      (viewKey !== prevProps.viewKey ||
        history.location.pathname !== this.lastPathname)
    ) {
      window.location.reload();
    }
    this.lastPathname = history.location.pathname;
  };

  handleJoyrideCallback = data => {
    const { index, size, lifecycle } = data;
    if (index === size - 1 && lifecycle === 'complete') {
      this.props.finishIntroTour();
    }
  };

  _handleScroll = e => {
    const container = e.target;
    container.classList.add('scroll');

    clearTimeout(this._scrollTimer);

    this._scrollTimer = setTimeout(function() {
      container.classList.remove('scroll');
    }, 1500);
  };

  renderPage = page => {
    switch (page) {
      case 'home':
        return <TopicsPage />;
      case 'user':
        return <UserPage />;
      case 'users':
        return <PeoplePage />;
      case 'topic':
        return <TopicPage />;
      case 'topics':
        return <TopicsPage />;
      default:
        return false;
    }
  };

  render() {
    const {
      pinnedLensesBarVisible,
      leftViewsPanelVisible,
      displayEditDomainModal,
      displayEditCardModal,
      displayEditUserModal,
      displaySelectTopicDestinationModal,
      displayUpdateTopicModal,
      displayUserInvitationModal,
      displayOfficeHoursModal,
      displayCopyTopicModal,
      launching,
      page,
      keepRightFilterMenuOpen,
      active_design = {}
    } = this.props;

    const { pathname } = window.location;
    const { workspace_font_color, workspace_background_color } = active_design;
    const showPinLensesBar = !['users', 'topics', 'home'].includes(page);
    const isBoardsPage = ['home', 'topics'].includes(page);
    const isHome = ['home'].includes(page);

    return launching ? (
      <LoadingIndicator />
    ) : (
      <ErrorBoundary>
        <div
          style={{
            background:
              !isBoardsPage && active_design
                ? workspace_background_color
                : '#2e3037'
          }}
          id="AppRoot"
          className="tiphive-window"
        >
          <Joyride
            steps={this.joyrideSteps}
            run={this.state.isTourRunning}
            continuous
            callback={this.handleJoyrideCallback}
          />
          <div
            style={{
              background:
                !isBoardsPage && active_design
                  ? workspace_background_color
                  : '#2e3037'
            }}
            className="tiphive-outer-container"
          >
            <ErrorBoundary>
              <TopSearchBar />
            </ErrorBoundary>
            <div
              style={{
                background:
                  !isBoardsPage && active_design
                    ? workspace_background_color
                    : '#2e3037'
              }}
              className="tiphive-inner-container"
            >
              <LeftMenu />
              <ErrorBoundary>
                <LeftSubtopicMenu />
              </ErrorBoundary>
              {pinnedLensesBarVisible &&
                leftViewsPanelVisible &&
                showPinLensesBar &&
                !isHome && <PinLenses asLeftBar />}
              <div
                className="tiphive-content"
                style={{
                  marginLeft: pathname === '/boards' && 10
                }}
              >
                {pinnedLensesBarVisible &&
                  !leftViewsPanelVisible &&
                  showPinLensesBar &&
                  !isHome && <PinLenses asLeftBar />}
                <div
                  className="tiphive-content__main"
                  style={{
                    borderTopLeftRadius: pinnedLensesBarVisible ? '0px' : '20px'
                  }}
                >
                  {this.renderPage(page)}
                  <BottomCardDock />
                </div>
                {keepRightFilterMenuOpen && !isHome && <RightFilterMenu />}
              </div>
            </div>
          </div>

          <Route path="*/cards/:cardSlug" component={ItemPage} />
          <Route path="*/tips/:cardSlug" component={ItemPage} />

          {displayEditDomainModal.isOpen && (
            <DomainUpdateFormPage tab={displayEditDomainModal.tab} />
          )}
          {displayEditCardModal && (
            <MainFormPage
              cardFormOnly
              instantUpload={displayEditCardModal.instantUpload}
              topicId={displayEditCardModal.topicId}
            />
          )}
          {displayEditUserModal && <UserUpdateFormPage />}
          {displaySelectTopicDestinationModal.isOpen && (
            <TopicSelectDestinationPage />
          )}
          {displayUpdateTopicModal.isOpen && <TopicUpdateFormPage />}
          {displayUserInvitationModal && <UsersInvitationPage />}
          {displayOfficeHoursModal && <OfficeHoursModal />}
          {displayCopyTopicModal.isOpen && (
            <CopyTopicModal topic={displayCopyTopicModal.topic} />
          )}
          <CustomDragLayer />
          <LeftActionBarContainer />
          <ChatModal />
          <VideoModal />
          <DesktopNotification />
          <BulkChangesModal />
          <OrganizerQuizModal />
        </div>
      </ErrorBoundary>
    );
  }
}

const mapState = (state, props) => {
  const sm = stateMappings(state);
  const {
    modals,
    session,
    menus,
    user,
    page: { topicId },
    utilities: { shiftKeyDown, active_design },
    filters: { keepOpen }
  } = sm;
  const uiSettings = getUiSettings(state);

  if (session.launchComplete && !window.currentDomain) {
    window.currentDomain = getCurrentDomain(state);
  }

  const viewKey = !!topicId && getRelevantViewForPage(state);

  return {
    viewKey,
    active_design,
    loggedIn: !!user?.id,
    pinnedLensesBarVisible: uiSettings.pinned_lenses_bar_visible,
    leftViewsPanelVisible: !!menus.displayLeftSubtopicMenuForTopic.topicId,
    displayEditDomainModal: modals.displayEditDomainModal,
    displayEditCardModal: modals.displayEditCardModal,
    displayEditUserModal: modals.displayEditUserModal,
    displaySelectTopicDestinationModal:
      modals.displaySelectTopicDestinationModal,
    displayUpdateTopicModal: modals.displayUpdateTopicModal,
    displayUserInvitationModal: modals.displayUserInvitationModal,
    displayOfficeHoursModal: modals.displayOfficeHoursModal,
    displayCopyTopicModal: modals.displayCopyTopicModal,
    launching: !session.launchComplete,
    introTourFinished: state.appUser.introTourFinished,
    shiftKeyDown,
    isFileDragged: state._newReduxTree.ui.modals.showAddCardBottomOverlay,
    keepRightFilterMenuOpen: keepOpen
  };
};

const mapDispatch = {
  getGroupFollows,
  setLaunchComplete,
  setRouterHistory,
  setupDataManager,
  toggleUtilityValue,
  joinRealtime,
  joinRealtimeChannel,
  leaveRealtimeChannel,
  finishIntroTour,
  setShowAddCardBottomOverlay
};

export default connect(mapState, mapDispatch)(hoc(App));
