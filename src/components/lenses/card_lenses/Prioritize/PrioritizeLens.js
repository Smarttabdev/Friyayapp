import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import get from 'lodash/get';
import set from 'lodash/set';
import { failure } from 'Utils/toast';
import PrioritizeContentVert from './PrioritizeContentVert';
import PrioritizeContentHori from './PrioritizeContentHori';
import PrioritizeContentHoriCard from './PrioritizeContentHoriCard';
import AddCardCard from 'Src/components/shared/cards/AddCardCard';
import GenericDragDropListing from 'Components/shared/drag_and_drop/GenericDragDropListing';
import { dragItemTypes } from 'Components/shared/drag_and_drop/dragTypeEnum';
import DMLoader from 'Src/dataManager/components/DMLoader';
import { updateCard } from 'Src/newRedux/database/cards/thunks';
import { moveOrCopyCardInOrToTopicFromDragAndDrop } from 'Src/newRedux/database/cards/abstractions';
import Ability from 'Lib/ability';
import { PRIORITY_LEVELS } from 'Src/constants';
import { stateMappings } from 'Src/newRedux/stateMappings';
import {
  scrollToShow,
  getSidePaneArrowTop,
  getSidePaneArrowLeft
} from 'Src/lib/utilities';
import GenericPlanningCard from 'Src/components/shared/cards/GenericPlanningCard';
import { getUiSettings, setUserUiSettings } from 'Src/helpers/user_config';

const ContentComponent = props => {
  switch (props.tool) {
    case 'Vertical':
      return <PrioritizeContentVert {...props} />;
    case 'Horizontal':
      return <PrioritizeContentHori {...props} />;
    case 'HorizontalCardDetails':
      return <PrioritizeContentHoriCard {...props} />;
    default:
      return <div />;
  }
};

class PrioritizeLens extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCardId: null,
      inInputMode: false,
      leftCardListVisible: this.props.leftCardListVisible
    };
    this.viewRef = React.createRef();

    this.setSelected = this.setSelected.bind(this);
  }

  componentDidMount() {
    const {
      props: { cards },
      state: { selectedCardId }
    } = this;
    if (cards && cards.length > 0 && !selectedCardId) {
      this.setState({ selectedCardId: cards[0].id });
    }
  }

  componentDidUpdate = () => {
    const cardIds = this.props.cards.map(card => card.id);
    if (cardIds.length > 0 && !cardIds.includes(this.state.selectedCardId)) {
      this.setSelected(cardIds[0]);
    }
  };

  handleDropCard = ({ droppedItemProps, dropZoneProps, itemOrder }) => {
    if (Ability.can('update', 'self', droppedItemProps.item)) {
      const {
        updateCard,
        moveOrCopyCardInOrToTopicFromDragAndDrop
      } = this.props;

      if (dropZoneProps.priority != droppedItemProps.origin.priority) {
        const attributes = { priority_level: dropZoneProps.priority };
        updateCard({ id: droppedItemProps.item.id, attributes });
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

  setSelected = selectedCardId => this.setState({ selectedCardId });

  toggleleftCardListVisible = () => {
    const { setUserUiSettings } = this.props;
    const { leftCardListVisible } = this.state;
    setUserUiSettings({ left_card_panel: !leftCardListVisible });
    this.setState(state => {
      return { leftCardListVisible: !state.leftCardListVisible };
    });
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
    const {
      topic,
      cardRequirements,
      laneMap,
      displayLeftSubtopicMenuForTopic,
      priorityView,
      isHome,
      active_design,
      pinnedLensesBarVisible,
      pinnedToolsBarWidth,
      displayLeftMenu
    } = this.props;
    const { selectedCardId, leftCardListVisible } = this.state;
    const topicId = topic ? topic.id : null;
    const {
      card_font_color,
      card_background_color,
      card_background_color_display
    } = active_design || {};

    return (
      <div
        ref={this.viewRef}
        className="kanban-board"
        style={{ paddingLeft: isHome ? '25px' : '35px' }}
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
                dropZoneProps={{ priority: null, topicId: topicId }}
                draggedItemProps={{
                  origin: { priority: null, topicId: topicId }
                }}
                itemContainerClassName="task-view_card-container"
                itemList={laneMap['Unprioritized'] || []}
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
                  cardStyle={{
                    padding: '0px 6px 6px 6px'
                  }}
                  cardClassName="prioritize-card"
                  topicId={topicId}
                  inInputMode={this.state.inInputMode}
                  afterCardCreated={this.afterCardCreated}
                  topMenu
                  transparent
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
        <ContentComponent
          top={getSidePaneArrowTop(this.viewRef)}
          left={`${getSidePaneArrowLeft(false) +
            (displayLeftSubtopicMenuForTopic.topicId ? 285 : 0) +
            (displayLeftMenu ? 270 : 0) +
            (pinnedLensesBarVisible ? pinnedToolsBarWidth : 5) +
            8.7}px`}
          background={card_background_color_display && card_background_color}
          color={card_font_color}
          tool={priorityView}
          cardRequirements={cardRequirements}
          priorityLevels={PRIORITY_LEVELS}
          topicId={topicId}
          onDropCard={this.handleDropCard}
          laneMap={laneMap}
          selectCard={this.setSelected}
          selectedCardId={selectedCardId}
          displayLeftCardPanel={leftCardListVisible}
          toggleLeftCardPanel={this.toggleleftCardListVisible}
          isHome={isHome}
        />
      </div>
    );
  }
}

const mapCardsToLanes = createSelector(
  ({ cards }) => cards,
  cards =>
    cards.reduce((a, b) => {
      const cardPriority = b.attributes.priority_level;
      const key = cardPriority ? cardPriority : 'Unprioritized';
      set(a, key, [...get(a, key, []), b]);
      return a;
    }, {})
);

const mapState = (state, props) => {
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
    isHome,
    priorityView: sm.utilities.priorityView,
    displayLeftSubtopicMenuForTopic: sm.menus.displayLeftSubtopicMenuForTopic,
    displayLeftMenu: sm.menus.displayLeftMenu,
    laneMap: mapCardsToLanes({ state, cards: props.cards }),
    leftCardListVisible,
    topicId,
    pinnedLensesBarVisible: ui_settings.pinned_lenses_bar_visible,
    pinnedToolsBarWidth
  };
};

const mapDispatch = {
  moveOrCopyCardInOrToTopicFromDragAndDrop,
  updateCard,
  setUserUiSettings
};

export default connect(mapState, mapDispatch)(PrioritizeLens);
