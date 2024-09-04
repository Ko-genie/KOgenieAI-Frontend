import React from "react";
import CustomPagination from "../CustomPagination";
import NoItemFound from "../Common/NoItemFound.comp";
import Loading from "../Common/Loading.comp";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import SectionLoader from "../SectionLoader";

const DynamicTable = ({
  data,
  columns,
  totalItems,
  perPageItems,
  loading,
  handlePageClick,
  activePage,
}: any) => {
  // Create an instance of the table
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    //@ts-ignore
    setGlobalFilter,
  } = useTable(
    {
      //@ts-ignore
      columns,
      data: data,
    },
    useGlobalFilter,
    useSortBy
  );

  return (
    <div className="min-h-full">
      <div className="overflow-auto">
        {loading ? (
          <SectionLoader />
        ) : (
          <table
            className="w-full divide-y divide-gray-200"
            {...getTableProps()}
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()} className="border-b dark:border-dark">
                  {headerGroup.headers.map((column: any) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="bg-gray-100 dark:bg-black dark:border-dark dark:text-white px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700"
                    >
                      <span className="flex">
                        {column.render("Header")}
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <FiChevronDown className="" />
                          ) : (
                            <FiChevronUp className="" />
                          )
                        ) : (
                          <FiChevronUp className="opacity-0 " />
                        )}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody
              className="divide-y divide-gray-200 bg-white"
              {...getTableBodyProps()}
            >
              {rows.length === 0 && !loading ? (
                <tr className="dark:border-dark ">
                  <td
                    colSpan={columns.length}
                    className="px-6 py-4 text-center text-gray-700  dark:text-white dark:bg-black"
                  >
                    <NoItemFound message="No Item Found" />
                  </td>
                </tr>
              ) : (
                rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()} className="dark:border-dark">
                      {row.cells.map((cell) => (
                        <td {...cell.getCellProps()} className="px-6 py-4 dark:bg-black">
                          <div className="text-sm text-gray-900 dark:text-white dark:text-light">
                            {cell.render("Cell")}
                          </div>
                        </td>
                      ))}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        )}
      </div>

      {data?.length !== 0 && (
        <div className="mt-5">
          <div className="flex w-full flex-col justify-center">
            <CustomPagination
              totalItems={totalItems}
              perPageItems={perPageItems}
              handlePageClick={handlePageClick}
              activePage={activePage}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DynamicTable;
