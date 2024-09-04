import React, { useEffect } from "react";
import Select from "react-select";

import Link from "next/link";
import { IoMdArrowBack } from "react-icons/io";
import {
  useGetPrivacyAndTermsSettingsData,
  usePrivacyAndTermsSettingsFormHandler,
} from "@/hooks/admin";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import SectionLoader from "@/components/SectionLoader";
import ButtonTextWithLoader from "@/components/ButtonTextWithLoader";
import { useTranslation } from "react-i18next";

const status = [
  { value: 1, label: "Active" },
  { value: 0, label: "In-Active" },
];
const statusForPrivacy = [
  { value: 1, label: "Active" },
  { value: 0, label: "In-Active" },
];

// Import Quill
const ReactQuill = dynamic(import("react-quill"), { ssr: false });

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [] }],
    ["bold", "italic", "underline", "strike"],
    ["link", "image"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    ["color", "background"],
    ["clean"],
  ],
};

export default function Index() {
  const { data: privacyAndTermsSettingsData, isLoading } =
    useGetPrivacyAndTermsSettingsData();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    handlePrivacyAndTermsSettings,
    errors,
    setValue,
    watch,
    Controller,
    control,
    isLoading: isProcessing,
  } = usePrivacyAndTermsSettingsFormHandler();

  useEffect(() => {
    setValue(
      "privacy_policy",
      privacyAndTermsSettingsData?.data?.privacy_policy
    );
    setValue(
      "terms_condition",
      privacyAndTermsSettingsData?.data?.terms_condition
    );
    setValue(
      "privacy_policy_status",
      setStatusValueForPrivacy(
        privacyAndTermsSettingsData?.data?.privacy_policy_status
      )
    );
    setValue(
      "terms_condition_status",
      setStatusValue(privacyAndTermsSettingsData?.data?.terms_condition_status)
    );
  }, [privacyAndTermsSettingsData?.data]);

  const setStatusValue = (data: any) => {
    let newData = status.find((item) => item.value == data);

    return newData;
  };

  const setStatusValueForPrivacy = (data: any) => {
    let newData = statusForPrivacy.find((item) => item.value == data);

    return newData;
  };

  if (isLoading) return <SectionLoader />;
  return (
    <div className="container dark:text-white">
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
            {t(`Privacy Policy And Terms Settings`)}
          </h4>
        </div>
        <div className="mt-2 flex items-center gap-3 md:mt-0"></div>
      </div>

      <div className="py-10 px-6">
        <div className="container">
          <form onSubmit={handleSubmit(handlePrivacyAndTermsSettings)}>
            <div>
              <div className="xl:w-2/3">
                <div>
                  <h4 className="mb-2 text-xl font-bold">
                    {t(`Privacy Policy`)}
                  </h4>
                </div>
                <div className="mt-4 ">
                  <Controller
                    control={control}
                    defaultValue=""
                    name="privacy_policy"
                    render={({ field }: any) => (
                      <ReactQuill {...field} theme="snow" modules={modules} />
                    )}
                  />
                </div>
              </div>
              <div className="mt-4 xl:w-2/3">
                <label>{t(`Privacy Policy Status`)}</label>

                <Controller
                  control={control}
                  name="privacy_policy_status"
                  render={({ field }: any) => (
                    <Select
                      classNamePrefix={"wizai-select"}
                      options={statusForPrivacy}
                      {...field}
                      required
                    />
                  )}
                />
                <p className="mt-1 text-danger">
                  <small>{errors.privacy_policy_status?.message}</small>
                </p>
              </div>
              <div className="mt-8 xl:w-2/3">
                <div>
                  <h4 className="mb-2 text-xl font-bold">
                    {t(`Terms & Conditions`)}
                  </h4>
                </div>
                <div className="mt-4 ">
                  <Controller
                    control={control}
                    defaultValue=""
                    name="terms_condition"
                    render={({ field }: any) => (
                      <ReactQuill {...field} theme="snow" modules={modules} />
                    )}
                  />
                </div>
              </div>
              <div className="mt-4 xl:w-2/3">
                <label>{t(`Terms & Conditions Status`)}</label>

                <Controller
                  control={control}
                  name="terms_condition_status"
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
                  <small>{errors.terms_condition_status?.message}</small>
                </p>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary mt-8 min-w-[180px] rounded-full"
              disabled={isProcessing}
            >
              <ButtonTextWithLoader
                normalText="Save"
                loadingText="Saving"
                isBtnLoading={isProcessing}
              />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
