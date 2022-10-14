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
      <meta charSet="UTF-8" />
      <Head>
        <link
          // TODO: put the fonts into a 'Custom Document'
          // https://nextjs.org/docs/basic-features/font-optimization
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500&family=Sora:wght@700;800&display=swap"
          rel="stylesheet"
        />
        <title>Bookshare</title>
      </Head>
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
