import React, { Component } from 'react';
import { connect } from 'react-redux';
import Ability from 'Lib/ability';
import { stateMappings } from 'Src/newRedux/stateMappings';
import isUndefined from 'lodash/isUndefined';
import CardDetails from './CardDetails';
import CardCard from './CardCard';
import ActiveFiltersPanel from 'Components/shared/filters/ActiveFiltersPanel';
import IconButton from 'Components/shared/buttons/IconButton';
import { dragItemTypes } from 'Components/shared/drag_and_drop/dragTypeEnum';
import GenericDragDropListing from 'Components/shared/drag_and_drop/GenericDragDropListing';
import DMLoader from 'Src/dataManager/components/DMLoader';
import AddCardCard from 'Components/shared/cards/AddCardCard';
import { moveOrCopyCardInOrToTopicFromDragAndDrop } from 'Src/newRedux/database/cards/abstractions';
import {
  scrollToShow,
  getSidePaneArrowTop,
  getSidePaneArrowLeft
} from 'Src/lib/utilities';
import { getUiSettings, setUserUiSettings } from 'Src/helpers/user_config';
import { failure } from 'Utils/toast';

class CardLens extends Component {
  constructor(props) {
    super(props);
    this.state = {
      autoSaveEditItem: false, //true,
      isEditing: false,
      action: null,
      height: 0,
      cardViewTip: null,
      selectedCardId: null,
      inInputMode: false,
      leftCardListVisible: this.props.leftCardListVisible
    };

    this.viewRef = React.createRef();
  }

  componentDidMount() {
    const {
      props: { cards, leftCardListVisible },
      state: { selectedCardId }
    } = this;
    if (cards && cards.length > 0 && !selectedCardId) {
      this.setState({ selectedCardId: cards[0].id });
    }
    if (!leftCardListVisible) {
      this.toggleleftCardListVisible();
    }
  }

  componentDidUpdate() {
    const { inInputMode, cards } = this.props;
    const defaultCard = cards[0];
    if (!this.state.selectedCardId && defaultCard && defaultCard.id) {
      this.setState({ selectedCardId: defaultCard.id });
    }

    if (!isUndefined(inInputMode) && inInputMode !== this.state.inInputMode) {
      this.setState({ inInputMode });
    }
  }

