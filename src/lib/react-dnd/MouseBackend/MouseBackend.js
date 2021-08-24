const getEventClientOffset = e => ({ x: e.clientX, y: e.clientY });

const isInput = el => ['INPUT', 'TEXTAREA'].includes(el.tagName);

class MouseBackend {
  sourceNodes = {};
  targetNodes = {};

  sourceIds = [];
  targetIds = [];

  dragStartDist = 3;

  constructor(manager) {
    this.actions = manager.getActions();
    this.monitor = manager.getMonitor();
    this.context = window;
  }

  setup() {
    this.context.addEventListener(
      'mousedown',
      this.handleMouseDownCapture,
      true
    );
    this.context.addEventListener(
      'mousemove',
      this.handleMouseMoveCapture,
      true
    );
    this.context.addEventListener('mousemove', this.handleMouseMove);
    this.context.addEventListener('mouseup', this.handleMouseUpCapture, true);
  }

  teardown() {
    this.context.removeEventListener(
      'mousedown',
      this.handleMouseDownCapture,
      true
    );
    this.context.removeEventListener(
      'mousemove',
      this.handleMouseMoveCapture,
      true
    );
    this.context.removeEventListener('mousemove', this.handleMouseMove);
    this.context.removeEventListener(
      'mouseup',
      this.handleMouseUpCapture,
      true
    );
  }

  connectDragSource(sourceId, node) {
    this.sourceNodes[sourceId] = node;

    const handleMouseDown = e => this.handleMouseDownDragSource(e, sourceId);

    node.addEventListener('mousedown', handleMouseDown);

    return () => {
      delete this.sourceNodes[sourceId];
      node.removeEventListener('mousedown', handleMouseDown);
    };
  }

  connectDragPreview(sourceId, node, options) {
    return () => {};
  }

  connectDropTarget(targetId, node) {
    this.targetNodes[targetId] = node;

    const handleMouseMove = e => this.handleMouseMoveDropTarget(e, targetId);

    node.addEventListener('mousemove', handleMouseMove);

    return () => {
      delete this.targetNodes[targetId];
      node.removeEventListener('mousemove', handleMouseMove);
    };
  }

  handleMouseDownCapture = e => {
    if (isInput(e.target)) {
      return;
    }

    this.sourceIds = [];
    this.mouseClientOffset = getEventClientOffset(e);
  };

  handleMouseDownDragSource = (e, sourceId) => {
    if (!this.mouseClientOffset) {
      return;
    }

    if (e.button === 0 || e.which === 1) {
      this.sourceIds.unshift(sourceId);
    }
  };

  handleMouseMoveCapture = e => {
    if (!this.mouseClientOffset) {
      return;
    }

    const clientOffset = getEventClientOffset(e);

    const dx = Math.abs(clientOffset.x - this.mouseClientOffset.x);
    const dy = Math.abs(clientOffset.y - this.mouseClientOffset.y);

    if (
      !isInput(e.target) &&
      !this.monitor.isDragging() &&
      this.sourceIds.length &&
      (dx >= this.dragStartDist || dy >= this.dragStartDist)
    ) {
      const { sourceIds } = this;

      this.sourceIds = [];

      this.actions.beginDrag(sourceIds, {
        clientOffset,
        getSourceClientOffset: this.getSourceClientOffset,
        publishSource: false
      });

      window.getSelection().removeAllRanges();
    }

    if (!this.monitor.isDragging()) {
      return;
    }

    this.actions.publishDragSource();

    e.preventDefault();

    this.targetIds = [];

    this.autoScrollOnMove(e);
  };

  handleMouseMoveDropTarget = (e, targetId) => {
    if (this.monitor.isDragging()) {
      this.targetIds.unshift(targetId);
    }
  };

  handleMouseMove = e => {
    if (this.monitor.isDragging() && !this.monitor.didDrop()) {
      const clientOffset = getEventClientOffset(e);
      this.actions.hover(this.targetIds, { clientOffset });
    }
  };

  handleMouseUpCapture = e => {
    if (this.monitor.isDragging() && !this.monitor.didDrop()) {
      this.actions.drop();
      this.actions.endDrag();
    }
    this.sourceIds = [];
    this.mouseClientOffset = null;
  };

  findScrollElement = startEl => {
    const canScroll = el => {
      const styles = getComputedStyle(el);
      const borderWidthH =
        parseInt(styles.borderLeftWidth) + parseInt(styles.borderRightWidth);
      const borderWidthV =
        parseInt(styles.borderTopWidth) + parseInt(styles.borderBottomWidth);
      const canScrollX =
        el.scrollWidth > el.clientWidth &&
        el.offsetHeight - borderWidthV > el.clientHeight;
      const canScrollY =
        el.scrollHeight > el.clientHeight &&
        el.offsetWidth - borderWidthH > el.clientWidth;
      return canScrollX || canScrollY;
    };

    let currentEl = startEl;

    while (currentEl) {
      if (canScroll(currentEl)) {
        return currentEl;
      }
      currentEl = currentEl.parentElement;
    }
  };

  autoScrollOnMove = e => {
    const clear = () => {
      this.scrollEl = null;
      if (this.scrollTimer) {
        clearTimeout(this.scrollTimer);
        this.scrollTimer = null;
      }
    };

    if (!this.monitor.isDragging()) {
      clear();
      return;
    }

    const scrollEl = this.findScrollElement(e.target);

    if (!scrollEl) {
      clear();
      return;
    }

    this.scrollEl = scrollEl;
    this.mouseCoord = { x: e.clientX, y: e.clientY };

    if (this.scrollTimer) {
      return;
    }

    const scrollHandler = () => {
      if (!this.scrollEl) {
        this.scrollTimer = null;
        return;
      }

      const scrollFactor = 1;
      const edgeThickness = 50;
      const scrollFps = 20;

      const rect = this.scrollEl.getBoundingClientRect();
      let { x, y } = this.mouseCoord;

      const onLeftEdge = x - rect.x < edgeThickness;
      const onRightEdge = rect.right - x < edgeThickness;
      const onTopEdge = y - rect.y < edgeThickness;
      const onBottomEdge = rect.bottom - y < edgeThickness;
      const onEdge = onLeftEdge || onRightEdge || onTopEdge || onBottomEdge;

      if (this.scrollEl && onEdge) {
        if (onLeftEdge) {
          const dx = (edgeThickness - (x - rect.x)) * scrollFactor;
          this.scrollEl.scrollBy(-dx, 0);
        } else if (onRightEdge) {
          const dx = (edgeThickness - (rect.right - x)) * scrollFactor;
          this.scrollEl.scrollBy(dx, 0);
        }
        if (onTopEdge) {
          const dy = (edgeThickness - (y - rect.y)) * scrollFactor;
          this.scrollEl.scrollBy(0, -dy);
        } else if (onBottomEdge) {
          const dy = (edgeThickness - (rect.bottom - y)) * scrollFactor;
          this.scrollEl.scrollBy(0, dy);
        }
        this.scrollTimer = setTimeout(scrollHandler, 1000 / scrollFps);
      } else {
        this.scrollTimer = null;
      }
    };

    scrollHandler();
  };

  getSourceClientOffset = sourceId => {
    const node = this.sourceNodes[sourceId];
    const clientRect = node.getBoundingClientRect();
    return {
      x: clientRect.left,
      y: clientRect.top
    };
  };
}

export default MouseBackend;
