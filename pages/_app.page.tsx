import "../styles/globals.css";
import type { AppProps } from "next/app";
import BookDescription from "../components/bookDescription";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
