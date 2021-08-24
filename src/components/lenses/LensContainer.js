import React, { Fragment, useEffect, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { pick, isEqual } from 'lodash';
import { stateMappings } from 'Src/newRedux/stateMappings';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { getRelevantViewForPage } from 'Src/newRedux/interface/lenses/selectors';
import {
  changeTopic,
  updateFilterSettings
} from 'Src/newRedux/database/topics/actions';
import RightActionBarContainer from 'Src/components/menus/right/RightActionBarContainer';
import ErrorBoundary from 'Src/components/shared/errors/ErrorBoundary';
import DynamicHeaderContainer from 'Components/lenses/DynamicHeaderContainer';
import DynamicTopicContainer from 'Components/lenses/DynamicTopicContainer';
import DynamicCardContainer from 'Components/lenses/DynamicCardContainer';
import AddCardCard from 'Components/shared/cards/AddCardCard';
import { toggleSubtopicPanel } from 'Src/newRedux/interface/lenses/thunks';
import { updateSelectedCard } from 'Src/newRedux/database/user/thunks';
import { GREY_VIEW } from 'AppConstants';
import { withRouter } from 'react-router-dom';
import SprintBar from 'Components/shared/topics/SprintBar';
import { setActiveDesign } from 'Src/newRedux/utilities/actions';
import {
  getUiSettings,
  getFilterSettings,
  setUserFilterSettings,
  getCustomLensId,
  setUserUiSettings
} from 'Src/helpers/user_config';
import { handleScrollLeftOrRight } from 'src/lib/utilities';
import BoardTabs from 'Components/shared/BoardTabs';
import DMLoader from 'Src/dataManager/components/DMLoader';
import { setBoardTabsIsOpen } from 'Src/newRedux/interface/page/actions';
import AddViewsPanel from 'Components/lenses/AddViewsPanel';
import TutorialView from '../shared/tutorial/tutorial-view';
import { get } from 'lodash';
import { updateShowTutorial } from 'Src/newRedux/database/user/thunks';
import { updateShowTutorialAttribute } from 'Src/newRedux/database/user/actions';

const setClassName = viewKey => {
  let className = null;
  switch (viewKey) {
    case 'TEAM_PLAN':
    case 'MY_PLAN':
      className = '.layout-pane';
      break;
    case 'ACTION_PLAN':
    case 'MY_TASKS':
    case 'ESTIMATION':
    case 'SHEET':
      className = '.sheet-board';
      break;
    case 'TEAM_DAY':
      className = '.day_lenses';
      break;
    case 'MY_RESULTS':
    case 'TEAM_RESULTS':
    case 'PROJECT_RESULTS':
      className = '.my-results-board-table__scroll';
      break;
    case 'MY_CALENDAR':
    case 'PLANNING':
    case 'CALENDAR':
    case 'STATUS_TABLE':
    case 'BURNDOWN':
    case 'WEEKLY_SPREAD_VIEW':
      className = '.planning-view__timeline';
      break;
    case 'TIMELINE':
      className = '.timeline-view__content';
      break;
    case 'KANBAN':
    case 'ASSIGNED':
    case 'PRIORITIZE':
      className = '.kanban-view_lanes-container';
      break;
    case 'GOAL':
      className = '.goal-view_main-section';
      break;
    default:
      className = '.layout-pane';
  }

  return className;
};

const pages = ['home', 'topics'];

const hoc = Component => props => {
  useEffect(() => {
    document.querySelector('#main-focus-scroll').focus();
  }, [props.viewKey, props.topic?.id, props.scrollMode]);

  useLayoutEffect(() => {
    const parent = document.querySelector('#main-focus-scroll');
    const className = setClassName(props.viewKey);
    if (!className) return;
    const container = document.querySelector(className);
    if (container && parent) {
      parent.addEventListener('keydown', e => {
        !['INPUT', 'TEXTAREA'].includes(e.target.tagName) &&
          handleScrollLeftOrRight(e, container);
      });
    }
    return () => {
      parent.removeEventListener('keydown', handleScrollLeftOrRight);
    };
  });

  // activate active order's filter settings
  useLayoutEffect(() => {
    let filterSettings =
      props.filtersOrderQuery?.activeFiltersOrder?.order?.[0];
    if (!filterSettings) return;
    filterSettings = JSON.parse(filterSettings);

    filterSettings.active_tool_board_order = filterSettings.pick_your_boards
      ? props.topicsOrderQuery?.activeTopicsOrder?.order
      : null;

    !isEqual(filterSettings, props.filterSettings) &&
      props.updateFilterSettings({
        topicId: props.topic.id,
        filter_setting: filterSettings
      });
  }, [props.topic?.id, props.filtersOrderQuery?.activeFiltersOrder?.id]);

  useEffect(() => {
    const vars = pick(props.__fragmentOwner.variables, [
      'topicId',
      'lenseId',
      'lenseKey'
    ]);
    const disposers = [
      subscriptions.customOrdersUpdated({
        orderType: 'topics',
        onNext: () =>
          fetchQuery(
            graphql`
              query LensContainerTopicsOrderRefetchQuery(
                $topicId: ID
                $lenseId: ID
                $lenseKey: String
              ) {
                ...LensContainer_topicsOrderQuery
                  @arguments(
                    topicId: $topicId
                    lenseId: $lenseId
                    lenseKey: $lenseKey
                  )
              }
            `,
            {
              topicId: toGid('Topic', props.parentTopicId),
              lenseId: toGid('Lens', props.parentLenseId),
              lenseKey: props.parentViewKey
            }
          )
      }),
      subscriptions.customOrdersUpdated({
        orderType: 'people',
        onNext: () =>
          fetchQuery(
            graphql`
              query LensContainerActivePeopleOrderRefetchQuery(
                $topicId: ID
                $lenseId: ID
                $lenseKey: String
              ) {
                activeCustomOrder(
                  orderType: people
                  topicId: $topicId
                  lenseId: $lenseId
                  lenseKey: $lenseKey
                ) {
                  id
                  name
                  order
                }
              }
            `,
            vars
          )
      }),
      subscriptions.customOrdersUpdated({
        orderType: 'filters',
        onNext: async () => {
          const results = await fetchQuery(
            graphql`
              query LensContainerFiltersOrderRefetchQuery(
                $topicId: ID
                $lenseId: ID
                $lenseKey: String
              ) {
                activeCustomOrder(
                  orderType: filters
                  topicId: $topicId
                  lenseId: $lenseId
                  lenseKey: $lenseKey
                ) {
                  id
                  name
                  order
                }
              }
            `,
            pick(props.__fragmentOwner.variables, [
              'topicId',
              'lenseId',
              'lenseKey'
            ])
          );
          let filterSettings = results?.activeCustomOrder?.order?.[0];
          if (filterSettings) {
            filterSettings = JSON.parse(filterSettings);

            const currentFilters =
              props.topic.attributes.user_configuration.data.attributes
                .filter_setting;

            if (isEqual(filterSettings, currentFilters)) return;

            props.updateFilterSettings({
              topicId: props.topic.id,
              filter_setting: filterSettings
            });
          }
        }
      })
    ];
    return () => disposers.forEach(d => d.dispose());
  }, [
    props.__fragmentOwner?.variables?.topicId,
    props.__fragmentOwner?.variables?.lenseId,
    props.__fragmentOwner?.variables?.lenseKey
  ]);

  useEffect(() => {
    const active_tool_board_order = props?.filterSettings?.pick_your_boards
      ? props.topicsOrderQuery?.activeTopicsOrder?.order
      : null;
    !isEqual(
      active_tool_board_order,
      props?.filterSettings?.active_tool_board_order
    ) && props.setUserFilterSettings({ active_tool_board_order });
  }, [
    props?.filterSettings?.pick_your_boards,
    JSON.stringify(props.topicsOrderQuery?.activeTopicsOrder?.order || {})
  ]);

  return <Component {...props} />;
};

class LensContainer extends React.Component {
  static propTypes = {
    cards: PropTypes.array,
    cardRequirements: PropTypes.object,
    displayCards: PropTypes.bool,
    displayTopics: PropTypes.bool,
    headerView: PropTypes.string,
    page: PropTypes.string,
    subtopics: PropTypes.array,
    topic: PropTypes.object,
    topicRequirements: PropTypes.object,
    viewKey: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    displayRightSubMenuForMenu: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    domainTopicsPanelView: PropTypes.string,
    topicView: PropTypes.string,
    cardView: PropTypes.string,
    isFileDragged: PropTypes.bool,
    views: PropTypes.object,
    additionalCssClasses: PropTypes.string,
    toggleSubtopicPanel: PropTypes.func.isRequired,
    active_design: PropTypes.any
  };

  constructor(props) {
    super(props);
    this.toggleSubtopicPanel = props.toggleSubtopicPanel;
    this.state = {
      showAddTopicInput: false
    };
  }

  handleToggleTopicSection = () => {
    const { topic } = this.props;
    this.toggleSubtopicPanel(topic);
  };

  /**
   * Build DynamicHeaderContainer props from component props.
   *
   * @return  {Object}
   */
  buildHeaderContainerProps = () => {
    const {
      topic,
      headerView,
      toggleSubtopicPanel,
      cards,
      views,
      hideQuickToolbar
    } = this.props;
    const { addNewTopic } = this;
    return {
      topic,
      headerView,
      addNewTopic,
      toggleSubtopicPanel,
      views,
      hideQuickToolbar
    };
  };

  /**
   * Build DynamicTopicContainer props from component props.
   *
   * @return  {Object}
   */
  buildTopicContainerProps = () => {
    const {
      topic,
      topicRequirements,
      topicView,
      subtopics,
      cardsHidden
    } = this.props;

    const showAddTopicInput = this.state.showAddTopicInput;
    const payload = {
      topic,
      topicRequirements,
      topicView,
      cardsHidden,
      topics: subtopics,
      showAddTopicInput
    };
    return payload;
  };

  /**
   * Build DynamicCardContainer props from component props.
   *
   * @return  {Object}
   */
  buildCardsContainerProps = () => {
    const {
      cardRequirements,
      cards,
      subtopics,
      topic,
      cardView,
      cardsHidden,
      cardsSplitScreen,
      updateSelectedCard,
      active_design
    } = this.props;

    return {
      cardRequirements,
      cards,
      subtopics,
      topic,
      cardView,
      cardsHidden,
      cardsSplitScreen,
      updateSelectedCard,
      active_design
    };
  };

  componentDidMount() {
    const { viewKey, setUserUiSettings } = this.props;
    let displayTopics = false;
    if (viewKey === 'TOPIC_TILES') {
      displayTopics = true;
    }
    setUserUiSettings({
      subtopic_panel_visible: displayTopics
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.active_design !== prevProps.active_design) {
      const {
        workspace_background_color = null,
        workspace_font_color = null
      } = this.props.active_design;
      const App = document.getElementById('AppRoot');
      App.style.color = workspace_font_color;
      App.style.backgroundColor = workspace_background_color;
    }

    const this_boardTabsIsOpen =
      !['TILE'].includes(this.props.viewKey) &&
      !this.props.boardTabsClosed?.value;
    if (this_boardTabsIsOpen != this.props.boardTabsIsOpen) {
      this.props.setBoardTabsIsOpen(this_boardTabsIsOpen);
    }
  }

  addNewTopic = () => {
    this.setState({ showAddTopicInput: true });
  };

  getBackground = board => {
    if (board) {
      return this.getContentBackground(board);
    }
    return 'board-container-white';
  };

  getContentBackground = board => {
    if (board && GREY_VIEW.includes(board)) {
      return 'board-container-grey2';
    }
    return `board-container-${board == 'INBOX' ? 'dark' : 'white'}`;
  };

  hideTutorial = () => {
    this.props.updateShowTutorialAttribute({
      attributes: { showTutorial: false }
    });
    this.props.updateShowTutorial(false);
  };

  render() {
    const {
      displayRightSubMenuForMenu,
      additionalCssClasses,
      displayTopics,
      subtopics,
      topic,
      displayCards,
      isFileDragged,
      hideRightBar,
      cardView,
      active_design,
      cards,
      leftDocked,
      rightDocked,
      lensKey,
      page,
      topicId,
      boardTabsClosed,
      viewKey,
      addViewsPanelVisible,
      showTutorial,
      show_tutorial
    } = this.props;
    const dynamicHeaderContainerProps = this.buildHeaderContainerProps();
    const dynamicTopicContainerProps = this.buildTopicContainerProps();
    const dynamicCardsContainerProps = this.buildCardsContainerProps();
    const canShowAddViewsPanel = ['TOPIC_TILES'].includes(viewKey);
    const isBoardsPage = pages.includes(page);

    return (
      <div
        id="main-focus-scroll"
        tabIndex="0"
        style={{
          color: isBoardsPage
            ? '#fff'
            : active_design?.card_font_color && !isBoardsPage
            ? active_design.card_font_color
            : '',
          backgroundColor: isBoardsPage
            ? '#2e3037'
            : active_design?.card_background_color_display && !isBoardsPage
            ? active_design.card_background_color
            : '',
          backgroundImage: isBoardsPage
            ? ''
            : active_design?.card_background_image_display && !isBoardsPage
            ? `url("${active_design.card_background_image_url}")`
            : ''
        }}
        className={cx(
          `board-container ${this.getBackground(cardView)}`,
          leftDocked && 'board-container--left-docked',
          rightDocked && 'board-container--right-docked',
          `tool-${lensKey}`,
          `page-${page}`
        )}
      >
        {/* {active_design && active_design.card_background_image_display ? (
          <div className="board-container-overlay" />
        ) : null} */}
        <DynamicHeaderContainer {...dynamicHeaderContainerProps} />
        {isBoardsPage && (showTutorial || show_tutorial) && (
          <TutorialView hideTutorial={this.hideTutorial} />
        )}

        {!['TILE'].includes(viewKey) &&
          !boardTabsClosed?.value &&
          !pages.includes(page) && <BoardTabs />}
        {addViewsPanelVisible && canShowAddViewsPanel && !isBoardsPage && (
          <AddViewsPanel />
        )}

        <div className={cx('content-container', additionalCssClasses)}>
          <div
            className={cx('content-main', {
              'right-menu-expanded': displayRightSubMenuForMenu
            })}
          >
            {displayTopics && subtopics && (
              <DynamicTopicContainer {...dynamicTopicContainerProps} />
            )}
            {!isBoardsPage && <SprintBar cards={cards} topic={topic} />}

            {displayCards && (
              <Fragment>
                <DynamicCardContainer {...dynamicCardsContainerProps} />
                {isFileDragged && topic && (
                  <div className="new-card-dropzone-overlay">
                    <AddCardCard
                      board="bottom-dropzone-overlay"
                      topic={topic}
                      bottomOverlay
                    />
                  </div>
                )}
              </Fragment>
            )}
          </div>
        </div>
        {!hideRightBar && page !== 'home' && (
          <ErrorBoundary>
            <RightActionBarContainer />
          </ErrorBoundary>
        )}
        <DMLoader
          dataRequirements={{
            topicOrders: { topicId }
          }}
          loaderKey="topicOrders"
        />
      </div>
    );
  }
}

const mapState = (state, props) => {
  const sm = stateMappings(state);
  const {
    user,
    menus,
    page,
    topics,
    utilities: { active_design }
  } = sm;
  const topicId = props?.topic?.id || page.topicId;
  const topic = topics[topicId];
  const cardsSplitScreen = menus.cardsSplitScreen;
  const uiSettings = getUiSettings(state);
  const lensKey = uiSettings.current_active_template;
  const filterSettings = getFilterSettings(state);
  const lenseId = getCustomLensId(state);
  const parentTopicId = page.parentTopicId || topicId;
  const parentLenseId = getCustomLensId(state, parentTopicId);
  const parentViewKey = getRelevantViewForPage(state, parentTopicId);
  // const ui_settings = getUiSettings(state, topicId);
  return {
    user,
    show_tutorial: get(user, 'attributes.show_tutorial'),
    showTutorial: get(user, 'attributes.showTutorial'),
    topic,
    page: page.page,
    domainId: page.domainId,
    topicMinimized: !menus.displayHexPanel,
    viewKey: getRelevantViewForPage(state),
    topicPanelView: menus.topicPanelView,
    domainTopicsPanelView: uiSettings.subtopics_panel_view,
    displayRightSubMenuForMenu: menus.displayRightSubMenuForMenu,
    isFileDragged: state._newReduxTree.ui.modals.showAddCardBottomOverlay,
    active_design,
    cardsSplitScreen,
    leftDocked: uiSettings.pinned_lenses_bar_visible,
    rightDocked: uiSettings.right_filter_menu_visible || true,
    lensKey,
    filterSettings,
    topicId,
    parentTopicId,
    parentLenseId,
    parentViewKey,
    lenseId,
    boardTabsIsOpen: page.boardTabsIsOpen,
    addViewsPanelVisible: uiSettings.add_option
  };
};

const mapDispatch = {
  toggleSubtopicPanel,
  updateSelectedCard,
  setActiveDesign,
  setUserFilterSettings,
  updateFilterSettings,
  changeTopic,
  setBoardTabsIsOpen,
  setUserUiSettings,
  updateShowTutorial,
  updateShowTutorialAttribute
};

const FragmentContainer = createFragmentContainer(hoc(LensContainer), {
  topicsOrderQuery: graphql`
    fragment LensContainer_topicsOrderQuery on Query
      @argumentDefinitions(
        topicId: { type: ID }
        lenseId: { type: ID }
        lenseKey: { type: String }
      ) {
      activeTopicsOrder: activeCustomOrder(
        orderType: topics
        topicId: $topicId
        lenseId: $lenseId
        lenseKey: $lenseKey
      ) {
        id
        name
        order
      }
    }
  `,
  filtersOrderQuery: graphql`
    fragment LensContainer_filtersOrderQuery on Query
      @argumentDefinitions(
        topicId: { type: ID }
        lenseId: { type: ID }
        lenseKey: { type: String }
      ) {
      activeFiltersOrder: activeCustomOrder(
        orderType: filters
        topicId: $topicId
        lenseId: $lenseId
        lenseKey: $lenseKey
      ) {
        id
        name
        order
      }
    }
  `
});

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(
    QueryRenderer(
      props => (
        <FragmentContainer
          {...props}
          topicsOrderQuery={props}
          filtersOrderQuery={props}
        />
      ),
      {
        query: graphql`
          query LensContainerQuery(
            $parentTopicId: ID!
            $topicId: ID!
            $lenseId: ID
            $lenseKey: String
            $boardTabsClosedConfig: String!
          ) {
            ...LensContainer_topicsOrderQuery
              @arguments(
                topicId: $topicId
                lenseId: $lenseId
                lenseKey: $lenseKey
              )
            ...LensContainer_filtersOrderQuery
              @arguments(
                topicId: $topicId
                lenseId: $lenseId
                lenseKey: $lenseKey
              )
            boardTabsClosed: config(
              owner: $parentTopicId
              config: $boardTabsClosedConfig
            ) {
              value
            }
          }
        `,
        vars: ({
          topicId,
          lenseId,
          viewKey,
          parentTopicId,
          parentViewKey
        }) => ({
          parentTopicId: toGid('Topic', parentTopicId || 0),
          topicId: toGid('Topic', topicId || 0),
          lenseId: toGid('Lens', lenseId),
          lenseKey: viewKey,
          boardTabsClosedConfig: `${parentViewKey}.boardTabsClosed`
        })
      }
    )
  )
);
