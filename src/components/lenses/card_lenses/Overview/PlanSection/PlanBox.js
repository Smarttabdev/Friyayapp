import React, { Component } from 'react';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import PlanBoxHeader from './PlanBoxHeader';
import PlanBoxCard from './PlanBoxCard';
import PlanBoxFooter from './PlanBoxFooter';
import DMLoader from 'Src/dataManager/components/DMLoader';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);

class PlanBox extends Component {
  state = { trimTo: 3 };

  handleLoadMoreCards = () => {
    this.setState(prev => ({ trimTo: prev.trimTo + 5 }));
  };

  render() {
    const {
      type,
      cards,
      cardsForType,
      completedCards,
      completionLevel,
      cardRequirements
    } = this.props;
    const { trimTo } = this.state;
    const trimmedCards = cardsForType.slice(0, trimTo);
    const cardsDifference = cardsForType.length - trimmedCards.length;
    return (
      <div
        className={`plan_box ${type}_box`}
        style={{ marginTop: type == 'team' ? '30px' : '0' }}
      >
        <PlanBoxHeader
          type={type}
          cards={cardsForType}
          completedCards={completedCards}
          completionLevel={completionLevel}
        />
        <div className="card_section">
          {cardsForType.length == 0 && (
            <div style={{ padding: '20px' }}>No Cards</div>
          )}
          {trimmedCards.map((card, i) => (
            <PlanBoxCard key={i} card={card} />
          ))}
          <DMLoader
            dataRequirements={{
              cardsWithAttributes: { attributes: cardRequirements }
            }}
            loaderKey="cardsWithAttributes"
            style={{ display: 'none' }}
          />
          {cardsDifference != 0 && (
            <div className="more_cards">
              <div onClick={this.handleLoadMoreCards}>
                {cardsDifference} more Card{cardsDifference == 1 ? null : 's'}
              </div>
            </div>
          )}
        </div>
        <PlanBoxFooter
          type={type}
          cards={cardsForType}
          completionLevel={completionLevel}
        />
      </div>
    );
  }
}

const mapState = (state, props) => {
  const sm = stateMappings(state);
  const {
    tools: { timeframe }
  } = sm;
  const { user, cards } = props;
  const { columnMode, startDate, endDate } = timeframe;

  const checkDueDate = due_date => {
    if (!due_date) return false;
    if (columnMode != 'days') {
      const rangeDates = moment.range(startDate, endDate);
      return rangeDates.contains(moment(due_date));
    } else
      return (
        startDate.format('DD MM YYYY') == moment(due_date).format('DD MM YYYY')
      );
  };

  let cardsForType = cards.filter(card =>
    user
      ? card.relationships.tip_assignments.data.includes(user.id) &&
        checkDueDate(card.attributes.due_date)
      : checkDueDate(card.attributes.due_date)
  );

  cardsForType.sort(
    (a, b) => new Date(a.attributes.due_date) - new Date(b.attributes.due_date)
  );

  const completedCards = cardsForType.filter(
    card => card.attributes.completed_percentage == 100
  );
  const completionLevel = Math.floor(
    (completedCards.length / cardsForType.length) * 100
  );

  return {
    cardsForType,
    completedCards,
    completionLevel: isFinite(completionLevel) ? completionLevel : 0,
    cardRequirements: {
      ...props.cardRequirements,
      dueDateFrom: moment(startDate).toISOString(),
      dueDateTo: moment(endDate).toISOString()
    }
  };
};

const mapDispatch = {};

export default connect(mapState, mapDispatch)(PlanBox);
