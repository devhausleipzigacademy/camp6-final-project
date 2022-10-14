import "../styles/globals.css";
import React, { useEffect } from "react";
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Head from "next/head";
import Header from "../components/Header/Header";
import { useRouter } from "next/router";
import { Footer } from "../components/Footer";

function MyApp({ Component, pageProps }) {
  const [queryClient] = React.useState(() => new QueryClient());
  const router = useRouter();

  useEffect(() => {
    const telegramId = localStorage.getItem("c6-tid");
    if (!telegramId) {
      router.replace("/login");
    }
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <div className="flex h-screen flex-col">
            <Header />
            <Component {...pageProps} />
            <Footer />
          </div>
          <ReactQueryDevtools initialIsOpen={false} />
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
