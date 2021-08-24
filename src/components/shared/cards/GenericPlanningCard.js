import classNames from 'classnames';
import Icon from 'Components/shared/Icon';
import React, { Fragment } from 'react';
import { array, func, number, object, string } from 'prop-types';
import { connect } from 'react-redux';
import CardProgressIndicator from 'Components/shared/cards/elements/CardProgressIndicator';
import AddCardCard from 'Components/shared/cards/AddCardCard';
import CardTitleLink from 'Components/shared/cards/elements/CardTitleLink';
import CardActionsDropdown from 'Components/shared/cards/elements/CardActionsDropdown';
import IconButton from 'Components/shared/buttons/IconButton';
import UserAvatar from 'Components/shared/users/elements/UserAvatar';
import {
  dragItemTypes,
  GenericDragDropListing
} from 'Components/shared/drag_and_drop/_index';
import GenericDropZone from 'Src/components/shared/drag_and_drop/GenericDropZone.js';
import {
  nestCardUnderCard as nestCardUnderCardAction,
  updateCard
} from 'Src/newRedux/database/cards/thunks';
import { stateMappings } from 'Src/newRedux/stateMappings';
import GenericCard from 'Components/lenses/card_lenses/GenericCard';
import { statusColor } from 'Src/components/lenses/card_lenses/Sheet/sheetConfig/status';
import { PulseComponent } from 'Src/components/lenses/card_lenses/Sheet/sheetConfig/pulse';
import CardLabels from 'Components/shared/cards/elements/assemblies/CardLabels';
import { setEditCardModalOpen } from 'Src/newRedux/interface/modals/actions';
import SideLabelDropdown from 'Src/components/shared/SideLabelDropdown';

class GenericPlanningCard extends GenericCard {
  static defaultProps = { dragLeaveHandlersForParentLists: [], level: 0 };

  static propTypes = {
    allCardsHash: object.isRequired,
    card: object.isRequired,
    dragLeaveHandlersForParentLists: array,
    level: number,
    nestCardUnderCard: func.isRequired,
    topicId: string
  };

  constructor(props) {
    super(props);
    // this.labelDropdownRef = React.createRef();
    this.state = {
      showNestedCards: false,
      showNewCardInput: false,
      showLabelDropdown: false
    };
  }

  handleDropCard = ({ droppedItemProps, dropZoneProps, itemOrder }) => {
    this.props.nestCardUnderCard({
      nestedCard: droppedItemProps.item,
      parentCard: this.props.allCardsHash[dropZoneProps.cardId],
      fromTopicId: droppedItemProps.origin.topicId,
      toTopicId: dropZoneProps.topicId,
      itemOrder
    });
  };

  handleNewCardInputButtonClick = () => {
    this.setState({
      showNestedCards: true,
      showNewCardInput: !this.state.showNewCardInput
    });
  };

  handleValueUpdate = updates => {
    this.props.updateCard({ id: this.props.card.id, ...updates });
  };

  // componentDidUpdate(prevProps) {
  //   if (this.state.showLabelDropdown) {
  //     const dropdown = this.labelDropdownRef.current;
  //     this.hideViewDropdownOnClickOut(dropdown);
  //   }
  // }

  // isVisible = elem => {
  //   !!elem &&
  //     !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
  // };

  // hideViewDropdownOnClickOut = element => {
  //   const outsideClickListener = event => {
  //     if (!element.contains(event.target) || this.isVisible(element)) {
  //       this.setState({ showLabelDropdown: false, labelSelected: [] });
  //       removeClickListener();
  //     }
  //   };
  //   const removeClickListener = () => {
  //     document.removeEventListener('click', outsideClickListener);
  //   };
  //   document.addEventListener('click', outsideClickListener);
  // };

  handleShowLabelDropdown = () => {
    const { card } = this.props;
    this.setState(prevState => {
      return {
        showLabelDropdown: !prevState.showLabelDropdown
      };
    });
  };

  handleMouseEnter = () => {
    clearTimeout(this.leaveTimer);
    this.setState({ isHover: true });
  };

  handleMouseLeave = () => {
    this.leaveTimer = setTimeout(() => {
      this.setState({ isHover: false });
    }, 1000);
  };

