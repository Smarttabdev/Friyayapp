import React, { Component } from 'react';
import RecentSection from './RecentSection';
import PlanSection from './PlanSection/PlanSection';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';

class OverviewLens extends Component {
  render() {
    return (
      <div className="overview_lens">
        <PlanSection {...this.props} />
        <RecentSection {...this.props} />
      </div>
    );
  }
}

const mapState = (state, props) => {
  const sm = stateMappings(state);
  const {
    page: { topicId },
    user
  } = sm;
  let cards = topicId ? props.cards : sm.cards;

  !topicId && (cards = Object.keys(cards).map(id => cards[id]));

  cards.sort(
    (a, b) =>
      new Date(b.attributes.created_at) - new Date(a.attributes.created_at)
  );

  return {
    cards,
    user
  };
};

export default connect(mapState)(OverviewLens);
