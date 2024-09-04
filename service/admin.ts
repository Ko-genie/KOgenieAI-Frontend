import request from "@/utils/request";

export const getTransactionList = async (
  limit: any,
  offset: any,
  search: any
) => {
  const { data } = await request.get(
    `/payments/get-all-transaction?limit=${limit}&offset=${offset}&search=${search}`
  );
  return data;
};
export const getGeneralSettingsDataApi = async () => {
  const { data } = await request.get("/admin-settings/general-settings-data");
  return data;
};
export const getOpenAiModels = async () => {
  const { data } = await request.get("/admin-settings/get-openai-models");
  return data;
};
export const getOpenAiSettings = async () => {
  const { data } = await request.get(
    "/admin-settings/get-open-ai-settings-data"
  );
  return data;
};
export const updateOpenAiSettings = async (value: any) => {
  const { data } = await request.post(
    "/admin-settings/update-open-ai-settings",
    value
  );
  return data;
};

export const getAdminDashboardData = async () => {
  const { data } = await request.get(
    "/admin-settings/get-admin-dashboard-data"
  );
  return data;
};
export const generalSettingsFormHandleApi = async (value: any) => {
  const { data } = await request.post(
    "/admin-settings/update-general-settings",
    value
  );
  return data;
};

export const getSmtpSettingsDataApi = async () => {
  const { data } = await request.get("/admin-settings/smtp-settings-data");
  return data;
};

export const smtpSettingsFormHandleApi = async (value: any) => {
  const { data } = await request.post(
    "/admin-settings/update-smtp-settings",
    value
  );
  return data;
};

export const smtpTestMailSettingsFormHandleApi = async (value: any) => {
  const { data } = await request.post("/admin-settings/test-mail", value);
  return data;
};

export const getPrivacyAndTermsSettingsDataApi = async () => {
  const { data } = await request.get("/admin-settings/get-terms-privacy-data");
  return data;
};

export const privacyAndTermsSettingsFormHandleApi = async (value: any) => {
  const { data } = await request.post(
    "/admin-settings/update-terms-privacy",
    value
  );
  return data;
};

export const getGoogleAuthSettingsDataApi = async () => {
  const { data } = await request.get(
    "/admin-settings/get-google-auth-settings-data"
  );
  return data;
};

export const getGithubAuthSettingsDataApi = async () => {
  const { data } = await request.get(
    "/admin-settings/get-github-auth-settings-data"
  );
  return data;
};

export const googleAuthSettingsFormHandleApi = async (value: any) => {
  const { data } = await request.post(
    "/admin-settings/update-google-auth-settings",
    value
  );
  return data;
};

export const githubAuthSettingsFormHandleApi = async (value: any) => {
  const { data } = await request.post(
    "/admin-settings/update-github-auth-settings",
    value
  );
  return data;
};

export const getStripeCredSettingsDataApi = async () => {
  const { data } = await request.get(
    "/admin-settings/get-payment-stripe-settings-data"
  );
  return data;
};
export const getRazorpayCredSettingsDataApi = async () => {
  const { data } = await request.get(
    "/admin-settings/get-payment-razorpay-settings-data"
  );
  return data;
};
export const razorpayCredSettingsFormHandleApi = async (value: any) => {
  const { data } = await request.post(
    "/admin-settings/update-payment-razorpay-settings",
    value
  );
  return data;
};
export const getPaystackCredSettingsDataApi = async () => {
  const { data } = await request.get(
    "/admin-settings/get-payment-paystack-settings-data"
  );
  return data;
};
export const paystackCredSettingsFormHandleApi = async (value: any) => {
  const { data } = await request.post(
    "/admin-settings/update-payment-paystack-settings",
    value
  );
  return data;
};

export const stripeCredSettingsFormHandleApi = async (value: any) => {
  const { data } = await request.post(
    "/admin-settings/update-payment-stripe-settings",
    value
  );
  return data;
};

// for faq

export const addFaqSettingsFormHandleApi = async (value: any) => {
  const { data } = await request.post("/admin-faq/create", value);
  return data;
};

