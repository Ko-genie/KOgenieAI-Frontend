import { useFile } from "@/hooks/file.hook";
import { Dialog, Transition } from "@headlessui/react";
import { useState, Fragment } from "react";
import ButtonTextWithLoader from "../ButtonTextWithLoader";
import { useTranslation } from "react-i18next";

const ImagePicker = ({
  name,
  open,
  setopen,
  uploadImageUrl,
  setuploadImageUrl,
  setId,
  width = "280px",
  height = "280px",
  minHeight = "280px",
  minWidth = "180px",
}: any) => {
  const {
    isLoading,
    handleUpload,
    selectedImage,
    imageGallery,
    handleImageInputChange,
    handleImagePickerClick,
  } = useFile(setopen);
  const { t } = useTranslation();
  return (
    <div
      className="mb-5"
      style={{
        width: width,
        height: height,
        minHeight: minHeight,
        minWidth: minWidth,
      }}
    >
      <div onClick={handleImagePickerClick} style={{}}>
        <label htmlFor="site_logo" className="text-sm font-bold">
          {name}
        </label>
        <input
          id="site_logo"
          type="file"
          accept="image/*"
          onChange={handleImageInputChange}
          className="hidden"
          disabled={true}
        />

        <div
          className="flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-400 p-4 text-center "
          style={{
            width: width,
            height: height,
            minHeight: minHeight,
            minWidth: minWidth,
          }}
        >
          {uploadImageUrl ? (
            <img
              src={uploadImageUrl?.toString()}
              alt="Selected"
              height={280}
              width={280}
              className="cursor-pointer rounded-lg object-cover"
              onClick={() => setopen(true)}
            />
          ) : (
            <div className="flex items-center justify-center">
              <p className="text-gray-600">{t(`Select an Image`)}</p>
            </div>
          )}
        </div>
      </div>
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" open={open} onClose={() => setopen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0" />
          </Transition.Child>
          <div className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
            <div className="flex min-h-screen items-center justify-center px-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  as="div"
                  className="panel my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark"
                >
                  <div className="mt-5 flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                    <h5 className="text-2xl font-bold">{t(`Image Picker`)}</h5>
                  </div>
                  <div className="p-5">
                    <div>
                      <label
                        htmlFor="site_fav_icon"
                        className="text-sm font-bold"
                      >
                        {t(`Add Images`)}
                      </label>
                      <input
                        id="site_fav_icon"
                        type="file"
                        accept="image/*"
                        onChange={handleImageInputChange}
                        className="rtl:file-ml-5 form-input mt-2 p-0 file:border-0 file:bg-primary/90 file:py-2 file:px-4 file:font-semibold file:text-white file:hover:bg-primary ltr:file:mr-5"
                      />
                    </div>
                    {selectedImage && (
                      <div className="mt-8 flex flex-col items-start justify-center">
                        <img
                          src={
                            typeof selectedImage === "object"
                              ? URL.createObjectURL(selectedImage)
                              //@ts-ignore
                              : selectedImage.toString()
                          }
                          alt="Selected"
                          className="h-80 w-full cursor-pointer rounded-lg object-cover"
                          onClick={() => setopen(true)}
                        />
                        <button
                          type="button"
                          className="btn btn-primary mt-3"
                          onClick={() => handleUpload()}
                        >
                          <ButtonTextWithLoader
                            normalText="Add"
                            loadingText="Adding...."
                            isBtnLoading={isLoading}
                          />
                        </button>
                      </div>
                    )}
                    {imageGallery?.length > 0 && (
                      <div className="mt-8">
                        <h5 className="mb-2 text-lg font-bold">
                          {t(`Image Gallery`)}
                        </h5>
                        <div className="grid grid-cols-3 gap-4">
                          {imageGallery.map((image: any, index) => (
                            <div
                              key={index}
                              className="cursor-pointer"
                              onClick={() => {
                                setuploadImageUrl(image?.file_path);
                                setId(image.id);
                              }}
                            >
                              <img
                                src={image?.file_path}
                                alt={`Image ${index + 1}`}
                                className="h-20 w-full rounded-lg object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="mt-4 flex items-center justify-end space-x-4">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => setopen(false)}
                      >
                        {t(`Confirm Select`)}
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default ImagePicker;
