import React, { PureComponent } from 'react';
import cn from 'classnames';

export default class CalendarLensGridHeader extends PureComponent {
  render() {
    const { columnMode, columns, handleRef, compact } = this.props;

    return (
      <div ref={handleRef} className="planning-grid__header">
        <div className="planning-grid__row">
          {['monthDays', 'weeks', 'weeksWD'].includes(columnMode) && (
            <div className="planning-grid__cell planning-grid__cell--user" />
          )}

          {columns.map(col => (
            <div
              key={col.id}
              className={cn(
                'planning-grid__cell planning-grid__cell--header calendar-view__cell--header flex',
                compact && 'planning-grid__cell--compact'
              )}
            >
              {!compact &&
                ['monthDays', 'weeks', 'weeksWD'].includes(columnMode) && (
                  <div> {col.dayOfMonth} </div>
                )}
              <div> {compact ? col.name[0] : col.name} </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
