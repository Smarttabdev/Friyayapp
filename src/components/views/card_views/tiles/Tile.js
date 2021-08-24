import React from 'react';

const Tile = ({ children, card_font_color }) => {
  return (
    <div
      style={{ borderColor: 'red' || card_font_color }}
      // className="tile-layout"
    >
      {children}
    </div>
  );
};

export default Tile;
