import { PACKAGE_TYPES } from "@/helpers/coreConstant";
import { useSubscriptionStatus } from "@/hooks/paymentSettings.hook";
import {
  verifyPaymentIntentApiForAditionPack,
  verifyPaymentIntentApiForSubscription,
} from "@/service/payemnt";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { toast } from "react-toastify";

const CardPayment = ({ setAddPaymentModal, packDetails }: any) => {
  const stripe = useStripe();
  const elements = useElements();
  const { data, refetch } = useSubscriptionStatus();

  const [isStripeLoading, setIsStripeLoading] = useState<any>(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsStripeLoading(true);

    if (!stripe || !elements) {
      setIsStripeLoading(false);

      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "https://example.com/order/123/complete",
      },
      redirect: "if_required",
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
      setIsStripeLoading(false);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        let verifyResponse;
        if (packDetails?.type == PACKAGE_TYPES.SUBSCRIPTION) {
          verifyResponse = await verifyPaymentIntentApiForSubscription(
            result.paymentIntent.id,
            packDetails?.id
          );
        }
        if (packDetails?.type == PACKAGE_TYPES.PACKAGE) {
          verifyResponse = await verifyPaymentIntentApiForAditionPack(
            result.paymentIntent.id,
            packDetails?.id
          );
        }
        if (!verifyResponse?.success) {
          toast.error(verifyResponse.message);
        }
        refetch();
        toast.success(verifyResponse.message);
        setAddPaymentModal(false);
        setIsStripeLoading(false);
      }
      setIsStripeLoading(false);
    }
  };

  return (
    <div className="p-10">
      <form onSubmit={handleSubmit}>
        <PaymentElement id="payment-elem" />
        <button
          disabled={!stripe || isStripeLoading}
          type="submit"
          className="btn btn-primary mt-4 rounded-full"
        >
          {isStripeLoading ? `Processing..` : `Submit`}
        </button>
      </form>
    </div>
  );
};

export default CardPayment;
