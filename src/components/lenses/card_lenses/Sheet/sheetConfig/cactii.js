import orderBy from 'lodash/orderBy';
import React, { Fragment } from 'react';

const cactus = '🌵';
export default {
  cssModifier: 'cactii',
  display: 'Bonus Points',
  resizableProps: {
    minWidth: '200'
  },
  render(card, stateValue = card.attributes.cactii, onChange, onUpdate) {
    return (
      <Fragment>
        <span className="cactii-icon">
          <img
            src={'/images/bonus-points.png'}
            style={{ maxWidth: '100%', maxHeight: '100%' }}
          />
          {/* {cactus} */}
        </span>
        <input
          value={stateValue || ''}
          className="sheet-view__cactii"
          placeholder="Bonus Points"
          onChange={ev => onChange(ev.target.value)}
          onBlur={({ target: { value } }) =>
            onUpdate({ attributes: { cactii: value } })
          }
        />
      </Fragment>
    );
  },
  renderSummary: cards => {
    const totalBonusPoints = cards.reduce(
      (sum, card) => sum + (Number(card.attributes.cactii) || 0),
      0
    );
    return (
      <div className="cactii-container">
        <span className="cactii-icon">
          <img
            src={'/images/bonus-points.png'}
            style={{ maxWidth: '100%', maxHeight: '100%' }}
          />
        </span>
        <span className="cactii-text">{totalBonusPoints}</span>
      </div>
    );
  },
  sort(cards, order) {
    return orderBy(cards, card => card.attributes.cactii, order);
  }
};
