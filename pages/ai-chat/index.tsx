import NoItemFound from "@/components/Common/NoItemFound.comp";
import CustomPagination from "@/components/CustomPagination";
import SectionLoader from "@/components/SectionLoader";
import { ACTIVE } from "@/helpers/coreConstant";
import { useGetChatTemplateListsForUser } from "@/hooks/admin";

import Link from "next/link";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { IoMdArrowBack } from "react-icons/io";

export default function Index() {
  const [currentPage, setCurrentPage] = useState<any>(1);
  const { data: templateLists, isLoading } =
    useGetChatTemplateListsForUser(currentPage);
  const { t } = useTranslation();

  const handlePageClick = (event: any) => {
    setCurrentPage(event?.selected + 1);
  };

  if (isLoading) return <SectionLoader />;
  return (
    <div className="container min-h-screen">
      <div className="items-center justify-between border-b border-[#f1f3f4] px-6 py-5 dark:border-dark dark:text-white md:flex">
        <div>
          <Link href={`/dashboard`} className="mb-3 flex items-center gap-2">
            <IoMdArrowBack size={18} />
            <p>{t("Back to Dashboard")}</p>
          </Link>

          <h4 className="mt- text-4xl font-bold capitalize">{t("AI Chat")}</h4>
        </div>
        <div className="mt-2 flex items-center gap-3 md:mt-0"></div>
      </div>
      <div className="">
        <section className="block">
          <div className="px-6">
            <div className="mx-auto h-full w-full">
              <div className="py-5">
                <div className="grid grid-cols-1 justify-items-center gap-5 sm:grid-cols-2 sm:justify-items-stretch md:gap-4 lg:grid-cols-3 lg:gap-6 2xl:grid-cols-4">
                  {templateLists?.data?.list.map((item: any, index: any) => (
                    <div className="relative flex h-full w-full transform flex-col items-center gap-6 rounded-xl border p-4 transition duration-300 ease-in-out hover:scale-105 hover:bg-white hover:shadow-lg dark:border-dark dark:hover:bg-black md:p-10">
                      <Link href={`/ai-chat/chat/${item.id}`} key={index}>
                        <div className="relative flex h-full transform flex-col items-center gap-6 rounded-xl  p-4 transition duration-300 ease-in-out ">
                          <div
                            className={`flex h-20 w-20 items-center justify-center rounded-full`}
                            style={{
                              color: item.color,
                              border: "3px solid",
                              borderColor: item.color,
                            }}
                          >
                            <img
                              className="h-full w-full overflow-hidden rounded-full object-cover"
                              src={`${
                                item.image_url
                                  ? item.image_url
                                  : "/assets/images/user-profile.png"
                              }`}
                              alt="img"
                            />
                          </div>
                          <div className="text-xl font-semibold dark:text-white">
                            {item.name}
                          </div>

                          <div className="text-sm text-[#636262] dark:text-white-light">
                            {item.description.length > 70
                              ? `${item.description.slice(0, 70)}...`
                              : item.description}
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
              {templateLists?.data?.list?.length !== 0 && (
                <div className="mt-5">
                  <div className="flex w-full flex-col justify-center">
                    <CustomPagination
                      totalItems={templateLists?.data?.meta?.total}
                      perPageItems={templateLists?.data?.meta?.perPage}
                      handlePageClick={handlePageClick}
                      activePage={templateLists?.data?.meta?.currentPage}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
