import { PACKAGE_TYPES } from "@/helpers/coreConstant";
import request from "@/utils/request";

export const getPackagesDataApi = async (
  type: any,
  limit: any,
  offset: any
) => {
  const { data } = await request.get(
    `/payments/admin-get-all-packages?type=${type}&limit=${limit}&offset=${offset}`
  );
  return data;
};

export const getModelNamesDataApi = async () => {
  const { data } = await request.get(`/payments/get-openai-model-names`);
  return data;
};

export const getPriceSuggestionApi = async (value: any) => {
  const { data } = await request.post(`/payments/price-suggestion`, value);
  return data;
};

export const packageFormHandleApi = async (value: any) => {
  const { data } = await request.post("/payments/create-package", value);
  return data;
};

export const packageUpdateFormHandleApi = async (value: any) => {
  const { data } = await request.post("/payments/update-package", value);
  return data;
};

export const getSinglePackagesDataApi = async (pack_id: any) => {
  const { data } = await request.get(
    `/payments/get-package-details/${pack_id}`
  );
  return data;
};

export const packageDeleteHandleApi = async (pack_id: any) => {
  const { data } = await request.delete(`/payments/delete-package/${pack_id}`);
  return data;
};

export const getAllPackagesDataApi = async (type: any) => {
  const { data } = await request.get(
    `payments/get-all-packages?type=${type}&limit=20&offset=1`
  );
  return data;
};
export const checkSubscriptionStatus = async () => {
  const { data } = await request.get("/payments/check-subscription-status");
  return data;
};

export const braintreeDropInPaymentHandlerApi = async (value: any) => {
  if (value.type == PACKAGE_TYPES.PACKAGE) {
    const { data } = await request.post(
      "/payments/add-package-to-subscription-braintree",
      {
        amount: value.amount,
        payment_method_nonce: value.payment_method_nonce,
        packageId: value.packageId,
      }
    );
    return data;
  }
  const { data } = await request.post("/payments/subscribe-braintree", {
    amount: value.amount,
    payment_method_nonce: value.payment_method_nonce,
    packageId: value.packageId,
  });
  return data;
};
