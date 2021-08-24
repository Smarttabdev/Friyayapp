import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ViewList from './ViewList';
import ViewCards from './ViewCards';
import ViewTimeline from './ViewTimeline';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import ActiveFiltersPanel from 'Components/shared/filters/ActiveFiltersPanel';
import { getSortedFilteredCardsByTopic } from 'Src/newRedux/database/cards/selectors';

import './FeedLens.scss';

class FeedLens extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTopic: undefined,
      topicChangeCounter: 0
    };
  }

  static propTypes = {
    topic: PropTypes.object,
    cards: PropTypes.object,
    topics: PropTypes.object,
    isHome: PropTypes.bool
  };

  handleTopicSelect = topic => {
    this.setState(prevState => {
      return {
        selectedTopic: topic,
        topicChangeCounter: prevState.topicChangeCounter + 1
      };
    });
  };

  render() {
    const {
      props: { topic, topics, cards, isHome },
      state: { selectedTopic, topicChangeCounter }
    } = this;

    return (
      <div
        className="feed-board-wrapper"
        style={{ paddingLeft: isHome ? '28px' : '38px' }}
      >
        <div className="feed-filters">
          <ActiveFiltersPanel additionalContainerClass={'ml8 mb10'} />
        </div>
        <div className="feed-content-wrapper">
          <ViewList
            parentTopic={topic}
            onTopicSelect={this.handleTopicSelect}
            selectedTopic={selectedTopic}
            topics={topics}
          />
          <ViewCards
            selectedTopic={selectedTopic}
            parentTopic={topic}
            cards={topic ? cards : cards(selectedTopic)}
            topicChangeCounter={topicChangeCounter}
          />
          <ViewTimeline
            selectedTopic={selectedTopic != 'old' ? selectedTopic : null}
            parentTopic={topic}
            cards={topic ? cards : cards(selectedTopic)}
          />
        </div>
      </div>
    );
  }
}

const mapState = (state, props) => {
  const sm = stateMappings(state);
  const {
    page: { topicId, isHome }
  } = sm;
  let cards = props.cards;
  if (!sm.topics[topicId]) {
    cards = topic => {
      const recentCards = props.cards;
      const oldCards = props.cards.reduceRight(function(acc, current) {
        acc.push(current);
        return acc;
      }, []);
      return !topic
        ? recentCards
        : topic === 'old'
        ? oldCards
        : getSortedFilteredCardsByTopic(state)[topic.id];
    };
  }

  return {
    topic: sm.topics[topicId],
    cards: cards,
    isHome
  };
};

export default connect(mapState)(FeedLens);
