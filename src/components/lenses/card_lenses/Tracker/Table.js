import React, { useState, useLayoutEffect, useMemo, useRef } from 'react';
import { useTable, useBlockLayout, useResizeColumns } from 'react-table';

const Table = ({ label, items, darkColor, footer, onClick }) => {
  const ref = useRef();
  const [titleWidth, setTitleWidth] = useState();

  useLayoutEffect(() => {
    if (ref.current) {
      setTitleWidth(ref.current.clientWidth - 50 - 230 - 46);
    }
  }, [ref.current]);

  const columns = useMemo(
    () => [
      {
        Header: (
          <div className="tracker__table__header">
            <div
              className="tracker__table__title"
              style={{ backgroundColor: darkColor }}
            >
              {label}
            </div>
          </div>
        ),
        width: titleWidth,
        accessor: 'col1'
      },
      {
        Header: <div className="tracker__table__header">Completion</div>,
        width: 230,
        accessor: 'completion'
      },
      {
        Header: <div className="tracker__table__header">Speed</div>,
        width: 50,
        accessor: 'speedIcon'
      }
    ],
    [label, darkColor, titleWidth]
  );

  const data = useMemo(
    () =>
      items.map(item => {
        return {
          col1: (
            <div className="flex">
              <div
                className="tracker__table__list-item__icon"
                style={{ backgroundColor: darkColor }}
              >
                {item.icon}
              </div>
              <div
                className="tracker__table__list-item__title"
                onClick={() => onClick(item)}
              >
                {item.title}
              </div>
            </div>
          ),
          completion: (
            <div className="tracker__table__list-item__cell">
              {item.completion}
            </div>
          ),
          speedIcon: (
            <div
              className="tracker__table__list-item__cell tracker__table__list-item__cell--right"
              style={{ fontSize: 18 }}
            >
              🐌
            </div>
          )
        };
      }),
    [items]
  );

  const table = useTable(
    {
      columns,
      data
    },
    useBlockLayout,
    useResizeColumns
  );

  return (
    <div className="tracker__table" ref={ref}>
      <table {...table.getTableProps()}>
        <thead>
          {table.headerGroups.map((headerGroup, i) => (
            <tr key={i} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, i) => (
                <th key={i} {...column.getHeaderProps()}>
                  <div className="flex">
                    {column.render('Header')}
                    <div
                      {...column.getResizerProps()}
                      className="tracker__col-resizer"
                    />
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...table.getTableBodyProps()}>
          {table.rows.map((row, i) => {
            table.prepareRow(row);
            return (
              <tr key={i} {...row.getRowProps()}>
                {row.cells.map((cell, i) => (
                  <td key={i} {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td>{footer}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Table;
