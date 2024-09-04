import Link from "next/link";
import { IoMdArrowBack } from "react-icons/io";
import React, { useEffect, useState } from "react";
import Select from "react-select";

import {
  useAddFaqSettingsFormHandler,
  useSocialMediaFormHandler,
} from "@/hooks/admin";

import ButtonTextWithLoader from "@/components/ButtonTextWithLoader";
import { FAQ_TYPE } from "@/helpers/coreConstant";
import ImagePicker from "@/components/Modals/imagePicker.comp";
import { useTranslation } from "react-i18next";

const status = [
  { value: 1, label: "Active" },
  { value: 0, label: "In-Active" },
];

export default function Index() {
  const { t } = useTranslation();
  const [openForImage, setOpenForImage] = React.useState(false);
  const {
    register,
    handleSubmit,
    handleSocialMediaSettings,
    Controller,
    control,
    setValue,
    errors,
    uploadImage,
    setUploadImage,
    socialImage,
    setSocialImage,
    isLoading: isProcessing,
  } = useSocialMediaFormHandler();

  useEffect(() => {
    if (!socialImage) {
      return;
    }
    setValue("file_id", socialImage);
  }, [socialImage]);

  return (
    <div className="container dark:text-white">
      <div className="items-center justify-between border-b border-[#f1f3f4] px-6 py-5 dark:border-dark md:flex">
        <div className="container">
          <Link
            href={`/admin/site-settings/social-media`}
            className="mb-3 flex items-center gap-2"
          >
            <IoMdArrowBack size={18} />
            <p>{t(`Back to Social Media`)}</p>
          </Link>

          <h4 className="mt- text-4xl font-bold capitalize">
            {t(`Create Social Media`)}
          </h4>
        </div>
        <div className="mt-2 flex items-center gap-3 md:mt-0"></div>
      </div>

      <div className="py-10 px-6">
        <div className="container">
          <div>
            <form onSubmit={handleSubmit(handleSocialMediaSettings)}>
              <div>
                <div>
                  <h4 className="mb-4 text-xl font-bold">
                    {t(`Add Social Media`)}
                  </h4>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name">{t(`Social Media Name`)}</label>
                    <input
                      id="name"
                      type="text"
                      placeholder="name"
                      className="form-input"
                      {...register("name")}
                    />
                    <p className="mt-1 text-danger">
                      <small>{errors.name?.message}</small>
                    </p>
                  </div>

                  <div>
                    <label htmlFor="link">{t(`Social Media Link`)}</label>
                    <input
                      id="link"
                      type="text"
                      placeholder="Social Media link"
                      className="form-input"
                      {...register("link")}
                    />
                    <p className="mt-1 text-danger">
                      <small>{errors.link?.message}</small>
                    </p>
                  </div>
                  <div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <ImagePicker
                        open={openForImage}
                        name={"Social Media Image"}
                        setopen={setOpenForImage}
                        uploadImageUrl={uploadImage}
                        setuploadImageUrl={setUploadImage}
                        setId={setSocialImage}
                      />
                    </div>
                  </div>
                  <div>
                    <label>{t(`Status`)}</label>

                    <Controller
                      control={control}
                      defaultValue={status[0]}
                      name="status"
                      render={({ field }: any) => (
                        <Select
                          classNamePrefix={"wizai-select"}
                          options={status}
                          {...field}
                        />
                      )}
                    />
                    <p className="mt-1 text-danger">
                      <small>{errors.status?.message}</small>
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
          </div>
        </div>
      </div>
    </div>
  );
}
