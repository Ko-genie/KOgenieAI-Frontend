import {
  useAiWriterGeneratorForUser,
  useGetSingleTemplateForGenerate,
} from "@/hooks/templateSettings.hook";
import "tippy.js/dist/tippy.css";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import Select from "react-select";
import React, { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import "react-quill/dist/quill.snow.css";
import {
  AVAILABLE_FEATURES,
  CREATIVITY_CONSTANT,
  INPUT_FIELD_TYPE,
  OPEN_AI_TONE_OF_VOICE_CONSTANT,
} from "@/helpers/coreConstant";
import { toast } from "react-toastify";
import ButtonTextWithLoader from "@/components/ButtonTextWithLoader";
import Credits from "@/components/Common/Credits.comp";
import SectionLoader from "@/components/SectionLoader";
import { useCheckSectionSubscriptionStatus } from "@/hooks/paymentSettings.hook";
import { useSelector } from "react-redux";
import { IRootState } from "@/store";
import { AiFillInfoCircle } from "react-icons/ai";
import Tippy from "@tippyjs/react";
import PackageErrorMsg from "@/components/PackageErrorMsg";
import { useTranslation } from "react-i18next";

const ReactQuill = dynamic(import("react-quill"), { ssr: false });

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [] }],
    ["bold", "italic", "underline", "strike"],
    ["link", "image"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    ["color", "background"],
    ["clean"],
  ],
};

const openAiToneOfVoiceConstant = [
  { value: OPEN_AI_TONE_OF_VOICE_CONSTANT.PROFESSIONAL, label: "Professional" },
  { value: OPEN_AI_TONE_OF_VOICE_CONSTANT.FUNNY, label: "Funny" },
  { value: OPEN_AI_TONE_OF_VOICE_CONSTANT.CASUAL, label: "Casual" },
  { value: OPEN_AI_TONE_OF_VOICE_CONSTANT.EXCITED, label: "Excited" },
  { value: OPEN_AI_TONE_OF_VOICE_CONSTANT.WITTY, label: "Witty" },
  { value: OPEN_AI_TONE_OF_VOICE_CONSTANT.SARCASTIC, label: "Sarcastic" },
  { value: OPEN_AI_TONE_OF_VOICE_CONSTANT.FEMININE, label: "Feminine" },
  { value: OPEN_AI_TONE_OF_VOICE_CONSTANT.MASCULINE, label: "Masculine" },
  { value: OPEN_AI_TONE_OF_VOICE_CONSTANT.BOLD, label: "Bold" },
  { value: OPEN_AI_TONE_OF_VOICE_CONSTANT.DRAMATIC, label: "Dramatic" },
  { value: OPEN_AI_TONE_OF_VOICE_CONSTANT.GRUMPY, label: "Grumpy" },
  { value: OPEN_AI_TONE_OF_VOICE_CONSTANT.SECRETIVE, label: "Secretive" },
];

const creativityConstant = [
  { value: CREATIVITY_CONSTANT.ECONOMIC, label: "Economic" },
  { value: CREATIVITY_CONSTANT.AVERAGE, label: "Average" },
  { value: CREATIVITY_CONSTANT.GOOD, label: "Good" },
  { value: CREATIVITY_CONSTANT.PREMIUM, label: "Premium" },
];

