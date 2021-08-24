import React, { Fragment, useState } from 'react';

import TopicList from './TopicList';

const TipSelector = ({ onTipClick }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const havingTips = { filter: `title ILIKE '%${searchQuery}%'` };

  return (
    <Fragment>
      <div>
        <input
          className="mb14"
          placeholder="Search cards"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>
      {queryRenderer({
        query: graphql`
          query TipSelectorQuery($havingTips: JSON) {
            ...TopicList_topicsQuery @arguments(havingTips: $havingTips)
          }
        `,
        vars: { havingTips },
        render: ({ props }) => (
          <TopicList
            topicsQuery={props}
            searchQuery={searchQuery}
            tipsFilter={havingTips.filter}
            onTipClick={onTipClick}
          />
        )
      })}
    </Fragment>
  );
};

export default TipSelector;
