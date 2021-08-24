import React, { useState } from 'react';

import TopicsPage from './Comments/TopicsPage';
import CommentsPage from './Comments/CommentsPage';

import '../styles.module.scss';

const pages = {
  BOARDS: 'BOARDS',
  COMMENTS: 'COMMENTS'
};

const Comments = () => {
  const [page, setPage] = useState(pages.COMMENTS);
  const [topicId, setTopicId] = useState();

  const handeSelectTopic = id => {
    setTopicId(id);
    setPage(pages.COMMENTS);
  };

  const pageRenderers = {
    // eslint-disable-next-line react/display-name
    [pages.BOARDS]: () => <TopicsPage onSelectTopic={handeSelectTopic} />,
    // eslint-disable-next-line react/display-name
    [pages.COMMENTS]: () => (
      <CommentsPage topicId={topicId} onBack={() => setPage(pages.BOARDS)} />
    )
  };

  return (
    <div styleName={`panel comments page-${page.toLowerCase()}`}>
      {pageRenderers[page]()}
    </div>
  );
};

export default Comments;
