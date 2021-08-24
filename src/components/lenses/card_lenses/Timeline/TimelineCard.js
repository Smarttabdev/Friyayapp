import classNames from 'classnames';
import moment from 'moment';
import React, { Component, Fragment } from 'react';
import get from 'lodash/get';
import { any, bool, func, number, object, string } from 'prop-types';
import { connect } from 'react-redux';

import AddCardCard from 'Components/shared/cards/AddCardCard';
import CardActionsDropdown from 'Components/shared/cards/elements/CardActionsDropdown';
import CardAssigneeLabel from 'Components/shared/cards/elements/CardAssigneeLabel';
import CardDueDateLabel from 'Components/shared/cards/elements/CardDueDateLabel';
import CardTitleLink from 'Components/shared/cards/elements/CardTitleLink';
import CardWorkEstimationLabel from 'Components/shared/cards/elements/CardWorkEstimationLabel';
import CompletionSlider from 'Components/shared/CompletionSlider';
import GenericDragContainer from 'Components/shared/drag_and_drop/GenericDragContainer';
import GenericDropZone from 'Components/shared/drag_and_drop/GenericDropZone';
import IconButton from 'Components/shared/buttons/IconButton';
import UserAvatar from 'Components/shared/users/elements/UserAvatar';
import { dragItemTypes } from 'Components/shared/drag_and_drop/dragTypeEnum';
import { stateMappings } from 'Src/newRedux/stateMappings';
import GenericCard from 'Components/lenses/card_lenses/GenericCard';
import {
  nestCardUnderCard as nestCardUnderCardAction,
  updateCard
} from 'Src/newRedux/database/cards/thunks';
import { PulseComponent } from 'Src/components/lenses/card_lenses/Sheet/sheetConfig/pulse';

class TimelineCard extends GenericCard {
  static defaultProps = { level: 0, style: { marginLeft: '0px' } };

  static propTypes = {
    allCardsHash: object.isRequired,
    card: object,
    className: string,
    compactView: bool,
    level: number,
    style: any,
    topicId: any,
    onDropOverCard: func
  };

