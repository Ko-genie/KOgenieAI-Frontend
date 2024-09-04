import Tippy from "@tippyjs/react";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import "tippy.js/dist/tippy.css";
import Swal from "sweetalert2";

import moment from "moment";
import SectionLoader from "@/components/SectionLoader";
import {
  useGetUserListsForAdmin,
  useUpdateUserStatusFormHandler,
} from "@/hooks/admin";
import DynamicTable from "@/components/Table/DynamicTable.comp";
import Dropdown from "@/components/Dropdown";
import SearchBox from "@/components/SearchBox";
import { useTranslation } from "react-i18next";

export default function UserLists() {
  const [currentPage, setCurrentPage] = useState<any>(1);
  const { t } = useTranslation();

  const {
    data: userLists,
    isLoading,
    search,
    setSearch,
  } = useGetUserListsForAdmin(currentPage);

  const { updateUserStatus, isLoading: isUpdating } =
    useUpdateUserStatusFormHandler();

  const handleUpdateStatus = (data: any, status_type: any) => {
    updateUserStatus({ user_id: data.id, status_type: Number(status_type) });
  };

  const handlePageClick = (event: any) => {
    setCurrentPage(event?.selected + 1);
  };

  const columns = useMemo(
    () => [
      {
        Header: `${t("Image")}`,
        accessor: (data: any) => (
          <div>
            <img
              className="h-12 w-12 overflow-hidden rounded-full object-cover"
              src={`${
                data.photo ? data.photo : "/assets/images/user-profile.png"
              }`}
              alt="img"
            />
          </div>
        ),
      },
      {
        Header: `${t("Name")}`,
        accessor: (data: any) => (
          <div>
            {data.first_name} {data.last_name}
          </div>
        ),
      },
      {
        Header: `${t("Status")}`,
        accessor: (data: any) => (
          <label className="relative h-6 w-12">
            <input
              type="checkbox"
              className="custom_switch peer absolute z-10 h-full w-full cursor-pointer opacity-0"
              id="custom_switch_checkbox1"
              checked={data.status == 1 ? true : false}
              onClick={() => handleUpdateStatus(data, 1)}
              disabled={isUpdating}
            />
            <span className="block h-full rounded-full bg-[#ebedf2] before:absolute before:left-1 before:bottom-1 before:h-4 before:w-4 before:rounded-full before:bg-white before:transition-all before:duration-300 peer-checked:bg-primary peer-checked:before:left-7 dark:bg-dark dark:before:bg-white-dark dark:peer-checked:before:bg-white"></span>
          </label>
        ),
      },
      { Header: `${t("Email")}`, accessor: "email" },
      {
        Header: `${t("Is Email Verify")}`,
        accessor: (data: any) => (
          <label className="relative h-6 w-12">
            <input
              type="checkbox"
              className="custom_switch peer absolute z-10 h-full w-full cursor-pointer opacity-0"
              id="custom_switch_checkbox1"
              checked={data.email_verified == 1 ? true : false}
              onClick={() => handleUpdateStatus(data, 2)}
              disabled={isUpdating}
            />
            <span className="block h-full rounded-full bg-[#ebedf2] before:absolute before:left-1 before:bottom-1 before:h-4 before:w-4 before:rounded-full before:bg-white before:transition-all before:duration-300 peer-checked:bg-primary peer-checked:before:left-7 dark:bg-dark dark:before:bg-white-dark dark:peer-checked:before:bg-white"></span>
          </label>
        ),
      },
      { Header: `${t("Phone")}`, accessor: "phone" },

      {
        Header: `{t("Is Phone Verify")}`,
        accessor: (data: any) => (
          <label className="relative h-6 w-12">
            <input
              type="checkbox"
              className={` ${
                isUpdating || !data?.phone ? "cursor-not-allowed" : ""
              } custom_switch peer absolute z-10 h-full w-full cursor-pointer opacity-0`}
              id="custom_switch_checkbox1"
              checked={data.phone_verified == 1 ? true : false}
              onClick={() => handleUpdateStatus(data, 3)}
              disabled={isUpdating || (!data?.phone ? true : false)}
            />
            <span className="block h-full rounded-full bg-[#ebedf2] before:absolute before:left-1 before:bottom-1 before:h-4 before:w-4 before:rounded-full before:bg-white before:transition-all before:duration-300 peer-checked:bg-primary peer-checked:before:left-7 dark:bg-dark dark:before:bg-white-dark dark:peer-checked:before:bg-white"></span>
          </label>
        ),
      },

      {
        Header: `${t("Subscribed")}`,
        accessor: (data: any) => (
          <div>{data.is_subscribed == 1 ? "True" : "False"}</div>
        ),
      },

      {
        Header: `${t("Update At")}`,
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
          data={userLists?.data?.list || []}
          loading={isLoading}
          columns={columns}
          totalItems={userLists?.data?.meta?.total}
          perPageItems={userLists?.data?.meta?.perPage}
          handlePageClick={handlePageClick}
          activePage={userLists?.data?.meta?.currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
