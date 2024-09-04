import Link from "next/link";
import { IoMdArrowBack } from "react-icons/io";
import React, { useEffect, useState } from "react";
import Select from "react-select";

import { useAddFaqSettingsFormHandler } from "@/hooks/admin";

import ButtonTextWithLoader from "@/components/ButtonTextWithLoader";
import { FAQ_TYPE } from "@/helpers/coreConstant";
import { useTranslation } from "react-i18next";

const status = [
  { value: 1, label: "Active" },
  { value: 0, label: "In-Active" },
];

export default function Index() {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    handleAddFaqSettings,
    setValue,
    Controller,
    control,
    errors,
    isLoading: isProcessing,
  } = useAddFaqSettingsFormHandler();

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
            {t(`Create FAQ`)}
          </h4>
        </div>
        <div className="mt-2 flex items-center gap-3 md:mt-0"></div>
      </div>

      <div className="py-10 px-6">
        <div className="container">
          <div>
            <form onSubmit={handleSubmit(handleAddFaqSettings)}>
              <div>
                <div>
                  <h4 className="mb-4 text-xl font-bold">{t(`Add FAQ`)}</h4>
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
                  normalText="Save"
                  loadingText="Saveing"
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
