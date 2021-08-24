import React, { PureComponent, Fragment } from 'react';
import { array, string } from 'prop-types';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { getSortedFilteredCardsByTopicWithoutNestedCards } from 'Src/newRedux/database/cards/selectors';
import { getSortedFilteredSearchedTopicsByParentTopic } from 'Src/newRedux/database/topics/selectors';
import { createBuildCardRequirementsSelector } from 'Lib/utilities';
import { setActiveDesign } from 'Src/newRedux/utilities/actions';
import { workspaceDesign, yayDesign } from 'Src/lib/utilities';
import { Helmet } from 'react-helmet';
import LensContainer from 'Components/lenses/LensContainer';
import { getRelevantViewForPage } from 'Src/newRedux/interface/lenses/selectors';
import get from 'lodash/get';
import { getDomainUISettings } from 'Src/newRedux/database/domains/selectors';
import Panel from 'Components/Panel';
import {
  joinRealtimeChannel,
  leaveRealtimeChannel
} from 'Src/newRedux/realtime/actionsCable';
import withDataManager from 'Src/dataManager/components/withDataManager';

class CardsPage extends PureComponent {
  static propTypes = {
    allCards: array.isRequired,
    cardView: string
  };

  componentDidMount() {
    this.props.joinRealtimeChannel('page', 'workspace');

    if (this.props.domain && this.props.cardView) {
      const active_design = workspaceDesign(
        this.props.cardView,
        this.props.domain
      );
      this.props.setActiveDesign({ active_design });
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.domain !== this.props.domain ||
      prevProps.cardView !== this.props.cardView
    ) {
      const active_design = workspaceDesign(
        this.props.cardView,
        this.props.domain
      );
      this.props.setActiveDesign({ active_design });
    }
  }

  componentWillUnmount() {
    this.props.setActiveDesign({ active_design: {} });
    this.props.leaveRealtimeChannel('page', 'workspace');
  }

  render() {
    const {
      allCards,
      allTopics,
      cardRequirements,
      cardView,
      topicView,
      cardsHidden,
      displayTopics
    } = this.props;

    return (
      <Fragment>
        <Helmet>
          <title>Friyay - Cards</title>
        </Helmet>
        <LensContainer
          cards={allCards}
          cardRequirements={cardRequirements}
          displayCards
          subtopics={allTopics}
          displayTopics={displayTopics}
          cardView={cardView}
          topicView={topicView}
          cardsHidden={cardsHidden}
        />
        {/* <Panel /> */}
      </Fragment>
    );
  }
}

const mapState = state => {
  const initialCardRequirements = {};
  const buildCardRequirementsSelector = createBuildCardRequirementsSelector();

  return state => {
    const sm = stateMappings(state);
    const topicViews = ['TOPIC_HEXES', 'TOPIC_LIST', 'TOPIC_TILES'];
    const {
      domains,
      page: { domainId }
    } = sm;
    const cardRequirements = buildCardRequirementsSelector(
      state,
      initialCardRequirements
    );
    const domain = domains[domainId];
    const cardView = getRelevantViewForPage(state);
    const uiSettings = getDomainUISettings(state);

    return {
      domain,
      allCards:
        getSortedFilteredCardsByTopicWithoutNestedCards(state)['0'] || [],
      allTopics: getSortedFilteredSearchedTopicsByParentTopic(state)['0'] || [],
      cardRequirements,
      cardView,
      cardsHidden: get(uiSettings, 'card_hidden')
        ? get(uiSettings, 'card_hidden')
        : !uiSettings.current_active_template && topicViews.includes(cardView),
      displayTopics:
        uiSettings.subtopic_panel_visible === null &&
        topicViews.includes(cardView)
          ? true
          : uiSettings.subtopic_panel_visible,
      topicView:
        get(uiSettings, 'subtopic_view') &&
        typeof get(uiSettings, 'subtopic_view') !== 'boolean'
          ? uiSettings.subtopic_view
          : 'TILE'
    };
  };
};

const dataRequirements = () => ({
  topics: {}
});

export default withDataManager(dataRequirements, mapState, {
  setActiveDesign,
  joinRealtimeChannel,
  leaveRealtimeChannel
})(CardsPage);
