import React from 'react';
import { connect } from 'react-redux';
import {
  getFilterSettings,
  setUserFilterSettings
} from 'Src/helpers/user_config';
import { getTopic } from 'Src/newRedux/database/topics/thunks';
import { stateMappings } from 'Src/newRedux/stateMappings';
import TopicsListDropdown from 'Components/shared/topics_list_dropdown';

const BoardOptions = ({
  topics,
  allTopics,
  currentTopic,
  getTopic,
  setUserFilterSettings
}) => {
  const selectedTopics = getNodes(topics).map(t => ({
    value: toId(t.id),
    label: t.title
  }));

  const handleSelectTopic = selectedTopics => {
    setUserFilterSettings({ board_ids: selectedTopics.map(t => t.id) });
    selectedTopics.forEach(topic => {
      if (!allTopics[topic.id]) getTopic({ topicId: topic.id });
    });
  };

  return (
    <>
      <TopicsListDropdown
        additionalClasses="w100 max-h-unset box-shadow-none d-block static"
        actionButtonLabel="Select Board"
        actionButtonHandler={handleSelectTopic}
        actionButtonClass="btn-primary"
        path={currentTopic.attributes.path.concat({ id: 0 })}
        startAt={0}
        hideHeader
        inputMode="list"
        hideAddTopicLink
        skipConfirmation
        onInputBlur={() => {}}
        onInputFocus={() => {}}
        onSelectTopic={() => {}}
        selectedTopics={selectedTopics}
        // showAddBoard
        extraStyle={{
          marginTop: -5,
          paddingTop: 0,
          paddingLeft: 5,
          paddingRight: 5
        }}
      />
    </>
  );
};

const mapState = state => {
  const {
    page: { topicId },
    topics
  } = stateMappings(state);
  const filter_setting = getFilterSettings(state);
  return {
    boardIds: filter_setting.board_ids,
    topicId,
    allTopics: topics,
    currentTopic: topics[topicId]
  };
};

const mapDispatch = {
  setUserFilterSettings,
  getTopic
};

export default connect(
  mapState,
  mapDispatch
)(
  QueryRenderer(BoardOptions, {
    query: graphql`
      query BoardOptionsQuery($ids: [ID!], $include: Boolean!) {
        topics(ids: $ids, all: true) @include(if: $include) {
          edges {
            node {
              id
              title
            }
          }
        }
      }
    `,
    vars: ({ boardIds }) => ({
      ids: boardIds,
      include: boardIds.length > 0
    })
  })
);
