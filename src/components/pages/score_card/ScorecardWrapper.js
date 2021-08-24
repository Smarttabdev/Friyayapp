import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import APIRequest from 'Lib/ApiRequest';
import { stateMappings } from 'Src/newRedux/stateMappings';
import Users from './users';
import WeeklyBlock from './WeeklyBlock';
import AllTimeBlock from './AllTimeBlock';
import ScoreChart from './ScoreChart';

export const defaultScore = {
  completed: 0,
  assigned: 0,
  points: 0,
  hours: 0,
  cactii: 0,
  in_progress: 0
};

const ScorecardWrapper = ({ currentUser }) => {
  const [selectedUser, setSelectedUser] = useState({
    id: 'All',
    attributes: {
      name: 'All Users'
    }
  });
  const [includeArchived, setIncludeArchived] = useState(true);
  const [week, setWeek] = useState(`${moment().year()}-${moment().isoWeek()}`);
  const [userScore, setUserScore] = useState({});
  const [selectedScoreType, setSelectedScoreType] = useState('assigned');
  useEffect(() => {
    let resource = `score_cards?include_archived=${includeArchived}`;
    if (selectedUser.id !== 'All') {
      resource = `score_card/${selectedUser.id}?include_archived=${includeArchived}`;
    }

    APIRequest.get({
      resource
    })
      .done(response => {
        setUserScore({
          ...userScore,
          [selectedUser.id]: response
        });
      })
      .fail(function(xhr, status) {
        if (status !== 'abort') {
          APIRequest.showErrorMessage('Unable to load score');
        }
      });
  }, [selectedUser, includeArchived]);

  const weekScore = userScore[selectedUser.id]
    ? userScore[selectedUser.id][week] || defaultScore
    : defaultScore;

  return (
    <div className="score-card-wrapper">
      <h3 className="sc-header">Score Card</h3>
      <Users selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
      <div className="name-wrapper">
        <h2>{selectedUser.attributes.name}</h2>
        <span className="checkbox-wrapper">
          <input
            type="checkbox"
            className="sc-checkbox"
            checked={includeArchived}
            onChange={() => setIncludeArchived(!includeArchived)}
          />
          &nbsp;Include Archived
        </span>
      </div>
      <WeeklyBlock weekScore={weekScore} week={week} setWeek={setWeek} />
      <h3>All Time</h3>
      <AllTimeBlock
        selectedUser={selectedUser}
        userScore={userScore[selectedUser.id] || {}}
        selectedScoreType={selectedScoreType}
        setSelectedScoreType={setSelectedScoreType}
      />
      <ScoreChart
        userScore={userScore[selectedUser.id] || null}
        selectedScoreType={selectedScoreType}
      />
    </div>
  );
};

const mapState = (state, props) => {
  const sm = stateMappings(state);
  return {
    currentUser: sm.user
  };
};

export default connect(mapState)(ScorecardWrapper);
