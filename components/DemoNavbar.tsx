import { IRootState } from "@/store";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import AnimateHeight from "react-animate-height";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default function DemoNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Add a scroll event listener to track scroll position
    window.addEventListener("scroll", handleScroll);

    return () => {
      // Remove the scroll event listener when the component unmounts
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
          <div className="flex items-center gap-x-4 sm:w-9/12">
            <a href="https://wizai.tradexpro.org" target="_blank">
              <div className="relative float-left flex items-center text-lg text-white max-[991px]:mr-auto max-[767px]:pl-0">
                <img
                  src={"/demoLogo.png"}
                  alt=""
                  className="inline-block h-[46px] max-w-full"
                />
              </div>
            </a>
          </div>
          <a href={`https://wizai.tradexpro.org`} target="_blank">
            <button
              type="button"
              className="btn-primary flex items-center gap-2 rounded-full bg-secondary px-5 py-2"
            >
              View Demo
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
