import React from "react";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import "./Table.scss";
// import ToolTipCell from "./ToolTipCell";
// import DynamicPagination from "./DynamicPagination";

function Table({ columns, data, paginationInfo, showPagination = true }) {
  const {
    getTableProps,
    headerGroups,
    prepareRow,
    rows,
    state,
    preGlobalFilteredRows,
    setGlobalFilter
  } = useTable(
    { 
      columns,
      data
    },
    useGlobalFilter,
    useSortBy
  );

  return (
    <>
      <div style={{ overflow: "auto" }}>
        <table {...getTableProps()} className="data-table">
          <thead>
            {(headerGroups || []).map((headerGroup, hGroupIndex, idx) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                key={hGroupIndex + idx.toString()}
              >
                {headerGroup.headers.map((column, idx) => {
                  if (column.Header === "Actions") {
                    return (
                      <th
                        {...column.getHeaderProps()}
                        key={column.header + idx.toString()}
                        colSpan={2}
                        width={120}
                      >
                        {column.render("Header")}
                      </th>
                    );
                  }
                  return (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="alert-header"
                      key={column.header + idx.toString()}
                      width={
                        headerGroups.length > 1
                          ? hGroupIndex === 0
                            ? headerGroup.headers.length * 120
                            : column.width !== 150
                            ? column.width
                            : 120
                          : column.width !== 150
                          ? column.width
                          : 120
                      }
                    >
                      {column.render("Header")}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {rows.map(
              (row, i) =>
                prepareRow(row) || (
                  <tr {...row.getRowProps()} key={i}>
                    {row.cells.map((cell, j) => {
                      if (cell.column.Header === "Actions") {
                        return cell.render("Cell");
                      }
                      return (
                        <td
                          {...cell.getCellProps()}
                          key={i + j + 1}
                          width={
                            cell.column.width !== 150 ? cell.column.width : 120
                          }
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                )
            )}
          </tbody>
        </table>
      </div>
      {/* {showPagination && (
        <DynamicPagination
          previousPage={paginationInfo.previousPage}
          nextPage={paginationInfo.nextPage}
          pageIndex={paginationInfo.pageIndex}
          hasNextPage={
            !!paginationInfo.hasNextPage ? paginationInfo.hasNextPage : false
          }
          pageInfo={!!paginationInfo.pageInfo ? paginationInfo.pageInfo : null}
          pageSize={!!paginationInfo.pageSize ? paginationInfo.pageSize : null}
          setPageSize={
            !!paginationInfo.setPageSize ? paginationInfo.setPageSize : null
          }
        />
      )} */}
    </>
  );
}

export default Table;
