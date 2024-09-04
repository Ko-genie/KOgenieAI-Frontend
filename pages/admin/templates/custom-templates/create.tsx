import { useState, useEffect, Fragment } from "react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import Select from "react-select";
import Link from "next/link";
import { IoIosAdd, IoMdArrowBack } from "react-icons/io";
import InputColor from "react-input-color";

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
import {
  useCustomTemplateFormHandler,
  useGetActiveCategoriesForOption,
  useGetCategoriesForOption,
} from "@/hooks/templateSettings.hook";
import SectionLoader from "@/components/SectionLoader";
import ButtonTextWithLoader from "@/components/ButtonTextWithLoader";
import { useTranslation } from "react-i18next";

const ReactQuill = dynamic(import("react-quill"), { ssr: false });

const type = [
  { value: 1, label: "Regular" },
  { value: 2, label: "Premium" },
];
const status = [
  { value: ACTIVE, label: "Active" },
  { value: INACTIVE, label: "Inactive" },
];

const inputTypes = [
  { value: 1, label: "Input Field" },
  { value: 2, label: "Textarea Field" },
];

const Index = () => {
  const [color, setColor] = useState<any>({ hex: "#645CBB" });
  const [categoryLists, setCategoryLists] = useState<any>([]);
  const [inputNames, setInputNames] = useState<any>([]);
  const [lists, setLists] = useState<any>([
    {
      id: 1,
      name: "",
      type: inputTypes[0],
      input_field_name: "",
      description: "",
    },
  ]);
  const {
    register,
    handleSubmit,
    handleCustomTemplateSettings,
    Controller,
    control,
    setValue,
    errors,
    watch,
    isLoading: isCreating,
  } = useCustomTemplateFormHandler();

  const { t } = useTranslation();

  const { data: categories, isLoading } = useGetActiveCategoriesForOption();

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
        name: "",
        type: inputTypes[0],
        input_field_name: "",
        description: "",
      },
    ]);
  };

  const removeItem = (item: any) => {
    const updatedItems = lists.filter((data: any) => data.id != item.id);

    const updatedFormData = watch("input_groups");

    const replaceItem = updatedFormData.filter(
      (data: any) => data.id == item.id
    );
    setLists(updatedItems);
    if (replaceItem.length === 0) {
      return;
    }

    const updatedPromptDes = watch("prompt");
    if (replaceItem[0].input_field_name) {
      setValue(
        "prompt",
        updatedPromptDes.replaceAll(replaceItem[0].input_field_name, "")
      );
    }

    const newItems = updatedFormData.filter((data: any) => data.id != item.id);

    handlePromtName(newItems);

    setValue("input_groups", newItems);
  };

  const handleInputChange = (e: any, item: any) => {
    const newValue = "**" + e.target.value.replace(/\s/g, "_") + "**";

    const updatedFormData = watch();

    let existingItem = updatedFormData.input_groups[item.id];

    const updatedItem = {
      ...existingItem,
      name: e.target.value,
      input_field_name: newValue,
    };

    updatedFormData.input_groups[item.id] = updatedItem;

    handlePromtName(updatedFormData.input_groups);
  };

  const handlePromtName = (itemArray: any) => {
    const names = itemArray.map((group: any) => group.input_field_name);

    const filteredArray = names.filter(
      (item: any) => item && item?.trim() !== ""
    );

    const commaSeparatedNames = filteredArray.join(",");

    setInputNames(filteredArray);

    setValue("prompt_input", commaSeparatedNames);
  };

  const handlePromtDescription = (name: any) => {
    const updatedPromptDes = watch("prompt");
    setValue("prompt", updatedPromptDes + " " + name);
  };

  useEffect(() => {
    if (categories?.data) {
      var newArray = categories?.data.map((obj: any) => {
        return {
          value: obj.id,
          label: obj.name,
        };
      });
      setCategoryLists(newArray);
    }
  }, [categories]);

  if (isLoading) return <SectionLoader />;

  return (
    <div className="container dark:text-white">
      <div className="items-center justify-between border-b border-[#f1f3f4] px-6 py-5 dark:border-dark  md:flex">
        <div className="container">
          <Link
            href={`/admin/templates/custom-templates`}
            className="mb-3 flex items-center gap-2"
          >
            <IoMdArrowBack size={18} />
            <p>{t(`Back to Templates`)}</p>
          </Link>

          <h4 className="mt- text-4xl font-bold capitalize">
            {t(`Add Custom Template`)}
          </h4>
        </div>
        <div className="mt-2 flex items-center gap-3 md:mt-0"></div>
      </div>

      <div className="py-10 px-6">
        <div className="container">
          <form onSubmit={handleSubmit(handleCustomTemplateSettings)}>
            <div>
              <div>
                <h4 className="mb-4 text-xl font-bold">{t(`Template`)}</h4>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="title">{t(`Template Title`)}</label>
                  <input
                    id="title"
                    type="text"
                    placeholder="Title"
                    className="form-input"
                    {...register("title")}
                  />
                  <p className="mt-1 text-danger">
                    <small>{errors.name?.message}</small>
                  </p>
                </div>
                <div>
                  <label htmlFor="title">
                    {t(`Template Icon`)}{" "}
                    <a
                      href="https://fontawesome.com/icons"
                      target="_blank"
                      className="text-primary underline"
                    >
                      {t(`Fontawesome Icon`)}
                    </a>{" "}
                  </label>
                  <input
                    id="icon_tag"
                    type="text"
                    placeholder="Enter an icon calss"
                    className="form-input"
                    {...register("icon_tag")}
                  />
                  <p className="mt-1 text-danger">
                    <small>{errors.name?.message}</small>
                  </p>
                </div>

                <div>
                  <label htmlFor="description">
                    {t(`Template Description`)}
                  </label>
                  <textarea
                    id="description"
                    rows={3}
                    className="form-textarea"
                    placeholder="Description"
                    {...register("description")}
                  ></textarea>
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
                          <InputColor
                            initialValue={color.hex}
                            onChange={(value) => {
                              setColor({ hex: value.hex });
                              field.onChange(value.hex);
                            }}
                            placement="right"
                          />
                          <input
                            id="name"
                            type="text"
                            placeholder="Name"
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
                  <label>{t(`Template Category`)}</label>
                  <Controller
                    control={control}
                    defaultValue=""
                    name="category_id"
                    render={({ field }: any) => (
                      <Select
                        classNamePrefix={"wizai-select"}
                        options={categoryLists}
                        {...field}
                      />
                    )}
                  />
                  <p className="mt-1 text-danger">
                    <small>{errors.type?.message}</small>
                  </p>
                </div>
                <div>
                  <label>{t(`Package Type`)}</label>
                  <Controller
                    control={control}
                    defaultValue={type[0]}
                    name="package_type"
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

            <div className="mt-8">
              <div className="mb-4 flex items-center justify-between">
                <h4 className="mb-4 text-xl font-bold">{t(`Input Groups`)}</h4>
                <button
                  type="button"
                  className="btn btn-primary rounded-full"
                  onClick={() => addItem()}
                >
                  <IoIosAdd size={20} />
                  {t(`Add Inputs`)}
                </button>
              </div>
              <div>
                {lists.map((item: any) => {
                  return (
                    <div
                      className=" mb-3 flex items-center gap-4"
                      key={item.id}
                    >
                      <div className="panel grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label>{t(`Input Type`)}</label>

                          <Controller
                            name={`input_groups[${item.id}].type`}
                            control={control}
                            defaultValue={inputTypes[0]}
                            render={({ field }) => (
                              <Select
                                classNamePrefix={"wizai-select"}
                                options={inputTypes}
                                {...field}
                              />
                            )}
                          />
                        </div>
                        <div>
                          <label>{t(`Input Name`)}</label>

                          <Controller
                            name={`input_groups[${item.id}].name`}
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                              <input
                                {...field}
                                className="form-input"
                                placeholder="Name"
                                onChange={(e) => {
                                  field.onChange(e);
                                  handleInputChange(e, item);
                                }}
                              />
                            )}
                          />
                        </div>
                        <div>
                          <label>{t(`Input Description`)}</label>

                          <Controller
                            name={`input_groups[${item.id}].description`}
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                              <textarea
                                rows={3}
                                className="form-textarea"
                                placeholder="Description"
                                {...field}
                              ></textarea>
                            )}
                          />
                        </div>
                      </div>
                      {lists.length > 1 && (
                        <button type="button" onClick={() => removeItem(item)}>
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

            <div className="mt-8">
              <div>
                <h4 className="mb-4 text-xl font-bold">{t(`Prompt`)}</h4>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="prompt_input">{t(`Created Inputs`)}</label>

                  <div className="form-input flex min-h-[38px] flex-wrap items-center gap-2">
                    {inputNames?.map((name: any, index: any) => (
                      <span
                        className="cursor-pointer rounded-full bg-[#e6e6edff] p-1 text-sm"
                        key={index}
                        onClick={() => handlePromtDescription(name)}
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="prompt">{t(`Custom Prompt`)}</label>
                  <textarea
                    id="prompt"
                    rows={3}
                    className="form-textarea"
                    {...register("prompt")}
                  ></textarea>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary mt-8 min-w-[180px] rounded-full"
              disabled={isCreating}
            >
              <ButtonTextWithLoader
                normalText="Create"
                loadingText="Creating"
                isBtnLoading={isCreating}
              />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Index;
