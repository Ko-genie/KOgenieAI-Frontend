import Link from "next/link";
import { IoMdArrowBack } from "react-icons/io";
import React, { useEffect, useState } from "react";
import {
  useGetSiteSettingsData,
  useSiteSettingsFormHandler,
} from "@/hooks/admin";
import ImagePicker from "@/components/Modals/imagePicker.comp";
import RootLoader from "@/components/RootLoader";
import SectionLoader from "@/components/SectionLoader";
import ButtonTextWithLoader from "@/components/ButtonTextWithLoader";
import { useTranslation } from "react-i18next";

export default function General() {
  const { t } = useTranslation();
  const [openForBannerImage, setOpenForBannerImage] = useState(false);
  const [logo, setLogo] = useState(false);

  const {
    register,
    handleSubmit,
    handleSiteSettings,
    Controller,
    control,
    setValue,
    errors,
    uploadImageUrlForBannerImage,
    setUploadImageUrlForBannerImage,
    bannerImageId,
    setBannerImageId,
    setLogoId,
    logoId,
    uploadImageUrlForLogo,
    setUploadImageUrlForLogo,
    isLoading: isProcessing,
  } = useSiteSettingsFormHandler();

  const { data: siteSettingsData, isLoading } = useGetSiteSettingsData();

  useEffect(() => {
    setValue(
      "landing_page_first_title",
      siteSettingsData?.data?.landing_page_first_title
    );
    setValue(
      "landing_page_first_description",
      siteSettingsData?.data?.landing_page_first_description
    );
    setValue(
      "landing_page_first_btn_text",
      siteSettingsData?.data?.landing_page_first_btn_text
    );
    setValue(
      "landing_page_hw_first_title",
      siteSettingsData?.data?.landing_page_hw_first_title
    );
    setValue(
      "landing_page_hw_first_description",
      siteSettingsData?.data?.landing_page_hw_first_description
    );
    setValue(
      "landing_page_hw_second_title",
      siteSettingsData?.data?.landing_page_hw_second_title
    );
    setValue(
      "landing_page_hw_second_description",
      siteSettingsData?.data?.landing_page_hw_second_description
    );
    setValue(
      "landing_page_hw_third_title",
      siteSettingsData?.data?.landing_page_hw_third_title
    );
    setValue(
      "landing_page_hw_third_description",
      siteSettingsData?.data?.landing_page_hw_third_description
    );
    setValue(
      "landing_page_feature_first_title",
      siteSettingsData?.data?.landing_page_feature_first_title
    );
    setValue(
      "landing_page_feature_first_description",
      siteSettingsData?.data?.landing_page_feature_first_description
    );
    setValue(
      "landing_page_feature_second_title",
      siteSettingsData?.data?.landing_page_feature_second_title
    );
    setValue(
      "landing_page_feature_second_description",
      siteSettingsData?.data?.landing_page_feature_second_description
    );
    setValue(
      "landing_page_feature_third_title",
      siteSettingsData?.data?.landing_page_feature_third_title
    );
    setValue(
      "landing_page_feature_third_description",
      siteSettingsData?.data?.landing_page_feature_third_description
    );
    setValue(
      "landing_page_feature_fourth_title",
      siteSettingsData?.data?.landing_page_feature_fourth_title
    );
    setValue(
      "landing_page_feature_fourth_description",
      siteSettingsData?.data?.landing_page_feature_fourth_description
    );

    setUploadImageUrlForBannerImage(
      siteSettingsData?.data?.landing_page_first_img_url ?? null
    );

    setUploadImageUrlForLogo(
      siteSettingsData?.data?.landing_page_logo_url ?? null
    );
  }, [siteSettingsData?.data]);

  useEffect(() => {
    if (!bannerImageId) {
      return;
    }
    setValue("landing_page_first_img_url", bannerImageId);
  }, [bannerImageId]);

  useEffect(() => {
    if (!logoId) {
      return;
    }
    setValue("landing_page_logo_url", logoId);
  }, [logoId]);

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
            {t(`Landing Page Settings`)}
          </h4>
        </div>
        <div className="mt-2 flex items-center gap-3 md:mt-0"></div>
      </div>

      <div className="py-10 px-6">
        <div className="container">
          <form onSubmit={handleSubmit(handleSiteSettings)}>
            <div>
              <div>
                <h4 className="mb-4 text-xl font-bold">
                  {t(`Banner Section`)}
                </h4>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="landing_page_first_title">
                    {t(`Banner Title`)}
                  </label>
                  <input
                    id="landing_page_first_title"
                    type="text"
                    placeholder="First Title"
                    className="form-input"
                    {...register("landing_page_first_title")}
                  />
                  <p className="mt-1 text-danger">
                    <small>{errors.landing_page_first_title?.message}</small>
                  </p>
                </div>
                <div>
                  <label htmlFor="landing_page_first_btn_text">
                    {t(`Banner Button Text`)}
                  </label>
                  <input
                    id="landing_page_first_btn_text"
                    type="text"
                    placeholder="Button Text"
                    className="form-input"
                    {...register("landing_page_first_btn_text")}
                  />
                  <p className="mt-1 text-danger">
                    <small>{errors.landing_page_first_btn_text?.message}</small>
                  </p>
                </div>

                <div>
                  <ImagePicker
                    open={openForBannerImage}
                    name={"Banner Image"}
                    setopen={setOpenForBannerImage}
                    uploadImageUrl={uploadImageUrlForBannerImage}
                    setuploadImageUrl={setUploadImageUrlForBannerImage}
                    setId={setBannerImageId}
                  />
                </div>
                <div>
                  <ImagePicker
                    open={logo}
                    name={"Landing Page Logo"}
                    setopen={setLogo}
                    uploadImageUrl={uploadImageUrlForLogo}
                    setuploadImageUrl={setUploadImageUrlForLogo}
                    setId={setLogoId}
                  />
                </div>
                <div className="mt-4">
                  <label htmlFor="landing_page_first_description">
                    {t(`Banner Description`)}
                  </label>
                  <textarea
                    id="landing_page_first_description"
                    rows={4}
                    className="form-textarea"
                    placeholder="Banner Description"
                    {...register("landing_page_first_description")}
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div>
                <h4 className="mb-4 text-xl font-bold">{t(`How it works`)}</h4>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="landing_page_hw_first_title">
                    {t(`First Title`)}
                  </label>
                  <input
                    id="landing_page_hw_first_title"
                    type="text"
                    placeholder="First Title"
                    className="form-input"
                    {...register("landing_page_hw_first_title")}
                  />
                </div>
                <div>
                  <label htmlFor="landing_page_hw_first_description">
                    {t(`First Description`)}
                  </label>
                  <textarea
                    id="landing_page_hw_first_description"
                    rows={4}
                    className="form-textarea"
                    placeholder="First Description"
                    {...register("landing_page_hw_first_description")}
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="landing_page_hw_second_title">
                    {t(`Second Title`)}
                  </label>
                  <input
                    id="landing_page_hw_second_title"
                    type="text"
                    placeholder="Second Title"
                    className="form-input"
                    {...register("landing_page_hw_second_title")}
                  />
                </div>

                <div>
                  <label htmlFor="landing_page_hw_second_description">
                    {t(`Second Description`)}
                  </label>
                  <textarea
                    id="landing_page_hw_second_description"
                    rows={4}
                    className="form-textarea"
                    placeholder="Second Description"
                    {...register("landing_page_hw_second_description")}
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="landing_page_hw_third_title">
                    {t(`Third Title`)}
                  </label>
                  <input
                    id="landing_page_hw_third_title"
                    type="text"
                    placeholder="Third Title"
                    className="form-input"
                    {...register("landing_page_hw_third_title")}
                  />
                </div>

                <div>
                  <label htmlFor="landing_page_hw_third_description">
                    {t(`Third Description`)}
                  </label>
                  <textarea
                    id="landing_page_hw_third_description"
                    rows={4}
                    className="form-textarea"
                    placeholder="Third Description"
                    {...register("landing_page_hw_third_description")}
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div>
                <h4 className="mb-4 text-xl font-bold">
                  {t(`Feature Overview`)}
                </h4>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="landing_page_feature_first_title">
                    {t(`First Title`)}
                  </label>
                  <input
                    id="landing_page_feature_first_title"
                    type="text"
                    placeholder="First Title"
                    className="form-input"
                    {...register("landing_page_feature_first_title")}
                  />
                </div>
                <div>
                  <label htmlFor="landing_page_feature_first_description">
                    {t(`First Description`)}
                  </label>
                  <textarea
                    id="landing_page_feature_first_description"
                    rows={4}
                    className="form-textarea"
                    placeholder="First Description"
                    {...register("landing_page_feature_first_description")}
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="landing_page_feature_second_title">
                    {t(`Second Title`)}
                  </label>
                  <input
                    id="landing_page_feature_second_title"
                    type="text"
                    placeholder="Second Title"
                    className="form-input"
                    {...register("landing_page_feature_second_title")}
                  />
                </div>

                <div>
                  <label htmlFor="landing_page_feature_second_description">
                    {t(`Second Description`)}
                  </label>
                  <textarea
                    id="landing_page_feature_second_description"
                    rows={4}
                    className="form-textarea"
                    placeholder="Second Description"
                    {...register("landing_page_feature_second_description")}
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="landing_page_feature_third_title">
                    {t(`Third Title`)}
                  </label>
                  <input
                    id="landing_page_feature_third_title"
                    type="text"
                    placeholder="Third Title"
                    className="form-input"
                    {...register("landing_page_feature_third_title")}
                  />
                </div>

                <div>
                  <label htmlFor="landing_page_feature_third_description">
                    {t(`Third Description`)}
                  </label>
                  <textarea
                    id="landing_page_feature_third_description"
                    rows={4}
                    className="form-textarea"
                    placeholder="Third Description"
                    {...register("landing_page_feature_third_description")}
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="landing_page_feature_fourth_title">
                    {t(`Fourth Title`)}
                  </label>
                  <input
                    id="landing_page_feature_fourth_title"
                    type="text"
                    placeholder="Third Title"
                    className="form-input"
                    {...register("landing_page_feature_fourth_title")}
                  />
                </div>

                <div>
                  <label htmlFor="landing_page_feature_fourth_description">
                    {t(`Fourth Description`)}
                  </label>
                  <textarea
                    id="landing_page_feature_fourth_description"
                    rows={4}
                    className="form-textarea"
                    placeholder="Third Description"
                    {...register("landing_page_feature_fourth_description")}
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
