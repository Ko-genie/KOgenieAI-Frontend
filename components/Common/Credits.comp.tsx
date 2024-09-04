import { IRootState } from "@/store";
import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const Credits = () => {
  const { details: subscriptionDetails } = useSelector(
    (state: IRootState) => state.subcription
  );
  const { t } = useTranslation();

  const calculatePercent = (value: any) => {
    let totalValue =
      subscriptionDetails?.total_words + subscriptionDetails?.total_images;
    return (value / totalValue) * 100;
  };

  return (
    <div className="flex items-center md:justify-center rounded-md  bg-white dark:bg-black mt-4 md:mt-0">
      <h2 className="mr-3 font-extrabold uppercase dark:text-white dark:bg-dark dark:bg-opacity-[0.08] ">
        <span>{t("Credits")}</span>
      </h2>
      <div className="flex items-center space-x-3">
        <div className="flex items-center">
          <div className="h-[10px] w-[10px] rounded-full bg-primary"></div>
          <span className="text-md text-black ltr:pl-3 rtl:pr-3 dark:text-white dark:group-hover:text-white-dark">
            {t("Word")} {subscriptionDetails?.remaining_words}
          </span>
        </div>
        <div className="flex items-center">
          <div className="h-[10px] w-[10px] rounded-full bg-secondary"></div>
          <span className="text-md text-black ltr:pl-3 rtl:pr-3 dark:text-white dark:group-hover:text-white-dark">
            {t("Image")} {subscriptionDetails?.remaining_images}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Credits;
