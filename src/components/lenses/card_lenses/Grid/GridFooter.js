import React, { Fragment } from 'react';
import moment from 'moment';
import Ability from 'lib/ability';
import tiphive from 'lib/tiphive';
import CommentButton from 'Src/components/shared/cards/elements/CommentButton.js';
import UserAvatar from 'Src/components/shared/users/elements/UserAvatar.js';
// import ItemContentLabels from 'Src/components/pages/item_page/item_content_labels.js';
import CardWorkEstimationLabel from 'Src/components/shared/cards/elements/CardWorkEstimationLabel.js';
import CardDueDateLabel from 'Src/components/shared/cards/elements/CardDueDateLabel.js';
import CardLabels from 'Components/shared/cards/elements/assemblies/CardLabels';
import { SCREEN } from 'Enums';
import { PulseComponent } from 'Src/components/lenses/card_lenses/Sheet/sheetConfig/pulse';
import CardActionsDropdown from 'Components/shared/cards/elements/CardActionsDropdown';
import CardTopicLink from 'Components/shared/cards/elements/CardTopicLink';
import IconButton from 'Components/shared/buttons/IconButton';
import './GridFooter.scss';

export default function GridFooter({
  item,
  labels,
  switchScreen,
  updateCard,
  isSmall,
  onAddCard,
  handleNestedCardsCaretClick,
  showNestedCards
}) {
  const canComment = Ability.can('comment', 'self', item);
  const canLike = Ability.can('like', 'self', item);
  const handleValueUpdate = updates => {
    updateCard({ id: item.id, ...updates });
  };

  const footerItemClassName = isSmall
    ? 'footer-row__item mr6'
    : 'footer-row__item mr8';
  return (
    <div className="grid-footer-wrapper">
      <div style={{ justifyContent: 'space-between' }} className="footer-row">
        <span className="date-string">
          {moment(item.attributes.updated_at).format('DD MMM YY')}
        </span>
        <CardTopicLink card={item} fullPath color="#d9d9d9" />
      </div>
      <div className="footer-row">
        <UserAvatar user={item.attributes.creator} showTooltip />
        {canComment && isSmall ? (
          <div className={footerItemClassName}>
            <CommentButton card={item} />
          </div>
        ) : null}

        <div className={footerItemClassName}>
          <PulseComponent
            style={{ marginRight: '8px' }}
            additionalClasses="grey-icon-button"
            size="small"
            card={item}
            handleValueUpdate={handleValueUpdate}
          />
        </div>

        <div className={footerItemClassName}>
          <CardActionsDropdown
            card={item}
            onAddCard={onAddCard}
            icon="more_horiz"
            additionalClasses="grey-icon-button"
          />
        </div>
        <IconButton
          additionalClasses="grey-icon-button"
          style={{ marginRight: '0px' }}
          color={showNestedCards ? '#f2ab13' : ''}
          fontSize={16}
          outlined
          icon="list_alt"
          onClick={handleNestedCardsCaretClick}
        />
        <div style={{ marginRight: 'auto' }}>
          <CardLabels card={item} expandDirection="up" />
        </div>
      </div>
    </div>
  );
}

//  {
//    item.attributes.due_date && (
//      <CardDueDateLabel
//        card={item}
//        className="timeline-card__plan-label"
//        showTooltip
//        iconSize={'fa-sm'}
//      />
//    );
//  }
//  {
//    item.attributes.resource_required && (
//      <CardWorkEstimationLabel
//        card={item}
//        className="timeline-card__plan-label"
//        showTooltip
//        iconSize={'fa-sm'}
//      />
//    );
//  }

//  {
//    !!switchScreen && !tiphive.userIsGuest() && (
//      <a
//        className="btn-label light-gray mr8 mt3"
//        onClick={() => {
//          switchScreen(SCREEN.LABEL_LISTING);
//        }}
//      >
//        <i className="fa fa-tag fa-sm" />
//      </a>
//    );
//  }
