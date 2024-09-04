import { useGetAiSpeachToTextDetails } from "@/hooks/templateSettings.hook";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { IoMdArrowBack } from "react-icons/io";
import dynamic from "next/dynamic";
import SectionLoader from "@/components/SectionLoader";
import { useTranslation } from "react-i18next";

export default function Index() {
  const router = useRouter();

  const idFromQuery = router.query.speech_id;
  const { data: docDetails, isLoading } =
    useGetAiSpeachToTextDetails(idFromQuery) || {};
  const { t } = useTranslation();

  if (isLoading) return <SectionLoader />;
  return (
    <div className="container">
      <div className=" items-center justify-between border-b border-[#f1f3f4] dark:border-dark py-5 px-6 md:flex">
        <div>
          <Link href={`/document`} className="mb-3 flex items-center gap-2">
            <IoMdArrowBack size={18} />
            <p>{t("Back to Documents")}</p>
          </Link>

          <h4 className="mt- text-4xl font-bold capitalize">
            {" "}
            {t("Ai Speech To Text")}
          </h4>
        </div>
        <div className="mt-2 flex items-center gap-3 md:mt-0"></div>
      </div>
      <div className="py-10 px-6">
        <div className="container">
          <div className="mx-auto md:w-2/3">
            <div>
              <h4 className="mb-4 text-xl font-bold">{t("Speech To Text Details")}</h4>
            </div>
            <div>
              <div className="mt-4">
                <textarea
                  id="text"
                  rows={3}
                  className="form-textarea"
                  placeholder="Enter Text"
                  value={docDetails?.data?.result}
                  readOnly
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
