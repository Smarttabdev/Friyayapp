import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserBox from './UserBox';
import DMLoader from 'Src/dataManager/components/DMLoader';
import { stateMappings } from 'Src/newRedux/stateMappings';

class MyPlanLens extends Component {
  render() {
    const { user, cardRequirements } = this.props;
    return (
      <div className="plan_lenses">
        <div className="my-plan-board">
          <div className="my_plan-boxes">
            <UserBox
              {...this.props}
              cardRequirements={{
                ...(this.props.cardRequirements || {}),
                ...(user ? { assignedId: user.id } : {})
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  const { user } = stateMappings(state);
  return {
    user
  };
};

export default connect(mapState)(MyPlanLens);
