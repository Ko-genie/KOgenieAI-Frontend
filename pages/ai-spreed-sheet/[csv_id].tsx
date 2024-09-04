import {
  useGetAiSpeachToTextDetails,
  useGetCsvDetails,
} from "@/hooks/templateSettings.hook";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { IoMdArrowBack } from "react-icons/io";
import dynamic from "next/dynamic";
import SectionLoader from "@/components/SectionLoader";
import JsonToCsvComp from "@/components/Csv/json-to-csv";
import { useTranslation } from "react-i18next";

export default function Index() {
  const router = useRouter();
  const { t } = useTranslation();

  const idFromQuery = router.query.csv_id;
  const { data: docDetails, isLoading } = useGetCsvDetails(idFromQuery) || {};
  console.log(docDetails?.data?.result, "doc details");
  if (isLoading) return <SectionLoader />;
  return (
    <div className="container">
      <div className=" items-center justify-between border-b border-[#f1f3f4] py-5 px-6 dark:border-dark md:flex">
        <div>
          <Link href={`/document`} className="mb-3 flex items-center gap-2">
            <IoMdArrowBack size={18} />
            <p>{t("Back to Documents")}</p>
          </Link>

          <h4 className="mt- text-4xl font-bold capitalize">
            {" "}
            {t("Ai Spreadsheet Details")}
          </h4>
        </div>
        <div className="mt-2 flex items-center gap-3 md:mt-0"></div>
      </div>
      <div className="py-10 px-6">
        <div className="container">
          <div className="mx-auto md:w-2/3">
            <div>
              <div className="mt-4">
                {docDetails?.data?.result && (
                  <JsonToCsvComp
                    jsonData={JSON.parse(docDetails?.data?.result)}
                    headerText="Details"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
