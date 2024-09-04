import React, { useState } from "react";
import "react-data-grid/lib/styles.css";
import ReactDataGrid from "react-data-grid";
import { convertToCSV } from "@/utils/functions";
import JsonToCsvComp from "@/components/Csv/json-to-csv";
import { FaDownload } from "react-icons/fa";
import ButtonTextWithLoader from "@/components/ButtonTextWithLoader";
import Credits from "@/components/Common/Credits.comp";
import Link from "next/link";
import { IoMdArrowBack } from "react-icons/io";
import { useSpreadsheetAi } from "@/hooks/templateSettings.hook";
import NoItemFound from "@/components/Common/NoItemFound.comp";
import { useCheckSectionSubscriptionStatus } from "@/hooks/paymentSettings.hook";
import { AVAILABLE_FEATURES } from "@/helpers/coreConstant";
import PackageErrorMsg from "@/components/PackageErrorMsg";
import { useTranslation } from "react-i18next";

const JsonToCsvConverter = () => {
  const {
    register,
    Controller,
    control,
    handleAiSheetToUser,
    handleSubmit,
    result,
    isLoading,
  } = useSpreadsheetAi();
  const { enable } = useCheckSectionSubscriptionStatus(
    AVAILABLE_FEATURES.TOPIC_TO_Spreadsheet_GENERATOR
  );
  const { t } = useTranslation();

  return (
    <div className="container min-h-screen dark:text-white">
      <div className="items-center justify-between border-b border-[#f1f3f4] py-5 px-6 dark:border-dark md:flex">
        <div>
          <Link href={`/dashboard`} className="mb-3 flex items-center gap-2">
            <IoMdArrowBack size={18} />
            <p>{t("Back to Dashboard")}</p>
          </Link>

          <h4 className="mt- text-4xl font-bold capitalize">
            {t("AI Spreadsheet Generator")}
          </h4>
          {!enable && <PackageErrorMsg />}
        </div>
        <Credits />
      </div>
      <div className="py-10 px-6">
        <div className="container">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div>
              <form onSubmit={handleSubmit(handleAiSheetToUser)}>
                <div>
                  <div className="mb-4">
                    <label htmlFor="topic">{t("Topic")}</label>
                    <input
                      id="topic"
                      type="text"
                      placeholder="Code topic"
                      className="form-input"
                      {...register("topic")}
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary mt-8 min-w-[180px] rounded-full"
                  disabled={isLoading || !enable}
                >
                  <ButtonTextWithLoader
                    normalText="Generate"
                    loadingText="Generating"
                    isBtnLoading={isLoading}
                  />
                </button>
              </form>
            </div>
            <div>
              <div className="border-l border-[#f1f3f4] pl-[20px] dark:border-dark">
                {result ? (
                  <JsonToCsvComp jsonData={result} headerText="Result Data" />
                ) : (
                  <NoItemFound message={t("No data found")} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JsonToCsvConverter;
