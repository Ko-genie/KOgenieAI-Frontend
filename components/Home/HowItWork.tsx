import React from "react";

export default function HowItWork({ landingData }: any) {
  return (
    <section className="block dark:text-white" id="how-it-works">
      <div className="py-10 md:py-20">
        <div className="px-5 md:px-10">
          <div className="mx-auto w-full max-w-7xl rounded-2xl p-2 md:p-20">
            <div className="mx-auto w-full max-w-3xl">
              <div className="text-center">
                <h2 className="text-3xl font-semibold md:text-5xl">
                  How it works
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-1 justify-items-center gap-4 max-[767px]:mx-auto max-[767px]:max-w-[400px] sm:justify-items-stretch md:grid-cols-3 lg:gap-8">
              <div className="relative flex grid-flow-row grid-cols-1 flex-col place-items-center justify-center gap-4 rounded-md px-4 py-10 text-center max-[767px]:p-4">
                <div className="animated-border mb-5 flex flex-col items-center justify-center rounded-xl border border-solid border-black bg-white dark:bg-dark px-8 py-5 [box-shadow:rgb(0,_0,_0)_0px_1px] md:mb-6 lg:mb-8">
                  <p className="text-xl font-bold">1</p>
                </div>
                <div className="mb-2 text-xl font-semibold">
                  {landingData?.landing_data?.landing_page_hw_first_title}
                </div>
                <div className="text-sm text-[#636262] dark:text-white">
                  {landingData?.landing_data?.landing_page_hw_first_description}
                </div>
                <img
                  src="https://assets.website-files.com/63904f663019b0d8edf8d57c/639833af1925275b6f0b43e1_Vector%2032.svg"
                  alt=""
                  className="absolute bottom-[-33%] left-[0%] right-[auto] top-[auto] -z-[1] inline-block w-96 max-w-full max-[767px]:hidden max-[767px]:rotate-0 md:bottom-[auto] md:left-[136px] md:right-[-50%] md:top-[18%] lg:left-[auto]"
                />
              </div>
              <div className="relative flex grid-flow-row grid-cols-1 flex-col place-items-center justify-center gap-4 rounded-md px-4 py-10 text-center max-[767px]:p-4">
                <div className="mb-5 flex flex-col items-center justify-center rounded-xl border border-solid border-black bg-white dark:bg-dark px-8 py-5 [box-shadow:rgb(0,_0,_0)_0px_1px] md:mb-6 lg:mb-8">
                  <p className="text-xl font-bold">2</p>
                </div>
                <div className="mb-2 text-xl font-semibold">
                  {landingData?.landing_data?.landing_page_hw_second_title}
                </div>
                <div className="text-sm text-[#636262] dark:text-white">
                  {
                    landingData?.landing_data
                      ?.landing_page_hw_second_description
                  }
                </div>
                <img
                  src="https://assets.website-files.com/63904f663019b0d8edf8d57c/639834731925279c5e0b4ee5_Vector%2033.svg"
                  alt=""
                  className="absolute bottom-[-33%] left-[0%] right-[auto] top-[auto] -z-[1] inline-block w-96 max-w-full max-[767px]:hidden max-[767px]:rotate-0 md:bottom-[auto] md:left-[136px] md:right-[-50%] md:top-[10%] lg:left-[auto]"
                />
              </div>
              <div className="relative flex grid-flow-row grid-cols-1 flex-col place-items-center justify-center gap-4 rounded-md px-4 py-10 text-center max-[767px]:p-4">
                <div className="mb-5 flex flex-col items-center justify-center rounded-xl border border-solid border-black bg-white dark:bg-dark px-8 py-5 [box-shadow:rgb(0,_0,_0)_0px_1px] md:mb-6 lg:mb-8">
                  <p className="text-xl font-bold">3</p>
                </div>
                <div className="mb-2 text-xl font-semibold">
                  {landingData?.landing_data?.landing_page_hw_third_title}
                </div>
                <div className="text-sm text-[#636262] dark:text-white">
                  {landingData?.landing_data?.landing_page_hw_third_description}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
