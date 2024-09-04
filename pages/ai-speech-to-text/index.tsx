import { AVAILABLE_FEATURES, CODING_LEVEL } from "@/helpers/coreConstant";
import {
  useAiCodeGeneratorForUser,
  useAiSpeachToTextForUser,
  useGetProgramingLanguageListsForUser,
} from "@/hooks/templateSettings.hook";
import Link from "next/link";
import { IRootState } from "@/store";
import React, { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { FaCopy, FaDownload, FaFileAlt } from "react-icons/fa"; // Import the necessary React Icons
import Select from "react-select";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import ButtonTextWithLoader from "@/components/ButtonTextWithLoader";
import Credits from "@/components/Common/Credits.comp";
import SectionLoader from "@/components/SectionLoader";
import copy from "copy-to-clipboard"; // Import a library for copying text
import { toast } from "react-toastify";
import { useCheckSectionSubscriptionStatus } from "@/hooks/paymentSettings.hook";
import PackageErrorMsg from "@/components/PackageErrorMsg";
import { MdRecordVoiceOver } from "react-icons/md";

import { useTranslation } from "react-i18next";

import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import NoItemFound from "@/components/Common/NoItemFound.comp";

export default function Index() {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    handleAiSpeachToTextForUser,
    Controller,
    control,
    isLoading: isGenerateProcessing,
    setValue,
    errors,
    watch,
    data: generateData,
  } = useAiSpeachToTextForUser();

  const [audioElement, setAudioElement] = useState<any>(null);

  const { enable } = useCheckSectionSubscriptionStatus(
    AVAILABLE_FEATURES.TRANSCRIPTION
  );

  const recorderControls = useAudioRecorder(
    {
      noiseSuppression: true,
      echoCancellation: true,
    },
    (err) => toast.error(err.message) // onNotAllowedOrFound
  );
  function blobToFile(theBlob: any, fileName: any) {
    return new File([theBlob], fileName, { type: theBlob.type });
  }
  const addAudioElement = (blob: Blob) => {
    const fileName = "audio.mp3"; // Set the desired file name and extension
    const audioFile = blobToFile(blob, fileName);

    const audioUrl = URL.createObjectURL(audioFile);

    setAudioElement(audioUrl);
    setValue("audio", audioFile);
  };

  const handleUploadFile = (event: any) => {
    if (!event.target.files[0]) return;
    addAudioElement(event.target.files[0]);
    setValue("audio", event.target.files[0]);
  };

  return (
    <div className="container min-h-screen dark:text-white">
      <div className="items-center justify-between border-b border-[#f1f3f4] dark:border-dark py-5 px-6 md:flex">
        <div>
          <Link href={`/dashboard`} className="mb-3 flex items-center gap-2">
            <IoMdArrowBack size={18} />
            <p>{t("Back to Dashboard")}</p>
          </Link>

          <h4 className="mt- text-4xl font-bold capitalize">
            {t("AI Speech to Text")}
          </h4>
          {!enable && <PackageErrorMsg />}
        </div>
        <Credits />
      </div>
      <div className="py-10 px-6">
        <div className="container">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div>
              <form onSubmit={handleSubmit(handleAiSpeachToTextForUser)}>
                <div>
                  <label className="mb-4 block text-sm font-bold text-gray-900 dark:text-white">
                    {t(
                      `Upload or Record an Audio File (Supported formats: mp3, mp4, mpeg, mpga, m4a, wav, and webm`
                    )}
                  </label>
                  <input
                    className="block w-full cursor-pointer rounded-lg border border-gray-300 dark:border-dark bg-gray-50 p-1.5 dark:bg-[#121e32] text-sm text-gray-900 file:border-0 dark:file:bg-dark dark:file:text-white file:py-1.5 focus:outline-none dark:border-dark dark:text-white dark:placeholder-gray-400"
                    type="file"
                    onChange={handleUploadFile}
                  />
                </div>

                <div className="my-2 text-center text-xl">Or</div>

                <div className="flex flex-col items-center gap-y-2 gap-x-4 rounded-lg border border-gray-300 dark:border-dark bg-gray-50 dark:bg-[#121e32] dark:text-white p-1 text-sm text-gray-900 sm:flex-row sm:gap-y-0">
                  <AudioRecorder
                    onRecordingComplete={addAudioElement}
                    recorderControls={recorderControls}
                    // downloadOnSavePress={true}
                    downloadFileExtension="mp3"
                    mediaRecorderOptions={{
                      audioBitsPerSecond: 128000,
                    }}
                    showVisualizer={true}
                  />
                  <p>{t(`Record an Audio File`)}</p>
                </div>
                {audioElement && (
                  <div className="mt-8 w-full">
                    <p className="mb-4 font-bold">
                      {t(`Uploaded Or Recorded Audio File`)}
                    </p>
                    <audio
                      className="w-full"
                      src={audioElement}
                      controls
                    ></audio>
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary mt-8 min-w-[180px] rounded-full"
                  disabled={isGenerateProcessing || !enable}
                >
                  <ButtonTextWithLoader
                    normalText="Generate"
                    loadingText="Generating"
                    isBtnLoading={isGenerateProcessing}
                  />
                </button>
              </form>
            </div>
            <div>
              <div className="relative overflow-x-auto">
                <div className="w-full border dark:border-dark text-left h-96 rounded-lg text-sm text-gray-500  dark:text-white">
                  {generateData?.success && generateData?.data && (
                    <div>
                      <h2 className="ml-5 mt-5 text-xl">{t("Your result")}</h2>
                      <tr className="border-b bg-white dark:border-dark dark:bg-black">
                        <td className="px-6 py-4">
                          {generateData?.data?.result}
                        </td>
                      </tr>
                    </div>
                  )}
                  {!generateData?.data && !isGenerateProcessing && (
                    <NoItemFound message={t("no data generated yet")} />
                  )}
                  {isGenerateProcessing && (
                    <div className="h-full w-full">
                      <SectionLoader />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
