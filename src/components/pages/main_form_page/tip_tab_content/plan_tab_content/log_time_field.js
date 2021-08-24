import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { connect } from 'react-redux';
import moment from 'moment';
import { prepareLogtimes } from 'Src/newRedux/database/logtimes/actions';
import TimelineTimeframeSelector from 'Src/components/shared/TimelineTimeframeSelector';
import WeeklySpreadLensGrid from 'Src/components/lenses/card_lenses/WeeklySpreadLens/WeeklySpreadLensGrid';
import { getTotalLogTime } from 'Src/lib/utilities';

const LogTimeField = ({ card, logtimes, prepareLogtimes }) => {
  const [timeframeDate, setTimeframeDate] = useState(moment().startOf('week'));

  const totalLogTime = useMemo(() => {
    const startDate = timeframeDate.clone().startOf('week');
    const endDate = startDate.clone().endOf('week');
    return getTotalLogTime(logtimes, startDate, endDate);
  }, [logtimes, timeframeDate]);

  useEffect(() => {
    card && prepareLogtimes([card]);
  }, [card]);

  return (
    <div className="log-time-field">
      <div className="log-time-field__actions">
        <div className="log-time-field__actions-group">
          <TimelineTimeframeSelector
            columnMode="weeks"
            value={timeframeDate}
            onChange={setTimeframeDate}
            goalView
          />
        </div>
        <div className="log-time-field__actions-group log-time-field__total-log-time">
          Log time {Math.round(totalLogTime)} hrs
        </div>
      </div>
      <WeeklySpreadLensGrid
        className="planning-view__timeline"
        columnMode="weeks"
        startDate={timeframeDate}
        card={card}
        compact
        addOnClick
      />
    </div>
  );
};

LogTimeField.propTypes = {
  card: PropTypes.object
};

const mapState = state => {
  const logtimes = get(
    state,
    '_newReduxTree.database.logtimes.data.allLogtimes',
    {}
  );
  return {
    logtimes
  };
};

export default connect(mapState, { prepareLogtimes })(LogTimeField);
