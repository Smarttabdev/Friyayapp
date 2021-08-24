import React from 'react';
import Icon from 'Components/shared/Icon';

export default function Search({ handleSearchQuery }) {
  return (
    <form className="search-form" onSubmit={e => e.preventDefault()}>
      <div className="search-container">
        <Icon icon="search" color="#18A0FB" />
        <input
          type="text"
          onChange={e => handleSearchQuery(e.target.value)}
          placeholder="Search"
        />
      </div>
    </form>
  );
}
