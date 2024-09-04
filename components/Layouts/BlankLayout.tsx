import { PropsWithChildren } from "react";
import App from "../../App";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useCommonSettings } from "@/hooks/common.hook";
import RootLoader from "../RootLoader";
import Head from "next/head";
import { useGetGoogleAuthSettingsData } from "@/hooks/admin";
import { IRootState } from "@/store";
import { useSelector } from "react-redux";
import { commonSettings } from "@/service/commom";

const BlankLayout = ({ children }: PropsWithChildren) => {
  const { isLoading, data: CommonData } = useCommonSettings();
  const { settings } = useSelector((state: IRootState) => state.common.data);
  return (
    <GoogleOAuthProvider clientId={settings?.google_auth_client_id}>
      {isLoading && <RootLoader />}
      <Head>
        <link
          rel="icon"
          href={CommonData?.data?.settings?.site_fav_icon}
          type="image/x-icon"
        />
        <title>{CommonData?.data?.settings?.site_name}</title>
      </Head>
      <App>
        <div className="min-h-screen text-black dark:text-white-dark">
          {children}
        </div>
      </App>
    </GoogleOAuthProvider>
  );
};

export default BlankLayout;
