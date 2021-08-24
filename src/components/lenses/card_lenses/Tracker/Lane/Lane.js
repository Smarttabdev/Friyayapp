import React from 'react';

const Lane = ({
  bgColor = '#EFEFEF',
  activeBgColor,
  addItemButton,
  isActive,
  children
}) => {
  return (
    <div
      style={{ backgroundColor: isActive ? activeBgColor : bgColor }}
      className="tracker__lane"
    >
      {children}
      <div className="tracker__lane-add-item-button">{addItemButton}</div>
    </div>
  );
};

export default Lane;
