import request from "@/utils/request";

// common-settings
export const commonSettings = async () => {
  const { data } = await request.get(`/public-api/common-settings`);
  return data;
};
export const landingPageData = async () => {
  const { data } = await request.get(`/public-api/landing-page-data`);
  return data;
};
