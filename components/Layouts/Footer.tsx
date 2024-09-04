import { IRootState } from "@/store";
import { useSelector } from "react-redux";

const Footer = () => {
  const { settings } = useSelector((state: IRootState) => state?.common?.data);
  return (
    <footer className="block bg-white dark:bg-black dark:text-white">
      <div className="px-5 md:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <div className="py-16 md:py-24 lg:py-32">
            <div className="flex flex-col items-center">
             

              <p className="max-[479px]:text-sm">
                {settings?.site_copy_right_text &&
                  `© ${settings?.site_copy_right_text}`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
