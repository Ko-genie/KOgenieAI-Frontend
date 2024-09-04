import { loadScript, displayRazorpay } from "@/utils/razorpay";
import React, { useEffect } from "react";

const razorpay = () => {
  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  });
  return (
    <div>
      <button
        type="button"
        onClick={displayRazorpay}
        className="course-payment-button"
      >
        Buy Now
      </button>
    </div>
  );
};

export default razorpay;
