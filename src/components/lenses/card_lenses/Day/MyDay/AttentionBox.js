import React, { Component } from 'react';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { attentionCategories } from '../categories';
import ResultBox from '../ResultBox';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);

class AttentionBox extends Component {
  render() {
    const { headerText } = this.props;
    return (
      <div className="attention_box">
        <div className="header">{headerText}</div>
        {attentionCategories.map((item, i) => (
          <ResultBox key={i} item={item} cards={this.props[item.id]} />
        ))}
      </div>
    );
  }
}

const mapState = (state, props) => {
  const { cards, user } = props;
  let userCards = cards.filter(card =>
    card.relationships.tip_assignments.data.includes(user.id)
  );

  const checkFarBehind = card => {
    const start = moment(card.attributes.start_date, 'YYYY-MM-DD').startOf(
      'day'
    );
    const end = moment(card.attributes.due_date, 'YYYY-MM-DD').endOf('day');
    const totalDuration = Math.abs(start.diff(end, 'days')) + 1;
    const daySpent = Math.ceil(
      Math.abs(moment.duration(start.diff(moment().startOf('day'))).asDays())
    );
    const currentSpeed = (daySpent / totalDuration) * 100;
    const speed = card.attributes.completed_percentage / currentSpeed;
    return speed < 0.4;
  };

  const checkNeedsUpdate = card => {
    const lastUpdate = moment(card.attributes.updated_at);
    const now = moment();
    return now.diff(lastUpdate, 'hours') <= 72;
  };

  const cardsOverdue = userCards.filter(
    card =>
      moment(card.attributes.due_date).isBefore(moment()) &&
      card.attributes.completed_percentage != 100
  );

  const cardsNeedUpdate = userCards.filter(card => {
    if (card.attributes.updated_at)
      return card.attributes.completed_percentage == 100
        ? false
        : checkNeedsUpdate(card);
    else return false;
  });

  const cardsFarBehind = userCards.filter(card => {
    if (card.attributes.start_date && card.attributes.due_date)
      return card.attributes.completed_percentage == 100
        ? false
        : checkFarBehind(card);
    else return false;
  });

  const cardsFarBehindCount = cardsFarBehind.length;
  const cardsOverdueCount = cardsOverdue.length;

  const headerText = () => {
    if (cardsFarBehindCount >= 2 || cardsOverdueCount >= 2)
      return 'Need some help?';
    if (cardsFarBehindCount == 1 || cardsOverdueCount == 1)
      return 'Room for improvement 💪';
    else return 'Great job! 😎';
  };

  return {
    cardsNeedUpdate,
    cardsFarBehind,
    cardsOverdue,
    headerText: headerText()
  };
};

export default connect(mapState)(AttentionBox);
