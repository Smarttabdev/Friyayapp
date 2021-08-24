import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import { stateMappings } from 'Src/newRedux/stateMappings';
import Icon from 'Components/shared/Icon';
import TeamTable from './Tables/TeamTable';
import TopicsTable from './Tables/TopicsTable';
import ActivitiesTable from './Tables/ActivitiesTable';

const Tables = ({ currentTab }) => {
  return (
    <Fragment>
      {currentTab == 'team' && <TeamTable />}
      {currentTab == 'goals' && (
        <TopicsTable
          label="Goals"
          tagged={['goal']}
          darkColor="#56CCF2"
          tab="goals"
          icon={
            <Icon
              icon="flag"
              outlined
              color="white"
              style={{ fontSize: 18, marginTop: -1 }}
            />
          }
        />
      )}
      {currentTab == 'projects' && (
        <TopicsTable
          label="Projects"
          tagged={['project']}
          darkColor="#EB5757"
          tab="projects"
          icon={
            <Icon
              icon="category"
              outlined
              color="white"
              style={{ fontSize: 18, marginTop: -1 }}
            />
          }
        />
      )}
      {currentTab == 'activities' && <ActivitiesTable />}
    </Fragment>
  );
};

const mapState = state => {
  const {
    tools: {
      trackerLens: { currentTab }
    }
  } = stateMappings(state);
  return {
    currentTab
  };
};

export default connect(mapState)(Tables);
