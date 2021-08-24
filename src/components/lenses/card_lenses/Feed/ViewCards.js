import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import withDataManager from 'Src/dataManager/components/withDataManager';
import LoadingIndicator from 'Components/shared/LoadingIndicator';
import { getSortedFilteredCardsByTopic } from 'Src/newRedux/database/cards/selectors';
import { getFilterSettings } from 'Src/helpers/user_config';
import ViewCard from './ViewCard';
import NewCard from './NewCard';

const PAGE_SIZE = 10;

class ViewCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      end: PAGE_SIZE
    };
  }

  static propTypes = {
    selectedTopic: PropTypes.object,
    parentTopic: PropTypes.object,
    cards: PropTypes.arrayOf(PropTypes.object)
  };

  handleLoadMore = () => {
    this.setState(prevState => {
      return { end: prevState.end + PAGE_SIZE };
    });
    this.props.dmRequestNextPageForRequirement('cardsWithAttributes');
  };

  render() {
    const {
      topic,
      cards,
      dmData: {
        cardsWithAttributes: { allLoaded, isLoading }
      }
    } = this.props;
    const { end } = this.state;
    return (
      <div className="fv-cards-list">
        <NewCard parentTopic={topic} />
        {cards ? (
          cards
            .slice(0, end)
            .map(card => (
              <ViewCard key={card.id} card={card} parentTopic={topic} />
            ))
        ) : (
          <div className="load_more">No Cards here.</div>
        )}
        {isLoading && (
          <LoadingIndicator style={{ height: 60, marginTop: -12 }} />
        )}
        {((!allLoaded && !isLoading) || (cards && end < cards.length)) && (
          <div className="load_more">
            <a onClick={this.handleLoadMore}>Load more</a>
          </div>
        )}
      </div>
    );
  }
}

const dataRequirements = ({ topic, sortType, includeNestedCards }) => {
  const sort =
    sortType == 'newest'
      ? '-created_at'
      : sortType == 'oldest'
      ? 'created_at'
      : null;
  return {
    cardsWithAttributes: {
      attributes: !topic
        ? {
            ...(sort ? { sort } : {}),
            isRoot: !includeNestedCards,
            pageSize: PAGE_SIZE
          }
        : {
            topicId: topic.id,
            isRoot: !includeNestedCards,
            pageSize: PAGE_SIZE
          }
    }
  };
};

const mapState = (state, props) => {
  const { selectedTopic, parentTopic } = props;

  const sortType = !selectedTopic
    ? 'newest'
    : selectedTopic == 'old'
    ? 'oldest'
    : null;

  const topic = get(selectedTopic, 'id') ? selectedTopic : parentTopic;

  const cards = topic
    ? getSortedFilteredCardsByTopic(state)[topic.id]
    : props.cards;

  const filterSettings = getFilterSettings(state);

  return {
    includeNestedCards: filterSettings.include_nested_cards,
    sortType,
    topic,
    cards
  };
};

export default withDataManager(dataRequirements, mapState)(ViewCards);
