import DemoNavbar from "@/components/DemoNavbar";
import BlankLayout from "@/components/Layouts/BlankLayout";
import React from "react";
import { landingPageData } from "@/service/commom";
import FeatureSection from "@/components/Home/FeatureSection";
import HowItWork from "@/components/Home/HowItWork";
import HomeFooter from "@/components/HomeFooter";
export default function Index({ landingData }: any) {
  return (
    <div>
      <div className="w-full bg-gradient-to-r from-primary to-secondary text-white">
        <div>
          <DemoNavbar />
          <header className="relative block ">
            <div className="container pt-20">
              <div className="mx-auto w-full max-w-7xl">
                <div className="py-16">
                  <div className="mx-auto flex max-w-3xl flex-col items-center justify-center gap-x-4 text-center text-white">
                    <div className=" max-w-3xl">
                      <h1 className="text-2xl font-bold text-white md:text-5xl ">
                        WizAI - Your Complete AI Companion
                      </h1>

                      <p className="mt-4 text-xs md:text-base">
                        Meet WizAI – Your all-in-one AI Companion. Unleash its
                        power for seamless content creation, code generation,
                        translation, and more. Simplify your work with WizAI's
                        AI expertise
                      </p>
                    </div>
                    <a href="https://wizai.tradexpro.org" target="_blank">
                      <button
                        type="button"
                        className="btn btn-primary my-8 flex items-center gap-2 rounded-full border-0 bg-secondary text-xl"
                      >
                        View Demo
                      </button>
                    </a>
                    <div className="max-w-3xl">
                      <a href="https://wizai.tradexpro.org" target="_blank">
                        <img src="/HomeWizAi.png" height={400} alt="" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>
        </div>
      </div>

      <FeatureSection features={landingData?.feature_of_ai} />
      <HomeFooter />
    </div>
  );
}

Index.getLayout = (page: any) => {
  return <BlankLayout>{page}</BlankLayout>;
};

export async function getServerSideProps() {
  const landingData = await landingPageData();

  return {
    props: {
      landingData: landingData?.data,
    },
  };
}
