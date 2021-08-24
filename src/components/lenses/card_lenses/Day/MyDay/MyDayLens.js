import React, { Component } from 'react';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import ActivityBox from '../ActivityBox';
import ProgressBox from './ProgressBox';
import AttentionBox from './AttentionBox';
import { getActivities } from 'Src/newRedux/database/activity/thunks';
import DMLoader from 'Src/dataManager/components/DMLoader';
import { getRelevantViewForPage } from 'Src/newRedux/interface/lenses/selectors';

class MyDayLens extends Component {
  async componentDidMount() {
    const { getActivities, startDate, endDate } = this.props;
    await getActivities({ from: startDate.format(), to: endDate.format() });
  }

  async componentDidUpdate(prevProps) {
    const { getActivities, startDate, endDate } = this.props;
    if (prevProps.startDate != this.props.startDate) {
      await getActivities({ from: startDate.format(), to: endDate.format() });
    }
  }

  render() {
    const { cards, user, cardRequirements } = this.props;
    return (
      <div className="day_lenses">
        <div className="my_day_lens">
          <div className="activity_section sections">
            <ActivityBox user={user} />
          </div>
          <div className="progress_section sections">
            <ProgressBox user={user} cards={cards} />
          </div>
          <div className="attention_section sections">
            <AttentionBox {...this.props} />
          </div>
        </div>
        {this.props.cards.length < 350 && (
          <DMLoader
            dataRequirements={{
              cardsWithAttributes: { attributes: cardRequirements }
            }}
            loaderKey="cardsWithAttributes"
            style={{ display: 'none' }}
          />
        )}
      </div>
    );
  }
}

const mapState = (state, props) => {
  const sm = stateMappings(state);
  const {
    page: { topicId },
    user,
    tools: { timeframe }
  } = sm;
  let cards = topicId ? props.cards : sm.cards;

  !topicId && (cards = Object.keys(cards).map(id => cards[id]));

  const lenseKey = getRelevantViewForPage(state);
  const { startDate, endDate } = timeframe[lenseKey] || timeframe;

  return {
    cards,
    user,
    startDate,
    endDate,
    cardRequirements: {
      ...props.cardRequirements,
      assignedId: user.id,
      ccuDateFrom: moment(startDate).format(),
      ccuDateTo: moment(endDate).format()
    }
  };
};

const mapDispatch = {
  getActivities
};

export default connect(mapState, mapDispatch)(MyDayLens);
