import React from "react";

export default function ImageModal({ imageUrl, onClose }: any) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative max-h-full max-w-full">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 cursor-pointer text-2xl text-white bg-black rounded-full h-7 w-7"
        >
          &times;
        </button>
        <img
          src={imageUrl}
          alt="Image"
          className="mx-auto max-h-full max-w-full"
        />
      </div>
    </div>
  );
}
