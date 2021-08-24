import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import classNames from 'classnames';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { setShowAddCardBottomOverlay } from 'Src/newRedux/interface/modals/actions';

//A simple container for a draggable card.
//Pass the card/tip object into the 'card' prop, and an object of other details to 'draggedItemProps'
//Give the container a class that contains a subclass 'is-dragging' to change the style of the dragged object

// Functions to implement the drag:

const hoc = Component => props => {
  const [collectedProps, drag, preview] = useDrag({
    item: {
      ...props.draggedItemProps,
      item: props.item,
      itemType: props.itemType,
      dragPreview: props.dragPreview,
      type: props.itemType
    },
    end: (item, monitor) => {
      if (monitor.getDropResult() == null)
        props.setShowAddCardBottomOverlay(false);
      props.onDropElsewhere(props); //Tells the parent that the item was dropped so it should reset its list
    },
    canDrag(monitor) {
      return !props.dragDisabled;
    },
    collect: (monitor, props) => {
      return {
        isDragging: monitor.isDragging()
      };
    }
  });
  return (
    <Component
      {...props}
      {...collectedProps}
      connectDragSource={drag}
      connectDragPreview={preview}
    />
  );
};

class GenericDragContainer extends React.Component {
  componentDidMount = () => {
    // Use empty image as a drag preview so browsers don't draw it
    // and we can draw whatever we want on the custom drag layer instead.
    this.props.connectDragPreview(getEmptyImage(), {
      // IE fallback: specify that we'd rather screenshot the node
      // when it already knows it's being dragged so we can hide it with CSS.
      captureDraggingState: true
    });
  };

  render() {
    const {
      connectDragSource,
      connectDragPreview,
      isDragging,
      itemIsDragging,
      dragClassName,
      style
    } = this.props;

    const dragContainerClasses = classNames(dragClassName, {
      'is-dragging': isDragging || itemIsDragging
    });

    return typeof this.props.children === 'function' ? (
      <div
        className={dragContainerClasses}
        style={style}
        data-connect-drag-container
      >
        {this.props.children({
          connectDragSource,
          connectDragPreview
        })}
      </div>
    ) : (
      <div
        className={dragContainerClasses}
        style={style}
        ref={connectDragSource}
      >
        {this.props.children}
      </div>
    );
  }
}

GenericDragContainer.propTypes = {
  dragClassName: PropTypes.string, //a classname for styling the container (optional)
  style: PropTypes.object, //a style object for styling the container (optional)
  itemIsDragging: PropTypes.bool, //pass an override (used when the card is moved to another container so is remounted there)
  isDragging: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  connectDragSource: PropTypes.func,
  shiftKeyDown: PropTypes.bool,
  toggleUtilityValue: PropTypes.func,
  connectDragPreview: PropTypes.func,
  dragDisabled: PropTypes.bool
};

const mapDispatch = {
  setShowAddCardBottomOverlay
};

export default connect(undefined, mapDispatch)(hoc(GenericDragContainer));
