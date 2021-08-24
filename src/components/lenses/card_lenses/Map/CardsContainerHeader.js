import React, { useEffect, useState } from 'react';
import Icon from 'Components/shared/Icon';
import { updateMapLens } from 'Src/newRedux/interface/lenses/actions';
import { connect } from 'react-redux';
import IconButton from 'Src/components/shared/buttons/IconButton';
import Tooltip from 'Components/shared/Tooltip';

const CardsContainerHeader = ({
  card_font_color,
  updateMapLens,
  cardsIsExpanded,
  handleClickExpandCard,
  toggleAddOptions,
  cardCreatedCounter
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    if (hasMounted) clearSearchInput();
    else setHasMounted(true);
  }, [cardCreatedCounter]);

  const handleSearchValueChange = e => {
    setSearchValue(e.target.value);
    updateMapLens({ searchQuery: e.target.value });
  };

  const clearSearchInput = () =>
    handleSearchValueChange({ target: { value: '' } });

  const forId = Math.ceil(Math.random() * 100000, 6);

  return (
    <div className={`header_section ${cardsIsExpanded && 'isExpanded'}`}>
      <div
        className="add_button"
        data-tip={'Add Options'}
        data-for={forId}
        onClick={toggleAddOptions}
      >
        <Icon color="#FFF" icon="add" additionalClasses="plus-icon" />
        <Tooltip {...{ place: 'bottom' }} id={forId} />
      </div>

      <div
        className="search_bar"
        style={card_font_color ? { borderColor: card_font_color } : {}}
      >
        <Icon icon="search" containerClasses="search_icon" color="#56CCF2" />
        <input
          placeholder="Search Cards and Location"
          className="form-control search_input"
          value={searchValue}
          onChange={handleSearchValueChange}
          style={{ color: card_font_color }}
        />
        {searchValue.length > 0 && (
          <IconButton icon="close" onClick={clearSearchInput} color="#c4c4c4" />
        )}
      </div>

      <IconButton
        icon={`expand_${cardsIsExpanded ? 'less' : 'more'}`}
        onClick={handleClickExpandCard}
        color={card_font_color}
        additionalClasses="expand_button"
        tooltip="Expand cards"
      />
    </div>
  );
};

export default connect(undefined, { updateMapLens })(CardsContainerHeader);
