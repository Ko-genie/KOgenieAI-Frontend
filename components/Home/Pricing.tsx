import React from "react";
import { Tab } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { PACKAGE_DURATION } from "@/helpers/coreConstant";
import Link from "next/link";
import { useSelector } from "react-redux";
import { IRootState } from "@/store";
export default function Pricing({ pricing }: any) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  });

  const { isLoggedIn } = useSelector((state: IRootState) => state.userSlice);

  const handleFeatureLists = (data: any) => {
    if (!data) {
      return;
    }
    const arrayFromString = data.split(",");

    return arrayFromString.map((value: any, index: any) => {
      return (
        <div
          className="flex flex-row items-start text-left text-white"
          key={index}
        >
          <div className="mr-2 flex text-[#2d6ae0]">
            <svg
              width={32}
              height={32}
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.82291 15.198C8.47774 15.199 8.1399 15.3027 7.84846 15.4969C7.55703 15.6911 7.32392 15.968 7.1761 16.2955C7.02829 16.623 6.9718 16.9878 7.01319 17.3476C7.05457 17.7074 7.19213 18.0476 7.40995 18.3287L12.0534 24.3014C12.219 24.5172 12.4312 24.6885 12.6725 24.8009C12.9137 24.9134 13.177 24.9638 13.4406 24.9479C14.0042 24.9161 14.513 24.5995 14.8375 24.079L24.4831 7.76799C24.4847 7.76528 24.4863 7.76257 24.488 7.75991C24.5785 7.614 24.5492 7.32485 24.3624 7.1432C24.3111 7.09331 24.2506 7.05499 24.1846 7.03058C24.1186 7.00618 24.0486 6.99621 23.9789 7.00129C23.9091 7.00637 23.8411 7.02639 23.7789 7.06013C23.7168 7.09386 23.662 7.14059 23.6177 7.19743C23.6142 7.2019 23.6107 7.2063 23.607 7.21064L13.8792 18.7511C13.8422 18.795 13.7973 18.8308 13.747 18.8563C13.6967 18.8818 13.6421 18.8966 13.5863 18.8998C13.5305 18.9029 13.4747 18.8944 13.4221 18.8747C13.3695 18.8551 13.3211 18.8246 13.2798 18.7852L10.0513 15.7003C9.71603 15.3776 9.27778 15.1984 8.82291 15.198Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <p className="text-[#7c8aaa]">
            <span className="font-bold">{value} </span>
          </p>
        </div>
      );
    });
  };
  const durations = [
    { value: PACKAGE_DURATION.WEEKLY, label: "Weekly" },
    { value: PACKAGE_DURATION.MONTHLY, label: "Monthly" },
    { value: PACKAGE_DURATION.YEARLY, label: "Yearly" },
  ];
  return (
    <div className="dark:text-white" id="pricing">
      <div className="px-5 md:px-10">
        <div className="pb-10 md:pb-20">
          <div className="mx-auto w-full max-w-7xl rounded-2xl border dark:border-dark p-4 md:p-20">
            <div className="mx-auto mb-8 flex max-w-3xl flex-col items-center text-center md:mb-12 lg:mb-16">
              <h2 className="text-3xl font-bold md:text-5xl">Our Pricing</h2>
            </div>
            {isMounted && (
              <div>
                <div className="flex flex-col items-center justify-start max-[767px]:text-center">
                  <div className="grid w-full grid-cols-1 gap-16 max-[767px]:text-left md:grid-cols-3 md:gap-4 lg:gap-8">
                    {pricing.map((item: any, index: any) => (
                      <div
                        className=" flex w-full max-w-[416px] flex-col items-start justify-self-start rounded-lg border dark:border-dark p-5 "
                        key={index}
                      >
                        <div className="flex w-full flex-col items-center justify-center rounded-xl p-10">
                          <div className="mb-4 rounded-lg bg-[#0a1836] px-4 py-1.5">
                            <p className="text-sm font-bold text-white">
                              {item?.name}
                            </p>
                          </div>
                          <h2 className="mb-5 text-center text-3xl font-bold md:mb-6 md:text-5xl lg:mb-8">
                            ${item?.price}
                            <span className="text-sm font-light">
                              /{" "}
                              {
                                durations.find(
                                  (data: any) => data.value == item.duration
                                )?.label
                              }
                            </span>
                          </h2>
                          <p className="mb-5 text-center text-[#7c8aaa] md:mb-6 lg:mb-8">
                            {item?.description}
                          </p>
                          <Link
                            href={`${isLoggedIn ? "/upgrade" : "/login"} `}
                            className="inline-block w-full cursor-pointer rounded-full bg-primary px-6 py-4 text-center font-semibold text-white"
                          >
                            Subscribe
                          </Link>
                        </div>

                        <div className="mt-10 flex flex-col items-start gap-5">
                          {item.total_images > 0 && (
                            <div className="flex flex-row items-start text-left text-white">
                              <div className="mr-2 flex text-[#2d6ae0]">
                                <svg
                                  width={32}
                                  height={32}
                                  viewBox="0 0 32 32"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M8.82291 15.198C8.47774 15.199 8.1399 15.3027 7.84846 15.4969C7.55703 15.6911 7.32392 15.968 7.1761 16.2955C7.02829 16.623 6.9718 16.9878 7.01319 17.3476C7.05457 17.7074 7.19213 18.0476 7.40995 18.3287L12.0534 24.3014C12.219 24.5172 12.4312 24.6885 12.6725 24.8009C12.9137 24.9134 13.177 24.9638 13.4406 24.9479C14.0042 24.9161 14.513 24.5995 14.8375 24.079L24.4831 7.76799C24.4847 7.76528 24.4863 7.76257 24.488 7.75991C24.5785 7.614 24.5492 7.32485 24.3624 7.1432C24.3111 7.09331 24.2506 7.05499 24.1846 7.03058C24.1186 7.00618 24.0486 6.99621 23.9789 7.00129C23.9091 7.00637 23.8411 7.02639 23.7789 7.06013C23.7168 7.09386 23.662 7.14059 23.6177 7.19743C23.6142 7.2019 23.6107 7.2063 23.607 7.21064L13.8792 18.7511C13.8422 18.795 13.7973 18.8308 13.747 18.8563C13.6967 18.8818 13.6421 18.8966 13.5863 18.8998C13.5305 18.9029 13.4747 18.8944 13.4221 18.8747C13.3695 18.8551 13.3211 18.8246 13.2798 18.7852L10.0513 15.7003C9.71603 15.3776 9.27778 15.1984 8.82291 15.198Z"
                                    fill="currentColor"
                                  ></path>
                                </svg>
                              </div>
                              <p className="text-[#7c8aaa]">
                                <span className="font-bold">
                                  Total {item?.total_images} Images
                                </span>
                              </p>
                            </div>
                          )}
                          {item?.total_words > 0 && (
                            <div className="flex flex-row items-start text-left text-white">
                              <div className="mr-2 flex text-[#2d6ae0]">
                                <svg
                                  width={32}
                                  height={32}
                                  viewBox="0 0 32 32"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M8.82291 15.198C8.47774 15.199 8.1399 15.3027 7.84846 15.4969C7.55703 15.6911 7.32392 15.968 7.1761 16.2955C7.02829 16.623 6.9718 16.9878 7.01319 17.3476C7.05457 17.7074 7.19213 18.0476 7.40995 18.3287L12.0534 24.3014C12.219 24.5172 12.4312 24.6885 12.6725 24.8009C12.9137 24.9134 13.177 24.9638 13.4406 24.9479C14.0042 24.9161 14.513 24.5995 14.8375 24.079L24.4831 7.76799C24.4847 7.76528 24.4863 7.76257 24.488 7.75991C24.5785 7.614 24.5492 7.32485 24.3624 7.1432C24.3111 7.09331 24.2506 7.05499 24.1846 7.03058C24.1186 7.00618 24.0486 6.99621 23.9789 7.00129C23.9091 7.00637 23.8411 7.02639 23.7789 7.06013C23.7168 7.09386 23.662 7.14059 23.6177 7.19743C23.6142 7.2019 23.6107 7.2063 23.607 7.21064L13.8792 18.7511C13.8422 18.795 13.7973 18.8308 13.747 18.8563C13.6967 18.8818 13.6421 18.8966 13.5863 18.8998C13.5305 18.9029 13.4747 18.8944 13.4221 18.8747C13.3695 18.8551 13.3211 18.8246 13.2798 18.7852L10.0513 15.7003C9.71603 15.3776 9.27778 15.1984 8.82291 15.198Z"
                                    fill="currentColor"
                                  ></path>
                                </svg>
                              </div>
                              <p className="text-[#7c8aaa]">
                                <span className="font-bold">
                                  Total {item.total_words} Words
                                </span>
                              </p>
                            </div>
                          )}
                          {item?.feature_description_lists &&
                            handleFeatureLists(item?.feature_description_lists)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
