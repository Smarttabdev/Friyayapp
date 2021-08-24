import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Tooltip from 'Components/shared/Tooltip';
import { getSpeedKey } from 'Components/shared/topics/SprintBar/SprintBar';

const speedIcons = {
  horse: { title: 'On Track', icon: '🏇' },
  car: { title: 'Ahead', icon: '🏎️' },
  turtle: { title: 'Behind', icon: '🐢' },
  snail: { title: 'Far Behind', icon: '🐌' },
  rocket: { title: 'Far Ahead', icon: '🚀' },
  done: { title: 'Complete', icon: '💯' }
};

export const getProjectOrGoalSpeed = ({
  speed,
  completionLevel,
  showSpeedCaption
}) => {
  const forId = Math.ceil(Math.random() * 100000, 6);
  const speedKey = isNaN(speed) ? speed : getSpeedKey(speed, completionLevel);
  return speedKey ? (
    <div data-tip={speedIcons[speedKey].title} data-for={forId}>
      <div className="speed">
        {speedIcons[speedKey].icon}
        {showSpeedCaption && (
          <span className="speed-caption ml15">
            {speedIcons[speedKey].title}
          </span>
        )}
      </div>
      <Tooltip place="bottom" id={forId} />
    </div>
  ) : null;
};

class Speed extends Component {
  render() {
    const { speed, showSpeedCaption, getSpeed, currentSpeed } = this.props;

    //return current speed data
    getSpeed && getSpeed(currentSpeed || 0);

    const forId = Math.ceil(Math.random() * 100000, 6);
    const speedKey = isNaN(speed) ? speed : getSpeedKey(speed);
    const additionalStyle = {
      marginTop: speedKey == 'turtle' ? '-5px' : speedKey == 'car' && '-10px'
    };
    return speedKey ? (
      <div data-tip={speedIcons[speedKey].title} data-for={forId}>
        <div className="speed" style={additionalStyle}>
          {speedIcons[speedKey].icon}
          {showSpeedCaption && (
            <span className="speed-caption ml15">
              {speedIcons[speedKey].title}
            </span>
          )}
        </div>
        <Tooltip place="bottom" id={forId} />
      </div>
    ) : null;
  }
}

const mapState = (state, props) => {
  const { cards, completionLevel } = props;
  const cardsSpeed = cards.map(card => {
    const { completed_percentage, start_date, due_date } = card.attributes;
    if (completed_percentage && start_date && due_date) {
      const start = moment(start_date, 'YYYY-MM-DD').startOf('day');
      const end = moment(due_date, 'YYYY-MM-DD').endOf('day');
      const totalDuration = Math.abs(start.diff(end, 'days')) + 1;
      const daySpent = Math.ceil(
        Math.abs(moment.duration(start.diff(moment().startOf('day'))).asDays())
      );
      const currentSpeed = (daySpent / totalDuration) * 100;
      const speed = completed_percentage / currentSpeed;
      return isFinite(speed) ? speed : 1.5;
    } else return 0;
  });
  const totalSpeed = cardsSpeed.reduce((a, b) => a + b, 0);
  const attainableSpeed = 1.5 * cards.length;
  const currentSpeed = totalSpeed / attainableSpeed;
  const speed = getSpeedKey(currentSpeed, completionLevel);
  // if (completionLevel == 100) {
  //   speed = 'done';
  // } else {
  //   currentSpeed >= 1 && (speed = 'rocket');
  //   currentSpeed > 0.7 && currentSpeed < 1 && (speed = 'car');
  //   currentSpeed > 0.5 && currentSpeed < 0.8 && (speed = 'horse');
  //   currentSpeed > 0.4 && currentSpeed < 0.6 && (speed = 'turtle');
  //   currentSpeed >= 0 && currentSpeed <= 0.4 && (speed = 'snail');
  // }
  return {
    speed,
    currentSpeed
  };
};

export default connect(mapState)(Speed);
