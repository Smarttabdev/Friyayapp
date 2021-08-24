import React, { Fragment, Component } from 'react';
import { stateMappings } from 'Src/newRedux/stateMappings';
import ActiveFiltersPanel from 'Components/shared/filters/ActiveFiltersPanel';
import { connect } from 'react-redux';
import ToDoSection from './ToDoSection';
import CompletedSection from './CompletedSection';
import CompletionSlider from 'Components/shared/CompletionSlider';
import TimeframeSelectors from 'Components/shared/TimeframeSelectors';
import IconButton from 'Components/shared/buttons/IconButton';
import GenericDragDropListing from '../../../shared/drag_and_drop/GenericDragDropListing';
import { dragItemTypes } from 'Components/shared/drag_and_drop/dragTypeEnum';
import AddCardCard from 'Components/shared/cards/AddCardCard';
import DMLoader from 'Src/dataManager/components/DMLoader';
import Ability from 'Lib/ability';
import { failure } from 'Utils/toast';
import { updateCard } from 'Src/newRedux/database/cards/thunks';
import { moveOrCopyCardInOrToTopicFromDragAndDrop } from 'Src/newRedux/database/cards/abstractions';
import {
  scrollToShow,
  getSidePaneArrowTop,
  getSidePaneArrowLeft
} from 'Src/lib/utilities';
import GenericPlanningCard from 'Src/components/shared/cards/GenericPlanningCard';
import debounce from 'lodash/debounce';
import difference from 'lodash/difference';
import moment from 'moment';
import { getUiSettings, setUserUiSettings } from 'Src/helpers/user_config';

const isCardCompleted = card => card.attributes.completed_percentage >= 100;

