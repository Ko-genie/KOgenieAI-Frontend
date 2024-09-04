import React from "react";

const ProgressCardWithLimit = ({
  title,
  number,
  sideText,
  percentage,
  subtext,
}: any) => {
  return (
    <div>
      <div className="panel h-full">
        <div className="mb-5 flex justify-between dark:text-white-light">
          <h5 className="text-lg font-semibold ">{title}</h5>
        </div>
        <div className=" my-10 text-3xl font-bold text-primary">
          <span>{number} </span>
          <span className="text-sm text-black ltr:mr-2 rtl:ml-2 dark:text-white-light">
            {subtext}{" "}
          </span>
          <span className="text-xl">/ </span>
          <span className="text-sm text-secondary ltr:mr-2 rtl:ml-2 dark:text-white-light">
            {sideText}
          </span>
          <span className="text-sm text-black ltr:mr-2 rtl:ml-2 dark:text-white-light">
            {subtext}{" "}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="h-5 w-full overflow-hidden rounded-full bg-dark-light p-1 shadow-3xl dark:bg-dark-light/10 dark:shadow-none">
            <div
              className="relative h-full w-full rounded-full bg-gradient-to-r from-[#4361ee] to-[#805dca] before:absolute before:inset-y-0 before:m-auto before:h-2 before:w-2 before:rounded-full before:bg-white ltr:before:right-0.5 rtl:before:left-0.5"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>

          {!isNaN(percentage) && (
            <span className="ltr:ml-5 rtl:mr-5 dark:text-white-light">
              {percentage ? parseFloat(percentage).toFixed(3) : 100}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressCardWithLimit;
