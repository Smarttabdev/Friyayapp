import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import IconDropdownMenu from 'Components/shared/IconDropdownMenu';
import { viewTopic } from 'Src/newRedux/database/topics/thunks';
import { toggleWorkspaceTopicsPanel } from 'Src/newRedux/interface/lenses/thunks';
import { getDomainUISettings } from 'Src/newRedux/database/domains/selectors';
import { setUserUiSettings } from 'Src/helpers/user_config';
import { getRelevantViewForPage } from 'Src/newRedux/interface/lenses/selectors';
import { getSortedFilteredTopicsByParentTopic } from 'Src/newRedux/database/topics/selectors';

const WorkspaceViewDropdownMenu = ({
  displayTopics,
  currentTopics,
  cardFontColor,
  viewTopic,
  setUserUiSettings,
  topics
}) => {
  const toggleTopPanel = () => {
    setUserUiSettings({
      subtopic_panel_visible: !displayTopics
    });
  };

  const topicsList = useMemo(() => {
    return currentTopics.map(topic => ({
      id: topic.id,
      title: topic.attributes.title,
      clickHandler: () => viewTopic({ topicSlug: topic.attributes.slug })
    }));
  }, [currentTopics]);

  const toggleList = [
    {
      title: 'Keep open in top panel',
      toggleState: displayTopics,
      toggleHandler: toggleTopPanel
    }
  ];
  return (
    <IconDropdownMenu
      title="Boards"
      icon="hashtag"
      color="#9B51E0"
      cardFontColor={cardFontColor}
      itemList={topicsList}
      toggleList={toggleList}
      additionalClasses={'medium-icon'}
      count={topics?.totalCount}
    />
  );
};

const mapState = state => {
  const sm = stateMappings(state);
  const {
    utilities: { active_design }
  } = sm;
  const topicViews = ['TOPIC_HEXES', 'TOPIC_LIST', 'TOPIC_TILES'];
  const uiSettings = getDomainUISettings(state);
  const cardView = getRelevantViewForPage(state);
  const displayTopics =
    uiSettings.subtopic_panel_visible === null && topicViews.includes(cardView)
      ? true
      : uiSettings.subtopic_panel_visible;
  const currentTopics = getSortedFilteredTopicsByParentTopic(state)['0'] || [];

  return {
    displayTopics,
    currentTopics,
    cardFontColor: active_design.card_font_color
  };
};

const mapDispatch = {
  viewTopic,
  toggleWorkspaceTopicsPanel,
  setUserUiSettings
};

export default connect(
  mapState,
  mapDispatch
)(
  QueryRenderer(WorkspaceViewDropdownMenu, {
    query: graphql`
      query WorkspaceViewDropdownMenuQuery {
        topics {
          totalCount
        }
      }
    `
  })
);
