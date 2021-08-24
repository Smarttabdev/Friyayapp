import React from 'react';
import TeamPlanLens from '../TeamPlan/TeamPlanLens';

export default function GoalPlanLens(props) {
  return (
    <div className="goal-plan-container">
      <TeamPlanLens projectPlan goalPlan {...props} hideTopicSection={false} />
    </div>
  );
}
