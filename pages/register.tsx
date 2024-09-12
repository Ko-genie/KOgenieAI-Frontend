import DangerAlert from "@/components/Alert/Danger.alert";
import GitHubLogin from "@/components/Common/GithubLogin.comp";
import BlankLayout from "@/components/Layouts/BlankLayout";
import SectionLoader from "@/components/SectionLoader";
import { ACTIVE, INACTIVE } from "@/helpers/coreConstant";
import { useSignin, useSignup } from "@/hooks/authentication.hook";
import { IRootState } from "@/store";
import { errorToast } from "@/utils/functions";
import { GoogleLogin } from "@react-oauth/google";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const RegisterCover = () => {
  const { t } = useTranslation();

  const [isTermsCheckboxChecked, setIsTermsCheckboxChecked] = useState(false);
  const [isPrivacyCheckboxChecked, setIsPrivacyCheckboxChecked] =
    useState(false);
  const { errors, handleSubmit, register, handleSignup, isLoading } =
    useSignup();
  const { handleGoogleLogin } = useSignin();
  const { settings } = useSelector((state: IRootState) => state.common.data);
  useEffect(() => {
    if (Number(settings?.terms_condition_status) === INACTIVE) {
      setIsTermsCheckboxChecked(true);
    }
    if (Number(settings?.privacy_policy_status) === INACTIVE) {
      setIsPrivacyCheckboxChecked(true);
    }
  }, [settings]);
  if (isLoading) return <SectionLoader />;

  return (
    <div className="flex min-h-screen dark:text-white">
      <div className="relative hidden min-h-screen w-1/2 flex-col items-center justify-center p-4 text-white before:absolute before:-z-10 before:h-full before:w-full before:bg-black before:bg-[url('/assets/images/ai-intro.gif')] before:bg-cover before:bg-left before:bg-no-repeat before:bg-blend-darken  lg:flex">
        <div>
          <Link href={'https://kogenie-e-solutions.vercel.app'}>
            <img
              src={settings?.site_logo ? settings?.site_logo : " "}
              alt=""
              className="mb-2 inline-block h-[90px] max-w-full"
            />
          </Link>
        </div>

        <h3 className="mb-4 text-center text-3xl font-bold">
          {t("Join the AI Revolution")}
        </h3>
        <p className="mb-7">
          {t(
            "Experience the power of AI with our SaaS platform. Join us and unlock new levels of productivity and creativity."
          )}
        </p>
      </div>
      <div className="relative flex w-full items-center justify-center bg-white dark:bg-black lg:w-1/2 ">
        <div className="w-full max-w-[480px] p-5 md:p-10">
          <h2 className="mb-3 text-3xl font-bold">{t("Register Here")}</h2>
          <p className="mb-7">{t("Enter your information to register")}</p>
          <form
            className="space-y-5"
            onSubmit={handleSubmit((data) => {
              if (!isTermsCheckboxChecked || !isPrivacyCheckboxChecked) {
                if (!isTermsCheckboxChecked) {
                  errorToast("Please accept the terms and conditions.");
                }
                if (!isPrivacyCheckboxChecked) {
                  errorToast("Please accept the privacy policy.");
                }
                return;
              }
              handleSignup(
                data.email,
                data.password,
                data.first_name,
                data.last_name,
                data.user_name
              );
            })}
          >
            <div>
              <label htmlFor="email">{t("Email")}</label>
              <input
                id="email"
                type="email"
                className="form-input"
                placeholder="Enter Email"
                {...register("email", { required: true })}
              />
              {errors.email?.type === "required" && (
                <DangerAlert msg="Email is required" />
              )}
            </div>
            <div>
              <label htmlFor="password">{t("Password")}</label>
              <input
                id="password"
                type="password"
                className="form-input"
                placeholder="Enter Password"
                {...register("password", { required: true })}
              />
              {errors.password?.type === "required" && (
                <DangerAlert msg="Password is required" />
              )}
            </div>
            <div>
              <label htmlFor="password">{t("First Name")}</label>
              <input
                id="first_name"
                type="text"
                className="form-input"
                placeholder="Enter First Name"
                {...register("first_name", { required: true })}
              />
              {errors.first_name?.type === "required" && (
                <DangerAlert msg="First name is required" />
              )}
            </div>
            <div>
              <label htmlFor="password">{t("Last Name")}</label>
              <input
                id="last_name"
                type="text"
                className="form-input"
                placeholder="Enter last Name"
                {...register("last_name", { required: true })}
              />
              {errors.last_name?.type === "required" && (
                <DangerAlert msg="Last name is required" />
              )}
            </div>
            <div>
              <label htmlFor="password">{t("User Name")}</label>
              <input
                id="user_name"
                type="text"
                className="form-input"
                placeholder="Enter username"
                {...register("user_name", { required: true })}
              />
              {errors.last_name?.type === "required" && (
                <DangerAlert msg="Username is required" />
              )}
            </div>
            {settings?.terms_condition &&
              Number(settings.terms_condition_status) === ACTIVE && (
                <div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="accept-terms-checkbox"
                      className="mr-2"
                      checked={isTermsCheckboxChecked}
                      onChange={(e) =>
                        setIsTermsCheckboxChecked(e.target.checked)
                      }
                    />
                    <label htmlFor="accept-terms-checkbox">
                      {settings?.terms_condition}
                    </label>
                  </div>
                </div>
              )}
            {settings?.privacy_policy &&
              Number(settings.privacy_policy_status) === ACTIVE && (
                <div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="accept-privacy-policy-checkbox"
                      className="mr-2"
                      checked={isPrivacyCheckboxChecked}
                      onChange={(e) =>
                        setIsPrivacyCheckboxChecked(e.target.checked)
                      }
                    />
                    <label htmlFor="accept-privacy-policy-checkbox">
                      {settings?.privacy_policy}
                    </label>
                  </div>
                </div>
              )}
            <button
              type="submit"
              className="btn btn-primary hover:bg-primary-dark mt-4 w-full rounded-md bg-primary py-2 px-4 text-white transition duration-300"
            >
              {isLoading && (
                <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-l-transparent align-middle ltr:mr-4 rtl:ml-4"></span>
              )}
              {t("Register")}
            </button>
            <div className="relative my-7 text-center md:mb-9">
              <span className="absolute inset-x-0 top-1/2 h-px w-full -translate-y-1/2 bg-white-light dark:bg-white-dark"></span>
              <span className="relative bg-white px-2 font-bold uppercase text-white-dark dark:bg-black dark:text-white-light">
                {t("or")}
              </span>
            </div>
            <div className="flex items-center justify-center gap-x-4">
              {Number(settings?.social_login_github_status) === ACTIVE && (
                <GitHubLogin text={t("Signup With Github") as string} />
              )}
              {Number(settings?.social_login_google_status) === ACTIVE && (
                <div>
                  <GoogleLogin
                    onSuccess={(credentialResponse: any) => {
                      handleGoogleLogin(
                        credentialResponse?.credential,
                        credentialResponse?.clientId
                      );
                    }}
                    type="icon"
                    shape="circle"
                    size="large"
                    theme="filled_black"
                    onError={() => {
                      console.log("Login Failed");
                    }}
                    useOneTap
                  />
                </div>
              )}
            </div>
          </form>
          <div className="mt-8 flex items-center justify-center gap-x-2 text-center">
            <p>{t(`Already have an account  ?`)}</p>
            <Link href={`/login`} className="font-bold underline">
              {t("Sign In")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

RegisterCover.getLayout = (page: any) => {
  return <BlankLayout>{page}</BlankLayout>;
};

export default RegisterCover;
