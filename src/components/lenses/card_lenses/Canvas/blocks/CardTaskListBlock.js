import React from 'react';
import SheetLens from 'Src/components/lenses/card_lenses/Sheet/SheetLens';

const CardTaskListBlock = ({ id, config, topicId, topic }) => {
  return (
    <SheetLens
      forceColor={false}
      topicId={topicId}
      additionalClasses="ActionPlan-board"
      cardRequirements={topicId && { topicId }}
    />
  );
};

export default {
  label: 'Task Cards list',
  iconProps: {
    icon: 'featured_play_list',
    color: '#6FCF97',
    outlined: true
  },
  Component: CardTaskListBlock
};
