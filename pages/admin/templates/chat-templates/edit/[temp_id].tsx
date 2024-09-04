import Link from "next/link";
import { IoMdArrowBack } from "react-icons/io";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import {
  useChatTemplatesFormHandler,
  useGetChatTemplateDetails,
  useUpdateChatTemplatesFormHandler,
} from "@/hooks/admin";
import ImagePicker from "@/components/Modals/imagePicker.comp";
import ButtonTextWithLoader from "@/components/ButtonTextWithLoader";
import InputColor from "react-input-color";
import { useRouter } from "next/router";
import SectionLoader from "@/components/SectionLoader";
import { useTranslation } from "react-i18next";

const status = [
  { value: 1, label: "Active" },
  { value: 0, label: "In-Active" },
];

export default function Index() {
  const router = useRouter();

  const { t } = useTranslation();

  const idFromQuery = router.query.temp_id;
  const [openForLogo, setOpenForLogo] = useState(false);
  const [color, setColor] = useState<any>({});

  const {
    register,
    handleSubmit,
    handlReviews,
    Controller,
    control,
    setValue,
    errors,
    uploadFeatureImage,
    setUploadFeatureImage,
    featureImage,
    setFeatureImage,
    isLoading: isProcessing,
  } = useUpdateChatTemplatesFormHandler();

  const { data: templateDetails, isLoading } = useGetChatTemplateDetails(
    idFromQuery || null
  );

  useEffect(() => {
    setValue("name", templateDetails?.data?.name);
    setValue("role", templateDetails?.data?.role);
    setValue("human_name", templateDetails?.data?.human_name);
    setValue("description", templateDetails?.data?.description);
    setValue("help_with", templateDetails?.data?.help_with);
    setValue("color", templateDetails?.data?.color);
    if (templateDetails?.data?.color) {
      setColor({
        hex: templateDetails?.data?.color
          ? templateDetails?.data?.color
          : "#645CBB",
      });
    }
    setValue("id", templateDetails?.data?.id);
    setValue("status", setStatusValue(templateDetails?.data?.status));
    setUploadFeatureImage(templateDetails?.data?.image_url ?? null);
  }, [templateDetails?.data]);

  const setStatusValue = (data: any) => {
    let newData = status.find((item) => item.value == data);

    return newData;
  };

  useEffect(() => {
    if (!featureImage) {
      return;
    }
    setValue("file_id", featureImage);
  }, [featureImage]);

  if (isLoading) return <SectionLoader />;

  return (
    <div className="container dark:text-white">
      <div className="items-center justify-between border-b border-[#f1f3f4] px-6 py-5  dark:border-dark md:flex">
        <div className="container">
          <Link
            href={`/admin/templates/chat-templates`}
            className="mb-3 flex items-center gap-2"
          >
            <IoMdArrowBack size={18} />
            <p>{t(`Back to Chat Templates`)}</p>
          </Link>

          <h4 className="mt- text-4xl font-bold capitalize">
            {t(`Update Chat Templates`)}
          </h4>
        </div>
        <div className="mt-2 flex items-center gap-3 md:mt-0"></div>
      </div>

      <div className="py-10 px-6">
        <div className="container">
          <form onSubmit={handleSubmit(handlReviews)}>
            <div>
              <div>
                <h4 className="mb-4 text-xl font-bold">
                  {t(`Edit Templates`)}
                </h4>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name">{t(`Template Name`)}</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Template Name"
                    className="form-input"
                    {...register("name")}
                  />
                  <p className="mt-1 text-danger">
                    <small>{errors.name?.message}</small>
                  </p>
                </div>

                <div>
                  <label htmlFor="role">{t(`Role`)}</label>
                  <input
                    id="role"
                    type="text"
                    placeholder="Role"
                    className="form-input"
                    {...register("role")}
                  />
                  <p className="mt-1 text-danger">
                    <small>{errors.role?.message}</small>
                  </p>
                </div>

                <div>
                  <label htmlFor="human_name">{t(`Human Name`)}</label>
                  <input
                    id="human_name"
                    type="text"
                    placeholder="Human Name"
                    className="form-input"
                    {...register("human_name")}
                  />
                  <p className="mt-1 text-danger">
                    <small>{errors.human_name?.message}</small>
                  </p>
                </div>

                <div>
                  <label htmlFor="description">{t(`Template Color`)}</label>
                  <div className="custom-color-picker form-input flex items-center gap-3">
                    <Controller
                      name="color"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <>
                          {color?.hex && (
                            <>
                              <InputColor
                                initialValue={color?.hex || ""}
                                onChange={(value) => {
                                  setColor({ hex: value.hex });
                                  field.onChange(value.hex);
                                }}
                                placement="right"
                              />
                              <input
                                id="color"
                                type="text"
                                placeholder="Color"
                                className="w-full focus:outline-0 dark:bg-[#121e32]"
                                value={color.hex}
                                onChange={(e) => {
                                  setColor({ hex: e.target.value });
                                  field.onChange(e.target.value);
                                }}
                              />
                            </>
                          )}
                        </>
                      )}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="description">
                    {t(`Template Description`)}
                  </label>
                  <textarea
                    id="description"
                    rows={13}
                    className="form-textarea"
                    placeholder="Template Description"
                    {...register("description")}
                  ></textarea>
                  <p className="mt-1 text-danger">
                    <small>{errors.description?.message}</small>
                  </p>
                </div>
                <div>
                  <label htmlFor="help_with">{t(`Help With`)}</label>
                  <textarea
                    id="help_with"
                    rows={13}
                    className="form-textarea"
                    placeholder="Help With"
                    {...register("help_with")}
                  ></textarea>
                  <p className="mt-1 text-danger">
                    <small>{errors.help_with?.message}</small>
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
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <ImagePicker
                    open={openForLogo}
                    name={"User Image"}
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
                normalText="Update"
                loadingText="Updating"
                isBtnLoading={isProcessing}
              />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
