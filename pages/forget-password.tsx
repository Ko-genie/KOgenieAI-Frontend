import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { setPageTitle } from "../store/themeConfigSlice";
import BlankLayout from "@/components/Layouts/BlankLayout";
import { useTranslation } from "react-i18next";
import { IRootState } from "@/store";
import Link from "next/link";
import { useForgetPassword } from "@/hooks/authentication.hook";

const RecoverIdCover = () => {
  const { settings } = useSelector((state: IRootState) => state.common.data);
  const {
    register,
    handleSubmit,
    errors,
    handleForgetPassword,
    isLoading,
    setValue,
  } = useForgetPassword();
  const router = useRouter();

  const submitForm = (e: any) => {
    e.preventDefault();
    router.push("/");
  };
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen">
      <div className="relative hidden min-h-screen w-1/2 flex-col items-center justify-center p-4 text-white before:absolute before:-z-10 before:h-full before:w-full before:bg-black before:bg-[url('/assets/images/ai-intro.gif')] before:bg-cover before:bg-left before:bg-no-repeat before:bg-blend-darken lg:flex">
        <div>
          <Link href={"https://kogenie-e-solutions.vercel.app"}>
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
      <div className="relative flex w-full items-center justify-center lg:w-1/2 ">
        <div className="w-full max-w-[480px] p-5 md:p-10">
          <h2 className="mb-3 text-3xl font-bold">{t("Forgot password")}</h2>
          <p className="mb-7">{t("Enter your email to recover your ID")}</p>
          <form
            className="space-y-5"
            onSubmit={handleSubmit((data) => {
              handleForgetPassword(data.email, data.password);
            })}
          >
            <div>
              <label htmlFor="email">{t("Email")}</label>
              <input
                id="email"
                type="email"
                className="form-input mt-2 rounded-md border-gray-300 focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 dark:border-dark"
                placeholder="Enter Email"
                {...register("email", { required: true })}
              />
            </div>
            <button type="submit" className="btn btn-primary w-full">
              {t("RECOVER")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
RecoverIdCover.getLayout = (page: any) => {
  return <BlankLayout>{page}</BlankLayout>;
};
export default RecoverIdCover;
