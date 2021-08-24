import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import IconDropdownMenu from 'Components/shared/IconDropdownMenu';
import { setShowChatModal } from 'Src/newRedux/interface/modals/actions';
import ChatUserNames from 'Components/shared/chat/ChatPanel/ChatUserNames';
import LoadMore from 'Components/shared/LoadMore';
import { useTipCreatedUpdatedSubscription } from 'src/lib/hooks';

const ChatDropdownMenu = props => {
  const {
    cardFontColor,
    setShowChatModal,
    chatsQuery,
    relay,
    topicHeader,
    topicId
  } = props;
  const refetch = () => relay.refetchConnection(15);
  useTipCreatedUpdatedSubscription(topicId, refetch);

  const [animate, setAnimate] = useState(false);

  const chats = getNodes(chatsQuery?.chats);

  useEffect(() => {
    setAnimate(true);

    setTimeout(() => {
      setAnimate(false);
    }, 5000);
  }, [chatsQuery?.chats?.totalCount]);

  const handleChatClick = chatId => () =>
    setShowChatModal({ isOpen: true, chatId: toId(chatId) });

  const toggleFirst = () => {};

  const itemList = chats.map(chat => {
    return {
      id: chat.id,
      title: (
        <Fragment>
          {chat.title} -&nbsp;
          <ChatUserNames chat={chat} query={rootFragments(props)} />
        </Fragment>
      ),
      clickHandler: handleChatClick(chat.id)
    };
  });
  if (relay.hasMore()) {
    itemList.push({
      id: 'loadMore',
      title: <LoadMore relay={relay} count={15} />,
      noIcon: true,
      clickHandler: e => e.stopPropagation()
    });
  }
  const toggleList = [
    {
      title: 'Keep open on Board',
      toggleState: false,
      toggleHandler: toggleFirst
    }
  ];

  return (
    <IconDropdownMenu
      dropdownStyle={{ left: 'unset', right: 0 }}
      title="Chats"
      icon="question_answer"
      color="#F2C94C"
      outlined
      cardFontColor={cardFontColor}
      itemList={itemList}
      toggleList={toggleList}
      count={chatsQuery?.chats?.totalCount}
      additionalClasses={'mt2 medium-icon'}
      badgeTopMargin={'-8px'}
      animate={animate}
      topicHeader={topicHeader}
    />
  );
};

const mapState = (state, props) => {
  const {
    page: { topicId: pageTopicId },
    utilities: { active_design }
  } = stateMappings(state);

  const topicId = props?.topic?.id || pageTopicId;

  return {
    topicId,
    cardFontColor: active_design.card_font_color
  };
};

const mapDispatch = {
  setShowChatModal
};

const PaginationContainer = createPaginationContainer(
  ChatDropdownMenu,
  {
    chatsQuery: graphql`
      fragment ChatDropdownMenu_chatsQuery on Query
        @argumentDefinitions(cursor: { type: String }, topicId: { type: ID }) {
        chats: tips(
          first: 10
          after: $cursor
          filter: "is_chat = TRUE"
          sort: "created_at asc"
          topicId: $topicId
          subtopics: true
        ) @connection(key: "ChatDropdownMenu_chats") {
          totalCount
          edges {
            node {
              id
              title
              ...ChatUserNames_chat
            }
          }
        }
      }
    `
  },
  {
    getConnectionFromProps: props => props?.chatsQuery?.chats,
    getFragmentVariables: (prevVars, count) => ({ ...prevVars, count }),
    getVariables: (_props, { cursor }, fragmentVars) => ({
      ...fragmentVars,
      cursor
    }),
    query: graphql`
      query ChatDropdownMenuChatsPaginationQuery(
        $cursor: String
        $topicId: ID
      ) {
        ...ChatDropdownMenu_chatsQuery
          @arguments(cursor: $cursor, topicId: $topicId)
      }
    `
  }
);

export default connect(
  mapState,
  mapDispatch
)(
  QueryRenderer({
    query: graphql`
      query ChatDropdownMenuQuery($topicId: ID) {
        ...ChatUserNames_query
        ...ChatDropdownMenu_chatsQuery @arguments(topicId: $topicId)
      }
    `,
    vars: props => ({
      topicId: toGid('Topic', props.topicId)
    }),
    component: props => <PaginationContainer {...props} chatsQuery={props} />
  })
);
