import ClientTestimonial from "@/components/Home/ClientTestimonial";
import FaqSection from "@/components/Home/FaqSection";
import FeatureOverview from "@/components/Home/FeatureOverview";
import FeatureSection from "@/components/Home/FeatureSection";
import HowItWork from "@/components/Home/HowItWork";
import Pricing from "@/components/Home/Pricing";
import HomeFooter from "@/components/HomeFooter";
import HomePageHeader from "@/components/HomePageHeader";
import BlankLayout from "@/components/Layouts/BlankLayout";
import { landingPageData } from "@/service/commom";
import React from "react";

const Index = ({ landingData }: any) => {
  

  return (
    <div>
      <HomePageHeader landingData={landingData} />
      <div className="fixed block"></div>
      {/* body section */}
      <div>
        <HowItWork landingData={landingData} />

        <FeatureOverview landingData={landingData} />

        <FeatureSection features={landingData?.feature_of_ai} />

        <Pricing pricing={landingData?.package_list} />

        <ClientTestimonial reviews={landingData?.review_list} />

        <FaqSection faq={landingData?.faq} />

        {/* footer section */}
        <HomeFooter />
      </div>
    </div>
  );
};

Index.getLayout = (page: any) => {
  return <BlankLayout>{page}</BlankLayout>;
};

export default Index;

export async function getServerSideProps() {
  const landingData = await landingPageData();

  return {
    props: {
      landingData: landingData?.data,
    },
  };
}
