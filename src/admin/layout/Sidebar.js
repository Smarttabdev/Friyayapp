import React, { useState } from 'react';

import { CIcon } from '@coreui/icons-react';

import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavTitle,
  CSidebarNavItem,
  CSidebarNavDropdown,
  CSidebarNavDivider,
  CSidebarMinimizer
} from '@coreui/react';

import sidebarItems from '../sidebarItems';

const Sidebar = () => {
  const [show, setShow] = useState();

  return (
    <CSidebar show={show} onShowChange={setShow}>
      <CSidebarBrand>
        <a href="/">
          <CIcon
            className="c-sidebar-brand-full"
            src="/images/friyay_logo.png"
            height={35}
          />
          <CIcon
            className="c-sidebar-brand-minimized"
            src="/images/logo.png"
            height={35}
          />
        </a>
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={sidebarItems}
          components={{
            CSidebarNavTitle,
            CSidebarNavItem,
            CSidebarNavDropdown,
            CSidebarNavDivider
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer />
    </CSidebar>
  );
};

export default Sidebar;
