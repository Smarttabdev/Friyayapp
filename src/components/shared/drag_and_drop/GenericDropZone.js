import React, { useEffect, useRef } from 'react';
import { useDrop } from 'react-dnd';
import classNames from 'classnames';
import { castArray } from 'lodash';

/*
This is a generic card drop-zone component. It can be passed a style object, className, or have HTML/other components nested within it.
Pass functions to any of the below props that you wish to use.  They will return all of the drag containers props, and the props of the dragged item
- onHoverOver
- onDragEnter
- onDragLeave
- onDrop

To just use this dropzone an indicator for a container of drop-zones (such as a list of DragDropCardContainers) pass TRUE to the dropsDisabled prop
*/

//Functions to implement the drop:

const GenericDropZone = props => {
  const [collectedProps, drop] = useDrop({
    accept: props.itemType,
    hover: (item, monitor) => {
      if (
        monitor.isOver({ shallow: true }) &&
        props.onHoverOver &&
        !props.dropsDisabled
      ) {
        props.onHoverOver({
          dropZoneProps: { ...props },
          draggedItemProps: { ...monitor.getItem() }
        });
      }
    },
    drop: (item, monitor) => {
      if (
        monitor.isOver({ shallow: true }) &&
        props.onDrop &&
        !props.dropsDisabled
      ) {
        props.onDrop({
          dropZoneProps: { ...props },
          draggedItemProps: { ...monitor.getItem() },
          monitor
        });
        // This doesn't work with nested zones:
        // props.onDrop({dropZoneProps: {...props}, draggedItemProps: {...monitor.getItem(), ...props.draggedItemProps}, monitor});
      }
    },
    canDrop: (item, monitor) => {
      return !props.dropsDisabled;
    },
    collect: (monitor, _props) => {
      const draggedItem = monitor.getItem();
      const canAccept =
        !!draggedItem &&
        castArray(props?.itemType).includes(draggedItem.itemType);
      return {
        isOver: canAccept && monitor.isOver(),
        isOverShallow: canAccept && monitor.isOver({ shallow: true }),
        draggedItem: canAccept ? draggedItem : undefined,
        canDrop: canAccept && monitor.isOver() && monitor.canDrop(),
        canAccept
      };
    }
  });

  const { style, dropClassName, onDragEnter, onDragLeave, children } = props;
  const {
    isOver,
    isOverShallow,
    canDrop,
    canAccept,
    draggedItem
  } = collectedProps;

  const prevPropsRef = useRef({});

  useEffect(() => {
    if (isOverShallow && !prevPropsRef.current.isOverShallow && draggedItem) {
      onDragEnter &&
        onDragEnter({
          dropZoneProps: { ...props },
          draggedItemProps: { ...draggedItem }
        });
    }
    prevPropsRef.current.isOverShallow = isOverShallow;
  }, [isOverShallow, onDragEnter, props, draggedItem]);

  useEffect(() => {
    if (!isOver && prevPropsRef.current.isOver && draggedItem) {
      onDragLeave &&
        onDragLeave({
          dropZoneProps: { ...props },
          draggedItemProps: { ...draggedItem }
        });
    }
    prevPropsRef.current.isOver = isOver;
  }, [isOver, onDragLeave, props, draggedItem]);

  const dropZoneClasses = classNames(dropClassName, {
    'highlight-drop-zone': canAccept,
    'cant-drop': !canDrop && isOver,
    'is-over': isOver
  });

  return typeof children === 'function' ? (
    <div className={dropZoneClasses} style={style}>
      {children({ connectDropTarget: drop })}
    </div>
  ) : (
    <div className={dropZoneClasses} style={style} ref={drop}>
      {children}
    </div>
  );
};

export default GenericDropZone;
