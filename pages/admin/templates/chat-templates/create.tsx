import Link from "next/link";
import { IoMdArrowBack } from "react-icons/io";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useChatTemplatesFormHandler } from "@/hooks/admin";
import ImagePicker from "@/components/Modals/imagePicker.comp";
import ButtonTextWithLoader from "@/components/ButtonTextWithLoader";
import InputColor from "react-input-color";
import { useTranslation } from "react-i18next";

const status = [
  { value: 1, label: "Active" },
  { value: 0, label: "In-Active" },
];

export default function Index() {
  const [openForLogo, setOpenForLogo] = useState(false);
  const [color, setColor] = useState<any>({ hex: "#645CBB" });
  const { t } = useTranslation();
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
  } = useChatTemplatesFormHandler();

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
            href={`/admin/templates/chat-templates`}
            className="mb-3 flex items-center gap-2"
          >
            <IoMdArrowBack size={18} />
            <p>{t(`Back to Chat Templates`)}</p>
          </Link>

          <h4 className="mt- text-4xl font-bold capitalize">
            {t(`Create Chat Templates`)}
          </h4>
        </div>
        <div className="mt-2 flex items-center gap-3 md:mt-0"></div>
      </div>

      <div className="py-10 px-6">
        <div className="container">
          <form onSubmit={handleSubmit(handlReviews)}>
            <div>
              <div>
                <h4 className="mb-4 text-xl font-bold">{t(`Add Templates`)}</h4>
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
                  <label htmlFor="color">{t(`Template Color`)}</label>
                  <div className="custom-color-picker form-input flex items-center gap-3">
                    <Controller
                      name="color"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <>
                          <InputColor
                            initialValue={color.hex}
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
