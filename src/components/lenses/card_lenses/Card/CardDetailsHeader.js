import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withLastLocation } from 'react-router-last-location';
import Ability from 'Lib/ability';
import { removeCard, viewCard } from 'Src/newRedux/database/cards/thunks';
import { addCardToDock } from 'Src/newRedux/interface/dock/thunks';
import IconButton from 'Components/shared/buttons/IconButton';
import CardActionsDropdown from 'Components/shared/cards/elements/CardActionsDropdown';
import { GreyDots } from 'Src/components/shared/Dots';

class CardDetailsHeader extends PureComponent {
  handlePrintClick = () => window.print();

  render() {
    const {
      cardFontColor,
      addCardToDock,
      card,
      inEditMode = false,
      onEditClick,
      onSaveClick,
      removeCard,
      showMinMax,
      viewCard,
      lastLocation,
      showIcons,
      handleShowHide,
      showDots,
      onAddCard,
      hideTitle
    } = this.props;

    if (!inEditMode && !showDots) {
      return null;
    }

    return (
      <div className="card-details-header">
        <div
          className={`card-details-header_buttons-container ${showDots &&
            'dots-layer-container'}`}
        >
          {/* {showDots && <GreyDots />} */}
          {inEditMode && Ability.can('update', 'self', card) && (
            // hideTitle &&
            <IconButton
              additionalClasses="canvas-save-button medium yellow-hover-link"
              style={{ color: cardFontColor || '#56CCF2' }}
              icon="save"
              onClick={onSaveClick}
              outlined
            />
          )}
          {showMinMax && (
            <Fragment>
              <IconButton
                additionalClasses="medium yellow-hover-link"
                style={{ color: cardFontColor }}
                fontAwesome
                icon="minus"
                onClick={() => addCardToDock(card.id)}
              />
              <IconButton
                additionalClasses="medium yellow-hover-link"
                style={{ color: cardFontColor }}
                icon="launch"
                onClick={() => viewCard({ cardSlug: card.attributes.slug })}
              />
            </Fragment>
          )}
          {/* {!inEditMode && Ability.can('update', 'self', card) && (
            <IconButton
              additionalClasses="medium yellow-hover-link"
              style={{ color: cardFontColor }}
              icon="edit"
              onClick={onEditClick}
            />
          )} */}
          {/* {Ability.can('destroy', 'self', card) && (
            <IconButton
              additionalIconClasses="medium grey-link"
              icon="delete"
              onClick={() => removeCard(card.id, lastLocation)}
            />
          )} */}
          {/* {hideTitle && ( */}
          <CardActionsDropdown
            card={card}
            style={{ color: cardFontColor }}
            onAddCard={onAddCard}
            additionalClasses="medium yellow-hover-link card-option-action-dropdown"
          >
            <a className="dropdown-option-item" onClick={this.handlePrintClick}>
              Print
            </a>
            <a className="dropdown-option-item" onClick={handleShowHide}>
              {showIcons ? 'Hide Icons' : 'Show Icons'}
            </a>
          </CardActionsDropdown>
          {/* )} */}
        </div>
      </div>
    );
  }
}

const mapDispatch = {
  addCardToDock,
  removeCard,
  viewCard
};

CardDetailsHeader.propTypes = {
  cardFontColor: PropTypes.string
};

export default connect(null, mapDispatch)(withLastLocation(CardDetailsHeader));
