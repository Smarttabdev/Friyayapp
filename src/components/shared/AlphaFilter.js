import React from 'react';
import IconButton from 'Components/shared/buttons/IconButton';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';

const alphabet = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];

const AlphaFilter = ({ currentFilter, onClick, card_font_color }) => (
  <div className="alpha_filter">
    <IconButton
      additionalIconClasses={`grey-link ${!currentFilter && 'active'}`}
      fontAwesome
      icon="globe"
      color={card_font_color}
      onClick={() => onClick()}
    />
    {alphabet.map(letter => (
      <a
        className={`dark-grey-link w400 ${currentFilter == letter && 'active'}`}
        onClick={() => onClick(letter)}
        key={letter}
      >
        {letter}
      </a>
    ))}
  </div>
);

const mapState = state => {
  const {
    utilities: {
      active_design: { card_font_color }
    }
  } = stateMappings(state);

  return {
    card_font_color
  };
};

export default connect(mapState)(AlphaFilter);