  state = {
    showNestedCards: !!get(
      this.props.card,
      'relationships.nested_tips.data.length'
    ),
    showNewCardInput: false,
    overflowHidden: false
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

  togglePulseOverflow = () => {
    this.setState(prevState => {
      return { overflowHidden: !prevState.overflowHidden };
    });
  };

  getCardSettings = (card, columns = []) => {
    const startDate = moment(
      card.attributes.start_date || card.attributes.due_date
    );
    const dueDate = moment(card.attributes.due_date);
    const firstColumn =
      columns.findIndex(col => startDate.isSameOrBefore(col.range[1])) + 1 || 1;
    const lastColumn =
      columns.findIndex(col => dueDate.isSameOrBefore(col.range[1])) + 1 ||
      columns.length;

    return {
      left: firstColumn - 1,
      right: columns.length - lastColumn,
      width: lastColumn - firstColumn + 1
    };
  };

  render() {
    const { card, columnWidth, column } = this.props;
    const {
      attributes,
      relationships: {
        nested_tips,
        topics: {
          data: [defaultTopicId]
        }
      },
      topicId
    } = card;
    const cardType = card.type;
    const settings = this.getCardSettings(card, column);
    const style = {
      flexBasis: `${settings.width * columnWidth}%`,
      marginRight: `${settings.right * columnWidth}%`,
      marginLeft: `${settings.left * columnWidth}%`
    };
    const controlClassNames = classNames(
      this.props.className,
      'timeline-card',
      {
        'timeline-card--compact': this.props.compactView,
        'show-caret': !this.state.showNestedCards
      }
    );
    const levelMargin = this.props.level * 20;

    const { overflowHidden } = this.state;

    return (
      <Fragment>
        <div
          className={controlClassNames}
          style={{
            ...style,
            marginLeft: `calc(${style.marginLeft} + ${levelMargin}px)`
          }}
        >
          <GenericDropZone
            dropClassName="timeline-card__wrapper"
            itemType={dragItemTypes.CARD}
            onDrop={this.props.onDropOverCard}
          >
            {!this.props.compactView && (
              <GenericDragContainer
                dragClassName="timeline-card__border"
                draggedItemProps={{
                  dragType: 'start',
                  origin: { topicId: topicId }
                }}
                dragPreview={
                  <div className="timeline-card-date-drag timeline-card-date-drag--start">
                    Change start date
                  </div>
                }
                item={this.props.card}
                itemType={dragItemTypes.CARD}
                onDropElsewhere={() => {}}
              />
            )}
            <GenericDragContainer
              dragClassName="timeline-card__content"
              draggedItemProps={{ type: 'card', origin: { topicId: topicId } }}
              dragPreview={
                <ConnectedTimelineCard
                  card={this.props.card}
                  className="timeline-card-drag-preview"
                  compactView
                />
              }
              item={this.props.card}
              itemType={dragItemTypes.CARD}
              onDropElsewhere={() => {}}
            >
              <div className="timeline-card__main" style={{ marginTop: '5px' }}>
                <div className="timeline-card__title-wrapper">
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
                    style={{ padding: 0, height: 'initial', margin: 0 }}
                  >
                    <div className="nest-zone">
                      <IconButton
                        // additionalClasses="timeline-card__nested-cards-caret dark-grey-icon-button"
                        fontAwesome
                        icon={
                          this.state.showNestedCards
                            ? 'caret-down'
                            : 'caret-right'
                        }
                        onClick={this.handleNestedCardsCaretClick}
                        containerStyle={{
                          width: 'initial',
                          marginRight: '5px'
                        }}
                        center={false}
                        color="#a2a2a2"
                      />
                    </div>
                  </GenericDropZone>
                  <CardTitleLink card={card} showCardTypeIcon />
                  <IconButton
                    additionalClasses="timeline-card__nested-cards-add"
                    icon="add"
                    onClick={this.handleNewCardInputButtonClick}
                  />
                  <CardActionsDropdown
                    card={this.props.card}
                    onAddCard={this.handleNewCardInputButtonClick}
                  />
                </div>
              </div>
              {!this.props.compactView && (
                <div
                  className="timeline-card__extra isCollapsed"
                  style={
                    overflowHidden
                      ? { overflowY: 'visible', height: '5rem' }
                      : null
                  }
                >
                  <CompletionSlider
                    className="timeline-card__completion"
                    card={this.props.card}
                    tinyView
                  />
                  {attributes.creator && (
                    <UserAvatar size={24} user={attributes.creator} />
                  )}
                  <CardAssigneeLabel
                    card={this.props.card}
                    className="timeline-card__plan-label"
                    showTooltip
                  />
                  <CardWorkEstimationLabel
                    card={this.props.card}
                    className="timeline-card__plan-label"
                    showTooltip
                  />
                  <CardDueDateLabel
                    card={this.props.card}
                    className="timeline-card__plan-label"
                    showTooltip
                  />
                  <PulseComponent
                    style={{ color: '#b3b3b3', marginTop: '15px' }}
                    size={'medium'}
                    handleValueUpdate={this.handleValueUpdate}
                    card={card}
                    handleClickPulse={this.togglePulseOverflow}
                    isFixed={true}
                  />
                </div>
              )}
            </GenericDragContainer>
            {!this.props.compactView && (
              <GenericDragContainer
                dragClassName="timeline-card__border"
                draggedItemProps={{
                  dragType: 'due',
                  origin: { topicId: topicId }
                }}
                dragPreview={
                  <div className="timeline-card-date-drag timeline-card-date-drag--due">
                    Change due date
                  </div>
                }
                item={this.props.card}
                itemType={dragItemTypes.CARD}
                onDropElsewhere={() => {}}
              />
            )}
          </GenericDropZone>
          {this.state.showNewCardInput && (
            <AddCardCard
              inInputMode
              newCardRelationships={{
                follows_tip: { data: this.props.card.id }
              }}
              topicId={this.props.topicId}
              onDismiss={this.handleNewCardInputButtonClick}
              transparent
              topMenu
            />
          )}
        </div>
        {this.state.showNestedCards &&
          nested_tips.data
            .filter(id => !!this.props.allCardsHash[id])
            .map(id => (
              <ConnectedTimelineCard
                card={this.props.allCardsHash[id]}
                className={this.props.className}
                key={id}
                level={this.props.level + 1}
                parentCardType={cardType}
                style={this.props.style}
                topicId={this.props.topicId || defaultTopicId}
                onDropOverCard={this.props.onDropOverCard}
              />
            ))}
      </Fragment>
    );
  }
}

function mapState(state) {
  const sm = stateMappings(state);

  return { allCardsHash: sm.cards };
}

const mapDispatch = { nestCardUnderCard: nestCardUnderCardAction, updateCard };

const ConnectedTimelineCard = connect(mapState, mapDispatch)(TimelineCard);

export default ConnectedTimelineCard;
