import { PACKAGE_DURATION, PACKAGE_TYPES } from "@/helpers/coreConstant";
import React from "react";
import { toast } from "react-toastify";

export default function UpgradeItem({
  item,
  sripePaymentHandler,
  type,
  isSubscribed,
}: any) {
  const durations = [
    { value: PACKAGE_DURATION.WEEKLY, label: "Weekly" },
    { value: PACKAGE_DURATION.MONTHLY, label: "Monthly" },
    { value: PACKAGE_DURATION.YEARLY, label: "Yearly" },
  ];

  const handleFeatureLists = (data: any) => {
    if (!data) {
      return;
    }
    const arrayFromString = data.split(",");
    return arrayFromString.map((value: any, index: any) => {
      return <li key={index}>{value}</li>;
    });
  };

  return (
    <div className="rounded-md border border-white-light p-4 transition-all duration-300 hover:shadow-[0_0_15px_1px_rgba(113,106,202,0.20)] dark:border-[#1b2e4b] lg:p-9">
      <div className="my-6 flex items-end justify-center ">
        <strong className="text-4xl text-[#3b3f5c] dark:text-white-light lg:text-5xl">
          ${item.price}
        </strong>{" "}
        /{" "}
        <span className="ml-1 text-lg">
          {durations.find((data: any) => data.value == item.duration)?.label}
        </span>
      </div>
      <h3 className="mb-5 flex items-center justify-center text-xl font-bold text-black dark:text-white-light">
        {item.name}
      </h3>
      <p className="flex max-h-[40px] min-h-[40px] items-center justify-center overflow-hidden text-ellipsis">
        {`${
          item.description ||
          "cPanel/WHM included. Intel Xeon E3 with guaranteed 2GB RAM."
        }`}
      </p>
      {type === PACKAGE_TYPES.SUBSCRIPTION}
      <button
        type="button"
        className="btn btn-dark my-6 w-full border-primary bg-primary"
        onClick={() => {
          if (type === PACKAGE_TYPES.SUBSCRIPTION && isSubscribed) {
            return toast.error(
              "You are already subscribed to a package please purchase an additional pakcage"
            );
          }
          sripePaymentHandler(item);
        }}
      >
        Buy Now
      </button>

      <div className="mb-6">
        <strong className="mb-3 inline-block text-[15px] text-black dark:text-white-light">
          Available Features
        </strong>
        <ul className="space-y-3">
          {item.total_images > 0 && <li>Total {item.total_images} Image </li>}
          {item.total_words > 0 && <li>Total {item.total_words} Words</li>}
          {handleFeatureLists(item.feature_description_lists)}
        </ul>
      </div>
    </div>
  );
}
