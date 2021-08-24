import React, { Component } from 'react';
import groupBy from 'lodash/groupBy';
import moment from 'moment';
import orderBy from 'lodash/orderBy';
import PropTypes from 'prop-types';
import IconButton from 'Components/shared/buttons/IconButton';
import ActiveFiltersPanel from 'Components/shared/filters/ActiveFiltersPanel';
import GenericDragDropListing from 'Components/shared/drag_and_drop/GenericDragDropListing';
import LoadingIndicator from 'Components/shared/LoadingIndicator';
import StatusTableGrid from './StatusTableGrid';
import TimelineModeSelector from 'Components/shared/TimelineModeSelector';
import TimelineTimeframeSelector from 'Components/shared/TimelineTimeframeSelector';
import UserAssignedSelect from 'Components/shared/users/elements/UserAssignedSelect';
import UsersAssignedRecently from 'Components/shared/users/elements/UsersAssignedRecently';
import withDataManager from 'Src/dataManager/components/withDataManager';
import { dragItemTypes } from 'Components/shared/drag_and_drop/dragTypeEnum';
import { moveOrCopyCardInOrToTopicFromDragAndDrop } from 'Src/newRedux/database/cards/abstractions';
import { updateCard } from 'Src/newRedux/database/cards/thunks';
import { setEditCardModalOpen } from 'Src/newRedux/interface/modals/actions';
import AddCardCard from 'Components/shared/cards/AddCardCard';
import {
  scrollToShow,
  getSidePaneArrowTop,
  getSidePaneArrowLeft
} from 'Src/lib/utilities';
import { stateMappings } from 'Src/newRedux/stateMappings';
import GenericPlanningCard from 'Src/components/shared/cards/GenericPlanningCard';
import { getUiSettings, setUserUiSettings } from 'Src/helpers/user_config';

class StatusTableLens extends Component {
  static propTypes = {
    cards: PropTypes.array,
    topicId: PropTypes.any,
    updateCard: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      columnMode: 'weeks',
      groupedCards: {},
      noDueCards: [],
      timeframeDate: moment(),
      inInputMode: false,
      leftCardListVisible: this.props.leftCardListVisible
    };
    this.viewRef = React.createRef();
  }

  componentDidMount() {
    this.updateCardsState(this.props.cards);
  }

  componentDidUpdate = prevProps => {
    if (prevProps.cards !== this.props.cards) {
      this.updateCardsState(this.props.cards);
    }
  };

  handleTimelineModeChange = mode => {
    this.setState({ columnMode: mode });
  };

  handleTimeframeDateChange = date => {
    this.setState({ timeframeDate: date });
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
      const hasNoDates =
        !card.attributes.due_date &&
        !card.attributes.start_date &&
        !card.attributes.completion_date &&
        !card.attributes.completed_percentage;

      if (hasNoDates) {
        noDueCards.push(card);
      } else {
        const data = card.relationships.tip_assignments.data;
        data.length == 0 || data[0] == null
          ? sortedCards.push({ ...card, person: 'unassigned' })
          : data.forEach(item => sortedCards.push({ ...card, person: item }));
      }
    });

    sortedCards = orderBy(sortedCards, ({ attributes }) => [
      moment(attributes.start_date).valueOf(),
      moment(attributes.due_date).valueOf()
    ]);

    const groupedCards = groupBy(sortedCards, ({ person: data }) => data);

    this.setState({ noDueCards, groupedCards });
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

  render() {
    const {
      cardRequirements,
      topic,
      dmLoading,
      displayLeftSubtopicMenuForTopic,
      pinnedLensesBarVisible,
      pinnedToolsBarWidth,
      displayLeftMenu
    } = this.props;
    const topicId = topic ? topic.id : null;
    const { leftCardListVisible } = this.state;

    return (
      <div ref={this.viewRef} className="planning-board height-100pc">
        {leftCardListVisible && (
          <div className="planning-view__no-due-panel">
            <GenericDragDropListing
              dragClassName=""
              dropClassName="planning-view__drop-zone"
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
              {dmLoading && <LoadingIndicator className="height-auto" />}
              <AddCardCard
                cardClassName="planning-card"
                topicId={topicId}
                inInputMode={this.state.inInputMode}
                afterCardCreated={this.afterCardCreated}
                transparent
              />
            </GenericDragDropListing>
          </div>
        )}
        <div className="planning-view__content">
          {this.state.showAssignPanel && (
            <div className="planning-view__assign-panel">
              <UserAssignedSelect className="planning-view__assign-select" />
              <UsersAssignedRecently className="planning-view__assign-recent" />
            </div>
          )}
          <div className="planning-view__actions">
            <div className="planning-view__actions-group">
              <IconButton
                containerClasses="left-section-icon-container"
                wrapperClasses="left-section-icon"
                style={{
                  top: `${getSidePaneArrowTop(this.viewRef).slice(0, -2) -
                    7}px`,
                  backgroundColor: '#fafafa',
                  left: `${getSidePaneArrowLeft(false) +
                    (displayLeftSubtopicMenuForTopic.topicId ? 285 : 0) +
                    (displayLeftMenu ? 270 : 0) +
                    (pinnedLensesBarVisible ? pinnedToolsBarWidth : 5) +
                    8.7}px`
                }}
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
              />
            </div>
            <div className="planning-view__actions-group">
              <TimelineModeSelector
                className="planning-view__mode-selector"
                value={this.state.columnMode}
                onChange={this.handleTimelineModeChange}
                board="status_table"
              />
              <ActiveFiltersPanel />
            </div>
          </div>
          <StatusTableGrid
            cardRequirements={cardRequirements}
            cards={this.state.groupedCards}
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
  const {
    menus,
    page: { topicId },
    pinnedTools: { pinnedToolsBarWidth }
  } = stateMappings(state);

  const ui_settings = getUiSettings(state);
  const leftCardListVisible = ui_settings.left_card_panel;
  return {
    displayLeftMenu: menus.displayLeftMenu,
    displayLeftSubtopicMenuForTopic: menus.displayLeftSubtopicMenuForTopic,
    leftCardListVisible,
    topicId,
    pinnedLensesBarVisible: ui_settings.pinned_lenses_bar_visible,
    pinnedToolsBarWidth
  };
};

const mapDispatch = {
  moveOrCopyCardInOrToTopicFromDragAndDrop,
  setEditCardModalOpen,
  updateCard,
  setUserUiSettings
};

export default withDataManager(dataRequirements, mapState, mapDispatch, {
  dontShowLoadingIndicator: true
})(StatusTableLens);
