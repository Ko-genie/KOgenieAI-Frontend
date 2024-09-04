import { IoIosAdd, IoMdArrowBack } from "react-icons/io";
import React from "react";
import Link from "next/link";
import CustomTemplates from "@/components/Admin/Templates/CustomTemplates";
import FaqLists from "@/components/Admin/FAQ/FaqLists";
import MyUsesTable from "@/components/User/MyUsesTable";
import { useTranslation } from "react-i18next";

export default function Index() {
  const { t } = useTranslation();

  return (
    <div className="container dark:text-white">
      <div className="px-6 items-center justify-between border-b border-[#f1f3f4] dark:border-dark py-5  md:flex">
        <div>
          <Link href={`/dashboard`} className="mb-3 flex items-center gap-2">
            <IoMdArrowBack size={18} />
            <p>{t("Back to Dashboard")}</p>
          </Link>

          <h4 className="mt- text-4xl font-bold capitalize"> My Uses</h4>
        </div>
        <div className="mt-2 flex items-center gap-3 md:mt-0"></div>
      </div>
      <div className="h-full px-6 py-8 sm:min-h-[calc(100vh_-_200px)]">
        <div className="mt-4 h-full w-full">
          <MyUsesTable />
        </div>
      </div>
    </div>
  );
}
