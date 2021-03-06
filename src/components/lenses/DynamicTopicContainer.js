import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import lensConfig from 'Lib/config/lenses/lenses';
import ErrorBoundary from 'Components/shared/errors/ErrorBoundary';
import { oldViewEnumInOrderOfIndex } from '../../newRedux/interface/lenses/selectors';
const forceViewToDisplay = null;

class DynamicTopicContainer extends PureComponent {
  static propTypes = {
    topic: PropTypes.object,
    topics: PropTypes.array,
    topicView: PropTypes.string,
    topicRequirements: PropTypes.object,
    cardsHidden: PropTypes.bool,
    showAddTopicInput: PropTypes.bool
  };

  render() {
    const { topicView, topic } = this.props;
    let default_view_id = topic ? topic.attributes.default_view_id : null;

    if (default_view_id && !isNaN(default_view_id)) {
      default_view_id = oldViewEnumInOrderOfIndex[default_view_id];
    }

    const TopicViewComponent =
      forceViewToDisplay ||
      (lensConfig.topics[topicView] &&
        lensConfig.topics[topicView].viewComponent);

    return (
      <ErrorBoundary>
        <TopicViewComponent {...this.props} />
      </ErrorBoundary>
    );
  }
}

export default DynamicTopicContainer;
