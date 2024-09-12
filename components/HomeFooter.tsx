import { IRootState } from "@/store";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

export default function HomeFooter() {
  const { social_media_list, settings } = useSelector(
    (state: IRootState) => state?.common?.data
  );
  return (
    <>
      <footer className="block dark:text-white">
        <div className="px-5 md:px-10">
          <div className="mx-auto w-full max-w-7xl">
            <div className="pb-10 md:pb-20">
              <div className="my-12 flex items-center justify-between border-y dark:border-dark py-8">
                <Link href={`/`}>
                  <div className="relative float-left flex items-center text-xl text-black max-[991px]:mr-auto max-[767px]:pl-0">
                    <img
                      src={settings?.site_logo ? settings?.site_logo : " "}
                      alt=""
                      className="inline-block max-h-12 max-w-full"
                    />
                  </div>
                </Link>

                <div className="grid w-full max-w-[208px] grid-flow-col grid-cols-4 gap-3">
                  {social_media_list?.length > 0 &&
                    social_media_list.map((item: any, index: any) => (
                      <a
                        href={item.link}
                        target="_blank"
                        key={index}
                        className="mx-auto flex w-[24px] max-w-[24px] flex-col items-center justify-center"
                      >
                        <img
                          src={item.image_url}
                          alt=""
                          className="inline-block max-w-full"
                        />
                      </a>
                    ))}
                </div>
              </div>
              <div className="text-center">
                <p className="text-[#647084] dark:text-white">
                  {settings?.site_copy_right_text &&
                    `© ${settings?.site_copy_right_text}`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
