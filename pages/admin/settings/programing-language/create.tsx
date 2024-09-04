import Link from "next/link";
import { IoMdArrowBack } from "react-icons/io";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import {
  useFeatureOfAiFormHandler,
  useProgramingLanguageFormHandler,
  useReviewsFormHandler,
} from "@/hooks/admin";
import ImagePicker from "@/components/Modals/imagePicker.comp";
import ButtonTextWithLoader from "@/components/ButtonTextWithLoader";
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
    handlProgramingLanguage,
    Controller,
    control,
    setValue,
    errors,
    isLoading: isProcessing,
  } = useProgramingLanguageFormHandler();

  return (
    <div className="container dark:text-white">
      <div className="items-center justify-between border-b border-[#f1f3f4] px-6 py-5 dark:border-dark md:flex">
        <div className="container">
          <Link
            href={`/admin/settings/programing-language`}
            className="mb-3 flex items-center gap-2"
          >
            <IoMdArrowBack size={18} />
            <p>{t(`Back to Programing Language`)}</p>
          </Link>

          <h4 className="mt- text-4xl font-bold capitalize">
            {t(`Create Programing Language`)}
          </h4>
        </div>
        <div className="mt-2 flex items-center gap-3 md:mt-0"></div>
      </div>

      <div className="py-10 px-6">
        <div className="container">
          <form onSubmit={handleSubmit(handlProgramingLanguage)}>
            <div>
              <div>
                <h4 className="mb-4 text-xl font-bold">
                  {t(`Add Programing Language`)}
                </h4>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name">{t(`Language Name`)}</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Language Name"
                    className="form-input"
                    {...register("name")}
                    required
                  />
                  <p className="mt-1 text-danger">
                    <small>{errors.name?.message}</small>
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
                        required
                      />
                    )}
                  />
                  <p className="mt-1 text-danger">
                    <small>{errors.status?.message}</small>
                  </p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary mt-8 min-w-[180px] rounded-full"
              disabled={isProcessing}
            >
              <ButtonTextWithLoader
                normalText="Create"
                loadingText="Creating"
                isBtnLoading={isProcessing}
              />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
