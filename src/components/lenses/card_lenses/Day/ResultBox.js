import React, { useState } from 'react';
import Icon from 'Components/shared/Icon';
import CardTitleLink from 'Components/shared/cards/elements/CardTitleLink';

const ResultBox = ({ item, cards }) => {
  const [showCards, setShowCards] = useState();

  const count = cards.length;

  const handleClick = () => cards.length > 0 && setShowCards(!showCards);

  return (
    <div
      className="result_box"
      style={{
        backgroundColor: item.color,
        cursor: cards.length > 0 ? 'pointer' : 'default'
      }}
      onClick={handleClick}
    >
      <div className="result_box__content">
        <div className="count">{count}</div>
        <div className="type">
          {count == 1 ? item.type.singular : item.type.plural}
        </div>
      </div>
      {showCards && (
        <div
          className="result_box__cards-list"
          onClick={e => e.stopPropagation()}
        >
          {cards.map(card => (
            <div key={card.id} className="result_box__cards-list-item">
              <Icon
                icon="featured_play_list"
                color="#56CCF2"
                containerClasses="mr13"
              />
              <CardTitleLink card={card} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResultBox;
