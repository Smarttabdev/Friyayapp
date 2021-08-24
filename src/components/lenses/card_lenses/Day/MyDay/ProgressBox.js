import React, { Component } from 'react';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { progressCategories } from '../categories';
import ResultBox from '../ResultBox';
import { getRelevantViewForPage } from 'Src/newRedux/interface/lenses/selectors';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);

class ProgressBox extends Component {
  state = {};

  render() {
    const { headerText } = this.props;
    return (
      <div className="progress_box">
        <div className="header">{headerText}</div>
        {progressCategories.map((item, i) => (
          <ResultBox key={i} item={item} cards={this.props[item.id]} />
        ))}
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
  let userCards = cards.filter(card =>
    card.relationships.tip_assignments.data.includes(user.id)
  );

  const lenseKey = getRelevantViewForPage(state, topicId);
  const { startDate, endDate } = timeframe[lenseKey] || timeframe;

  const rangeDates = moment.range(startDate, endDate);

  const cardsCompleted = userCards.filter(
    card =>
      card.attributes.completion_date &&
      rangeDates.contains(moment(card.attributes.completion_date))
  );

  const cardsUpdated = userCards.filter(
    card =>
      card.attributes.updated_at &&
      rangeDates.contains(moment(card.attributes.updated_at))
  );

  const cardsCreated = cards.filter(
    card =>
      rangeDates.contains(moment(card.attributes.created_at)) &&
      card.attributes.creator.id == user.id
  );

  const cardsCompletedCount = cardsCompleted.length;

  const headerText = () => {
    if (cardsCompletedCount == 0) return "Hmmmm....what's cooking?";
    if (cardsCompletedCount == 1) return 'Steady progress';
    if (cardsCompletedCount == 2 || cardsCompletedCount == 3)
      return `Excellent job, ${user.attributes.first_name} 👍😍`;
    if (cardsCompletedCount >= 4) return 'You are killing it';
  };

  return {
    cardsCompleted,
    cardsUpdated,
    cardsCreated,
    headerText: headerText()
  };
};

export default connect(mapState)(ProgressBox);
