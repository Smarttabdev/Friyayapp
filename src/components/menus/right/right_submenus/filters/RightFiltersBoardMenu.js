import React from 'react';
import { connect } from 'react-redux';
import className from 'classnames';
import { stateMappings } from 'Src/newRedux/stateMappings';
import Icon from 'Components/shared/Icon';
import SubMenuHeader from 'Components/menus/right/right_submenus/elements/SubMenuHeader';
import {
  getFilterSettings,
  setUserFilterSettings
} from 'Src/helpers/user_config';
import TopicsListDropdown from 'Components/shared/topics_list_dropdown';
import { getTopic } from 'Src/newRedux/database/topics/thunks';

const RightFiltersBoardMenu = ({
  boardIds,
  topics,
  allTopics,
  currentTopic,
  getTopic,
  setUserFilterSettings,
  isDocked,
  onClickBack
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
    <div className="right-submenu">
      <SubMenuHeader
        rootMenu="Filters"
        title="Board Filters"
        isDocked={isDocked}
        onClickBack={onClickBack}
      />
      <div className="right-submenu_content">
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
          showAddBoard
          extraStyle={{
            marginTop: -5,
            paddingTop: 0,
            paddingLeft: 5,
            paddingRight: 5
          }}
        />
      </div>
    </div>
  );
};

const mapState = (state, props) => {
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
  QueryRenderer(RightFiltersBoardMenu, {
    query: graphql`
      query RightFiltersBoardMenuQuery($ids: [ID!], $include: Boolean!) {
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
