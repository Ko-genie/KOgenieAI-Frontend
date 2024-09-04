import React, { useMemo, useState } from "react";
import "tippy.js/dist/tippy.css";
import "react-quill/dist/quill.snow.css";
import { SiSubstack } from "react-icons/si";
import PackSideBar from "@/components/Packages/PackSideBar";
import Tippy from "@tippyjs/react";
import { usePackages } from "@/hooks/paymentSettings.hook";
import Link from "next/link";
import DynamicTable from "@/components/Table/DynamicTable.comp";
import SectionLoader from "@/components/SectionLoader";
import { useTranslation } from "react-i18next";

const Index = () => {
  const { t } = useTranslation();
  const handlePageClick = (event: any) => {
    setCurrentPage(event?.selected + 1);
  };

  const [isShowTaskMenu, setIsShowTaskMenu] = useState(false);

  const { deleteHandler, setCurrentPage, packagesData, IsGetLoading } =
    usePackages();

  const columns = useMemo(
    () => [
      { Header: t("Name"), accessor: "name" },
      { Header: t("Status"), accessor: "status" },
      { Header: t("Price"), accessor: "price" },
      { Header: t("Total Words"), accessor: "total_words" },
      { Header: t("Total Images"), accessor: "total_images" },
      { Header: t("Update At"), accessor: "updated_at" },
      // Add the actions column here
      {
        Header: t("Actions"),
        accessor: (data: any) => actions(data), // Render the actions column using the actions function
      },
    ],
    []
  );

  // Define the actions for each row
  const actions = (data: any) => (
    <div className="">
      <Tippy content="Edit">
        <Link href={`/admin/payments/packages/edit/${data.id}`}>
          <button type="button">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-4.5 w-4.5 ltr:mr-2 rtl:ml-2"
            >
              <path
                d="M15.2869 3.15178L14.3601 4.07866L5.83882 12.5999L5.83881 12.5999C5.26166 13.1771 4.97308 13.4656 4.7249 13.7838C4.43213 14.1592 4.18114 14.5653 3.97634 14.995C3.80273 15.3593 3.67368 15.7465 3.41556 16.5208L2.32181 19.8021L2.05445 20.6042C1.92743 20.9852 2.0266 21.4053 2.31063 21.6894C2.59466 21.9734 3.01478 22.0726 3.39584 21.9456L4.19792 21.6782L7.47918 20.5844L7.47919 20.5844C8.25353 20.3263 8.6407 20.1973 9.00498 20.0237C9.43469 19.8189 9.84082 19.5679 10.2162 19.2751C10.5344 19.0269 10.8229 18.7383 11.4001 18.1612L11.4001 18.1612L19.9213 9.63993L20.8482 8.71306C22.3839 7.17735 22.3839 4.68748 20.8482 3.15178C19.3125 1.61607 16.8226 1.61607 15.2869 3.15178Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                opacity="0.5"
                d="M14.36 4.07812C14.36 4.07812 14.4759 6.04774 16.2138 7.78564C17.9517 9.52354 19.9213 9.6394 19.9213 9.6394M4.19789 21.6777L2.32178 19.8015"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </button>
        </Link>
      </Tippy>
      <Tippy content="Delete">
        <button
          type="button"
          className=""
          onClick={() => deleteHandler(data.id)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
          >
            <path
              d="M20.5001 6H3.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M18.8334 8.5L18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              opacity="0.5"
              d="M9.5 11L10 16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              opacity="0.5"
              d="M14.5 11L14 16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              opacity="0.5"
              d="M6.5 6C6.55588 6 6.58382 6 6.60915 5.99936C7.43259 5.97849 8.15902 5.45491 8.43922 4.68032C8.44784 4.65649 8.45667 4.62999 8.47434 4.57697L8.57143 4.28571C8.65431 4.03708 8.69575 3.91276 8.75071 3.8072C8.97001 3.38607 9.37574 3.09364 9.84461 3.01877C9.96213 3 10.0932 3 10.3553 3H13.6447C13.9068 3 14.0379 3 14.1554 3.01877C14.6243 3.09364 15.03 3.38607 15.2493 3.8072C15.3043 3.91276 15.3457 4.03708 15.4286 4.28571L15.5257 4.57697C15.5433 4.62992 15.5522 4.65651 15.5608 4.68032C15.841 5.45491 16.5674 5.97849 17.3909 5.99936C17.4162 6 17.4441 6 17.5 6"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </button>
      </Tippy>
    </div>
  );
  if (IsGetLoading) return <SectionLoader />;
  return (
    <div className="m-6 dark:text-white">
      <div className="relative flex h-full min-h-[calc(100vh-_150px)] gap-5">
        <div
          className={`panel absolute z-10 hidden h-full w-[240px] max-w-full flex-none space-y-4 p-4 ltr:rounded-r-none rtl:rounded-l-none xl:relative xl:block xl:h-auto ltr:xl:rounded-r-md rtl:xl:rounded-l-md ${
            isShowTaskMenu && "!block"
          }`}
        >
          <div className="flex h-full flex-col pb-16">
            <div className="pb-5">
              <div className="flex items-center text-center">
                <div className="shrink-0">
                  <SiSubstack />
                </div>
                <h3 className="text-lg font-semibold ltr:ml-3 rtl:mr-3">
                  {t(`Aditional Pack`)}
                </h3>
              </div>
            </div>
            <div className="mb-5 h-px w-full border-b border-white-light dark:border-[#1b2e4b]"></div>
            <PackSideBar />
          </div>
        </div>
        <div
          className={`overlay absolute z-[5] hidden h-full w-full rounded-md bg-black/60 ${
            isShowTaskMenu && "!block xl:!hidden"
          }`}
          onClick={() => setIsShowTaskMenu(!isShowTaskMenu)}
        ></div>
        <div className="flex-1 overflow-auto">
          <div className="panel h-full flex-1  p-0">
            <div className="flex h-full flex-col">
              <div className="flex w-full flex-col gap-4 p-4 sm:flex-row sm:items-center xl:!hidden">
                <div className="flex items-center ltr:mr-3 rtl:ml-3">
                  <button
                    type="button"
                    className="block hover:text-primary ltr:mr-3 rtl:ml-3 xl:hidden"
                    onClick={() => setIsShowTaskMenu(!isShowTaskMenu)}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 7L4 7"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        opacity="0.5"
                        d="M20 12L4 12"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M20 17L4 17"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="panel h-full">
                <DynamicTable
                  data={packagesData?.data?.packages || []}
                  loading={IsGetLoading}
                  columns={columns}
                  actions={actions}
                  totalItems={packagesData?.data?.meta?.total}
                  perPageItems={packagesData?.data?.meta?.perPage}
                  handlePageClick={handlePageClick}
                  activePage={packagesData?.data?.meta?.currentPage}
                  onPageChange={setCurrentPage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
