import React, { Fragment } from 'react';
import LoadMore from 'Components/shared/LoadMore';
import TopicItem from './FileListBlock/TopicItem';

const TopicList = ({ topicsQuery, relay }) => {
  const topics = getNodes(topicsQuery?.topics);
  return (
    <Fragment>
      <div className="mb15 bold">Files list</div>
      <div className="overflow-auto">
        {topics.map(topic => (
          <TopicItem key={topic.id} topic={topic} />
        ))}
        {!topics?.length && <div>&#x2012; No boards &#x2012;</div>}
        <LoadMore relay={relay} count={15} />
      </div>
    </Fragment>
  );
};

const TopicListPagination = createPaginationContainer(
  TopicList,
  {
    topicsQuery: graphql`
      fragment FileListBlock_topicsQuery on Query
        @argumentDefinitions(cursor: { type: String }, parentId: { type: ID }) {
        topics(
          first: 15
          after: $cursor
          parentId: $parentId
          havingTips: { have_files: true }
        ) @connection(key: "FileListBlock_topics") {
          edges {
            node {
              id
              title
              slug
            }
          }
        }
      }
    `
  },
  {
    getConnectionFromProps: props => props?.topicsQuery?.topics,
    getFragmentVariables: (vars, count) => ({ ...vars, count }),
    getVariables: (_props, { cursor }, vars) => ({ ...vars, cursor }),
    query: graphql`
      query FileListBlockTopicsQuery($cursor: String, $parentId: ID) {
        ...FileListBlock_topicsQuery
          @arguments(cursor: $cursor, parentId: $parentId)
      }
    `
  }
);

export default {
  label: 'File list',
  iconProps: {
    icon: 'format_list_bulleted',
    color: '#F2994A'
  },
  Component: QueryRenderer(
    props => (
      <TopicListPagination {...props} topicsQuery={rootFragments(props)} />
    ),
    {
      query: graphql`
        query FileListBlockQuery($parentId: ID) {
          ...FileListBlock_topicsQuery @arguments(parentId: $parentId)
        }
      `,
      vars: props => ({
        parentId: toGid('Topic', props.topicId)
      })
    }
  )
};