export default function Index() {
  const [languageLists, setLanguageLists] = useState<any>([]);
  const { data: commnSettings } = useSelector(
    (state: IRootState) => state.common
  );
  const [docValue, setDocValue] = useState<any>("");
  const router = useRouter();
  const { enable } = useCheckSectionSubscriptionStatus(
    AVAILABLE_FEATURES.CONTENT_WRITING
  );
  const idFromQuery = router.query.temp_id;

  const { data: templateDetails, isLoading } =
    useGetSingleTemplateForGenerate(idFromQuery) || {};

  const {
    register,
    handleSubmit,
    handleAiWriterGeneratorForUser,
    Controller,
    control,
    isLoading: isGenerateProcessing,
    setValue,
    errors,
    watch,
    data: generateData,
  } = useAiWriterGeneratorForUser();

  useEffect(() => {
    if (!commnSettings) return;
    let langLists = commnSettings?.language_list?.map((item: any) => ({
      value: item.code,
      label: item.name,
    }));

    setLanguageLists(langLists);
    setValue(
      "l_a_n_g_u_a_g_e",
      langLists?.find((item: any) => item.value == "English EN")
    );
  }, [commnSettings]);

  useEffect(() => {
    setValue("template_id", templateDetails?.data?.id);
  }, [templateDetails?.data]);

  const removeStar = (str: any) => {
    return str.replaceAll("**", "");
  };

  useEffect(() => {
    if (!generateData?.success) {
      return;
    }

    const contents = generateData?.data?.choices.map(
      (item: any, index: any) =>
        `${templateDetails?.data?.title} ${
          generateData?.data?.choices.length > 1 ? index + 1 : ""
        } : <br>${item.message.content}`
    );

    const combinedString = contents.join("<br>");
    setDocValue(combinedString);
  }, [generateData]);
  const { t } = useTranslation();

  useEffect(() => {
    setValue("maximum_length", 250);
    setValue("number_of_result", 1);
  }, []);

  return (
    <div className="container dark:text-white">
      <div className="items-center justify-between border-b border-[#f1f3f4] px-6 py-5 dark:border-dark dark:text-white  md:flex">
        <div>
          <Link href={`/ai-writer`} className="mb-3 flex items-center gap-2">
            <IoMdArrowBack size={18} />
            <p>{t("Back to Ai Writer")}</p>
          </Link>

          <h4 className="mt- text-4xl font-bold capitalize">
            {" "}
            {templateDetails?.data?.title}
          </h4>
          <p className="mt-2 md:mt-0">
            {templateDetails?.data?.description?.length > 100
              ? `${templateDetails?.data?.description?.slice(0, 100)}...`
              : templateDetails?.data?.description}
          </p>
          {!enable && <PackageErrorMsg />}
        </div>
        <Credits />
      </div>
      <div className="py-10 px-6">
        <div className="container">
          <div className="mb-4">
            <label htmlFor="docName">{t("Document Name")}</label>
            <input
              id="docName"
              type="text"
              placeholder={t("Enter document name") as string}
              className="form-input"
              {...register("document_title")}
            />
          </div>
          <div className="grid-cols-1 gap-4 lg:grid lg:grid-cols-2">
            <div className="h-full min-h-[280px]">
              {isGenerateProcessing ? (
                <SectionLoader />
              ) : (
                <ReactQuill
                  modules={modules}
                  theme="snow"
                  value={docValue}
                  onChange={setDocValue}
                  className="custom-react-quil-cls h-full"
                />
              )}
            </div>
            <div className="mt-4 md:mt-0">
              <form onSubmit={handleSubmit(handleAiWriterGeneratorForUser)}>
                <div>
                  <div>
                    {templateDetails?.data?.TemplateField.map(
                      (data: any, index: any) => (
                        <div className="mb-4" key={index}>
                          <label
                            htmlFor={removeStar(data.input_field_name)}
                            className="flex items-center gap-x-2"
                          >
                            <span>{data.field_name}</span>
                            <Tippy content={data.description}>
                              <button>
                                <AiFillInfoCircle size={16} />
                              </button>
                            </Tippy>
                          </label>
                          {data.type === INPUT_FIELD_TYPE.INPUT_FIELD ? (
                            <input
                              id={removeStar(data.input_field_name)}
                              type="text"
                              className="form-input"
                              {...register(removeStar(data.input_field_name))}
                              required
                            />
                          ) : (
                            <textarea
                              id={removeStar(data.input_field_name)}
                              rows={3}
                              className="form-textarea"
                              {...register(removeStar(data.input_field_name))}
                              required
                            ></textarea>
                          )}
                        </div>
                      )
                    )}
                  </div>
                  <div className=" grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label>{t("Language")}</label>
                      <Controller
                        control={control}
                        name="l_a_n_g_u_a_g_e"
                        render={({ field }: any) => (
                          <Select
                            classNamePrefix={"wizai-select"}
                            options={languageLists}
                            {...field}
                            required
                          />
                        )}
                      />
                      <p className="mt-1 text-danger">
                        <small>{errors.language?.message}</small>
                      </p>
                    </div>
                    <div>
                      <label htmlFor="maximum_length">
                        {t("Maximum Length")}
                      </label>
                      <input
                        id="maximum_length"
                        type="number"
                        placeholder="0"
                        className="form-input"
                        {...register("maximum_length")}
                        min={0}
                        required
                      />
                      <p className="mt-1 text-danger">
                        <small>{errors.maximum_length?.message}</small>
                      </p>
                    </div>
                    <div>
                      <label htmlFor="number_of_result">
                        {t("Number of Results")}
                      </label>
                      <input
                        id="number_of_result"
                        type="number"
                        placeholder="0"
                        className="form-input"
                        min={0}
                        {...register("number_of_result")}
                      />
                      <p className="mt-1 text-danger">
                        <small>{errors.number_of_result?.message}</small>
                      </p>
                    </div>
                    <div>
                      <label>{t("Creativity")}</label>
                      <Controller
                        control={control}
                        defaultValue={creativityConstant[0]}
                        name="creativity"
                        render={({ field }: any) => (
                          <Select
                            classNamePrefix={"wizai-select"}
                            options={creativityConstant}
                            {...field}
                            required
                          />
                        )}
                      />
                      <p className="mt-1 text-danger">
                        <small>{errors.creativity?.message}</small>
                      </p>
                    </div>
                    <div>
                      <label>{t("Tone of Voice")}</label>

                      <Controller
                        control={control}
                        defaultValue={openAiToneOfVoiceConstant[0]}
                        name="tone_of_voice"
                        render={({ field }: any) => (
                          <Select
                            classNamePrefix={"wizai-select"}
                            options={openAiToneOfVoiceConstant}
                            {...field}
                            required
                          />
                        )}
                      />
                      <p className="mt-1 text-danger">
                        <small>{errors.tone_of_voice?.message}</small>
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary mt-8 min-w-[180px] rounded-full"
                  disabled={isGenerateProcessing || !enable}
                >
                  <ButtonTextWithLoader
                    normalText={t("Generate")}
                    loadingText={t("Generating")}
                    isBtnLoading={isGenerateProcessing}
                  />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
