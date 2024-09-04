import React, { useEffect, useState } from "react";
import HomePageNav from "./HomePageNav";
import { useSelector } from "react-redux";
import { IRootState } from "@/store";
import Link from "next/link";
import Head from "next/head";

export default function HomePageHeader({ landingData }: any) {
  const { user, isLoggedIn } = useSelector(
    (state: IRootState) => state.userSlice
  );

  return (
    <section className="animate-gradient-for-home-page-banner  curve-custom">
      <HomePageNav
        landingLogo={landingData?.landing_data?.landing_page_logo_url}
      />
      <Head>
        <link
          rel="icon"
          href={landingData?.settings?.site_fav_icon}
          type="image/x-icon"
        />
        <title>{landingData?.settings?.meta_title}</title>
        <meta
          name="description"
          content={landingData?.settings?.meta_description}
        />
      </Head>
      <header className="relative block " id="home">
        <div className="container px-5 md:px-10">
          <div className="mx-auto w-full max-w-7xl">
            <div className="py-16 md:py-24 lg:py-32">
              <div className="mx-auto mt-10 grid grid-cols-1 items-center gap-x-4 text-white lg:grid-cols-2">
                <div className="py-10 lg:py-24">
                  <div className="col-span-3">
                    <h1 className="text-2xl font-bold text-white md:text-7xl ">
                      {landingData?.landing_data?.landing_page_first_title}
                    </h1>
                  </div>
                  <div className="col-span-2">
                    <div className="mx-auto mb-5 md:mb-6 lg:mb-8">
                      <p className="text-xs md:text-base">
                        {
                          landingData?.landing_data
                            ?.landing_page_first_description
                        }
                      </p>
                    </div>
                    {isLoggedIn && (
                      <Link
                        href={`${
                          user?.is_admin ? "/admin/dashboard" : "/dashboard"
                        }`}
                      >
                        <button
                          type="button"
                          className="flex items-center gap-2 rounded-full border border-white px-5 py-2"
                        >
                          {
                            landingData?.landing_data
                              ?.landing_page_first_btn_text
                          }
                        </button>
                      </Link>
                    )}
                  </div>
                </div>
                <div className="floating-image mt-4 h-full rounded-[1.25rem] p-[.4375rem] lg:mt-0">
                  <img
                    className="animated-image h-full overflow-hidden rounded-[1.25rem]"
                    src={
                      landingData?.landing_data?.landing_page_first_img_url
                        ? landingData?.landing_data?.landing_page_first_img_url
                        : "/assets/images/banner_img.webp"
                    }
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </section>
  );
}
