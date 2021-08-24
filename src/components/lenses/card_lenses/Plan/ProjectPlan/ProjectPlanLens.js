import React, { Component } from 'react';
import TeamPlanLens from '../TeamPlan/TeamPlanLens';

class ProjectPlanLens extends Component {
  render() {
    return (
      <div className="project-plan-container">
        <TeamPlanLens projectPlan {...this.props} hideTopicSection={false} />
      </div>
    );
  }
}

export default ProjectPlanLens;
