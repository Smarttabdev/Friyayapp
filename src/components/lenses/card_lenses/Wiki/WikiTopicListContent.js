import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import Icon from 'Components/shared/Icon';
import { getSortedFilteredTopicsByParentTopic } from 'Src/newRedux/database/topics/selectors';
import { viewTopic } from 'Src/newRedux/database/topics/thunks';

const TopicList = ({ topics, viewTopic }) => {
  if (!topics || (topics && !topics.length)) {
    return <div className="no-board">No Boards</div>;
  }
  return (
    <div className="wiki-content-topic-list">
      <Fragment>
        <h3>Boards</h3>
      </Fragment>
      {topics.map(topic => (
        <Fragment key={topic.id}>
          <div className="wiki-content-topic-item">
            <Icon
              icon="hashtag"
              fontAwesome
              additionalClasses="wikilist-topic-segment_topic-icon"
            />
            <a
              className="wikilist-topic-segment_title flex-1"
              onClick={() => viewTopic({ topicSlug: topic.attributes.slug })}
            >
              {topic.attributes.title}
            </a>
          </div>
        </Fragment>
      ))}
    </div>
  );
};

const mapState = (state, props) => ({
  topics: (getSortedFilteredTopicsByParentTopic(state) || [])[
    props.topic ? props.topic.id : 0
  ]
});

const mapDispatch = {
  viewTopic
};

export default connect(mapState, mapDispatch)(TopicList);
