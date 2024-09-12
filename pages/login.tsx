import React, { useEffect, useState } from "react";
import SectionLoader from "@/components/SectionLoader";
import { ACTIVE } from "@/helpers/coreConstant";
import { useSignin } from "@/hooks/authentication.hook";
import { IRootState } from "@/store";
import { GoogleLogin } from "@react-oauth/google";
import { useSelector } from "react-redux";
import BlankLayout from "@/components/Layouts/BlankLayout";
import GitHubLogin from "@/components/Common/GithubLogin.comp";
import Link from "next/link";
import RootLoader from "@/components/RootLoader";
import { useTranslation } from "react-i18next";

const LoginCover = () => {
  const { settings } = useSelector((state: IRootState) => state.common.data);
  const { t } = useTranslation();

  const {
    errors,
    handleSubmit,
    register,
    handleLogin,
    isLoading,
    handleGoogleLogin,
    setValue, // Function to set form field values
  } = useSignin();

  const demoUsers = [
    { name: "User", email: "user@email.com", password: "123456" },
    { name: "Admin", email: "admin@email.com", password: "123456" },
    // Add more demo users as needed
  ];

  const selectDemoUser = (email: string, password: string) => {
    setValue("email", email);
    setValue("password", password);
  };
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_SHOW_LOGIN_CREDENTIAL === "1") {
      setValue("email", "admin@email.com");
      setValue("password", "123456");
    }
  }, []);
  if (isLoading) return <RootLoader />;

  return (
    <div className="flex min-h-screen dark:text-white ">
      <div className="relative hidden min-h-screen w-1/2 flex-col items-center justify-center p-4 text-white before:absolute before:-z-10 before:h-full before:w-full before:bg-black before:bg-[url('/assets/images/ai-intro.gif')] before:bg-cover before:bg-left before:bg-no-repeat before:bg-blend-darken lg:flex">
        <div>
          <Link href={`/`}>
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
      <div className="relative flex w-full items-center justify-center bg-white dark:bg-black lg:w-1/2">
        <div className="w-full max-w-md rounded-lg p-5 md:p-10">
          <h2 className="mb-3 text-center text-3xl font-bold">{t("Login")}</h2>
          <form
            className="space-y-5"
            onSubmit={handleSubmit((data) => {
              handleLogin(data.email, data.password);
            })}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 dark:text-white"
              >
                {t("Email")}
              </label>
              <input
                id="email"
                type="email"
                className="form-input mt-2 rounded-md border-gray-300 focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 dark:border-dark"
                placeholder="Enter Email"
                {...register("email", { required: true })}
              />
              {errors.email?.type === "required" && (
                <p role="alert" className="mt-2 text-red-500">
                  {t("Email is required")}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 dark:text-white"
              >
                {t("Password")}
              </label>
              <input
                id="password"
                type="password"
                className="form-input mt-2 rounded-md border-gray-300 focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 dark:border-dark"
                placeholder="Enter Password"
                {...register("password", { required: true })}
              />
              {errors.password?.type === "required" && (
                <p role="alert" className="mt-2 text-red-500">
                  {t("Password is required")}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary hover:bg-primary-dark mt-4 w-full rounded-md bg-primary py-2 px-4 text-white transition duration-300"
            >
              {isLoading && (
                <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-l-transparent align-middle ltr:mr-4 rtl:ml-4 dark:border-dark"></span>
              )}
              {t("Login")}
            </button>
            <div className="relative my-7 text-center md:mb-9">
              <span className="absolute inset-x-0 top-1/2 h-px w-full -translate-y-1/2 bg-white-light dark:bg-white-dark"></span>
              <span className="relative bg-white px-2 font-bold uppercase text-white-dark dark:bg-black dark:text-white-light">
                or
              </span>
            </div>
            <div className="flex items-center justify-center gap-x-4">
              {Number(settings?.social_login_github_status) === ACTIVE && (
                <GitHubLogin />
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

          {process.env.NEXT_PUBLIC_SHOW_LOGIN_CREDENTIAL === "1" && (
            <div className="mt-4 flex justify-center">
              <table className="table-auto border-none">
                <tbody>
                  {demoUsers.map((user, index) => (
                    <tr
                      key={index}
                      className="cursor-pointer border dark:border-dark"
                      onClick={() => selectDemoUser(user.email, user.password)}
                    >
                      <td className="px-4 py-2">{user.email}</td>
                      <td className="px-4 py-2">{user.password}</td>
                      <td className="px-4 py-2">
                        <button
                          className="btn border text-black shadow-none dark:border-dark dark:text-white"
                          onClick={() => {
                            selectDemoUser(user.email, user.password);
                            handleLogin(user.email, user.password);
                          }}
                        >
                          Use
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="mt-8 flex items-center justify-center gap-x-2 text-center">
            <p>{t(`Don't have an account ?`)}</p>
            <Link href={`/register`} className="font-bold underline">
              {t("Sign Up")}
            </Link>
          </div>
          <div className="mt-8 flex items-center justify-center gap-x-2 text-center">
            <p>{t(`Forget Password?`)}</p>
            <Link href={`/forget-password`} className="font-bold underline">
              {t("Forget-password")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

LoginCover.getLayout = (page: any) => {
  return <BlankLayout>{page}</BlankLayout>;
};

export default LoginCover;
