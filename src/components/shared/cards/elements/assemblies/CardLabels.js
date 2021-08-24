import React from 'react';
import CardLabel from 'Components/shared/cards/elements/CardLabel';

const CardLabels = ({ card, expandDirection, onLabelClick, disableRemove }) => {
  const labelIds = card.labels
    ? card.labels.map(l => toId(l.id))
    : card.relationships?.labels?.data || [];
  return (
    <div className={`card-labels ${labelIds.length === 0 ? 'disappear' : ''}`}>
      <div className={`card-label-container ${expandDirection || 'up'}`}>
        {labelIds.map(labelId => (
          <CardLabel
            key={`card-label-${labelId}`}
            labelId={labelId}
            card={card}
            onLabelClick={onLabelClick}
            disableRemove={disableRemove}
          />
        ))}
      </div>
      <span className="card-label-count">
        {labelIds.length > 0 && labelIds.length}{' '}
      </span>
    </div>
  );
};

export default CardLabels;
