import { IRootState } from "@/store";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const InfoCard = ({ total_documents }: any) => {
  const { isSubscribed } = useSelector(
    (state: IRootState) => state.subcription
  );
  const { user } = useSelector((state: IRootState) => state.userSlice);
  return (
    <div className="relative">
      <div className="panel before:bg-gradient animate-gradient grid h-full grid-cols-1 content-between overflow-hidden before:absolute before:right-[-100%] before:top-0 before:bottom-0 before:w-96 before:rounded-full">
        <div className="z-[7] mb-16 flex items-start justify-between text-white-light">
          <h5 className="text-3xl font-bold">
            {user?.first_name} {user?.last_name}
          </h5>

          <div className="z-10 rounded p-1 text-white-light shadow-[0_0_2px_0_#bfc9d4] hover:bg-[#4361ee]">
            {total_documents} {total_documents > 0 ? "Document's" : "Document"}
          </div>
        </div>

        <div className="z-10 flex items-center justify-between">
          <div className="flex items-center justify-between">
            <Link href={"/ai-writer"}>
              <button
                type="button"
                className="place-content-center rounded p-1 text-white-light shadow-[0_0_2px_0_#bfc9d4] hover:bg-[#1937cc] ltr:mr-2 rtl:ml-2"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </button>
            </Link>
            <Link href={"/my-uses"}>
              <button
                type="button"
                className="grid place-content-center rounded p-1 text-white-light shadow-[0_0_2px_0_#bfc9d4] hover:bg-[#1937cc]"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    opacity="0.5"
                    d="M10 16H6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    opacity="0.5"
                    d="M14 16H12.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    opacity="0.5"
                    d="M2 10L22 10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </Link>
          </div>
          {isSubscribed ? (
            <button
              type="button"
              className="z-10 rounded p-1 text-xl text-white-light shadow-[0_0_2px_0_#bfc9d4] hover:bg-primary"
            >
              Subscribed
            </button>
          ) : (
            <button
              type="button"
              className="z-10 rounded p-1 text-xl text-white-light shadow-[0_0_2px_0_#bfc9d4] hover:bg-primary"
            >
              Not Subscribed
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
