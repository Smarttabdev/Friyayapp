import React from 'react';
import { defaultScore } from './ScorecardWrapper';
import UserAvatar from 'Src/components/shared/users/elements/UserAvatar.js';

const car = '🏎️';

const AllTimeBlock = ({
  userScore,
  selectedUser,
  selectedScoreType,
  setSelectedScoreType
}) => {
  const average = Object.values(userScore).reduce((acc, score) => {
    return {
      completed: acc.completed + (Number(score.completed) || 0),
      assigned: acc.assigned + (Number(score.assigned) || 0),
      points: acc.points + (Number(score.points) || 0),
      hours: acc.hours + (Number(score.hours) || 0),
      cactii: acc.cactii + (Number(score.cactii) || 0),
      in_progress: Number(score.in_progress)
    };
  }, defaultScore);

  return (
    <div className="alltime-block-wrapper">
      <div
        className="block assigned"
        onClick={() => setSelectedScoreType('assigned')}
      >
        <UserAvatar user={selectedUser} size={40} margin={0} />
        <div>{average.assigned} assigned</div>
        <div
          className={`atb-underline assigned ${
            selectedScoreType === 'assigned' ? 'active' : ''
          }`}
        />
      </div>
      <div
        className="block in_progress"
        onClick={() => setSelectedScoreType('in_progress')}
      >
        <img src="/images/hammer.svg" className="atb-icon" alt="in_progress" />
        <div>{average.in_progress} in progress</div>
        <div
          className={`atb-underline in_progress ${
            selectedScoreType === 'in_progress' ? 'active' : ''
          }`}
        />
      </div>
      <div
        className="block completed"
        onClick={() => setSelectedScoreType('completed')}
      >
        <img src="/images/hand.svg" className="atb-icon" alt="hand" />
        <div>{average.completed} completed</div>
        <div
          className={`atb-underline completed ${
            selectedScoreType === 'completed' ? 'active' : ''
          }`}
        />
      </div>
      <div
        className="block point"
        onClick={() => setSelectedScoreType('points')}
      >
        <img src="/images/dart.svg" className="atb-icon" alt="dart" />
        <div>{average.points} points</div>
        <div
          className={`atb-underline point ${
            selectedScoreType === 'points' ? 'active' : ''
          }`}
        />
      </div>
      <div
        className="block cactii"
        onClick={() => setSelectedScoreType('cactii')}
      >
        <img src="/images/cactii.svg" className="atb-icon" alt="cactii" />
        <div>{average.cactii} Bonus Points</div>
        <div
          className={`atb-underline cactii ${
            selectedScoreType === 'cactii' ? 'active' : ''
          }`}
        />
      </div>
      <div
        className="block hours"
        onClick={() => setSelectedScoreType('hours')}
      >
        <img src="/images/axe.svg" className="atb-icon" alt="hours" />
        <div>{average.hours} hours</div>
        <div
          className={`atb-underline hours ${
            selectedScoreType === 'hours' ? 'active' : ''
          }`}
        />
      </div>
    </div>
  );
};

export default AllTimeBlock;
