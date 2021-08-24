import { connect } from 'react-redux';
import moment from 'moment';
import orderBy from 'lodash/orderBy';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import IconButton from 'Components/shared/buttons/IconButton';
import ActiveFiltersPanel from 'Components/shared/filters/ActiveFiltersPanel';
import DMLoader from 'Src/dataManager/components/DMLoader';
import GenericDragDropListing from 'Components/shared/drag_and_drop/GenericDragDropListing';
import TimelineGrid from './TimelineGrid';
import GroupByDropDown from 'Components/shared/assemblies/GroupByDropDown';
import TimelineModeSelector from 'Components/shared/TimelineModeSelector';
import TimelineTimeframeSelector from 'Components/shared/TimelineTimeframeSelector';
import AddCardCard from 'Components/shared/cards/AddCardCard';
import { dragItemTypes } from 'Components/shared/drag_and_drop/dragTypeEnum';
import { moveOrCopyCardInOrToTopicFromDragAndDrop } from 'Src/newRedux/database/cards/abstractions';
import { updateCard } from 'Src/newRedux/database/cards/thunks';
import { setEditCardModalOpen } from 'Src/newRedux/interface/modals/actions';
import {
  scrollToShow,
  getSidePaneArrowTop,
  getSidePaneArrowLeft
} from 'Src/lib/utilities';
import { getGroupByCards } from 'Src/newRedux/database/cards/selectors';
import { stateMappings } from 'Src/newRedux/stateMappings';
import GenericPlanningCard from 'Src/components/shared/cards/GenericPlanningCard';
import {
  getUiSettings,
  setUserUiSettings,
  getFilterSettings
} from 'Src/helpers/user_config';
import Icon from 'Src/components/shared/Icon';

class TimelineLens extends Component {
  static propTypes = {
    cards: PropTypes.array,
    topic: PropTypes.any,
    updateCard: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.viewRef = React.createRef();
    this.TimelineGridRef = React.createRef();
    this.timelineViewContentRef = React.createRef();
    this.TimelineModeSelectorRef = React.createRef();
    this.TimelineTimeframeSelectorContainerRef = React.createRef();

    this.state = {
      columnMode: 'weeks',
      noDueCards: [],
      sortedCards: [],
      timeframeDate: moment(),
      inInputMode: false,
      leftCardListVisible: this.props.leftCardListVisible,
      timeframeLength: 1
    };
  }

  componentDidMount() {
    this.updateCardsState(this.props.cards);
    this.getTimeframeLength();
  }

  componentDidUpdate({ cards }) {
    if (cards !== this.props.cards) {
      this.updateCardsState(this.props.cards);
    }
  }

  getTimeframeLength = mode => {
    if (mode == 'daysInfinite' || this.state.columnMode == 'daysInfinite') {
      const { timeframeDate } = this.state;
      const incomingYear = timeframeDate.clone().year();
      const currentYear = new Date().getFullYear();
      const timelineStart = timeframeDate
        .clone()
        .startOf(incomingYear == currentYear ? 'week' : 'year');
      const timelineEnd = timeframeDate.clone().endOf('year');

      const daysLeftInYear = timelineEnd.diff(timelineStart, 'days');
      this.setState({ timeframeLength: daysLeftInYear });
    }
  };

  handleTimelineModeChange = mode => {
    this.getTimeframeLength(mode);
    this.setState({ columnMode: mode });
  };

  handleTimeframeDateChange = date => {
    this.setState({ timeframeDate: date }, () => {
      this.getTimeframeLength();
    });
  };

  toggleleftCardListVisible = () => {
    const { setUserUiSettings, topicId } = this.props;
    const { leftCardListVisible } = this.state;
    setUserUiSettings({ left_card_panel: !leftCardListVisible });
    this.setState(state => {
      return { leftCardListVisible: !state.leftCardListVisible };
    });
  };

  updateCardsState(cards) {
    let noDueCards = [];
    let sortedCards = [];

    cards.forEach(card => {
      if (!card.attributes.due_date) {
        noDueCards.push(card);
      } else {
        sortedCards.push(card);
      }
    });

    sortedCards = orderBy(sortedCards, ({ attributes }) => [
      moment(attributes.start_date).valueOf(),
      moment(attributes.due_date).valueOf()
    ]);

    this.setState({ noDueCards, sortedCards });
  }

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

  handleTimelineScroll = () => {
    if (this.state.columnMode == 'daysInfinite') {
      const element = this.timelineViewContentRef.current;

      const maxScrollBeforeAdd =
        element.scrollWidth - element.clientWidth - 2500;
      // console.log({
      //   maxScrollBeforeAdd,
      //   hasScrolled: element.scrollLeft,
      //   scrollWidth: element.scrollWidth,
      //   clientWidth: element.clientWidth
      // });
      if (
        element.scrollLeft > maxScrollBeforeAdd &&
        !this.state.isAddingMoreDays
      ) {
        this.TimelineGridRef?.current?.getWrappedInstance()?.addMoreDays();
      }
    }
  };

  renderModeSelectorDropdown = () => {
    return this.TimelineModeSelectorRef?.current?.renderDropdown(true, {
      left: `${this.TimelineTimeframeSelectorContainerRef.current.offsetWidth +
        20}px`,
      top: '50px'
    });
  };

