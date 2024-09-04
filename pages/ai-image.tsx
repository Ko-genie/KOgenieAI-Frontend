import React, { useState } from "react";
import Link from "next/link";
import { useMyImages } from "@/hooks/templateSettings.hook";
import CustomPagination from "@/components/CustomPagination";
import ImageModal from "@/components/Modals/image.comp";
import NoItemFound from "@/components/Common/NoItemFound.comp";
import Loading from "@/components/Common/Loading.comp";
import { IoMdArrowBack, IoMdDownload } from "react-icons/io"; // Import the download icon
import SectionLoader from "@/components/SectionLoader";
import ButtonTextWithLoader from "@/components/ButtonTextWithLoader";
import Credits from "@/components/Common/Credits.comp";
import { useCheckSectionSubscriptionStatus } from "@/hooks/paymentSettings.hook";
import { AVAILABLE_FEATURES } from "@/helpers/coreConstant";
import PackageErrorMsg from "@/components/PackageErrorMsg";
import { useTranslation } from "react-i18next";

export default function Image() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);
  const { t } = useTranslation();

  const {
    data,
    isLoading,
    handleSubmit,
    setPrompt,
    prompt,
    isPostLoading,
    handleImageClick,
    modalImageUrl,
    handleCloseModal,
    setModalImageUrl,
    setImageSize,
    imageSize,
  } = useMyImages(currentPage);

  const { enable } = useCheckSectionSubscriptionStatus(
    AVAILABLE_FEATURES.IMAGE_GENERATION
  );
  const galleryImages = data?.data?.list || [];
  const handlePageClick = (event: any) => {
    setCurrentPage(event?.selected + 1);
  };

  const handleDownloadClick = async (imageUrl: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "image.jpg";

      const event = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true,
      });
      anchor.dispatchEvent(event);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setImageSize(e.target.value);
  };
  if (isLoading) return <SectionLoader />;

  return (
    <div className="container min-h-screen ">
      <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-black">
        <div className="mb-10 items-center justify-between border-b py-7 px-2 dark:border-dark dark:text-white md:flex">
          <div>
            <Link href={`/dashboard`} className="mb-3 flex items-center gap-2">
              <IoMdArrowBack size={18} />
              <p>{t("Back to Dashboard")}</p>
            </Link>

            <h4 className="mt- text-4xl font-bold capitalize">
              {t("AI Art Generate")}
            </h4>
            {!enable && <PackageErrorMsg />}
          </div>
          <Credits />
        </div>

        <div className="w-full items-center space-x-4 border p-2 dark:border-dark md:flex">
          <div className="flex w-full items-center space-x-4">
            <div className="relative flex-grow">
              <div className="relative">
                <input
                  type="text"
                  className="h-10 w-full  rounded-lg px-8 py-2 text-gray-700 placeholder-gray-400 focus:border-primary
                focus:outline-none focus:ring dark:!bg-dark dark:text-white"
                  id="prompt"
                  name="prompt"
                  disabled={isPostLoading}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe what you want to see with phrases, and separate them with commas..."
                  required
                />
                <div className="absolute inset-y-0 left-0 flex items-center px-3">
                  <i className="fas fa-wand-magic-sparkles text-gray-400"></i>
                </div>
              </div>
            </div>

            <div>
              <select
                className="h-10 rounded-lg border-none bg-white px-4 focus:ring dark:bg-dark"
                onChange={handleSizeChange}
                value={imageSize}
              >
                <option value="256x256">256x256</option>
                <option value="512x512">512x512</option>
                <option value="1024x1024">1024x1024</option>
              </select>
            </div>
          </div>

          <div className="mt-2 md:mt-0">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isPostLoading || !enable}
              name="submit"
              className="btn w-full min-w-[180px] rounded-lg bg-gradient-to-r from-primary to-secondary px-4 py-2 text-white 
      shadow-none transition duration-300 ease-in-out hover:bg-secondary dark:border-dark"
              id="image-generate"
            >
              <ButtonTextWithLoader
                normalText="Generate"
                loadingText="Generating"
                isBtnLoading={isPostLoading}
              />
            </button>
          </div>
        </div>

        {modalImageUrl && (
          <ImageModal imageUrl={modalImageUrl} onClose={handleCloseModal} />
        )}
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="px-5 pt-8">
            {galleryImages.length > 0 ? (
              <div className="grid grid-cols-2 gap-0 sm:grid-cols-3 lg:grid-cols-5">
                {galleryImages.map((image: any, index: number) => (
                  <div
                    key={index}
                    className="w-1/9 relative cursor-pointer p-1 md:p-2"
                    onMouseEnter={() => setHoveredImage(index)}
                    onMouseLeave={() => setHoveredImage(null)}
                  >
                    <img
                      alt={image.created_at}
                      className="block h-full w-full rounded-lg object-cover object-center"
                      src={image.image_url}
                      onClick={() => handleImageClick(image.image_url)}
                    />
                    {hoveredImage === index && (
                      <button
                        className="absolute top-2 right-2 mr-4 mt-2 rounded-full bg-white bg-opacity-75 p-2 text-gray-800 hover:bg-opacity-100"
                        onClick={() => handleDownloadClick(image.image_url)}
                      >
                        <IoMdDownload size={18} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <NoItemFound message="No images found" />
            )}
          </div>
          {galleryImages.length > 0 && (
            <div className="mt-8">
              <div className="flex w-full flex-col justify-center">
                <CustomPagination
                  totalItems={data?.data?.meta?.total}
                  perPageItems={data?.data?.meta?.perPage}
                  handlePageClick={handlePageClick}
                  activePage={data?.data?.meta?.currentPage}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
