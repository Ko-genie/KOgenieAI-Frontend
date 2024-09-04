import {
  useGetCodeDetails,
  useGetDocDetails,
  useUpdateDocFormHandler,
} from "@/hooks/templateSettings.hook";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { IoMdArrowBack } from "react-icons/io";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(import("react-quill"), { ssr: false });
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import SectionLoader from "@/components/SectionLoader";
import { useTranslation } from "react-i18next";

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

export default function Index() {
  const [docValue, setDocValue] = useState<any>("");

  const router = useRouter();
  const { t } = useTranslation();

  const idFromQuery = router.query.code_id;
  const { data: docDetails, isLoading } = useGetCodeDetails(idFromQuery) || {};
  if (isLoading) return <SectionLoader />;
  return (
    <div className="container">
      <div className=" items-center justify-between border-b border-[#f1f3f4] dark:border-dark py-5 px-6 md:flex">
        <div>
          <Link href={`/document`} className="mb-3 flex items-center gap-2">
            <IoMdArrowBack size={18} />
            <p>{t("Back to Documents")}</p>
          </Link>

          <h4 className="mt- text-4xl font-bold capitalize"> {t("Update Code")}</h4>
        </div>
        <div className="mt-2 flex items-center gap-3 md:mt-0"></div>
      </div>
      <div className="py-10 px-6">
        <div className="container">
          <div className="mx-auto md:w-2/3">
            <div>
              <h4 className="mb-4 text-xl font-bold">{t("Update Code")}</h4>
            </div>
            <div>
              <div>
                <label htmlFor="title">{t("Code Title")}</label>
                <input
                  id="title"
                  type="text"
                  placeholder="Code Title"
                  className="form-input"
                  value={docDetails?.data?.title}
                  readOnly
                />
              </div>
            </div>
            <div className="mt-4">
              <CodeMirror
                value={docDetails?.data?.result}
                theme={vscodeDark}
                readOnly={true}
                maxHeight="600px"
                style={{ borderRadius: "10px", overflow: "hidden" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
