import React from 'react';
import { connect } from 'react-redux';

import { stateMappings } from 'Src/newRedux/stateMappings';
import TopicsSheet from 'Components/lenses/card_lenses/Tracker/Tables/TeamTable/TopicsSheet';

const ProjectsBlock = ({ userId }) => {
  return (
    <TopicsSheet
      label="Projects"
      tags={['project']}
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
  label: 'Project list',
  iconProps: {
    icon: 'format_list_bulleted',
    color: '#EB5757'
  },
  Component: connect(mapState)(ProjectsBlock)
};
