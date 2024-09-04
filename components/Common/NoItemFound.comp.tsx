import React from "react";

const NoItemFound = ({ message }: { message: string }) => {
  return (
    <div className="h-fi flex h-64 flex-col items-center justify-center">
      <img
        src="/assets/images/notfound.gif"
        alt="Document Icon"
        className="m-0 h-28 w-28" // Adjust the size as needed
      />
      <p className="mt-4 text-xl font-bold uppercase text-gray-600">
        {message || "No items found"}
      </p>
    </div>
  );
};

export default NoItemFound;
