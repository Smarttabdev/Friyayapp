import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateStarterLens } from 'Src/newRedux/interface/lenses/actions';
import Tooltip from 'Components/shared/Tooltip';
import classNames from 'classnames';
import IconButton from 'Src/components/shared/buttons/IconButton';

const Icon = ({ iconName, handleSortOption, active, tooltip, sortType }) => {
  const forId = Math.ceil(Math.random() * 100000, 6);
  return (
    <div data-tip={tooltip} data-for={forId}>
      <i
        style={
          active === sortType
            ? { color: '#56CCF2', transform: 'scale(1.1)' }
            : {}
        }
        className="material-icons-outlined"
        role="button"
        onClick={() => {
          handleSortOption(sortType);
        }}
      >
        {iconName}
      </i>
      <Tooltip {...{ place: 'bottom' }} id={forId} />
    </div>
  );
};

const StarterFilterIconList = ({
  updateStarterLens,
  initialSort,
  fontColor
}) => {
  const [active, setActive] = useState(initialSort || 'recentCreated');
  const [searchInput, setSearchInput] = useState(false);
  const [query, setQuery] = useState('');
  const [undoQuery, setUndoQuery] = useState('');

  const handleClickSearch = () => setSearchInput(prev => !prev);

  const handleChangeQ = e => {
    setQuery(e.target.value);
    updateStarterLens({ searchQuery: e.target.value });
  };

  const handleClearOrUndoSearchQuery = () => {
    if (query && !undoQuery) {
      setUndoQuery(query);
      setQuery('');
      updateStarterLens({ searchQuery: null });
    } else {
      setUndoQuery('');
      setQuery(undoQuery);
      updateStarterLens({ searchQuery: undoQuery });
    }
  };
  const RenderSearchIcon = () => {
    const searchClass = classNames('search-input', { open: searchInput });
    return (
      <div className="search-container">
        <IconButton
          additionalClasses="font-size-16"
          icon="search"
          fontAwesome
          onClick={handleClickSearch}
          tooltip="Search"
          tooltipOptions={{ place: 'bottom' }}
        />
        <input
          style={
            fontColor
              ? {
                  border: `1px solid ${fontColor}`
                }
              : { border: '1px solid rgba(0, 0, 0, 0.1)' }
          }
          type="text"
          value={query}
          className={searchClass}
          onChange={handleChangeQ}
          autoFocus
          autoComplete={'off'}
        />
        <span
          className={classNames('clear', { open: searchInput })}
          onClick={handleClearOrUndoSearchQuery}
        >
          x
        </span>
      </div>
    );
  };

  const handleSortOption = sortType => {
    if (active === sortType) {
      sortType = 'grouped';
    }
    setActive(sortType);
    updateStarterLens({ sort: sortType });
  };

  const icons = [
    {
      iconName: 'arrow_upward',
      tooltip: 'Recently Created (asc)',
      sortType: 'recentCreatedAsc'
    },
    {
      iconName: 'arrow_downward',
      tooltip: 'Recently Created (desc)',
      sortType: 'recentCreated'
    }
  ];

  return (
    <div className="filter_container">
      <RenderSearchIcon />
      {icons.map((icon, i) => (
        <Icon
          key={i}
          handleSortOption={handleSortOption}
          active={active}
          {...icon}
        />
      ))}
    </div>
  );
};

export default connect(null, { updateStarterLens })(StarterFilterIconList);
