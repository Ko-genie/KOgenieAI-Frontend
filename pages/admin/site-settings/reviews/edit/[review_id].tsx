import Link from "next/link";
import { IoMdArrowBack } from "react-icons/io";
import React, { useEffect, useState } from "react";
import Select from "react-select";

import {
  useGetReviewsDetails,
  useUpdateReviewsFormHandler,
} from "@/hooks/admin";

import ButtonTextWithLoader from "@/components/ButtonTextWithLoader";
import { FAQ_TYPE } from "@/helpers/coreConstant";
import SectionLoader from "@/components/SectionLoader";
import { useRouter } from "next/router";
import ImagePicker from "@/components/Modals/imagePicker.comp";
import { useTranslation } from "react-i18next";

const status = [
  { value: 1, label: "Active" },
  { value: 0, label: "In-Active" },
];

const ratings = [
  { value: 5, label: "5" },
  { value: 4, label: "4" },
  { value: 3, label: "3" },
  { value: 2, label: "2" },
  { value: 1, label: "1" },
];

export default function Index() {
  const router = useRouter();
  const { t } = useTranslation();
  const idFromQuery = router.query.review_id;
  const [openForLogo, setOpenForLogo] = useState(false);
  const {
    register,
    handleSubmit,
    updateReviesHandler,
    Controller,
    control,
    setValue,
    errors,
    uploadFeatureImage,
    setUploadFeatureImage,
    featureImage,
    setFeatureImage,
    isLoading: isProcessing,
  } = useUpdateReviewsFormHandler();

  const { data: reviewsDetails, isLoading } = useGetReviewsDetails(
    idFromQuery || {}
  );

  useEffect(() => {
    setValue("user_name", reviewsDetails?.data?.user_name);
    setValue("designation", reviewsDetails?.data?.designation);
    setValue("comment", reviewsDetails?.data?.comment);
    setValue("rating", setRatingValue(reviewsDetails?.data?.rating));
    setValue("id", reviewsDetails?.data?.id);
    setValue("status", setStatusValue(reviewsDetails?.data?.status));
    setUploadFeatureImage(reviewsDetails?.data?.user_image_url ?? null);
  }, [reviewsDetails?.data]);

  const setStatusValue = (data: any) => {
    let newData = status.find((item) => item.value == data);

    return newData;
  };

  const setRatingValue = (data: any) => {
    let newData = ratings.find((item) => item.value == data);

    return newData;
  };

  useEffect(() => {
    if (!featureImage) {
      return;
    }
    setValue("file_id", featureImage);
  }, [featureImage]);

  if (isLoading) return <SectionLoader />;

  return (
    <div className="container dark:text-white">
      <div className="items-center justify-between border-b border-[#f1f3f4] px-6 py-5 dark:border-dark md:flex">
        <div className="container">
          <Link
            href={`/admin/site-settings/reviews`}
            className="mb-3 flex items-center gap-2"
          >
            <IoMdArrowBack size={18} />
            <p>{t(`Back to Reviews`)}</p>
          </Link>

          <h4 className="mt- text-4xl font-bold capitalize">
            {t(`Update Reviews`)}
          </h4>
        </div>
        <div className="mt-2 flex items-center gap-3 md:mt-0"></div>
      </div>

      <div className="py-10 px-6">
        <div className="container">
          <form onSubmit={handleSubmit(updateReviesHandler)}>
            <div>
              <div>
                <h4 className="mb-4 text-xl font-bold">{t(`Edit Reviews`)}</h4>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="user_name">{t(`User Name`)}</label>
                  <input
                    id="user_name"
                    type="text"
                    placeholder="User Name"
                    className="form-input"
                    {...register("user_name")}
                    required
                  />
                  <p className="mt-1 text-danger">
                    <small>{errors.user_name?.message}</small>
                  </p>
                </div>

                <div>
                  <label htmlFor="designation">{t(`Designation`)}</label>
                  <input
                    id="designation"
                    type="text"
                    placeholder="Designation"
                    className="form-input"
                    {...register("designation")}
                    required
                  />
                  <p className="mt-1 text-danger">
                    <small>{errors.designation?.message}</small>
                  </p>
                </div>

                <div>
                  <label>{t(`Rating`)}</label>
                  <Controller
                    control={control}
                    defaultValue={ratings[0]}
                    name="rating"
                    render={({ field }: any) => (
                      <Select
                        classNamePrefix={"wizai-select"}
                        options={ratings}
                        {...field}
                        required
                      />
                    )}
                  />
                  <p className="mt-1 text-danger">
                    <small>{errors.rating?.message}</small>
                  </p>
                </div>
                <div>
                  <label>{t(`Status`)}</label>
                  <Controller
                    control={control}
                    defaultValue={status[0]}
                    name="status"
                    render={({ field }: any) => (
                      <Select
                        classNamePrefix={"wizai-select"}
                        options={status}
                        {...field}
                        required
                      />
                    )}
                  />
                  <p className="mt-1 text-danger">
                    <small>{errors.status?.message}</small>
                  </p>
                </div>
                <div>
                  <label htmlFor="comment">{t(`Comment`)}</label>
                  <textarea
                    id="comment"
                    rows={13}
                    className="form-textarea"
                    placeholder="comment"
                    {...register("comment")}
                    required
                  ></textarea>
                  <p className="mt-1 text-danger">
                    <small>{errors.comment?.message}</small>
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <ImagePicker
                    open={openForLogo}
                    name={"User Image"}
                    setopen={setOpenForLogo}
                    uploadImageUrl={uploadFeatureImage}
                    setuploadImageUrl={setUploadFeatureImage}
                    setId={setFeatureImage}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary mt-8 min-w-[180px] rounded-full"
              disabled={isProcessing}
            >
              <ButtonTextWithLoader
                normalText="Update"
                loadingText="Updating"
                isBtnLoading={isProcessing}
              />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
