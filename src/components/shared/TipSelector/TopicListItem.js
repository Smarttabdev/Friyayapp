import React, { Fragment, useState, useEffect } from 'react';
import cn from 'classnames';

import TopicListItemTips from './TopicListItemTips';
import './TipSelector.module.scss';

const TopicListItem = ({ topic, searchQuery, tipsFilter, onTipClick }) => {
  const [open, setOpen] = useState();

  useEffect(() => {
    setOpen(!!searchQuery);
  }, [searchQuery]);

  return (
    <Fragment>
      <div styleName="topic-list-item">
        <i
          className={cn('fa', open ? 'fa-caret-down' : 'fa-caret-right')}
          styleName="topic-expand-icon"
          onClick={() => setOpen(!open)}
        />
        <i className="material-icons icon-fa" styleName="topic-icon">
          <span className="fa fa-hashtag" />
        </i>
        <div>{topic?.title}</div>
      </div>
      {open &&
        queryRenderer({
          query: graphql`
            query TopicListItemQuery($topicId: ID, $tipsFilter: JSON) {
              ...TopicListItemTips_tipsQuery
                @arguments(topicId: $topicId, tipsFilter: $tipsFilter)
            }
          `,
          vars: {
            topicId: topic.id,
            tipsFilter
          },
          // eslint-disable-next-line react/display-name
          render: ({ props }) => (
            <div styleName="topic-tip-list">
              <TopicListItemTips tipsQuery={props} onTipClick={onTipClick} />
            </div>
          )
        })}
    </Fragment>
  );
};

export default TopicListItem;
