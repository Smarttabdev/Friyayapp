import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import StarterHeader from '../Starter/StarterHeader';
import { updateInboxLens } from 'Src/newRedux/interface/lenses/actions';
import InboxLensActivity from './InboxLensActivity';
import InboxLensFilters from './InboxLensFilters';
import { getSortedTopicArray } from 'Src/newRedux/database/topics/selectors';
import InboxLensTopicFilters from './InboxLensTopicFilters';
import LoadMore from 'Components/shared/LoadMore';
import { cardTypes } from 'Src/components/shared/CardAndBoardTypes';

const hoc = Component => props => {
  useEffect(() => {
    const disposer = subscriptions.activityCreated({
      onNext: data => {
        props.relay.refetchConnection(30);
      }
    });
    return () => disposer.dispose();
  }, []);
  return <Component {...props} />;
};

const TipsContainer = hoc(({ tipsQuery, relay }) => {
  const tips = getNodes(tipsQuery?.tips);
  return (
    <>
      {tips
        // .filter(tip => tip.cardType != 'SYSTEM')
        .map(tip => (
          <InboxLensActivity key={tip.id} card={tip} />
        ))}
      <LoadMore relay={relay} className="mt15" />
    </>
  );
});

const TipsPaginationContainer = createPaginationContainer(
  TipsContainer,
  {
    tipsQuery: graphql`
      fragment InboxLens_tipsQuery on Query
        @argumentDefinitions(
          cursor: { type: String }
          topicsParams: { type: JSON }
          filter: { type: JSON }
          labels: { type: "[ID!]" }
        ) {
        tips(
          first: 30
          after: $cursor
          topicsParams: $topicsParams
          filter: $filter
          labels: $labels
        ) @connection(key: "InboxLens_tips") {
          totalCount
          edges {
            node {
              id
              title
              slug
              cardType
              updatedAt
              tipAssignments {
                assignmentType
                assignmentId
              }
              labels {
                id
                name
                kind
                color
              }
              activities {
                id
                action
                read
                createdAt
                object {
                  ... on Label {
                    id
                    name
                    kind
                    color
                  }
                }
                notifier {
                  id
                  firstName
                  name
                  avatarUrl
                }
                user {
                  id
                  firstName
                  name
                  avatarUrl
                }
              }
              user {
                id
                firstName
                name
                avatarUrl
              }
            }
          }
        }
      }
    `
  },
  {
    getConnectionFromProps: props => props?.tipsQuery?.tips,
    getFragmentVariables: (vars, count) => ({ ...vars, count }),
    getVariables: (props, { cursor }, vars) => ({ ...vars, cursor }),
    query: graphql`
      query InboxLensTipsPaginationQuery(
        $cursor: String
        $topicsParams: JSON
        $filter: JSON
        $labels: [ID!]
      ) {
        ...InboxLens_tipsQuery
          @arguments(
            cursor: $cursor
            topicsParams: $topicsParams
            filter: $filter
            labels: $labels
          )
      }
    `
  }
);

class InboxLens extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeUserTypeFilter: { title: 'Team', isSelected: true }
    };
  }

  componentDidMount() {
    this.props.updateInboxLens({ topicIds: [this.props.topicId] });
  }

  componentDidUpdate(prevProps) {
    if (this.props.inboxLens.topicIds?.length < 1)
      this.props.updateInboxLens({ topicIds: [this.props.topicId] });
  }

  setActiveFilter = (type, value) => {
    if (type == 'TOPICS_FILTER') {
      this.props.updateInboxLens({ topicIds: value });
    } else if (type == 'USER_FILTER') {
      this.props.updateInboxLens({ userIds: value });
    } else if (type == 'LABEL_FILTER') {
      this.props.updateInboxLens({ labelIds: value });
    }
  };

  onCardTypeFilterClick = type => {
    let activeFilters = this.props.inboxLens.activeFilters || [];
    if (type === 'ALL') {
      activeFilters = ['ALL'];
    } else {
      activeFilters = activeFilters.find(t => t == type)
        ? activeFilters.filter(t => t != type)
        : activeFilters.concat(type);
      activeFilters = activeFilters.filter(t => t != 'ALL');
    }
    if (!activeFilters.length) {
      activeFilters.push('ALL');
    }
    this.props.updateInboxLens({ activeFilters });
  };

  render() {
    const {
      topic,
      topics,
      inboxLens,
      active_design: { card_font_color }
    } = this.props;
    return (
      <div
        className="inbox_lens_container"
        style={{ color: card_font_color ? card_font_color : '' }}
      >
        <StarterHeader
          topic={topic}
          activeFilters={inboxLens.activeFilters}
          onFilterClick={this.onCardTypeFilterClick}
          onlyCardsTools
        />
        <InboxLensFilters setActiveFilter={this.setActiveFilter} />
        <div className="main_section">
          <div className="updates_section">
            {queryRenderer({
              query: graphql`
                query InboxLensTipsQuery(
                  $topicsParams: JSON
                  $filter: JSON
                  $labels: [ID!]
                ) {
                  ...InboxLens_tipsQuery
                    @arguments(
                      topicsParams: $topicsParams
                      filter: $filter
                      labels: $labels
                    )
                }
              `,
              vars: {
                // How to know topicsParams acceptable properties ?
                topicsParams: {
                  ids: inboxLens.topicIds,
                  all: true,
                  subtopics: true
                },
                filter: {
                  card_types: inboxLens.activeFilters
                    ?.filter(t => t != 'ALL')
                    .map(filterType => {
                      if (['CHAT_CARD', 'VIDEO_CHAT_CARD'].includes(filterType))
                        return filterType;
                      else
                        return cardTypes.find(ct => ct.itemType == filterType)
                          .type;
                    }),
                  not_card_types: ['SYSTEM']
                },
                labels: inboxLens.labelIds
              },
              render: ({ props }) => (
                <TipsPaginationContainer tipsQuery={props} />
              )
            })}
          </div>
          <InboxLensTopicFilters
            topics={topics}
            setActiveFilter={this.setActiveFilter}
          />
        </div>
      </div>
    );
  }
}

const mapState = (state, props) => {
  const sm = stateMappings(state);
  const {
    page: { topicId },
    tools: { inboxLens },
    utilities: { active_design },
    user
  } = sm;

  const topics = getSortedTopicArray(state);

  return {
    topics,
    inboxLens,
    active_design,
    currentUser: user,
    topicId
  };
};

const mapDispatch = {
  updateInboxLens
};

export default connect(mapState, mapDispatch)(InboxLens);
