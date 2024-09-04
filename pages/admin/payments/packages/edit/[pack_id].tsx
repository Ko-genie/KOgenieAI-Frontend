import { useState, useEffect, Fragment } from "react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import Select from "react-select";
import Link from "next/link";
import { IoIosAdd, IoMdArrowBack } from "react-icons/io";
import {
  useGetModelData,
  useGetSinglePackagesData,
  usePackageSettingsFormHandler,
  usePackageUpdateSettingsFormHandler,
} from "@/hooks/paymentSettings.hook";
import {
  ACTIVE,
  AVAILABLE_FEATURES,
  INACTIVE,
  PACKAGE_DURATION,
  PACKAGE_TYPES,
} from "@/helpers/coreConstant";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { getPriceSuggestionApi } from "@/service/paymentSettings";
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
  const router = useRouter();

  const { t } = useTranslation();

  const idFromQuery = router.query.pack_id;
  const [priceSuggestion, setPriceSuggestion] = useState("");

  // Call the useGetSinglePackagesData function with the "id" value from the URL
  const { data: modelNames, isLoading: loadingForModelName } =
    useGetModelData();

  const { data: packDetails, isLoading } =
    useGetSinglePackagesData(idFromQuery) || {};

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
  } = usePackageUpdateSettingsFormHandler();

  const initialAviableFeature = [AailableFeactures[0]];

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
    const updatedItems = lists.filter((data: any) => data.id != item.id);
    setLists(updatedItems);
    const itemIndex = lists.findIndex((data: any) => data.id == item.id);
    if (itemIndex != -1) {
      const fieldName = `feature_description_lists[${item.id}]`;
      setValue(`${fieldName}.description`, "");
    }
  };

  useEffect(() => {
    setValue("name", packDetails?.data?.name);
    setValue("id", packDetails?.data?.id);
    setValue("description", packDetails?.data?.description);
    setValue("price", Number(packDetails?.data?.price));
    setValue("total_words", Number(packDetails?.data?.total_words));
    setValue("total_images", Number(packDetails?.data?.total_images));

    setValue("status", setStatusValue(packDetails?.data?.status));
    setValue("duration", handleSetDuration(packDetails?.data?.duration));
    setValue("type", handleSetPackType(packDetails?.data?.type));
    setValue(
      "available_features",
      handleSetAvailableFeature(packDetails?.data?.available_features)
    );

    handleFeatureLists(packDetails?.data?.feature_description_lists);
  }, [packDetails?.data]);

  const handleFeatureLists = (data: any) => {
    if (!data) {
      return;
    }
    const arrayFromString = data.split(",");

    const transformedArray = arrayFromString.map((value: any, index: any) => {
      return { id: index + 1, description: value };
    });

    setLists(transformedArray);

    transformedArray.map((item: any) => {
      const fieldName = `feature_description_lists[${item.id}].description`;
      const value = item.description;
      setValue(fieldName, value);
    });
  };

  useEffect(() => {
    if (modelNames?.data.length > 0 && !loadingForModelName) {
      setValue("model_name", handleSetModelName(packDetails?.data?.model_name));
    }
  }, [modelNames?.data, packDetails?.data]);

  const handleSetAvailableFeature = (data: any) => {
    if (!data) {
      return [AailableFeactures[0]];
    }

    const arrayFromString = data.split(",");

    const filteredFeatures = AailableFeactures.filter((feature) => {
      return arrayFromString.includes(feature.value.toString());
    });

    return filteredFeatures;
  };

  const handleSetModelName = (data: any) => {
    if (!data) {
      return;
    }

    let newData = modelNames.data.find((item: any) => item.value == data);

    if (!newData?.value) {
      return modelNames?.data[0];
    }

    return newData;
  };

  const handleSetPackType = (data: any) => {
    if (!data) {
      return type[0];
    }

    let newData = type.find((item: any) => item.value == data);

    if (!newData?.value) {
      return type[0];
    }

    return newData;
  };

  const handleSetDuration = (data: any) => {
    if (!data) {
      return durations[0];
    }

    let newData = durations.find((item) => item.value == data);

    if (!newData?.value) {
      return durations[0];
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
    if (!router.isReady) {
      return;
    }
  }, [router.isReady]);

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
    <div className="dark:text-white">
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
            {t(`Edit Package`)}
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
                <input type="number" {...register("id")} hidden />
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
};

export default Index;
