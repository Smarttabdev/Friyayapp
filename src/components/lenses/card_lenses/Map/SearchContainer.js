import React, { useState } from 'react';
import LocationPicker from 'Components/shared/LocationPicker';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { connect } from 'react-redux';
import CardItem from './CardItem';

const SearchContainer = props => {
  const {
    cardResults,
    handleNavigateToMarker,
    onLocationResultClick,
    handleAddCardWithLocation,
    topicId
  } = props;

  return (
    <div className="search_container">
      {/* For Location */}
      <div className="search_section">
        <div className="section_header">Location</div>
        <LocationPicker
          hideInput
          searchQuery={props.searchQuery}
          onResultClick={onLocationResultClick}
          handleAddCardWithLocation={handleAddCardWithLocation}
          topicId={topicId}
        />
      </div>

      {/* For Cards */}
      <div className="search_section">
        <div className="section_header" style={{ paddingTop: '10px' }}>
          Cards
        </div>
        {cardResults.length > 0 ? (
          <div className="card_results">
            {cardResults.map((card, i) => (
              <CardItem
                key={i}
                card={card}
                handleNavigateToMarker={handleNavigateToMarker}
              />
            ))}
          </div>
        ) : (
          <div className="noResult">No results</div>
        )}
      </div>
    </div>
  );
};

const mapState = state => {
  const {
    tools: { mapLens }
  } = stateMappings(state);
  return { searchQuery: mapLens.searchQuery };
};

export default connect(mapState)(SearchContainer);
