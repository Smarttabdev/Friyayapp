import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { array } from 'prop-types';
import { stateMappings } from 'Src/newRedux/stateMappings';
import {
  getSortedFilteredTopicsByParentTopic,
  getRootTopic
} from 'Src/newRedux/database/topics/selectors';
import { getTopicFiltersAsTopicsWithAttributesRequirements } from 'Src/newRedux/filters/selectors';
import LensContainer from 'Components/lenses/LensContainer';
import Panel from 'Components/Panel';
import {
  joinRealtimeChannel,
  leaveRealtimeChannel
} from 'Src/newRedux/realtime/actionsCable';

const TopicsPage = ({
  allTopics,
  topicRequirements,
  topicView,
  joinRealtimeChannel,
  leaveRealtimeChannel
}) => {
  useEffect(() => {
    joinRealtimeChannel('page', 'views');
    return () => leaveRealtimeChannel('page', 'views');
  }, []);

  return (
    <Fragment>
      <Helmet>
        <title>Friyay - Boards</title>
      </Helmet>
      <LensContainer
        displayHeader
        displayTopics={true}
        subtopics={allTopics}
        topicRequirements={topicRequirements}
        headerView="TOPICS"
        topicView={topicView}
        hideRightBar={false}
      />
      <Panel />
    </Fragment>
  );
};

TopicsPage.propTypes = {
  allTopics: array.isRequired
};

const mapState = (state, props) => {
  const sm = stateMappings(state);
  const { user } = sm;
  const rootTopic = getRootTopic(state);
  const allTopics =
    getSortedFilteredTopicsByParentTopic(state)[rootTopic.id] || [];
  const uiSettings = user.attributes.ui_settings;
  let topicView = '';
  if (typeof topicView === 'object') {
    // it was an object by default, future new created workspace will be HEX by default
    topicView = 'HEX';
  } else {
    topicView =
      uiSettings.all_topics_view === 'SMALL_HEX'
        ? 'HEX'
        : uiSettings.all_topics_view;
  }

  return {
    allTopics,
    topicRequirements: getTopicFiltersAsTopicsWithAttributesRequirements(state),
    topicView
  };
};

const mapDispatch = {
  joinRealtimeChannel,
  leaveRealtimeChannel
};

export default connect(mapState, mapDispatch)(TopicsPage);
