import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

import LoadMore from 'Components/shared/LoadMore';
import { viewCard } from 'Src/newRedux/database/cards/thunks';
import { getFilterSettings } from 'Src/helpers/user_config';
import TipItem from './FileBlock/TipItem';
import { attachmentsUpdater } from './FileBlock/utils';

const FileBlock = ({ tipsQuery, relay, viewCard, topicId, filterSettings }) => {
  const tips = getNodes(tipsQuery?.tips);

  const handleSelectTip = async tip => {
    viewCard({ cardSlug: tip.slug });
  };

  useEffect(() => {
    const disposers = [];
    disposers.push(
      requestSubscription({
        subscription: graphql`
          subscription FileBlockAttachmentCreatedSubscription($topicId: ID!) {
            attachmentCreated(topicId: $topicId) {
              attachment {
                id
                url
                tip {
                  id
                  title
                  slug
                }
              }
            }
          }
        `,
        vars: {
          topicId: toGid('Topic', topicId || 0)
        },
        updater: store => {
          attachmentsUpdater({
            topicId,
            filterSettings,
            connectionField: '__FileBlock_tips_connection',
            connectionVars: {
              topicId: toGid('Topic', topicId),
              haveFiles: true,
              subtopics: filterSettings?.include_subtopic_cards,
              root: !filterSettings?.include_nested_cards
            },
            store
          });
        }
      })
    );
    return () => disposers.forEach(d => d.dispose());
  }, [topicId]);

  return (
    <Fragment>
      <div className="mb15 bold">Files</div>
      <div className="overflow-auto">
        {tips.map(tip => (
          <TipItem
            key={tip.id}
            tip={tip}
            onClickTip={handleSelectTip}
            topicId={topicId}
            filterSettings={filterSettings}
            connectionField="__FileBlock_tips_connection"
          />
        ))}
        {!tips?.length && <div>&#x2012; No cards &#x2012;</div>}
        <LoadMore relay={relay} count={15} />
      </div>
    </Fragment>
  );
};

const FileBlockPagination = createPaginationContainer(
  FileBlock,
  {
    tipsQuery: graphql`
      fragment FileBlock_tipsQuery on Query
        @argumentDefinitions(
          cursor: { type: String }
          topicId: { type: ID }
          subtopics: { type: Boolean }
          root: { type: Boolean }
        ) {
        tips(
          first: 15
          after: $cursor
          topicId: $topicId
          subtopics: $subtopics
          root: $root
          haveFiles: true
        ) @connection(key: "FileBlock_tips") {
          edges {
            node {
              id
              ...TipItem_tip
            }
          }
        }
      }
    `
  },
  {
    getConnectionFromProps: props => props?.tipsQuery?.tips,
    getFragmentVariables: (vars, count) => ({ ...vars, count }),
    getVariables: (_props, { cursor }, vars) => ({ ...vars, cursor }),
    query: graphql`
      query FileBlockTipsQuery(
        $cursor: String
        $topicId: ID
        $subtopics: Boolean
        $root: Boolean
      ) {
        ...FileBlock_tipsQuery
          @arguments(
            cursor: $cursor
            topicId: $topicId
            subtopics: $subtopics
            root: $root
          )
      }
    `
  }
);

const mapState = state => {
  return {
    filterSettings: getFilterSettings(state)
  };
};

const mapDispatch = {
  viewCard
};

export default {
  label: 'File',
  iconProps: {
    icon: 'insert_drive_file',
    color: '#F2994A',
    outlined: true
  },
  Component: connect(
    mapState,
    mapDispatch
  )(
    QueryRenderer(
      props => (
        <FileBlockPagination {...props} tipsQuery={rootFragments(props)} />
      ),
      {
        query: graphql`
          query FileBlockQuery(
            $topicId: ID
            $subtopics: Boolean
            $root: Boolean
          ) {
            ...FileBlock_tipsQuery
              @arguments(topicId: $topicId, subtopics: $subtopics, root: $root)
          }
        `,
        vars: props => ({
          topicId: toGid('Topic', props.topicId),
          subtopics: props.filterSettings?.include_subtopic_cards,
          root: !props.filterSettings.include_nested_cards
        })
      }
    )
  )
};
