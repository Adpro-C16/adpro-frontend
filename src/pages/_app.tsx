import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "react-toastify/dist/ReactToastify.css"

import { Inter } from "next/font/google";
import Head from "next/head";
import { ToastContainer } from 'react-toastify';

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <Head>
        <title>Heymart C14</title>
        <link rel="icon" href="/favicon.ico" sizes="any"/>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png"/>
    </Head>
    <div className={`font-sans ${inter.className}`}>
      <Component {...pageProps} />
      <ToastContainer />
    </div>
    </>
)
  ;
}
