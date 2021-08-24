import React, { Fragment, useMemo } from 'react';
import { get, groupBy } from 'lodash';

import withDataManager from 'Src/dataManager/components/withDataManager';
import { getSortedFilteredSearchedTopicsByParentTopic } from 'Src/newRedux/database/topics/selectors';

import '../../styles.module.scss';

const TopicsPage = ({ allTopics, onSelectTopic }) => {
  const topicsByUnread = useMemo(() => {
    // TODO: read check
    return groupBy(allTopics, topic => (!topic.read ? 'unreads' : 'reads'));
  }, [allTopics]);

  return (
    <Fragment>
      <div styleName="topbar">
        <div styleName="title">Board Comments</div>
      </div>
      <div styleName="input search">
        <input placeholder="Search"></input>
      </div>
      <div styleName="panel-main">
        <div styleName="list-group">
          <div styleName="group-title">Unreads</div>
          <div styleName="list">
            {(topicsByUnread.unreads || []).map((topic, i) => (
              <div
                key={i}
                styleName="list-item board-item unread"
                onClick={() => onSelectTopic(topic.id)}
              >
                <i styleName="dot-icon" />
                <div styleName="board-title">
                  {get(topic, 'attributes.title')}
                </div>
                <div styleName="mention-indicator">@mention</div>
              </div>
            ))}
          </div>
        </div>
        <div styleName="list-group">
          <div styleName="group-title">Boards</div>
          <div styleName="list">
            {(topicsByUnread.reads || []).map((topic, i) => (
              <div
                key={i}
                styleName="list-item board-item"
                onClick={() => onSelectTopic(topic.id)}
              >
                {/* <i className="material-icons-outlined" styleName="icon">
                  bubble_chart
                </i> */}
                <i className="material-icons icon-fa" styleName="icon">
                  <span className="fa fa-hashtag" />
                </i>
                <i className="fa fa-caret-right" styleName="caret" />
                <div styleName="board-title">
                  {get(topic, 'attributes.title')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const dataRequirements = () => {
  return {
    topics: {}
  };
};

const mapState = state => {
  return {
    allTopics: getSortedFilteredSearchedTopicsByParentTopic(state)['0'] || []
  };
};

export default withDataManager(dataRequirements, mapState)(TopicsPage);
