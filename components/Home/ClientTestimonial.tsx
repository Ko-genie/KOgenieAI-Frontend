import React from "react";

export default function ClientTestimonial({ reviews }: any) {
  if (reviews.length === 0) return <></>;
  return (
    <section className="relative block dark:text-white" id="testimonials">
      <div className="py-10 md:py-20">
        <div className="px-5 md:px-10">
          <div className="mx-auto w-full max-w-7xl ">
            <div className="mx-auto w-full max-w-3xl">
              <div className="text-center">
                <h2 className="mb-8 text-3xl font-semibold md:mb-12 md:text-5xl lg:mb-16">
                  What our clients are saying
                </h2>
              </div>
            </div>
            <div className="mb-8 block h-full grid-cols-1 flex-row gap-5 py-4 normal-case [column-count:3] [column-rule-style:none] [column-rule-width:0px] [direction:ltr] max-[767px]:[column-count:2] max-[479px]:justify-items-center max-[479px]:[column-count:1] sm:grid-cols-2 md:mb-12 md:grid-cols-3 md:gap-4 lg:mb-16 lg:gap-6">
              {reviews.map((item: any, index: any) => (
                <div className="pt-6" key={index}>
                  <div className="block w-full max-w-full grid-cols-1 flex-col items-end justify-end gap-6 overflow-hidden rounded-2xl border border-solid dark:border-dark bg-white dark:bg-dark px-10 py-8 max-[767px]:p-8">
                    <div className="mb-4 flex flex-row items-start">
                      <img
                        src={`${
                          item.user_image_url
                            ? item.user_image_url
                            : "/assets/images/user-profile.png"
                        }`}
                        alt=""
                        className="mr-4 inline-block h-16 w-16 max-w-full rounded-full object-cover"
                      />
                      <div className="flex flex-col items-start">
                        <h6 className="text-base font-semibold">
                          {item.user_name}
                        </h6>
                        <p className="text-sm text-[#636262] dark:text-gray-400">
                          {item.designation}
                        </p>
                      </div>
                    </div>
                    <div className="mb-4 text-sm text-[#636262] dark:text-gray-400">
                      {item.comment}
                    </div>
                    <div className="flex">
                      {Array.from({ length: item.rating }).map(
                        (data: any, index: any) => (
                          <img
                            src="https://assets.website-files.com/63904f663019b0d8edf8d57c/63904f663019b0ce62f8d5ba_Vector.svg"
                            alt=""
                            className="mr-1.5 inline-block w-4 max-w-full flex-none"
                            key={index}
                          />
                        )
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
           
          </div>
        </div>
      </div>
      <img
        src="https://assets.website-files.com/63904f663019b0d8edf8d57c/639174a3de7d11bdf3ccbf01_Frame%20427322885.svg"
        alt=""
        className="absolute bottom-[0%] left-[0%] right-[auto] top-[auto] -z-10 inline-block max-w-full"
      />
      <img
        src="https://assets.website-files.com/63904f663019b0d8edf8d57c/639174a3de7d11bdf3ccbf01_Frame%20427322885.svg"
        alt=""
        className="absolute bottom-[auto] left-[auto] right-[0%] top-[0%] -z-10 inline-block max-w-full max-[767px]:hidden"
      />
    </section>
  );
}
