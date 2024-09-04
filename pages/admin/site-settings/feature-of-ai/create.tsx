import Link from "next/link";
import { IoMdArrowBack } from "react-icons/io";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useFeatureOfAiFormHandler } from "@/hooks/admin";
import ImagePicker from "@/components/Modals/imagePicker.comp";
import ButtonTextWithLoader from "@/components/ButtonTextWithLoader";
import { useTranslation } from "react-i18next";

const status = [
  { value: 1, label: "Active" },
  { value: 0, label: "In-Active" },
];

export default function Index() {
  const { t } = useTranslation();
  const [openForLogo, setOpenForLogo] = useState(false);
  const {
    register,
    handleSubmit,
    handlFeatureOfAi,
    Controller,
    control,
    setValue,
    errors,
    uploadFeatureImage,
    setUploadFeatureImage,
    featureImage,
    setFeatureImage,
    isLoading: isProcessing,
  } = useFeatureOfAiFormHandler();

  useEffect(() => {
    if (!featureImage) {
      return;
    }
    setValue("file_id", featureImage);
  }, [featureImage]);

  return (
    <div className="container dark:text-white">
      <div className="items-center justify-between border-b border-[#f1f3f4] px-6 py-5 dark:border-dark md:flex">
        <div className="container">
          <Link
            href={`/admin/site-settings/feature-of-ai`}
            className="mb-3 flex items-center gap-2"
          >
            <IoMdArrowBack size={18} />
            <p>{t(`Back to Feature Of Ai`)}</p>
          </Link>

          <h4 className="mt- text-4xl font-bold capitalize">
            {t(`Create Feature Of Ai`)}
          </h4>
        </div>
        <div className="mt-2 flex items-center gap-3 md:mt-0"></div>
      </div>

      <div className="py-10 px-6">
        <div className="container">
          <form onSubmit={handleSubmit(handlFeatureOfAi)}>
            <div>
              <div>
                <h4 className="mb-4 text-xl font-bold">
                  {t(`Add Feature Of Ai`)}
                </h4>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="category_name">{t(`Category Name`)}</label>
                  <input
                    id="category_name"
                    type="text"
                    placeholder="Category Name"
                    className="form-input"
                    {...register("category_name")}
                  />
                  <p className="mt-1 text-danger">
                    <small>{errors.category_name?.message}</small>
                  </p>
                </div>
                <div>
                  <label htmlFor="title">{t(`Feature Title`)}</label>
                  <input
                    id="title"
                    type="text"
                    placeholder="Feature Title"
                    className="form-input"
                    {...register("title")}
                  />
                  <p className="mt-1 text-danger">
                    <small>{errors.title?.message}</small>
                  </p>
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
                <div>
                  <label htmlFor="description">
                    {t(`Feature Description`)}
                  </label>
                  <textarea
                    id="description"
                    rows={3}
                    className="form-textarea"
                    placeholder="Feature Description"
                    {...register("description")}
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <ImagePicker
                    open={openForLogo}
                    name={"Feature Image"}
                    setopen={setOpenForLogo}
                    uploadImageUrl={uploadFeatureImage}
                    setuploadImageUrl={setUploadFeatureImage}
                    setId={setFeatureImage}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary mt-8 min-w-[180px] rounded-full"
              disabled={isProcessing}
            >
              <ButtonTextWithLoader
                normalText="Create"
                loadingText="Creating"
                isBtnLoading={isProcessing}
              />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
