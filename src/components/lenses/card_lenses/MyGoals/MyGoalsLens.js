import React from 'react';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { connect } from 'react-redux';
import GoalBoardsLens from 'Components/lenses/card_lenses/GoalBoards/GoalBoardsLens';

function MyGoalsLens(props) {
  const subtopics = [...props.subtopics];
  const filteredSubtopics = subtopics.filter(
    topic =>
      topic.relationships.assignments.data.filter(
        user => user.assigned_id == props.userId
      ).length > 0
  );

  return (
    <GoalBoardsLens
      {...props}
      subtopics={filteredSubtopics}
      isMyGoals
      newTopicRelationships={{
        assignments: {
          data: [
            {
              assigned_type: 'User',
              assigned_id: toId(props.userId)
            }
          ]
        }
      }}
    />
  );
}

const mapState = state => {
  const sm = stateMappings(state);
  const {
    user: { id }
  } = sm;

  return {
    userId: id
  };
};

export default connect(mapState)(MyGoalsLens);
