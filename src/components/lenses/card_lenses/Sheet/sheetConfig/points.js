import orderBy from 'lodash/orderBy';
import React from 'react';

export default {
  cssModifier: 'points',
  display: 'Points',
  resizableProps: {
    minWidth: '150'
  },
  render(card, stateValue = card.attributes.points, onChange, onUpdate) {
    return (
      <input
        value={stateValue || ''}
        className="sheet-view__points"
        placeholder="Points"
        onChange={ev => onChange(ev.target.value)}
        onBlur={({ target: { value } }) =>
          onUpdate({ attributes: { points: value } })
        }
      />
    );
  },
  renderSummary: cards => {
    const totalPoints = cards.reduce(
      (sum, card) => sum + (Number(card.attributes.points) || 0),
      0
    );
    return <span className={'cactii-text'}>{totalPoints}</span>;
  },
  sort(cards, order) {
    return orderBy(cards, card => card.attributes.points, order);
  }
};
