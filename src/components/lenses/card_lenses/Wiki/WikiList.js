import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { createSelector } from 'reselect';
import { getSortedFilteredSearchedTopicsByParentTopic } from 'Src/newRedux/database/topics/selectors';
import { getSortedFilteredCardsByTopic } from 'Src/newRedux/database/cards/selectors';

import WikiListTopicSegment from './WikiListTopicSegment';
import IconButton from 'Components/shared/buttons/IconButton';
import {
  dragItemTypes,
  GenericDragDropListing,
  GenericDropZone
} from 'Components/shared/drag_and_drop/_index';
import DMLoader from 'Src/dataManager/components/DMLoader';
import WikiCard from './WikiCard';
import withDataManager from 'Src/dataManager/components/withDataManager';
import { getActiveBoardFilters } from 'Src/newRedux/database/topics/selectors';

class WikiList extends Component {
  renderSubtopicRow = (topic, dragLeaveHandlers = [], hideHeader = false) => {
    const { topic: thisTopic, color, togglePickBoard } = this.props;

    return (
      <WikiListTopicSegment
        color={color}
        dragLeaveHandlersForParentLists={dragLeaveHandlers}
        hideHeader={hideHeader}
        onSelectCard={this.props.onSelectCard}
        renderSubtopicSection={(subtopic, parentDragLeaveHandlers) =>
          this.renderSubtopicRow(subtopic, parentDragLeaveHandlers)
        }
        selectedCardId={this.props.selectedCardId}
        topic={topic}
        isRoot={(topic ? topic.id : '0') === (thisTopic ? thisTopic.id : '0')}
        togglePickBoard={togglePickBoard}
      />
    );
  };

  render() {
    const { cards, selectedCardId, topic, topics } = this.props;
    const topicId = topic ? topic.id : '0';

    return (
      <div className="wiki-list_container">
        <div className="wiki-list">
          {this.renderSubtopicRow(topic, [], true)}
        </div>
      </div>
    );
  }
}

const mapState = (state, props) => ({
  topics: getSortedFilteredSearchedTopicsByParentTopic(state) || [],
  cards: getSortedFilteredCardsByTopic(state) || []
});

const dataRequirements = props => {
  const boardFilters = getActiveBoardFilters();
  return props.topic
    ? {
        subtopicsForTopic: { topicId: props.topic.id },
        cardsForTopic: { topicId: props.topic.id }
      }
    : {
        cardsWithAttributes: {
          attributes: {
            ...(boardFilters?.length && !boardFilters.find(f => f.excludes)
              ? {
                  topicsParams: {
                    ids: boardFilters.map(f => f.id)
                  }
                }
              : undefined)
          }
        }
      };
};

export default withDataManager(dataRequirements, mapState)(WikiList);
