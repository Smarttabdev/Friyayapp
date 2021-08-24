import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { dragItemTypes } from 'Components/shared/drag_and_drop/dragTypeEnum';
import GenericDropZone from 'Src/components/shared/drag_and_drop/GenericDropZone.js';
import CardTitleLink from 'Components/shared/cards/elements/CardTitleLink';
import IconButton from 'Components/shared/buttons/IconButton';
import LabelIndicatorBar from 'Components/shared/labels/elements/LabelIndicatorBar';
import AddCardCard from 'Components/shared/cards/AddCardCard';
import GridCardAttachmentDropOptions from 'Components/lenses/card_lenses/Grid/GridCardAttachmentDropOptions';
import { nestCardUnderCard } from 'Src/newRedux/database/cards/thunks';
import GenericCard from 'Components/lenses/card_lenses/GenericCard';
import GridFooter from 'Components/lenses/card_lenses/Grid/GridFooter';

import Ability from 'lib/ability';
import LikeButton from 'Src/components/shared/cards/elements/LikeButton.js';
import StarButton from 'Src/components/shared/cards/elements/StarButton.js';
import Dropdown from 'Components/shared/Dropdown';
import { setEditCardModalOpen } from 'Src/newRedux/interface/modals/actions';

class SmallGridCard extends GenericCard {
  static propTypes = {
    card: PropTypes.object
  };

  state = {
    isAttachmentHoveringOnCard: false,
    showNestedCards: false,
    showNewCardInput: false,
    card: this.props.card,
    draggedCard: null
  };

  toggleAttachmentHoveringOnCard = status => {
    this.setState(prevState => ({
      ...prevState,
      isAttachmentHoveringOnCard: status
    }));
  };

  handleNewCardInputButtonClick = () => {
    this.setState({
      showNestedCards: true,
      showNewCardInput: !this.state.showNewCardInput
    });
  };

  uploadFile = () => {
    this.props.setEditCardModalOpen({
      cardId: this.props.card?.id,
      tab: 'Edit',
      openFileUploader: true
      // instantUpload: true
    });
  };

  render() {
    const { card, topic, level } = this.props;
    const { isAttachmentHoveringOnCard, showNewCardInput } = this.state;
    const {
      relationships: {
        labels: { data: labels },
        nested_tips: { data: nested_tips }
      }
    } = card;

    const canLike = Ability.can('like', 'self', card);

    return (
      <Fragment>
        <div className="small-grid-card">
          {isAttachmentHoveringOnCard ? (
            <GridCardAttachmentDropOptions
              card={card}
              board="smallgrid-board"
            />
          ) : (
            [
              <GenericDropZone
                dropClassName="small-grid-card-dropzone"
                onDragEnter={() => this.toggleAttachmentHoveringOnCard(true)}
                onDragLeave={() => this.toggleAttachmentHoveringOnCard(false)}
                dropsDisabled
                itemType={dragItemTypes.FILE}
                key="swap-zone"
              >
                <LabelIndicatorBar
                  key="small-grid-card-label"
                  labelIds={card.relationships.labels.data}
                />
                <div className="small-grid-card--like">
                  <StarButton
                    style={{ margin: '0 12px 0 0' }}
                    card={card}
                    additionalClasses="small-grid-card--star-button"
                  />
                  {canLike && (
                    <LikeButton
                      card={card}
                      additionalClasses="small-grid-card--star-button"
                      style={{ margin: '0 6px 0 0' }}
                    />
                  )}
                  <Dropdown
                    closeOnClick={false}
                    menuClassName="small-grid-card-add-items-dropdown"
                    menuStyle={{
                      left: 'unset',
                      right: '0'
                    }}
                    trigger={
                      <IconButton
                        additionalClasses="grey-icon-button"
                        fontSize={16}
                        outlined
                        icon="add_circle"
                        tooltip="Add Card"
                        tooltipOptions={{ place: 'bottom' }}
                      />
                    }
                  >
                    <li
                      className="dark-grey-link"
                      onClick={this.handleNewCardInputButtonClick}
                    >
                      Add a nested Card
                    </li>
                    <li className="dark-grey-link" onClick={this.uploadFile}>
                      Upload a file
                    </li>
                  </Dropdown>
                </div>
              </GenericDropZone>,
              <div
                key={`card_section${card.id} title`}
                className="small-grid-card_section title"
              >
                {!level && (
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
                    <CardTitleLink
                      maxLines={1}
                      size="xl"
                      card={card}
                      truncate
                      style={{ lineHeight: '25px' }}
                      showCardTypeIcon
                    />

                    {/*<div className="nest-zone">
                      <IconButton
                        additionalClasses="smallgrid-card__nested-cards-caret"
                        fontAwesome
                        icon={
                          this.state.showNestedCards
                            ? 'caret-down'
                            : 'caret-left'
                        }
                        onClick={this.handleNestedCardsCaretClick}
                      />
                      </div> */}
                  </GenericDropZone>
                )}
              </div>,
              <div key={`small-grid-addcard-${card.id}`}>
                {showNewCardInput && (
                  <AddCardCard
                    cardStyle={{
                      marginLeft: '10px',
                      marginTop: '10px'
                    }}
                    inInputMode
                    newCardRelationships={{ follows_tip: { data: card.id } }}
                    topicId={topic.id}
                    onDismiss={this.handleNewCardInputButtonClick}
                  />
                )}
              </div>,
              <div className="nested-card-summary" key="nested-card-summary">
                {// show this on hover
                this.state.showNestedCards &&
                  this.state.draggedCard &&
                  `Contains ${nested_tips.length - 1} nested cards`}
                {// show this after card has droppped
                this.state.showNestedCards &&
                  !this.state.draggedCard &&
                  `Contains ${nested_tips.length} nested cards`}
                {// show this on hover
                this.state.draggedCard &&
                  `. Drop here to nest ${this.state.draggedCard.attributes.title}`}
              </div>,
              <GridFooter
                isSmall={true}
                key={card.id}
                item={card}
                labels={labels}
                onAddCard={this.handleNewCardInputButtonClick}
                handleNestedCardsCaretClick={this.handleNestedCardsCaretClick}
                showNestedCards={this.state.showNestedCards}
              />
            ]
          )}
        </div>
      </Fragment>
    );
  }
}

const mapState = state => {
  return state;
};

const mapDispatch = {
  nestCardUnderCard,
  setEditCardModalOpen
};

export default connect(mapState, mapDispatch)(SmallGridCard);
