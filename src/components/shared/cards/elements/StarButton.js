import React from 'react';
import { connect } from 'react-redux';
import { bool, func, object } from 'prop-types';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { toggleStarCard } from 'Src/newRedux/database/cards/thunks';

const grey = '#e1e1e1';
const orange = '#f2ab13';

const StarButton = ({
  additionalClasses,
  card,
  starred,
  toggleStarCard,
  color,
  style
}) => {
  const handleClick = e => {
    e.preventDefault();
    toggleStarCard(card);
  };

  const iconColour = starred ? orange : color ? color : grey;
  return (
    <a style={style} className="card-action-button" onClick={handleClick}>
      <i
        className={`${additionalClasses}  fa fa-star fa-lg`}
        style={{ color: iconColour }}
      />
    </a>
  );
};

StarButton.propTypes = {
  card: object.isRequired,
  starred: bool,
  toggleStarCard: func.isRequired
};

const mapState = (state, props) => {
  const sm = stateMappings(state);
  const cardId = props.cardId || props.card.id;
  return {
    starred:
      sm.cards[cardId] && sm.cards[cardId].attributes.starred_by_current_user
  };
};

const mapDispatch = {
  toggleStarCard
};

export default connect(mapState, mapDispatch)(StarButton);
