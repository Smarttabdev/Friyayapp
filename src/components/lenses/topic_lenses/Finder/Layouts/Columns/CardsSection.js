import React from 'react';
import RenderItem from './RenderItem';
import LoadMore from 'Components/shared/LoadMore';
import ColumnAddCard from './ColumnAddCard';
import { compactFilters } from 'Lib/utilities';
import { getFilterSettings } from 'Src/helpers/user_config';
import { connect } from 'react-redux';
import { getSort } from 'Components/lenses/card_lenses/Starter/utils';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { boardTypes, cardTypes } from 'Src/components/shared/CardAndBoardTypes';

const CardsSection = props => {
  const tips = getNodes(props.query?.tips);

  return (
    <div className="cards_section">
      <div className="renderedItems">
        {tips.map((tip, i) => (
          <RenderItem key={i} tip={tip} {...props} />
        ))}
        <LoadMore relay={props.relay} style={{ margin: '5px 0' }} />
      </div>

      <ColumnAddCard topicId={props.id} />
    </div>
  );
};

const Container = createPaginationContainer(
  CardsSection,
  {
    query: graphql`
      fragment CardsSection_query on Query
        @argumentDefinitions(
          cursor: { type: String }
          sort: { type: JSON }
          filter: { type: JSON }
          topicId: { type: ID }
        ) {
        tips(
          first: 15
          after: $cursor
          sort: $sort
          filter: $filter
          topicId: $topicId
        ) @connection(key: "CardsSection_tips") {
          totalCount
          edges {
            node {
              id
              title
              slug
              cardType
            }
          }
        }
      }
    `
  },
  {
    getConnectionFromProps: props => props?.query?.tips,
    getFragmentVariables: (vars, count) => ({ ...vars, count }),
    getVariables: (props, { cursor }, vars) => ({ ...vars, cursor }),
    query: graphql`
      query CardsSectionTipsQuery(
        $cursor: String
        $sort: JSON
        $filter: JSON
        $topicId: ID
      ) {
        ...CardsSection_query
          @arguments(
            cursor: $cursor
            sort: $sort
            filter: $filter
            topicId: $topicId
          )
      }
    `
  }
);

const mapState = state => {
  const sm = stateMappings(state);
  const {
    tools: { finderLens }
  } = sm;

  const { activeFilters } = finderLens;

  let cardTypeFilters = [];

  if (activeFilters[0] != 'ALL') {
    cardTypeFilters = activeFilters
      // .filter(filterType => !boardTypes.find(bt => bt.itemType == filterType))
      .map(filterType => {
        if (['CHAT_CARD', 'VIDEO_CHAT_CARD'].includes(filterType))
          return filterType;
        else
          return cardTypes.find(ct => ct.itemType == filterType)?.type ?? null;
      });
  }

  return {
    finderLens,
    cardTypeFilters,
    filterSettings: getFilterSettings(state)
  };
};

export default connect(mapState)(
  QueryRenderer(
    props => <Container {...props} query={rootFragments(props)} />,
    {
      query: graphql`
        query CardsSectionQuery($topicId: ID, $filter: JSON, $sort: JSON) {
          ...CardsSection_query
            @arguments(topicId: $topicId, filter: $filter, sort: $sort)
        }
      `,
      vars: props => ({
        topicId: toGid('Topic', props.topicId),
        filter: {
          card_types: props.cardTypeFilters,
          title: props.finderLens.searchQuery
          // ...compactFilters(props.filterSettings),
        },
        sort: getSort(props.finderLens.sort)
      })
    }
  )
);
