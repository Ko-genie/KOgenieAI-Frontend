import Link from "next/link";
import { IoMdArrowBack } from "react-icons/io";
import React, { useEffect, useState } from "react";
import Select from "react-select";

import {
  useAddFaqSettingsFormHandler,
  useGetFaqDetails,
  useUpdateFaqSettingsFormHandler,
} from "@/hooks/admin";

import ButtonTextWithLoader from "@/components/ButtonTextWithLoader";
import { FAQ_TYPE } from "@/helpers/coreConstant";
import SectionLoader from "@/components/SectionLoader";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const status = [
  { value: 1, label: "Active" },
  { value: 0, label: "In-Active" },
];

export default function Index() {
  const router = useRouter();
  const { t } = useTranslation();

  const idFromQuery = router.query.faq_id;
  const {
    register,
    handleSubmit,
    handleUpdateFaqSettings,
    setValue,
    Controller,
    control,
    errors,
    isLoading: isProcessing,
  } = useUpdateFaqSettingsFormHandler();

  const { data: faqDetails, isLoading } = useGetFaqDetails(idFromQuery || {});

  useEffect(() => {
    setValue("answer", faqDetails?.data?.answer);
    setValue("type", faqDetails?.data?.type);
    setValue("question", faqDetails?.data?.question);
    setValue("id", faqDetails?.data?.id);
    setValue("status", setStatusValue(faqDetails?.data?.status));
  }, [faqDetails?.data]);

  const setStatusValue = (data: any) => {
    let newData = status.find((item) => item.value == data);

    return newData;
  };

  if (isLoading) return <SectionLoader />;

  return (
    <div className="container dark:text-white">
      <div className="items-center justify-between border-b border-[#f1f3f4] px-6 py-5 dark:border-dark md:flex">
        <div className="container">
          <Link
            href={`/admin/faqs`}
            className="mb-3 flex items-center gap-2"
          >
            <IoMdArrowBack size={18} />
            <p>{t(`Back to FAQ`)}</p>
          </Link>

          <h4 className="mt- text-4xl font-bold capitalize">
            {t(`Update FAQ`)}
          </h4>
        </div>
        <div className="mt-2 flex items-center gap-3 md:mt-0"></div>
      </div>

      <div className="py-10 px-6">
        <div className="container">
          <div>
            <form onSubmit={handleSubmit(handleUpdateFaqSettings)}>
              <div>
                <div>
                  <h4 className="mb-4 text-xl font-bold">{t(`Edit FAQ`)}</h4>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <input
                    type="text"
                    className="form-input"
                    {...register("type")}
                    value={FAQ_TYPE.LANDING_PAGE}
                    hidden
                  />
                  <div>
                    <label htmlFor="question">{t(`Question`)}</label>
                    <input
                      id="question"
                      type="text"
                      placeholder="Question"
                      className="form-input"
                      {...register("question")}
                    />
                    <p className="mt-1 text-danger">
                      <small>{errors.question?.message}</small>
                    </p>
                  </div>

                  <div>
                    <label>{t(`Status`)}</label>

                    <Controller
                      control={control}
                      defaultValue={status[0]}
                      name="status"
                      render={({ field }: any) => (
                        <Select
                          classNamePrefix={"wizai-select"}
                          options={status}
                          {...field}
                        />
                      )}
                    />
                    <p className="mt-1 text-danger">
                      <small>{errors.status?.message}</small>
                    </p>
                  </div>
                  <div>
                    <label htmlFor="answer">{t(`Answer`)}</label>
                    <textarea
                      id="answer"
                      rows={3}
                      className="form-textarea"
                      placeholder="Answer"
                      {...register("answer")}
                    ></textarea>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-primary mt-8 min-w-[180px] rounded-full"
                disabled={isProcessing}
              >
                <ButtonTextWithLoader
                  normalText="Update"
                  loadingText="Updating"
                  isBtnLoading={isProcessing}
                />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
