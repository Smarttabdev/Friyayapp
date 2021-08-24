import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import ViewListItemChats from './ViewListItemChats';
import '../ChatPanel.module.scss';

const ViewListItem = ({ query, topic, searchQuery, onChatClick }) => {
  const [open, setOpen] = useState();

  useEffect(() => {
    setOpen(!!searchQuery);
  }, [searchQuery]);

  return (
    <Fragment>
      <div styleName="board-list-item">
        <i
          className={cn('fa', open ? 'fa-caret-down' : 'fa-caret-right')}
          styleName="board-expand-icon"
          onClick={() => setOpen(!open)}
        />
        {/* <i className="material-icons-outlined" styleName="board-icon">
          bubble_chart
        </i> */}
        <i className="material-icons icon-fa" styleName="board-icon">
          <span className="fa fa-hashtag" />
        </i>
        <div styleName="board-title">{topic?.title}</div>
      </div>
      {open &&
        queryRenderer({
          query: graphql`
            query ViewListItemQuery($topicId: ID, $chatsFilter: JSON) {
              ...ViewListItemChats_chatsQuery
                @arguments(topicId: $topicId, chatsFilter: $chatsFilter)
            }
          `,
          vars: {
            topicId: topic.id,
            chatsFilter: searchQuery
              ? `is_chat = TRUE AND title ILIKE '%${searchQuery}%'`
              : 'is_chat = TRUE'
          },
          // eslint-disable-next-line react/display-name
          render: ({ props }) => (
            <div styleName="board-chats-list">
              <ViewListItemChats
                query={query}
                chatsQuery={props}
                onChatClick={onChatClick}
              />
            </div>
          )
        })}
    </Fragment>
  );
};

ViewListItem.propTypes = {
  topic: PropTypes.object,
  chatsByTopic: PropTypes.object,
  onChatClick: PropTypes.func
};

export default ViewListItem;
