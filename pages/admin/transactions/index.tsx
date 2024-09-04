import { IoIosAdd, IoMdArrowBack } from "react-icons/io";
import React, { useMemo, useState } from "react";
import Link from "next/link";
import CustomTemplates from "@/components/Admin/Templates/CustomTemplates";
import { useGetTransactionList } from "@/hooks/admin";
import CustomPagination from "@/components/CustomPagination";
import SectionLoader from "@/components/SectionLoader";
import DynamicTable from "@/components/Table/DynamicTable.comp";
import moment from "moment";
import SearchBox from "@/components/SearchBox";
import { useTranslation } from "react-i18next";

export default function Index() {
  const { t } = useTranslation();
  const {
    data,
    isLoading,
    setCurrentPage,
    handlePageClick,
    search,
    setSearch,
  } = useGetTransactionList();

  const columns = useMemo(
    () => [
      { Header: t("Package"), accessor: "Package.name" },
      {
        Header: t("Price"),
        Cell: ({ row }: any) => (
          <span>
            {row?.original?.price} {row?.original?.Package?.currency}
          </span>
        ),
      },
      {
        Header: t("Total Words"),
        Cell: ({ row }: any) => <span>{row.original.Package.total_words}</span>,
      },
      {
        Header: t("Total Image"),
        Cell: ({ row }: any) => (
          <span>{row.original.Package.total_images}</span>
        ),
      },
      {
        Header: t("User"),
        Cell: ({ row }: any) => (
          <span>
            {row.original.User.first_name} {row.original.User.last_name}
          </span>
        ),
      },
      {
        Header: t("Transaction Time"),
        accessor: (data: any) =>
          moment(data?.created_at).format("MMMM Do YYYY"),
      },
    ],
    []
  );
  return (
    <div className="container dark:text-white">
      <div className="items-center justify-between border-b border-[#f1f3f4] px-6 py-5 dark:border-dark  md:flex">
        <div>
          <Link
            href={`/admin/dashboard`}
            className="mb-3 flex items-center gap-2"
          >
            <IoMdArrowBack size={18} />
            <p>{t(`Back to Dashboard`)}</p>
          </Link>

          <h4 className="mt- text-4xl font-bold capitalize">
            {t(`All Transactions`)}
          </h4>
        </div>
        <div className="mt-2 flex items-center gap-3 md:mt-0"></div>
      </div>
      <div className="h-full px-6 py-8 sm:min-h-[calc(100vh_-_200px)]">
        <div className="mt-4 h-full w-full">
          <div className="mb-4">
            <SearchBox search={search} setSearch={setSearch} />
          </div>
          <div className="panel h-full">
            <DynamicTable
              data={data?.data?.list || []}
              loading={isLoading}
              columns={columns}
              totalItems={data?.data?.meta?.total}
              perPageItems={data?.data?.meta?.perPage}
              handlePageClick={handlePageClick}
              activePage={data?.data?.meta?.currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
