import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "react-toastify/dist/ReactToastify.css"

import { Lexend } from "next/font/google";
import Head from "next/head";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";

const inter = Lexend({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Heymart C14</title>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Head>
      <div className={`font-sans ${inter.className}`}>
        <TooltipProvider>
          <Component {...pageProps} />
        </TooltipProvider>
        <Toaster />
      </div>
    </>
  )
    ;
}
