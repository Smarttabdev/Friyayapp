import React from 'react';
import SprintBar from 'src/components/shared/topics/SprintBar/SprintBar';
import { connect } from 'react-redux';
import { getSortedFilteredCardsByTopic } from 'Src/newRedux/database/cards/selectors';
import DMLoader from 'Src/dataManager/components/DMLoader';

const SprintBarBlock = props => {
  const { cards, topic } = props;
  return (
    <>
      <SprintBar cards={cards} topic={topic} showSprintBar hideFilter />
      <DMLoader
        dataRequirements={{
          cardsWithAttributes: {
            attributes: {
              topicId: topic.id
            }
          }
        }}
        loaderKey="cardsWithAttributes"
      />
    </>
  );
};

const mapState = (state, props) => {
  const cards = getSortedFilteredCardsByTopic(state)[props.topic.id];
  return {
    cards
  };
};

export default {
  label: 'Sprint bar',
  defaultConfig: {
    height: 197
  },
  iconProps: {
    icon: 'bullseye',
    color: '#6FCF97',
    fontAwesome: true,
    style: { fontSize: 20 }
  },
  Component: connect(mapState)(SprintBarBlock)
};
