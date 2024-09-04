import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { SiSubstack } from "react-icons/si";

import { MdOutlineGeneratingTokens } from "react-icons/md";
import { useRouter } from "next/router";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function PackSideBar() {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <>
      <PerfectScrollbar className="relative h-full grow ltr:-mr-3.5 ltr:pr-3.5 rtl:-ml-3.5 rtl:pl-3.5">
        <div className="space-y-1">
          <Link href={`/admin/payments/packages/subscription`}>
            <button
              className={`flex h-10 w-full items-center justify-between rounded-md p-2 font-medium hover:bg-white-dark/10 hover:text-primary dark:hover:bg-[#181F32] dark:hover:text-primary ${
                router?.pathname === "/admin/payments/packages/subscription"
                  ? "bg-gray-100 text-primary dark:bg-[#181F32] dark:text-primary"
                  : ""
              }`}
            >
              <div className="flex items-center">
                <div>
                  <SiSubstack />
                </div>
                <div className="ltr:ml-3 rtl:mr-3">
                  {t(`Subscription Plans`)}
                </div>
              </div>
            </button>
          </Link>
          <Link href={`/admin/payments/packages/aditional-packs`}>
            <button
              className={`mt-1 flex h-10 w-full items-center justify-between rounded-md p-2 font-medium hover:bg-white-dark/10 hover:text-primary dark:hover:bg-[#181F32] dark:hover:text-primary ${
                router?.pathname ===
                  "/admin/payments/packages/aditional-packs" &&
                "bg-gray-100 text-primary dark:bg-[#181F32] dark:text-primary"
              }`}
            >
              <div className="flex items-center">
                <MdOutlineGeneratingTokens size={18} />
                <div className="ltr:ml-2 rtl:mr-2">{t(`Aditional Packs`)}</div>
              </div>
            </button>
          </Link>
        </div>
      </PerfectScrollbar>
      <div className="absolute bottom-0 w-full p-4 ltr:left-0 rtl:right-0">
        <Link href={`/admin/payments/packages/create`}>
          <button className="btn btn-primary w-full">
            <svg
              className="h-5 w-5 shrink-0 ltr:mr-2 rtl:ml-2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            {t(`Add New Package`)}
          </button>
        </Link>
      </div>
    </>
  );
}
