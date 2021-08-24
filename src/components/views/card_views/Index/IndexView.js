import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import IndexViewCardsList from './IndexViewCardsList';
import IndexViewTopicSegment from './IndexViewTopicSegment';
import withDataManager from 'Src/dataManager/components/withDataManager';
import { getSortedFilteredCardsByTopicWithoutDescendants } from 'Src/newRedux/database/cards/selectors';
import {
  dragItemTypes,
  GenericDragDropListing
} from 'Components/shared/drag_and_drop/_index';
import { moveTopicFromDragAndDrop } from 'Src/newRedux/database/topics/abstractions';
import { stateMappings } from 'Src/newRedux/stateMappings';

class IndexView extends Component {
  static propTypes = {
    cards: PropTypes.array,
    subtopics: PropTypes.array,
    projectLens: PropTypes.bool
  };

  // static defaultProps = {
  //   projectLens: true
  // };

  render() {
    const {
      subtopics,
      cards,
      topic,
      projectLens,
      isTaskBoardsLens,
      isFileBoardsLens,
      isTopLevelTopic,
      card_font_color,
      isNoteBoardsLens,
      ...props
    } = this.props;
    projectLens &&
      !subtopics.filter(topic => topic.id == 'for adding board').length > 0 &&
      subtopics.push({ id: 'for adding board' });

    return (
      <div
        className={`index-board ${projectLens &&
          'project-tool'} ${isTaskBoardsLens &&
          'task-boards'} ${isFileBoardsLens &&
          'file-boards'} ${isNoteBoardsLens &&
          'note-boards'} ${!isTaskBoardsLens &&
          !isFileBoardsLens &&
          !isNoteBoardsLens &&
          'project-board'}`}
      >
        {topic &&
          (projectLens || isTaskBoardsLens ? null : (
            <IndexViewCardsList
              topic={topic}
              cards={cards}
              isTaskBoardsLens={isTaskBoardsLens}
              isTopLevelTopic={isTopLevelTopic}
              cardFontColor={card_font_color}
            />
          ))}

        <GenericDragDropListing
          dropClassName={'index-grid-layout'}
          itemList={subtopics}
          dropZoneProps={{ topicId: topic ? topic.id : null }}
          itemType={dragItemTypes.TOPIC}
          onDropItem={props.moveTopicFromDragAndDrop}
          renderItem={subtopic => (
            <IndexViewTopicSegment
              isTopLevelTopic
              key={subtopic.id}
              topic={subtopic}
              isTaskBoardsLens={isTaskBoardsLens}
              isFileBoardsLens={isFileBoardsLens}
              isNoteBoardsLens={isNoteBoardsLens}
              projectLens={projectLens}
              cards={
                isFileBoardsLens
                  ? cards.filter(card => card.attributes.attachments.length > 0)
                  : cards
              }
              subtopicsArray={subtopics}
            />
          )}
        />
      </div>
    );
  }
}

const dataRequirements = ({ user, cardRequirements }) => ({
  cardsWithAttributes: {
    attributes: {
      ...cardRequirements,
      personId: user && user.id
    }
  }
});

const mapState = (state, { topic }) => {
  const topicId = topic ? topic.id : '0';
  const {
    utilities: {
      active_design: { card_font_color }
    }
  } = stateMappings(state);

  return { card_font_color };
};

const mapDispatch = {
  moveTopicFromDragAndDrop
};

export default withDataManager(dataRequirements, mapState, mapDispatch, {
  dontShowLoadingIndicator: true
})(IndexView);
