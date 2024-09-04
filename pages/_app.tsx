import type { AppProps } from "next/app";
import { ReactElement, ReactNode, Suspense, useEffect } from "react";
import DefaultLayout from "../components/Layouts/DefaultLayout";
import NProgress from "nprogress";

import { Provider } from "react-redux";
import store from "../store/index";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-toastify/dist/ReactToastify.css";
import "../styles/nprogress.css";

import { appWithI18Next } from "ni18n";
import { ni18nConfig } from "ni18n.config.ts";
import "../styles/loader.css";
// Perfect Scrollbar
import "react-perfect-scrollbar/dist/css/styles.css";

import "../styles/tailwind.css";
import { NextPage } from "next";
import { ToastContainer } from "react-toastify";
import Router, { useRouter } from "next/router";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout =
    Component.getLayout ??
    ((page: any) => <DefaultLayout>{page}</DefaultLayout>);
  useEffect(() => {
    Router.events.on("routeChangeStart", () => NProgress.start());
    Router.events.on("routeChangeComplete", () => NProgress.done());
    Router.events.on("routeChangeError", () => NProgress.done());
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
        pauseOnHover
          theme={"light"}
        />
        

        {getLayout(<Component {...pageProps} />)}
      </Provider>
    </QueryClientProvider>
  );
};
export default appWithI18Next(App, ni18nConfig);
