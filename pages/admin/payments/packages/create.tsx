import { useState, useEffect, Fragment } from "react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import Select from "react-select";
import Link from "next/link";
import { IoIosAdd, IoMdArrowBack } from "react-icons/io";
import {
  useGetModelData,
  usePackageSettingsFormHandler,
} from "@/hooks/paymentSettings.hook";
import {
  ACTIVE,
  AVAILABLE_FEATURES,
  INACTIVE,
  PACKAGE_DURATION,
  PACKAGE_TYPES,
} from "@/helpers/coreConstant";
import { getPriceSuggestionApi } from "@/service/paymentSettings";
import { toast } from "react-toastify";
import SectionLoader from "@/components/SectionLoader";
import ButtonTextWithLoader from "@/components/ButtonTextWithLoader";
import { useTranslation } from "react-i18next";

const ReactQuill = dynamic(import("react-quill"), { ssr: false });

const durations = [
  { value: PACKAGE_DURATION.WEEKLY, label: "Weekly" },
  { value: PACKAGE_DURATION.MONTHLY, label: "Monthly" },
  { value: PACKAGE_DURATION.YEARLY, label: "Yearly" },
];
const type = [
  { value: PACKAGE_TYPES.SUBSCRIPTION, label: "Subscription" },
  { value: PACKAGE_TYPES.PACKAGE, label: "Extended Pack" },
];
const status = [
  { value: ACTIVE, label: "Active" },
  { value: INACTIVE, label: "Inactive" },
];

const AailableFeactures = [
  { value: AVAILABLE_FEATURES.CONTENT_WRITING, label: "Content Writing" },
  { value: AVAILABLE_FEATURES.IMAGE_GENERATION, label: "Image Generation" },
  { value: AVAILABLE_FEATURES.CODE, label: "Code Generation" },
  { value: AVAILABLE_FEATURES.TRANSLATION, label: "Ai Translation" },
  { value: AVAILABLE_FEATURES.TRANSCRIPTION, label: "Ai Speech To Text" },
  { value: AVAILABLE_FEATURES.CHAT_BOT, label: "Ai Chat" },
  {
    value: AVAILABLE_FEATURES.TOPIC_TO_Spreadsheet_GENERATOR,
    label: "Ai Spreadsheet Generator",
  },
];

