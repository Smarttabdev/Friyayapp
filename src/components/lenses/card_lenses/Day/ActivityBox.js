import React, { Component } from 'react';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import translateActivity from './translateActivity';

class ActivityBox extends Component {
  render() {
    const { activities } = this.props;
    return (
      <div className="activity_box">
        <div className="dots">
          {activities.map((activity, i) => (
            <div key={i} className="dot"></div>
          ))}
        </div>
        <div className="activities">
          {activities.map((activity, i) => (
            <div key={i} className="activity_info">
              <div className="activity_time">{activity.time}</div>
              <div className="activity_type">{activity.type}</div>
            </div>
          ))}
          {activities.length < 1 && (
            <div className="activity_info">
              <div className="activity_type">No activity yet</div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapState = (state, props) => {
  const {
    activity: { activities }
  } = stateMappings(state);
  const { user } = props;
  const isUser = user.id != 'team';
  activities.sort(
    (a, b) =>
      new Date(b.attributes.created_at) - new Date(a.attributes.created_at)
  );
  const userActivities = activities.filter(
    activity => activity.relationships.notifier.data.id == user.id
  );

  let timeframeActivities = (isUser
    ? userActivities
    : activities
  ).map(activity => translateActivity(activity));

  return {
    activities: timeframeActivities
  };
};

const mapDispatch = {};

export default connect(mapState, mapDispatch)(ActivityBox);
