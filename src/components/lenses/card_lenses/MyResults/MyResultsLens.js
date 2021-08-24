import React, { useMemo, useEffect } from 'react';
import { connect } from 'react-redux';

import { stateMappings } from 'Src/newRedux/stateMappings';
import { getWeekHeaders } from './utils';
import ResultsTable from './ResultsTable';
import { getResults } from 'Src/newRedux/results/thunks';
import Scorecard from 'Components/pages/score_card';

const MyResultsLens = ({ user, data, getResults }) => {
  const stats = ['completion', 'points', 'cactii', 'logged_hours'];

  useEffect(() => {
    user &&
      getResults({
        key: 'myResults',
        stats,
        assignedIds: [user.id],
        periodUnit: 'week'
      });
  }, [user]);

  const weekHeaders = useMemo(() => {
    return getWeekHeaders(moment().startOf('year'), moment().endOf('year'));
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: 'Weeks',
        columns: [
          {
            Header: '',
            accessor: 'title',
            width: 180
          }
        ]
      },
      ...weekHeaders
    ],
    [weekHeaders]
  );

  return (
    <div className="my-results-board">
      <ResultsTable columns={columns} data={data} />
      <div className="team-results-view__footer" style={{ marginLeft: '35px' }}>
        <a>
          <Scorecard enableCustomComponent />
        </a>
      </div>
    </div>
  );
};

const mapState = state => {
  const {
    user,
    results: { myResults }
  } = stateMappings(state);
  return {
    user,
    data: myResults
  };
};

const mapDispatch = {
  getResults
};

export default connect(mapState, mapDispatch)(MyResultsLens);
