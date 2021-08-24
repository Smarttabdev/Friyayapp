import React, { Fragment } from 'react';
import moment from 'moment';
import IconButton from 'Components/shared/buttons/IconButton';

const horse = '🏇';
const car = '🏎️';
const turtle = '🐢';
const snail = '🐌';
const rocket = '🚀';
const done = '💯';

const getPercentage = (val, total) => {
  if (!total) return '0%';
  if (val >= total) return '100%';
  return `${(val / total) * 100}%`;
};

const WeeklyBlock = ({ weekScore, week, setWeek }) => {
  console.log(weekScore);
  const [year, weekkey] = week.split('-');
  const selectedWeek = moment()
    .year(year)
    .week(weekkey);

  const setNewWeek = addWeek => () => {
    const newWeek = selectedWeek.clone().add(addWeek, 'weeks');
    if (
      newWeek
        .clone()
        .startOf('week')
        .isAfter(moment())
    ) {
      return;
    }
    setWeek(`${newWeek.year()}-${newWeek.isoWeek()}`);
  };
  return (
    <Fragment>
      <div className="weekly-date-toggler">
        <IconButton
          additionalClasses="dark-grey-icon-button"
          icon="chevron_left"
          onClick={setNewWeek(-1)}
        />
        <span>
          {selectedWeek.startOf('week').format('Do MMM')} -{' '}
          {selectedWeek.endOf('week').format('Do MMM')}
        </span>
        <IconButton
          additionalClasses="dark-grey-icon-button"
          icon="chevron_right"
          onClick={setNewWeek(1)}
        />
      </div>
      <div className="weekly-block-wrapper">
        <div className="block todo">
          <div>
            <img src="/images/horse.svg" alt="horse" />
            <span className="flex-1">To do </span>
            <span>
              {weekScore.todo_completed}/{weekScore.todo_total}
            </span>
          </div>
          <div className="wb-slider">
            <div
              className="wb-slider-complete"
              style={{
                width: getPercentage(
                  weekScore.todo_completed,
                  weekScore.todo_total
                )
              }}
            ></div>
          </div>
        </div>
        <div className="block point">
          <div>
            <img src="/images/dart.svg" alt="dart" />
            <span className="flex-1">Points </span>
            <span>
              {weekScore.points_completed}/{weekScore.points_total}
            </span>
          </div>
          <div className="wb-slider">
            <div
              className="wb-slider-complete"
              style={{
                width: getPercentage(
                  weekScore.points_completed,
                  weekScore.points_total
                )
              }}
            ></div>
          </div>
        </div>
        <div className="block cactii">
          <div>
            <img src="/images/cactii.svg" alt="cactii" />
            <span className="flex-1">Bonus Points </span>
            <span>
              {weekScore.cactii_completed}/{weekScore.cactii_total}
            </span>
          </div>
          <div className="wb-slider">
            <div
              className="wb-slider-complete"
              style={{
                width: getPercentage(
                  weekScore.cactii_completed,
                  weekScore.cactii_total
                )
              }}
            ></div>
          </div>
        </div>
        <div className="block hours">
          <div>
            <img src="/images/axe.svg" alt="hours" />
            <span className="flex-1">Hours </span>
            <span>
              {weekScore.hours_completed}/{weekScore.hours_total}
            </span>
          </div>
          <div className="wb-slider">
            <div
              className="wb-slider-complete"
              style={{
                width: getPercentage(
                  weekScore.hours_completed,
                  weekScore.hours_total
                )
              }}
            ></div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default WeeklyBlock;
