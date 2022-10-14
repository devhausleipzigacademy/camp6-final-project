import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <meta charSet="UTF-8" />
        <link
          // TODO: put the fonts into a 'Custom Document'
          // https://nextjs.org/docs/basic-features/font-optimization
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500&family=Sora:wght@700;800&display=swap"
          rel="stylesheet"
        />
        {/* eslint-disable-next-line @next/next/no-title-in-document-head */}
        <title>Bookshare</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
