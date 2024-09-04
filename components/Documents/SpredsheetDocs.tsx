import SectionLoader from "@/components/SectionLoader";
import DynamicTable from "@/components/Table/DynamicTable.comp";
import {
  useDeleteCodeDoc,
  useDeleteDoc,
  useMyCodes,
  useMyCsv,
  useMyDocuments,
} from "@/hooks/templateSettings.hook";
import moment from "moment";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { FaFileAlt, FaRegEye, FaRegTrashAlt } from "react-icons/fa";
import { IoIosAdd, IoMdArrowBack } from "react-icons/io";
import Swal from "sweetalert2";
import SearchBox from "../SearchBox";
import { useTranslation } from "react-i18next";

export default function SpreadsheetDocs() {
  const {
    data,
    isLoading,
    handlePageClick,
    setCurrentPage,
    setSearch,
    search,
    csvDocDeleteHandler,
    IsDeleting,
  } = useMyCsv();

  const columns = useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Result",
        accessor: (data: any) => (
          <div
            dangerouslySetInnerHTML={{ __html: data?.result.slice(0, 40) }}
          ></div>
        ),
      },
      { Header: "Total Used Words", accessor: "total_used_words" },
      {
        Header: "Actions",
        accessor: (data: any) => (
          <div className="flex space-x-2">
            <button
              className="text-gray-500 hover:text-red-700"
              onClick={() => deleteHandler(data.id)}
              disabled={IsDeleting}
            >
              <FaRegTrashAlt size={16} />
            </button>
            <Link
              href={`/ai-spreed-sheet/${data.id}`}
              className="text-gray-500 hover:text-blue-700"
            >
              <FaRegEye size={16} />
            </Link>
          </div>
        ),
      },
    ],
    []
  );

  const deleteHandler = (id: any) => {
    Swal.fire({
      title: "Do you want to Delete?",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        if (result.isConfirmed) {
          csvDocDeleteHandler(id);
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };
  const { t } = useTranslation();

  return (
    <>
      <div className="mt-4 h-full w-full">
        <div className="flex h-full flex-col">
          <div className="mb-4 items-center justify-between md:flex">
            <Link href={`/ai-spreed-sheet`} className="inline-block">
              <button
                type="button"
                className="btn btn-primary rounded-xl border-0 bg-gradient-to-r from-primary to-secondary shadow-none"
              >
                <IoIosAdd size={20} />
                {t("Generate Spreadsheet")}
              </button>
            </Link>

            <div className="mt-4 md:mt-0">
              <SearchBox search={search} setSearch={setSearch} />
            </div>
          </div>
          <div className="panel h-full overflow-auto">
            <DynamicTable
              data={data?.list || []}
              loading={isLoading}
              columns={columns}
              totalItems={data?.meta?.total}
              perPageItems={data?.meta?.perPage}
              handlePageClick={handlePageClick}
              activePage={data?.meta?.currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </>
  );
}