  render() {
    const {
      allCardsHash,
      card: {
        id: cardId,
        relationships: {
          nested_tips,
          tip_assignments: { data },
          topics: {
            data: [defaultTopicId]
          }
        }
      },
      card,
      dragLeaveHandlersForParentLists,
      level,
      topicId,
      handleSelectLabels
    } = this.props;

    const { showLabelDropdown, isHover } = this.state;

    const className = classNames('kanban-card', {
      'show-caret': !this.state.showNestedCards
    });

    const levelMargin = level * 20;
    const nestedCards = nested_tips.data
      .map(nestedCardId => allCardsHash[nestedCardId])
      .filter(nestedCard => !!nestedCard);

    const noLabel = card.relationships.labels.data.length === 0 ? true : false;

    return (
      <Fragment>
        <div
          className={className}
          style={{
            marginLeft: `${levelMargin}px`,
            width: `calc(100% - ${levelMargin}px`
          }}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          <div className="kanban-card_title-section">
            <div className="kanban-card__title-wrapper">
              <GenericDropZone
                dropClassName="nest-card-zone"
                onDragStart={e => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDragEnter={attrs => this.showAsNestable(attrs)}
                onDragLeave={attrs => this.dontShowAsNestable(attrs)}
                itemType={dragItemTypes.CARD}
                onDrop={this.handleNestCard}
                key="nest-zone"
              >
                <div className="nest-zone">
                  <IconButton
                    additionalClasses="kanban-card__nested-cards-caret dark-grey-icon-button"
                    fontAwesome
                    icon={
                      this.state.showNestedCards ? 'caret-down' : 'caret-right'
                    }
                    onClick={this.handleNestedCardsCaretClick}
                  />
                </div>
              </GenericDropZone>
              <CardTitleLink card={card} showCardTypeIcon />
              <IconButton
                additionalClasses="kanban-card__nested-cards-add"
                icon="add"
                onClick={this.handleNewCardInputButtonClick}
              />
            </div>
            <CardActionsDropdown
              card={card}
              onAddCard={this.handleNewCardInputButtonClick}
            />
          </div>
          <div
            className="kanban-card_hover-section"
            style={showLabelDropdown ? { height: '80px' } : null}
          >
            {(isHover || showLabelDropdown) && (
              <Fragment>
                <CardProgressIndicator card={card} />
                <div
                  className="kanban-card_avatar-container"
                  style={data.length === 0 ? { fontSize: '12px' } : null}
                >
                  {data.length > 0
                    ? data.map(userId => (
                        <UserAvatar
                          key={userId}
                          userId={userId}
                          extraClass="flex-r-center-center"
                          size={24}
                        />
                      ))
                    : 'Unassigned'}
                  {noLabel ? (
                    <span
                      className="card-labels cl_pointer"
                      //onClick={this.handleSelectLabels}
                      onClick={this.handleShowLabelDropdown}
                    >
                      No label
                    </span>
                  ) : (
                    <CardLabels
                      card={card}
                      expandDirection="down"
                      onLabelClick={this.handleShowLabelDropdown}
                    />
                  )}
                </div>
                <div className="flexCenter">
                  <Icon icon="access_time" color={statusColor(card)} />
                  <PulseComponent
                    style={{ color: '#b3b3b3', marginLeft: '10px' }}
                    size="medium"
                    isFixed={true}
                    card={card}
                    handleValueUpdate={this.handleValueUpdate}
                  />
                </div>
              </Fragment>
            )}
          </div>
        </div>
        {this.state.showNestedCards && (
          <GenericDragDropListing
            dragClassName="task-view_drag-card"
            draggedItemProps={{ origin: { topicId, cardId } }}
            dropZoneProps={{ topicId, cardId }}
            itemList={nestedCards}
            itemType={dragItemTypes.CARD}
            onDropItem={this.handleDropCard}
            parentListDragLeaveHandlers={dragLeaveHandlersForParentLists}
            renderItem={(nestedCard, dragHandlers) => (
              <ConnectedGenericPlanningCard
                card={nestedCard}
                dragLeaveHandlersForParentLists={dragHandlers}
                key={nestedCard.id}
                level={level + 1}
                topicId={topicId || defaultTopicId}
              />
            )}
          >
            {this.state.showNewCardInput && (
              <AddCardCard
                cardStyle={{
                  marginBottom: '10px',
                  marginLeft: `${levelMargin + 20}px`
                }}
                inInputMode
                newCardRelationships={{ follows_tip: { data: card.id } }}
                topicId={topicId}
                onDismiss={this.handleNewCardInputButtonClick}
                transparent
                topMenu
              />
            )}
          </GenericDragDropListing>
        )}
        {showLabelDropdown && (
          // <div ref={this.labelDropdownRef}>
          <SideLabelDropdown
            card={card}
            cardLabelsData={card.relationships.labels.data}
            onClose={() =>
              this.setState({ showLabelDropdown: false, labelSelected: [] })
            }
          />
          // </div>
        )}
      </Fragment>
    );
  }
}

function mapState(state) {
  const sm = stateMappings(state);

  return { allCardsHash: sm.cards };
}

const mapDispatch = {
  nestCardUnderCard: nestCardUnderCardAction,
  updateCard,
  setEditCardModalOpen
};

const ConnectedGenericPlanningCard = connect(
  mapState,
  mapDispatch
)(GenericPlanningCard);

export default ConnectedGenericPlanningCard;