export const getFaqListsForAdminApi = async (page: any) => {
  const { data } = await request.get(`/admin-faq/list?limit=10&offset=${page}`);
  return data;
};

export const faqListsForAdminDeleteHandleApi = async (faq_id: any) => {
  const { data } = await request.delete(`/admin-faq/delete-${faq_id}`);
  return data;
};

export const getFaqDetailsApi = async (faq_id: any) => {
  const { data } = await request.get(`/admin-faq/details-${faq_id}`);
  return data;
};

export const updateFaqSettingsFormHandleApi = async (value: any) => {
  const { data } = await request.post("/admin-faq/update", value);
  return data;
};

export const getSiteSettingsDataApi = async () => {
  const { data } = await request.get("/admin-settings/get-landing-page-data");
  return data;
};

export const siteSettingsFormHandleApi = async (value: any) => {
  const { data } = await request.post(
    "/admin-settings/update-landing-page-data",
    value
  );
  return data;
};

// for feature of ai

export const getFeatureOfAiListsForAdminApi = async (
  page: any,
  search: any
) => {
  const { data } = await request.get(
    `/admin/get-feature-ai-list?limit=10&offset=${page}&search=${search}`
  );
  return data;
};

export const featureOfAiFormHandleApi = async (value: any) => {
  const { data } = await request.post("/admin/add-new-feature", value);
  return data;
};

export const featureOfAiListsForAdminDeleteHandleApi = async (
  feature_id: any
) => {
  const { data } = await request.delete(
    `/admin/delete-feature-ai-${feature_id}`
  );
  return data;
};

export const getFeatureOfAiDetailsApi = async (feature_id: any) => {
  const { data } = await request.get(`/admin/feature-ai-details-${feature_id}`);
  return data;
};

export const updateFeatureOfAiFormHandleApi = async (value: any) => {
  const { data } = await request.post("/admin/update-feature-ai", value);
  return data;
};

// for Reviews

export const getReviewsListsForAdminApi = async (page: any, search: any) => {
  const { data } = await request.get(
    `/admin/get-review-list?limit=10&offset=${page}&search=${search}`
  );
  return data;
};

export const reviewsFormHandleApi = async (value: any) => {
  const { data } = await request.post("/admin/create-new-review", value);
  return data;
};

export const reviewsListsForAdminDeleteHandleApi = async (feature_id: any) => {
  const { data } = await request.delete(`/admin/delete-review-${feature_id}`);
  return data;
};

export const getReviewsDetailsApi = async (feature_id: any) => {
  const { data } = await request.get(`/admin/review-details-${feature_id}`);
  return data;
};

export const updateReviewsFormHandleApi = async (value: any) => {
  const { data } = await request.post("/admin/update-review", value);
  return data;
};

// for Programing Language

export const getProgramingLanguageListsForAdminApi = async (
  page: any,
  search: any
) => {
  const { data } = await request.get(
    `admin-dashboard/get-programing-language-list?limit=10&offset=${page}&search=${search}`
  );
  return data;
};

export const programingLanguageFormHandleApi = async (value: any) => {
  const { data } = await request.post(
    "/admin-dashboard/add-new-programing-language",
    value
  );
  return data;
};

export const programingLanguageForAdminDeleteHandleApi = async (id: any) => {
  const { data } = await request.delete(
    `/admin-dashboard/delete-programing-language-${id}`
  );
  return data;
};

export const getProgramingLanguageDetailsApi = async (id: any) => {
  const { data } = await request.get(
    `/admin-dashboard/get-programing-language-details-${id}`
  );
  return data;
};

export const updateProgramingLanguageFormHandleApi = async (value: any) => {
  const { data } = await request.post(
    "/admin-dashboard/update-programing-language",
    value
  );
  return data;
};

export const getUserListsForAdminApi = async (page: any, search: any) => {
  const { data } = await request.get(
    `/admin/user-list?limit=10&offset=${page}&search=${search}`
  );
  return data;
};

export const updateUserStatusApi = async (value: any) => {
  const { data } = await request.post("/admin/status-change-user", value);
  return data;
};