  render() {
    const {
      displayLeftSubtopicMenuForTopic,
      topic,
      updateCard,
      cardRequirements,
      displayLeftMenu,
      active_design,
      pinnedLensesBarVisible,
      pinnedToolsBarWidth
    } = this.props;
    const {
      noDueCards,
      inInputMode,
      columnMode,
      timeframeDate,
      sortedCards,
      leftCardListVisible,
      showModeSelectorDropdown,
      activeMonth
    } = this.state;
    const topicId = topic ? topic.id : null;
    const {
      card_font_color,
      card_background_color,
      card_background_color_display
    } = active_design || {};

    return (
      <div ref={this.viewRef} className="timeline-board">
        {leftCardListVisible && (
          <div className="timeline-view__no-due-panel">
            <GenericDragDropListing
              dragClassName=""
              dropClassName="timeline-view__drop-zone"
              dropZoneProps={{}}
              draggedItemProps={{}}
              itemContainerClassName=""
              itemList={noDueCards || []}
              itemType={dragItemTypes.CARD}
              onDropItem={({ droppedItemProps: { item } }) => {
                if (item) {
                  updateCard({
                    id: item.id,
                    attributes: { due_date: null, start_date: null }
                  });
                }
              }}
              renderItem={card => (
                <GenericPlanningCard
                  card={card}
                  key={card.id}
                  topicId={topicId}
                />
              )}
            />
            <DMLoader
              dataRequirements={{
                cardsWithAttributes: {
                  attributes: {
                    ...cardRequirements,
                    noDueDate: true
                  }
                }
              }}
              loaderKey="cardsWithAttributes"
            />
            <AddCardCard
              cardClassName="timeline-grid__add-card"
              topicId={topicId}
              inInputMode={inInputMode}
              afterCardCreated={this.afterCardCreated}
              transparent
            />
          </div>
        )}
        <div
          ref={this.timelineViewContentRef}
          className="timeline-view__content"
          onScroll={this.handleTimelineScroll}
        >
          <div
            className="timeline-view__actions p-l-5px"
            style={{
              width:
                columnMode == 'daysInfinite'
                  ? this.TimelineGridRef.current.wrappedInstance.state
                      .containerWidth +
                    2000 +
                    'px'
                  : 'initial'
            }}
          >
            <div
              className={`timeline-view__actions p-l-5px ${columnMode ==
                'daysInfinite' && 'isChild'}`}
              style={{
                padding: 0,
                width:
                  columnMode == 'daysInfinite'
                    ? this.timelineViewContentRef.current?.offsetWidth
                    : 'initial'
              }}
            >
              <div
                className="timeline-view__actions-group"
                ref={this.TimelineTimeframeSelectorContainerRef}
              >
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
                    leftCardListVisible ? 'chevron-left' : 'chevron-right'
                  }`}
                  onClick={this.toggleleftCardListVisible}
                  tooltip="Hidden Cards"
                  tooltipOptions={{ place: 'right' }}
                />
                <TimelineTimeframeSelector
                  color={card_font_color}
                  className="timeline-view__timeframe"
                  columnMode={columnMode}
                  value={timeframeDate}
                  onChange={this.handleTimeframeDateChange}
                  setTimeframeLength={tfl =>
                    this.setState({ timeframeLength: tfl })
                  }
                  dropZoneEnabled
                />
              </div>
              <div className="timeline-view__actions-group">
                <div>
                  <TimelineModeSelector
                    ref={this.TimelineModeSelectorRef}
                    color={card_font_color}
                    className="timeline-view__mode-selector"
                    value={columnMode}
                    onChange={this.handleTimelineModeChange}
                    toggleModeSelectorDropdown={bool =>
                      this.setState({ showModeSelectorDropdown: bool })
                    }
                    refShowDropdown={showModeSelectorDropdown}
                  />
                </div>
                <GroupByDropDown additionalClass={'ml45'} small />
                <ActiveFiltersPanel />
              </div>
              {columnMode == 'daysInfinite' && (
                <div className="active_month">
                  <Icon icon="chevron_right" color={card_font_color} />
                  <div>{activeMonth}</div>
                  <Icon icon="chevron_left" color={card_font_color} />
                </div>
              )}
            </div>
            {showModeSelectorDropdown && this.renderModeSelectorDropdown()}
          </div>
          <TimelineGrid
            ref={this.TimelineGridRef}
            cards={sortedCards}
            cardRequirements={cardRequirements}
            className="timeline-view__timeline"
            columnMode={columnMode}
            noDueVisible={leftCardListVisible}
            timeframeDate={timeframeDate}
            topicId={topic && topic.id}
            timeframeLength={this.state.timeframeLength}
            setIsAddingMoreDays={bool =>
              this.setState({ isAddingMoreDays: bool })
            }
            groupByOptions={this.props.groupByOptions}
            setActiveMonth={month => this.setState({ activeMonth: month })}
          />
        </div>
      </div>
    );
  }
}

const mapState = state => {
  const sm = stateMappings(state);
  const {
    utilities: { active_design },
    page: { topicId },
    pinnedTools: { pinnedToolsBarWidth }
  } = sm;
  const filterSettings = getFilterSettings(state);
  const groupByOptions = filterSettings.group_by.groupBy || [];
  const ui_settings = getUiSettings(state);
  const leftCardListVisible = ui_settings.left_card_panel;
  return {
    active_design,
    displayLeftSubtopicMenuForTopic: sm.menus.displayLeftSubtopicMenuForTopic,
    displayLeftMenu: sm.menus.displayLeftMenu,
    leftCardListVisible,
    topicId,
    pinnedLensesBarVisible: ui_settings.pinned_lenses_bar_visible,
    pinnedToolsBarWidth,
    groupByOptions
  };
};

const mapDispatch = {
  moveOrCopyCardInOrToTopicFromDragAndDrop,
  setEditCardModalOpen,
  updateCard,
  setUserUiSettings
};

export default connect(mapState, mapDispatch)(TimelineLens);
