import React, { Component } from 'react';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { getCustomLensId } from 'Src/helpers/user_config';
import { getRelevantViewForPage } from 'Src/newRedux/interface/lenses/selectors';
import PlanBox from './PlanBox';

class PlanSection extends Component {
  render() {
    const { cards, user, otherIds, cardRequirements } = this.props;
    return (
      <div className="plan_section">
        {['my', 'team'].map((type, i) => (
          <PlanBox
            key={i}
            type={type}
            user={type == 'my' ? user : null}
            cards={cards}
            cardRequirements={{
              ...cardRequirements,
              assignedId: type == 'my' ? user.id : otherIds
            }}
          />
        ))}
      </div>
    );
  }
}

const hoc = Component => props => {
  const peopleIds =
    props.activePeopleOrderQuery?.activePeopleOrder?.order || [];

  const otherIds = peopleIds.filter(id => {
    return props.user && id != props.user.id && !isNaN(id);
  });

  return <Component {...props} otherIds={otherIds} />;
};

const mapState = (state, props) => {
  const {
    tools: {
      timeframe: { startDate, endDate }
    },
    page: { topicId }
  } = stateMappings(state);
  const { user } = props;
  const lenseId = getCustomLensId(state);
  const lenseKey = getRelevantViewForPage(state);
  return {
    topicId,
    lenseId,
    lenseKey,
    user,
    cardRequirements: {
      ...props.cardRequirements,
      dueDateFrom: moment(startDate).toISOString(),
      dueDateTo: moment(endDate).toISOString()
    }
  };
};

const FragmentContainer = createFragmentContainer(hoc(PlanSection), {
  activePeopleOrderQuery: graphql`
    fragment PlanSection_activePeopleOrderQuery on Query
      @argumentDefinitions(
        topicId: { type: ID }
        lenseId: { type: ID }
        lenseKey: { type: String }
      ) {
      activePeopleOrder: activeCustomOrder(
        orderType: people
        topicId: $topicId
        lenseId: $lenseId
        lenseKey: $lenseKey
      ) {
        id
        name
        order
      }
    }
  `
});

export default connect(mapState)(
  QueryRenderer(
    props => <FragmentContainer {...props} activePeopleOrderQuery={props} />,
    {
      query: graphql`
        query PlanSectionQuery($topicId: ID!, $lenseId: ID, $lenseKey: String) {
          ...PlanSection_activePeopleOrderQuery
            @arguments(
              topicId: $topicId
              lenseId: $lenseId
              lenseKey: $lenseKey
            )
        }
      `,
      vars: ({ topicId, lenseId, lenseKey }) => ({
        topicId: toGid('Topic', topicId || 0),
        lenseId: toGid('Lens', lenseId),
        lenseKey
      })
    }
  )
);
