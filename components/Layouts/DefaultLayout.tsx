import { IRootState } from "@/store";
import { toggleSidebar } from "@/store/themeConfigSlice";
import { PropsWithChildren, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import App from "../../App";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Portals from "../../components/Portals";
import { useRouter } from "next/router";
import { useCheckAuthState } from "@/hooks/authentication.hook";
import { useSubscriptionStatus } from "@/hooks/paymentSettings.hook";
import ReactGA from "react-ga";
import { useCommonSettings } from "@/hooks/common.hook";
import RootLoader from "../RootLoader";
import Head from "next/head";
import { commonSettings } from "@/service/commom";

const DefaultLayout = ({ children }: PropsWithChildren) => {
  const { user } = useCheckAuthState();
  const { isLoading, data: CommonData } = useCommonSettings();
  const { data } = useSubscriptionStatus();
  const router = useRouter();
  const [showTopButton, setShowTopButton] = useState(false);
  const themeConfig = useSelector((state: IRootState) => state.themeConfig);
  const [animation, setAnimation] = useState<any>(themeConfig.animation);
  const dispatch = useDispatch();
  const goToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };
  useEffect(() => {
    CommonData?.google_analytics_tracking_id &&
      ReactGA.initialize(CommonData?.google_analytics_tracking_id);
  }, [CommonData]);
  const onScrollHandler = () => {
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      setShowTopButton(true);
    } else {
      setShowTopButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onScrollHandler);
    router.events.on("beforeHistoryChange", () => {
      setAnimation(themeConfig.animation);
    });
    return () => {
      window.removeEventListener("onscroll", onScrollHandler);
    };
  });

  useEffect(() => {
    setAnimation(themeConfig.animation);
  }, [themeConfig.animation]);

  useEffect(() => {
    setTimeout(() => {
      setAnimation("");
    }, 1100);
  }, [router.asPath]);

  return (
    <App>
      <div className="relative">
        {isLoading && <RootLoader />}
        <Head>
          <link
            rel="icon"
            href={CommonData?.data?.settings?.site_fav_icon}
            type="image/x-icon"
          />
          <title>{CommonData?.data?.settings?.meta_title}</title>
          <meta
            name="description"
            content={CommonData?.data?.settings?.meta_description}
          />
        </Head>
        <div
          className={`${
            (!themeConfig.sidebar && "hidden") || ""
          } fixed inset-0 z-50 bg-[black]/60 lg:hidden`}
          onClick={() => dispatch(toggleSidebar())}
        ></div>
        <div className="fixed bottom-6 z-50 ltr:right-6 rtl:left-6">
          {showTopButton && (
            <button
              type="button"
              className="btn btn-outline-primary animate-pulse rounded-full bg-[#fafafa] p-2 dark:bg-[#060818] dark:hover:bg-primary"
              onClick={goToTop}
            >
              <svg
                width="24"
                height="24"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.5"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 20.75C12.4142 20.75 12.75 20.4142 12.75 20L12.75 10.75L11.25 10.75L11.25 20C11.25 20.4142 11.5858 20.75 12 20.75Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M6.00002 10.75C5.69667 10.75 5.4232 10.5673 5.30711 10.287C5.19103 10.0068 5.25519 9.68417 5.46969 9.46967L11.4697 3.46967C11.6103 3.32902 11.8011 3.25 12 3.25C12.1989 3.25 12.3897 3.32902 12.5304 3.46967L18.5304 9.46967C18.7449 9.68417 18.809 10.0068 18.6929 10.287C18.5768 10.5673 18.3034 10.75 18 10.75L6.00002 10.75Z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
          )}
        </div>

        <div
          className={`${themeConfig.navbar} main-container min-h-screen text-black dark:text-white-dark`}
        >
          <Sidebar />

          <div className="main-content flex min-h-screen flex-col">
            <Header />

            <div
              className={`${animation} animate__animated bg-white dark:bg-black`}
            >
              {children}
            </div>

            <Footer />

            <Portals />
          </div>
        </div>
      </div>
    </App>
  );
};

export default DefaultLayout;
