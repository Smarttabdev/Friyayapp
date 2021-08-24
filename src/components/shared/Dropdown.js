import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { useClickOutside } from 'Lib/hooks';

/**
 * Manages open state when onClose falsy.
 */
const Dropdown = ({
  open,
  closeOnClick,
  trigger,
  children,
  onOpen,
  onClose,
  className,
  style,
  menuClassName,
  menuStyle,
  MenuComponent,
  triggerClose,
  ignorePreventDefault,
  triggerAdditionalClasses,
  rowsColumnsRef,
  ...props
}) => {
  const rootRef = useRef();
  const menuRef = useRef();
  const [_open, setOpen] = useState();
  const manageOpen = !onClose;
  if (!onClose) onClose = () => setOpen(false);
  useClickOutside(rootRef, onClose);

  useEffect(() => {
    (_open || open) && onOpen && onOpen();
  }, [_open, open, onOpen]);

  useEffect(() => onClose(), [triggerClose]);

  const handleBodyClick = e => {
    if (
      e.target !== menuRef.current &&
      rowsColumnsRef &&
      !rowsColumnsRef.current?.contains(event.target)
    ) {
      (ignorePreventDefault || !e.defaultPrevented) &&
        manageOpen &&
        closeOnClick &&
        onClose();
    }
  };

  return (
    <div
      className={cn('dropdown', className)}
      style={style}
      {...props}
      ref={rootRef}
      aria-haspopup="true"
      aria-expanded={String(_open || open)}
    >
      {manageOpen ? (
        <div
          className={triggerAdditionalClasses}
          onClick={() => setOpen(!_open)}
          style={{ cursor: 'pointer' }}
        >
          {trigger}
        </div>
      ) : (
        trigger
      )}
      {(_open || open) && (
        <MenuComponent
          className={cn('dropdown-menu', menuClassName)}
          style={{
            display: 'block',
            ...menuStyle
          }}
          onClick={handleBodyClick}
          ref={menuRef}
          aria-labelledby="dropDown"
        >
          {children}
        </MenuComponent>
      )}
    </div>
  );
};

Dropdown.defaultProps = {
  closeOnClick: true,
  MenuComponent: 'ul',
  rowsColumnsRef: {}
};

Dropdown.propTypes = {
  open: PropTypes.bool,
  closeOnClick: PropTypes.bool,
  trigger: PropTypes.node,
  children: PropTypes.node,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
  menuClassName: PropTypes.string,
  menuStyle: PropTypes.object,
  MenuComponent: PropTypes.elementType,
  triggerClose: PropTypes.bool,
  ignorePreventDefault: PropTypes.bool,
  rowsColumnsRef: PropTypes.object
};

export default Dropdown;
