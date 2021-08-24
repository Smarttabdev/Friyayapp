import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from 'Components/shared/Icon';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { getSortedFilteredTopicsByParentTopic } from 'Src/newRedux/database/topics/selectors';
import { getCardArray } from 'Src/newRedux/database/cards/selectors';
import { getTopicArray } from 'Src/newRedux/database/topics/selectors';
import { getBoardTypeAttributes } from 'Src/utils/icons';
import { getBoardType } from 'Lib/utilities';

// const recentCardsCount = (topicId, cards) => {
//   return cards
//     .filter(card => {
//       const pTopics = (card.relationships.topics || {}).data || [];
//       return pTopics.includes(topicId);
//     })
//     .reduce((count, card) => {
//       if (moment(card.attributes.created_at).isSame(moment(), 'day')) {
//         return ++count;
//       }
//     }, 0);
// };

const ViewList = ({
  topics,
  parentTopic,
  onTopicSelect,
  selectedTopic,
  // cards,
  active_design
}) => {
  const { card_font_color } = active_design;
  const allCards = (
    <div
      onClick={() => onTopicSelect(null)}
      //style={!selectedTopic ? { color: '#56ccf2' } : {}}
      style={{
        alignItems: 'center',
        color: `${!selectedTopic ? '#56ccf2' : 'initial'}`
      }}
    >
      <Icon
        icon="play_arrow"
        color={!selectedTopic ? '#56ccf2' : card_font_color}
        size="small"
      />
      {parentTopic ? (
        `All in ${parentTopic.attributes.title}`
      ) : (
        <span>Recent Cards</span>
      )}
    </div>
  );
  const oldestCards = (
    <div
      onClick={() => onTopicSelect('old')}
      style={{
        alignItems: 'center',
        color: `${selectedTopic === 'old' ? '#56ccf2' : 'initial'}`
      }}
      //style={selectedTopic === 'old' ? { color: '#56ccf2' } : {}}
    >
      <Icon
        icon="play_arrow"
        color={selectedTopic === 'old' ? '#56ccf2' : card_font_color}
        size="small"
      />
      <span>Oldest Cards</span>
    </div>
  );
  return (
    <div className="fv-boards-list">
      <h4 className="boards-title">Boards</h4>
      {allCards}
      {!parentTopic ? oldestCards : null}
      {topics.map(topic => {
        // const count = recentCardsCount(topic.id, cards);
        return (
          <div
            key={topic.id}
            onClick={() => onTopicSelect(topic)}
            style={
              selectedTopic && selectedTopic.id === topic.id
                ? { color: '#56ccf2' }
                : {}
            }
          >
            <Icon
              icon={getBoardTypeAttributes(getBoardType(topic)).icon}
              fontAwesome={
                getBoardTypeAttributes(getBoardType(topic)).fontAwesome
              }
              outlined={getBoardTypeAttributes(getBoardType(topic)).outlined}
              color={
                selectedTopic && selectedTopic.id === topic.id
                  ? '#56ccf2'
                  : card_font_color
              }
              size="small"
              style={{ fontSize: 13 }}
            />
            {topic.attributes.title}
            {/* {!!count && <span className="rc-topic-count">{count}</span>} */}
          </div>
        );
      })}
    </div>
  );
};

const mapState = (state, props) => {
  const sm = stateMappings(state);
  const {
    utilities: { active_design }
  } = sm;

  if (!props.parentTopic) {
    return {
      active_design,
      topics: getSortedFilteredTopicsByParentTopic(state)['0'],
      cards: getCardArray(state)
    };
  }
  return {
    active_design,
    topics:
      getSortedFilteredTopicsByParentTopic(state)[props.parentTopic.id] || [],
    cards: getCardArray(state)
  };
};

ViewList.propTypes = {
  parentTopic: PropTypes.object,
  topics: PropTypes.arrayOf(PropTypes.object),
  selectedTopic: PropTypes.object,
  onTopicSelect: PropTypes.func,
  cards: PropTypes.array,
  active_design: PropTypes.object
};

export default connect(mapState)(ViewList);
