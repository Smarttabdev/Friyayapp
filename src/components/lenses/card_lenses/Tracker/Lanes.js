import React, { useState } from 'react';
import { connect } from 'react-redux';
import IconButton from 'Components/shared/buttons/IconButton';
import ProjectLane from './Lane/ProjectLane';
import GoalLane from './Lane/GoalLane';
import ActivitiesLane from './Lane/ActivitiesLane';
import UserGroupLane from './Lane/UserGroupLane';
import AddCardOrSubtopic from 'Components/shared/assemblies/AddCardOrSubtopic';
import MainFormPage from 'Components/pages/MainFormPage';
import { updateTrackerLens } from 'Src/newRedux/interface/lenses/actions';
import { stateMappings } from 'Src/newRedux/stateMappings';

const Lanes = ({
  currentTab,
  updateTrackerLens,
  users,
  groups,
  selectedProjectId
}) => {
  const [showAddTeam, setShowAddTeam] = useState(false);

  const toggleShowAddTeam = () => setShowAddTeam(prev => !prev);
  return (
    <div style={{ marginTop: 20 }} className="flex">
      {showAddTeam && (
        <MainFormPage selectedTab="group-pane" onClose={toggleShowAddTeam} />
      )}
      <UserGroupLane
        isActive={currentTab == 'team'}
        activeBgColor="rgba(155, 81, 224, 0.38)"
        users={users}
        groups={groups}
        updateTrackerLens={updateTrackerLens}
        addItemButton={
          <IconButton
            icon="add_circle"
            color="#9B51E0"
            additionalClasses="add_button"
            onClick={toggleShowAddTeam}
            tooltip="Add Team"
            tooltipOptions={{ place: 'bottom' }}
          />
        }
      />
      <GoalLane
        isActive={currentTab == 'goals'}
        activeBgColor="rgba(86, 204, 242, 0.33)"
        updateTrackerLens={updateTrackerLens}
        addItemButton={
          <AddCardOrSubtopic
            color="#56CCF2"
            icon="add_circle"
            displayAddGoalButton
            className="add_button"
            hideOtherButton
            trackerLaneView
          />
        }
      />
      <ProjectLane
        isActive={currentTab == 'projects'}
        updateTrackerLens={updateTrackerLens}
        addItemButton={
          <AddCardOrSubtopic
            color="#EB5757"
            icon="add_circle"
            displayAddProjectButton
            className="add_button"
            hideOtherButton
            trackerLaneView
          />
        }
      />
      <ActivitiesLane
        isActive={currentTab == 'activities'}
        addItemButton={
          selectedProjectId ? (
            <AddCardOrSubtopic
              color="#6FCF97"
              icon="add_circle"
              displayAddCardButton
              className="add_button"
              trackerLaneView
              selectedProjectId={selectedProjectId}
              hideOtherButton
            />
          ) : null
        }
      />
    </div>
  );
};

const mapState = state => {
  const {
    tools: {
      trackerLens: { selectedProjectId }
    }
  } = stateMappings(state);

  return {
    selectedProjectId
  };
};

const mapDispatch = { updateTrackerLens };
export default connect(
  mapState,
  mapDispatch
)(
  QueryRenderer(props => <Lanes {...props} query={props} />, {
    query: graphql`
      query LanesQuery {
        groups {
          id
          title
        }
        users {
          id
          name
        }
      }
    `
  })
);
