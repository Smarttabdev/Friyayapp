import React, { useState } from 'react';
import GoalBox from './GoalBox';
import ActiveFiltersPanel from 'Components/shared/filters/ActiveFiltersPanel';
import AddSubtopicCard from 'Components/shared/topics/AddSubtopicCard';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { connect } from 'react-redux';

function GoalBoardsLens(props) {
  const {
    subtopics,
    topic,
    card_font_color,
    users,
    userId,
    isMyGoals,
    newTopicRelationships
  } = props;
  const [showAddForm, setshowAddForm] = useState(false);

  return (
    <div className="goal-boards-container">
      <ActiveFiltersPanel additionalContainerClass={'mb10'} />
      <div className="goal-list">
        {subtopics.map(board => (
          <GoalBox board={board} key={board.id} users={users} />
        ))}
        {
          <div
            className="goal-box-container placeholder"
            style={{ borderColor: card_font_color }}
          >
            {showAddForm ? (
              <AddSubtopicCard
                // afterTopicCreated={this.handleTopicWasCreated}
                inInputMode={showAddForm}
                onDismiss={() => setshowAddForm(false)}
                tag={'goal'}
                // boardIndex={this.state.boardIndex}
                parentTopicId={topic.id || null}
                boardTypeSmallModal
                transparent
                hideAssignee
                // addPickAnExistingBoard={this.props.addPickAnExistingBoard}
                newTopicRelationships={isMyGoals && newTopicRelationships}
              />
            ) : (
              <p
                className="add-board-button"
                onClick={() => setshowAddForm(true)}
              >
                +Add Board
              </p>
            )}
          </div>
        }
      </div>
    </div>
  );
}

const mapState = state => {
  const {
    utilities: {
      active_design: { card_font_color }
    },
    people
  } = stateMappings(state);
  return {
    card_font_color: card_font_color,
    users: people
  };
};

export default connect(mapState)(GoalBoardsLens);
