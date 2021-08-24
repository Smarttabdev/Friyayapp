import React, { Fragment } from 'react';
import orderBy from 'lodash/orderBy';

export default {
  cssModifier: 'actual-work',
  display: 'Actual work',
  resizableProps: {
    minWidth: '150'
  },
  render(
    card,
    stateValue = card.attributes.resource_expended,
    onChange,
    onUpdate
  ) {
    const submitActualWork = e => {
      e.preventDefault();
      //blur input and trigger update
      document.activeElement.blur();
    };
    return (
      <form onSubmit={submitActualWork}>
        <input
          className="sheet-view__work-input"
          max="9999"
          min="0"
          placeholder="0"
          type="number"
          value={stateValue || ''}
          onChange={ev => onChange(ev.target.value)}
          onBlur={e =>
            Number(stateValue) !== Number(card.attributes.resource_required) &&
            onUpdate({ attributes: { resource_expended: e.target.value } })
          }
        />
        <span className="sheet-view__input-label">hours</span>
      </form>
    );
  },
  renderSummary(cards) {
    return cards.reduce(
      (sum, card) => sum + (Number(card.attributes.resource_expended) || 0),
      0
    );
  },
  sort(cards, order) {
    return orderBy(
      cards,
      card => Number(card.attributes.resource_expended),
      order
    );
  }
};
