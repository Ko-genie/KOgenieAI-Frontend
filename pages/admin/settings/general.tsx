import Link from "next/link";
import { IoMdArrowBack } from "react-icons/io";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import {
  useGeneralSettingsFormHandler,
  useGetGeneralSettingsData,
} from "@/hooks/admin";
import ImagePicker from "@/components/Modals/imagePicker.comp";
import RootLoader from "@/components/RootLoader";
import SectionLoader from "@/components/SectionLoader";
import ButtonTextWithLoader from "@/components/ButtonTextWithLoader";
import { ACTIVE, INACTIVE } from "@/helpers/coreConstant";
import { useSelector } from "react-redux";
import { IRootState } from "@/store";
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
  { value: ACTIVE, label: "Active" },
  { value: INACTIVE, label: "Passive" },
];

export default function General() {
  const [countryLists, setCountryLists] = useState<any>([]);
  const { data: commnSettings } = useSelector(
    (state: IRootState) => state.common
  );
  const [openForLogo, setOpenForLogo] = React.useState(false);
  const [openForFav, setOpenForFav] = React.useState(false);
  const {
    register,
    handleSubmit,
    handleGeneralSettings,
    Controller,
    control,
    setValue,
    errors,
    uploadImageUrlForLogo,
    setuploadImageUrlForLogo,
    uploadImageUrlForFav,
    setuploadImageUrlForFav,
    siteLogoId,
    setsiteLogoId,
    setFavId,
    favId,
    isLoading: isProcessing,
  } = useGeneralSettingsFormHandler();
  const { t } = useTranslation();
  const { data: generalSettingsData, isLoading } = useGetGeneralSettingsData();
  useEffect(() => {
    setValue("site_name", generalSettingsData?.data?.site_name);
    setValue(
      "site_copy_right_text",
      generalSettingsData?.data?.site_copy_right_text
    );
    setValue("site_url", generalSettingsData?.data?.site_url);
    setuploadImageUrlForLogo(generalSettingsData?.data?.site_logo ?? null);
    setuploadImageUrlForFav(generalSettingsData?.data?.site_fav_icon ?? null);
    setValue(
      "social_login_github_status",
      Number(generalSettingsData?.data?.social_login_github_status)
        ? true
        : false
    );
    setValue(
      "social_login_google_status",
      Number(generalSettingsData?.data?.social_login_google_status)
        ? true
        : false
    );
    setValue("site_email", generalSettingsData?.data?.site_email);

    setValue("meta_title", generalSettingsData?.data?.meta_title);
    setValue("meta_keywords", generalSettingsData?.data?.meta_keywords);
    setValue("meta_description", generalSettingsData?.data?.meta_description);
    setValue(
      "google_analytics_tracking_id",
      generalSettingsData?.data?.google_analytics_tracking_id
    );
  }, [generalSettingsData?.data]);

  useEffect(() => {
    if (!countryLists || countryLists.length == 0) {
      return;
    }
    setValue(
      "default_country",
      setCountryValue(generalSettingsData?.data?.default_country)
    );
  }, [countryLists]);

  const setCurrencyValue = (data: any) => {
    if (!data) {
      return currency[0];
    }

    let newData = currency.find((item) => item.value == data);

    if (!newData?.value) {
      return currency[0];
    }

    return newData;
  };

  const setCountryValue = (data: any) => {
    if (!data) {
      return countryLists[0];
    }

    let newData = countryLists.find((item: any) => item.value == data);

    if (!newData?.value) {
      return countryLists[0];
    }

    return newData;
  };

  const setStatusValue = (data: any) => {
    if (!data) {
      return status[0];
    }

    let newData = status.find((item) => item.value == data);

    if (!newData?.value) {
      return status[0];
    }

    return newData;
  };

  useEffect(() => {
    if (!commnSettings) return;
    let langLists = commnSettings?.countryList?.map((item: any) => ({
      value: item.code,
      label: item.name,
    }));

    setCountryLists(langLists);
  }, [commnSettings]);

  useEffect(() => {
    if (!siteLogoId) {
      return;
    }
    setValue("site_logo", siteLogoId);
  }, [siteLogoId]);

  useEffect(() => {
    if (!favId) {
      return;
    }
    setValue("site_fav_icon", favId);
  }, [favId]);

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
            {`General Settings`}
          </h4>
        </div>
        <div className="mt-2 flex items-center gap-3 md:mt-0"></div>
      </div>

      <div className="py-10 px-6">
        <div className="container">
          <form onSubmit={handleSubmit(handleGeneralSettings)}>
            <div>
              <div>
                <h4 className="mb-4 text-xl font-bold">
                  {t(`Global Settings`)}
                </h4>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="site_name">{t(`Site Name`)}</label>
                  <input
                    id="site_name"
                    type="text"
                    placeholder="Site Name"
                    className="form-input"
                    {...register("site_name")}
                  />
                  <p className="mt-1 text-danger">
                    <small>{errors.site_name?.message}</small>
                  </p>
                </div>
                <div>
                  <label htmlFor="site_url">{t(`Site URL`)}</label>
                  <input
                    id="site_url"
                    type="text"
                    placeholder="Site URL"
                    className="form-input"
                    {...register("site_url")}
                  />
                  <p className="mt-1 text-danger">
                    <small>{errors.site_url?.message}</small>
                  </p>
                </div>
                <div>
                  <label htmlFor="site_email">{t(`Site Email`)}</label>
                  <input
                    id="site_email"
                    type="email"
                    placeholder="Site Email"
                    className="form-input"
                    {...register("site_email")}
                  />
                  <p className="mt-1 text-danger">
                    <small>{errors.site_email?.message}</small>
                  </p>
                </div>
                <div>
                  <label htmlFor="site_copy_right_text">
                    {t(`Copy Right Text`)}
                  </label>
                  <input
                    id="site_copy_right_text"
                    type="text"
                    placeholder="Copy Right Text"
                    className="form-input"
                    {...register("site_copy_right_text")}
                  />
                  <p className="mt-1 text-danger">
                    <small>{errors.site_copy_right_text?.message}</small>
                  </p>
                </div>
                <div>
                  <label>{t(`Default Country`)}</label>
                  <Controller
                    control={control}
                    name="default_country"
                    render={({ field }: any) => (
                      <Select
                        classNamePrefix={"wizai-select"}
                        options={countryLists}
                        {...field}
                      />
                    )}
                  />
                  <p className="mt-1 text-danger">
                    <small>{errors.default_country?.message}</small>
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <div>
                <h4 className="mb-4 text-xl font-bold">{t(`Social Login`)}</h4>
                <div className="mb-4">
                  <div className="mb-4 flex items-center gap-2">
                    <label className="relative mb-0 h-6 w-12">
                      <input
                        type="checkbox"
                        className="custom_switch peer absolute z-10 h-full w-full cursor-pointer opacity-0"
                        {...register("social_login_github_status")}
                      />

                      <span className="outline_checkbox bg-icon block h-full rounded-full border-2 border-[#ebedf2] before:absolute before:left-1 before:bottom-1 before:h-4 before:w-4 before:rounded-full before:bg-[#ebedf2] before:bg-[url(/assets/images/close.svg)] before:bg-center before:bg-no-repeat before:transition-all before:duration-300 peer-checked:border-primary peer-checked:before:left-7 peer-checked:before:bg-primary peer-checked:before:bg-[url(/assets/images/checked.svg)] dark:border-white-dark dark:before:bg-white-dark"></span>
                    </label>
                    <p>{t(`Github`)}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="relative mb-0 h-6 w-12">
                      <input
                        type="checkbox"
                        className="custom_switch peer absolute z-10 h-full w-full cursor-pointer opacity-0"
                        {...register("social_login_google_status")}
                      />

                      <span className="outline_checkbox bg-icon block h-full rounded-full border-2 border-[#ebedf2] before:absolute before:left-1 before:bottom-1 before:h-4 before:w-4 before:rounded-full before:bg-[#ebedf2] before:bg-[url(/assets/images/close.svg)] before:bg-center before:bg-no-repeat before:transition-all before:duration-300 peer-checked:border-primary peer-checked:before:left-7 peer-checked:before:bg-primary peer-checked:before:bg-[url(/assets/images/checked.svg)] dark:border-white-dark dark:before:bg-white-dark"></span>
                    </label>
                    <p>{t(`Google`)}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <div>
                <h4 className="mb-4 text-xl font-bold">{t(`Logo Settings`)}</h4>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <ImagePicker
                  open={openForLogo}
                  name={"Site Logo"}
                  setopen={setOpenForLogo}
                  uploadImageUrl={uploadImageUrlForLogo}
                  setuploadImageUrl={setuploadImageUrlForLogo}
                  setId={setsiteLogoId}
                />
                <ImagePicker
                  open={openForFav}
                  name={"Site Favicon"}
                  setopen={setOpenForFav}
                  uploadImageUrl={uploadImageUrlForFav}
                  setuploadImageUrl={setuploadImageUrlForFav}
                  setId={setFavId}
                />
              </div>
            </div>
            <div className="mt-8">
              <div>
                <h4 className="mb-4 text-xl font-bold">{t(`Seo Settings`)}</h4>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="google_analytics_tracking_id">
                    {t(
                      `Google Analytics Tracking ID (UA-1xxxxx) or (G-xxxxxx)`
                    )}
                  </label>
                  <input
                    id="google_analytics_tracking_id"
                    type="text"
                    placeholder="UA-1xxxxx"
                    className="form-input"
                    {...register("google_analytics_tracking_id")}
                  />
                </div>
                <div>
                  <label htmlFor="meta_title">{t(`Meta Title`)}</label>
                  <input
                    id="meta_title"
                    type="text"
                    placeholder="Meta Title"
                    className="form-input"
                    {...register("meta_title")}
                  />
                </div>
                <div>
                  <label htmlFor="meta_description">
                    {t(`Meta Description`)}
                  </label>
                  <textarea
                    id="meta_description"
                    rows={3}
                    className="form-textarea"
                    placeholder="Meta Description"
                    {...register("meta_description")}
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="meta_keywords">{t(`Meta Keywords`)}</label>
                  <textarea
                    id="meta_keywords"
                    rows={3}
                    className="form-textarea"
                    placeholder="ChatGPT, AI Writer, AI Art Generator"
                    {...register("meta_keywords")}
                  ></textarea>
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
        </div>
      </div>
    </div>
  );
}
