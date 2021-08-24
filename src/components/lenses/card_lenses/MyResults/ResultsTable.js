import React, { useMemo, useEffect } from 'react';
import { connect } from 'react-redux';
import { stateMappings } from 'newRedux/stateMappings';
import cn from 'classnames';
import { useTable, useBlockLayout, useResizeColumns } from 'react-table';

import { findScrollParent } from 'Lib/utilities';

const ResultsTable = ({ columns, data, card_font_color }) => {
  const defaultColumn = useMemo(
    () => ({
      width: 75,
      minWidth: 30,
      maxWidth: 400
    }),
    []
  );

  const table = useTable(
    {
      columns,
      data,
      defaultColumn
    },
    useBlockLayout,
    useResizeColumns
  );

  useEffect(() => {
    const el = document.querySelector('.th.current-date');
    const scrollEl = el && findScrollParent(el.parentElement, false);
    if (el && scrollEl) {
      const scrollRect = scrollEl.getBoundingClientRect();
      const rect = el.getBoundingClientRect();
      scrollEl.scrollLeft = rect.left - scrollRect.left;
    }
  }, []);

  const renderColumns = (start, count) => (
    <div {...table.getTableProps()} className="my-results-board-table">
      <div className="headers">
        {table.headerGroups.map((headerGroup, hIdx) => (
          <div key={hIdx} {...headerGroup.getHeaderGroupProps()} className="tr">
            {headerGroup.headers.slice(start, count).map((column, cIdx) => (
              <div
                key={cIdx}
                {...column.getHeaderProps()}
                id={column.elId}
                className={cn('th', column.current && 'current-date')}
                style={{
                  ...column.getHeaderProps().style,
                  color: card_font_color || '#898989'
                }}
              >
                {column.render('Header')}
                <div
                  {...column.getResizerProps()}
                  className={cn(
                    'column-resizer',
                    column.isResizing && 'isResizing'
                  )}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      <div {...table.getTableBodyProps()} className="tableRows">
        {table.rows.map((row, i) => {
          table.prepareRow(row);
          return (
            <div key={i} {...row.getRowProps()} className="tr">
              {row.cells.slice(start, count).map((cell, cIdx) => (
                <div key={cIdx} {...cell.getCellProps()} className="td">
                  {cell.render('Cell')}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="my-results-board-table-container">
      <div className="my-results-board-table__fixed">{renderColumns(0, 1)}</div>
      <div className="my-results-board-table__scroll">{renderColumns(1)}</div>
    </div>
  );
};

const mapState = state => {
  const sm = stateMappings(state);
  const {
    utilities: { active_design }
  } = sm;
  return {
    card_font_color: active_design.card_font_color
  };
};

export default connect(mapState)(ResultsTable);
