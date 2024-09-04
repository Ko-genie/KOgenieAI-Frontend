import React, { useState } from "react";
import AnimateHeight from "react-animate-height";

export default function FaqSection({ faq }: any) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null); // Initialize activeFaq with null

  return (
    <section className="block dark:text-white" id="faqs">
      <div className="px-5 md:px-10">
        <div className="pb-10 md:pb-20">
          <div className="mx-auto w-full max-w-7xl rounded-2xl border dark:border-dark p-4 md:p-20">
            <div className="mx-auto mb-8 flex max-w-3xl flex-col items-center text-center md:mb-12 lg:mb-16">
              <h2 className="text-3xl font-bold md:text-5xl">
                Frequently Asked
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {faq?.map((faqData: any, index: number) => (
                <div
                  key={index}
                  className="h-fit w-full flex-col overflow-auto rounded-xl border border-solid dark:border-dark p-8"
                >
                  <div
                    className="flex cursor-pointer items-start justify-between"
                    onClick={() =>
                      setActiveFaq(activeFaq === index ? null : index)
                    } // Toggle the active FAQ index
                  >
                    <div className="text-xl font-bold">{faqData.question}</div>
                    <div className="relative ml-10 mt-1 flex h-5 w-5 items-center justify-center">
                      <div className="absolute h-5 w-0.5 bg-[#0b0b1f]" />
                      <div className="h-0.5 w-5 bg-[#0b0b1f]" />
                    </div>
                  </div>
                  <AnimateHeight
                    duration={300}
                    height={activeFaq === index ? "auto" : 0}
                  >
                    <div className="my-4 overflow-hidden">
                      <p className="max-[479px]:text-sm">{faqData.answer}</p>
                    </div>
                  </AnimateHeight>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
