import request from "@/utils/request";

export const createStripePaymentIntent = async (amount: number) => {
  const { data } = await request.post("/payments/create-stripe-intent", {
    amount: amount,
  });
  return data;
};

export const verifyPaymentIntentApiForSubscription = async (
  payment_intent_id: any,
  subcription_package_Id: any
) => {
  const { data } = await request.post(
    "/payments/confirm-and-verify-stripe-payment",
    {
      payment_intent_id: payment_intent_id,
      subcription_package_Id: subcription_package_Id,
    }
  );
  return data;
};

export const verifyPaymentIntentApiForAditionPack = async (
  payment_intent_id: any,
  package_Id: any
) => {
  const { data } = await request.post("/payments/add-package-to-subscription", {
    payment_intent_id: payment_intent_id,
    packageId: package_Id,
  });
  return data;
};
export const razorPayCreateOrder = async (
  package_Id: string,
  amount: string
) => {
  const { data } = await request.post("/payments/razorpay-create-order", {
    packageId: package_Id,
    amount,
  });
  return data;
};
export const razorPayCapturePayment = async (
  package_Id: number,
  orderId: string
) => {
  const { data } = await request.post("/payments/razorpay-capture-subscribe", {
    packageId: package_Id,
    orderId,
  });
  return data;
};
export const razorPaysubscription = async (
  package_Id: number,
  orderId: string
) => {
  const { data } = await request.post(
    "/payments/razorpay-capture-package-to-subscription",
    {
      packageId: package_Id,
      orderId,
    }
  );
  return data;
};
export const paystackCreatePayment = async (
  package_Id: string,
  amount: string,
  type: string
) => {
  const { data } = await request.post("/payments/paystack-create-payment", {
    packageId: package_Id,
    amount,
    type,
  });
  return data;
};
export const paystackSubscription = async (package_Id: number, referance: string) => {
  const { data } = await request.post("/payments/paystack-capture-subscribe", {
    packageId: package_Id,
    referance,
  });
  return data;
};
export const paystackPackageToSub = async (
  package_Id: number,
  referance: string
) => {
  const { data } = await request.post(
    "/payments/paystack-capture-package-to-subscription",
    {
      packageId: package_Id,
      referance,
    }
  );
  return data;
};
