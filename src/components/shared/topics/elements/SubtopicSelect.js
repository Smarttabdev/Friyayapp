import React, { Component } from 'react';
import { string, func, array, object } from 'prop-types';
import { connect } from 'react-redux';
import Icon from 'Components/shared/Icon';
import { getSortedTopicsByParentTopic } from 'Src/newRedux/database/topics/selectors';

class SubtopicSelect extends Component {
  state = {
    showDropdown: false
  };

  static defaultProps = {
    containerClassName: ''
  };

  static propTypes = {
    containerClassName: string,
    selectedSubtopic: object,
    onSelectSubtopic: func.isRequired,
    subTopics: array.isRequired
  };

  handleClickEvent = e => {
    this.dropdownRef &&
      !this.dropdownRef.contains(e.target) &&
      this.handleToggleDropdown();
  };

  handleSelectSubtopic = subtopicId => {
    this.props.onSelectSubtopic(subtopicId);
    this.handleToggleDropdown();
  };

  handleToggleDropdown = () => {
    const { showDropdown } = this.state;
    this.setState({ showDropdown: !showDropdown });
    showDropdown
      ? document.removeEventListener('click', this.handleClickEvent, true)
      : document.addEventListener('click', this.handleClickEvent, true);
  };

  saveDropdownRef = ref => {
    this.dropdownRef = ref;
  };

  render() {
    const { showDropdown } = this.state;

    return (
      <div
        className={`dropdown label-select ${showDropdown && 'open'}`}
        ref={this.saveDropdownRef}
      >
        <a
          onClick={this.handleToggleDropdown}
          className="dropdown label-select"
          style={{ paddingRight: 0, paddingLeft: '5px' }}
          role="button"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <Icon fontAwesome icon="caret-down" />
        </a>
        <div
          className={`dropdown-menu label-select-dropdown ${showDropdown &&
            'open'}`}
          aria-labelledby="dLabel"
        >
          <div className="selectable-user-list">
            {this.props.subTopics.map(subtopic => (
              <a
                className="selectable-user-list_row"
                key={subtopic.id}
                onClick={() => this.handleSelectSubtopic(subtopic.id)}
              >
                {subtopic.attributes.title}
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
const mapState = (state, props) => ({
  subTopics: getSortedTopicsByParentTopic(state)[props.topicId] || []
});

export default connect(mapState)(SubtopicSelect);
