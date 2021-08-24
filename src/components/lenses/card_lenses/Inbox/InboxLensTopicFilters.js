import React, { Component } from 'react';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import Icon from 'Src/components/shared/Icon';
import { Link } from 'react-router-dom';

class InboxLensTopicFilters extends Component {
  state = { selectedTopicIds: [] };

  componentDidMount() {
    this.props.setActiveFilter('TOPICS_FILTER', this.state.selectedTopicIds);
  }

  handleSelectTopic = topic => {
    let selectedTopicIds = this.state.selectedTopicIds.slice();

    const indexOfTopicInState = selectedTopicIds.findIndex(
      id => id == topic.id
    );
    if (indexOfTopicInState != -1)
      selectedTopicIds.splice(indexOfTopicInState, 1);
    else selectedTopicIds.push(topic.id);

    this.setState({ selectedTopicIds }, () => {
      this.props.setActiveFilter('TOPICS_FILTER', this.state.selectedTopicIds);
    });
  };

  render() {
    const { topics, rootUrl } = this.props;
    const { selectedTopicIds } = this.state;
    const baseUrl = rootUrl == '/' ? '' : rootUrl;

    return (
      <div className="inbox_lens_boards_section">
        {topics.map((topic, i) => {
          const isSelected = selectedTopicIds.includes(topic.id);

          return (
            <div
              key={i}
              className={`inbox_lens_board_item ${
                isSelected ? 'isSelected' : ''
              }`}
            >
              <div onClick={() => this.handleSelectTopic(topic)}>
                <Icon
                  color={isSelected ? '#f2ab13' : '#9B51E0'}
                  icon="hashtag"
                  containerClasses="mr5"
                />
                {topic?.title || topic?.attributes?.title}
              </div>

              <Link
                key={i}
                className="navigate_button"
                to={`${baseUrl}/boards/${topic.attributes.slug}`}
              >
                <Icon icon="launch" fontSize={18} />
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapState = state => {
  const { page } = stateMappings(state);
  return {
    rootUrl: page.rootUrl
  };
};

export default connect(mapState, undefined)(InboxLensTopicFilters);
