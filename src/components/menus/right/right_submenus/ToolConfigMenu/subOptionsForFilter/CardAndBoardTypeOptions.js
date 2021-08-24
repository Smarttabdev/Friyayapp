import React, { Component } from 'react';
import { itemFilters } from 'Lib/config/filters/items';
import { connect } from 'react-redux';
import {
  getFilterSettings,
  setUserFilterSettings
} from 'Src/helpers/user_config';

const filters = Object.values(itemFilters);

class CardAndBoardTypeOptions extends Component {
  toggle = (arr, val) => {
    return arr.includes(val) ? arr.filter(x => x != val) : arr.concat(val);
  };

  handleSelectFilter = filter => {
    console.log('clicked a filter', filter);
    if (filter.type == 'card_type') {
      const payload = {
        card_type: this.toggle(this.props.cardTypeFilter, filter.key)
      };
      this.props.setUserFilterSettings(payload);
    } else if (filter.type == 'board_type') {
      const payload = {
        board_type: this.toggle(this.props.boardTypeFilter, filter.key)
      };
      this.props.setUserFilterSettings(payload);
    }
  };

  isActive = filter => {
    return filter.type == 'card_type'
      ? this.props.cardTypeFilter.includes(filter.key)
      : filter.type == 'board_type'
      ? this.props.boardTypeFilter.includes(filter.key)
      : false;
  };

  render() {
    return (
      <>
        {filters.map((filter, i) => (
          <div
            key={i}
            className={`sub_option ${this.isActive(filter) && 'isActive'}`}
            onClick={() => this.handleSelectFilter(filter)}
          >
            {filter.name}
          </div>
        ))}
      </>
    );
  }
}

const mapState = state => {
  const filter_setting = getFilterSettings(state);
  return {
    cardTypeFilter: filter_setting.card_type || [],
    boardTypeFilter: filter_setting.board_type || []
  };
};

const mapDispatch = {
  setUserFilterSettings
};

export default connect(mapState, mapDispatch)(CardAndBoardTypeOptions);
