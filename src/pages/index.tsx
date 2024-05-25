import Image from "next/image";
import { Bricolage_Grotesque, Caveat } from "next/font/google";
import Navbar from "@/components/base/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Footer from "@/components/base/Footer";

const bricolage = Bricolage_Grotesque({ subsets: ["latin"] });
const caveat = Caveat({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className="bg-[#188652] relative h-svh"
      style={bricolage.style}
    >
      <Navbar />
      <div className="">
      <Image src="bg.svg" alt="Heymart" fill className="object-cover block z-0"/>
      <div className="flex items-center justify-center sm:justify-between flex-col sm:flex-row pt-[72px] min-h-svh px-5 sm:px-16">
      <article className="z-10 lg:text-7xl md:text-5xl text-4xl">
        <h1 style={bricolage.style} className="text-white font-bold">
        Where         
        <span style={caveat.style} className="ml-3">
        Convenience 
        </span>
        </h1>
        <h1 style={bricolage.style} className="text-white font-bold">
        Meets Affordability
        </h1>
        <p className="mt-2 sm:mt-3 text-[#ccc] max-w-prose text-base sm:text-lg">
        Say hello to Heymart – the all-in-one solution to your shopping woes. With Heymart, convenience, variety, and savings come together in one seamless online shopping experience. 
        </p>
        <Button className="mt-8 sm:mt-16 bg-[#D7D722] flex gap-2 items-center text-black px-5 py-4 text-xs sm:text-lg shadow-xl">
        Sign Up Now for a One Time 50% Off
        <ArrowRight size={16} />
        </Button>
      </article>
      <div className="z-10">
        <Image src="/hero.png" alt="Heymart" width={450} height={450} className="z-10 hidden sm:block"/>
      </div>
      </div>
      </div>
      <Footer />
    </main>
  );
}
