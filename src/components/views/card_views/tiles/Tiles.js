import React from 'react';
import Tile from 'src/components/views/card_views/tiles/Tile';
import {
  dragItemTypes,
  GenericDragDropListing
} from 'Components/shared/drag_and_drop/_index';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';

const Tiles = ({
  items,
  renderItem,
  onDropItem,
  itemType,
  dropZoneProps,
  card_font_color
}) => {
  return (
    <div style={{ borderColor: card_font_color }} className="tile-layout">
      <GenericDragDropListing
        itemList={items}
        dropClassName={''}
        dropZoneProps={dropZoneProps}
        itemType={itemType}
        onDropItem={onDropItem}
        renderItem={item => <Tile> {renderItem(item)}</Tile>}
      />
    </div>
  );
};

const mapState = state => {
  const {
    utilities: { active_design }
  } = stateMappings(state);
  return {
    card_font_color: active_design.card_font_color || '#E2E2E2'
  };
};

export default connect(mapState)(Tiles);
