import NoItemFound from "@/components/Common/NoItemFound.comp";
import SectionLoader from "@/components/SectionLoader";
import { ACTIVE } from "@/helpers/coreConstant";
import {
  useGetCategoryListsForUser,
  useGetCustomTemplateLists,
  useGetCustomTemplateListsForUser,
  useGetFavTemplateListsForUser,
} from "@/hooks/templateSettings.hook";
import Link from "next/link";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { BsStarFill } from "react-icons/bs";
import { IoMdArrowBack } from "react-icons/io";

export default function Index() {
  const {
    data: templateLists,
    isLoading,
    handleFavSubmit,
  } = useGetFavTemplateListsForUser();
  const { t } = useTranslation();

  if (isLoading) return <SectionLoader />;
  return (
    <div className="container min-h-screen dark:text-white">
      <div className="px-6 items-center justify-between border-b border-[#f1f3f4] dark:border-dark py-5 md:flex">
        <div>
          <Link href={`/dashboard`} className="mb-3 flex items-center gap-2">
            <IoMdArrowBack size={18} />
            <p>{t("Back to Dashboard")}</p>
          </Link>

          <h4 className="mt- text-4xl font-bold capitalize">My Favourite's</h4>
        </div>
        <div className="mt-2 flex items-center gap-3 md:mt-0"></div>
      </div>
      <div className="">
        <section className="block">
          <div className="px-6">
            <div className="mx-auto h-full w-full">
              <div className="py-5">
                <div className="grid grid-cols-1 justify-items-center gap-5 sm:grid-cols-2 sm:justify-items-stretch md:grid-cols-3 md:gap-4 lg:gap-6 2xl:grid-cols-4">
                  {templateLists?.data?.list.map((item: any, index: any) => (
                    <div className="relative flex h-full w-full transform flex-col items-center gap-6 rounded-xl border dark:border-dark p-4 transition duration-300 ease-in-out hover:scale-105 hover:bg-white dark:hover:bg-black hover:shadow-lg md:p-10">
                      <BsStarFill
                        onClick={() => {
                          handleFavSubmit(item?.template?.id);
                        }}
                        className={`absolute top-2 right-2 mr-3 cursor-pointer text-2xl text-yellow-500`}
                      />
                      <Link
                        href={`/ai-writer/generator/${item.template.id}`}
                        key={index}
                      >
                        <div className="relative flex h-full transform flex-col items-center gap-6 rounded-xl  p-4 transition duration-300 ease-in-out ">
                          <div
                            className={`flex h-16 w-16 items-center justify-center rounded-full`}
                            style={{
                              color: item.template.color,
                              border: "3px solid",
                              borderColor: item.template.color,
                            }}
                          >
                            {item.template.icon_tag ? (
                              <i className={`${item.icon_tag} text-2xl`}></i>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="h-10 w-10 "
                                style={{
                                  color: item.color,
                                }}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M15 3h3a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2h3m4 0v4m0 0h4m-4 0L8 15m4-4l4 4"
                                />
                              </svg>
                            )}
                          </div>
                          <div className="text-xl font-semibold">
                            {item.template.title}
                          </div>

                          <button className="rounded-lg border bg-white px-3 py-0.5 text-gray-500 dark:bg-dark dark:border-dark dark:text-white">
                            {item?.template?.templateCategory?.name}
                          </button>
                          <div className="text-sm text-[#636262] dark:text-white">
                            {item?.template?.description.length > 70
                              ? `${item?.template?.description.slice(0, 70)}...`
                              : item?.template?.description}
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
                {templateLists?.data?.list?.length === 0 && (
                  <NoItemFound message={t("No templates found")} />
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
