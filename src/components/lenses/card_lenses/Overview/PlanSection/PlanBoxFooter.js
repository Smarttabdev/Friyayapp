import React, { Component } from 'react';
import CompletionSlider from 'Components/shared/CompletionSlider';
import { connect } from 'react-redux';
import moment from 'moment';

const speedTypes = {
  default: {
    info: '',
    icon: '🕛'
  },
  rocket: {
    info: 'far ahead',
    icon: '🚀'
  },
  car: {
    info: 'ahead',
    icon: '🏎️'
  },
  horse: {
    info: 'on track',
    icon: '🏇'
  },
  turtle: {
    info: 'behind',
    icon: '🐢'
  },
  snail: {
    info: 'far behind',
    icon: '🐌'
  },
  done: {
    info: 'All cards are completed',
    icon: '💯'
  }
};

class PlanBoxFooter extends Component {
  render() {
    const { type, cards, speed } = this.props;
    return (
      <div className="footer">
        <div className="title">Will it be done by Friday?</div>
        <div className="speed_icon">
          {speedTypes[speed ? speed : 'default'].icon}
        </div>
        <div className="speed_info">
          {cards.length < 1
            ? null
            : speed == 'done'
            ? null
            : type == 'my'
            ? 'You are '
            : 'The team is '}
          {cards.length < 1
            ? 'No Cards due this week'
            : speedTypes[speed ? speed : 'default'].info}
        </div>
      </div>
    );
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
  let speed;
  if (completionLevel == 100) {
    speed = 'done';
  } else {
    currentSpeed == 1 && (speed = 'rocket');
    currentSpeed > 0.7 && currentSpeed < 1 && (speed = 'car');
    currentSpeed > 0.5 && currentSpeed < 0.8 && (speed = 'horse');
    currentSpeed > 0.4 && currentSpeed < 0.6 && (speed = 'turtle');
    currentSpeed >= 0 && currentSpeed <= 0.4 && (speed = 'snail');
  }
  return {
    speed
  };
};

export default connect(mapState)(PlanBoxFooter);
