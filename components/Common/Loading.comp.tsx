import React from "react";

const Loading = ({ message = "Loading", size = "large" }) => {
  const spinnerSize = size === "small" ? "w-6 h-6" : "w-16 h-16";

  return (
    <div className="flex h-80 flex-col items-center justify-center">
      <div
        className={`loader rounded-full border-4 border-t-4 ease-linear ${spinnerSize} border-t-primary`}
      />
      <p className="mt-2 text-gray-800 dark:text-white">{message}</p>
    </div>
  );
};

export default Loading;
