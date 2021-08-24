import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import { object } from 'prop-types';

import { failure } from 'Utils/toast';
import { stateMappings } from 'newRedux/stateMappings';
import AssignedLane from './AssignedLane';
import GenericDragDropListing from '../../../shared/drag_and_drop/GenericDragDropListing';
import { dragItemTypes } from 'Components/shared/drag_and_drop/dragTypeEnum';
import ViewTopBar from 'Components/shared/assemblies/ViewTopBar';
import { addRemoveAssignedUsersOnCard } from 'Src/newRedux/database/cards/thunks';
import { moveOrCopyCardInOrToTopicFromDragAndDrop } from 'Src/newRedux/database/cards/abstractions';
import UserAvatar from 'Components/shared/users/elements/UserAvatar';
import GenericPlanningCard from 'Src/components/shared/cards/GenericPlanningCard';
import IconButton from 'Components/shared/buttons/IconButton';
import AddCardCard from 'Components/shared/cards/AddCardCard';
import Ability from 'Lib/ability';
import DMLoader from 'Src/dataManager/components/DMLoader';
import {
  scrollToShow,
  getSidePaneArrowTop,
  getSidePaneArrowLeft
} from 'Src/lib/utilities';
import {
  getUiSettings,
  setUserUiSettings,
  getCustomLensId
} from 'Src/helpers/user_config';
import AlphaFilter from 'Src/components/shared/AlphaFilter';
import { getRelevantViewForPage } from 'Src/newRedux/interface/lenses/selectors';

const AssignedLaneDragPreview = ({ person }) => (
  <div className="assigned-lane_drag-preview">
    <UserAvatar user={person} showName />
  </div>
);

class AssignedLens extends PureComponent {
  state = {
    currentFilter: '',
    newLane: null,
    inInputMode: false,
    leftCardListVisible: this.props.leftCardListVisible
  };

  viewRef = React.createRef();

  static propTypes = {
    topic: object
  };

  toggleleftCardListVisible = () => {
    const { setUserUiSettings } = this.props;
    const { leftCardListVisible } = this.state;
    setUserUiSettings({ left_card_panel: !leftCardListVisible });
    this.setState(state => {
      return { leftCardListVisible: !state.leftCardListVisible };
    });
  };

  handleApplyFilter = filterLetter => {
    this.setState({ currentFilter: filterLetter });
  };

  updatePeopleOrder = order => {
    const { activePeopleOrderQuery, topicId, lenseId, lenseKey } = this.props;
    mutations.createOrUpdateCustomOrder({
      customOrder: activePeopleOrderQuery?.activePeopleOrder,
      orderTitle: 'People',
      orderType: 'people',
      topicId,
      lenseId,
      lenseKey,
      order
    });
  };

  handleChangePersonForLane = (prevPerson, newPersonId) => {
    const { peopleOrderPeopleIds } = this.props;
    const revisedPeopleOrderPeopleIds = peopleOrderPeopleIds.filter(
      id => id != newPersonId
    ); //map is temp solution as server returning ints

    prevPerson
      ? revisedPeopleOrderPeopleIds.splice(
          revisedPeopleOrderPeopleIds.indexOf(prevPerson.id),
          1,
          newPersonId
        )
      : revisedPeopleOrderPeopleIds.push(newPersonId);

    this.updatePeopleOrder(revisedPeopleOrderPeopleIds);
    this.setState({ newLane: newPersonId });
  };

