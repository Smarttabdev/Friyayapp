import React from 'react';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { updateTrackerLens } from 'Src/newRedux/interface/lenses/actions';
import Header from './Header';
import Lanes from './Lanes';
import Tables from './Tables';

const TrackerLens = ({ currentTab, updateTrackerLens, currentMode }) => {
  const handleTabChange = tab => {
    updateTrackerLens({ currentTab: tab });
    eventBus.dispatch('tracker.tab.click');
  };

  return (
    <div className="tracker-container">
      <Header currentTab={currentTab} onTabChange={handleTabChange} />
      {currentMode == 'table' && <Tables currentTab={currentTab} />}
      {currentMode == 'lane' && <Lanes currentTab={currentTab} />}
    </div>
  );
};

const mapState = state => {
  const {
    tools: {
      trackerLens: { currentTab, currentMode }
    }
  } = stateMappings(state);
  return {
    currentTab,
    currentMode
  };
};

const mapDispatch = {
  updateTrackerLens
};

export default connect(mapState, mapDispatch)(TrackerLens);
