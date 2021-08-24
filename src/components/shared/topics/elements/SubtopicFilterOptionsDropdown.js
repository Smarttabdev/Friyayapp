import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { topicFilters } from 'Lib/config/filters/topics';
import cx from 'classnames';
import {
  getFilterSettings,
  setUserFilterSettings
} from 'Src/helpers/user_config';

const topicFilterOptions = Object.values(topicFilters);

class SubtopicFilterDropdown extends Component {
  static propTypes = {
    toggleTopicFilter: PropTypes.func.isRequired
  };

  setTopicFilter = key => e => {
    const { setUserFilterSettings, closeDropdown } = this.props;
    const payload = { topic_filter: [key] };
    setUserFilterSettings(payload);
    closeDropdown();
  };

  render() {
    const { selectedTopicFilters } = this.props;

    return (
      <div className="subtopics-filter">
        <ul className="list">
          {topicFilterOptions.map(option => (
            <li key={option.key}>
              <a
                onClick={this.setTopicFilter(option.key)}
                className={cx(
                  'dropdown-option-item',
                  'dropdown-option-item-span'
                )}
                style={{ padding: '0' }}
              >
                {option.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapState = state => {
  const {
    page: { topicId }
  } = stateMappings(state);

  const filter_setting = getFilterSettings(state);
  return {
    topicId,
    selectedTopicFilters: filter_setting.topic_filter[0]
  };
};

const mapDispatch = {
  setUserFilterSettings
};

export default connect(mapState, mapDispatch)(SubtopicFilterDropdown);
