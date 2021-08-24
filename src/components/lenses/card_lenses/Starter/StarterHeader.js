import React, { useState } from 'react';
import AddCardOrSubtopic from 'Components/shared/assemblies/AddCardOrSubtopic';
import StarterFilterToolList from './StarterFilterToolList';
import Icon from 'Components/shared/Icon';

export default function StarterHeader({
  topic,
  fragments,
  activeFilters,
  onFilterClick,
  onlyCardsTools,
  includeSearch,
  onSearchValueChange,
  card_font_color
}) {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchValueChange = e => {
    setSearchValue(e.target.value);
    onSearchValueChange(e.target.value);
  };

  return (
    <div className="starter_header">
      <div className="mr15 mt3 flex-r-center">
        <AddCardOrSubtopic
          color="#6fcf97"
          icon="add_circle"
          displayAddCardButton
          displayAddSubtopicButton
          displayAddChatButton
          displayAddVideoRoomButton
          displayAddGoalButton
          displayAddProjectButton
          className="add_button"
          topic={topic}
          boardTypeSmallModal
          hideOtherButton
        />
      </div>
      {includeSearch && (
        <div
          className="include_search"
          style={card_font_color ? { borderColor: card_font_color } : {}}
        >
          <Icon icon="search" containerClasses="search_icon" color="#56CCF2" />
          {/* <div className="tiphive-icon material-icons search_icon">search</div> */}
          <input
            placeholder="Search"
            className="form-control search_input"
            value={searchValue}
            onChange={handleSearchValueChange}
            style={{ color: card_font_color }}
          />
        </div>
      )}
      <StarterFilterToolList
        topicId={topic?.id}
        fragments={fragments}
        activeFilters={activeFilters}
        onFilterClick={onFilterClick}
        onlyCardsTools={onlyCardsTools}
      />
    </div>
  );
}
