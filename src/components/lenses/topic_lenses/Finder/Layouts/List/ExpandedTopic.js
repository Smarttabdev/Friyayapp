import React from 'react';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import ListLayout from './ListLayout';

const ExpandedTopic = props => {
  return (
    <>
      <ListLayout
        id={props.id}
        items={getNodes(props.query?.items)}
        handleClickTitle={props.handleClickTitle}
        paginationRelay={props.relay}
      />
    </>
  );
};

const ExpandedTopicContainer = createPaginationContainer(
  ExpandedTopic,
  {
    query: graphql`
      fragment ExpandedTopic_query on Query
        @argumentDefinitions(
          cursor: { type: String }
          topicId: { type: ID }
          itemTypes: { type: "[ItemTypeEnum!]" }
          sort: { type: JSON }
        ) {
        items(
          first: 15
          after: $cursor
          topicId: $topicId
          itemTypes: $itemTypes
          sort: $sort
        ) @connection(key: "ExpandedTopic_items") {
          totalCount
          edges {
            node {
              id
              itemId
              title
              slug
              baseType
              itemType
              tip {
                id
                parent {
                  id
                  title
                }
                topic {
                  id
                  title
                }
              }
              topic {
                id
                parent {
                  id
                  title
                }
              }
            }
          }
        }
      }
    `
  },
  {
    getConnectionFromProps: props => props?.query?.items,
    getFragmentVariables: (vars, count) => ({ ...vars, count }),
    getVariables: (props, { cursor }, vars) => ({ ...vars, cursor }),
    query: graphql`
      query ExpandedTopicItemsQuery(
        $cursor: String
        $topicId: ID
        $sort: JSON
        $itemTypes: [ItemTypeEnum!]
      ) {
        ...ExpandedTopic_query
          @arguments(
            cursor: $cursor
            sort: $sort
            topicId: $topicId
            itemTypes: $itemTypes
          )
      }
    `
  }
);

const mapState = state => {
  const {
    tools: { finderLens }
  } = stateMappings(state);

  return {
    finderLens
  };
};

export default connect(mapState)(
  QueryRenderer(props => <ExpandedTopicContainer {...props} query={props} />, {
    query: graphql`
      query ExpandedTopicQuery(
        $cursor: String
        $topicId: ID
        $sort: JSON
        $itemTypes: [ItemTypeEnum!]
      ) {
        ...ExpandedTopic_query
          @arguments(
            cursor: $cursor
            topicId: $topicId
            sort: $sort
            itemTypes: $itemTypes
          )
      }
    `,
    vars: props => ({
      topicId: toGid('Topic', props.id),
      sort: { created_at: 'desc' },
      itemTypes: props.finderLens.activeFilters.filter(x => x != 'ALL')
    })
  })
);
