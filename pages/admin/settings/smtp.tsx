import ButtonTextWithLoader from "@/components/ButtonTextWithLoader";
import SectionLoader from "@/components/SectionLoader";
import {
  useGetSmtpSettingsData,
  useSmtpSettingsFormHandler,
  useSmtpSettingsTestMailHandler,
} from "@/hooks/admin";
import Link from "next/link";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { IoMdArrowBack } from "react-icons/io";

export default function Smtp() {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    handleSmtpSettings,
    errors,
    setValue,
    isLoading: isProcessing,
  } = useSmtpSettingsFormHandler();

  const { data: smtpSettingsData, isLoading } = useGetSmtpSettingsData();

  const {
    register: registerForTestMail,
    handleSubmit: handleSubmitForTestMail,
    handleSmtpTestMail,
    isLoading: isSending,
  } = useSmtpSettingsTestMailHandler();

  useEffect(() => {
    setValue("smtp_host", smtpSettingsData?.data?.smtp_host);
    setValue("smtp_port", Number(smtpSettingsData?.data?.smtp_port));
    setValue("smtp_user_name", smtpSettingsData?.data?.smtp_user_name);
    setValue("smtp_password", smtpSettingsData?.data?.smtp_password);
    setValue("smtp_sender_email", smtpSettingsData?.data?.smtp_sender_email);
    setValue("smtp_sender_name", smtpSettingsData?.data?.smtp_sender_name);
    setValue("smtp_encryption", smtpSettingsData?.data?.smtp_encryption);
    setValue("mail_driver", smtpSettingsData?.data?.mail_driver);
  }, [smtpSettingsData?.data]);

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
            {t(`SMTP Settings`)}
          </h4>
        </div>
        <div className="mt-2 flex items-center gap-3 md:mt-0"></div>
      </div>

      <div className="py-10 px-6">
        <div className="container">
          <form onSubmit={handleSubmit(handleSmtpSettings)}>
            <div>
              <div>
                <h4 className="mb-4 text-xl font-bold">{t(`SMTP Settings`)}</h4>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="smtp_host">{t(`SMTP Host`)}</label>
                  <input
                    id="smtp_host"
                    type="text"
                    className={`form-input`}
                    {...register("smtp_host")}
                  />

                  <p className="mt-1 text-danger">
                    <small>{errors.smtp_host?.message}</small>
                  </p>
                </div>
                <div>
                  <label htmlFor="smtp_port">{t(`SMTP Port`)}</label>
                  <input
                    id="smtp_port"
                    type="number"
                    className={`form-input`}
                    {...register("smtp_port")}
                  />
                  <p className="mt-1 text-danger">
                    <small>{errors.smtp_port?.message}</small>
                  </p>
                </div>
                <div>
                  <label htmlFor="smtp_user_name">{t(`SMTP Username`)}</label>
                  <input
                    id="smtp_user_name"
                    type="text"
                    className={`form-input`}
                    {...register("smtp_user_name")}
                  />
                  <p className="mt-1 text-danger">
                    <small>{errors.smtp_user_name?.message}</small>
                  </p>
                </div>

                <div>
                  <label htmlFor="smtp_password">{t(`SMTP Password`)}</label>
                  <input
                    id="smtp_password"
                    type="password"
                    className={`form-input`}
                    {...register("smtp_password")}
                  />
                  <p className="mt-1 text-danger">
                    <small>{errors.smtp_password?.message}</small>
                  </p>
                </div>
                <div>
                  <label htmlFor="smtp_sender_email">
                    {t(`SMTP Sender Email`)}
                  </label>
                  <input
                    id="smtp_sender_email"
                    type="email"
                    className={`form-input`}
                    {...register("smtp_sender_email")}
                  />
                  <p className="mt-1 text-danger">
                    <small>{errors.smtp_sender_email?.message}</small>
                  </p>
                </div>
                <div>
                  <label htmlFor="smtp_sender_name">
                    {t(`SMTP Sender Name`)}
                  </label>
                  <input
                    id="smtp_sender_name"
                    type="text"
                    className={`form-input`}
                    {...register("smtp_sender_name")}
                  />
                  <p className="mt-1 text-danger">
                    <small>{errors.smtp_sender_name?.message}</small>
                  </p>
                </div>
                <div>
                  <label htmlFor="smtp_encryption">
                    {t(`SMTP Encryption`)}
                  </label>
                  <input
                    id="smtp_encryption"
                    type="text"
                    placeholder="Site Email"
                    className="form-input"
                    {...register("smtp_encryption")}
                  />
                  <p className="mt-1 text-danger">
                    <small>{errors.smtp_encryption?.message}</small>
                  </p>
                </div>
                <div>
                  <label htmlFor="mail_driver">{t(`SMTP Mail Driver`)}</label>
                  <input
                    id="mail_driver"
                    type="text"
                    className={`form-input`}
                    {...register("mail_driver")}
                  />
                  <p className="mt-1 text-danger">
                    <small>{errors.mail_driver?.message}</small>
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
                normalText="Save"
                loadingText="Saveing"
                isBtnLoading={isProcessing}
              />
            </button>
          </form>
          <div className="mt-10">
            <form onSubmit={handleSubmitForTestMail(handleSmtpTestMail)}>
              <div>
                <div>
                  <h4 className="mb-4 text-xl font-bold">{t(`SMTP Test`)}</h4>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="email">{t(`Test Email`)}</label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Email to send test email."
                      className={` form-input`}
                      {...registerForTestMail("email")}
                      required
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary mt-8 min-w-[180px] rounded-full"
                disabled={isSending}
              >
                <ButtonTextWithLoader
                  normalText="Send"
                  loadingText="Sending"
                  isBtnLoading={isSending}
                />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
