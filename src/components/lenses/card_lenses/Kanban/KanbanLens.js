import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import { array, func, object } from 'prop-types';
import get from 'lodash/get';
import set from 'lodash/set';
import { createSelector } from 'reselect';
import Ability from 'Lib/ability';
import { failure } from 'Utils/toast';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { dragItemTypes } from 'Components/shared/drag_and_drop/dragTypeEnum';
import ActiveFiltersPanel from 'Components/shared/filters/ActiveFiltersPanel';
import { getSelectedLabelOrder } from 'Src/newRedux/database/labelOrders/selectors';
import {
  addLabelOrderIdToLabelOrderNewOrChangeConfirmed,
  addTopicIdToNoSelectedLabelOrderInformed
} from 'Src/newRedux/session/actions';
import { addRemoveLabelsOnCard } from 'Src/newRedux/database/cards/thunks';
import { moveOrCopyCardInOrToTopicFromDragAndDrop } from 'Src/newRedux/database/cards/abstractions';
import { createLabelOrder } from 'Src/newRedux/database/labelOrders/thunks';
import { updateOrCreateLabelOrder } from 'Src/newRedux/database/labelOrders/abstractions';
import { setRightMenuOpenForMenu } from 'Src/newRedux/interface/menus/actions';
import DMLoader from 'Src/dataManager/components/DMLoader';
import GenericDragDropListing from 'Components/shared/drag_and_drop/GenericDragDropListing';
import IconButton from 'Components/shared/buttons/IconButton';
import KanbanLane from './KanbanLane';
import GenericPlanningCard from 'Src/components/shared/cards/GenericPlanningCard';
import LabelIndicatorBar from 'Components/shared/labels/elements/LabelIndicatorBar';
import AddCardCard from 'Components/shared/cards/AddCardCard';
import {
  scrollToShow,
  getSidePaneArrowTop,
  getSidePaneArrowLeft
} from 'Src/lib/utilities';
import { getUiSettings, setUserUiSettings } from 'Src/helpers/user_config';

const KanbanLaneDragPreview = ({ label }) => (
  <div className="kanban-lane_drag-preview">
    <LabelIndicatorBar labels={[label]} />
    <div className="kanban-lane_drag-preview-title">
      {label.attributes.name}
    </div>
  </div>
);

class KanbanLens extends PureComponent {
  static propTypes = {
    createLabelOrder: func.isRequired,
    addRemoveLabelsOnCard: func.isRequired,
    group: object,
    labelOrderLabelIds: array.isRequired,
    laneMap: object.isRequired,
    topic: object
  };
  viewRef = React.createRef();

  state = {
    newLane: null,
    inInputMode: false,
    leftCardListVisible: this.props.leftCardListVisible
  };

  componentDidUpdate() {
    const {
      selectedLabelOrder,
      topic,
      informedNoSelectedOrder = [],
      topicDefaultLabelOrderId
    } = this.props;
    if (!selectedLabelOrder && !topicDefaultLabelOrderId) {
      if (
        topic &&
        topic.relationships &&
        !informedNoSelectedOrder.includes(topic.id)
      ) {
        this.handleNoLabelOrderSelected();
      }
    }
  }

  handleChangeLabelForLane = (prevLabel, newLabelId) => {
    const { labelOrderLabelIds, updateOrCreateLabelOrder } = this.props;
    const revisedLabelOrderLabelIds = labelOrderLabelIds.filter(
      id => id != newLabelId
    ); //map is temp solution as server returning ints

    prevLabel
      ? revisedLabelOrderLabelIds.splice(
          revisedLabelOrderLabelIds.indexOf(prevLabel.id),
          1,
          newLabelId
        )
      : revisedLabelOrderLabelIds.push(newLabelId);

    updateOrCreateLabelOrder(revisedLabelOrderLabelIds);

    this.setState({ newLane: newLabelId });
  };

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

  handleDropLane = ({ itemOrder }) => {
    const { updateOrCreateLabelOrder } = this.props;
    updateOrCreateLabelOrder(itemOrder.map(label => label.id));
  };

  handleNoLabelOrderSelected = () => {
    const {
      addTopicIdToNoSelectedLabelOrderInformed,
      setRightMenuOpenForMenu,
      topic
    } = this.props;
    addTopicIdToNoSelectedLabelOrderInformed(topic ? topic.id : '0');
    // setRightMenuOpenForMenu('Orders_Labels');
    // Popup to be removed
    // topic &&
    //   vex.dialog.alert({
    //     message:
    //       'There is no default label order for this board.  You can select a label order in the Label Orders menu on the right'
    //   });
  };

  toggleleftCardListVisible = () => {
    const { setUserUiSettings, topicId } = this.props;
    const { leftCardListVisible } = this.state;
    setUserUiSettings({ left_card_panel: !leftCardListVisible });
    this.setState(state => {
      return { leftCardListVisible: !state.leftCardListVisible };
    });
  };

