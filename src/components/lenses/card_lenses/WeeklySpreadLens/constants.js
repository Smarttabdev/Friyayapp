import moment from 'moment';

export const HOURS = [];
for (let i = 0, m = moment().startOf('day'); i < 24; i++) {
  m.add(1, 'hour');
  HOURS.push({ startMinute: 60 * i, text: m.format('H a') });
}

export const COL_MODE_MONTH = 'monthDays';
export const COL_MODE_WEEK = 'weeks';
export const COL_MODE_WEEKWD = 'weeksWD';
export const MINUTES_IN_A_DAY = 24 * 60;
