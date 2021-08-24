import React from 'react';
import TreeView from 'Components/shared/tree_view';

const Boards = ({ parentTopic, tab }) => (
  <div className="tab-wrapper">
    <div className="info-text">
      Which Tool should the Board(s) have? <a>Learn More</a>
    </div>
    <TreeView parentTopic={parentTopic} tab={tab} disableOn="tip_detail" />
  </div>
);

export default Boards;
