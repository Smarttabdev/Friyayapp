import React, { Fragment, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import {
  createBuildCardRequirementsSelector,
  buildSubTopicRequirements
} from 'Lib/utilities';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { getSortedFilteredCardsByTopic } from 'Src/newRedux/database/cards/selectors';
import { getSortedFilteredSearchedTopicsByParentTopic } from 'Src/newRedux/database/topics/selectors';
import LensContainer from 'Components/lenses/LensContainer';
import LoadingIndicator from 'Components/shared/LoadingIndicator';
import Panel from 'Components/Panel';
import withDataManager from 'Src/dataManager/components/withDataManager';
import { setActiveDesign } from 'Src/newRedux/utilities/actions';
import { yayDesign } from 'Src/lib/utilities';
import get from 'lodash/get';
import { getRelevantViewForPage } from 'Src/newRedux/interface/lenses/selectors';
import { setTopicFilterSettings } from 'Src/newRedux/database/topics/thunks';
import cardLenses from 'Lib/config/lenses/cards';
import { getUiSettings, getFilterSettings } from 'Src/helpers/user_config';
import { joinChannel } from 'Src/newRedux/presence/thunks';
import {
  joinRealtimeChannel,
  leaveRealtimeChannel
} from 'Src/newRedux/realtime/actionsCable';

const TopicPage = ({
  cardRequirements,
  thisTopicsCards,
  thisTopicsSubtopics,
  topic,
  isDeletingTopic,
  displayTopics,
  cardView,
  topicView,
  cardsHidden,
  setActiveDesign,
  topicRequirements,
  filterSettings,
  setTopicFilterSettings,
  hideQuickToolbar,
  joinRealtimeChannel,
  leaveRealtimeChannel,
  isHome
}) => {
  useEffect(() => {
    if (!topic?.id) return;
    joinRealtimeChannel('topic', topic.id);
    return () => leaveRealtimeChannel('topic', topic.id);
  }, [topic?.id]);

  useEffect(() => {
    if (get(topic, 'id')) {
      return joinChannel(`Topic#${topic.id}`);
    }
  }, [get(topic, 'id')]);

  useEffect(() => {
    const active_design = yayDesign(cardView, topic);
    setActiveDesign({ active_design });
  }, [topic, cardView]);

  return (
    <Fragment>
      {topic && (
        <Helmet>
          <title>{isHome ? 'Friyay - Cards' : topic?.attributes?.title}</title>
        </Helmet>
      )}
      {isDeletingTopic ? (
        <LoadingIndicator />
      ) : (
        topic && (
          <Fragment>
            <LensContainer
              cards={thisTopicsCards || []}
              cardRequirements={cardRequirements}
              displayCards
              displayHeader
              displayTopics={displayTopics}
              headerView={isHome ? undefined : 'TOPIC'}
              subtopics={thisTopicsSubtopics}
              topic={topic}
              cardView={cardView}
              topicView={topicView}
              cardsHidden={cardsHidden}
              hideQuickToolbar={hideQuickToolbar}
            />
            <Panel />
          </Fragment>
        )
      )}
    </Fragment>
  );
};

const mapState = (state, props) => {
  const sm = stateMappings(state);
  const buildCardRequirementsSelector = createBuildCardRequirementsSelector();

  let initialCardRequirements = { topicId: props.topicId || sm.page.topicId };

  return (state, props) => {
    const sm = stateMappings(state);
    const {
      page,
      loadIndicator,
      utilities: { active_design }
    } = sm;
    const { isHome } = page;
    const topicId = props.topicId || page.topicId;

    if (initialCardRequirements.topicId != topicId) {
      initialCardRequirements = {
        ...initialCardRequirements,
        topicId
      };
    }

    const cardRequirements = buildCardRequirementsSelector(
      state,
      initialCardRequirements
    );
    const topicRequirements = buildSubTopicRequirements(topicId);
    const topic = sm.topics[topicId];
    const uiSettings = getUiSettings(state, topicId);
    const cards = getSortedFilteredCardsByTopic(state)[topicId];
    const topicViews = ['TOPIC_HEXES', 'TOPIC_LIST', 'TOPIC_TILES'];
    const cardView = props.cardView || getRelevantViewForPage(state);
    const filterSettings = getFilterSettings(state);
    const topics =
      getSortedFilteredSearchedTopicsByParentTopic(state)[topicId] || [];
    return {
      isHome,
      filterSettings,
      topicRequirements,
      cardRequirements,
      thisTopicsCards: cards,
      thisTopicsSubtopics: topics,
      topic,
      topicId: topicId,
      topicSlug: topic?.attributes?.slug,
      isDeletingTopic: loadIndicator.deletingTopic === topicId,
      displayTopics:
        uiSettings.subtopic_panel_visible === null &&
        topicViews.includes(cardView)
          ? true
          : uiSettings.subtopic_panel_visible,
      cardView,
      topicView:
        get(uiSettings, 'subtopic_view') &&
        typeof get(uiSettings, 'subtopic_view') !== 'boolean'
          ? uiSettings.subtopic_view
          : 'TILE',
      cardsHidden: !get(uiSettings, 'card_hidden')
        ? !uiSettings.current_active_template && topicViews.includes(cardView)
        : get(uiSettings, 'card_hidden'),
      active_design
    };
  };
};

const dataRequirements = props => {
  return {
    topic: { topicId: props.topicId },
    subtopicsForTopic: { topicId: props.topicId },
    topicWithSlug: { topicSlug: props.topicSlug }
  };
};

export default withDataManager(dataRequirements, mapState, {
  setActiveDesign,
  setTopicFilterSettings,
  joinRealtimeChannel,
  leaveRealtimeChannel
})(TopicPage);