const Index = () => {
  const { t } = useTranslation();
  const [lists, setLists] = useState<any>([
    {
      id: 1,
      description: "",
    },
  ]);
  const {
    register,
    handleSubmit,
    handleGeneralSettings,
    Controller,
    control,
    setValue,
    errors,
    isLoading: isProcessing,
    watch,
  } = usePackageSettingsFormHandler();

  const { data: modelNames, isLoading } = useGetModelData();

  const [priceSuggestion, setPriceSuggestion] = useState("");

  const activeFeatures = watch("available_features");

  const totalImage = watch("total_images");
  const totalWords = watch("total_words");
  const modelName = watch("model_name");

  const addItem = () => {
    let maxId = 0;
    maxId = lists?.length
      ? lists.reduce(
          (max: number, item: any) => (item.id > max ? item.id : max),
          lists[0].id
        )
      : 0;

    setLists([
      ...lists,
      {
        id: maxId + 1,
        description: "",
      },
    ]);
  };

  const removeItem = (item: any) => {
    // Remove the item with the specified ID from the items array
    const updatedItems = lists.filter((data: any) => data.id != item.id);
    setLists(updatedItems);

    // Remove the corresponding form control from React Hook Form's state
    const itemIndex = lists.findIndex((data: any) => data.id == item.id);
    if (itemIndex != -1) {
      const fieldName = `feature_description_lists[${item.id}]`;
      setValue(`${fieldName}.description`, "");
    }
  };
  useEffect(() => {
    if (!activeFeatures) {
      return;
    }
    const hasWords = activeFeatures.some((item: any) => item.value === 1);
    const hasImages = activeFeatures.some((item: any) => item.value === 2);

    if (!hasWords) {
      setValue(`total_words`, 0);
    }

    if (!hasImages) {
      setValue(`total_images`, 0);
    }
  }, [activeFeatures]);

  useEffect(() => {
    getPriceSuggestion();
  }, [totalImage, totalWords, modelName?.value, activeFeatures?.value]);

  const getPriceSuggestion = async () => {
    if (!modelName?.value) return;
    if (activeFeatures?.length <= 0) return;

    if (totalImage <= 0 && totalWords <= 0) return;
    if (!totalImage && !totalWords) return;

    let data = {
      model_name: modelName?.value,
      images: totalImage,
      words: totalWords,
    };

    const response = await getPriceSuggestionApi(data);

    if (!response.success) {
      toast.error(response.message);
    }
    setPriceSuggestion(response.message);
  };

  if (isLoading) return <SectionLoader />;

  return (
    <div className="container dark:text-white">
      <div className="items-center justify-between border-b border-[#f1f3f4] px-6 py-5  dark:border-dark md:flex">
        <div className="container">
          <Link
            href={`/admin/payments/packages/subscription`}
            className="mb-3 flex items-center gap-2"
          >
            <IoMdArrowBack size={18} />
            <p>{t(`Back to Package`)}</p>
          </Link>

          <h4 className="mt- text-4xl font-bold capitalize">
            {t(`Create Package`)}
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
                  {t(`Add Package Or Subscription`)}
                </h4>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name">{t(`Name`)}</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Name"
                    className="form-input"
                    {...register("name")}
                  />
                  <p className="mt-1 text-danger">
                    <small>{errors.name?.message}</small>
                  </p>
                </div>
                <div>
                  <label>{t(`Model`)}</label>
                  <Controller
                    control={control}
                    name="model_name"
                    render={({ field }: any) => (
                      <Select
                        classNamePrefix={"wizai-select"}
                        options={modelNames?.data}
                        {...field}
                      />
                    )}
                  />
                  <p className="mt-1 text-danger">
                    <small>{errors.model_name?.message}</small>
                  </p>
                </div>
                <div>
                  <label>{t(`Type`)}</label>
                  <Controller
                    control={control}
                    defaultValue={type[0]}
                    name="type"
                    render={({ field }: any) => (
                      <Select
                        classNamePrefix={"wizai-select"}
                        options={type}
                        {...field}
                      />
                    )}
                  />
                  <p className="mt-1 text-danger">
                    <small>{errors.type?.message}</small>
                  </p>
                </div>

                <div>
                  <label>{t(`Available Features`)}</label>

                  <Controller
                    control={control}
                    name="available_features"
                    render={({ field }: any) => (
                      <Select
                        classNamePrefix={"wizai-select"}
                        options={AailableFeactures}
                        {...field}
                        isMulti
                      />
                    )}
                  />
                  <p className="mt-1 text-danger">
                    <small>{errors.available_features?.message}</small>
                  </p>
                </div>

                <div>
                  <label htmlFor="total_words">{t(`Total Words`)}</label>
                  <input
                    id="total_words"
                    type="number"
                    placeholder="0"
                    className={` ${
                      activeFeatures?.find(
                        (item: any) =>
                          item?.value == AVAILABLE_FEATURES.CONTENT_WRITING ||
                          item?.value == AVAILABLE_FEATURES.CODE ||
                          item?.value == AVAILABLE_FEATURES.TRANSLATION ||
                          item?.value == AVAILABLE_FEATURES.TRANSCRIPTION ||
                          item?.value == AVAILABLE_FEATURES.CHAT_BOT ||
                          item?.value ==
                            AVAILABLE_FEATURES.TOPIC_TO_Spreadsheet_GENERATOR
                      )?.value
                        ? ""
                        : "cursor-not-allowed"
                    }  form-input`}
                    {...register("total_words")}
                    disabled={
                      activeFeatures?.find(
                        (item: any) =>
                          item?.value == AVAILABLE_FEATURES.CONTENT_WRITING ||
                          item?.value == AVAILABLE_FEATURES.CODE ||
                          item?.value == AVAILABLE_FEATURES.TRANSLATION ||
                          item?.value == AVAILABLE_FEATURES.TRANSCRIPTION ||
                          item?.value == AVAILABLE_FEATURES.CHAT_BOT ||
                          item?.value ==
                            AVAILABLE_FEATURES.TOPIC_TO_Spreadsheet_GENERATOR
                      )?.value
                        ? false
                        : true
                    }
                  />
                  <p className="mt-1 text-danger">
                    <small>{errors.total_words?.message}</small>
                  </p>
                </div>
                <div>
                  <label htmlFor="total_images">{t(`Total Images`)}</label>
                  <input
                    id="total_images"
                    type="number"
                    placeholder="0"
                    className={` ${
                      activeFeatures?.find(
                        (item: any) =>
                          item?.value == AVAILABLE_FEATURES.IMAGE_GENERATION
                      )?.value
                        ? ""
                        : "cursor-not-allowed"
                    }  form-input`}
                    {...register("total_images")}
                    disabled={
                      activeFeatures?.find(
                        (item: any) =>
                          item?.value == AVAILABLE_FEATURES.IMAGE_GENERATION
                      )?.value
                        ? false
                        : true
                    }
                  />
                  <p className="mt-1 text-danger">
                    <small>{errors.total_images?.message}</small>
                  </p>
                </div>

                <div>
                  <label htmlFor="price">{t(`Price`)}</label>
                  <input
                    id="price"
                    type="text"
                    placeholder="Price"
                    className="form-input"
                    {...register("price")}
                  />
                  <p className="mt-1 text-warning">
                    {priceSuggestion && priceSuggestion}
                  </p>
                  <p className="mt-1 text-danger">
                    <small>{errors.price?.message}</small>
                  </p>
                </div>
                <div>
                  <label htmlFor="duration">{t(`Duration`)}</label>

                  <Controller
                    control={control}
                    defaultValue={durations[0]}
                    name="duration"
                    render={({ field }: any) => (
                      <Select
                        classNamePrefix={"wizai-select"}
                        options={durations}
                        {...field}
                      />
                    )}
                  />
                  <p className="mt-1 text-danger">
                    <small>{errors.duration?.message}</small>
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
                  <label htmlFor="description">{t(`Description`)}</label>
                  <textarea
                    id="description"
                    rows={3}
                    className="form-textarea"
                    placeholder="Description"
                    {...register("description")}
                  ></textarea>
                </div>

                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <label htmlFor="meta_keywords">
                      {t(`Feature Description Lists`)}
                    </label>

                    <button
                      type="button"
                      className="btn btn-primary rounded-full"
                      onClick={() => addItem()}
                    >
                      <IoIosAdd size={20} />
                      {t(`Add Lists`)}
                    </button>
                  </div>
                  {lists.map((item: any) => {
                    return (
                      <div
                        className="mb-2 flex items-center gap-4"
                        key={item.id}
                      >
                        <Controller
                          name={`feature_description_lists[${item.id}].description`}
                          control={control}
                          defaultValue=""
                          render={({ field }) => (
                            <input
                              {...field}
                              className="form-input"
                              placeholder="Feature Description"
                            />
                          )}
                        />
                        {lists.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeItem(item)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <line x1="18" y1="6" x2="6" y2="18"></line>
                              <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                          </button>
                        )}
                      </div>
                    );
                  })}
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
};

export default Index;
