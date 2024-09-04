import Tippy from "@tippyjs/react";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import "tippy.js/dist/tippy.css";
import Swal from "sweetalert2";

import moment from "moment";
import SectionLoader from "@/components/SectionLoader";
import {
  useDeleteFaqListsForAdmin,
  useGetFaqListsForAdmin,
  useGetMyUses,
} from "@/hooks/admin";
import DynamicTable from "@/components/Table/DynamicTable.comp";
import { AVAILABLE_FEATURES } from "@/helpers/coreConstant";
import SearchBox from "../SearchBox";

export default function MyUsesTable() {
  const [currentPage, setCurrentPage] = useState<any>(1);
  const {
    data: templateLists,
    isLoading,
    setSearch,
    search,
  } = useGetMyUses(currentPage);

  const handlePageClick = (event: any) => {
    setCurrentPage(event?.selected + 1);
  };

  const getFeatureType = (type: any) => {
    if (type == AVAILABLE_FEATURES.CONTENT_WRITING) {
      return "Content Writing";
    }
    if (type == AVAILABLE_FEATURES.IMAGE_GENERATION) {
      return "Image Generation";
    }
    if (type == AVAILABLE_FEATURES.CODE) {
      return "Ai Code";
    }
    if (type == AVAILABLE_FEATURES.TRANSLATION) {
      return "Ai Translation";
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "Uses Type",
        accessor: `uses_type`,
        Cell: (data: any) => getFeatureType(data?.value),
      },
      { Header: "Title", accessor: "title" },
      {
        Header: "Uses Word",
        accessor: "uses_word",
      },
      {
        Header: "Uses Image",
        accessor: "uses_image",
      },
      {
        Header: "Update At",
        accessor: "updated_at",
        Cell: (data: any) => moment(data?.value).format("MMMM Do YYYY"),
      },
    ],
    []
  );

  return (
    <div>
      <div className="mb-4">
        <SearchBox search={search} setSearch={setSearch} />
      </div>
      <div className="panel h-full">
        <DynamicTable
          data={templateLists?.data?.list || []}
          loading={isLoading}
          columns={columns}
          totalItems={templateLists?.data?.meta?.total}
          perPageItems={templateLists?.data?.meta?.perPage}
          handlePageClick={handlePageClick}
          activePage={templateLists?.data?.meta?.currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
