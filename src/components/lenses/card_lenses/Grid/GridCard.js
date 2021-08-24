import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import GenericDropZone from 'Src/components/shared/drag_and_drop/GenericDropZone.js';
import { dragItemTypes } from 'Components/shared/drag_and_drop/dragTypeEnum';
import AddCardCard from 'Components/shared/cards/AddCardCard';
import CardTitleLink from 'Components/shared/cards/elements/CardTitleLink';
import LabelIndicatorBar from 'Components/shared/labels/elements/LabelIndicatorBar';
import IconButton from 'Components/shared/buttons/IconButton';
import ItemLabelsListing from 'Src/components/shared/items_container/grid_item/labels/item_labels_listing.js';
import ItemLabelsForm from 'Src/components/shared/items_container/grid_item/labels/item_label_form.js';
import GridBody from './GridBody';
import GridFooter from './GridFooter';
import { SCREEN } from 'Enums';
import { viewCard, updateCard } from 'Src/newRedux/database/cards/thunks';
import { stateMappings } from 'Src/newRedux/stateMappings';
import GridCardAttachmentDropOptions from './GridCardAttachmentDropOptions';
import GenericCard from 'Components/lenses/card_lenses/GenericCard';
import Ability from 'lib/ability';
import LikeButton from 'Src/components/shared/cards/elements/LikeButton.js';
import StarButton from 'Src/components/shared/cards/elements/StarButton.js';
import Dropdown from 'Components/shared/Dropdown';
import { setEditCardModalOpen } from 'Src/newRedux/interface/modals/actions';

class GridCard extends GenericCard {
  state = {
    data: null,
    screen: SCREEN.ITEM,
    showNestedCards: false,
    isAttachmentHoveringOnCard: false,
    showNewCardInput: false
  };

  switchScreen = (screen, data = null) => {
    this.setState({ screen, data });
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
    const { allCardsHash, card, topic: { id: topicId } = {} } = this.props;
    const {
      data,
      screen,
      showNestedCards,
      isAttachmentHoveringOnCard,
      showNewCardInput
    } = this.state;
    const {
      relationships: {
        labels: { data: labels },
        nested_tips
      }
    } = card;

    const canLike = Ability.can('like', 'self', card);

    let cardContent = null;
    switch (screen) {
      case SCREEN.LABEL_LISTING:
        cardContent = (
          <ItemLabelsListing item={card} switchScreen={this.switchScreen} />
        );
        break;
      case SCREEN.LABEL_FORM:
        cardContent = (
          <ItemLabelsForm
            item={card}
            switchScreen={this.switchScreen}
            label={data}
          />
        );
        break;
      default:
        cardContent = (
          <div>
            <LabelIndicatorBar labelIds={card.relationships.labels.data} />
            <div className="grid-card--like">
              <StarButton
                card={card}
                additionalClasses="grid-card--star-button"
                style={{ margin: '0 16px 0 0' }}
              />
              {canLike && (
                <LikeButton
                  card={card}
                  additionalClasses="grid-card--star-button"
                  style={{ margin: '0 8px 0 0' }}
                />
              )}
              <Dropdown
                closeOnClick={false}
                menuClassName="grid-card-add-items-dropdown"
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
            <div
              className="grid-card_section grid-card_section--cardTitle"
              style={{ marginLeft: '-5px' }}
            >
              {/*<GenericDropZone
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
                    additionalClasses="grid-card__nested-cards-caret dark-grey-icon-button"
                    fontAwesome
                    icon={
                      this.state.showNestedCards ? 'caret-down' : 'caret-left'
                    }
                    onClick={this.handleNestedCardsCaretClick} #6fcf97
                  />
                  </div>
              </GenericDropZone> */}

              <CardTitleLink size="xl" card={card} showCardTypeIcon />
            </div>
            <GenericDropZone
              dropClassName="grid-card_section mt8"
              onDragEnter={() => this.toggleAttachmentHoveringOnCard(true)}
              onDragLeave={() => this.toggleAttachmentHoveringOnCard(false)}
              dropsDisabled
              itemType={dragItemTypes.FILE}
            >
              {isAttachmentHoveringOnCard ? (
                <GridCardAttachmentDropOptions card={card} />
              ) : (
                <GridBody item={card} />
              )}
            </GenericDropZone>
            {showNestedCards && (
              <div className="grid-card__nested-cards">
                {nested_tips.data
                  .filter(id => !!allCardsHash[id])
                  .map(id => (
                    <CardTitleLink
                      additionalClasses="grid-card__nested-card"
                      key={id}
                      card={allCardsHash[id]}
                    />
                  ))}
                <AddCardCard
                  cardClassName="grid-card__add-card"
                  newCardRelationships={{ follows_tip: { data: card.id } }}
                  topicId={topicId}
                  board="grid-new"
                  inInputMode={showNewCardInput}
                  defaultIconColor
                  topMenu
                />
              </div>
            )}
            <GridFooter
              updateCard={this.props.updateCard}
              item={card}
              labels={labels}
              switchScreen={this.switchScreen}
              onAddCard={this.handleNewCardInputButtonClick}
              handleNestedCardsCaretClick={this.handleNestedCardsCaretClick}
              showNestedCards={this.state.showNestedCards}
            />
          </div>
        );
        break;
    }

    return <div className="grid-card">{cardContent}</div>;
  }
}

function mapState(state) {
  const sm = stateMappings(state);

  return { allCardsHash: sm.cards };
}

const mapDispatch = { viewCard, updateCard, setEditCardModalOpen };

export default connect(mapState, mapDispatch)(withRouter(GridCard));
