import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import Resizable from 're-resizable';

import { stateMappings } from 'Src/newRedux/stateMappings';
import Dropdown from 'Components/shared/Dropdown';
import Icon from 'Components/shared/Icon';
import blockTypes from './blocks';

const Block = ({
  id,
  type,
  config,
  domainId,
  topicId,
  topic,
  onRemove,
  connectDragSource,
  handleDrag,
  maxWidth
}) => {
  const [width, setWidth] = useState(config.width || maxWidth);
  const [height, setHeight] = useState(config.height || 416);
  const { Component, renderDropdown } = blockTypes[type] || {};

  useEffect(() => {
    !isNaN(maxWidth) && isNaN(width) && setWidth(maxWidth);
  }, [maxWidth]);

  const handleResize = (e, direction, ref, d) => {
    const width = parseInt(ref.style.width);
    const height = parseInt(ref.style.height);
    setWidth(width);
    setHeight(height);
    mutations.updateBlock({ id, config: { ...config, width, height } });
  };

  return (
    <div className="canvas-block-container">
      <Resizable
        size={{ width, height }}
        minHeight={77}
        minWidth={100}
        maxWidth={maxWidth}
        onResizeStop={handleResize}
        enable={{
          top: false,
          bottom: true,
          right: true,
          left: true,
          topRight: false,
          topLeft: false,
          bottomRight: false,
          bottomLeft: false
        }}
      >
        <div className={cn('canvas-block', `canvas-${type}-block`)}>
          {Component ? (
            <Component
              id={id}
              config={config}
              domainId={domainId}
              topicId={topicId}
              topic={topic}
            />
          ) : (
            'Error: Invalid block type'
          )}
        </div>
      </Resizable>
      {renderDropdown && (
        <div className="block__more-btn">
          <Dropdown
            trigger={
              <div style={{ fontSize: 20, fontWeight: 'bold', lineHeight: 1 }}>
                &#8230;
              </div>
            }
            menuClassName="block__more-menu"
            menuStyle={{ left: 'unset', right: -15 }}
          >
            {renderDropdown({ id, type, config })}
          </Dropdown>
        </div>
      )}
      <div className="block__remove-btn" onClick={onRemove}>
        &#10005;
      </div>
      <Icon
        outlined
        containerClasses="drag-indicator"
        icon="drag_indicator"
        containerStyle={{
          position: 'absolute',
          right: '-27px',
          color: '#999',
          top: '50%',
          transform: 'translateY(-50%)',
          cursor: 'grab',
          userSelect: 'none'
        }}
        innerRef={connectDragSource}
        onDrag={handleDrag}
      />
    </div>
  );
};

const mapState = (state, props) => {
  const {
    page: { domainId, topicId: pageTopicId },
    topics
  } = stateMappings(state);
  const topicId = props.topicId || pageTopicId;
  const topic = topicId && topics[topicId];
  return {
    domainId,
    topicId,
    topic
  };
};

export default connect(mapState)(Block);