class GoalLens extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnMode: 'weeks',
      noDueCards: [],
      dueCards: [],
      inInputMode: false,
      startDate: moment().startOf('week'),
      endDate: moment().endOf('week'),
      weeksValue: 1,
      daysValue: 1,
      leftCardListVisible: this.props.leftCardListVisible
    };
  }

  viewRef = React.createRef();

  componentDidMount() {
    this.updateCardsState(this.props.cards);
    this.loadUiSettings();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.topic !== prevProps.topic) {
      this.loadUiSettings();
    }
    if (
      this.state.columnMode !== prevState.columnMode ||
      this.props.cards !== prevProps.cards
    ) {
      this.updateCardsState(this.props.cards);
    }
  }

  UNSAFE_componentWillReceiveProps({ cards }) {
    if (cards !== this.props.cards) {
      this.updateCardsState(cards);
    }
  }

  loadUiSettings = () => {
    const { uiSettings } = this.props;
    if (uiSettings) {
      const {
        sprint_interval_mode,
        sprint_interval_week,
        sprint_interval_days,
        sprint_interval_start_date,
        sprint_interval_end_date
      } = uiSettings;
      this.setState({
        columnMode: sprint_interval_mode || 'weeks',
        weeksValue: sprint_interval_week || 1,
        daysValue: sprint_interval_days || 1,
        startDate: moment(sprint_interval_start_date).startOf('day'),
        endDate: moment(sprint_interval_end_date).endOf('day')
      });
      if (sprint_interval_mode === 'viewDateRange') {
        this.initTimeframeDateFromView();
      }
    }
  };

  updateTopicUiSettings = debounce(() => {
    const { setUserUiSettings } = this.props;
    const {
      columnMode,
      weeksValue,
      daysValue,
      startDate,
      endDate
    } = this.state;
    setUserUiSettings({
      sprint_interval_mode: columnMode,
      sprint_interval_week: weeksValue,
      sprint_interval_days: daysValue,
      sprint_interval_start_date: startDate.format(),
      sprint_interval_end_date: endDate.format()
    });
  }, 1000);

  initTimeframeDateFromView = () => {
    const { topic } = this.props;
    if (topic) {
      const {
        attributes: { start_date, due_date }
      } = topic;
      this.setState({
        startDate: moment(start_date).startOf('day'),
        endDate: moment(due_date).endOf('day')
      });
    }
  };

  handleTimelineModeChange = mode => {
    if (mode === 'viewDateRange') {
      this.initTimeframeDateFromView();
    }
    this.setState({ columnMode: mode }, () => {
      this.updateTopicUiSettings();
    });
  };

  handleDateRangeChange = ({ startDate, endDate }) => {
    this.setState(
      {
        startDate,
        endDate
      },
      () => {
        this.updateTopicUiSettings();
      }
    );
  };

  handleOptionsInputChange = (id, value) => {
    this.setState({ [`${id}Value`]: value }, () => {
      this.updateTopicUiSettings();
    });
  };

  toggleleftCardListVisible = () => {
    const { setUserUiSettings, topicId } = this.props;
    const { leftCardListVisible } = this.state;
    if (topicId) {
      setUserUiSettings({ left_card_panel: !leftCardListVisible });
    }
    this.setState(state => {
      return { leftCardListVisible: !state.leftCardListVisible };
    });
  };

  updateCardsState = cards => {
    const {
      uiSettings: { sprint_interval_mode }
    } = this.props;
    let noDueCards = [];
    let dueCards = [];

    if (sprint_interval_mode == 'allCards') {
      noDueCards = [];
      dueCards = cards;
    } else {
      cards.forEach(card => {
        if (
          !card.attributes.completion_date &&
          !card.attributes.due_date &&
          !card.attributes.start_date
        ) {
          noDueCards.push(card);
        } else {
          dueCards.push(card);
        }
      });
    }
    this.setState({ noDueCards, dueCards });
  };

  handleDropCard = ({ droppedItemProps, dropZoneProps, itemOrder }) => {
    const {
      item: {
        id,
        attributes: { start_date, due_date, completion_date }
      }
    } = droppedItemProps;
    const { updateCard, moveOrCopyCardInOrToTopicFromDragAndDrop } = this.props;

    if (Ability.can('update', 'self', droppedItemProps.item)) {
      if (start_date || due_date || completion_date) {
        const attributes = {
          start_date: null,
          due_date: null,
          completed_percentage: 0,
          completion_date: null
        };

        updateCard({ attributes, id });
      }

      moveOrCopyCardInOrToTopicFromDragAndDrop({
        droppedItemProps,
        dropZoneProps,
        itemOrder
      });
    } else {
      failure("You don't have permission to move that card!");
    }
  };

  handleToggleInputMode = () => {
    this.setState(state => ({ inInputMode: !state.inInputMode }));
  };

  afterCardCreated = cardId => {
    if (this.props.cardsSplitScreen) {
      this.props.updateSelectedCard(cardId);
    }
    const elem = document.querySelector('.card-title.c' + cardId);
    scrollToShow(elem, 14, 24);
  };

  render() {
    let {
      cardRequirements,
      topic,
      isHome,
      displayLeftSubtopicMenuForTopic,
      displayLeftMenu,
      active_design,
      pinnedLensesBarVisible,
      pinnedToolsBarWidth
    } = this.props;

    let {
      dueCards,
      noDueCards,
      columnMode,
      startDate,
      endDate,
      leftCardListVisible
    } = this.state;

    const topicId = topic ? topic.id : null;
    const timeUnit = ['viewDateRange', 'anyDateRange'].includes(columnMode)
      ? 'days'
      : columnMode;
    let upcomingDueCards = dueCards;

    if (columnMode != 'any' && columnMode != 'allCards') {
      upcomingDueCards = dueCards.filter(card => {
        const { due_date, completion_date } = card.attributes;
        const date = completion_date || due_date;
        return moment(date).isBetween(startDate, endDate, null, '[]');
      });
    }

    const numberComplete = upcomingDueCards.filter(isCardCompleted);

    const numberInProgress = difference(upcomingDueCards, numberComplete);

    // const percentageInProgress = Math.floor((numberInProgress.length / dueCards.length) * 100);
    const percentageComplete = Math.ceil(
      (numberComplete.length / upcomingDueCards.length) * 100
    );

    const {
      card_font_color,
      card_background_color,
      card_background_color_display
    } = active_design || {};

    return (
      <div
        ref={this.viewRef}
        className="kanban-board"
        style={{ paddingLeft: isHome ? '20px' : '30px' }}
      >
        <aside
          className={`kanban-view_unlabelled-panel ${
            leftCardListVisible ? 'presented' : ''
          }`}
        >
          {leftCardListVisible && (
            <Fragment>
              <GenericDragDropListing
                dropClassName="kanban-view_lane-catchment"
                dragClassName="task-view_drag-card"
                dropZoneProps={{ topicId: topic ? topic.id : null }}
                draggedItemProps={{
                  origin: { topicId: topic ? topic.id : null }
                }}
                itemContainerClassName=""
                itemList={noDueCards}
                itemType={dragItemTypes.CARD}
                onDropItem={this.handleDropCard}
                renderItem={card => (
                  <GenericPlanningCard
                    card={card}
                    key={card.id}
                    topicId={topicId}
                  />
                )}
              >
                <AddCardCard
                  cardClassName="goal-card"
                  topicId={topicId}
                  inInputMode={this.state.inInputMode}
                  afterCardCreated={this.afterCardCreated}
                  topMenu
                />

                <DMLoader
                  dataRequirements={{
                    cardsWithAttributes: { attributes: cardRequirements }
                  }}
                  loaderKey="cardsWithAttributes"
                />
              </GenericDragDropListing>
            </Fragment>
          )}
        </aside>
        <div className="kanban-view_main-section goal-view_main-section">
          <div className="goal-view_top-bar pl10">
            <IconButton
              containerClasses="left-section-icon-container"
              wrapperClasses="left-section-icon"
              style={{
                top: `${getSidePaneArrowTop(this.viewRef).slice(0, -2)}px`,
                backgroundColor: '#fafafa',
                left: `${getSidePaneArrowLeft(false) +
                  (displayLeftSubtopicMenuForTopic.topicId ? 285 : 0) +
                  (displayLeftMenu ? 270 : 0) +
                  (pinnedLensesBarVisible ? pinnedToolsBarWidth : 5) +
                  8.7}px`
              }}
              color={card_font_color}
              fontAwesome
              icon={`${
                leftCardListVisible ? 'chevron-left' : 'chevron-right ml10'
              }`}
              onClick={this.toggleleftCardListVisible}
              tooltip="Hidden Cards"
              tooltipOptions={{ place: 'right' }}
            />
            <TimeframeSelectors
              mode={this.state.columnMode}
              startDate={startDate}
              endDate={endDate}
              offsets={{
                days: this.state.daysValue,
                weeks: this.state.weeksValue
              }}
              onModeChange={this.handleTimelineModeChange}
              onDateRangeChange={this.handleDateRangeChange}
              onOffsetChange={this.handleOptionsInputChange}
              color={card_font_color}
              dropZoneEnabled
            />
            <ActiveFiltersPanel additionalContainerClass={'ml10'} />
          </div>
          <div className="sprint-header header-links align-i-center pl10 pr25">
            <div className="ml5 mr5 full-width">
              <CompletionSlider
                width="100%"
                value={percentageComplete}
                dontUpdate
              />
            </div>
            <span className="background-purple goal-view_fraction">
              <span className="fraction">
                {numberComplete.length}
                <span className="divisor">/</span>
                {upcomingDueCards.length}
              </span>
            </span>
          </div>
          <div className="goal-board-content-container">
            <ToDoSection
              topic={topic}
              cards={numberInProgress}
              // percentageOfCards={percentageInProgress}
              cardRequirements={cardRequirements}
              columnMode={columnMode}
              timeUnit={timeUnit}
              startDate={startDate}
              endDate={endDate}
            />
            <CompletedSection
              topic={topic}
              cards={numberComplete}
              percentageOfCards={percentageComplete}
              cardRequirements={cardRequirements}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  const sm = stateMappings(state);
  const {
    page: { topicId, isHome },
    utilities: { active_design },
    topics,
    pinnedTools: { pinnedToolsBarWidth }
  } = sm;

  const topic = topicId && topics[topicId];

  const ui_settings = getUiSettings(state);
  const leftCardListVisible = ui_settings.left_card_panel;
  return {
    active_design,
    displayLeftSubtopicMenuForTopic: sm.menus.displayLeftSubtopicMenuForTopic,
    displayLeftMenu: sm.menus.displayLeftMenu,
    topic,
    isHome,
    topicId,
    leftCardListVisible,
    uiSettings: ui_settings,
    pinnedLensesBarVisible: ui_settings.pinned_lenses_bar_visible,
    pinnedToolsBarWidth
  };
};

const mapDispatch = {
  updateCard,
  moveOrCopyCardInOrToTopicFromDragAndDrop,
  setUserUiSettings
};

export default connect(mapState, mapDispatch)(GoalLens);
