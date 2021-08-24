import React, { useState, useRef } from 'react';
import cn from 'classnames';

import { useClickOutside } from 'Lib/hooks';
import PanelWindow from './PanelWindow';
import ActivityBar from './ActivityBar';
import './styles.module.scss';

const Panel = () => {
  const rootRef = useRef();
  const [activePanel, _setActivePanel] = useState();

  const setActivePanel = panel => {
    _setActivePanel(panel === activePanel ? null : panel);
  };

  // useClickOutside(rootRef, () => setActivePanel());

  return (
    <div
      styleName={cn('main-panel', activePanel && 'panel-open')}
      ref={rootRef}
    >
      <PanelWindow activePanel={activePanel} setActivePanel={setActivePanel} />
      <ActivityBar activePanel={activePanel} setActivePanel={setActivePanel} />
    </div>
  );
};

export default Panel;
