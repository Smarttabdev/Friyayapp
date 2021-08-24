import React from 'react';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import orderBy from 'lodash/orderBy';
import filter from 'lodash/filter';
import TopicTitleLink from 'Components/shared/topics/elements/TopicTitleLink';
import IconButton from 'Components/shared/buttons/IconButton';
import { moveTopicContents } from 'Src/newRedux/database/topics/thunks';
import { initiateMoveTopicDialog } from 'Src/newRedux/database/topics/abstractions';

const Boards = ({
  card,
  currentTopic,
  topics,
  setEditCardModalOpen,
  initiateMoveTopicDialog,
  moveTopicContents
}) => {
  const clickHandler = () => {
    if (currentTopic) {
      initiateMoveTopicDialog(currentTopic.id);
      moveTopicContents();
    } else {
      setEditCardModalOpen({ cardId: card.id, tab: 'Organize' });
    }
  };

  return (
    <div className="flex-r-center-center" style={{ minHeight: '25px' }}>
      <div>
        {topics.map(topic => (
          <TopicTitleLink
            additionalClasses="mr7"
            key={topic.id}
            topic={topic}
            onClick={() => clickHandler()}
          />
        ))}
      </div>
      <IconButton
        additionalClasses="sheet-view__card-title-edit-btn"
        fontAwesome
        icon="pencil"
        onClick={() => clickHandler()}
      />
    </div>
  );
};

const mapDispatch = {
  moveTopicContents,
  initiateMoveTopicDialog
};

const ViewsConnected = connect((state, { card, currentTopic }) => {
  const topicIds = currentTopic
    ? [currentTopic.attributes.parent_id]
    : card.relationships.topics.data;
  const { topics } = stateMappings(state);

  return {
    topics: filter(topics, topic => topicIds.includes(topic.id))
  };
}, mapDispatch)(Boards);

export default {
  cssModifier: 'boards',
  display: 'Boards',
  resizableProps: {
    minWidth: '180'
  },
  Component: ViewsConnected,
  renderSummary: () => null,
  sort(cards, order) {
    return orderBy(cards, card => card.relationships.topics.data.length, order);
  }
};
