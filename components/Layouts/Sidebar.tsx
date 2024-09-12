import PerfectScrollbar from "react-perfect-scrollbar";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { toggleSidebar } from "../../store/themeConfigSlice";
import AnimateHeight from "react-animate-height";
import { IRootState } from "../../store";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  BiSolidDashboard,
  BiTransfer,
  BiUserVoice,
  BiSpreadsheet,
} from "react-icons/bi";
import { GiSettingsKnobs } from "react-icons/gi";
import {
  MdOutlineDashboardCustomize,
  MdPayment,
  MdHistory,
} from "react-icons/md";
import { AiOutlineSetting, AiOutlineHistory } from "react-icons/ai";
import { RiTranslate } from "react-icons/ri";
import { FaUserCog } from "react-icons/fa";
import {
  BsFiletypeDoc,
  BsCodeSlash,
  BsChatDots,
  BsStarFill,
} from "react-icons/bs";
import { TfiWrite } from "react-icons/tfi";
import { AiOutlineFileImage } from "react-icons/ai";
import { USER_ROLE_ADMIN, USER_ROLE_USER } from "@/helpers/coreConstant";
import { FaMoneyBill, FaQuestionCircle } from "react-icons/fa";

const Sidebar = () => {
  const router = useRouter();
  const [currentMenu, setCurrentMenu] = useState<string>("");
  const themeConfig = useSelector((state: IRootState) => state.themeConfig);
  const { settings } = useSelector((state: IRootState) => state.common.data);
  const semidark = useSelector(
    (state: IRootState) => state.themeConfig.semidark
  );

  const { isSubscribed, details: subscriptionDetails } = useSelector(
    (state: IRootState) => state.subcription
  );
  const { user } = useSelector((state: IRootState) => state.userSlice);
  const toggleMenu = (value: string) => {
    setCurrentMenu((oldValue) => {
      return oldValue === value ? "" : value;
    });
  };

  useEffect(() => {
    const selector = document.querySelector(
      '.sidebar ul a[href="' + window.location.pathname + '"]'
    );
    if (selector) {
      selector.classList.add("active");
      const ul: any = selector.closest("ul.sub-menu");
      if (ul) {
        let ele: any =
          ul.closest("li.menu").querySelectorAll(".nav-link") || [];
        if (ele.length) {
          ele = ele[0];
          setTimeout(() => {
            ele.click();
          });
        }
      }
    }
  }, []);

  useEffect(() => {
    setActiveRoute();
    if (window.innerWidth < 1024 && themeConfig.sidebar) {
      dispatch(toggleSidebar());
    }
  }, [router.pathname]);

  const setActiveRoute = () => {
    let allLinks = document.querySelectorAll(".sidebar ul a.active");
    for (let i = 0; i < allLinks.length; i++) {
      const element = allLinks[i];
      element?.classList.remove("active");
    }
    const selector = document.querySelector(
      '.sidebar ul a[href="' + window.location.pathname + '"]'
    );
    selector?.classList.add("active");
  };

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const calculatePercent = (value: any) => {
    let totalValue =
      subscriptionDetails?.total_words + subscriptionDetails?.total_images;
    return (value / totalValue) * 100;
  };

  return (
    <div className={semidark ? "dark" : ""}>
      <nav
        className={`sidebar fixed top-0 bottom-0 z-50 h-full min-h-screen w-[260px] border-r border-[#f1f3f4] transition-all duration-300 dark:border-dark ${
          semidark ? "text-white-dark" : ""
        }`}
      >
        <div className="h-full bg-white dark:bg-black">
          <div className="flex items-center justify-between px-4 py-3">
            <Link href="https://kogenie-e-solutions.vercel.app" className="main-logo flex shrink-0 items-center">
              <img
                className="ml-[5px] h-[46px] flex-none"
                src={settings?.site_logo ? settings?.site_logo : " "}
                alt="logo"
              />
            </Link>

            <button
              type="button"
              className="collapse-icon flex h-8 w-8 items-center rounded-full transition duration-300 hover:bg-gray-500/10 rtl:rotate-180 dark:text-white dark:hover:bg-dark-light/10"
              onClick={() => dispatch(toggleSidebar())}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="m-auto h-5 w-5"
              >
                <path
                  d="M13 19L7 12L13 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  opacity="0.5"
                  d="M16.9998 19L10.9998 12L16.9998 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <PerfectScrollbar className="relative h-[calc(100vh-80px)]">
            <ul className="relative space-y-0.5 py-0 font-semibold">
              {/* for user Dashboard */}
              <h2 className="mb-1 flex items-center  py-3 px-5 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
                <svg
                  className="hidden h-5 w-4 flex-none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                <span>{t("User")}</span>
              </h2>

              {/* for user dashboard */}
              <li className="nav-item">
                <Link href="/dashboard" className="group">
                  <div className="flex items-center">
                    <BiSolidDashboard />
                    <span className="text-md text-black ltr:pl-3 rtl:pr-3 dark:text-white dark:group-hover:text-white-dark">
                      {t("Dashboard")}
                    </span>
                  </div>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/document" className="group">
                  <div className="flex items-center">
                    <BsFiletypeDoc />
                    <span className="text-md  text-black ltr:pl-3 rtl:pr-3 dark:text-white dark:group-hover:text-white-dark">
                      {t("Documents")}
                    </span>
                  </div>
                </Link>
              </li>

              <li className="nav-item">
                <Link href="/ai-writer" className="group">
                  <div className="flex items-center">
                    <TfiWrite size={16} />
                    <span className="text-md  text-black ltr:pl-3 rtl:pr-3 dark:text-white dark:group-hover:text-white-dark">
                      {t("AI Writer")}
                    </span>
                  </div>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/ai-image" className="group">
                  <div className="flex items-center">
                    <AiOutlineFileImage size={20} />
                    <span className="text-md  text-black ltr:pl-3 rtl:pr-3 dark:text-white dark:group-hover:text-white-dark">
                      {t("AI Art")}
                    </span>
                  </div>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/ai-code" className="group">
                  <div className="flex items-center">
                    <BsCodeSlash size={20} />
                    <span className="text-md  text-black ltr:pl-3 rtl:pr-3 dark:text-white dark:group-hover:text-white-dark">
                      {t("AI Code")}
                    </span>
                  </div>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/ai-translation" className="group">
                  <div className="flex items-center">
                    <RiTranslate size={20} />
                    <span className="text-md  text-black ltr:pl-3 rtl:pr-3 dark:text-white dark:group-hover:text-white-dark">
                      {t("AI Translattion")}
                    </span>
                  </div>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/ai-speech-to-text" className="group">
                  <div className="flex items-center">
                    <BiUserVoice size={16} />
                    <span className="text-md  text-black ltr:pl-3 rtl:pr-3 dark:text-white dark:group-hover:text-white-dark">
                      {t("AI Speech to Text")}
                    </span>
                  </div>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/ai-spreed-sheet" className="group">
                  <div className="flex items-center">
                    <BiSpreadsheet size={16} />
                    <span className="text-md  text-black ltr:pl-3 rtl:pr-3 dark:text-white dark:group-hover:text-white-dark">
                      {t("AI Spreadsheet Generator")}
                    </span>
                  </div>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/ai-chat" className="group">
                  <div className="flex items-center">
                    <BsChatDots size={16} />
                    <span className="text-md  text-black ltr:pl-3 rtl:pr-3 dark:text-white dark:group-hover:text-white-dark">
                      {t("AI Chat")}
                    </span>
                  </div>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/my-favourites" className="group">
                  <div className="flex items-center">
                    <BsStarFill size={16} />
                    <span className="text-md  text-black ltr:pl-3 rtl:pr-3 dark:text-white dark:group-hover:text-white-dark">
                      {t("My Favourite's")}
                    </span>
                  </div>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/my-uses" className="group">
                  <div className="flex items-center">
                    <AiOutlineHistory />
                    <span className="text-md text-black ltr:pl-3 rtl:pr-3 dark:text-white dark:group-hover:text-white-dark">
                      {t("My Uses")}
                    </span>
                  </div>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/transaction-history" className="group">
                  <div className="flex items-center">
                    <BiTransfer />
                    <span className="text-md  text-black ltr:pl-3 rtl:pr-3 dark:text-white dark:group-hover:text-white-dark">
                      {t("Transaction History")}
                    </span>
                  </div>
                </Link>
              </li>
              {user?.role === USER_ROLE_ADMIN && (
                <>
                  {/* for admin Dashboard */}
                  <h2 className=" mb-1 flex items-center py-3 px-5 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
                    <svg
                      className="hidden h-5 w-4 flex-none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    <span>{t("Admin")}</span>
                  </h2>
                  <li className="nav-item">
                    <Link href="/admin/dashboard" className="group">
                      <div className="flex items-center">
                        <BiSolidDashboard />
                        <span className="text-md  text-black ltr:pl-3 rtl:pr-3 dark:text-white dark:group-hover:text-white-dark">
                          {t("Dashboard")}
                        </span>
                      </div>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/admin/user-management" className="group">
                      <div className="flex items-center">
                        <FaUserCog />
                        <span className="text-md  text-black ltr:pl-3 rtl:pr-3 dark:text-white dark:group-hover:text-white-dark">
                          {t("User Management")}
                        </span>
                      </div>
                    </Link>
                  </li>
                  <li className="menu nav-item">
                    <button
                      type="button"
                      className={`${
                        currentMenu === "settings" ? "active" : ""
                      } nav-link group w-full`}
                      onClick={() => toggleMenu("settings")}
                    >
                      <div className="flex items-center">
                        <GiSettingsKnobs />
                        <span className="text-md  text-black ltr:pl-3 rtl:pr-3 dark:text-white dark:group-hover:text-white-dark">
                          {t("Settings")}
                        </span>
                      </div>

                      <div
                        className={
                          currentMenu === "settings"
                            ? "rotate-90"
                            : "rtl:rotate-180"
                        }
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9 5L15 12L9 19"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </button>

                    <AnimateHeight
                      duration={300}
                      height={currentMenu === "settings" ? "auto" : 0}
                    >
                      <ul className="sub-menu text-gray-500 dark:text-white">
                        <li>
                          <Link href="/admin/settings/general">
                            {t("General")}
                          </Link>
                        </li>

                        <li>
                          <Link href="/admin/settings/open-ai">
                            {t("OpenAI")}
                          </Link>
                        </li>

                        <li>
                          <Link href="/admin/settings/smtp">{t("SMTP")}</Link>
                        </li>
                        <li>
                          <Link href="/admin/settings/privacy-policy-and-terms">
                            {t("Privacy Policy and Terms")}
                          </Link>
                        </li>
                        <li>
                          <Link href="/admin/settings/payment-credentials">
                            {t("Payment Credentials")}
                          </Link>
                        </li>
                        <li>
                          <Link href="/admin/settings/auth-credentials">
                            {t("Auth Credentials")}
                          </Link>
                        </li>
                        <li>
                          <Link href="/admin/settings/programing-language">
                            {t("Programing Language")}
                          </Link>
                        </li>
                      </ul>
                    </AnimateHeight>
                  </li>
                  <li className="menu nav-item">
                    <button
                      type="button"
                      className={`${
                        currentMenu === "site_settings" ? "active" : ""
                      } nav-link group w-full`}
                      onClick={() => toggleMenu("site_settings")}
                    >
                      <div className="flex items-center">
                        <AiOutlineSetting />
                        <span className="text-md  text-black ltr:pl-3 rtl:pr-3 dark:text-white dark:group-hover:text-white-dark">
                          {t("Site Settings")}
                        </span>
                      </div>

                      <div
                        className={
                          currentMenu === "site_settings"
                            ? "rotate-90"
                            : "rtl:rotate-180"
                        }
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9 5L15 12L9 19"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </button>

                    <AnimateHeight
                      duration={300}
                      height={currentMenu === "site_settings" ? "auto" : 0}
                    >
                      <ul className="sub-menu text-gray-500 dark:text-white">
                        <li>
                          <Link href="/admin/site-settings/landing-page">
                            {t("Landing Page")}
                          </Link>
                        </li>
                        <li>
                          <Link href="/admin/site-settings/feature-of-ai">
                            {t("Feature Of Ai")}
                          </Link>
                        </li>
                        <li>
                          <Link href="/admin/site-settings/reviews">
                            {t("Reviews")}
                          </Link>
                        </li>
                        <li>
                          <Link href="/admin/site-settings/social-media">
                            {t("Social Media")}
                          </Link>
                        </li>
                      </ul>
                    </AnimateHeight>
                  </li>
                  <li className="nav-item">
                    <Link
                      href="/admin/payments/packages/subscription"
                      className="group"
                    >
                      <div className="flex items-center">
                        <MdPayment />
                        <span className="text-md  text-black ltr:pl-3 rtl:pr-3 dark:text-white dark:group-hover:text-white-dark">
                          {t("Payments")}
                        </span>
                      </div>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/admin/faqs" className="group">
                      <div className="flex items-center">
                        <FaQuestionCircle />
                        <span className="text-md  text-black ltr:pl-3 rtl:pr-3 dark:text-white dark:group-hover:text-white-dark">
                          {t("FAQ")}
                        </span>
                      </div>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/admin/transactions" className="group">
                      <div className="flex items-center">
                        <FaMoneyBill />
                        <span className="text-md  text-black ltr:pl-3 rtl:pr-3 dark:text-white dark:group-hover:text-white-dark">
                          {t("Transactions")}
                        </span>
                      </div>
                    </Link>
                  </li>
                  <li className="menu nav-item">
                    <button
                      type="button"
                      className={`${
                        currentMenu === "templates" ? "active" : ""
                      } nav-link group w-full`}
                      onClick={() => toggleMenu("templates")}
                    >
                      <div className="flex items-center">
                        <MdOutlineDashboardCustomize />
                        <span className="text-md  text-black ltr:pl-3 rtl:pr-3 dark:text-white dark:group-hover:text-white-dark">
                          {t("Template Management")}
                        </span>
                      </div>

                      <div
                        className={
                          currentMenu === "templates"
                            ? "rotate-90"
                            : "rtl:rotate-180"
                        }
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9 5L15 12L9 19"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </button>

                    <AnimateHeight
                      duration={300}
                      height={currentMenu === "templates" ? "auto" : 0}
                    >
                      <ul className="sub-menu text-gray-500 dark:text-white">
                        <li>
                          <Link href="/admin/templates/custom-templates">
                            {t("Custom Templates")}
                          </Link>
                        </li>
                        <li>
                          <Link href="/admin/templates/ai-writer-categories">
                            {t("AI Writer Categories")}
                          </Link>
                        </li>
                        <li>
                          <Link href="/admin/templates/chat-templates">
                            {t("Chat Templates")}
                          </Link>
                        </li>
                      </ul>
                    </AnimateHeight>
                  </li>
                  <li className="nav-item">
                    <Link href="/admin/uses-history" className="group">
                      <div className="flex items-center">
                        <MdHistory />
                        <span className="text-md  text-black ltr:pl-3 rtl:pr-3 dark:text-white dark:group-hover:text-white-dark">
                          {t("Uses History")}
                        </span>
                      </div>
                    </Link>
                  </li>
                </>
              )}
              <div className="m-3 border dark:border-dark dark:text-white">
                <h2 className="mb-1 flex items-center  py-3 px-5 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
                  <svg
                    className="hidden h-5 w-4 flex-none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  <span>{t("Credits")}</span>
                </h2>
                <li className="nav-item">
                  <a className="group !py-0.5">
                    <div className="flex items-center">
                      <div className="h-[10px] w-[10px] rounded-full bg-primary"></div>
                      <span className="text-md  text-black ltr:pl-3 rtl:pr-3 dark:text-white dark:group-hover:text-white-dark">
                        {t("Word")}{" "}
                        {subscriptionDetails?.remaining_words
                          ? subscriptionDetails?.remaining_words
                          : 0}
                      </span>
                    </div>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="group !py-0.5">
                    <div className="flex items-center">
                      <div className="h-[10px] w-[10px] rounded-full bg-secondary"></div>
                      <span className="text-md  text-black ltr:pl-3 rtl:pr-3 dark:text-white dark:group-hover:text-white-dark">
                        {t("Image")}{" "}
                        {subscriptionDetails?.remaining_images
                          ? subscriptionDetails?.remaining_images
                          : 0}
                      </span>
                    </div>
                  </a>
                </li>
                <li>
                  <div className="mx-5 my-3 flex h-2 rounded-full bg-[#ebedf2] dark:bg-dark/40">
                    <div
                      className={`h-2 rounded-l-full bg-primary text-center text-xs text-white ltr:rounded-l-full rtl:rounded-r-full`}
                      style={{
                        width:
                          calculatePercent(subscriptionDetails?.total_words) +
                          "%",
                      }}
                    ></div>
                    <div
                      className={`h-2 rounded-r-full bg-secondary text-center text-xs text-white`}
                      style={{
                        width:
                          calculatePercent(subscriptionDetails?.total_images) +
                          "%",
                      }}
                    ></div>
                  </div>
                </li>
              </div>
            </ul>
          </PerfectScrollbar>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
