import React from 'react';
import PropTypes from 'prop-types';

const TopicSelectorHeader = props => {
  const pathContent = [
    ...props.parentPath.map((path, index) => [
      <a
        href="javascript:void(0)"
        key={'topic-path-' + index}
        className="link-menu-parent-path"
        onClick={e => props.handleTopicClick(path, e)}
      >
        {path.title}
      </a>,
      <span key={'link-menu-parent-path-span-' + index + '-' + path.id}>/</span>
    ])
  ];

  if (pathContent.length === 0 && !props.hideHeader) {
    return <div id="topic-selector-header">Select Boards</div>;
  }

  const isRoot =
    !props.parentPath.length ||
    props.parentPath[props.parentPath.length - 1].id == props.rootId;

  return (
    <div>
      <div id="topic-selector-header">
        {!isRoot && (
          <a
            href="javascript:void(0)"
            className="fa fa-arrow-left"
            onClick={props.handleTopicBack}
          />
        )}

        <div className="path-selector">
          <span style={{ margin: '0 5px' }}>{pathContent}</span>
        </div>

        {!props.hideHeader && (
          <div className="pull-right text-muted" style={{ marginLeft: 5 }}>
            Select Boards
          </div>
        )}
      </div>
    </div>
  );
};

TopicSelectorHeader.propTypes = {
  parentPath: PropTypes.array.isRequired,
  handleTopicBack: PropTypes.func.isRequired
};

TopicSelectorHeader.defaultProps = {
  parentPath: []
};

export default TopicSelectorHeader;
