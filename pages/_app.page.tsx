import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Head from "next/head";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
	return (
		<>
			<meta charSet="UTF-8" />
			<Head>
				<title>Bookshare</title>
			</Head>
			<QueryClientProvider client={queryClient}>
				<Component {...pageProps} />
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</>
	);
}

export default MyApp;
