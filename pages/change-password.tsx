import ButtonTextWithLoader from "@/components/ButtonTextWithLoader";
import { useChangePassword } from "@/hooks/user.hook";
import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";
import { IoMdArrowBack } from "react-icons/io";

const ChangePassword = () => {
  const { register, errors, handleSubmit, handlePasswordChange, isLoading } =
    useChangePassword();
  const { t } = useTranslation();
  
  return (
    <div>
      <div className="container min-h-screen dark:text-white">
        <div className="px-6 items-center justify-between border-b border-[#f1f3f4] dark:border-dark py-5 md:flex">
          <div className="container">
            <Link
              href={`/admin/dashboard`}
              className="mb-3 flex items-center gap-2"
            >
              <IoMdArrowBack size={18} />
              <p>{t("Back to Dashboard")}</p>
            </Link>

            <h4 className="mt- text-4xl font-bold capitalize">
              {t("Change Password")}
            </h4>
          </div>
          <div className="mt-2 flex items-center gap-3 md:mt-0"></div>
        </div>
        <div className="py-10 px-6">
          <div className="container">
            <form onSubmit={handleSubmit(handlePasswordChange)}>
              <div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="current_password">{t("Current Password")}</label>
                    <input
                      id="current_password"
                      type="password"
                      placeholder="Current Password"
                      className="form-input"
                      {...register("current_password")}
                    />
                    <p className="mt-1 text-danger">
                      <small>{errors.current_password?.message}</small>
                    </p>
                  </div>

                  <div>
                    <label htmlFor="password">{t("New Password")}</label>
                    <input
                      id="password"
                      type="password"
                      placeholder="New Password"
                      className="form-input"
                      {...register("password")}
                    />
                    <p className="mt-1 text-danger">
                      <small>{errors.password?.message}</small>
                    </p>
                  </div>
                  <div>
                    <label htmlFor="confirm_password">{t("Confirm Password")}</label>
                    <input
                      id="confirm_password"
                      type="tetx"
                      placeholder="Confirm Password"
                      className="form-input"
                      {...register("confirm_password")}
                    />
                    <p className="mt-1 text-danger">
                      <small>{errors.confirm_password?.message}</small>
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary mt-8 min-w-[180px] rounded-full"
                disabled={isLoading}
              >
                <ButtonTextWithLoader
                  normalText="Change"
                  loadingText="Changing...."
                  isBtnLoading={isLoading}
                />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
