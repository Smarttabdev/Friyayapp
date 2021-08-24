import React from 'react';
import ColumnItem from './ColumnItem';

const RenderItem = props => {
  const { topic, tip, parentId, topicId, type } = props;
  const id = toId(topic?.id ?? tip?.id);
  const baseType = topic ? 'Topic' : 'Tip';

  return (
    <ColumnItem
      id={id}
      parentId={parentId ?? topicId}
      topic={topic}
      tip={tip}
      handleExpandItem={() =>
        props.addNestedLevel({
          type: baseType,
          id,
          level: props.level,
          parentId: parentId ?? topicId
        })
      }
      handleClickTitle={props.handleClickTitle}
      isExpanded={
        !!props.nestedLevels.find(
          level => level.id == id && level.type == baseType
        )
      }
      baseType={baseType}
    />
  );
};

export default RenderItem;
