import AiWriter from "@/components/Documents/AiWriter";
import CodeDocs from "@/components/Documents/CodeDocs";
import SpeechToText from "@/components/Documents/SpeechToText";
import SpreadsheetDocs from "@/components/Documents/SpredsheetDocs";
import TranslateDocs from "@/components/Documents/TranslateDocs";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaFileAlt, FaRegEye, FaRegTrashAlt } from "react-icons/fa";
import { IoIosAdd, IoMdArrowBack } from "react-icons/io";

const doc_tab = [
  {
    id: 1,
    name: "Ai Writter",
  },
  {
    id: 2,
    name: "Ai Code",
  },
  {
    id: 3,
    name: "Ai Translation",
  },
  {
    id: 4,
    name: "Ai Speech To text",
  },
  {
    id: 5,
    name: "Ai Spreadsheet",
  },
];

export default function Index() {
  const [selectedCat, setselectedCat] = useState<any>(1);
  const { t } = useTranslation();

  return (
    <div className="container">
      <div className="items-center justify-between border-b border-[#f1f3f4] py-5 px-6 dark:border-dark dark:text-white  md:flex">
        <div>
          <Link href={`/dashboard`} className="mb-3 flex items-center gap-2">
            <IoMdArrowBack size={18} />
            <p>{t("Back to Dashboard")}</p>
          </Link>

          <h4 className="mt- mb-5 text-4xl font-bold capitalize">
            {" "}
            {t("My Documents")}
          </h4>
          <div className="mt-3 flex flex-wrap gap-3 text-sm">
            {doc_tab.map((category: any, index: any) => (
              <button
                className={`text-md rounded-md border bg-white px-4 py-2 ${
                  selectedCat == category.id
                    ? "border-primary text-primary dark:border-white dark:bg-dark dark:text-white"
                    : "text-gray dark:border-dark dark:bg-dark dark:text-white"
                }`}
                key={index}
                onClick={() => setselectedCat(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-2 flex items-center gap-3 md:mt-0"></div>
      </div>
      <div className="h-full py-8  px-6 sm:min-h-[calc(100vh_-_200px)]">
        {selectedCat == 1 && <AiWriter />}
        {selectedCat == 2 && <CodeDocs />}
        {selectedCat == 3 && <TranslateDocs />}
        {selectedCat == 4 && <SpeechToText />}
        {selectedCat == 5 && <SpreadsheetDocs />}
      </div>
    </div>
  );
}
