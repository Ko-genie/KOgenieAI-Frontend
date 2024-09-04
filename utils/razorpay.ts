import { razorPayCapturePayment, razorPayCreateOrder } from "@/service/payemnt";

export async function displayRazorpay() {
  const { data } = await razorPayCreateOrder("3", "3");
  const options = {
    key: "rzp_test_GQ2BioDhU4FuCl",
    currency: data.currency,
    amount: data.amount,
    name: "Learn Code Online",
    description: "Wallet Transaction",
    image: "http://localhost:1337/logo.png",
    order_id: data.id,
    handler: function (response: any) {
      alert("PAYMENT ID ::" + response.razorpay_payment_id);
      alert("ORDER ID :: " + response.razorpay_order_id);
      razorPayCapturePayment(2, response.razorpay_order_id);
    },
  };
  //@ts-ignore
  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
}
export const loadScript = (src: string) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};
