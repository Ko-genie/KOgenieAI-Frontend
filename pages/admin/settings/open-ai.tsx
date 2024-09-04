import React, { useState, useEffect } from "react";
import Link from "next/link";
import { IoMdArrowBack } from "react-icons/io";
import { useOpenAi } from "@/hooks/admin";
import Select from "react-select";
import { useForm } from "react-hook-form";
import SectionLoader from "@/components/SectionLoader";
import ButtonTextWithLoader from "@/components/ButtonTextWithLoader";
import { useTranslation } from "react-i18next";

export default function Index() {
  const {
    data,
    SettingsData,
    SettingsLoading,
    handleUpdate,
    Controller,
    control,
    errors,
    setValue,
    handleSubmit,
    register,
    IsUpdating,
  } = useOpenAi();
  const [modelValue, setModelValue] = useState("");

  const { t } = useTranslation();
  useEffect(() => {
    if (SettingsData && SettingsData?.data) {
      setValue("open_ai_secret", "*********");
      setValue("open_ai_model", {
        value: SettingsData?.data?.open_ai_model,
        label: SettingsData?.data?.open_ai_model,
      });

      setValue("open_ai_temperature", SettingsData?.data?.open_ai_temperature);
      setValue(
        "open_ai_max_output_length",
        SettingsData?.data?.open_ai_max_output_length
      );
    }
  }, [SettingsData]);
  if (SettingsLoading) return <SectionLoader />;
  return (
    <div className="container min-h-screen dark:text-white">
      <div className="items-center justify-between border-b border-[#f1f3f4] px-6 py-5 dark:border-dark md:flex">
        <div className="container">
          <Link
            href={`/admin/dashboard`}
            className="mb-3 flex items-center gap-2"
          >
            <IoMdArrowBack size={18} />
            <p>{t(`Back to Dashboard`)}</p>
          </Link>

          <h4 className="mt- text-4xl font-bold capitalize">
            {t(`OpenAi Settings`)}
          </h4>
        </div>
        <div className="mt-2 flex items-center gap-3 md:mt-0"></div>
      </div>
      <div className="py-10 px-6">
        <div className="container">
          <form onSubmit={handleSubmit(handleUpdate)}>
            <div>
              <div>
                <h4 className="mb-4 text-xl font-bold">
                  {t(`OpenAi Settings`)}
                </h4>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="open_ai_secret">
                    {t(`OpenAi API Secret`)}
                  </label>
                  <input
                    id="open_ai_secret"
                    type="text"
                    placeholder="OpenAi API Secret"
                    className="form-input"
                    {...register("open_ai_secret")}
                  />
                  <p className="mt-1 text-danger">
                    <small>{errors.open_ai_max_output_length?.message}</small>
                  </p>
                </div>
                <div>
                  <label>{t(`Default Openai Model`)}</label>
                  <Controller
                    control={control}
                    defaultValue={``}
                    name="open_ai_model"
                    render={({ field }: any) => (
                      <Select
                        classNamePrefix={"wizai-select"}
                        options={data?.data}
                        {...field}
                      />
                    )}
                  />
                  <p className="mt-1 text-danger">
                    <small>{errors.open_ai_model?.message}</small>
                  </p>
                </div>
                <div>
                  <label htmlFor="open_ai_temperature">
                    {t(`Temperature`)}
                  </label>
                  <input
                    id="open_ai_temperature"
                    type="number"
                    placeholder="Temperature"
                    className="form-input"
                    {...register("open_ai_temperature")}
                  />
                  <p className="mt-1 text-danger">
                    <small>{errors.open_ai_temperature?.message}</small>
                  </p>
                </div>
                <div>
                  <label htmlFor="open_ai_max_output_length">
                    {t(`Maximum Output Length`)}
                  </label>
                  <input
                    id="open_ai_max_output_length"
                    type="number"
                    placeholder="Maximum Output Length"
                    className="form-input"
                    {...register("open_ai_max_output_length")}
                  />
                  <p className="mt-1 text-danger">
                    <small>{errors.open_ai_max_output_length?.message}</small>
                  </p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary mt-8 min-w-[180px] rounded-full"
              disabled={IsUpdating}
            >
              <ButtonTextWithLoader
                normalText="Save"
                loadingText="Saveing"
                isBtnLoading={IsUpdating}
              />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
