import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import TipListItem from 'Components/shared/TipSelector/TipListItem';
import LoadMore from 'Components/shared/LoadMore';
import { getFilterSettings } from 'Src/helpers/user_config';
import { setShowVideoRoomModal } from 'Src/newRedux/interface/modals/actions';
import { getCard } from 'Src/newRedux/database/cards/thunks';

const VideoChatListBlock = ({
  tipsQuery,
  relay,
  getCard,
  setShowVideoRoomModal
}) => {
  const tips = getNodes(tipsQuery?.tips);

  const handleSelectTip = async tip => {
    await getCard(toId(tip.id));
    setShowVideoRoomModal({ isOpen: true, videoRoomId: toId(tip.id) });
  };

  return (
    <Fragment>
      <div className="mb15 bold">Video Chats</div>
      <div className="overflow-auto">
        {tips.map(tip => (
          <TipListItem
            key={tip.id}
            tip={tip}
            iconProps={{ icon: 'videocam', color: '#EB5757', outlined: true }}
            onClick={() => handleSelectTip(tip)}
          />
        ))}
        {!tips?.length && <div>&#x2012; No video chats &#x2012;</div>}
        <LoadMore relay={relay} count={15} />
      </div>
    </Fragment>
  );
};

const VideoChatListBlockPagination = createPaginationContainer(
  VideoChatListBlock,
  {
    tipsQuery: graphql`
      fragment VideoChatListBlock_tipsQuery on Query
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
          isVideoChat: true
        ) @connection(key: "VideoChatListBlock_tips") {
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
    getConnectionFromProps: props => props?.tipsQuery?.tips,
    getFragmentVariables: (vars, count) => ({ ...vars, count }),
    getVariables: (_props, { cursor }, vars) => ({ ...vars, cursor }),
    query: graphql`
      query VideoChatListBlockTipsQuery(
        $cursor: String
        $topicId: ID
        $subtopics: Boolean
        $root: Boolean
      ) {
        ...VideoChatListBlock_tipsQuery
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
  getCard,
  setShowVideoRoomModal
};

export default {
  label: 'Video chat list',
  iconProps: {
    icon: 'format_list_bulleted',
    color: '#EB5757'
  },
  Component: connect(
    mapState,
    mapDispatch
  )(
    QueryRenderer(
      props => (
        <VideoChatListBlockPagination
          {...props}
          tipsQuery={rootFragments(props)}
        />
      ),
      {
        query: graphql`
          query VideoChatListBlockQuery(
            $topicId: ID
            $subtopics: Boolean
            $root: Boolean
          ) {
            ...VideoChatListBlock_tipsQuery
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
