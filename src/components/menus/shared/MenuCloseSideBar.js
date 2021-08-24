import React, { useState } from 'react';

const MenuCloseSideBar = ({ left, onClick, right }) => {
  const [hideForNow] = useState(true);

  if (hideForNow) {
    return null;
  }
  return (
    <div
      // onMouseEnter={onClick}
      className={`menu-close-sidebar ${left && 'left'} ${right && 'right'}`}
    >
      <a className="menu-close-sidebar_button" onClick={onClick}></a>
    </div>
  );
};

export default MenuCloseSideBar;
