import React, { Component } from 'react';
import { connect } from 'react-redux';
import StarterHeader from '../../card_lenses/Starter/StarterHeader';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { updateFinderLens } from 'Src/newRedux/interface/lenses/actions';

class Header extends Component {
  onFilterClick = type => {
    const { activeFilters } = this.props;
    let updatedActiveFilters = [];

    if (type != 'ALL') {
      updatedActiveFilters = activeFilters.find(t => t == type)
        ? activeFilters.filter(t => t != type)
        : activeFilters.concat(type);
      updatedActiveFilters = updatedActiveFilters.filter(t => t != 'ALL');
    }
    if (!updatedActiveFilters.length) {
      updatedActiveFilters.push('ALL');
    }
    this.props.updateFinderLens({ activeFilters: updatedActiveFilters });
  };

  handleSearch = value => {
    this.props.updateFinderLens({ searchQuery: value });
  };

  render() {
    const { activeFilters, finderProps, topic, card_font_color } = this.props;

    return (
      <div className="header_section">
        {/* <div className="add_section"></div>
        <div className="search_section"></div> */}
        <div className="filter_section">
          <StarterHeader
            topic={topic}
            fragments={rootFragments(finderProps)}
            activeFilters={activeFilters}
            onFilterClick={this.onFilterClick}
            includeSearch
            onSearchValueChange={this.handleSearch}
            card_font_color={card_font_color}
          />
        </div>
      </div>
    );
  }
}

const mapState = state => {
  const {
    tools: {
      finderLens: { activeFilters }
    }
  } = stateMappings(state);

  return {
    activeFilters
  };
};

const mapDispatch = {
  updateFinderLens
};

export default connect(mapState, mapDispatch)(Header);
