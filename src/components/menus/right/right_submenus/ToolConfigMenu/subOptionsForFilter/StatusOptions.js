import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getFilterSettings,
  setUserFilterSettings
} from 'Src/helpers/user_config';

import { cardFilters } from 'Lib/config/filters/cards';
const filters = Object.values(cardFilters);

class StatusOptions extends Component {
  handleSelectFilter = key => this.props.setUserFilterSettings({ card: key });

  render() {
    return (
      <>
        {filters.map((filter, i) => (
          <div
            key={i}
            className={`sub_option ${this.props.card == filter.key &&
              'isActive'}`}
            onClick={() => this.handleSelectFilter(filter.key)}
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
  return { card: filter_setting.card };
};

const mapDispatch = {
  setUserFilterSettings
};

export default connect(mapState, mapDispatch)(StatusOptions);
