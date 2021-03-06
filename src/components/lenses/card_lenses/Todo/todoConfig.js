import moment from 'moment';

export const todoPeriods = {
  ALL: {
    key: 'ALL',
    name: 'All',
    breakPoint: 'any',
    startOfPeriod: null,
    endOfPeriod: null
  },
  UNDATED: {
    key: 'UNDATED',
    name: 'No Due Date',
    breakPoint: 'any',
    startOfPeriod: null,
    endOfPeriod: null
  },
  LAST_MONTH: {
    key: 'LAST_MONTH',
    name: 'Last Month',
    breakPoint: 'large',
    startOfPeriod: moment()
      .subtract(1, 'month')
      .startOf('month'),
    endOfPeriod: moment()
      .subtract(1, 'month')
      .endOf('month')
  },
  LAST_WEEK: {
    key: 'LAST_WEEK',
    name: 'Last Week',
    breakPoint: 'medium',
    startOfPeriod: moment()
      .subtract(1, 'week')
      .startOf('week'),
    endOfPeriod: moment()
      .subtract(1, 'week')
      .endOf('week')
  },
  YESTERDAY: {
    key: 'YESTERDAY',
    name: 'Yesterday',
    breakPoint: 'any',
    startOfPeriod: moment()
      .subtract(1, 'day')
      .startOf('day'),
    endOfPeriod: moment()
      .subtract(1, 'day')
      .endOf('day')
  },
  TODAY: {
    key: 'TODAY',
    name: 'Today',
    breakPoint: 'any',
    startOfPeriod: moment().startOf('day'),
    endOfPeriod: moment().endOf('day')
  },
  TOMORROW: {
    key: 'TOMORROW',
    name: 'Tomorrow',
    breakPoint: 'small',
    startOfPeriod: moment()
      .add(1, 'day')
      .startOf('day'),
    endOfPeriod: moment()
      .add(1, 'day')
      .endOf('day')
  },
  THIS_WEEK: {
    key: 'THIS_WEEK',
    name: 'This Week',
    breakPoint: 'small',
    startOfPeriod: moment().startOf('week'),
    endOfPeriod: moment().endOf('week')
  },
  NEXT_WEEK: {
    key: 'NEXT_WEEK',
    name: 'Next Week',
    breakPoint: 'medium',
    startOfPeriod: moment()
      .add(1, 'week')
      .startOf('week'),
    endOfPeriod: moment()
      .add(1, 'week')
      .endOf('week')
  },
  THIS_MONTH: {
    key: 'THIS_MONTH',
    name: 'This Month',
    breakPoint: 'large',
    startOfPeriod: moment().startOf('month'),
    endOfPeriod: moment().endOf('month')
  },
  NEXT_MONTH: {
    key: 'NEXT_MONTH',
    name: 'Next Month',
    breakPoint: 'x-large',
    startOfPeriod: moment()
      .add(1, 'month')
      .startOf('month'),
    endOfPeriod: moment()
      .add(1, 'month')
      .endOf('month')
  }
};
