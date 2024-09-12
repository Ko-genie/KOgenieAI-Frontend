import DangerAlert from "@/components/Alert/Danger.alert";
import BlankLayout from "@/components/Layouts/BlankLayout";
import { useVerifyEmail } from "@/hooks/authentication.hook";
import { IRootState } from "@/store";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const RegisterCover = () => {
  const { errors, handleSubmit, register, handleVerifyCode, isLoading } =
    useVerifyEmail();
  const { t } = useTranslation();

  const { settings } = useSelector((state: IRootState) => state.common.data);

  return (
    <div className="flex min-h-screen">
      <div className="relative hidden min-h-screen w-1/2 flex-col items-center justify-center p-4 text-white before:absolute before:-z-10 before:h-full before:w-full before:bg-black before:bg-[url('/assets/images/ai-intro.gif')] before:bg-cover before:bg-left before:bg-no-repeat before:bg-blend-darken dark:text-black lg:flex">
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
          {t("Experience the power of AI with our SaaS platform. Join us and unlock new levels of productivity and creativity.")}
        </p>
      </div>
      <div className="relative flex w-full items-center justify-center lg:w-1/2 ">
        <div className="w-full max-w-[480px] p-5 md:p-10">
          <h2 className="mb-3 text-3xl font-bold">{t("Register Here")}</h2>
          <p className="mb-7">{t("Enter your information to register")}</p>
          <form
            className="space-y-5"
            onSubmit={handleSubmit((data) => {
              handleVerifyCode(data.email, data.code);
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
              <label htmlFor="code">{t("Code")}</label>
              <input
                id="code"
                type="text"
                className="form-input"
                placeholder="Enter Email"
                {...register("code", { required: true })}
              />
              {errors.email?.type === "required" && (
                <DangerAlert msg="Code is required" />
              )}
            </div>
            <button type="submit" className="btn btn-primary w-full">
              {isLoading && (
                <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-l-transparent align-middle ltr:mr-4 rtl:ml-4"></span>
              )}
              {t("Verify code")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
RegisterCover.getLayout = (page: any) => {
  return <BlankLayout>{page}</BlankLayout>;
};
export default RegisterCover;
