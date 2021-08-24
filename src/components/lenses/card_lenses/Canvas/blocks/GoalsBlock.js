import React from 'react';
import { connect } from 'react-redux';

import { stateMappings } from 'Src/newRedux/stateMappings';
import TopicsSheet from 'Components/lenses/card_lenses/Tracker/Tables/TeamTable/TopicsSheet';

const GoalsBlock = ({ userId }) => {
  return (
    <TopicsSheet
      label="Goals"
      tags={['goal']}
      userId={userId}
      className="mt0"
    />
  );
};

const mapState = state => {
  const { user } = stateMappings(state);
  return {
    userId: user?.id
  };
};

export default {
  label: 'Goal list',
  iconProps: {
    icon: 'format_list_bulleted',
    color: '#56CCF2'
  },
  Component: connect(mapState)(GoalsBlock)
};
