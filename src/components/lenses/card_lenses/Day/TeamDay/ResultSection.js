import React, { Component } from 'react';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);
import { progressCategories, attentionCategories } from '../categories';
import ResultBox from '../ResultBox';
import { getRelevantViewForPage } from 'Src/newRedux/interface/lenses/selectors';

class ResultSection extends Component {
  render() {
    return (
      <div className="results_section">
        <div className="progress_section">
          <div className="header" style={{ marginBottom: '10px' }}>
            Steady Progress
          </div>
          {progressCategories.map((item, i) => (
            <ResultBox key={i} item={item} cards={this.props[item.id]} />
          ))}
        </div>
        <div className="attention_section">
          <div className="header" style={{ marginBottom: '10px' }}>
            Needs Attention
          </div>
          {attentionCategories.map((item, i) => (
            <ResultBox key={i} item={item} cards={this.props[item.id]} />
          ))}
        </div>
      </div>
    );
  }
}

const mapState = (state, props) => {
  const {
    tools: { timeframe },
    page: { topicId }
  } = stateMappings(state);
  const { cards, user } = props;
  const isUser = user.id != 'team';
  let userCards = cards.filter(card =>
    card.relationships.tip_assignments.data.includes(user.id)
  );

  const lenseKey = getRelevantViewForPage(state, topicId);
  const { startDate, endDate } = timeframe[lenseKey] || timeframe;

  const rangeDates = moment.range(startDate, endDate);

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

  const cardsOverdue = (isUser ? userCards : cards).filter(
    card =>
      moment(card.attributes.due_date).isBefore(moment()) &&
      card.attributes.completed_percentage != 100
  );

  const cardsNeedUpdate = (isUser ? userCards : cards).filter(card => {
    if (card.attributes.updated_at)
      return card.attributes.completed_percentage == 100
        ? false
        : checkNeedsUpdate(card);
    else return false;
  });

  const cardsFarBehind = (isUser ? userCards : cards).filter(card => {
    if (card.attributes.start_date && card.attributes.due_date)
      return card.attributes.completed_percentage == 100
        ? false
        : checkFarBehind(card);
    else return false;
  });

  const cardsCreated = !isUser
    ? cards.filter(card =>
        rangeDates.contains(moment(card.attributes.created_at))
      )
    : cards.filter(
        card =>
          rangeDates.contains(moment(card.attributes.created_at)) &&
          card.attributes.creator.id == user.id
      );

  const cardsCompleted = (isUser ? userCards : cards).filter(
    card =>
      card.attributes.completion_date &&
      rangeDates.contains(moment(card.attributes.completion_date))
  );

  const cardsUpdated = (isUser ? userCards : cards).filter(
    card =>
      card.attributes.updated_at &&
      rangeDates.contains(moment(card.attributes.updated_at))
  );

  return {
    cardsCompleted,
    cardsUpdated,
    cardsCreated,
    cardsNeedUpdate,
    cardsFarBehind,
    cardsOverdue
  };
};

export default connect(mapState)(ResultSection);
