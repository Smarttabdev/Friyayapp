import React from 'react';
import Icon from 'Components/shared/Icon';
import TabButton from '../TabButton';
import { useTipCreatedUpdatedSubscription } from 'Lib/hooks';

const ActivitiesButton = ({ tipsQuery, relay, topicId, active, onClick }) => {
  useTipCreatedUpdatedSubscription(topicId, () => relay.refetch(vars => vars));

  return (
    <TabButton
      label="Activities"
      icon={
        <Icon
          icon="featured_play_list"
          outlined
          color="#6FCF97"
          style={{ fontSize: 18, marginTop: -2 }}
        />
      }
      count={tipsQuery?.tips?.totalCount}
      darkColor="#6FCF97"
      lightColor="#C5FFDD"
      active={active}
      onClick={onClick}
    />
  );
};

const RefetchContainer = createRefetchContainer(
  ActivitiesButton,
  {
    tipsQuery: graphql`
      fragment ActivitiesButton_tipsQuery on Query
        @argumentDefinitions(
          topicsParams: { type: JSON }
          topicId: { type: ID }
        ) {
        tips(
          topicsParams: $topicsParams
          topicId: $topicId
          filter: "title != ''"
        ) {
          totalCount
        }
      }
    `
  },
  graphql`
    query ActivitiesButtonRefetchQuery($topicsParams: JSON, $topicId: ID) {
      ...ActivitiesButton_tipsQuery
        @arguments(topicsParams: $topicsParams, topicId: $topicId)
    }
  `
);

export default QueryRenderer(
  props => <RefetchContainer {...props} tipsQuery={props} />,
  {
    query: graphql`
      query ActivitiesButtonQuery($topicsParams: JSON, $topicId: ID) {
        ...ActivitiesButton_tipsQuery
          @arguments(topicsParams: $topicsParams, topicId: $topicId)
      }
    `,
    vars: ({ topicId, projectId }) => ({
      topicsParams: {
        parent_id: toId(topicId),
        tagged: ['project']
      },
      topicId: toId(projectId) || null
    })
  }
);
