import React, { Component } from 'react';
import moment from 'moment';
import GenericDragDropListing from 'Components/shared/drag_and_drop/GenericDragDropListing';
import { dragItemTypes } from 'Components/shared/drag_and_drop/dragTypeEnum';
import { updateCard } from 'Src/newRedux/database/cards/thunks';
import ActiveFiltersPanel from 'Components/shared/filters/ActiveFiltersPanel';
import TimelineTimeframeSelector from 'Components/shared/TimelineTimeframeSelector';
import TimelineModeSelector from 'Components/shared/TimelineModeSelector';
import withDataManager from 'Src/dataManager/components/withDataManager';
import LoadingIndicator from 'Components/shared/LoadingIndicator';
import AddCardCard from 'Components/shared/cards/AddCardCard';
import IconButton from 'Components/shared/buttons/IconButton';
import CalendarLensGrid from './CalendarLensGrid';
import { getSidePaneArrowTop, getSidePaneArrowLeft } from 'Src/lib/utilities';
import { stateMappings } from 'Src/newRedux/stateMappings';
import GenericPlanningCard from 'Src/components/shared/cards/GenericPlanningCard';
import { getUiSettings, setUserUiSettings } from 'Src/helpers/user_config';

class CalendarLens extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noDueCards: [],
      dueCards: [],
      columnMode: 'months',
      timeframeDate: moment().startOf('hour'),
      leftCardListVisible: this.props.leftCardListVisible
    };
  }

  viewRef = React.createRef();

  componentDidMount() {
    this.updateCardsState(this.props.cards);
  }

  componentDidUpdate({ cards }) {
    if (JSON.stringify(cards) !== JSON.stringify(this.props.cards)) {
      this.updateCardsState(this.props.cards);
    }
  }

  updateCardsState(cards) {
    let noDueCards = [];
    let dueCards = [];

    cards.forEach(card => {
      const hasNoDates = !!card.attributes.due_date;

      if (hasNoDates) {
        dueCards.push(card);
      } else {
        noDueCards.push(card);
      }
    });
    this.setState({ noDueCards, dueCards });
  }

  toggleleftCardListVisible = () => {
    const { setUserUiSettings } = this.props;
    const { leftCardListVisible } = this.state;
    setUserUiSettings({ left_card_panel: !leftCardListVisible });
    this.setState(state => {
      return { leftCardListVisible: !state.leftCardListVisible };
    });
  };

  handleTimelineModeChange = columnMode => {
    const updates = { columnMode };

    if (columnMode === 'weeks' || columnMode === 'weeksWD') {
      updates.timeframeDate = this.state.timeframeDate.clone().startOf('month');
    }

    this.setState(updates);
  };

  handleTimeframeDateChange = timeframeDate => {
    this.setState({ timeframeDate });
  };

  handleToggleInputMode = () => {
    this.setState(state => ({ inInputMode: !state.inInputMode }));
  };

  render() {
    const {
      cardRequirements,
      topic,
      dmLoading,
      displayLeftSubtopicMenuForTopic,
      displayLeftMenu,
      active_design,
      pinnedLensesBarVisible,
      pinnedToolsBarWidth
    } = this.props;
    const topicId = topic ? topic.id : null;
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
              itemList={this.state.noDueCards || []}
              itemType={dragItemTypes.CARD}
              onDropItem={({ droppedItemProps: { item } }) => {
                if (item) {
                  this.props.updateCard({
                    id: item.id,
                    attributes: { due_date: null, start_date: null },
                    relationships: { tip_assignments: { data: [] } }
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
            >
              {dmLoading && <LoadingIndicator />}
            </GenericDragDropListing>
            <AddCardCard
              cardClassName="planning-card"
              topicId={topicId}
              inInputMode={this.state.inInputMode}
              afterCardCreated={this.afterCardCreated}
              transparent
              topMenu
            />
          </div>
        )}

        <div className="planning-view__content">
          <div className="planning-view__actions p-l-5px p-t-10px">
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
                    (pinnedLensesBarVisible ? pinnedToolsBarWidth : 0) +
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
                className="planning-view__timeframe"
                columnMode={this.state.columnMode}
                value={this.state.timeframeDate}
                onChange={this.handleTimeframeDateChange}
                board="calendar"
                color={card_font_color}
                dropZoneEnabled
              />
            </div>
            <div className="planning-view__actions-group">
              <TimelineModeSelector
                color={card_font_color}
                className="planning-view__mode-selector"
                value={this.state.columnMode}
                onChange={this.handleTimelineModeChange}
                board="calendar"
              />
              <ActiveFiltersPanel additionalContainerClass={'ml10'} />
            </div>
          </div>

          <CalendarLensGrid
            cardRequirements={cardRequirements}
            cards={this.state.dueCards || []}
            className="planning-view__timeline"
            columnMode={this.state.columnMode}
            timeframeDate={this.state.timeframeDate}
            topicId={topicId}
            dmLoading={dmLoading}
          />
        </div>
      </div>
    );
  }
}

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
    pinnedTools: { pinnedToolsBarWidth }
  } = sm;

  const ui_settings = getUiSettings(state);
  const leftCardListVisible = ui_settings.left_card_panel;
  return {
    active_design,
    displayLeftSubtopicMenuForTopic: sm.menus.displayLeftSubtopicMenuForTopic,
    displayLeftMenu: sm.menus.displayLeftMenu,
    leftCardListVisible,
    pinnedLensesBarVisible: ui_settings.pinned_lenses_bar_visible,
    pinnedToolsBarWidth
  };
};

const mapDispatch = {
  updateCard,
  setUserUiSettings
};

export default withDataManager(dataRequirements, mapState, mapDispatch, {
  dontShowLoadingIndicator: true
})(CalendarLens);
