import React from 'react';
import Icon from 'Components/shared/Icon';
import blockTypes from './blocks';

const BlockItem = ({ iconProps, label, onClick }) => (
  <div className="block-selector-item" onClick={onClick}>
    <Icon {...iconProps} />
    {label}
  </div>
);

const BlockSelector = ({ onSelectBlock }) => {
  const renderBlockItem = type => (
    <BlockItem
      key={type}
      iconProps={blockTypes[type].iconProps}
      label={blockTypes[type].label}
      onClick={() => onSelectBlock(type)}
    />
  );
  return (
    <div className="block-selector">
      Select block type:
      <div className="block-list row">
        <div className="col-md-3">
          {['paragraph', 'card', 'board', 'file', 'chat', 'videoChat'].map(
            renderBlockItem
          )}
        </div>
        <div className="col-md-3">
          {[
            'cardList',
            'boardList',
            'goalList',
            'projectList',
            'fileList',
            'chatList',
            'videoChatList'
          ].map(renderBlockItem)}
        </div>
        <div className="col-md-3">
          {[
            'cardTaskList',
            'goalDescription',
            'projectDescription',
            'sprintBar',
            'teamList'
          ].map(renderBlockItem)}
        </div>
      </div>
    </div>
  );
};

export default BlockSelector;
