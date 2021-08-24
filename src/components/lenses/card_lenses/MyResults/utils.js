import { get, groupBy } from 'lodash';
import CellRenderer from './CellRenderer';

export const getWeekHeaders = (startDate, endDate) => {
  const dates = [];
  for (
    let date = startDate;
    date.isSameOrBefore(endDate);
    date.add(1, 'week')
  ) {
    dates.push(date.clone());
  }
  const datesByMonth = groupBy(dates, date => date.month());
  return Object.keys(datesByMonth)
    .sort((a, b) => a - b)
    .map(key => {
      return {
        Header: datesByMonth[key][0].format('MMMM'),
        columns: datesByMonth[key].map(date => {
          const weekStartDate = date
            .clone()
            .startOf('week')
            .date();
          const weekEndDate = date
            .clone()
            .endOf('week')
            .date();
          return {
            Header: `${weekStartDate}-${weekEndDate}`,
            elId: date.format('MMMM-WW'),
            current: date.week() === moment().week(),
            id: date.format('YYYY[W]WW'),
            accessor: row => get(row, `data.${date.format('YYYY[W]WW')}`, 0),
            Cell: CellRenderer
          };
        })
      };
    });
};