export const getMyUsesApi = async (page: any, search: any) => {
  const { data } = await request.get(
    `/user/get-my-uses-history-list?limit=10&offset=${page}&search=${search}`
  );
  return data;
};

export const getUsesHistoryForAdminApi = async (page: any, search: any) => {
  const { data } = await request.get(
    `/admin-template/get-all-user-uses-history?limit=10&offset=${page}&search=${search}`
  );
  return data;
};

// for braintree

export const braintreeCredSettingsFormHandleApi = async (value: any) => {
  const { data } = await request.post(
    "/admin-settings/update-braintree-settings-data",
    value
  );
  return data;
};

export const getBraintreeCredSettingsDataApi = async () => {
  const { data } = await request.get(
    "/admin-settings/get-braintree-settings-data"
  );
  return data;
};

// for user transaction history

export const getTransactionHistoryList = async (
  limit: any,
  offset: any,
  search: any
) => {
  const { data } = await request.get(
    `/payments/get-my-transaction-list?limit=${limit}&offset=${offset}&search=${search}`
  );
  return data;
};

// for Social Media

export const socialMediaFormHandleApi = async (value: any) => {
  const { data } = await request.post("/admin/create-new-social-media", value);
  return data;
};

export const getSocialMediaListsForAdminApi = async (page: any) => {
  const { data } = await request.get(
    `/admin/get-social-media-list?limit=10&offset=${page}`
  );
  return data;
};

export const socialMediaDeleteHandleApi = async (id: any) => {
  const { data } = await request.delete(`/admin/delete-social-media-${id}`);
  return data;
};

export const getSocialMediaDetailsApi = async (id: any) => {
  const { data } = await request.get(`/admin/social-media-details-${id}`);
  return data;
};

export const socialMediaUpdateFormHandleApi = async (value: any) => {
  const { data } = await request.post("/admin/update-social-media", value);
  return data;
};

// for chat template

export const chatTemplateFormHandleApi = async (value: any) => {
  const { data } = await request.post("/admin/create-chat-category", value);
  return data;
};

export const getChatTemplateListsForAdminApi = async (
  page: any,
  search: any
) => {
  const { data } = await request.get(
    `/admin/openai-chat-category-list?limit=10&offset=${page}&search=${search}`
  );
  return data;
};

export const getChatTemplateDetailsApi = async (id: any) => {
  const { data } = await request.get(
    `/admin/get-openai-chat-category-details-${id}`
  );
  return data;
};

export const updateChatTemplateFormHandleApi = async (value: any) => {
  const { data } = await request.post("/admin/update-chat-category", value);
  return data;
};

export const chatTemplateDeleteHandleApi = async (id: any) => {
  const { data } = await request.delete(
    `/admin/delete-openai-chat-chategory-${id}`
  );
  return data;
};

export const getChatTemplateListsForUserApi = async (page: any) => {
  const { data } = await request.get(
    `/user/get-openai-chat-category-list?limit=10&offset=${page}`
  );
  return data;
};

export const getChatTemplateDetailsApiForUser = async (
  id: any,
  search: any
) => {
  const { data } = await request.get(
    `/user/get-openai-chat-list-category-${id}?search=${search}`
  );
  return data;
};

export const getChatDetailsApiForUser = async (id: any) => {
  const { data } = await request.get(`/user/get-openai-chat-details-${id}`);
  return data;
};

export const sendChatMsgFormHandleApi = async (value: any) => {
  const { data } = await request.post("/user/send-openai-chat-message", value);
  return data;
};

export const sendNewChatMsgFormHandleApi = async (value: any) => {
  const { data } = await request.post("/user/start-new-chat", value);
  return data;
};

export const updateTitleChatMsgFormHandleApi = async (value: any) => {
  const { data } = await request.post("/user/update-chat-title", value);
  return data;
};

export const chatItemForUserDeleteHandleApi = async (id: any) => {
  const { data } = await request.delete(
    `/user/delete-openai-chat-details-${id}`
  );
  return data;
};
