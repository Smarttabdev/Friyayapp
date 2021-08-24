import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import LoadMore from 'Components/shared/LoadMore';
import Icon from 'Components/shared/Icon';
import { viewTopic } from 'Src/newRedux/database/topics/thunks';

const BoardListBlock = ({ topicsQuery, relay, viewTopic }) => {
  const topics = getNodes(topicsQuery?.topics);

  const handleSelectTopic = async topic => {
    viewTopic({ topicSlug: topic.slug });
  };

  return (
    <Fragment>
      <div className="mb15 bold">Boards</div>
      <div className="overflow-auto">
        {topics.map(topic => (
          <div
            key={topic.id}
            className="flex flex-r-center pointer"
            onClick={() => handleSelectTopic(topic)}
          >
            <Icon
              icon="hashtag"
              color="#9B51E0"
              containerClasses="mr10"
              style={{ fontSize: 20 }}
            />
            <div>{topic.title}</div>
          </div>
        ))}
        {!topics?.length && <div>&#x2012; No boards &#x2012;</div>}
        <LoadMore relay={relay} count={15} />
      </div>
    </Fragment>
  );
};

const BoardListBlockPagination = createPaginationContainer(
  BoardListBlock,
  {
    topicsQuery: graphql`
      fragment BoardListBlock_topicsQuery on Query
        @argumentDefinitions(cursor: { type: String }, topicId: { type: ID }) {
        topics(first: 15, after: $cursor, parentId: $topicId)
          @connection(key: "BoardListBlock_topics") {
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
      query BoardListBlocktopicsQuery($cursor: String, $topicId: ID) {
        ...BoardListBlock_topicsQuery
          @arguments(cursor: $cursor, topicId: $topicId)
      }
    `
  }
);

const mapDispatch = {
  viewTopic
};

export default {
  label: 'Board list',
  iconProps: {
    icon: 'format_list_bulleted',
    color: '#9B51E0'
  },
  Component: connect(
    null,
    mapDispatch
  )(
    QueryRenderer(
      props => (
        <BoardListBlockPagination
          {...props}
          topicsQuery={rootFragments(props)}
        />
      ),
      {
        query: graphql`
          query BoardListBlockQuery($topicId: ID) {
            ...BoardListBlock_topicsQuery @arguments(topicId: $topicId)
          }
        `,
        vars: props => ({
          topicId: toGid('Topic', props.topicId)
        })
      }
    )
  )
};
