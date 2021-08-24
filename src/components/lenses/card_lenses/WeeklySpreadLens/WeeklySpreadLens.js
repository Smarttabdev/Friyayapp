import React, { Component, useEffect } from 'react';
import moment from 'moment';
import get from 'lodash/get';
import GenericDragDropListing from 'Components/shared/drag_and_drop/GenericDragDropListing';
import { dragItemTypes } from 'Components/shared/drag_and_drop/dragTypeEnum';
import ActiveFiltersPanel from 'Components/shared/filters/ActiveFiltersPanel';
import TimelineModeSelector from 'Components/shared/TimelineModeSelector';
import withDataManager from 'Src/dataManager/components/withDataManager';
import AddCardCard from 'Components/shared/cards/AddCardCard';
import IconButton from 'Components/shared/buttons/IconButton';
import TimelineTimeframeSelector from 'Components/shared/TimelineTimeframeSelector';
import { COL_MODE_MONTH, COL_MODE_WEEK, COL_MODE_WEEKWD } from './constants';
import WeeklySpreadLensGrid from './WeeklySpreadLensGrid';
import {
  getSidePaneArrowTop,
  getSidePaneArrowLeft,
  getTotalLogTime
} from 'Src/lib/utilities';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { prepareLogtimes } from 'Src/newRedux/database/logtimes/actions';
import isEqual from 'lodash/isEqual';
import GenericPlanningCard from 'Src/components/shared/cards/GenericPlanningCard';
import DMLoader from 'Src/dataManager/components/DMLoader';
import { getUiSettings, setUserUiSettings } from 'Src/helpers/user_config';
class WeeklySpreadLens extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnMode: COL_MODE_WEEKWD,
      startDate: moment().startOf('week'),
      totalLogTime: 0,
      leftCardListVisible: this.props.leftCardListVisible
    };

    this.viewRef = React.createRef();
  }

  getTimeUnit = () =>
    this.state.columnMode === COL_MODE_MONTH ? 'month' : 'week';

  toggleleftCardListVisible = () => {
    const { setUserUiSettings } = this.props;
    const { leftCardListVisible } = this.state;
    setUserUiSettings({ left_card_panel: !leftCardListVisible });
    this.setState(state => {
      return { leftCardListVisible: !state.leftCardListVisible };
    });
  };

  handleTimelineModeChange = columnMode => {
    if (columnMode === COL_MODE_MONTH) {
      this.setState({
        columnMode,
        startDate: moment(this.state.startDate).startOf('month')
      });
    } else if (columnMode === COL_MODE_WEEK) {
      this.setState({
        columnMode,
        startDate: moment(this.state.startDate).startOf('week')
      });
    } else if (columnMode === COL_MODE_WEEKWD) {
      this.setState({
        columnMode,
        startDate: this.state.startDate
          .clone()
          .startOf('week')
          .add(1, 'day')
      });
    }
  };

  handleTimeframeDateChange = startDate => {
    this.setState({ startDate });
  };

  componentDidMount() {
    this.toggleleftCardListVisible();
    this.props.prepareLogtimes(this.props.cards);
    this.calcTotalLogTime();
  }

  componentDidUpdate(prevProps, prevState) {
    const currentCards = get(this.props, 'cards');
    const prvCards = get(prevProps, 'cards');

    if (
      this.props.topicId &&
      (this.props.topicId !== prevProps.topicId ||
        !isEqual(currentCards, prvCards))
    ) {
      this.props.prepareLogtimes(currentCards);
    }

    if (
      this.props.logtimes.data.allLogtimes !==
        prevProps.logtimes.data.allLogtimes ||
      this.state.startDate !== prevState.startDate
    ) {
      this.calcTotalLogTime();
    }
  }

  calcTotalLogTime = () => {
    const {
      data: { allLogtimes }
    } = this.props.logtimes;
    const timeUnit = this.getTimeUnit();
    const startDate = this.state.startDate.clone().startOf(timeUnit);
    const endDate = startDate.clone().endOf(timeUnit);
    const totalLogTime = getTotalLogTime(allLogtimes, startDate, endDate);
    this.setState({ totalLogTime: Math.round(totalLogTime) });
  };

  render() {
    const {
      cards = [],
      dmLoading,
      displayLeftSubtopicMenuForTopic,
      displayLeftMenu,
      active_design,
      topicId,
      isHome,
      pinnedLensesBarVisible,
      pinnedToolsBarWidth,
      filteredCardsArray
    } = this.props;
    const {
      card_font_color,
      card_background_color,
      card_background_color_display
    } = active_design || {};
    const { leftCardListVisible } = this.state;
    return (
      <div ref={this.viewRef} className="planning-board calendar-board">
        {leftCardListVisible && (
          <div className="calendar-view__no-due-panel">
            <GenericDragDropListing
              dragClassName=""
              dropClassName="calendar-view__drop-zone"
              dropZoneProps={{ topicId: topicId }}
              draggedItemProps={{ origin: { topicId: topicId } }}
              itemContainerClassName=""
              itemList={cards}
              itemType={dragItemTypes.CARD}
              renderItem={card => (
                <GenericPlanningCard
                  card={card}
                  key={card.id}
                  topicId={topicId}
                />
              )}
            >
              <DMLoader
                dataRequirements={dataRequirements(this.props)}
                loaderKey="cardsWithAttributes"
              />
            </GenericDragDropListing>
            <AddCardCard
              cardStyle={{
                padding: '0px 8px 6px 8px'
              }}
              cardClassName="planning-card"
              topicId={topicId}
              inInputMode={this.state.inInputMode}
              afterCardCreated={this.afterCardCreated}
              topMenu
              transparent
            />
          </div>
        )}
        <div className="planning-view__content">
          <div
            className={`planning-view__actions p-l-5px p-t-10px ${
              isHome ? 'ml15' : 'ml25'
            }`}
          >
            <div className="planning-view__actions-group">
              <IconButton
                containerClasses="left-section-icon-container"
                wrapperClasses="left-section-icon"
                style={{
                  top: `${getSidePaneArrowTop(this.viewRef).slice(0, -2) -
                    2}px`,
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
                className="wsv planning-view__timeframe"
                columnMode={this.state.columnMode}
                value={this.state.startDate}
                onChange={this.handleTimeframeDateChange}
                board="wsv"
              />
            </div>
            <div className="planning-view__actions-group planning-view__total-log-time">
              Log time {this.state.totalLogTime} hrs
            </div>
            <div className="planning-view__actions-group">
              <TimelineModeSelector
                color={card_font_color}
                className="planning-view__mode-selector"
                value={this.state.columnMode}
                onChange={this.handleTimelineModeChange}
                board="weeklySpreadView"
              />
              <ActiveFiltersPanel />
            </div>
          </div>
          <WeeklySpreadLensGrid
            className="planning-view__timeline"
            columnMode={this.state.columnMode}
            startDate={this.state.startDate}
            topicId={topicId}
            dmLoading={dmLoading}
            filteredCardsArray={filteredCardsArray}
            filteredCards={cards}
          />
        </div>
      </div>
    );
  }
}

const LogTimeSubscriber = ({ cardId }) => {
  useEffect(() => {
    const disposers = subscriptions.logTimeSubscriptions({ tipId: cardId });
    return () => disposers.forEach(d => d.dispose());
  }, [cardId]);
  return null;
};

const hoc = Component => props => {
  const cardIds = props.cards?.map(card => card.id).sort();

  useEffect(() => {
    queries.loadLogTimes(cardIds);
  }, [cardIds.join(',')]);

  return (
    <>
      <Component {...props} />
      {cardIds.map(id => (
        <LogTimeSubscriber key={id} cardId={id} />
      ))}
    </>
  );
};

const dataRequirements = ({ user, cardRequirements }) => ({
  cardsWithAttributes: {
    attributes: {
      ...cardRequirements,
      personId: user && user.id
    }
  }
});

const mapState = state => {
  const sm = stateMappings(state);

  const {
    utilities: { active_design },
    page: { topicId, isHome },
    pinnedTools: { pinnedToolsBarWidth }
  } = sm;

  const ui_settings = getUiSettings(state);
  const leftCardListVisible = ui_settings.left_card_panel;
  return {
    active_design,
    displayLeftSubtopicMenuForTopic: sm.menus.displayLeftSubtopicMenuForTopic,
    displayLeftMenu: sm.menus.displayLeftMenu,
    leftCardListVisible,
    topicId,
    isHome,
    logtimes: state._newReduxTree.database.logtimes,
    pinnedLensesBarVisible: ui_settings.pinned_lenses_bar_visible,
    pinnedToolsBarWidth
  };
};

WeeklySpreadLens.propType = {};

export default withDataManager(
  dataRequirements,
  mapState,
  { prepareLogtimes, setUserUiSettings },
  {
    dontShowLoadingIndicator: true
  }
)(hoc(WeeklySpreadLens));
