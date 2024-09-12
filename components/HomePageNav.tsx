import { IRootState } from "@/store";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import AnimateHeight from "react-animate-height";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default function HomePageNav({ landingLogo }: any) {
  const { user, isLoggedIn } = useSelector(
    (state: IRootState) => state.userSlice
  );
  const [isMobileNavOpen, setIsMobileNavOpen] = useState<any>(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    // Add a scroll event listener to track scroll position
    window.addEventListener("scroll", handleScroll);

    return () => {
      // Remove the scroll event listener when the component unmounts
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const { settings } = useSelector((state: IRootState) => state.common.data);

  const handleScroll = () => {
    // Check if the user has scrolled down by comparing the scroll position with a threshold value (e.g., 100 pixels)
    if (window.scrollY > 70) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  return (
    <div
      className={`fixed left-0 top-0 z-[1000] block w-full border-b border-white border-opacity-10 ${
        scrolled && "bg-black"
      }  py-3 text-white lg:block`}
    >
      
      <div className="px-5 md:px-10">
        <div className="mx-auto flex w-full max-w-screen-2xl auto-cols-auto grid-cols-[auto_max-content] items-center justify-between gap-[0px] lg:grid-cols-[176px_auto]">
          <div className="flex w-9/12 items-center gap-x-4">
            <Link href={`/`}>
              <div className="relative float-left flex items-center text-lg text-white max-[991px]:mr-auto max-[767px]:pl-0">
                <img
                  src={landingLogo ? landingLogo : " "}
                  alt=""
                  className="inline-block h-[46px] max-w-full"
                />
              </div>
            </Link>

            <nav className="relative float-right flex place-content-between max-[991px]:ml-0 max-[991px]:mr-0 max-[991px]:hidden max-[991px]:bg-black max-[991px]:py-1 max-[991px]:text-left">
              <div className="mx-auto flex items-start text-base max-[991px]:flex-col lg:items-center">
                <a
                  href="#home"
                  target="_self"
                  className="px-5 py-2 text-white transition max-[991px]:block md:px-10 lg:px-4"
                >
                  Home
                </a>
                <a
                  href="#features"
                  target="_self"
                  className="px-5 py-2 text-white transition max-[991px]:block md:px-10 lg:px-4"
                >
                  Features
                </a>
                <a
                  href="#how-it-works"
                  target="_self"
                  className="px-5 py-2 text-white transition max-[991px]:block md:px-10 lg:px-4"
                >
                  How it Works
                </a>
                <a
                  href="#pricing"
                  className="px-5 py-2 text-white transition max-[991px]:block md:px-10 lg:px-4"
                >
                  Pricing
                </a>
                <a
                  href="#testimonials"
                  target="_self"
                  className="px-5 py-2 text-white transition max-[991px]:block md:px-10 lg:px-4"
                >
                  Testimonials
                </a>
                <a
                  href="#faqs"
                  target="_self"
                  className="px-5 py-2 text-white transition max-[991px]:block md:px-10 lg:px-4"
                >
                  FAQs
                </a>
              </div>
            </nav>
          </div>
          {isLoggedIn ? (
            <Link
              href={`${user?.is_admin ? "/admin/dashboard" : "/dashboard"}`}
            >
              <button
                type="button"
                className="btn-primary hidden items-center gap-2 rounded-full bg-secondary px-5 py-2 lg:flex"
              >
                Go To Dashboard
              </button>
            </Link>
          ) : (
            <div className="flex items-center gap-x-4 ">
              <Link href={`/register`}>
                <button className="btn btn-outline-white hidden rounded-full shadow-none lg:block">
                  Sign Up
                </button>
              </Link>
              <Link href={`/login`}>
                <button
                  type="button"
                  className="btn btn-primary hidden items-center gap-2 rounded-full border-0 bg-secondary lg:flex"
                >
                  Login
                </button>
              </Link>
            </div>
          )}

          <div className="relative float-right hidden cursor-pointer select-none p-3 text-2xl max-[991px]:z-[9999] max-[991px]:-mr-3 max-[991px]:block max-[991px]:text-white lg:p-[18px]">
            <div
              className=""
              onClick={() => setIsMobileNavOpen((prev: any) => !prev)}
            >
              <svg
                width="1.25rem"
                height="1rem"
                viewBox="0 0 20 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 7H1C0.447715 7 0 7.44772 0 8C0 8.55228 0.447715 9 1 9H19C19.5523 9 20 8.55228 20 8C20 7.44772 19.5523 7 19 7Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M19 0H7C6.44772 0 6 0.447715 6 1C6 1.55228 6.44772 2 7 2H19C19.5523 2 20 1.55228 20 1C20 0.447715 19.5523 0 19 0Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M19 14H11C10.4477 14 10 14.4477 10 15C10 15.5523 10.4477 16 11 16H19C19.5523 16 20 15.5523 20 15C20 14.4477 19.5523 14 19 14Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <div className="fixed top-[65px] left-0 right-0 bg-black">
              <AnimateHeight
                duration={300}
                height={isMobileNavOpen ? "auto" : 0}
              >
                <div className="my-4 overflow-hidden ">
                  <nav className="relative float-left flex place-content-between max-[991px]:ml-0 max-[991px]:mr-0 max-[991px]:bg-black max-[991px]:py-1 max-[991px]:text-left">
                    <div className="mx-auto flex items-start text-base max-[991px]:flex-col lg:items-center">
                      <a
                        href="#home"
                        target="_self"
                        className="px-5 py-2 text-white transition max-[991px]:block md:px-10 lg:px-4"
                      >
                        Home
                      </a>
                      <a
                        href="#features"
                        target="_self"
                        className="px-5 py-2 text-white transition max-[991px]:block md:px-10 lg:px-4"
                      >
                        Features
                      </a>
                      <a
                        href="#how-it-works"
                        target="_self"
                        className="px-5 py-2 text-white transition max-[991px]:block md:px-10 lg:px-4"
                      >
                        How it Works
                      </a>
                      <a
                        href="#pricing"
                        className="px-5 py-2 text-white transition max-[991px]:block md:px-10 lg:px-4"
                      >
                        Pricing
                      </a>
                      <a
                        href="#testimonials"
                        target="_self"
                        className="px-5 py-2 text-white transition max-[991px]:block md:px-10 lg:px-4"
                      >
                        Testimonials
                      </a>
                      <a
                        href="#faqs"
                        target="_self"
                        className="px-5 py-2 text-white transition max-[991px]:block md:px-10 lg:px-4"
                      >
                        FAQs
                      </a>

                      <div className="ml-5 mt-2 flex flex-col gap-y-4">
                        {isLoggedIn ? (
                          <Link
                            href={`${
                              user?.is_admin ? "/admin/dashboard" : "/dashboard"
                            }`}
                          >
                            <button
                              type="button"
                              className="btn-primary flex items-center gap-2 rounded-full bg-secondary px-5 py-2"
                            >
                              Go To Dashboard
                            </button>
                          </Link>
                        ) : (
                          <>
                            <Link href={`/register`}>
                              <button className="btn btn-outline-white block rounded-full shadow-none">
                                Sign Up
                              </button>
                            </Link>
                            <Link
                              href={`${
                                user?.is_admin
                                  ? "/admin/dashboard"
                                  : "/dashboard"
                              }`}
                            >
                              <button
                                type="button"
                                className="btn btn-primary flex items-center gap-2 rounded-full border-0 bg-secondary"
                              >
                                Get started
                              </button>
                            </Link>
                          </>
                        )}
                      </div>
                    </div>
                  </nav>
                </div>
              </AnimateHeight>
            </div>
          </div>
          {/* for mobile */}
        </div>
      </div>
    </div>
  );
}
