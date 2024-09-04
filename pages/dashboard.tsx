import Link from "next/link";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setPageTitle } from "../store/themeConfigSlice";
import { getServerSideProps } from "../utils/functions";
import ProgressCardWithLimit from "@/components/Cards/ProgressCardWithLimit.comp";
import InfoCard from "@/components/Cards/infoCard.comp";
import { useGetUserDashboardData } from "@/hooks/user.hook";
import moment from "moment";
import NoItemFound from "@/components/Common/NoItemFound.comp";
import { FaFileAlt } from "react-icons/fa";
import SectionLoader from "@/components/SectionLoader";
import { useTranslation } from "react-i18next";
const Dashboard = () => {
  const { data, isLoading } = useGetUserDashboardData();
  const { t } = useTranslation();

  if (isLoading)
    return (
      <div className="container min-h-screen pt-5">
        <SectionLoader />
      </div>
    );

  return (
    <div className="container min-h-screen pt-5">
      <div className="mb-6 grid gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3">
        <InfoCard total_documents={data?.total_documents} />
        <ProgressCardWithLimit
          title="Image Left"
          number={data?.image_left}
          subtext="IMAGES"
          sideText={`${data?.total_images}`}
          percentage={
            ((data?.total_images - data?.image_left) / data?.total_images) * 100
          }
        />

        <ProgressCardWithLimit
          title="Words Left"
          number={data?.word_left}
          subtext="WORDS"
          sideText={`${data?.total_words}`}
          percentage={
            ((data?.total_words - data?.word_left) / data?.total_words) * 100
          }
        />
      </div>

      <div className="grid grid-cols-1 gap-4 px-6 lg:grid-cols-2">
        <div className="panel h-full">
          <div className="-mx-5 mb-5 flex items-start justify-between border-b border-white-light p-5 pt-0  dark:border-[#1b2e4b] dark:text-white">
            <h5 className="text-lg font-semibold ">{t("My Documents")}</h5>
          </div>

          <div className="table-responsive">
            <table>
              <tbody>
                {data?.my_documents?.map((item: any) => (
                  <tr key={item?.id}>
                    <td className={`w-12 !p-2`}>
                      <img
                        src="/assets/images/document.gif"
                        alt="Document Icon"
                        className="m-auto h-12 w-12" // Adjust the size as needed
                      />
                    </td>
                    <td className="flex items-center !p-2">
                      <div className="ml-2">
                        <div className="text-xs font-semibold capitalize  md:text-base">
                          {" "}
                          {item?.template?.title}
                        </div>
                        <span className="text-xs text-gray-500 dark:text-white md:text-sm">
                          {item?.prompt.slice(0, 30)}
                          {item?.prompt.length > 30 ? "..." : ""}
                        </span>
                      </div>
                    </td>
                    <td className="!p-2">
                      <div className="text-xs font-semibold capitalize md:text-sm">
                        {item?.template?.templateCategory?.name}
                      </div>
                      <span className="text-xs text-gray-500 dark:text-white md:text-sm">
                        {moment(item?.created_at).format(
                          "MMMM Do YYYY, h:mm:ss a"
                        )}
                      </span>
                    </td>
                    <td className="!p-2">
                      <Link href={"/document/" + item?.id}>
                        <button className="rounded-md border px-5 py-2 dark:border-dark lg:block">
                          {t("View")}
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {data?.my_documents.length <= 0 && (
              <NoItemFound message="No Document Found" />
            )}
          </div>
        </div>
        <div className="panel h-full">
          <div className="-mx-5 mb-5 flex items-start justify-between border-b border-white-light p-5 pt-0  dark:border-[#1b2e4b] dark:text-white">
            <h5 className="text-lg font-semibold ">My Code's</h5>
          </div>

          <div>
            <table className="w-full table-auto">
              <tbody>
                {data?.my_codes?.map((item: any) => (
                  <tr key={item?.id}>
                    <td className={`w-16 !p-2`}>
                      <img
                        src="/assets/images/code.gif"
                        alt="Document Icon"
                        className="m-auto  w-16" // Adjust the size as needed
                      />
                    </td>
                    <td className="!p-2">
                      <span className="flex items-center text-xs font-semibold capitalize text-gray-800 dark:text-white md:text-base">
                        {item?.title}
                      </span>
                    </td>
                    <td className="!p-2">
                      <span className="flex items-center text-xs text-gray-500 dark:text-white md:text-sm">
                        {item?.result?.slice(0, 30)}
                        {item?.result.length > 30 ? "..." : ""}
                      </span>
                    </td>
                    <td className="!p-2">
                      <Link href={"/code-document/" + item?.id}>
                        <button className="rounded-md border px-5 py-2 dark:border-dark lg:block">
                          View
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {data?.my_codes?.length <= 0 && (
              <NoItemFound message="No Favourite Template Found" />
            )}
          </div>
        </div>
        <div className="panel h-full">
          <div className="-mx-5 mb-5 flex items-start justify-between border-b border-white-light p-5 pt-0  dark:border-[#1b2e4b] dark:text-white">
            <h5 className="text-lg font-semibold ">My Images</h5>
          </div>

          <div className="table-responsive">
            <table>
              <tbody>
                {data?.my_images?.map((item: any) => (
                  <tr key={item?.id}>
                    <td className={`w-16 !p-2`}>
                      <img
                        src={item?.image_url}
                        alt="Document Icon"
                        className="m-auto  w-16 rounded-md" // Adjust the size as needed
                      />
                    </td>
                    <td className="!p-2">
                      <div className="">
                        <span className="text-xs font-semibold capitalize dark:text-white md:text-base">
                          {item?.prompt.slice(0, 20)}
                          {item?.prompt.length > 20 ? "..." : ""}
                        </span>
                      </div>
                    </td>
                    <td className="!p-2">
                      <span className="text-xs text-gray-500 dark:text-white md:text-sm">
                        {moment(item?.created_at).format(
                          "MMMM Do YYYY, h:mm:ss a"
                        )}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {data?.my_images.length <= 0 && (
              <NoItemFound message="No Image Found" />
            )}
          </div>
        </div>
        <div className="panel h-full">
          <div className="-mx-5 mb-5 flex items-start justify-between border-b border-white-light p-5 pt-0  dark:border-[#1b2e4b] dark:text-white">
            <h5 className="text-lg font-semibold ">My Favourite's</h5>
          </div>

          <div className="table-responsive">
            <table className="w-full table-auto">
              <tbody>
                {data?.favourite_template_list?.map((item: any) => (
                  <tr key={item?.id}>
                    <td className={`!p-2`}>
                      <div className="flex items-center space-x-2">
                        <div
                          className={`rounded-md p-2`}
                          style={{
                            color: item?.template?.color,
                          }}
                        >
                          {item?.template?.icon_tag ? (
                            <i
                              className={`${item?.template?.icon_tag} text-2xl`}
                            ></i>
                          ) : (
                            <FaFileAlt
                              size={20}
                              color={item?.template?.color}
                            />
                          )}{" "}
                        </div>
                      </div>
                    </td>
                    <td className="!p-2">
                      <span className="flex items-center text-xs font-semibold capitalize text-gray-800 dark:text-white md:text-base">
                        {item?.template?.title}
                      </span>
                    </td>
                    <td className="!p-2">
                      <span className="flex items-center text-xs text-gray-500 dark:text-white md:text-sm">
                        {item?.template?.prompt.slice(0, 30)}
                        {item?.template?.prompt.length > 30 ? "..." : ""}
                      </span>
                    </td>
                    <td className="!p-2">
                      <button className="rounded-md border px-5 py-2 dark:border-dark lg:block">
                        Generate
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {data?.favourite_template_list?.length <= 0 && (
              <NoItemFound message="No Favourite Template Found" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export { getServerSideProps };

export default Dashboard;
