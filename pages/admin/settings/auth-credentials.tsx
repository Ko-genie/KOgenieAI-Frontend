import Link from "next/link";
import { IoMdArrowBack } from "react-icons/io";
import React, { useEffect, useState } from "react";

import {
  useGetGithubAuthSettingsData,
  useGetGoogleAuthSettingsData,
  useGithubAuthSettingsFormHandler,
  useGoogleAuthSettingsFormHandler,
} from "@/hooks/admin";

import SectionLoader from "@/components/SectionLoader";
import ButtonTextWithLoader from "@/components/ButtonTextWithLoader";
import { useTranslation } from "react-i18next";

const country = [
  { value: "Bangladesh", label: "Bangladesh" },
  { value: "Bharat", label: "Bharat" },
  { value: "Nepal", label: "Nepal" },
];
const currency = [
  { value: "USD", label: "USD" },
  { value: "BTC", label: "BTC" },
];
const status = [
  { value: 1, label: "Active" },
  { value: 0, label: "Passive" },
];

export default function General() {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    handleGoogleAuthSettings,
    setValue,
    errors,
    isLoading: isGoogleAuthProcessing,
  } = useGoogleAuthSettingsFormHandler();

  const {
    register: githubRegister,
    handleSubmit: githubHandleSubmit,
    handleGithubAuthSettings,
    setValue: githubSetValue,
    errors: githubErrors,
    isLoading: isGithubAuthProcessing,
  } = useGithubAuthSettingsFormHandler();

  const { data: googleAtuhSettingsData, isLoading: isGoogleLoading } =
    useGetGoogleAuthSettingsData();
  const { data: githubAtuhSettingsData, isLoading: isGithubLOading } =
    useGetGithubAuthSettingsData();

  useEffect(() => {
    setValue(
      "google_auth_client_id",
      googleAtuhSettingsData?.data?.google_auth_client_id
    );
    setValue(
      "google_auth_client_secret",
      googleAtuhSettingsData?.data?.google_auth_client_secret
    );
  }, [googleAtuhSettingsData?.data]);

  useEffect(() => {
    githubSetValue(
      "github_auth_client_id",
      githubAtuhSettingsData?.data?.github_auth_client_id
    );
    githubSetValue(
      "github_auth_client_secret",
      githubAtuhSettingsData?.data?.github_auth_client_secret
    );
  }, [githubAtuhSettingsData?.data]);

  if (isGoogleLoading || isGithubLOading) return <SectionLoader />;
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
            {t(`Auth Credentials Settings`)}
          </h4>
        </div>
        <div className="mt-2 flex items-center gap-3 md:mt-0"></div>
      </div>

      <div className="py-10 px-6">
        <div className="container">
          <div>
            <form onSubmit={handleSubmit(handleGoogleAuthSettings)}>
              <div>
                <div>
                  <h4 className="mb-4 text-xl font-bold">
                    {t(`Google Auth Settings`)}
                  </h4>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="google_auth_client_id">
                      {t(`Google Auth Client Id`)}
                    </label>
                    <input
                      id="google_auth_client_id"
                      type="password"
                      placeholder="Google Auth Client Id"
                      className="form-input"
                      {...register("google_auth_client_id")}
                      required
                    />
                    <p className="mt-1 text-danger">
                      <small>{errors.google_auth_client_id?.message}</small>
                    </p>
                  </div>
                  <div>
                    <label htmlFor="google_auth_client_secret">
                      {t(`Google Auth Client Secret`)}
                    </label>
                    <input
                      id="google_auth_client_secret"
                      type="password"
                      placeholder="Google Auth Client Secret"
                      className="form-input"
                      {...register("google_auth_client_secret")}
                      required
                    />
                    <p className="mt-1 text-danger">
                      <small>{errors.google_auth_client_secret?.message}</small>
                    </p>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-primary mt-8 min-w-[180px] rounded-full"
                disabled={isGoogleAuthProcessing}
              >
                <ButtonTextWithLoader
                  normalText="Save"
                  loadingText="Saveing"
                  isBtnLoading={isGoogleAuthProcessing}
                />
              </button>
            </form>
          </div>

          <div className="mt-10">
            <form onSubmit={githubHandleSubmit(handleGithubAuthSettings)}>
              <div>
                <div>
                  <h4 className="mb-4 text-xl font-bold">
                    {t(`Github Auth Settings`)}
                  </h4>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="github_auth_client_id">
                      {t(`Github Auth Client Id`)}
                    </label>
                    <input
                      id="github_auth_client_id"
                      type="password"
                      placeholder="Github Auth Client Id"
                      className="form-input"
                      {...githubRegister("github_auth_client_id")}
                      required
                    />
                    <p className="mt-1 text-danger">
                      <small>{errors.github_auth_client_id?.message}</small>
                    </p>
                  </div>
                  <div>
                    <label htmlFor="github_auth_client_secret">
                      {t(`Github Auth Client Secret`)}
                    </label>
                    <input
                      id="github_auth_client_secret"
                      type="password"
                      placeholder="Github Auth Client Secret"
                      className="form-input"
                      {...githubRegister("github_auth_client_secret")}
                      required
                    />
                    <p className="mt-1 text-danger">
                      <small>{errors.github_auth_client_secret?.message}</small>
                    </p>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-primary mt-8 min-w-[180px] rounded-full"
                disabled={isGithubAuthProcessing}
              >
                <ButtonTextWithLoader
                  normalText="Save"
                  loadingText="Saveing"
                  isBtnLoading={isGithubAuthProcessing}
                />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