  handleRemoveLane = labelId => {
    const { labelOrderLabelIds, updateOrCreateLabelOrder } = this.props;
    const order = labelOrderLabelIds.filter(id => id != labelId);
    updateOrCreateLabelOrder(order);
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
      cardRequirements,
      laneMap,
      labelOrderLabels,
      topic,
      isHome,
      displayLeftSubtopicMenuForTopic,
      displayLeftMenu,
      active_design,
      pinnedLensesBarVisible,
      pinnedToolsBarWidth
    } = this.props;
    const { newLane, inInputMode, leftCardListVisible } = this.state;
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
        style={{ paddingLeft: isHome ? '35px' : '45px' }}
      >
        <IconButton
          containerClasses="left-section-icon-container"
          wrapperClasses="left-section-icon"
          style={{
            top: `${getSidePaneArrowTop(this.viewRef).slice(0, -2) - 15}px`,
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
                dropZoneProps={{ labelId: null, topicId: topicId }}
                draggedItemProps={{
                  origin: { labelId: null, topicId: topicId }
                }}
                itemContainerClassName=""
                itemList={laneMap['unlabelled'] || []}
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
                  cardClassName="kanban-card"
                  topicId={topicId}
                  inInputMode={inInputMode}
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
        <div className={'kanban-view_main-section'}>
          <ActiveFiltersPanel additionalContainerClass={'mb10'} />
          <div className="kanban-view_lanes-container">
            <GenericDragDropListing
              dropClassName="kanban-view_lanes"
              dragClassName="kanban-lane_drag-container"
              dragPreview={label => <KanbanLaneDragPreview label={label} />}
              dropZoneProps={{ topicId: topicId }}
              draggedItemProps={{ origin: { topicId: topicId } }}
              itemContainerClassName="kanban-lane_drag-container"
              itemList={labelOrderLabels}
              itemType={dragItemTypes.LABEL}
              keyExtractor={label => label.id}
              onDropItem={this.handleDropLane}
              renderItem={label => (
                <KanbanLane
                  cardRequirements={cardRequirements}
                  cards={laneMap[label.id] || []}
                  label={label}
                  labelId={label.id}
                  newLane={newLane}
                  onChangeLabelForLane={this.handleChangeLabelForLane}
                  onDropCard={this.handleDropCard}
                  onRemoveLane={this.handleRemoveLane}
                  topicId={topicId}
                />
              )}
            />
            <KanbanLane
              cards={[]}
              labelId={null}
              label={undefined}
              onChangeLabelForLane={this.handleChangeLabelForLane}
              topicId={topicId}
            />
          </div>
        </div>
      </div>
    );
  }
}

//A selector that maps cards to labels:
const mapCardsToKanbanLanes = createSelector(
  ({ cards }) => cards,
  ({ labelOrderLabelIds }) => labelOrderLabelIds,
  (cards, labelOrderLabelIds) =>
    cards.reduce((a, b) => {
      const firstMatchingLabelId = labelOrderLabelIds.find(labelId =>
        b.relationships.labels.data.includes(labelId)
      );
      const key = firstMatchingLabelId ? firstMatchingLabelId : 'unlabelled';
      set(a, key, [...get(a, key, []), b]);
      return a;
    }, {})
);

const mapState = (state, props) => {
  const sm = stateMappings(state);
  const {
    page: { topicId, isHome },
    topics,
    utilities: { active_design },
    pinnedTools: { pinnedToolsBarWidth }
  } = sm;
  const selectedLabelOrder = getSelectedLabelOrder(state);
  const labelOrderLabelIds = selectedLabelOrder
    ? selectedLabelOrder.attributes.order.filter(
        labelId => !!sm.labels[labelId]
      )
    : [];
  const topic = topicId && topics[topicId];

  const ui_settings = getUiSettings(state);
  const leftCardListVisible = ui_settings.left_card_panel;
  return {
    active_design,
    confirmedNewOrChangeOrderIds:
      sm.session.labelOrdersUserHasConfirmedNewOrChangeOrder,
    labels: sm.labels,
    labelOrderLabelIds: labelOrderLabelIds,
    labelOrderLabels: labelOrderLabelIds.map(id => sm.labels[id]),
    laneMap: mapCardsToKanbanLanes({
      state,
      cards: props.cards,
      labelOrderLabelIds
    }),
    displayLeftSubtopicMenuForTopic: sm.menus.displayLeftSubtopicMenuForTopic,
    displayLeftMenu: sm.menus.displayLeftMenu,
    selectedLabelOrder: selectedLabelOrder,
    informedNoSelectedOrder:
      sm.session.topicsUserHasBeenInformedNoSelectedLabelOrder,
    topicDefaultLabelOrderId: topic
      ? get(topic, 'relationships.label_order.data')
      : null,
    leftCardListVisible,
    topicId,
    isHome,
    pinnedLensesBarVisible: ui_settings.pinned_lenses_bar_visible,
    pinnedToolsBarWidth
  };
};

const mapDispatch = {
  addLabelOrderIdToLabelOrderNewOrChangeConfirmed,
  addRemoveLabelsOnCard,
  addTopicIdToNoSelectedLabelOrderInformed,
  createLabelOrder,
  moveOrCopyCardInOrToTopicFromDragAndDrop,
  setRightMenuOpenForMenu,
  updateOrCreateLabelOrder,
  setUserUiSettings
};

export default connect(mapState, mapDispatch)(KanbanLens);