  handleDropCard = ({ droppedItemProps, dropZoneProps, itemOrder }) => {
    if (Ability.can('update', 'self', droppedItemProps.item)) {
      const {
        addRemoveLabelsOnCard,
        moveOrCopyCardInOrToTopicFromDragAndDrop
      } = this.props;

      if (dropZoneProps.labelId != droppedItemProps.origin.labelId) {
        const newLabel = dropZoneProps.labelId ? [dropZoneProps.labelId] : [];
        const oldLabel = droppedItemProps.origin.labelId
          ? [droppedItemProps.origin.labelId]
          : [];
        addRemoveLabelsOnCard(droppedItemProps.item, newLabel, oldLabel);
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

  /**
   * On editor scrolling event handler.
   *
   * @param {Event} e
   * @param {Node}  toolbarEl
   * @return  {Void}
   */
  handleEditorScroll = (e, toolbarEl) => {
    if (e.currentTarget.scrollTop >= 191) {
      // 191px is when the first line of text gone from viewport while scrolling
      if (toolbarEl && !toolbarEl.classList.contains('fixed')) {
        toolbarEl.classList.add('fixed');
      }
    } else {
      if (toolbarEl && toolbarEl.classList.contains('fixed')) {
        toolbarEl.classList.remove('fixed');
      }
    }
  };

  toggleleftCardListVisible = () => {
    const { setUserUiSettings } = this.props;
    const { leftCardListVisible } = this.state;
    setUserUiSettings({ left_card_panel: !leftCardListVisible });
    this.setState(state => {
      return { leftCardListVisible: !state.leftCardListVisible };
    });
  };

  handleToggleInputMode = () =>
    this.setState(state => ({ inInputMode: !state.inInputMode }));

  afterCardCreated = cardId => {
    const elem = document.querySelector('.card-title.c' + cardId);
    scrollToShow(elem, 14, 24);
  };

  render() {
    const {
      cardRequirements,
      cards,
      topic,
      isHome,
      displayLeftSubtopicMenuForTopic,
      displayLeftMenu,
      active_design,
      pinnedLensesBarVisible,
      pinnedToolsBarWidth
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
        className="card-board"
        style={{
          paddingLeft: isHome
            ? leftCardListVisible
              ? '20px'
              : '5px'
            : leftCardListVisible
            ? '30px'
            : '15px'
        }}
      >
        <div
          className={`card-board-list ${
            leftCardListVisible ? 'presented' : ''
          }`}
        >
          <GenericDragDropListing
            dragClassName="task-view_drag-card"
            dropZoneProps={{ topicId }}
            draggedItemProps={{ origin: { topicId } }}
            itemContainerClassName="task-view_card-container"
            itemList={cards}
            itemType={dragItemTypes.CARD}
            onDropItem={this.handleDropCard}
            renderItem={card => (
              <CardCard
                card={card}
                key={card.id}
                onClick={id => this.setState({ selectedCardId: id })}
                selectedCardId={selectedCardId}
                topicId={topicId}
              />
            )}
          >
            <AddCardCard
              style={{ marginLeft: '5px' }}
              afterCardCreated={cardId =>
                this.setState({ selectedCardId: cardId })
              }
              // cardClassName="kanban-card"
              topicId={topicId}
              inInputMode={this.state.inInputMode}
              transparent
              topMenu
              addCardUIStyle={{ color: card_font_color || undefined }}
            />
            <DMLoader
              dataRequirements={{
                cardsWithAttributes: { attributes: { ...cardRequirements } }
              }}
              loaderKey="cardsWithAttributes"
            />
          </GenericDragDropListing>
        </div>
        <IconButton
          containerClasses="left-section-icon-container"
          wrapperClasses="left-section-icon"
          style={{
            top: `${getSidePaneArrowTop(this.viewRef).slice(0, -2) - 11}px`,
            backgroundColor: '#fafafa',
            left: `${getSidePaneArrowLeft(false) +
              (displayLeftSubtopicMenuForTopic.topicId ? 285 : 0) +
              (displayLeftMenu ? 270 : 0) +
              (pinnedLensesBarVisible ? pinnedToolsBarWidth : 5) +
              8.7}px`
          }}
          fontAwesome
          color={card_font_color}
          icon={`${leftCardListVisible ? 'chevron-left' : 'chevron-right'}`}
          onClick={this.toggleleftCardListVisible}
          tooltip="Hidden Cards"
          tooltipOptions={{ place: 'right' }}
        />
        <div
          className={`card-board-main-section ${
            leftCardListVisible ? 'card-list-shown' : 'card-list-hidden'
          }`}
        >
          <ActiveFiltersPanel additionalContainerClass={'mb10'} />
          <CardDetails
            cardId={selectedCardId}
            onEditorScroll={this.handleEditorScroll}
            rootContainerClass="card-board"
            showMinMax
          />
        </div>
      </div>
    );
  }
}

const mapState = state => {
  const sm = stateMappings(state);
  const {
    menus: { displayLeftMenu },
    utilities: { active_design },
    page: { topicId, isHome },
    pinnedTools: { pinnedToolsBarWidth }
  } = sm;

  const ui_settings = getUiSettings(state);
  const leftCardListVisible = ui_settings.left_card_panel;
  return {
    active_design,
    displayLeftSubtopicMenuForTopic: sm.menus.displayLeftSubtopicMenuForTopic,
    displayLeftMenu: displayLeftMenu,
    topic: sm.topics[topicId],
    topicId,
    isHome,
    currentUser: sm.user,
    isEditing: sm.modals.displayEditCardModal,
    group: Object.values(sm.groups)[0],
    leftCardListVisible,
    pinnedLensesBarVisible: ui_settings.pinned_lenses_bar_visible,
    pinnedToolsBarWidth
  };
};

const mapDispatch = {
  moveOrCopyCardInOrToTopicFromDragAndDrop,
  setUserUiSettings
};

export default connect(mapState, mapDispatch)(CardLens);