  handleDropCard = ({ droppedItemProps, dropZoneProps, itemOrder }) => {
    const {
      addRemoveAssignedUsersOnCard,
      moveOrCopyCardInOrToTopicFromDragAndDrop,
      shiftKeyDown
    } = this.props;

    if (Ability.can('update', 'self', droppedItemProps.item)) {
      if (droppedItemProps.origin.personId != dropZoneProps.personId) {
        const addUsers = [dropZoneProps.personId];
        const removeUsers = !shiftKeyDown
          ? [droppedItemProps.origin.personId]
          : undefined;

        addRemoveAssignedUsersOnCard(
          droppedItemProps.item,
          addUsers,
          removeUsers
        );
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
    this.updatePeopleOrder(itemOrder.map(label => label.id));
  };

  handleRemoveLane = personId => {
    const { peopleOrderPeopleIds } = this.props;
    const order = peopleOrderPeopleIds.filter(id => id != personId);
    this.updatePeopleOrder(order);
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
      topic,
      peopleOrderPeople,
      cards,
      displayLeftSubtopicMenuForTopic,
      inInputMode,
      displayLeftMenu,
      active_design,
      pinnedLensesBarVisible,
      pinnedToolsBarWidth,
      isHome
    } = this.props;
    const { currentFilter, newLane, leftCardListVisible } = this.state;
    const topicId = topic ? topic.id : null;
    const {
      card_font_color,
      card_background_color,
      card_background_color_display
    } = active_design || {};
    const filteredPeopleOrderPeople = currentFilter
      ? peopleOrderPeople.filter(
          person =>
            person.attributes.name &&
            person.attributes.name.charAt(0).toUpperCase() == currentFilter
        )
      : peopleOrderPeople;

    const unassignedCards = cards.filter(
      card =>
        card.relationships.tip_assignments.data.length == 0 ||
        card.relationships.tip_assignments.data[0] == null
    );

    return (
      <div
        ref={this.viewRef}
        className="kanban-board"
        style={{ paddingLeft: isHome ? '30px' : '40px' }}
      >
        <aside
          className={`left-list kanban-view_unlabelled-panel ${
            leftCardListVisible ? 'presented' : ''
          }`}
        >
          {leftCardListVisible && (
            <Fragment>
              <GenericDragDropListing
                dropClassName="kanban-view_lane-catchment"
                dragClassName="task-view_drag-card"
                dropZoneProps={{ personId: null, topicId: topicId }}
                draggedItemProps={{
                  origin: { personId: null, topicId: topicId }
                }}
                itemContainerClassName=""
                itemList={unassignedCards}
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

        <div className="kanban-view_main-section assigned-view_main-section">
          <div className="kanban-view_top-bar">
            <IconButton
              containerClasses="left-section-icon-container"
              wrapperClasses="left-section-icon"
              color={card_font_color}
              style={{
                top: `${getSidePaneArrowTop(this.viewRef).slice(0, -2) - 8}px`,
                backgroundColor: '#fafafa',
                left: `${getSidePaneArrowLeft(false) +
                  (displayLeftSubtopicMenuForTopic.topicId ? 285 : 0) +
                  (displayLeftMenu ? 270 : 0) +
                  (pinnedLensesBarVisible ? pinnedToolsBarWidth : 5) +
                  8.7}px`
              }}
              fontAwesome
              icon={`${leftCardListVisible ? 'chevron-left' : 'chevron-right'}`}
              onClick={this.toggleleftCardListVisible}
              tooltip="Hidden Cards"
              tooltipOptions={{ place: 'right' }}
            />
            <ViewTopBar showAddCardButton={false} showFilters topic={topic} />
            <ViewTopBar
              className="assignee-board-top-bar"
              showAddCardButton={false}
              showFilters={false}
              topic={topic}
            >
              <AlphaFilter
                // color={card_font_color}
                currentFilter={currentFilter}
                onClick={this.handleApplyFilter}
              />
            </ViewTopBar>
          </div>

          <div className="kanban-view_lanes-container pl5">
            <GenericDragDropListing
              dropClassName="kanban-view_lanes"
              dragClassName="kanban-lane_drag-container"
              dragPreview={person => (
                <AssignedLaneDragPreview person={person} />
              )}
              dropZoneProps={{ topicId: topicId }}
              draggedItemProps={{ origin: { topicId: topicId } }}
              itemContainerClassName="kanban-lane_drag-container"
              itemList={filteredPeopleOrderPeople}
              itemType={dragItemTypes.PERSON}
              keyExtractor={person => person.id}
              onDropItem={this.handleDropLane}
              renderItem={person => (
                <AssignedLane
                  cardRequirements={cardRequirements}
                  cards={cards}
                  key={person.id}
                  newLane={newLane}
                  onChangePersonForLane={this.handleChangePersonForLane}
                  onDropCard={this.handleDropCard}
                  onRemoveLane={this.handleRemoveLane}
                  person={person}
                  topicId={topicId}
                />
              )}
            />

            <AssignedLane
              cards={[]}
              person={null}
              onChangePersonForLane={this.handleChangePersonForLane}
              topicId={topicId}
            />
          </div>
        </div>
      </div>
    );
  }
}

const hoc = Component => props => {
  const selectedPeopleOrder =
    props.activePeopleOrderQuery?.activePeopleOrder?.order || [];

  const peopleOrderPeopleIds = selectedPeopleOrder
    ? selectedPeopleOrder.filter(userId => !!props.people[userId])
    : [];

  return (
    <Component
      {...props}
      peopleOrderPeopleIds={peopleOrderPeopleIds}
      peopleOrderPeople={peopleOrderPeopleIds.map(id => props.people[id])}
    />
  );
};

const mapState = state => {
  const sm = stateMappings(state);
  const {
    utilities: { active_design },
    page: { topicId, isHome },
    pinnedTools: { pinnedToolsBarWidth }
  } = sm;

  const ui_settings = getUiSettings(state);
  const lenseId = getCustomLensId(state);
  const lenseKey = getRelevantViewForPage(state);
  const leftCardListVisible = ui_settings.left_card_panel;
  return {
    topicId,
    lenseId,
    lenseKey,
    active_design,
    isHome,
    displayLeftSubtopicMenuForTopic: sm.menus.displayLeftSubtopicMenuForTopic,
    displayLeftMenu: sm.menus.displayLeftMenu,
    confirmedNewOrChangeOrderIds:
      sm.session.peopleOrdersUserHasConfirmedNewOrChangeOrder,
    people: sm.people,
    shiftKeyDown: sm.utilities.shiftKeyDown,
    informedNoSelectedOrder:
      sm.session.topicsUserHasBeenInformedNoSelectedPeopleOrder,
    leftCardListVisible,
    pinnedLensesBarVisible: ui_settings.pinned_lenses_bar_visible,
    pinnedToolsBarWidth
  };
};

const mapDispatch = {
  addRemoveAssignedUsersOnCard,
  moveOrCopyCardInOrToTopicFromDragAndDrop,
  setUserUiSettings
};

const FragmentContainer = createFragmentContainer(hoc(AssignedLens), {
  activePeopleOrderQuery: graphql`
    fragment AssignedLens_activePeopleOrderQuery on Query
      @argumentDefinitions(
        topicId: { type: ID }
        lenseId: { type: ID }
        lenseKey: { type: String }
      ) {
      activePeopleOrder: activeCustomOrder(
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
  `
});

export default connect(
  mapState,
  mapDispatch
)(
  QueryRenderer(
    props => <FragmentContainer {...props} activePeopleOrderQuery={props} />,
    {
      query: graphql`
        query AssignedLensQuery(
          $topicId: ID!
          $lenseId: ID
          $lenseKey: String
        ) {
          ...AssignedLens_activePeopleOrderQuery
            @arguments(
              topicId: $topicId
              lenseId: $lenseId
              lenseKey: $lenseKey
            )
        }
      `,
      vars: ({ topicId, lenseId, lenseKey }) => ({
        topicId: toGid('Topic', topicId || 0),
        lenseId: toGid('Lens', lenseId),
        lenseKey
      })
    }
  )
);
