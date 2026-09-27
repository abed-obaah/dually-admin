/** @format */

import React from "react";

const TableLayout = ({ thead, tbody, className, loading, skeletonRows = 6 }) => {
  const colCount = thead?.length || 4;

  return (
    <>
      <div className="overFlowCont">
        <table className={className}>
          <thead>
            <tr>
              {thead?.map((i, index) => (
                <th key={`thead${index}`}> {i} </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: skeletonRows }).map((_, rowIndex) => (
                  <tr key={`skeleton-row${rowIndex}`}>
                    {Array.from({ length: colCount }).map((_, cellIndex) => (
                      <td key={`skeleton-cell${cellIndex}`}>
                        <span className="skeleton-block skeleton-cell"></span>
                      </td>
                    ))}
                  </tr>
                ))
              : tbody?.map((rowData, rowIndex) => (
                  <tr key={`row${rowIndex}`}>
                    {rowData?.map((cellData, cellIndex) => (
                      <td key={`cell${cellIndex}`}>{cellData}</td>
                    ))}
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableLayout;
