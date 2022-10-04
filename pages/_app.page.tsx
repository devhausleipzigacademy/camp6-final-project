import "../styles/globals.css";
import React from "react";
import {
    QueryClient,
    QueryClientProvider} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
	const [queryClient] = React.useState(() => new QueryClient());

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
				<Component {...pageProps} />
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</>
	);
}

export default MyApp;
