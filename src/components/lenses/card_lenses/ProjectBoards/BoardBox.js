import React, { useState } from 'react';
import CompletionSlider from 'Components/shared/CompletionSlider';
import { getProjectOrGoalSpeed as Speed } from 'Src/components/lenses/card_lenses/Plan/Speed.js';
import moment from 'moment';
import TopicTitleLink from 'Components/shared/topics/elements/TopicTitleLink';
import UserAvatar from 'Components/shared/users/elements/UserAvatar';
import { setUpdateTopicModalOpen } from 'Src/newRedux/interface/modals/actions';
import { connect } from 'react-redux';
import { getColorIndicator } from 'Src/utils/color';
import LoadingIndicator from 'Components/shared/LoadingIndicator';
import IconButton from 'Src/components/shared/buttons/IconButton';

function BoardBox(props) {
  const { topic, setUpdateTopicModalOpen, hideAddAssignee } = props;
  const { due_date } = topic.attributes;
  const { assignments } = topic.relationships;
  const [speed, setSpeed] = useState(0);
  const [completion, setCompletion] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      className="board-box"
      style={{
        borderColor: getColorIndicator({ speed, completion })
      }}
    >
      <div className="board-title-container">
        <TopicTitleLink
          additionalClasses="board-title"
          topic={topic}
          color={'#FFF'}
          truncate
          hideActivityIndicator
        />
        {isLoading && <LoadingIndicator />}
      </div>

      <div
        className="user-list"
        style={{
          height: !assignments?.data?.length && 25,
          display: hideAddAssignee ? 'none' : ''
        }}
      >
        {assignments?.data?.map?.(user => (
          <UserAvatar
            margin="4"
            userId={user.assigned_id}
            key={user.assigned_id}
          />
        ))}
        <IconButton
          additionalClasses="font-size-25"
          icon="person_add"
          outlined
          color="rgb(155, 81, 224)"
          tooltip="Assign Member"
          tooltipOptions={{ place: 'right' }}
          onClick={() => setUpdateTopicModalOpen(topic?.id, true, 4)}
        />
      </div>
      {queryRenderer({
        query: graphql`
          query BoardBoxQuery($topicId: ID) {
            topic(id: $topicId, speed: true, completion: true) {
              id
              title
              speed
              completion
            }
          }
        `,
        vars: {
          topicId: topic && toGid('Topic', topic.id)
        },
        render: ({ props }) => (
          <div className="completion-section">
            {props.topic?.id && setIsLoading(false)}
            {setCompletion(props.topic?.completion)}
            <CompletionSlider value={props.topic?.completion} />
            <Speed
              speed={props.topic?.speed}
              completionLevel={props.topic?.completion}
              showSpeedCaption
              getSpeed={setSpeed(props.topic?.speed)}
            />
          </div>
        )
      })}
      {/* <div className="completion-section">
        <CompletionSlider value={completionLevel} />
        <Speed
          cards={cards}
          completionLevel={completionLevel}
          showSpeedCaption
          getSpeed={speed => setSpeed(speed)}
        />
      </div> */}
      <div className="due-date-section">
        <div
          className="due-date pointer"
          onClick={() => setUpdateTopicModalOpen(topic?.id, true, 4)}
        >
          Due date: {due_date ? moment(due_date).format('MMMM DD, YY') : 'None'}
        </div>
        {due_date && (
          <div className="days-left">
            {moment(due_date).diff(moment(), 'days') <= 0
              ? 0
              : moment(due_date).diff(moment(), 'days')}
            &nbsp;days left
          </div>
        )}
      </div>
    </div>
  );
}

// const mapState = (state, props) => {
//   const cards = getSortedFilteredCardsByTopic(state)[props.topic.id] || [];

//   const completedCards = cards.filter(
//     card => card.attributes.completed_percentage == 100
//   );
//   const completionLevel = Math.floor(
//     (completedCards.length / cards.length) * 100
//   );

//   return {
//     cards,
//     completionLevel: isFinite(completionLevel) ? completionLevel : 0
//   };
// };

const mapDispatch = {
  setUpdateTopicModalOpen
};

export default connect(null, mapDispatch)(BoardBox);
