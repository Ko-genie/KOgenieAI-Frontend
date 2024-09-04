import React from "react";
import { Tab } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
export default function FeatureSection({ features }: any) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  });
  if (features.length === 0) return <></>;
  return (
    <div className="relative  max-[479px]:overflow-hidden dark:text-white" id="features">
      <div className="px-5 md:px-10">
        <div className="pb-10 md:pb-20">
          <div className="mx-auto w-full max-w-7xl rounded-2xl border dark:border-dark p-4 md:p-20">
            <div className="mx-auto w-full max-w-3xl">
              <div className="text-center">
                <h2 className="mb-8 text-3xl font-semibold md:mb-12 md:text-5xl lg:mb-16">
                  Features
                </h2>
              </div>
            </div>
            {isMounted && (
              <div>
                <Tab.Group>
                  <Tab.List className="mt-3 mb-10 flex flex-wrap justify-center rtl:space-x-reverse">
                    {features.map((item: any, index: any) => (
                      <Tab as={Fragment} key={index}>
                        {({ selected }) => (
                          <button
                            className={`${
                              selected
                                ? "border dark:border-dark bg-secondary text-white outline-none"
                                : "border dark:border-dark"
                            } flex min-w-[175px] flex-col items-center justify-center  !px-10 !py-2 text-base transition-all duration-300 hover:!bg-secondary hover:text-white hover:shadow-[0_5px_15px_0_rgba(0,0,0,0.30)] focus-visible:outline-0 dark:bg-[#191e3a]`}
                          >
                            {item.category_name}
                          </button>
                        )}
                      </Tab>
                    ))}
                  </Tab.List>
                  <Tab.Panels>
                    {features.map((item: any, index: any) => (
                      <Tab.Panel key={index}>
                        <div className="active">
                          <div className="flex flex-col gap-y-[0px] sm:gap-y-12 lg:gap-y-40">
                            <div className="grid grid-cols-1 flex-row items-center gap-4 max-[991px]:grid max-[767px]:flex-col md:gap-4 lg:grid-cols-[1fr_minmax(200px,_1fr)]">
                              <div>
                                <img
                                  src={`${
                                    item.file_url
                                      ? item.file_url
                                      : "https://assets.website-files.com/64fb4d49d44af6ffd057ea86/650089ec401b51014f33ffa6_Team%20Collaboration.svg"
                                  }`}
                                  alt=""
                                  className="mx-auto inline-block h-full w-full max-w-[480px] object-fill md:max-w-[640px] md:object-cover"
                                />
                              </div>
                              <div className="w-full p-4 md:p-10">
                                <div className="mb-4">
                                  <div className="max-[479px]:max-w-[400px]">
                                    <h2 className="text-3xl font-semibold md:text-5xl">
                                      {item.title}
                                    </h2>
                                  </div>
                                </div>
                                <div className="mb-12">
                                  <div className="max-w-[400px] sm:max-w-[480px]">
                                    <p className="text-lg text-[#414141] dark:text-gray-400">
                                      {item.description}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>
              </div>
            )}
          </div>
          <img
            src="https://assets.website-files.com/64fb4d49d44af6ffd057ea86/64fde39425f96a17e11e5331_BG%20(1).svg"
            alt=""
            className="absolute -left-2/4 bottom-[auto] right-[auto] top-[32%] -z-[1] inline-block max-w-full sm:-left-2/4 sm:top-[30%] lg:left-[-20%] lg:top-[25%]"
          />
        </div>
      </div>
    </div>
  );
}
